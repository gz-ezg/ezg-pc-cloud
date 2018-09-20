<template>
    <div>
        <Modal
            title=""
            width="95%"
            v-model="openRequest"
            :mask-closable="false"
        >
            <Row :gutter="20">
                <Col span="12">
                    <Card title="创建请求">
                        <Row :gutter="20">
                            <Col span="12">
                                <Select 
                                    v-model="receiverId" 
                                    placeholder="接收人" 
                                    filterable
                                    remote
                                    :remote-method="get_user"
                                    :loading="userLoading"
                                >
                                    <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
                                        <span>{{item.realname}}</span>
                                        <span style="float:right;color:#ccc">{{item.departname}}</span>
                                    </Option>
                                </Select>
                            </Col>
                            <Col span="12">
                                <Input v-model="applicationMemo" type="textarea" placeholder="备注" :rows="1"/>
                            </Col>
                        </Row>
                        <!-- <Row :gutter="20" style="margin-top:10px">
                            
                        </Row> -->
                        <Row :gutter="20" style="margin-top:10px">
                            <tables
                                ref="tables" 
                                editable 
                                v-model="fileList" 
                                :columns="columns"
                            >

                            </tables>
                        </Row>
                    </Card>
                </Col>
                <Col span="12">
                    <Card title="选择资料">
                        <Row :gutter="20">
                            <Col span="12">
                                <Select v-model="companyName" placeholder="输入公司名称搜索"
                                    filterable
                                    remote
                                    :remote-method="get_company"
                                    :loading="companyLoading"
                                >
                                    <Option  v-for="item in companyList" :value="item.id" :key="item.id">{{item.companyname}}</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row :gutter="20" style="margin-top:10px">
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :loading="loading"
                                :columns="header"
                                :data="data"
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
                    </Card>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="submit_request" :loadind="submit_loading">提交申请</Button>
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
            //  公司
            companyLoading: false,
            companyList: [],
            companyName: "",
            header: [
                {
                    title: "公司名称",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "资料名称",
                    key: "file_type_name",
                    minWidth: 150
                },
                {
                    title: "数量",
                    key: "file_num",
                    minWidth: 90
                },
                {
                    title: "操作",
                    minWidth: 120,
                    render: (h, params) => {
                        return h('Button',{
                            props:{
                                size: "small",
                                type: "primary"
                            },
                            on: {
                                    click: () => {
                                        params.row.num = 1
                                        this.fileList.push(params.row)
                                    }
                                }
                        },'新增')
                    }
                }
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            //  资料
            loading: false,
            //  人员
            userLoading: false,
            userList: [],
            submit_loading: false,
            openRequest: false,
            receiverId: "",
            applicationMemo: "",
            fileList:[],
            columns:[
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
                                        vm.$emit('on-delete', params)
                                        vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                                    }
                                }
                            })
                            // return h('Poptip', {
                            //     props: {
                            //         confirm: true,
                            //         title: '你确定要移除吗?'
                            //     },
                            //     on: {
                            //         'on-ok': () => {
                            //             vm.$emit('on-delete', params)
                            //             vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                            //         }
                            //     }
                            // }, [
                            //     // h('Button', '删除')
                            // ])
                        }
                    ]
                },
                {
                    title: "资料名称",
                    key: "file_type_name",
                    minWidth: 150
                },
                {
                    title: "归属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "存放数量",
                    key: "file_num",
                    minWidth: 90
                },
                {
                    title: "请求数量",
                    key: "num",
                    minWidth: 120,
                    editable: true
                }
            ]
        }
    },
    methods:{
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
        submit_request(){
            let _self = this
            if(!this.receiverId){
                _self.$Message.warning("请选择接收人！")
            }else{
                let url = "api/customer/file/connect/request/create"
                _self.submit_loading = true
                let temp = {}
                for(let i = 0; i < _self.fileList.length; i++){
                    _self.fileList[i].num = parseInt(_self.fileList[i].num)
                    temp[_self.fileList[i].id] = _self.fileList[i].num
                }
                console.log(temp)

                let config = {
                    receiverId: _self.receiverId,
                    applicationMemo: _self.applicationMemo,
                    customerFileJson: JSON.stringify(temp)
                }

                function success(res){
                    _self.submit_loading = false
                    _self.openRequest = false
                    _self.$emit("update",true)
                }

                function fail(err){
                    _self.submit_loading = false
                }

                this.$Post(url, config, success, fail)
            }
        },
        //  获取资料
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
        pageChange(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = "api/customer/file/list"

            _self.loading = true

            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    // companyname: _self.companyName,
                    // customername: _self.seacrhFormInline.customername,
                    // tel: _self.seacrhFormInline.tel
                }
                
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
            }

            this.$Get(url, config, success)
        },

    },
    created() {
        let _self = this
        this.get_data()
        this.$bus.on("OPEN_CREATE_REQUEST_FILE", (e)=>{
            _self.userList = []
            _self.receiverId = ""
            // console.log(e)
            // _self.fileList = e
            _self.openRequest = true
        })
    },
}
</script>

