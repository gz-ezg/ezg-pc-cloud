<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1">
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                                <Row>
                                    <Col span="6">
                                        <FormItem label="企业名称：" prop="CompanyName">
                                            <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="服务会计：" prop="server_realname">
                                            <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="结束账期：" prop="followby_realname">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="SearchValidate.date" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="市场人员：" prop="departname">
                                            <Input v-model="SearchValidate.followbyName" size="small" >
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <FormItem style="margin-top: 10px">
                                            <Button size="small" type="primary" @click="Search">搜索</Button>
                                            <Button size="small" type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Col>
                                    <!--<Col span="8">-->
                                    <!--<FormItem label="客户跟进：" prop="note_kj_flag">-->
                                    <!--<Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">-->
                                    <!--<Option value="Y">完成</Option>-->
                                    <!--<Option value="N">未完成</Option>-->
                                    <!--</Select>-->
                                    <!--</FormItem>-->
                                    <!--</Col>-->
                                    <!--<Col span="8">-->
                                    <!--<FormItem label="电子税务局状态：" prop="etaxStatus">-->
                                    <!--<Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">-->
                                    <!--<Option :value="1">账号正常</Option>-->
                                    <!--<Option :value="2">账号异常</Option>-->
                                    <!--<Option :value="3">无账号</Option>-->
                                    <!--</Select>-->
                                    <!--</FormItem>-->
                                    <!--</Col>-->
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";

    export default {
        name: "index",
        data(){
            return{
                search_model:1,
                loading:false,
                data:[],
                total:1000,
                page:1,
                pageSize:10,
                SearchValidate: {
                    date:[],
                    CompanyName: '',
                    server_realname: '',
                    begin_end_period: '',
                    end_end_period: '',
                    departname:'',
                    followbyName:""
                    // note_kj_flag: '',
                    // etaxStatus: ''
                },
                header:[
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 240,
                    },
                    {
                        title: '服务内容',
                        key: 'alisname',
                        minWidth: 140,
                    },
                    {
                        title: '升级意见',
                        key: 'opinion',
                        minWidth: 140,
                    },
                    {
                        title: '提出时间',
                        key: 'createdate',
                        minWidth: 140,
                    },
                    {
                        title: '服务会计',
                        key: 'serverName',
                        minWidth: 140,
                    },
                    {
                        title: '市场',
                        key: 'followbyName',
                        minWidth: 140,
                    }
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            Search(){
                this.page = 1
                this.get_data()
            },
            handleReset(){
                this.$refs["SearchValidate"].resetFields()
                this.SearchValidate.date = []
                this.SearchValidate.CompanyName=null
                this.SearchValidate.server_realname = null
                this.SearchValidate.followbyName=""
                this.get_data()
            },

            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/companyOpinionList`;
                let config = {
                    params:{
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.SearchValidate.CompanyName,
                        followbyName:_self.SearchValidate.followbyName,
                        serverName:_self.SearchValidate.server_realname,
                        beginDate:DateFormat(_self.SearchValidate.date[0]),
                        endDate:DateFormat(_self.SearchValidate.date[1])
                    }
                }
                function success(res){
                    _self.total = res.data.data.total
                    _self.data = res.data.data.rows
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.get_data()
        }
    }
</script>

<style>
    .ivu-col-span-6 {
        height: 28px;
    }
</style>