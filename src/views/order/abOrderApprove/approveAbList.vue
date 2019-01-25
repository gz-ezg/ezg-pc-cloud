<template>
    <div>
        <Card>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                <Button type="primary" icon="ios-color-filter-outline" @click="refresh">刷新</Button>                            
            </ButtonGroup>
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row 
                    border 
                    :columns="header" 
                    :data="data" 
                    size="small"
                    @on-row-click="select_row" 
                    @on-row-dblclick="to_do_work_flow" 
                    :loading="tableLoading">
                </Table>
                <Page
                    size="small"
                    :total="total"
                    show-total
                    show-sizer
                    :current.sync="page"
                    transfer
                    show-elevator
                    @on-change="page_change"
                    @on-page-size-change="page_size_change"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
import { DateFormat } from '../../../libs/utils.js'

export default {
    data() {
        return {
            //数据字典
            unusualType:[],
            unusualType_map: new Map(),
            //  当前选中的行
            selectRow: "",
            tableLoading: false,
            total: 0,
            data: [],
            page: 1,
            pageSize: 10,
            header: [
                {
                    title: '订单号码',
                    key: 'unusual_code',
                    minWidth: 140
                },
                {
                    title: '公司名称',
                    key: 'companyname',
                    minWidth: 300
                },
                {
                    title: '客户名称',
                    key: 'name',
                    minWidth: 120
                },
                {
                    title: '客户电话',
                    key: 'tel',
                    minWidth: 120
                },
                {
                    title: '产品内容',
                    key: 'product_content',
                    minWidth: 180,
                    render:(h,params) =>{
                        if(params.row.product_content =='' || params.row.product_content == null){
                            return ''
                        }else if(params.row.product_content.length>10){
                            return h('Poptip', {
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.product_content.slice(0,10)+'...'),
                                h('Icon',{
                                    props:{
                                        type: 'arrow-down-b'
                                    }
                                }),
                                h('div',{
                                    slot: 'content'
                                },[
                                    h('span',params.row.product_content)
                                ])
                            ])
                        }else{
                            return h('span',params.row.product_content)
                        }
                    }
                },
                {
                    title: "异常类型",
                    key: "unusual_type",
                    minWidth: 120
                },
                {
                    title: "审批是由",
                    key: "apply_memo",
                    minWidth: 180,
                    render:(h,params) =>{
                        if(params.row.apply_memo =='' || params.row.apply_memo == null){
                            return ''
                        }else if(params.row.apply_memo.length>10){
                            return h('Poptip', {
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.apply_memo.slice(0,10)+'...'),
                                h('Icon',{
                                    props:{
                                        type: 'arrow-down-b'
                                    }
                                }),
                                h('div',{
                                    slot: 'content'
                                },[
                                    h('span',params.row.apply_memo)
                                ])
                            ])
                        }else{
                            return h('span',params.row.apply_memo)
                        }
                    }
                },
                {
                    title: '流程状态',
                    key: 'current_process_name',
                    minWidth: 120,
                    sorttable: "custom"
                },
                {
                    title: '创建人',
                    key: 'realname',
                    minWidth: 100
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    minWidth: 120                                                               
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    minWidth: 150,
                    render: (h,params) =>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type: 'primary',
                                    size: 'small' 
                                },
                                style:{
                                    marginRight: '5px'
                                },
                                on:{
                                    click: () => {
                                        this.order_detail(params)
                                    }
                                }
                            },'详情'),
                            h('Button',{
                                props:{
                                    type: 'warning',
                                    size: 'small' 
                                },
                                on:{
                                    click: () => {
                                        this.open_approve_log(params)
                                    }
                                }
                            },'审批记录')
                        ]);
                    }
                }
            ],
            recordData:[]
        }
    },
    methods:{
        //获取数据字典
        get_data_center(){
            let _self = this
            return new Promise((resolve,reject) => {
                let params = "unusualType"

                function success(res){
                    _self.unusualType = res.data.data.unusualType
                    _self.unusualType_map = _self.$array2map(_self.unusualType)
                    resolve()
                }

                this.$GetDataCenter(params, success)
                
            }) 
        },

        //获取表格数据
        get_table_data(){
            let _self = this
            let url = `api/order/unusual/workorder/auditList`
            _self.tableLoading = true
            let config = {
                params: {
                    isAudit: 'Y',
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i =0; i<_self.data.length; i++){
                    _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                    _self.data[i].unusual_type = _self.unusualType_map.get(_self.data[i].unusual_type)
                }
                _self.tableLoading = false
            }

            this.$Get(url,config,success)
        },

        //导出excel
        download_excel(){
            let field = [
                {field:'unusual_code',title:'订单号码'},
                {field:'companyname',title:'公司名称'},
                {field:'name',title:'客户名称'},
                {field:'tel',title:'客户电话'},
                {field:'product_content',title:'产品内容'},
                {field:'unusual_type',title:'异常类型',format:'unusualType'},
                {field:'tel',title:'客户电话'},
                {field:'apply_memo',title:'审批是由'},
                {field:'current_process_name',title:'流程状态'},
                {field:'realname',title:'创建人'},
                {field:'create_date',title:'创建时间'}
            ]
            let _self = this
            let url = `api/order/unusual/workorder/auditList`
            let config = {
                isAudit: 'Y',
                page: '1',
                pageSize: '1000000',
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },

        //刷新
        refresh(){
            this.get_table_data()
            this.selectRow =""
        },

        //改变页码
        page_change(e){
            this.page = e
            this.data = []
            this.get_table_data()
        },
        //改变每页条数
        page_size_change(e){
            this.pageSize = e
            this.data = []
            this.get_table_data()
        },

        //选择某行
        select_row(e){
            this.selectRow = e
        },

        //  查看审批记录
        open_approve_log(e){
            // let b
            // let a = e.row._info.split('_&_')
            // for(let i =0;i<a.length;i++){
            //     b = a[i].split('``')
            //     console.log(b)
            //     this.recordData.push({
            //         'auditName':b[0],
            //         'record':b[3],
            //         'createDate':b[2]
            //     })
            // }
            // console.log(this.recordData)
            this.$bus.emit("ORDER_AB_APPROVELIST_LOG", e)
        },

        //  查看详情
        order_detail(e){
            this.$bus.emit("OPEN_AB_ORDER_DETAIL", e.row)
        },
       
    },
    created() {
        let _self = this
        _self.get_data_center().then(
            _self.get_table_data()
        )
        _self.$bus.on("UPDATE_AB_ORDER_DATA", (e)=>{
            _self.get_table_data()
        })
    }
}
</script>