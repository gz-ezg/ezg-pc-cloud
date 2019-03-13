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
        <create :msgttype="msgttype" v-if="openCreate" @close="close"></create>
        <update :msgttype="msgttype" v-if="openUpdate" @close="close" :msg="currentRow"></update>
    </div>
</template>

<script>
import * as msgTempalteApi from '../api/wechatTemplate'
import create from './create'
import update from './update'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: "wechatTemplate_index",
    components:{
        searchModel,
        create,
        update
    },
    data(){
        return {
            currentRow: {},
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
                    title: "模板名称",
                    key: 'msgtname',
                    minWidth: 180
                },
                {
                    title: "模板编码",
                    key: "msgtcode",
                    minWidth: 180
                },
                {
                    title: "模板类型",
                    key: 'templatetypeName',
                    minWidth: 120
                },
                {
                    title: "触发事件",
                    key: "triggers",
                    minWidth: 250
                },
                {
                    title: '使用状态',
                    key: 'issendName',
                    minWidth: 90
                },
                {
                    title: "操作",
                    width: 90,
                    render: (h, params) =>{
                        return h('Button', {
                            props: {
                                type: "info",
                                size: "small"
                            },
                            style: {
                                margin: "auto"
                            },
                            on: {
                                click: ()=>{
                                    console.log(params.row)
                                    this.currentRow = params.row
                                    this.openUpdate = true
                                }
                            }
                        },'[编辑]')
                    }
                }
            ],
            searchData: [
                {
                    label: "模板名称：",
                    key: "msgtName",
                    type: "input"
                },
                {
                    label: "模板编码：",
                    key: "msgtCode",
                    type: "input"
                },
                {
                    label: "触发事件：",
                    key: "triggers",
                    type: "input"
                },
                {
                    label: "模板类型：",
                    key: "templateType",
                    type: "select",
                    data: []
                },
                
            ],
            searchForm: {},
            msgttype: [],
            msgttypeMap: new Map(),
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
                let { total, rows } = await msgTempalteApi.getMsgTemplateList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    item.issendName = item.issend == 'Y'? '使用中': '未使用'
                    item.templatetypeName = this.msgttypeMap.get(item.templatetype)
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
        async get_data_center(){
            let params = "msgttype"
            let { msgttype } = await msgTempalteApi.getDictionary(params)
            this.msgttype = msgttype
            this.msgttypeMap = this.$array2map(msgttype)
            this.searchData[3].data = msgttype
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
        await this.get_data_center()
        await this.get_data()
    }
}
</script>
