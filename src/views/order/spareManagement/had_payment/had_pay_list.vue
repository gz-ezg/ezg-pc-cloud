<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model2">
                    <Panel name="1">
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                        <Search slot="content"></Search>
                    </Panel>
                </Collapse>
            </Row>
            
            <Row>
                <div>
                    <ButtonGroup style="float:left">
                        <Button v-permission="['spareM.detail']" type="primary" icon="ios-crop" @click="display">查看</Button>
                        <Button v-permission="['spareM.exportY']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel">导出Excel</Button>
                    </ButtonGroup>
                    <!-- <Search></Search> -->
                </div>
            </Row>
            <Row style="margin-top: 10px;">
                <Table border :columns="header" :data="had_pay_list" highlight-row @on-current-change="save_current" size="small"></Table>
                <Page :total="total_NUM" show-elevator style="margin-top:10px" @on-change="PageChange" @on-page-size-change="PageSizeChange" show-sizer	></Page>
            </Row>     
        </Card>
        <Display></Display>
    </div> 
</template>

<script>
import Search from './search.vue'
import Bus from '../bus'
import Display from './display'

export default {
    data(){
        return{
            search_model2:"",
            np_loading:false,
            searchgroups:{
                companyName:'',
                ordercode:'',
                createbyname:'',
                approval:''
            },
            total_NUM:new Number(),
            page:1,
            pageSize:10,
            had_pay_list:[],
            had_pay_current_row_id:'',
            header: [
                    {
                        title: '订单编号',
                        key: 'ordercode',
                        width: 150
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 150,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.product == ''||params.row.product == null){
                                return ''
                            }else if(params.row.product.length>8){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.product.slice(0,8)+'...'),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.product)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.product)
                            }
                        }
                    },
                    {
                        title: '公司名称',
                        key: 'companyName',
                        width: 200,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyName == ''||params.row.companyName == null){
                                return ''
                            }else if(params.row.companyName.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyName.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyName)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyName)
                            }
                        }
                    },
                    {
                        title: '余款总额',
                        key: 'totalamount',
                        width: 120
                    },
                    {
                        title: '已补余款',
                        key: 'paynumber',
                        width: 100
                    },
                    {
                        title: '剩余余款',
                        key: 'unpaidamount',
                        width: 100
                    },
                    {
                        title: '待审批金额',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'followbyname',
                        width: 100
                    }
                ]
            }
        },
        methods:{
            downloadExcel(){
                let field = [
                    {field:'ordercode',title:'订单号码'},
                    {field:'product',title:'产品名称'},
                    {field:'companyname',title:'公司名称'},
                    {field:'totalamount',title:'余款总额'},
                    {field:'paynumber',title:'已补余款'},
                    {field:'unpaidamount',title:'剩余余款'},
                    {field:'approvalpendingamount',title:'待审批金额'},
                    {field:'followbyname',title:'创建人'}                                                                      
                    ]
                let _that = this
                let url = `api/order/balance/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        isend:'Y',                        
                        companyName:_that.searchgroups.companyName,
                        ordercode:_that.searchgroups.ordercode,
                        createbyname:_that.searchgroups.createbyname,
                        approval:_that.searchgroups.approval,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
        GetTableData(){
            var _that = this
            _that.np_loading = true
            
            var url = 'api/order/balance/list'

                var keys = []; //定义一个数组用来接受key
                var config = {
                    params: {
                    isend:'Y',
                    page: _that.page,
                    pageSize: _that.pageSize,
                    // sortField:'updatedate',
                    companyName:_that.searchgroups.companyName,
                    ordercode:_that.searchgroups.ordercode,
                    createbyname:_that.searchgroups.createbyname,
                    sumField:'unpaidamount,approvalpendingamount,totalamount',
                    sortField:'updatedate'
                    }
                };
                for (var key in _that.searchgroups) {
                    if (_that.searchgroups[key] == "" || _that.searchgroups[key] == null) {
                    delete config.params[key];
                    }
                }

            _that.local_data = []
            this.$http.get(url,config).then(function(res){
                _that.$backToLogin(res)
                
                _that.had_pay_list = res.data.data.rows
                _that.total_NUM = res.data.data.total
                _that.np_loading = false
                
                var approvalpendingamount = res.data.data.sum.approvalpendingamount
                var unpaidamount = res.data.data.sum.unpaidamount
                _that.local_data.push({
                    companyName:'合计',
                    approvalpendingamount:approvalpendingamount,
                    unpaidamount:unpaidamount,

                })
            })
        },
        PageChange(e){
            var _that = this
            _that.page = e
            _that.GetTableData()
            
        },
        PageSizeChange(e){
            var _that = this
            _that.pageSize = e
            _that.GetTableData()
        },
        display(){
            var _that = this
            if(_that.had_pay_current_row_id != ''){
                _that.$bus.emit('select_had_pay', _that.had_pay_current_row_id)
                // Bus.$emit('select_had_pay', _that.had_pay_current_row_id)
            }else{
                _that.$Message.warning('请选择一行')
            }
        },
        save_current(e){
            var _that = this
            _that.had_pay_current_row_id = e.id
        },
        reset(){
            this.searchgroups.companyName= ''
            this.searchgroups.ordercode= ''
            this.searchgroups.createbyname = ''
            this.page = 1;
            this.GetTableData()
        },
        search(e){
            this.searchgroups.companyName= e.companyName
            this.searchgroups.ordercode= e.ordercode
            this.searchgroups.createbyname = e.createbyname
            this.GetTableData()
        },
    },
    created:function(){
        let _self = this
        this.GetTableData()
        this.$bus.on('search1',(e)=>{
            _self.search(e)
        })
        this.$bus.on('reset1',(e)=>{
            _self.reset()
        })
        this.$bus.on('refresh',(e)=>{
            _self.GetTableData()
        })
        // Bus.$on('search1',(e)=>{
        //     this.search(e)
        // })
        // Bus.$on('reset1',(e)=>{
        //     this.reset()
        // })
        // Bus.$on('refresh',(e)=>{
        //     this.GetLocalData()
        // })
    },
    components:{
        Search,
        Display
    }
    }
</script>

<style>

</style>
