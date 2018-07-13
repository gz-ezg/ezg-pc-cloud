<template>
    <div>
        <Row>
            <Col span="12">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="plus" @click="clickAdd">角色录入</Button>
                            <Button type="primary" icon="edit" @click="clickEdit">角色编辑</Button>
                            <Button type="primary" icon="ios-crop" @click="detailCustomers()">导入</Button>
                            <Button type="primary" icon="ios-crop" @click="flowChart()">导出</Button>
                            <Button type="primary" icon="ios-crop" @click="reApplyProcess()">模板下载</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="roleColumns"
                                @on-row-click="selectRow"
                                :data="roleData"></Table>
                        <Page
                                size="small"
                                :total="roleTotal"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync="currentPage"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
            <Col span="12">
                <Card v-show="isQX">
                    <Row>
                        <Col span="8">
                            <Card>
                                <p slot="title">
                                    菜单列表
                                    <Icon type="android-done-all" style="float: right"
                                          @click.native="getChecked"></Icon>
                                </p>
                                <Button type="ghost" @click="allSelect">全选</Button>
                                <Button type="ghost" @click="permissions(roleId)">重置</Button>
                                <Tree
                                        :data="roleTree"
                                        ref="tree"
                                        show-checkbox
                                        @on-select-change="roleTreeChange"></Tree>
                            </Card>
                        </Col>
                        <Col span="8">
                            <Card>
                                <p slot="title">
                                    页面控件权限配置
                                    <Icon type="android-done-all" style="float: right"
                                          @click.native="postButton"></Icon>
                                </p>
                                <CheckboxGroup v-model="setButton" @on-change="buttonSelect">
                                    <Row v-for="(item,index) in buttonData" :key=index>
                                        <Checkbox :label="item.id">{{ item.text }}</Checkbox>
                                    </Row>
                                </CheckboxGroup>
                            </Card>
                        </Col>
                        <Col span="8">
                            <Card>
                                <p slot="title">
                                    数据规则权限
                                    <Icon type="android-done-all" style="float: right" @click.native="postRules"></Icon>
                                </p>
                                <CheckboxGroup v-model="setRules" @on-change="RulesSelect">
                                    <Row v-for="(item,index) in rulesData" :key=index>
                                        <Checkbox :label="item.id">{{ item.text }}</Checkbox>
                                    </Row>
                                </CheckboxGroup>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card v-show="isJS">
                   <!-- <Form :model="formItem" :label-width="80">
                        <Row :gutter="16">
                            <Col span="8">
                                <FormItem label="用户名">
                                    <Input v-model="formItem.input"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="真实姓名">
                                    <Input v-model="formItem.input"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <Button type="primary" @click="clickAdd">搜索</Button>
                                <Button type="primary" @click="clickEdit">重置</Button>
                            </Col>
                        </Row>
                    </Form>-->
                    <Row>
                        <Table highlight-row :columns="userColumns" :data="userData"></Table>
                        <Page
                                size="small"
                                :total="userTotal"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="userPageChange"
                                @on-page-size-change="userPageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal
                v-model="roleAdd"
                :title="roleTitle"
                :loading="loading"
                width="30%"
                @on-ok="postRole('roleAddForm')"
                @on-cancel="cancel('roleAddForm')">
            <Form ref="roleAddForm" :rules="roleAddRule" :model="roleAddForm" :label-width="100">
                <FormItem label="角色名称" prop="rolename">
                    <Input size="small" v-model="roleAddForm.rolename"/>
                </FormItem>
                <FormItem label="角色编码" prop="rolecode">
                    <Input size="small" v-model="roleAddForm.rolecode"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isQX: false,
                isJS: false,
                loading: true,
                roleAdd: false,
                isAdd: false,
                formItem: {},
                roleTree: [],
                setButton: [],
                setRules: [],
                userData: [],
                currentPage: 1,
                rolePage: 1,
                rolePageSize: 10,
                userPage: 1,
                userPageSize: 10,
                userTotal: '',
                roleTitle: '',
                roleTotal: '',
                roleId: '',
                menuId: '',
                userId: '',
                selectRoleId: '',
                roleData: [],
                rulesData: [],
                buttonSelectData: [],
                rulesSelectData: [],
                selectRowData: {},
                buttonData: [],
                roleAddForm: {
                    rolename: '',
                    rolecode: '',
                },
                userColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '真实姓名',
                        key: 'realname'
                    },
                ],
                roleAddRule: {
                    rolename: [
                        {required: true, message: '请填写角色名称', trigger: 'blur'}
                    ],
                    rolecode: [
                        {required: true, message: '请填写角色编码', trigger: 'blur'}
                    ],
                },
                roleColumns: [
                    {
                        title: '角色编码',
                        key: 'rolecode'
                    },
                    {
                        title: '角色名称',
                        key: 'rolename'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteRole(params)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.cheekUser(params.row.id)
                                        }
                                    }
                                }, '用户'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.permissions(params.row.id)
                                        }
                                    }
                                }, '权限设置')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            // 获取角色表格数据
            getTableData() {
                let _self = this
                let url = '/user/role/list?page=' + _self.rolePage + '&pageSize=' + _self.rolePageSize

                function doSuccess(re) {
                    let _data = re.data.data
                    _self.roleData = []
                    _self.roleTotal = _data.total
                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.roleData.push({
                            id: _data.rows[i].ID,
                            rolecode: _data.rows[i].rolecode,
                            rolename: _data.rows[i].rolename,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 角色-翻页
            pageChange(a) {
                let _self = this
                _self.rolePage = a
                _self.getTableData()
            },

            // 角色-改变每页显示条数
            pageSizeChange(a) {
                let _self = this
                _self.rolePageSize = a
                _self.getTableData()
            },

            // 点击【权限设置】 获取菜单列表数据
            permissions(a) {
                let _self = this
                let url = '/user/role/getMenusByRoleId?roleId=' + a
                _self.roleId = a
                _self.isQX = true
                _self.isJS = false

                function doSuccess(re) {
                    _self.roleTree = []
                    for (let i = 0; i < re.data.data.length; i++) {
                        if (re.data.data[i].children != null) {
                            re.data.data[i].checked = false
                            for (let j = 0; j < re.data.data[i].children.length; j++) {
                                re.data.data[i].children[j].title = re.data.data[i].children[j].text
                            }
                        }
                        re.data.data[i].title = re.data.data[i].text
                        _self.roleTree.push(re.data.data[i])
                    }
                    console.log(_self.roleTree)
                }

                this.GetData(url, doSuccess)
            },

            // 点击菜单  加载页面控件和数据规则
            roleTreeChange(a) {
                let _self = this
                let url = '/user/role/getButtonsByRoleIdAndInterfaceId?roleId=' + _self.roleId + '&interfaceId=' + a[0].id
                let url2 = '/user/role/getDataRulesByRoleIdAndInterfaceId?roleId=' + _self.roleId + '&interfaceId=' + a[0].id
                _self.menuId = a[0].id
                _self.buttonData = []
                _self.rulesData = []
                _self.setButton = []
                _self.setRules = []

                function doSuccess(re) {
                    _self.buttonData = re.data.data

                    for (let i = 0; i < _self.buttonData.length; i++) {
                        if (_self.buttonData[i].checked == true) {
                            _self.setButton.push(_self.buttonData[i].id)
                        }
                    }
                }

                function doSuccess2(re) {
                    _self.rulesData = re.data.data

                    for (let i = 0; i < _self.rulesData.length; i++) {
                        if (_self.rulesData[i].checked == true) {
                            _self.setRules.push(_self.rulesData[i].id)
                        }
                    }
                }

                this.GetData(url, doSuccess)
                this.GetData(url2, doSuccess2)
            },

            // 【角色录入】
            clickAdd() {
                let _self = this
                _self.roleAdd = true
                _self.isAdd = true
                _self.roleTitle = '角色新增'
            },

            // 【角色编辑】
            clickEdit() {
                let _self = this

                if (_self.selectRoleId == '') {
                    _self.$Message.warning('请选择要编辑的角色');
                } else {
                    _self.roleAdd = true
                    _self.isAdd = false
                    _self.roleTitle = '角色编辑'
                    _self.roleAddForm.id = _self.selectRowData.id,
                        _self.roleAddForm.rolecode = _self.selectRowData.rolecode,
                        _self.roleAddForm.rolename = _self.selectRowData.rolename
                }
            },

            // 删除角色
            deleteRole(re) {
                let _self = this
                let url = '/user/role/update'
                let _data = {
                    id: re.row.id,
                    deleteflag: 1
                }

                function doSuccess(re) {
                    _self.$Message.success('删除成功');
                    _self.getTableData()
                }

                this.PostData(url, _data, doSuccess)
            },

            // 角色列表 行点击事件
            selectRow(re) {
                let _self = this
                _self.selectRoleId = re.id
                _self.selectRowData = re
            },

            // 模态框取消事件
            cancel(name) {
                this.$refs[name].resetFields();
            },

            // 角色录入或编辑 提交事件
            postRole(name) {
                let _self = this

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let url = ''

                            if (_self.isAdd == true) {
                                url = '/user/role/create'
                            } else {
                                url = '/user/role/update'
                            }

                            function doSuccess(re) {
                                _self.$Message.success('提交成功');
                                _self.getTableData()
                                _self.isAdd = false
                                _self.roleAdd = false
                                _self.cancel('roleAddForm')
                            }

                            this.PostData(url, _self.roleAddForm, doSuccess)
                        }
                    })
                }, 2000)
            },

            // 菜单和角色绑定
            getChecked() {
                let _self = this
                let _select = _self.$refs.tree.getCheckedNodes()
                let _data = []
                let url = '/user/role/addInterfaceToRole'
                let _postdata = {}

                for (let i = 0; i < _select.length; i++) {
                    for (let j = 0; j < _self.roleTree.length; j++) {
                        if (_self.roleTree[j].children != null) {
                            for (let k = 0; k < _self.roleTree[j].children.length; k++) {
                                if (_self.roleTree[j].children[k].id == _select[i].id) {
                                    let _count = 0
                                    for (let p = 0; p < _select.length; p++) {
                                        if (_self.roleTree[j].id == _select[p].id) {
                                            break
                                        } else {
                                            _count++
                                        }
                                    }

                                    if (_count == _select.length) {
                                        _select.push(_self.roleTree[j])
                                    }
                                }
                            }
                        }
                    }
                    _data.push(_select[i].id)
                }

                _postdata.roleId = _self.selectRoleId
                _postdata.interfaceIds = _data.toString()

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _postdata, doSuccess)
            },

            // 菜单列表全选
            allSelect() {
                let _self = this

                for (let i = 0; i < _self.roleTree.length; i++) {
                    _self.roleTree[i].checked = true
                }
            },

            // 按钮选中事件
            buttonSelect(re) {
                let _self = this
                _self.buttonSelectData = re
            },

            // 规则选中事件
            RulesSelect(re) {
                let _self = this
                _self.rulesSelectData = re
            },

            // 页面控件配置
            postButton() {
                let _self = this
                let url = '/user/role/addInterfaceAndOperationToRole'
                let _data = {
                    operationIds: _self.buttonSelectData.toString(),
                    interfaceId: _self.menuId,
                    roleId: _self.selectRoleId,
                }

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _data, doSuccess)
            },

            // 规则配置
            postRules() {
                let _self = this
                let url = '/user/role/addInterfaceAndDataRuleToRole'
                let _data = {
                    dataRuleIds: _self.rulesSelectData.toString(),
                    interfaceId: _self.menuId,
                    roleId: _self.selectRoleId,
                }

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _data, doSuccess)
            },

            // 获取用户列表
            cheekUser(a) {
                let _self = this
                let url = '/user/list?page=' + _self.userPage + '&pageSize=' + _self.userPageSize + '&roleid=' + a

                function doSuccess(re) {
                    let _data = re.data.data
                    _self.isJS = true
                    _self.isQX = false
                    _self.userData = []
                    _self.userId = a
                    _self.userTotal = _data.total

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.userData.push({
                            id: _data.rows[i].id,
                            username: _data.rows[i].username,
                            realname: _data.rows[i].realname,
                        })
                    }

                }

                this.GetData(url, doSuccess)
            },

            userPageChange(a) {
                let _self = this
                _self.userPage = a
                _self.cheekUser(_self.userId)
            },

            userPageSizeChange(a) {
                let _self = this
                _self.userPageSize = a
                _self.cheekUser(_self.userId)
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>