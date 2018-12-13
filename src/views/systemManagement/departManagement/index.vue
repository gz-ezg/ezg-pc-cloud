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
                <tree-table 
                    v-else
                    :data="data" 
                    :columns="columns" 
                    border
                    @edit="edit_depart" 
                    @delete="delete_depart"
                    @create="create_depart"
                    @show_person="show_person"
                    @setting="setting"/>
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
    </div>
</template>

<script>
import treeTable from './TreeTable/index'
import createDepart from './create'
import updateDepart from './update';

export default {
    name: "departManagement_index",
    components: {
        treeTable,
        createDepart,
        updateDepart
    },
    data(){
        return {
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
                    width: 150
                },
                {
                    text: "组织机构描述",
                    value: "description",
                    width: 150
                },
                {
                    text: "机构代码",
                    value: "org_code",
                    width: 150
                }
            ],
            loading: false,
            parentdepartid: "",
            parentdepartName: "",
            openCreate: false,
            openUpdate: false,
            openDelete: false,
            currentRow: "",
            delLoading: false
        }
    },
    methods: {
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
        }
    },
    created(){
        this.get_data()
    }
}
</script>
