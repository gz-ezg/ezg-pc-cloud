<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" @click="create_depart">新增</Button>
                </ButtonGroup>
            </Row>
            <Row :gutter="20" style="margin-top:10px">
                <Spin  v-if="loading" size="large" style="margin-left:50%;margin-top:5%"></Spin>
                <Row v-else :gutter="20">
                    <Col :span="firstSpan">
                        <tree-table 
                            :data="data" 
                            :columns="columns" 
                            border
                            @edit="edit_depart" 
                            @delete="delete_depart"
                            @create="create_depart"
                            @show_person="show_person"
                            @setting="setting"/>
                    </Col>
                    <Col span="12" v-if="showDepartUser">
                        <Card dis-hover :title="currentRow.departname">
                            <Row :gutter="20" style="margin-bottom:10px">
                                <ButtonGroup>
                                    <Button type="primary" @click="openCreateUser = true">新增成员</Button>
                                    <Button type="primary" icon="close" @click="close_depart_user">关闭</Button>
                                </ButtonGroup>
                            </Row>
                            <Row :gutter="20">
                                <depart-user :departId="currentRow.ID"></depart-user>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Row>
        </Card>
        <create-depart 
            v-if="openCreate" 
            :parentdepartid="parentdepartid"
            :parentdepartName="parentdepartName"
            @close="close_create"
        ></create-depart>
        <update-depart 
            v-if="openUpdate" 
            :formValidate="currentRow"
            @close="close_update"
        ></update-depart>
        <Modal
            title="删除部门"
            v-model="openDelete"
            width="300"
        >
            <Row :gutter="20">
                <center>
                    <Icon type="alert" style="color:red;font-size:80px"></Icon>
                </center>
            </Row>
            <Row :gutter="20"><h3><center>当前选择部门:<h2 style="margin-top:10px;color:red">{{currentRow.departname}}</h2></center></h3></Row>
            <div slot="footer">
                <!-- 用户状态选择哪个 -->
                <Button type="warning" @click="confirm_delete_depart" long :loading="delLoading">删除部门</Button>
            </div>
        </Modal>
        <Modal
            title="删除部门"
            v-model="openCreateUser"
            width="300"
        >
            <Row :gutter="20">
                <Select 
                    v-model="userId" 
                    placeholder="接收人" 
                    filterable
                    remote
                    :remote-method="get_user"
                    :loading="userLoading"
                >
                    <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
                        <span>{{item.realname}}</span>
                        <!-- <span style="float:right;color:#ccc">{{item.departname}}</span> -->
                    </Option>
                </Select>
            </Row>
            <div slot="footer">
                <!-- 用户状态选择哪个 -->
                <Button type="primary" @click="confirm_create_user" long :loading="createLoading">转移用户</Button>
            </div>
        </Modal>
        <!-- <create-depart-user></create-depart-user> -->
    </div>
</template>

<script>
import treeTable from './TreeTable/index'
import createDepart from './create'
import updateDepart from './update'
import departUser from './departUser/index'
// import createDepartUser from './departUser/create'

export default {
    name: "departManagement_index",
    components: {
        treeTable,
        createDepart,
        updateDepart,
        departUser,
        // createDepartUser
    },
    data(){
        return {
            userId: "",
            openCreateUser: false,
            showDepartUser: false,
            firstSpan: 24,
            data: [],
            columns: [
                {
                    text: '部门名称',
                    value: 'departname',
                    width: 200
                },
                {
                    text: '部门别名',
                    value: 'alias_code',
                    width: 120
                },
                {
                    text: "组织机构描述",
                    value: "description",
                    width: 120
                },
                {
                    text: "机构代码",
                    value: "org_code",
                    width: 120
                }
            ],
            loading: false,
            parentdepartid: "",
            parentdepartName: "",
            createLoading: false,
            openCreate: false,
            openUpdate: false,
            openDelete: false,
            currentRow: {},
            delLoading: false,
            userList: [],
            userLoading: false

        }
    },
    methods: {
        get_user(query){
            let _self = this
            let url = `api/user/list`
            _self.userLoading = true

            let config = {
                params: {
                    page: 1,
                    pageSize: 5,
                    realname: query
                }
            }

            function success(res){
                _self.userLoading = false
                _self.userList = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        get_data(){
            let _self = this
            let url = `api/system/depart/tree/list`
            _self.loading = true
            let config = {}

            function success(res){
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        edit_depart(e){
            this.currentRow = e
            this.openUpdate = true
        },
        create_depart(e){
            if(e){
                this.parentdepartid = e.ID
                this.parentdepartName = e.departname
            }else{
                this.parentdepartid = ""
                this.parentdepartName = ""
            }

            this.openCreate = true
        },
        delete_depart(e){
            this.currentRow = e
            this.openDelete = true
        },
        confirm_delete_depart(){
            this.delLoading = true
            let _self = this
            let url = `api/system/depart/del`
            let config = {
                departId: _self.currentRow.ID
            }

            function success(res){
                _self.delLoading = false
                _self.get_data()
                _self.openDelete = false
            }

            function fail(err){
                _self.delLoading = false
            }
            
            this.$Post(url, config, success, fail)
        },
        show_person(e){
            console.log(e)
            this.currentRow = e
            this.firstSpan = 12
            this.showDepartUser = true
        },
        close_depart_user(e){
            this.currentRow = {}
            this.firstSpan = 24
            this.showDepartUser = false
        },
        setting(e){

        },
        close_create(e){
            this.openCreate = false
            if(e){
                this.get_data()
            }
        },
        close_update(e){
            this.openUpdate = false
            if(e){
                this.get_data()
            }
        },
        confirm_create_user(){
            let url = `api/system/depart/user/add`
            let _self = this
            _self.createLoading = true
            let config = {
                departId: _self.currentRow.ID,
                userId: _self.userId
            }

            function success(res){
                _self.createLoading = false
            }

            function fail(err){
                _self.createLoading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
