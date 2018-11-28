<template>
    <Card>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="ios-color-wand-outline" @click="showflow">流转</Button>                
                <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
                <Button type="primary" icon="information-circled" @click="company">查看公司</Button>
                
                <!-- <Button type="primary" icon="ios-color-wand-outline">导出Excel</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="product_error">产品异常</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline">批量已读</Button>
                <Button type="primary" icon="ios-color-wand-outline">批量未读</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="foundClues">发现线索</Button>                -->
            </ButtonGroup>
            <Poptip 
                title="筛选" 
                placement="bottom-end" 
                width="350" 
                style="float:right;margin-right:20px"
                
                >
                <Button type="text" size="small" icon="funnel">筛选</Button>
                <div  slot="content" @keydown.enter="search">
                <Form ref="formInline" :model="formInline" :label-width="100">
                    <Row :gutter="16">
                        <Col span="22">
                            <FormItem prop="companyName" label="公司名称：">
                                <Input type="text" v-model="formInline.companyname" placeholder="">
                                </Input>
                            </FormItem>
                        </Col>
                        <Col span="22">
                            <FormItem prop="servicename" label="服务人员名称：">
                                <Input type="text" v-model="formInline.servicename" placeholder="">
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
            </Poptip>
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
                ></Table>
            <Page
                :placement="top"
                size="small"
                :total="pageTotal"
                show-total
                show-sizer
                show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
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
        <!-- <Modal
            v-model="pause"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否暂停/解锁</div>
            <div slot="footer">
                <Button type="primary" @click="pausetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="pause=!pause">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="endlife"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否退款终止</div>
            <div slot="footer">
                <Button type="primary" @click="endlifetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="endlife=!endlife">取消</Button>
            </div>
        </Modal> -->
    </Card>
</template>

<script>
// import Search from './search'
import Bus from '../../../../components/bus'

export default {
    // components:{
    //     Search
    // },
    data() {
            return {
                //  触发搜索
                isSearh:false,
                //  筛选数据
                formInline:{
                    companyname:'',
                    servicename:''
                },
                //  加载中
                Sloading:false,
                //  当前选中行
                current_row:'',
                //  流程图相关,1.弹出框2.流程图地址
                flowChart1:false,
                flowChartImg:'',
                //  暂停/重启
                pause:false,
                //  终止订单
                endlife:false,
                //  表格相关data
                pageTotal:"",
                page:'1',
                pageSize:'10',
                data:[],
                header: [
                    {
                        title: '工单状态',
                        key: 'zhuangtai',
                        width:100,
                        render:(h,params) => {
                            return h('div','服务中')
                        }                    
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220,
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
                    // {
                    //     title: '订单',
                    //     key: 'ordercode',
                    //     width: 150
                    // },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 200,
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
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '下个进度',
                        key: 'nextprocess',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        width: 120
                    },
                    // {
                    //     title: '预计完成时间',
                    //     key: 'baseorderid',
                    //     width: 120
                    // },
                    {
                        title: '实际完成时间',
                        key: 'ServiceEnd',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'followname',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             // console.log(params)
                                //             Bus.$emit('showcompanydetail',params)
                                //         }
                                //     }
                                // }, '[查看公司]'),
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
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            var _self = this
                                            console.log(params)
                                            //  暂停
                                            if(params.row.resumeFlag == null || params.row.resumeFlag == 3){
                                                let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=3`
                                                this.$http.get(url).then(function(res){
                                                    if(res.data.msgCode == 40000){
                                                        _self.$Message.success(res.data.msg)
                                                    }else{
                                                        _self.$Message.error(res.data.msg)
                                                    }
                                                    _self.getData()
                                                })
                                            }else if(params.row.resumeFlag == 2){
                                                let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=2`
                                                this.$http.get(url).then(function(res){
                                                    if(res.data.msgCode == 40000){
                                                        _self.$Message.success(res.data.msg)
                                                    }else{
                                                        _self.$Message.error(res.data.msg)
                                                    }
                                                    _self.getData()
                                                })
                                            }else{}
                                        }
                                    }
                                }, '[暂停/解锁]'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.endlife = true
                                //         }
                                //     }
                                // }, '[退款终止]'),
                            ]);
                        }
                    }
                ]
            }
        },
    methods:{
        getData(){
            var _self = this
            _self.Sloading = true
            var url = 'api/order/workOrderList?workOrderStatus=30&sortField=UpdateDate'
            var config = {
                params:{
                    page:_self.page,
                    pageSize:_self.pageSize,
                    companyName:_self.formInline.companyname,
                    serviceName:_self.formInline.servicename,
                    serviceDept:"'ACCOUNT','AUDIT'",
                    iscycle:'N'                    
                }
            }
                
            _self.$http.get(url,config).then(function(res){
                // console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0;i<res.data.data.rows.length;i++){
                    // console.log(_self.data[i])
                    if(_self.data[i].CreateDate!='' && _self.data[i].CreateDate!=null){
                        _self.data[i].CreateDate = _self.data[i].CreateDate.slice(0,10)
                    }
                    if(_self.data[i].ServiceStart!='' && _self.data[i].ServiceStart!=null){
                        _self.data[i].ServiceStart = _self.data[i].ServiceStart.slice(0,10)
                    }
                    if(_self.data[i].ServiceEnd!='' && _self.data[i].ServiceEnd!=null){
                        _self.data[i].ServiceEnd = _self.data[i].ServiceEnd.slice(0,10)
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
            this.getData()
        },
        //  保存当前选中行
        save_current_row(e){
            this.current_row = e
        },
        showdetail(){
            if(this.current_row != ''){
                Bus.$emit('myCommonTask',this.current_row)
            }else{
                this.$Message.warning('请选择一行查看详情！')
            }
        },
        showflow(){
            if(this.current_row != ''){
                if(this.current_row.resumeFlag == 2){
                    this.$Message.warning('当前工单已锁定！')
                }else{
                    Bus.$emit('myflow',this.current_row)
                }
                
            }else{
                this.$Message.warning('请选择一行进行流转！')
            }
        },
        //  流程图
        flowChart(a) {
                let _self = this
                _self.flowChart1 = true
                _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + a.row.id +'&bussinessType=20&time='+new Date()
        },
        // foundClues(){
        //     Bus.$emit('workOrderClues',true)
        // }
        company(){
            if(this.current_row != ''){
                Bus.$emit('showcompanydetail',this.current_row)
            }else{
                this.$Message.warning('请选择一行查看！')
            }
        }
    },
    created(){
        var _self = this
        this.getData()
        Bus.$on('flowsuccess',(e)=>{
            _self.getData()
        })
    }

}
</script>



