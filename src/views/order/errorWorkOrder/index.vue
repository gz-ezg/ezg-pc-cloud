<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <search-model :data="searchData" @search="search"></search-model>
            </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="information-circled" @click="openCreate=true">新增</Button>
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
        <create :unusualType="unusualType" v-if="openCreate" @close="close"></create>
        </Card>
        <update :unusualType="unusualType" v-if="openUpdate" @close="close" :detail="currentRow"></update>
        <detail :unusualType="unusualType" v-if="openDetail" @close="close" :detail="currentRow"></detail>
    </div>
</template>

<script>
import { unusualWorkOrderList, getDictionary, unusualWorkOrderDel } from './api.js'
import create from './create'
import update from './update'
import detail from './detail'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: "errorWorkOrder_index",
    components:{
        searchModel,
        create,
        update,
        detail
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
                    title: "工单号",
                    key: "unusual_code",
                    width: 150
                },
                {
                    title: "公司名称",
                    key: "companyname",
                    minWidth: 250
                },
                {
                    title: "客户名称",
                    key: "name",
                    minWidth: 120
                },
                {
                    title: "联系方式",
                    key: "tel",
                    minWidth: 150,
                },
                {
                    title: "产品内容",
                    key: 'product_content',
                    minWidth: 150
                },
                {
                    title: "异常类型",
                    key: "unusual_type_name",
                    minWidth: 120
                },
                {
                    title: "当前状态",
                    key: "current_process_name",
                    minWidth: 120
                },
                {
                    title: "创建人",
                    key: "realname",
                    minWidth: 120
                },
                {
                    title: "创建时间",
                    key: "create_date",
                    minWidth: 120
                },
                {
                    title: "备注",
                    key: "apply_memo",
                    minWidth: 150
                },
                {
                    title:"下载",
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.currentRow = params.row
                                        this.openDetail = true
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {
                                    margin: "auto"
                                },
                                on: {
                                    click: ()=>{
                                        this.currentRow = params.row
                                        this.openUpdate = true
                                    }
                                }
                            },'编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px'
                                }
                            }, [
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要删除此记录？',
                                    },
                                    on: {
                                        'on-ok': async ()=>{
                                            let config = {
                                                params: {
                                                    applyId: params.row.applyId,
                                                }
                                            }
                                            let data = await unusualWorkOrderDel(config)
                                            if(data.deleteFlag){
                                                this.$Message.success("删除成功！")
                                            }
                                            this.get_data()
                                        },
                                    }
                                }, '删除')
                            ])
                        ])
                    }
                }
            ],
            searchData: [],
            searchForm: {},
            unusualType: [],
            unusualTypeMap: new Map(),
            openCreate: false,
            openUpdate: false,
            openDetail: false
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
                let { total, rows } = await unusualWorkOrderList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    item.unusual_type_name = this.unusualTypeMap.get(item.unusual_type)
                    if(item.create_date){
                        item.create_date = item.create_date.slice(0, 10)
                    }
                    return item
                })
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        search(item){
            delete item.createdate
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
            let params = "unusualType"
            let { unusualType } = await getDictionary(params)
            this.unusualType = unusualType
            this.unusualTypeMap = this.$array2map(unusualType)
        },
        close(e){
            this.openUpdate = false
            this.openCreate = false
            this.openDetail = false
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
