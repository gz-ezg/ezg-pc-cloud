<template>
    <div>
        <Modal
            title="创建资料"
            width="500"
            v-model="openResoureFile"
        >
            <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem label="所属公司：" prop="companyId">
                    <Select v-model="formValidate.companyId" placeholder="输入公司名称搜索"
                        filterable
                        remote
                        :remote-method="get_company"
                        :loading="companyLoading"
                    >
                        <Option  v-for="item in companyList" :value="item.id" :key="item.id">{{item.companyname}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件类型：" prop="customerFileTypeId">
                    <Select v-model="formValidate.customerFileTypeId" placeholder="选择文件类型" filterable @on-change="change">
                        <Option  v-for="item in fileList" :value="item.id" :key="item.id">{{item.file_type_name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件数量：" prop="fileNum" v-if="isCanInput">
                    <Input v-model="formValidate.fileNum" placeholder="请输入文件数量"></Input>
                </FormItem>
                <FormItem label="存放部门：" prop="saveDepartId">
                    <Select v-model="formValidate.saveDepartId" placeholder="选择存放部门" >
                        <Option  v-for="item in departAlias" :value="item.departid" :key="item.departid">{{item.departname}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="存放地点：" prop="storage">
                    <!-- <Input v-model="formValidate.storage" placeholder="请输入存放位置"></Input> -->
                    <!-- <customer_f_s_a -->
                    <Select v-model="formValidate.storage" placeholder="选择存放地点" >
                        <Option  v-for="item in customer_f_s_a" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="存放位置：" prop="storageCode">
                    <Input v-model="formValidate.storageCode" placeholder="请输入存放具体位置"></Input>
                </FormItem>
                <FormItem label="资料来源：" prop="fileSource">
                    <Select v-model="formValidate.fileSource" placeholder="选择资料来源">
                        <Option  v-for="item in customer_resource_from" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="客户名称：" prop="customerName" v-if="customerName">
                    <Input v-model="formValidate.customerName" placeholder="请输入客户名称"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="create_type" :loading="loading">新增</Button>
                    <Button type="ghost" @click="reset_type" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
            isCanInput: true,
            openResoureFile: false,
            formValidate: {
                customerFileTypeId: "",
                saveDepartId: "",
                storage: "",
                companyId: "",
                fileNum: 1,
                storageCode: "",
                fileSource: "",
                customerName: ""
            },
            loading: false,
            fileList: [],
            departAlias:[], 
            companyList:[],
            companyLoading: false,
            departLoading: false,
            customer_f_s_a: [],
            customer_resource_from: []
            // customer_f_s_a_map: new Map()
        }
    },
    computed:{
        customerName(){
            if(this.formValidate.fileSource == "customer"){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        create_type(){
            let _self = this
            let url = "api/customer/file/create"
            _self.loading = true

            let config = {
                customerFileTypeId: _self.formValidate.customerFileTypeId,
                saveDepartId: _self.formValidate.saveDepartId,
                storage: _self.formValidate.storage,
                companyId: _self.formValidate.companyId,
                fileNum: _self.formValidate.fileNum,
                storageCode: _self.formValidate.storageCode,
            }

            function success(res){
                _self.openResoureFile = false
                _self.loading = false
                // _self.$emit("update",true)
                _self.reset_type()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        reset_type(){
            this.formValidate.customerFileTypeId = ""
            this.formValidate.saveDepartId = ""
            this.formValidate.storage = ""
            this.formValidate.companyId = ""
            this.formValidate.storageCode = ""
            this.formValidate.fileNum = 1
        },
        get_all_file_type(){
            let _self = this
            let url = "api/customer/file/type/list"

            let config = {   
            }

            function success(res){
                _self.fileList = res.data.data
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let _self = this
            _self.departLoading = true 
            let url = "api/system/depart/queryDepartsByUserId"
            let config = {
                params:{
                }
            }
            function success(res){
                // _self.departLoading = false
                _self.departAlias = res.data.data
            }

            this.$Get(url, config, success)
        },
        get_company(query){
            let _self = this
            _self.companyLoading = true
            let url = "api/customer/company/list"
            let config = {
                params:{
                    page: 1,
                    pageSize: 10,
                    companyname: query
                }
            }

            function success(res){
                _self.companyLoading = false
                _self.companyList = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        //  判断是否可以输入数量
        change(e){
            let _self = this
            for(let i = 0; i<_self.fileList.length; i++){
                if(_self.fileList[i].id == e){
                    if(_self.fileList[i].plural == "Y"){
                        _self.isCanInput = true
                    }else{
                        _self.isCanInput = false
                    }
                }
            }
        },
        get_center(){
            let _self = this
            let params = "customer_f_s_a,customer_resource_from"
            function success(res){
                _self.customer_f_s_a = res.data.data.customer_f_s_a
                _self.customer_resource_from = res.data.data.customer_resource_from
                // _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
            }
            _self.$GetDataCenter(params, success)
        }
    },
    created() {
        let _self = this
        this.get_center()
        this.$bus.off("OPEN_CREATE_RESOURE_FILE")
        this.$bus.on("OPEN_CREATE_RESOURE_FILE", (e)=>{
            _self.get_all_file_type()
            _self.get_data_center()
            _self.openResoureFile = true
        })
    },
}
</script>

