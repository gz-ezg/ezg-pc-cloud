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
                                <Col span="6">
                                    <FormItem label="姓名：" prop="CompanyName">
                                        <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="入职时间：" prop="server_realname">
                                        <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="性别：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="是否员工手册：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row  style="height:56px">
                                <Col span="6">
                                    <FormItem label="转正时间：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="出生年月：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                                            <Option :value="1">账号正常</Option>
                                            <Option :value="2">账号异常</Option>
                                            <Option :value="3">无账号</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="最高学历：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="所在省份：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row  style="height:56px">
                            <Col span="6">
                                <FormItem label="部门：" prop="note_kj_flag">
                                    <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                        <Option value="Y">完成</Option>
                                        <Option value="N">未完成</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="职位：" prop="etaxStatus">
                                    <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                                        <Option :value="1">账号正常</Option>
                                        <Option :value="2">账号异常</Option>
                                        <Option :value="3">无账号</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="是否劳动合同：" prop="note_kj_flag">
                                    <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                        <Option value="Y">完成</Option>
                                        <Option value="N">未完成</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="是否试用：" prop="note_kj_flag">
                                    <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                        <Option value="Y">完成</Option>
                                        <Option value="N">未完成</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                            <Row  style="height:56px">
                                <Col span="6">
                                    <FormItem label="入职年月数：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="婚姻状况：" prop="etaxStatus">
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
                <Button type="primary" icon="ios-color-wand-outline" @click="add">录入</Button>
                <Button type="primary" icon="information-circled" @click="show">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit">修改</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="import_excel">导入Excel</Button>
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
        <info></info>
    </Card>
</template>

<script>
    import Info from '../common/detail'
    export default {
        name: "index",
        components:{
            Info
        },
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
                data:[{name:"vn"}],
                header: [
                    {
                        title: '姓名',
                        key: 'name',
                        minWidth: 220
                    },
                    {
                        title: '部门',
                        key: 'tax_type',
                        width: 180,
                    },
                    {
                        title: '职位',
                        key: 'importantList',
                        minWidth: 220,
                    },
                    {
                        title: '学历',
                        key: 'nationalnum',
                        minWidth: 150,
                    },
                    {
                        title: '毕业年份',
                        key: 'nationalpsw',
                        minWidth: 150,
                    },
                    {
                        title: '毕业院校',
                        key: 'tax_number',
                        minWidth: 150,
                    },
                    {
                        title: '入职时间',
                        key: 'tax_password',
                        minWidth: 150,
                    },
                    {
                        title: '联系方式',
                        key: 'product',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.invoice(params.row);
                                            }
                                        }
                                    },
                                    '[确定离职]'
                                )
                            ]);
                        }
                    },
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            handleReset(){

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
            add(){
                this.$bus.emit("ADD_EMPLOY_INFO",true)
            },
            show(){
                this.$bus.emit("SHOW_EMPLOY_INFO",true)
            },
            edit(){
                this.$bus.emit("EDIT_EMPLOY_INFO",true)
            },
            downloadExcel(){

            },
            import_excel(){

            },
            invoice(){

            }
        }
    }
</script>

<style>

</style>