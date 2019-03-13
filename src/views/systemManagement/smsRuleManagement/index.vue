<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
            <search-model :data="searchData" @search="search"></search-model>
        </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" @click="openCreate=true" name="order_show">新增</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                :loading="loading"
                highlight-row
                size="small"
                border
                @on-row-click="select_row"
                :columns="header"
                :data="data"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-sizer
                show-elevator
                :current.sync="page"
                @on-change="page_change"
                @on-page-size-change="page_size_change"
                style="margin-top: 10px"></Page>
        </Row>
        </Card>
        <create v-if="openCreate" @close="close"></create>
        <update v-if="openUpdate" @close="close" :id="currentRowId"></update>
    </div>
</template>

<script>
import * as msgRuleApi from '../api/msgRule'
import create from './create'
import update from './update'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: "smsRuleManagement_index",
    components:{
        searchModel,
        create,
        update
    },
    data(){
        return {
            currentRowId: "",
            loading: true,
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "序号",
                    type: 'index',
                    width: 90
                },
                {
                    title: "规则名称",
                    key: 'msgrulename',
                    minWidth: 180
                },
                {
                    title: "规则详情",
                    key: "msgruledetail",
                    minWidth: 180
                },
                {
                    title: "规则编码",
                    key: 'msgrulecode',
                    minWidth: 120
                },
                {
                    title: "操作",
                    width: 150,
                    render: (h, params) =>{
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: "info",
                                    size: "small",
                                    // disabled: "true"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: ()=>{
                                        this.currentRowId = params.row.id
                                        this.openUpdate = true
                                    }
                                }
                            },'[编辑]'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                }
                            }, [
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要删除此记录！',
                                    },
                                    on: {
                                        'on-ok': async ()=>{
                                            let config = {
                                                id: params.row.id,
                                                deleteflag: 1
                                            }
                                            let { status, data } = await msgRuleApi.deleteMsgRuleById(config)
                                            if(status){
                                                this.get_data()
                                            }
                                        },
                                    }
                                }, '[删除]')
                            ])
                        ])
                    }
                }
            ],
            searchData: [
                {
                    label: "规则名称：",
                    key: "msgruleName",
                    type: "input"
                },
                {
                    label: "规则编码：",
                    key: "msgruleCode",
                    type: "input"
                },
                {
                    label: "规则详情：",
                    key: "msgruleDetail",
                    type: "input"
                },
            ],
            searchForm: {},
            openCreate: false,
            openUpdate: false
        }
    },
    methods: {
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: this.pageSize
                }
            }

            Object.assign(config.params, this.searchForm)

            try {
                let { total, rows } = await msgRuleApi.getMsgRuleList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    return item
                })
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        search(item){
            this.page = 1
            Object.assign(this.searchForm, item)
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_data()
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        close(e){
            this.openUpdate = false
            this.openCreate = false
            if(e){
                this.get_data()
            }
        }
    },
    async created(){
        await this.get_data()
    }
}
</script>
