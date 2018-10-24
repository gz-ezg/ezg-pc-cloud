<template>
    <div>
        <Card >
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="80" style="margin-top: 15px">
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="订单号码：" prop="ordercode">
                                            <Input v-model="formValidateSearch.ordercode" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="客户名称：" prop="customername">
                                            <Input v-model="formValidateSearch.customername" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="客户电话：" prop="customertel">
                                            <Input v-model="formValidateSearch.customertel" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="创建人：" prop="crealname">
                                            <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem>
                                        <Button type="primary" @click="search">搜索</Button>
                                        <Button type="ghost" @click="handleReset('formValidateSearch')" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row>
            <ButtonGroup>
                <Button v-permission="['orderA.transaction']" type="primary" icon="ios-crop" @click="to_do_work_flow(selectRow)" name="order_approve_submit">办理审批</Button>
                <Button v-permission="['orderA.exportN']" type="primary" icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                <Button type="primary" icon="ios-color-filter-outline" @click="get_table_data">刷新</Button>                            
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
                :loading="tableLoading"></Table>
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
    name: "unFinishApproveList",
    props: {},
    data(){
        return{
            search_model: "",
            tableLoading: false,
            total: 0,
            header: [
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        minWidth: 160
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        // render: (h, params) => {
                        //     if (params.row.companyname == '' || params.row.companyname == null) {
                        //         return ''
                        //     } else {
                        //         return h('Poptip', {
                        //             props: {
                        //                 trigger: 'hover',
                        //                 title: '公司名称',
                        //                 placement: 'bottom'
                        //             }
                        //         }, [
                        //             h('span', params.row.companyname.slice(0,18)),
                        //             // h('Icon', {
                        //             //     props: {
                        //             //         type: 'arrow-down-b'
                        //             //     }
                        //             // }),
                        //             h('div', {
                        //                 slot: 'content'
                        //             }, [
                        //                 h('span', params.row.companyname)
                        //             ])
                        //         ])
                        //     }
                        // },
                        // ellipsis: true,
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
                        title: '创建人',
                        key: 'crealname',
                        minWidth: 100
                    },
                    {
                        title: '跟进人',
                        key: 'frealname',
                        minWidth: 100
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 100
                    },
                    {
                        title: '缴费时间',
                        key: 'payTime',
                        minWidth: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydirName',
                        minWidth: 100
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        minWidth: 100
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        minWidth: 100
                    },
                    {
                        title: '余款',
                        key: 'neednumber',
                        minWidth: 100
                    },
                    {
                        title: '当前流程',
                        key: 'ProcessType',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        minWidth: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        // permission: "['orderA.recordN']"
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: 'orderA.recordN'
                                        }
                                    ],
                                    on: {
                                        click: () => {
                                            this.open_approve_log(params)
                                        }
                                    }
                                }, '审批记录')
                            ]);
                        }
                    }
                ],
            data: [],
            page: 1,
            pageSize: 10,
            //  筛选条件
            formValidateSearch: {
                ordercode: "",
                companyname: "",
                customername: "",
                customertel: "",
                crealname: ""
            },
            //  数据字典
            payDirs: [],
            payDirs_Map: new Map(),
            //  当前选中的行
            selectRow: ""
        }
    },
    methods:{
        //  获取表格数据
        download_excel(){
            let field = [
                {field:'ordercode',title:'订单号码'},
                {field:'companyname',title:'公司名称'},
                {field:'name',title:'客户名称'},
                {field:'crealname',title:'创建人'},
                {field:'frealname',title:'跟进人'},
                {field:'base_createdate',title:'创建时间'},
                {field:'payTime',title:'缴费时间'},                                      
                {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                {field:'paynumber',title:'订单总价'},
                {field:'realnumber',title:'已付款'},
                {field:'neednumber',title:'余款'},
                {field:'ProcessType',title:'当前流程'}                               
            ]
            let _self = this
            let url = `api/order/auditList`
            let config = {
                page: '1',
                pageSize: '1000000',
                isAudit:'N',
                sortField:'id',
                order:'desc',
                ordercode:_self.formValidateSearch.ordercode,
                companyname:_self.formValidateSearch.companyname,
                customername:_self.formValidateSearch.customername,
                customertel:_self.formValidateSearch.customertel,
                crealname:_self.formValidateSearch.crealname,
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        get_table_data(){
            let _self = this
            let url = 'api/order/auditList'
            _self.tableLoading = true

            let config = {
                params: {
                    isAudit:'N',
                    sortField:'id',
                    order:'desc',
                    page:_self.page,
                    pageSize:_self.pageSize,
                    ordercode:_self.formValidateSearch.ordercode,
                    companyname:_self.formValidateSearch.companyname,
                    customername:_self.formValidateSearch.customername,
                    customertel:_self.formValidateSearch.customertel,
                    crealname:_self.formValidateSearch.crealname,
                    // sumField:'paynumber,realnumber,neednumber',
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    if(_self.data[i].base_createdate){
                        _self.data[i].createdate = _self.data[i].base_createdate.slice(0,10)
                    }
                    _self.data[i].paydirName = _self.payDirs_Map.get(_self.data[i].base_paydir)
                }
                _self.tableLoading = false
            }

            this.$Get(url, config, success)
        },
        search(){
            this.page = 1
            this.get_table_data()
        },
        page_change(e){
            this.page = e
            this.get_table_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_table_data()
        },
        handleReset(e){
            this.page = 1
            this.$refs[e].resetFields()
            this.get_table_data()
        },
        select_row(e){
            this.selectRow = e
        },
        //  打开审批
        to_do_work_flow(e){
            if(e){
                this.$ButtonCollect("order_approve_submit")
                this.$bus.emit("ORDER_APPROVE_DEALWITH", e.id)
            }else{
                this.$Message.warning("请选择一行！")
            }
            
        },
        //  查看审批记录
        open_approve_log(e){
            this.$bus.emit("ORDER_APPROVELIST_LOG", e.row.id)
        },
        get_data_center(){
            let _self = this
            let params = "payDirs"

            function success(res){
                _self.payDirs = res.data.data.payDirs
                _self.payDirs_Map = _self.$array2map(_self.payDirs)
                _self.get_table_data()
            }

            this.$GetDataCenter(params, success)
        }
    },
    created() {
        let _self = this
        _self.get_data_center()
        _self.$bus.on("UPDATE_ORDER_DATA", (e)=>{
            _self.get_table_data()
        })
    },
    mounted() {
        
    },
}
</script>

