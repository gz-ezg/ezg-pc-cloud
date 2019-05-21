<template>
    <div>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model" >
                    <Panel name="1">
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div  slot="content" @keydown.enter="search">
                            <Form ref="formInline" :model="formInline" :label-width="100">
                                <Row :gutter="10">
                                    <Col span="8">
                                        <FormItem prop="companyname" label="公司名称：">
                                            <Input type="text" v-model="formInline.companyname" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="name" label="服务人员：">
                                            <Input type="text" v-model="formInline.serverrealname" placeholder="" size="small">
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
        <ButtonGroup style="margin-bottom:20px">
            <!-- <Button type="primary">导出excel</Button> -->
            <!-- <Button type="primary" icon="plus">更新数据</Button>
            <Button type="primary" icon="ios-information">生成审账列表</Button>
            <Button type="primary" icon="ios-information">生成汇报列表</Button>             -->
        </ButtonGroup>
        <Table
            highlight-row
            size="small"
            :columns="header"
            :data="data"
            :loading="loading"></Table>
        <Page
            size="small"
            :total="pageTotal"
            show-total
            show-sizer
            show-elevator
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            style="margin-top: 10px"></Page>
    </div>
</template>

<script>
import Bus from '../../../../components/bus.js'

export default {
    props:['id','disposes','date'],
    data(){
        return {
            search_model:"",
            formInline:{
                companyname:"",
                serverrealname:""
            },
            loading:false,
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            data:[],
            header:[
                {
                    title:'序号',
                    type:'index',
                    width:60,
                    align:'center'
                // },
                // {
                //     title:'',
                //     key:'id',
                //     width:100
                },{
                    title:'公司名称',
                    key:'companyname',
                    width:240
                },{
                    title:'服务内容',
                    key:'product',
                    width:200
                },{
                    title:'企业疑点数量',
                    key:'company_accord_number',
                    width:120
                },{
                    title:'服务人员',
                    key:'serverrealname',
                    width:120                    
                },{
                    title:'分析时间',
                    key:'createdate',
                    width:120    
                },{
                    title:'警戒值',
                    key:'company_security_line',
                    width:120 
                },{
                    title:'是否处理',
                    key:'batch_book_status_name',
                    width:120    
                },{
                    title:'操作',
                    fixed:'right',
                    width:200,
                    render:(h,params) =>{
                        return h('div',[
                            h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.$emit('OPENDEATAIL',params.row.id)
                                }
                            }
                        }, '[ 报告详情 ]'),
                        h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.$Message.success('信息发送成功！')
                                }
                            }
                        }, '[ 发送短信 ]')
                        ])
                    }
                }
            ],
            pageTotal:new Number()
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.init()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.init()
        },
        search(){
            this.init()
        },
        reset(){
            this.formInline.companyname = ""
            this.formInline.serverrealname = ""
            this.page = 1
            this.init()
        },
        init(){
            this.loading = true
            // console.log('1111')
            let _self = this
            // console.log(this.id)
            let url = `api/order/cycle/finance/analysis/log/list`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    financeAnalysisId: _self.id,
                    period: _self.date,
                    analysisResult:'1',
                    companyname:_self.formInline.companyname,
                    serverrealname:_self.formInline.serverrealname
                }
            }
            this.$http.get(url,config).then(function(res){
                // console.log(res.data.data.rows)
                _self.$backToLogin(res)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    _self.data[i].batch_book_status_name = _self.disposes.get(_self.data[i].batch_book_status)                    
                    _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                }
                _self.loading = false
            })
        }
    },
    watch:{
        'id':'init',
        'date': 'init'
    },
    created () {
        this.init()
        let _self = this
        // console.log(this.id)
        // console.log('11111')
        Bus.$on('update_auditlist_detail',(e)=>{
            _self.init()
        })
    }
}
</script>

