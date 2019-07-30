<template>
    <Card>
        <Row style="margin-bottom:20px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div slot="content" @keydown.enter="Search">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="企业名称：" prop="CompanyName">
                                        <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="服务人员：" prop="server_realname">
                                        <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="客户跟进：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="电子税务局状态：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                                            <Option :value="1">账号正常</Option>
                                            <Option :value="2">账号异常</Option>
                                            <Option :value="3">无账号</Option>
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
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="add_important_reminder">新增重要提醒</Button>
                <Button type="primary" icon="information-circled" @click="add_account_note">新增做账备注</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="add_unfinished_things">新增未完事项</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="change_accounting">变更会计</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_detail">服务详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="open_acc_change_log">会计变更日志</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_offline">服务下线</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_paused">暂停服务</Button>
            </ButtonGroup>
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
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    begin_end_period: '',
                    end_end_period: '',
                    note_kj_flag: '',
                    etaxStatus: ''
                },
                data:[],
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
        }
    }
</script>

<style>

</style>