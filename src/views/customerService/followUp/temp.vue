<template>
    <div>
            <Card>
                <Row style="margin-bottom:20px">
                    <Collapse v-model="search_model">
                        <Panel name="1" >
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            <p slot="content">
                                <div  slot="content" @keydown.enter="search">
                                    <Form ref="searchData" :model="searchData" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="8">
                                                <FormItem prop="createdate" label="创建时间：">
                                                    <DatePicker transfer type="daterange" placement="bottom-start" v-model="searchData.createdate" style="width:100%" size="small"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="updatedate" label="回访时间：">
                                                    <DatePicker transfer type="daterange" placement="bottom-end" v-model="searchData.updatedate" style="width:100%" size="small"></DatePicker>
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
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出跟进记录Excel</Button>
                    <!-- <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcelField">导出外勤Excel</Button>                     -->
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
    </div>
</template>

<script>
import { DateFormat } from '../../../libs/utils.js';

export default {
    data(){
        return{
            search_model:"",
            header:[
                {
                    title:'客户名称',
                    key:'name',
                    width:120
                },
                {
                    title:'联系方式',
                    key: 'tel',
                    width: 120
                },
                {
                    title:'公司名称',
                    key:'companyname',
                    width:200
                },
                {
                    title:'地址',
                    key:'address1',
                    width:120
                },
                {
                    title:'打卡时间',
                    key:'clocktime',
                    width:120
                },
                {
                    title:'服务部门',
                    key:'departname',
                    width:120
                },
                {
                    title:'结束时间',
                    key:'endtime',
                    width:120
                },
                {
                    title:'外勤时长',
                    key:'fieldlength',
                    width:120
                },
                {
                    title:'服务人员',
                    key: 'realname',
                    width:120
                },
                {
                    title:'备注',
                    key: 'remark',
                    width:120
                }
            ],
            data:[],
            loading:false,
            searchData:{
                createdate:[],
                updatedate:[]
            },
            page:1,
            pageSize:10,
            pageTotal:new Number()
        }
    },
    methods: {
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.page = 1
            this.searchData.createdate = []
            this.searchData.updatedate = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        },
        downloadExcel(){
            let field = [
                {field:'companyname',title:'公司名称'},
                {field:'address1',title:'打卡地址'},
                // {field:'baseorderid',title:'提示'},
                {field:'clocktime',title:'打卡时间'},
                // {field:'companyname',title:'公司名称'},
                {field:'departname',title:'服务部门'},
                {field:'endtime',title:'结束时间'},
                {field:'fieldlength',title:'外勤时长'},
                {field:'name',title:'客户名称'},
                {field:'realname',title:'服务人员'},
                {field:'remark',title:'备注'},
                
            ]
            let _self = this
            let url = `api/customer/exportLegworkRecord`
            let config = {
                page: '1',
                pageSize: '1000000',
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field)),      
                bcreatedate:DateFormat(_self.searchData.createdate[0]),
                ecreatedate:DateFormat(_self.searchData.createdate[1]),
                bupdatedate:DateFormat(_self.searchData.updatedate[0]),
                eupdatedate:DateFormat(_self.searchData.updatedate[1]),
                }
            let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
            // console.log(toExcel)
            window.open(toExcel)
        },
        downloadExcelField(){},
        getData(){
            let _self = this
            let url = `api/customer/exportLegworkRecord`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    bcreatedate: DateFormat(_self.searchData.createdate[0]),
                    ecreatedate: DateFormat(_self.searchData.createdate[1]),
                    bupdatedate: DateFormat(_self.searchData.updatedate[0]),
                    eupdatedate: DateFormat(_self.searchData.updatedate[1]),
                }
            }
            this.$http.get(url, config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == "40000"){
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                }else{
                    _self.$Message.error(res.data.msg)
                }
            }).catch(function(res){
                _self.$Message.error("网络异常！")                
            })
        }
    },
    created () {
        this.getData()
    }
}
</script>
