<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                    <!-- <Search slot="content"></Search> -->
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="formInline" :model="formInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyName" label="公司名称：">
                                        <Input size="small"  type="text" v-model="formInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="servicename" label="服务人员名称：">
                                        <Input size="small"  type="text" v-model="formInline.servicename" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
                <Button type="primary" icon="information-circled" @click="company">查看公司</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                @on-current-change="save_current_row"
                :loading="Sloading"
                @on-row-dblclick="showdetail"
                @on-sort-change="sort"       
                @on-selection-change="get_all_selection"
                ></Table>
            <Page
                placement="top"
                size="small"
                :total="pageTotal"
                show-total
                show-sizer
                show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                style="margin-top: 10px"></Page>
        </Row>

    </Card>
</template>

<script>

export default {
    data() {
            return {
                managestatus:[],
                order:'desc',
                sortField:'updatedate',
                search_model:"",
                //  触发搜索
                isSearh:false,
                //  筛选数据
                formInline:{
                    companyname:'',
                    servicename:'',
                    product:''
                },
                //  加载中
                Sloading:false,
                //  当前选中行
                current_row:'',
                
                //  表格相关data
                pageTotal:new Number(),
                page:'1',
                pageSize:'10',
                data:[],
                header: [
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220,
                        sortable: true,                        
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>12){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,12)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                    },
                    {
                        title: '提示',
                        key: 'baseorderid',
                        width: 120                      
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120,
                        sortable: true                        
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 200,
                        sortable: true,                        
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.product == ''||params.row.product == null){
                                return ''
                            }else if(params.row.product.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.product.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
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
                        title: '产品数量',
                        key: 'productnumber',
                        width: 120,
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120,
                        sortable: true                        
                    },
                    {
                        title: '下个进度',
                        key: 'nextprocess',
                        width: 120,
                        sortable: true                        
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        width: 140,
                        sortable: true                        
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        width: 140,
                        sortable: true                        
                    },
                    {
                        title: '实际完成时间',
                        key: 'UpdateDate',
                        sortable: true,                        
                        width: 140
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120,
                        sortable: true                        
                    },
                    {
                        title: '跟进人',
                        key: 'followname',
                        width: 120,
                        sortable: true      
                    }
                ],
                tempArray:[]
            }
        },
    methods:{
        get_all_selection(e){
            // console.log(e)
            this.tempArray = e
        },
        sort(e){
                console.log(e)
                if(e.key == ""){
                    this.sortField = 'updatedate'   
                }else{
                    if(e.key == 'customer_area'){
                        this.sortField = 'area'
                    }else if(e.key == 'customer_status'){
                        this.sortField = 'customertype'
                    }else{
                        this.sortField = e.key
                    }
                }
                if(e.order == "normal"){
                    this.order = ""
                    this.sortField = "updatedate"
                }else{
                    this.order = e.order
                }
                
                this.getData()
            },
        downloadExcel(){
                let field = [
                    {field:'companyname',title:'公司名称'},
                    // {field:'baseorderid',title:'提示'},
                    {field:'departname',title:'服务部门'},
                    {field:'product',title:'产品全称'},
                    {field:'CurrentProcess',title:'目前进度'},
                    {field:'nextprocess',title:'下个进度'},
                    {field:'ServiceStart',title:'服务开始时间'},
                    {field:'CreateDate',title:'创建时间'},                                                                   
                    {field:'ServiceEnd',title:'实际完成时间'},                                                                     
                    {field:'servername',title:'服务人员'},
                    {field:'followname',title:'跟进人'} 
                ]
                let _self = this
                let url = `api/order/workOrderList`
                let config = {
                        workOrderStatus:'30',
                        page: '1',
                        pageSize: '1000000',                     
                        companyName:_self.formInline.companyname,
                        serviceName:_self.formInline.servicename,
                        product:_self.formInline.product,
                        serviceDept:"'BUSSINESS'",
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
        getData(){
            var _self = this
            _self.Sloading = true
            var url = 'api/order/workOrderList?workOrderStatus=30&'
            var config = {
                params:{
                    sortField:_self.sortField,
                    order:_self.order,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    companyName:_self.formInline.companyname,
                    serviceName:_self.formInline.servicename,
                    product:_self.formInline.product,
                    deleteflag: 5
                }
            }
                
            _self.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)                
                // console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0;i<res.data.data.rows.length;i++){
                    if(_self.data[i].CreateDate!='' && _self.data[i].CreateDate!=null){
                        _self.data[i].CreateDate = _self.data[i].CreateDate.slice(0,10)
                    }
                    if(_self.data[i].ServiceStart!='' && _self.data[i].ServiceStart!=null){
                        _self.data[i].ServiceStart = _self.data[i].ServiceStart.slice(0,10)
                    }
                    if(_self.data[i].UpdateDate!='' && _self.data[i].UpdateDate!=null){
                        _self.data[i].UpdateDate = _self.data[i].UpdateDate.slice(0,10)
                    }
                }
                _self.Sloading = false
            })
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        }, 
        search(){
            this.page = 1
            this.isSearh = true
            this.getData()
        },
        reset(){
            this.isSearh = false
            this.page = 1
            this.formInline.companyname = ""
            this.formInline.servicename = ""
            this.formInline.product = ""
            this.getData()
        },
        
        save_current_row(e){
            this.current_row = e
        },
        showdetail(){
            if(this.current_row != ''){
                this.$store.commit("open_gobal_work_order_detail_modal", this.current_row.id)
            }else{
                this.$Message.warning('请选择一行查看详情！')
            }
        },
        company(){
            if(this.current_row != ''){
                this.$store.commit("open_gobal_company_detail_modal", this.current_row.company_id)
            }else{
                this.$Message.warning('请选择一行查看！')
            }
        },
    },
    created(){
        var _self = this
        this.getData()
    }

}
</script>



