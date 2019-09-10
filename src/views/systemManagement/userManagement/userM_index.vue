<template>
    <div style="min-width:1000px">
        
        <Card>
            <search-model :data="searchData" @search="Search"></search-model>
            <Row style="margin-top:10px">
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="createdUser">新增用户</Button>
                    <Button type="primary" icon="plus" @click="updatePassword">修改密码</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="deleteUser">删除用户</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="lockUser">锁定/解锁</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Col :span="frist_span">
                    <Row style="margin-top: 10px;">
                        <Table
                            highlight-row
                            size="small"
                            :loading="userTableLoading"
                            :columns="userColumns"
                            :row-class-name="rowClassName"
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
                </Col>
                <Col span="12" style="margin-top:10px">
                    <Card v-show="isOpen">
                        <p slot="title">
                            {{ cardTitle }}
                        </p>
                        <div slot="extra" @click="isOpen=false;frist_span=24;buttonData=[];rulesData=[]">
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
import searchModel from '../../woa-components/searchModel/index'
import CreateUser from './create_user'
import RoleModal from './role_modal'
import OrganizeModal from './organize_modal'
import LockModal from './lock_user'
import DeleteModal from './delete_user'
import EditModal from './edit_user'
import * as userApi from '../api/user.js'

    export default {
        name: "userManagement_index",
        components:{
            CreateUser,
            RoleModal,
            OrganizeModal,
            LockModal,
            DeleteModal,
            EditModal,
            searchModel
        },
        data() {
            return{
                searchData: [
                    {
                        label: "姓名：",
                        key: 'realname',
                        type: 'input'
                    },
                    {
                        label: "电话：",
                        key: 'mobilephone',
                        type: 'input'
                    },
                    {
                        label: "用户账户：",
                        key: 'username',
                        type: 'input'
                    },
                    {
                        label: "角色ID：",
                        key: 'roleid',
                        type: 'input'
                    },
                    {
                        label: "角色编码：",
                        key: 'rolecode',
                        type: 'input'
                    },
                    {
                        label: "角色名称：",
                        key: 'rolename',
                        type: 'input'
                    },
                ],
                userTableLoading:false,
                current_select_row:"",
                // 第一个列表的占位：
                frist_span: "24",
                SearchValidate:{},
                userPage: 1,
                userPageSize: 10,
                isRM: false,
                isOpen: false,
                userTotal: 0,
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
                        title: '工号',
                        key: 'user_alias_id',
                        minWidth: 150
                    },
                    {
                        title: '用户状态',
                        key: 'status',
                        minWidth: 150
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
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.updateUser(params.row)
                                        }
                                    }
                                }, '用户编辑'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            Search(e){
                Object.assign(this.SearchValidate, e)
                this.userPage = 1
                this.get_user_table()
            },
            // 获取用户数据
            async get_user_table() {
                let _self = this
                this.userTableLoading = true
                let config = {
                    params:{
                        page: this.userPage,
                        pageSize: this.userPageSize,
                        status:"0,1" //加该参数表示需要显示锁定的用户
                    }
                }
                Object.assign(config.params, this.SearchValidate)

                let {rows, total} = await userApi.getUserList(config)

                this.userTotal = total
                this.userData = [];
                for(let i =0;i<rows.length;i++){
                    rows[i].status = rows[i].status==1?"正常":"锁定"
                     this.userData.push(rows[i])
                }
                this.userTableLoading = false
            },

            pageChange(page) {
                let _self = this
                _self.userPage = page
                _self.get_user_table()
            },

            pageSizeChange(pageSize) {
                let _self = this
                _self.userPageSize = pageSize
                _self.get_user_table()
            },

            // 点击【权限设置】 获取菜单列表数据
            async permissions(id) {
                this.frist_span = 12
                this.userId = id
                this.isRM = false
                this.isOpen = true
                this.cardTitle = '权限设置'
                let config = {
                    params: {
                        userId: id
                    }
                }
                try {
                    let data = await userApi.getUserMenusByUserId(config)
                
                    this.roleTree = data.map((item)=>{
                        if(item.children !=null){
                            item.checked = false
                            item.children.map((itemChild)=>{
                                itemChild.title = itemChild.text
                            })
                        }
                        item.title = item.text
                        return item
                    })
                } catch (error) {
                    console.log(error)
                }
            },

            // 点击【权限剔除】 获取菜单列表数据
            async permissionsRM(id) {
                let _self = this
                this.frist_span = 12
                this.userId = id
                this.cardTitle = '权限剔除'
                this.isRM = true
                this.isOpen = true
                let config = {
                    params: {
                        userId: id
                    }
                }
                try {
                    let data = await userApi.getUserRMMenusByUserId(config)
                
                    this.roleTree = data.map((item)=>{
                        if(item.children !=null){
                            item.checked = false
                            item.children.map((itemChild)=>{
                                itemChild.title = itemChild.text
                            })
                        }
                        item.title = item.text
                        return item
                    })
                } catch (error) {
                    console.log(error)
                }

            },

            // 点击菜单  加载页面控件和数据规则
            async roleTreeChange(menu) {
                let _self = this
                let config = {
                    params: {
                        userId: this.userId,
                        interfaceId: menu[0].id
                    }
                }
                let buttonList = []
                let dataList = []
                if(this.isRM == false){
                    [buttonList, dataList] = await Promise.all([
                        userApi.getUserButtonsByUserIdAndInterfaceId(config),
                        userApi.getUserDataRulesByUserIdAndInterfaceId(config)
                    ]);
                }else{
                    [buttonList, dataList] = await Promise.all([
                        userApi.getUserRMButtonsByUserIdAndInterfaceId(config),
                        userApi.getUserRMDataRulesByUserIdAndInterfaceId(config)
                    ]);
                }
                this.menuId = menu[0].id
                this.buttonData = []
                this.rulesData = []
                this.setButton = []
                this.setRules = []

                this.buttonData = buttonList.map((item)=>{
                    if(item.checked == true){
                        this.setButton.push(item.id)
                    }
                    return item;
                })

                this.rulesData = dataList.map((item)=>{
                    if(item.checked == true){
                        this.setRules.push(item.id)
                    }
                    return item;
                })
            },

            allSelect() {
                this.roleTree.map((item)=>{
                    item.checked = true
                })
            },

            // 页面控件配置
            async postButton() {
                let config = {
                    operationIds: _self.buttonSelectData.toString(),
                    interfaceId: _self.menuId,
                    userId: _self.userId,
                }
                
                if (_self.isRM == false) {
                    let {status, data } = await userApi.addInterfaceAndOperationToUser(config)
                } else {
                    let {status, data } = await userApi.addInterfaceAndOperationToUserRM(config)
                }
            },

            // 按钮选中事件
            buttonSelect(button) {
                this.buttonSelectData = button
            },

            // 规则选中事件
            RulesSelect(re) {
                this.rulesSelectData = re
            },

            // 菜单和用户绑定
            async getChecked() {
                let _self = this
                let selectMenu = this.$refs.tree.getCheckedNodes()
                let menuIdList = []
                

                //  此段代码待优化
                for (let i = 0; i < selectMenu.length; i++) {
                    for (let j = 0; j < this.roleTree.length; j++) {
                        if (this.roleTree[j].children != null) {
                            for (let k = 0; k < this.roleTree[j].children.length; k++) {
                                if (this.roleTree[j].children[k].id == selectMenu[i].id) {
                                    let _count = 0
                                    for (let p = 0; p < selectMenu.length; p++) {
                                        if (this.roleTree[j].id == selectMenu[p].id) {
                                            break
                                        } else {
                                            _count++
                                        }
                                    }

                                    if (_count == selectMenu.length) {
                                        selectMenu.push(_self.roleTree[j])
                                    }
                                }
                            }
                        }
                    }
                    menuIdList.push(selectMenu[i].id)
                }

                let config = {
                    userId : this.userId,
                    interfaceIds: menuIdList.join(",")
                }

                // if (this.isRM == false) {
                //     let { status, data } = await userApi.addInterfaceToUser(config)
                // } else {
                //     let { status, data } = await userApi.addInterfaceToUserRM(config)
                // }

                let { status, data } = this.isRM == false ? await userApi.addInterfaceToUser(config):await userApi.addInterfaceToUserRM(config)
            },

            // 规则配置
            async postRules() {
                let config = {
                    dataRuleIds: this.rulesSelectData.toString(),
                    interfaceId: this.menuId,
                    userId: this.userId,
                }

                if (this.isRM == false) {
                    let { status, data } = userApi.addInterfaceAndDataRuleToUser(config)
                } else {
                    let { status, data } = userApi.addInterfaceAndDataRuleToUserRM(config)
                }
            },
            selectRow(e){
                this.current_select_row = e
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
            updateUser(userObj){
                this.$bus.emit('UPDATE_USER',userObj)
            },
            rowClassName(row, index) {
                let _self = this
                if (row.status == "锁定" && row.id != _self.selectRow.id) {
                    return 'demo-table-lock-row';
                }
            }
        },
        created() {
            this.get_user_table()
            let _self = this
            this.$bus.on('UPDATE_USER_TABLE',(e) => {
                _self.get_user_table()
            })
        }
    }
</script>
<style>
.ivu-table .demo-table-lock-row td {
    background-color: #FF3030;
    color:#000;
}
</style>