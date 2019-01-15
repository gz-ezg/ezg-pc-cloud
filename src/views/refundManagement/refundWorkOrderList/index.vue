<template>
    <Card>
        <Row style="margin-bottom:10px">
            <search-model :data="searchData" @search="search"></search-model>
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
                :loading="loading"
                @on-row-dblclick="showdetail"
                @on-sort-change="sort"       
            ></Table>
            <Page
                placement="top"
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
        <Modal
                v-model="flowChart1"
                title="查看流程图"
                width="80%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal>
    </Card>
</template>

<script>
import * as workOrderApi from './api.js'
import searchModel from './search'

export default {
    name: "refundWorkOrderList_index",
    components: {
        searchModel
    },
    data() {
            return {
                //  渲染搜索模块专用
                searchData: [
                    {
                        label: "公司名称：",
                        key: "companyName",
                        type: "input"
                    },
                    {
                        label: "服务人员名称：",
                        key: "servicename",
                        type: "input"
                    },
                    {
                        label: "产品名称：",
                        key: "product",
                        type: "input"
                    }
                ],
                order:'desc',
                sortField:'updatedate',
                //  筛选数据
                formInline:{
                    // companyName:'',
                    // servicename:'',
                    // product:''
                },
                //  加载中
                loading:false,
                //  当前选中行
                current_row:'',
                //  流程图相关,1.弹出框2.流程图地址
                flowChart1:false,
                flowChartImg:'',
                //  表格相关data
                total: 0,
                page: 1,
                pageSize: 10,
                data: [],
                header: [
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220,
                        sortable: true,                        
                        render:(h, params) => {
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
                        title: '计划完成时间',
                        key: 'person_plan_finish_date',
                        width: 140,
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        width: 140,
                        sortable: true                        
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120,
                        sortable: true                        
                    },
                    {
                        title: '逾期原因',
                        key: 'overdue_cause',
                        width: 150,
                        render:(h, params) => {
                            if(params.row.overdue_cause == ''||params.row.overdue_cause == null){
                                return ''
                            }else if(params.row.overdue_cause.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.overdue_cause.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:"200px",
                                            whiteSpace: "normal"
                                        }
                                    },[
                                        h('span',params.row.overdue_cause)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.overdue_cause)
                            }
                        }
                    },
                    {
                        title: '跟进人',
                        key: 'followname',
                        width: 120,
                        sortable: true      
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 150,
                        render:(h, params) => {
                            if(params.row.memo == ''||params.row.memo == null){
                                return ''
                            }else if(params.row.memo.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.memo.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:"200px",
                                            whiteSpace: "normal"
                                        }
                                        
                                    },[
                                        h('span',params.row.memo)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.memo)
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.flowChart(params)
                                        }
                                    }
                                }, '[流程图]'),
                            ]);
                        }
                    }
                ],
                tempArray:[]
            }
        },
    methods:{
        sort(e){
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
                
                this.get_data()
            },
        downloadExcel(){
                let field = [
                    {field:'companyname',title:'公司名称'},
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
                    page: '1',
                    pageSize: '1000000',                     
                    // companyName:_self.formInline.companyName,
                    // serviceName:_self.formInline.servicename,
                    // product:_self.formInline.product,
                    deleteflag: 5,
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))
                }
                Object.assign(config, this.formInline)
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
        async get_data(){
            this.loading = true
            let config = {
                params:{
                    sortField:this.sortField,
                    order:this.order,
                    page:this.page,
                    pageSize:this.pageSize,
                    // companyName:this.formInline.companyName,
                    // serviceName:this.formInline.servicename,
                    // product:this.formInline.product,
                    deleteflag: 5,
                }
            }
            Object.assign(config.params, this.formInline)
            try {
                let { total, rows } = await workOrderApi.getWordOrderList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    if(item.CreateDate){
                        item.CreateDate = item.CreateDate.slice(0,10)
                    }
                    if(item.ServiceStart){
                        item.CreateDate = item.CreateDate.slice(0,10)
                    }
                    if(item.UpdateDate){
                        item.CreateDate = item.CreateDate.slice(0,10)
                    }
                    return item
                })
            } catch (error) {
                console.log(error)
            }
            
            this.loading = false
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_data()
        }, 
        search(e){
            // console.log(e)
            //  待解决的问题，如何同时将参数赋值给搜索和导出excel
            Object.assign(this.formInline, e)
            // console.log(this.formInline)
            this.page = 1
            this.get_data()
        },
        // reset(){
        //     this.page = 1
        //     this.formInline.companyname = ""
        //     this.formInline.servicename = ""
        //     this.formInline.product = ""
        //     this.get_data()
        // },
        //  保存当前选中行
        save_current_row(e){
            this.current_row = e
        },
        showdetail(){
            if(this.current_row){
                this.$store.commit("open_gobal_work_order_detail_modal", this.current_row.id)
            }else{
                this.$Message.warning('请选择一行查看详情！')
            }
        },
        //  流程图
        flowChart(a) {
                let _self = this
                _self.flowChart1 = true
                _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + a.row.id +'&bussinessType=20&time='+new Date()
        },
        company(){
            if(this.current_row){
                this.$store.commit("open_gobal_company_detail_modal", this.current_row.company_id)
            }else{
                this.$Message.warning('请选择一行查看！')
            }
        },
    },
    created(){
        this.get_data()
    }
}
</script>



