<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                    <!-- <Search slot="content"></Search> -->
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="applicant_realname" label="申请人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.applicant_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="receiver_realname" label="接收人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.receiver_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="companyname" label="归属公司：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="create_file">重新提交</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection" 
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
                @on-row-dblclick="open_detail"
                @on-current-change="select_row"
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
        <Modal
                v-model="openRequest"
                title="协商明细"
                width="800">
            <Row :gutter="20">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="requestHeader"
                    :data="requestData"
                    style="margin-top:10px"
                >
                </Table>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <!-- <hand-over-detail></hand-over-detail>
        <create-request @update="get_data"></create-request>
        <create-file @update="get_data"></create-file>
        <comfirm-file @update="get_data"></comfirm-file> -->
    </Card>
</template>

<script>
// import handOverDetail from './hand_overdetail'
// import createRequest from './create_request'
// import createFile from './create_file'
// import comfirmFile from './comfirm_request'

export default {
    // name: 'handovermanagement_index',
    // components:{
    //     handOverDetail,
    //     createRequest,
    //     createFile,
    //     comfirmFile
    // },
    data(){
        return{
            customer_file_s: [],
            customer_file_s_map: new Map(),
            handover_status: [],
            handover_status_map: new Map(),
            file_connect_type: [],
            file_connect_type_map: new Map(),
            connect_plan: [],
            connect_plan_map: new Map(),
            //  协商请求明细
            openRequest: false,
            requestHeader: [
                {
                    title: "状态",
                    key: "status",
                    minWidth:120
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    minWidth:150
                },
                {
                    title: "操作人",
                    key: "operator_name",
                    minWidth:150
                },
                {
                    title: "备注",
                    key: "memo",
                    minWidth: 200
                }
            ],
            requestData: [],
            //  交接详情
            detailApplicantRealname:"",
            detailReceiverRealname:"",
            fileHeader: [
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
                },
                {
                    title: "存放部门",
                    key: "departname",
                    minWidth: 120
                },
                {
                    title: "存放地点",
                    key: "storage",
                    minWidth: 120
                },
                {
                    title: "存放位置",
                    key: "storage_code",
                    minWidth: 120
                }
            ],
            fileData: [],
            openDetail:false,
            //  主页
            search_model: "",
            loading: false,
            selectRow:"",
            seacrhFormInline: {
                receiver_realname: "",
                applicant_realname: "",
                companyname: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "申请人",
                    key: "applicant_name",
                    minWidth: 120
                },
                {
                    title: "接收人",
                    key: "receiver_name",
                    minWidth: 120
                },
                {
                    title: "归属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "申请备注",
                    key: "application_memo",
                    minWidth: 120
                },
                {
                    title: "申请时间",
                    key: "createdate",
                    minWidth: 200
                },
                {
                    title: "交接方式",
                    key: "connect_plan",
                    minWidth: 90
                },
                {
                    title: "交接类型",
                    key: "connect_type",
                    minWidth: 90
                },
                {
                    title: "申请状态",
                    key: "status",
                    minWidth: 120
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 250,
                    render: (h, parmas) =>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.open_detail(parmas.row)
                                    }
                                }
                            },'[查看详情]'),
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.open_request(parmas.row.id)
                                    }
                                }
                            },'[协商记录]'),
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.cancel_request(parmas.row.id)
                                    }
                                }
                            },'[取消交接]'),
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        open_detail(e){
            let _self = this
            this.$bus.emit("OPEN_HANDOVER_DETAIL", e.id)
        },
        open_request(e){
            let _self = this
            let url = "api/customer/file/connect/request/course/list"

            let config = {
                params:{
                    connect_request_id: e,
                    sortField: "id"
                }
            }

            function success(res){
                _self.requestData = res.data.data
                _self.openRequest = true
                for(let i = 0; i < _self.requestData.length; i++){
                    if(_self.requestData[i].status == "Y"){
                        _self.requestData[i].status = "通过"
                    }else{
                        _self.requestData[i].status = "拒绝"
                    }
                }
            }

            this.$Get(url, config, success)
        },
        get_data(){
            let _self = this
            let url = "api/customer/file/connect/request/list"

            _self.loading = true

            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    applicant_realname: _self.seacrhFormInline.applicant_realname,
                    receiver_realname: _self.seacrhFormInline.receiver_realname,
                    companyname: _self.seacrhFormInline.companyname,
                    application_status: "reject",
                    sortField: "id"
                }
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
                for(let i = 0;i<_self.data.length; i++){
                    _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                    _self.data[i].status = _self.handover_status_map.get(_self.data[i].application_status)
                    _self.data[i].connect_plan = _self.connect_plan_map.get(_self.data[i].connect_plan)
                    _self.data[i].connect_type = _self.file_connect_type_map.get(_self.data[i].connect_type)
                }
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject) => {
                let params = "customer_file_s,handover_status,file_connect_type,connect_plan"
                function success(res){
                    _self.customer_file_s = res.data.data.customer_file_s
                    _self.customer_file_s_map = _self.$array2map(_self.customer_file_s)
                    _self.handover_status = res.data.data.handover_status
                    _self.handover_status_map = _self.$array2map(_self.handover_status)
                    _self.file_connect_type = res.data.data.file_connect_type
                    _self.file_connect_type_map = _self.$array2map(_self.file_connect_type)
                    _self.connect_plan = res.data.data.connect_plan
                    _self.connect_plan_map = _self.$array2map(_self.connect_plan)
                    resolve()
                }
                _self.$GetDataCenter(params, success)
            })
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        search(){
            this.get_data()
        },
        reset(){
            this.page = 1
            this.seacrhFormInline.receiver_realname = ""
            this.seacrhFormInline.applicant_realname = ""
            this.seacrhFormInline.companyname = ""
            this.get_data()
        },
        // create_request(){
        //     let _self = this
        //     _self.$bus.emit("OPEN_CREATE_REQUEST_FILE", true)
        // },
        create_file(){
            let _self = this
            if(!this.selectRow){
                this.$Message.warning("请选择一行进行处理！")
            }else{
                this.$bus.emit("OPEN_UPDATE_RESOURE_FILE", _self.selectRow)
            }
        },
        // confirm_request(){
        //     let _self = this
        //     if(!this.selectRow){
        //         this.$Message.warning("请选择一行进行处理！")
        //     }else{
        //         this.$bus.emit("OPEN_CONFIRM_FILE", _self.selectRow)
        //     }
        // },
        select_row(e){
            // console.log(e)
            this.selectRow = e
        },
        cancel_request(e){
            let _self = this
            let url = `api/customer/file/connect/request/cancel`
            let config = {
                connectRequestId: e
            }

            function success(res){
                _self.get_data()
            }

            function fail(err){
            }

            this.$Post(url, config, success, fail)
            
        }
    },
    created(){
        let _self = this
        this.get_data_center().then(
            () => {
                _self.get_data()
            }
        )
        this.$bus.on("HANDOVER_FILE_UPDATE",(e)=>{
            _self.get_data()
        })
    }
}
</script>
