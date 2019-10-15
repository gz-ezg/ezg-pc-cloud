<template>
    <Card>
        <Row style="margin-bottom:20px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div slot="content" @keydown.enter="Search">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                            <Row  style="height:56px">
                                <Col span="8">
                                    <FormItem label="外呼时间：" prop="time">
                                        <Date-picker v-model="SearchValidate.time" type="daterange" placeholder="选择日期"></Date-picker>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="销售部门：" prop="depart">
                                        <Select v-model="SearchValidate.depart" size="small" transfer>
                                            <Option v-for="(item, index) in departList" :key=index :value="item.ID">{{item.departname}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <center>
                                <FormItem>
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
        </Row>
    </Card>
</template>

<script>
    import {DateFormat} from "../../../../libs/utils";

    export default {
        name: "index",
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                SearchValidate: {
                    time:"",
                    depart:"",
                },
                data:[],
                departList:[],
                header: [
                    {
                        title: '姓名',
                        key: 'ctuomer_name',
                        minWidth: 100,
                    },
                    {
                        title: '拨打电话总数',
                        key: 'total',
                        minWidth: 100,
                    },
                    {
                        title: '有效接通次数',
                        key: 'dealing',
                        minWidth: 100,
                    },
                    {
                        title: '接通率',
                        key: 'rate',
                        minWidth: 100,
                    },
                    {
                        title: '大于50秒次数',
                        key: 'big50',
                        minWidth: 100,
                    },
                    {
                        title: '有效通话总时长',
                        key: 'allTime',
                        minWidth: 100,
                    }
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            get_data(){
                let _self = this;
                _self.loading = true
                let url = 'api/customer/private/detailListOfCall';
                let config = {
                    params:{
                        beginTime:DateFormat(_self.SearchValidate.time[0]),
                        endTime:DateFormat(_self.SearchValidate.time[1]),
                        departId:_self.SearchValidate.depart,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res) {
                    _self.data = res.data.data.rows
                    _self.data.map(v=>{
                        if (v.dealing==0){
                            v.rate = '0%'
                        } else {
                            v.rate =((v.dealing/v.total).toFixed(3)*100)+'%'
                        }
                    })
                    console.log(_self.data)
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_depart_data(){
                let _self = this;
                let url = `api/system/depart/list`;
                let config = {
                    params: {
                        alias_code:"MARKET",
                        terminal_flag:1
                    }
                }

                function success(res){
                    _self.departList = res.data.data
                    _self.loading = false
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            handleReset() {
                this.SearchValidate = {
                                                time:"",
                                                depart:"",
                                        }
                this.Search();
            },
        },
        created() {
            this.get_depart_data()
            this.get_data()
        }
    }
</script>

<style>

</style>