<template>
    <div>
        <Modal
            title="创建资料"
            width="95"
            v-model="openResoureFile"
        >
            <Row>
                <Col span="16">
                    <Form ref="formValidate" :model="formValidate" :label-width="120" :rules="formValidateRule">
                        <FormItem label="所属公司：" prop="companyId">
                            <Select v-model="formValidate.companyId" placeholder="输入公司名称搜索"
                                filterable
                                remote
                                :remote-method="get_company"
                                :loading="companyLoading"
                                style="width:200px"
                            >
                                <Option  v-for="item in companyList" :value="item.id" :key="item.id">{{item.companyname}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="资料来源：" prop="fileSource">
                            <Select v-model="formValidate.fileSource" placeholder="选择资料来源" style="width:200px">
                                <Option  v-for="item in customer_resource_from" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="客户名称：" prop="customerName" v-if="customerName">
                            <Input v-model="formValidate.customerName" placeholder="请输入客户名称" style="width:200px"></Input>
                        </FormItem>
                    </Form>
                    <!-- <Row>
                        <Button @click="openAddFileItem = true" type="primary">新增文件项</Button>
                    </Row> -->
                    <Row style="margin-top:20px">
                        <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :data="formValidate.dataJson"
                        >
                        </Table>
                    </Row>
                </Col>
                <Col span="8">
                    <Form ref="fileItem" :model="fileItem" :label-width="120" :rules="fileItemRule">
                        <FormItem label="文件类型：" prop="customerFileTypeId">
                            <Select v-model="fileItem.customerFileTypeId" placeholder="选择文件类型"  @on-change="change">
                                <Option  v-for="item in fileList" :value="item.id" :key="item.id">{{item.file_type_name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件名称：" prop="customerFileName">
                            <Input v-model="fileItem.customerFileName" placeholder="输入文件名称">
                            </Input>
                        </FormItem>
                        <FormItem label="文件数量：" prop="fileNum" v-if="isCanInput">
                            <Input v-model="fileItem.fileNum" placeholder="请输入文件数量"></Input>
                        </FormItem>
                        <FormItem label="存放部门：" prop="saveDepartId">
                            <Select v-model="fileItem.saveDepartId" placeholder="选择存放部门" >
                                <Option  v-for="item in departAlias" :value="item.departid" :key="item.departid">{{item.departname}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="存放地点：" prop="storage">
                            <!-- <Input v-model="formValidate.storage" placeholder="请输入存放位置"></Input> -->
                            <!-- <customer_f_s_a -->
                            <Select v-model="fileItem.storage" placeholder="选择存放地点" >
                                <Option  v-for="item in customer_f_s_a" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="存放位置：" prop="storageCode">
                            <Input v-model="fileItem.storageCode" placeholder="请输入存放具体位置"></Input>
                        </FormItem>
                    </Form>
                    <center>
                        <Button type="primary" @click="add_file_item" style="width:60%">新增资料项</Button>
                    </center>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="create_type" :loading="loading">新增</Button>
                <!-- <Button type="ghost" @click="reset_type" style="margin-left: 8px">重置</Button> -->
            </div>
        </Modal>
        <Modal
            title="新增文件项"
            v-model="openAddFileItem"
            width="700"
        >   
            
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
    },
    data(){
        return{
            //  校验规则：
            formValidateRule: {
                companyId: [
                    { required: true, message: '必填项！', trigger: 'change', type: "number" }
                ],
                fileSource: [
                    { required: true, message: '必填项！', trigger: 'change' }
                ]
            },
            fileItemRule: {
                customerFileName: [
                    { required: true, message: '必填项！', trigger: 'change' }
                ],
                customerFileTypeId: [
                    { required: true, message: '必填项！', trigger: 'change', type: "number" }
                ],
                saveDepartId:[
                    { required: true, message: '必填项！', trigger: 'change', type: "number" }
                ],
                storage: [
                    { required: true, message: '必填项！', trigger: 'change' }
                ],
                fileNum: [
                    { required: true, message: '必填项！', trigger: 'change' }
                ],
                // storageCode: [
                //     { required: true, message: '必填项！', trigger: 'change' }
                // ],
            },
            openAddFileItem: false,
            isCanInput: true,
            openResoureFile: false,
            formValidate: {
                companyId: "",
                customerName: "",
                fileSource: "",
                dataJson: []
            },
            fileItem: {
                customerFileName: "",
                customerFileTypeId: "",
                saveDepartId: "",
                storage: "",
                fileNum: "1",
                storageCode: "",
            },
            loading: false,
            fileList: [],
            departAlias:[], 
            companyList:[],
            companyLoading: false,
            departLoading: false,
            customer_f_s_a: [],
            customer_resource_from: [],
            header: [
                {
                    title: "文件名",
                    key: 'customerFileName',
                    minWidth: 150
                },
                {
                    title: "保存部门",
                    key: "saveDepartId",
                    minWidth: 150,
                    render: (h, params) => {
                        let departName = ""
                        for(let i = 0;i < this.departAlias.length;i++){
                            if(params.row.saveDepartId == this.departAlias[i].departid){
                                departName = this.departAlias[i].departname
                            }
                        }
                        return h('div',{
                        }, departName)
                    }
                },
                {
                    title: "保存位置",
                    key: "storage",
                    minWidth: 150,
                    render: (h, params) => {
                        return h('div',{
                        }, this.customer_f_s_a_map.get(params.row.storage))
                    }
                },
                {
                    title: "文件数量",
                    key: "fileNum",
                    minWidth: 150
                },
                {
                    title: "操作",
                    key: 'action',
                    minWidth: 120,
                    render: (h, params) => {
                        return h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    // console.log(params)
                                    this.formValidate.dataJson.splice(params.index, 1)
                                }
                            }
                        }, '[ 删除 ]')
                    }
                }
            ],
            departAlias_map: new Map(),
            fileType_map: new Map(),
            customer_f_s_a_map: new Map()
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
                    // customerFileTypeId: 7,
                    // saveDepartId: 10059,
                    // storage: "kf2",
                    companyId: _self.formValidate.companyId,
                    // fileNum: _self.formValidate.fileNum,
                    fileSource: _self.formValidate.fileSource,
                    // storageCode: _self.formValidate.storageCode,
                    customerName: _self.formValidate.customerName,
                    dataJson: JSON.stringify(_self.formValidate.dataJson)
                }

                function success(res){
                    _self.openResoureFile = false
                    _self.loading = false
                    // _self.$emit("update",true)
                    _self.reset_type()
                    _self.formValidate.dataJson = []
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
            this.formValidate.fileNum = "1"
            this.formValidate.customerFileName = ""
        },
        get_all_file_type(){
            let _self = this
            let url = "api/customer/file/type/list"

            let config = {   
            }

            function success(res){
                _self.fileList = res.data.data
                _self.fileType_map = new Map()
                for(let i = 0;i<_self.fileList.length;i++){
                    _self.fileType_map.set(_self.fileList[i].id.toString(),_self.fileList[i].file_type_name)
                }

                // console.log(_self.fileType_map)
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
            _self.fileItem.customerFileName = _self.fileType_map.get(e.toString())
            for(let i = 0; i<_self.fileList.length; i++){
                if(_self.fileList[i].id == e){
                    if(_self.fileList[i].plural == "Y"){
                        
                        _self.isCanInput = true
                    }else{
                        _self.fileItem.fileNum = "1"
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
                _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
            }
            _self.$GetDataCenter(params, success)
        },
        add_file_item(){
            let _self = this
            // console.log(_self.fileItem)
             this.$refs["fileItem"].validate((valid) => {
                    if (valid) {
                        let temp = JSON.stringify(_self.fileItem)
                        let temp_acs = JSON.parse(temp)
                        this.formValidate.dataJson.push(temp_acs)
                        temp_acs = null
                    } else {
                        return ;
                    }
                })
            // this.fileItem.customerFileName = this.fileItem.customerFileTypeId
            
            
        }
    },
    created() {
        let _self = this
        this.get_center()
        this.$bus.off("OPEN_CREATE_RESOURE_FILE")
        this.$bus.on("OPEN_CREATE_RESOURE_FILE", (e)=>{
            _self.formValidate.dataJson = []
            _self.$refs["formValidate"].resetFields()
            _self.$refs["fileItem"].resetFields()
            _self.get_all_file_type()
            _self.get_data_center()
            _self.openResoureFile = true
        })
    },
}
</script>

