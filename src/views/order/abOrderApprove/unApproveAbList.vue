<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-crop" @click="to_do_work_flow">办理审批</Button>
                    <Button type="primary" icon="ios-color-filter-outline" @click="">刷新</Button>                            
                </ButtonGroup>
            </Row>
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

export default {
    data() {
        return {
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
                }
            ]
        }
    },
    methods:{
        //获取表格数据
        get_table_data(){
            let _self = this
            let url = `api/order/unusual/workorder/auditList`
            _self.tableLoading = true
            let config = {
                params: {
                    isAudit: 'N',
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                console.log(res)
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                _self.tableLoading = false
            }

            this.$Get(url,config,success)
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
        //  打开审批
        to_do_work_flow(e){
            if(e){
                console.log(e)
            }else{
                this.$Message.warning("请选择一行！")
            }
        }
    },
    created() {
        let _self = this
        _self.get_table_data()
    }
}
</script>