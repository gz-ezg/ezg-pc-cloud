<template>
    <div>
        <Modal
            title="修改申请"
            v-model="update_request"
            width="70%"
        >
            <Row>
                <span>申请人：</span><span style="padding-right:100px">{{data.applicant_name}}</span>
                <span>接收人：</span><span>{{data.receiver_name}}</span>
            </Row>
            <Row style="margin-top:10px">
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="add_file">添加文件</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top:10px">
                <tables
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    v-model="files"
                >
                </tables>
            </Row>
            <div slot="footer">
                <Button @click="submit" type="primary" :loading="submitLoading">提交</Button>
            </div>
        </Modal>
        <Modal
            title="添加文件"
            v-model="openAddFiles"
            width="800"
        >
            <Row :gutter="20" style="margin:10px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :loading="loading"
                    :columns="allFilesHeader"
                    :data="allFiles"
                >
                </Table>
                <Page
                    placement="top"
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Modal
            title="添加交接资料"
            width="300"
            v-model="add_request_file"
        >
            <Form :model="selectRowFiles" :label-width="120">
                <FormItem label="公司名称：">
                    <Input v-model="selectRowFiles.companyname" disabled></Input>
                </FormItem>
                <FormItem label="资料名称：">
                    <Input v-model="selectRowFiles.customer_file_name" disabled></Input>
                </FormItem>
                <FormItem label="最大交接数量:">
                    <Input v-model="selectRowFiles.max_allow_connect_num" disabled></Input>
                </FormItem>
                <FormItem label="交接数量:">
                    <Input v-model="selectRowFiles.connect_num"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="confirm_add" type="primary" :loading="confirm_add_loading">确认添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import tables from '../../woa-components/tables/tables'

export default {
    components:{
        tables
    },
    data(){
        return{
            submitLoading: false,
            confirm_add_loading: false,
            applicationMemo: "",
            openAddFiles: false,
            update_request: false,
            id: "",
            data: {
                applicant_name: "",
                receiver_name: "",
                application_memo: ""
            },
            loading: false,
            header: [
                {
                    title: '移除',
                    key: 'handle',
                    minWidth: 90,
                    button: [
                        (h, params, vm) => {
                            return h('Icon', {
                                props:{
                                    type:"close"
                                },
                                on:{
                                    click: ()=>{
                                        let url = "api/customer/file/connect/request/file/del"
                                        let config = {
                                            id: params.row.id
                                        }

                                        function success(res){
                                            this.get_data()
                                        }

                                        function fail(err){

                                        }

                                        this.$Post(url, config, success)
                                        vm.$emit('on-delete', params)
                                        vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                                    }
                                }
                            })
                        }
                    ]
                },
                {
                    title: "资料名称",
                    key: "customer_file_name",
                    minWidth: 150
                },
                {
                    title: "所属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "客户名称",
                    key: "name",
                    minWidth: 150
                },
                {
                    title: "文件数量",
                    key: "file_num",
                    minWidth: 120
                },
                {
                    title: "交接数量",
                    key: "connect_num",
                    minWidth: 120
                }
            ],
            files: [],
            allFilesHeader: [
                {
                    title: "公司名称",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "资料名称",
                    key: "customer_file_name",
                    minWidth: 150
                },
                {
                    title: "数量",
                    key: "file_num",
                    minWidth: 90
                },
                {
                    title: "可交接数量",
                    key: "max_allow_connect_num",
                    minWidth: 120
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 120,
                    render: (h, parmas) =>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.add_request_files(parmas.row)
                                    }
                                }
                            },'[ 添加 ]')
                        ])
                    }
                }
            ],
            allFiles: [],
            total: 0,
            page: 1,
            selectRowFiles: {
                id: "",
                companyname: "",
                name: "",
                max_allow_connect_num: "",
                customer_file_name: "",
                connect_num: "",
                file_num: ""
            },
            add_request_file: false
        }
    },
    methods:{
        get_data(e){
            let _self = this
            let url = "api/customer/file/connect/request/detail"

            let config = {
                params: {
                    id: e
                }
            }

            function success(res){
                _self.data = res.data.data
                _self.files = res.data.data.files
            }

            this.$Get(url, config, success)
        },
        add_file(){
            this.openAddFiles = true
            this.get_file_data()
        },
        submit(){
            let _self = this
            _self.submitLoading = true
            let url = 'api/customer/file/connect/request/re/commit'
            let config = {
                connectRequestId: _self.id,
                applicationMemo: _self.applicationMemo
            }

            function success(res){
                _self.submitLoading = false
                _self.update_request = false
                _self.$bus.emit("HANDOVER_FILE_UPDATE", true)
            }

            function fail(err){
                _self.submitLoading = false
            }

            this.$Post(url, config, success, fail)
        },
        pageChange(e){
            this.page = e
            this.get_file_data()
        },
        get_file_data(){
            let _self = this
            let url = `api/customer/file/list`
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: 10,
                    // companyname: ""
                }
            }

            function success(res){
                _self.allFiles = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        add_request_files(e){
            console.log(e)
            let _self = this
            this.selectRowFiles = e
            this.selectRowFiles.connect_num = this.selectRowFiles.max_allow_connect_num
            this.add_request_file = true
        },
        confirm_add(){
            let _self = this
            let url = "api/customer/file/connect/request/file/add"
            
            _self.confirm_add_loading = true

            let config = {
                connectRequestId: _self.id,
                customerFileId: _self.selectRowFiles.id,
                num: _self.selectRowFiles.connect_num
            }

            function success(res){
                _self.confirm_add_loading = false
                _self.add_request_file = false
                _self.selectRowFiles = {}
                _self.selectRowFiles.id = ""
                _self.selectRowFiles.companyname = ""
                _self.selectRowFiles.name = ""
                _self.selectRowFiles.max_allow_connect_num = ""
                _self.selectRowFiles.customer_file_name = ""
                _self.selectRowFiles.connect_num = ""
                _self.selectRowFiles.file_num = ""
                _self.get_data(_self.id)
            }

            function fail(err){
                _self.confirm_add_loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_UPDATE_RESOURE_FILE", (e)=>{
            _self.id = e.id
            _self.update_request = true
            _self.get_data(e.id)
        })
    },
}
</script>

