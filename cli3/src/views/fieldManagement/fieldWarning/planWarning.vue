<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="searchModel" :model="searchModel" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="realname" label="服务人员：">
                                                <Input type="text" v-model="searchModel.realname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="companyname" label="公司名称：">
                                                <Input type="text" v-model="searchModel.companyname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="product" label="产品：">
                                                <Input type="text" v-model="searchModel.product" placeholder="" size="small">
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
                        </p>
                    </Panel>
                </Collapse>
            </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
        </Row>

        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"                     
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
import Bus from '../../../components/bus.js'

export default {
    data(){
        return{
            searchModel:{
                servicer:"",
                companyname:"",
                product:""
            },
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            search_model:"",
            loading:false,
            header:[
                {
                    title: '服务人员',
                    key: 'realname',
                    width: 150
                },
                {
                    title: '公司',
                    key: 'companyname',
                    width: 250
                },
                {
                    title: '产品',
                    key: 'product',
                    width: 150
                },
                {
                    title: '应出外勤/实际外勤',
                    key: 'fieldnum',
                    width: 150
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 200,
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
                                        // Bus.$on('openCompanyDetail',params.row.company_id)
                                        // this.openDetail(params.row)
                                        Bus.$emit('Open_field_Working',params.row.id)
                                        
                                    }
                                }
                            }, '[查看详情]')
                        ])
                    }
                }
            ],
            data:[]
        }
    },
    methods:{
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.$refs['searchModel'].resetFields();
            this.page = 1
            this.getData()
        },
        downloadExcel(){
            let field = [
                {field:'realname',title:'服务人员'},
                {field:'companyname',title:'公司名称'},
                        // {field:'tel',title:'电话'},                {field:'begin_address',title:'打卡地址'},
                {field:'product',title:'产品'},
                {field:'fieldnum',title:'应出外勤/实际外勤'}
            ]
            let _self = this
            let url = `api/legwork/legworkWarningList`
            let config = {
                page: '1',
                pageSize: '1000000',
                type: 'qh',
                realname: _self.searchModel.realname,
                companyname: _self.searchModel.companyname,
                product: _self.searchModel.product,
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        },
        getData(){
            this.loading = true
            let _self = this
            let url = `api/legwork/legworkWarningList`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    type: 'qh',
                    realname: _self.searchModel.realname,
                    companyname: _self.searchModel.companyname,
                    product: _self.searchModel.product
                }
            }

            function success(res){
                _self.loading = false
                // console.log(res.data.data)
                _self.data = res.data.data[1]
                _self.pageTotal = res.data.data[0][0].total
            }
            
            function fail(err){
                _self.loading = false
            }
            this.$Get(url, config,success,fail)
            // this.$http.get(url,config).then(function(res){
            //     _self.$backToLogin(res)
            //     if(res.data.msgCode == "40000"){
            //         _self.data = res.data.data[1]
            //         _self.pageTotal = res.data.data[0][0].total
            //         _self.loading = false
            //     }else{
            //         _self.$Message.error(res.data.msg)
            //         _self.loading = false
            //     }
            // }).catch(function(res){
            //     _self.$Message.error("网络错误！")
            //     _self.loading = false
            // })
        },
        openDetail(e){
            
        }
    },
    created () {
        this.getData()
    }
}
</script>
