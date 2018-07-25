<template>
    <div style="min-width:1000px">
        <Row >
            <Card>
                <Form ref="SearchValidate" :model="SearchValidate" :label-width="80" style="margin-top: 15px" >
                <Row :gutter="8">
                    <Col span="8">
                        <FormItem label="名字：" prop="realname">
                            <Input v-model="SearchValidate.realname" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="电话：" prop="mobilephone">
                            <Input v-model="SearchValidate.mobilephone" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="用户账户：" prop="username">
                            <Input v-model="SearchValidate.username" size="small"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="8">
                    <Col span="8">
                        <FormItem label="角色ID：" prop="roleid">
                            <Input v-model="SearchValidate.roleid" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="角色编码：" prop="rolecode">
                            <Input v-model="SearchValidate.rolecode" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="角色名称：" prop="rolename">
                            <Input v-model="SearchValidate.rolename" size="small"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <center>
                    <FormItem>
                        <Button type="primary" @click="Search" >搜索</Button>
                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </center>
            </Form>
            </Card>
        </Row>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="createdUser">新增用户</Button>
                    <Button type="primary" icon="plus" @click="updatePassword">修改密码</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="deleteUser">删除用户</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="lockUser">锁定/解锁</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Col :span="frist_span">
                    <Card>
                        <Row style="margin-top: 10px;">
                            <Table
                                    highlight-row
                                    size="small"
                                    :loading="user_table_loading"
                                    :columns="userColumns"
                                    @on-current-change="selectRow"
                                    :data="userData"></Table>
                            <Page
                                    size="small"
                                    :total="userTotal"
                                    show-total
                                    show-sizer
                                    show-elevator
                                    :current.sync="userPage"
                                    @on-change="pageChange"
                                    @on-page-size-change="pageSizeChange"
                                    style="margin-top: 10px"></Page>
                        </Row>
                    </Card>
                </Col>
                <Col span="12">
                    <Card v-show="isOpen">
                        <p slot="title">
                            {{ cardTitle }}
                        </p>
                        <div slot="extra" @click="isOpen=false;frist_span=24">
                            <Icon type="close"></Icon>
                        </div>
                        <Row>
                            <Col span="8">
                                <Card>
                                    <p slot="title">
                                        菜单列表
                                        <Icon type="android-done-all" style="float: right"
                                            @click.native="getChecked"></Icon>
                                    </p>
                                    <Button type="ghost" @click="allSelect">全选</Button>
                                    <Button type="ghost" v-if="isRM == false" @click="permissions(userId)">重置</Button>
                                    <Button type="ghost" v-if="isRM == true" @click="permissionsRM(userId)">重置</Button>
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
                                        <Row v-for="(item, index) in buttonData" :key=index>
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
                                        <Row v-for="(item, index) in rulesData" :key=index>
                                            <Checkbox :label="item.id">{{ item.text }}</Checkbox>
                                        </Row>
                                    </CheckboxGroup>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
        <create-user></create-user>
        <edit-modal></edit-modal>
        <role-modal></role-modal>
        <organize-modal></organize-modal>
        <lock-modal></lock-modal>
        <delete-modal></delete-modal>
    </div>
</template>

<script>
import CreateUser from './create_user'
import RoleModal from './role_modal'
import OrganizeModal from './organize_modal'
import LockModal from './lock_user'
import DeleteModal from './delete_user'
import EditModal from './edit_user'

    export default {
        components:{
            CreateUser,
            RoleModal,
            OrganizeModal,
            LockModal,
            DeleteModal,
            EditModal
        },
        data() {
            return{
                user_table_loading:false,
                current_select_row:"",
                // 第一个列表的占位：
                frist_span: "24",
                SearchValidate:{
                    realname:"",
                    mobilephone:"",
                    username:"",
                    roleid:"",
                    rolecode:"",
                    rolename:""
                },
                userPage: 1,
                userPageSize: 10,
                isRM: false,
                isOpen: false,
                userTotal: new Number(),
                cardTitle: '',
                userId: '',
                menuId: '',
                userData: [],
                roleTree: [],
                setRules: [],
                setButton: [],
                rulesSelectData: [],
                buttonData: [],
                rulesData: [],
                buttonSelectData: [],
                userColumns: [
                    {
                        title: '用户名',
                        key: 'username',
                        minWidth: 120
                    },
                    {
                        title: '真实姓名',
                        key: 'realname',
                        minWidth: 120
                    },
                    {
                        title: '角色',
                        key: 'userkey',
                        minWidth: 300
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 240,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.permissions(params.row.id)
                                        }
                                    }
                                }, '权限设置'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.permissionsRM(params.row.id)
                                        }
                                    }
                                }, '权限剔除'),
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             // this.permissions(params.row.id)
                                //             this.updateUser(params.row)
                                //         }
                                //     }
                                // }, '用户编辑'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            keydown_search(e){
                console.log(e)
            },
            Search(){
                this.userPage = 1
                this.getUserTable()
            },
            handleReset(){
                let _self = this
                _self.SearchValidate.realname = ""
                _self.SearchValidate.mobilephone = ""
                _self.SearchValidate.username = ""
                _self.SearchValidate.roleid = ""
                _self.SearchValidate.rolecode = ""
                _self.SearchValidate.rolecode = ""
                _self.SearchValidate.rolename = ""
                _self.userPage = 1
                _self.getUserTable()

            },
            // 获取用户数据
            getUserTable() {
                let _self = this
                let url = 'api/user/list'
                _self.user_table_loading = true
                let config = {
                    params:{
                        page: _self.userPage,
                        pageSize: _self.userPageSize,
                        realname: _self.SearchValidate.realname,
                        mobilephone: _self.SearchValidate.mobilephone,
                        username: _self.SearchValidate.username,
                        roleid: _self.SearchValidate.roleid,
                        rolecode: _self.SearchValidate.rolecode,
                        rolename: _self.SearchValidate.rolename
                    }
                }
                function doSuccess(re) {
                    let _data = re.data.data
                    _self.userTotal = _data.total
                    _self.userData = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.userData.push({
                            id: _data.rows[i].id,
                            username: _data.rows[i].username,
                            realname: _data.rows[i].realname,
                            userkey: _data.rows[i].userkey,
                            status: _data.rows[i].status,
                            mobilephone: _data.rows[i].mobilephone,
                            email: _data.rows[i].email
                        })
                    _self.user_table_loading = false                 
                    }
                }

                this.$Get(url, config, doSuccess)
            },

            pageChange(a) {
                let _self = this
                _self.userPage = a
                _self.getUserTable()
            },

            pageSizeChange(a) {
                let _self = this
                _self.userPageSize = a
                _self.getUserTable()
            },

            // 点击【权限设置】 获取菜单列表数据
            permissions(a) {
                let _self = this
                _self.frist_span = 12
                let url = '/user/role/getUserMenusByUserId?userId=' + a
                _self.userId = a
                _self.isRM = false
                _self.isOpen = true
                _self.cardTitle = '权限设置'

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
                }

                this.GetData(url, doSuccess)
            },

            // 点击【权限剔除】 获取菜单列表数据
            permissionsRM(a) {
                let _self = this
                _self.frist_span = 12
                let url = '/user/role/getUserRMMenusByUserId?userId=' + a
                _self.userId = a
                _self.cardTitle = '权限剔除'
                _self.isRM = true
                _self.isOpen = true

                function doSuccess(re) {
                    _self.roleTree = []
                    for (let i = 0; i < re.data.data.length; i++) {
                        re.data.data[i].checked = false
                        if (re.data.data[i].children != null) {
                            for (let j = 0; j < re.data.data[i].children.length; j++) {
                                re.data.data[i].children[j].title = re.data.data[i].children[j].text
                            }
                        }
                        re.data.data[i].title = re.data.data[i].text
                        _self.roleTree.push(re.data.data[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 点击菜单  加载页面控件和数据规则
            roleTreeChange(a) {
                let _self = this
                let url = ''
                let url2 = ''

                if (_self.isRM == false) {
                    url = '/user/role/getUserButtonsByUserIdAndInterfaceId?userId=' + _self.userId + '&interfaceId=' + a[0].id
                    url2 = '/user/role/getUserDataRulesByUserIdAndInterfaceId?userId=' + _self.userId + '&interfaceId=' + a[0].id
                } else {
                    url = '/user/role/getUserRMButtonsByUserIdAndInterfaceId?userId=' + _self.userId + '&interfaceId=' + a[0].id
                    url2 = '/user/role/getUserRMDataRulesByUserIdAndInterfaceId?userId=' + _self.userId + '&interfaceId=' + a[0].id
                }
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

            allSelect() {
                let _self = this

                for (let i = 0; i < _self.roleTree.length; i++) {
                    _self.roleTree[i].checked = true
                }
            },

            // 页面控件配置
            postButton() {
                let _self = this
                let url = ''
                let _data = {
                    operationIds: _self.buttonSelectData.toString(),
                    interfaceId: _self.menuId,
                    userId: _self.userId,
                }

                if (_self.isRM == false) {
                    url = '/user/role/addInterfaceAndOperationToUser'
                } else {
                    url = '/user/role/addInterfaceAndOperationToUserRM'
                }

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _data, doSuccess)
            },

            // 按钮选中事件
            buttonSelect(re) {
                let _self = this
                _self.buttonSelectData = re
                console.log(re)
            },

            // 菜单和用户绑定
            getChecked() {
                let _self = this
                let _select = _self.$refs.tree.getCheckedNodes()
                let _data = []
                let url = ''
                let _postdata = {}

                if (_self.isRM == false) {
                    url = '/user/role/addInterfaceToUser'
                } else {
                    url = '/user/role/addInterfaceToUserRM'
                }

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

                _postdata.userId = _self.userId
                _postdata.interfaceIds = _data.toString()

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _postdata, doSuccess)
            },

            // 规则配置
            postRules() {
                let _self = this
                let url = ''
                let _data = {
                    dataRuleIds: _self.rulesSelectData.toString(),
                    interfaceId: _self.menuId,
                    userId: _self.userId,
                }

                if (_self.isRM == false) {
                    url = '/user/role/addInterfaceAndDataRuleToUser'
                } else {
                    url = '/user/role/addInterfaceAndDataRuleToUserRM'
                }

                function doSuccess(re) {
                    _self.$Message.success('保存成功');
                }

                this.PostData(url, _data, doSuccess)
            },
            selectRow(e){
                this.current_select_row = e
            },

            // 规则选中事件
            RulesSelect(re) {
                let _self = this
                _self.rulesSelectData = re
            },

            //  新增用户
            createdUser(){
                this.$bus.emit("CREATED_USER",true)
            },

            //  修改密码
            updatePassword(){
                let _self = this
                if(this.current_select_row){
                    this.$bus.emit('CHANGE_PASSWORD',_self.current_select_row)                    
                }else{
                    this.$Message.warning("请选择一行！")
                }
            },

            //  删除用户
            deleteUser(){
                let _self = this
                if(this.current_select_row){
                    this.$bus.emit('DELETE_USER',_self.current_select_row)
                }else{
                    this.$Message.warning("请选择一行！")
                }
            },

            //  锁定/接触用户
            lockUser(){
                let _self = this
                if(this.current_select_row){
                    this.$bus.emit('LOCK_USER',_self.current_select_row)
                }else{
                    this.$Message.warning("请选择一行！")
                }
            },

            //  编辑用户
            updateUser(e){
                this.$bus.emit('UPDATE_USER',e)
            }
        },
        created() {
            this.getUserTable()
            let _self = this
            this.$bus.on('UPDATE_USER_TABLE',(e) => {
                _self.getUserTable()
            })
        }
    }
</script>