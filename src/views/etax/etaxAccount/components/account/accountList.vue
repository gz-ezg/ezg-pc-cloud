<template>
    <div>
        <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="120">
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="账号用户名：" prop="userName">
                                            <Input v-model="formValidateSearch.userName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="服务人员：" prop="realName">
                                            <Input v-model="formValidateSearch.realName" size="small"></Input>
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
            <Button type="primary" @click="openCreateAccount = true">新增</Button>
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
                show-elevator
                :current.sync="page"
                @on-change="pageChange"
                style="margin-top: 10px;padding-bottom:10px"></Page>
        </Row>
        <create-account v-if="openCreateAccount" @close="closeCreateAccount"></create-account>
        <update-account v-if="openUpdateAccount" @close="closeUpdateAccount" :formValidate="currentRow"></update-account>
    </div>
</template>

<script>
import createAccount from './createAccount';
import updateAccount from './updateAccount';

export default {
    components: {
        createAccount,
        updateAccount
    },
    data(){
        return {
            openCreateAccount: false,
            data: [],
            header: [
                {
                    title: "序号",
                    type: 'index',
                    width: 90
                },
                {
                    title: "账号用户名",
                    key: "user_name",
                    minWidth: 250
                },
                {
                    title: "密码",
                    key: "pass_word",
                    minWidth: 300
                },
                {
                    title: "备注",
                    key: "accounter_name",
                    minWidth: 120
                },
                {
                    title: "服务人员",
                    key: 'real_name',
                    minWidth: 120
                },
                {
                    title: "操作",
                    minWidth: 150,
                    render: (h, params) => {
                        return h('div', [
                            h('Button',{
                                props: {
                                    size: "small",
                                    type: "primary"
                                },
                                on: {
                                    click: ()=>{
                                        this.currentRow = params.row
                                        this.openUpdateAccount = true
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    'marginLeft': '5px'
                                }
                            },[
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要删除此附件吗！',
                                    },
                                    on: {
                                        'on-ok': ()=>{
                                            this.del_account(params.row.user_name)
                                        },
                                    }
                                }, '删除')
                            ])
                        ])
                    }
                }
            ],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
            search_model: "",
            formValidateSearch: {
                userName: "",
                realname: "",
            },
            currentRow: "",
            openUpdateAccount: false
        }
    },
    methods: {
        Search() {
            this.page = 1
            this.get_data()
        },
        pageChange(e) {
            this.page = e
            this.get_data()
        },
        handleReset() {
            this.page = 1
            this.$refs["formValidateSearch"].resetFields()
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = 'api/customer/company/gdetax/etaxAccounterList'
            
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    userName: _self.formValidateSearch.userName,
                    realName: _self.formValidateSearch.realName,
                    sortField: "id",
                    order: "desc"
                }
            }

            function success(res){
                _self.loading = false
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        closeCreateAccount(){
            this.openCreateAccount = false
            this.get_data()
        },
        closeUpdateAccount(){
            this.openUpdateAccount = false
            this.get_data()
        },
        del_account(e){
            let _self = this
            let url = `api/customer/company/gdetax/delEtaxAccounter`

            let config = {
                params: {
                    userName: e
                }
            }

            function success(res){
                _self.get_data()
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
