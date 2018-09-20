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
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="name" label="客户名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.name" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="tel" label="联系方式：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.tel" placeholder="">
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
                <Button type="primary" icon="plus" @click="create_file">交接入库</Button>
                <Button type="primary" icon="plus" @click="create_request">申请交接</Button>
                <Button type="primary" icon="plus" disabled>交接出库</Button>
                <Button type="primary" icon="plus" @click="confirm_request">交接处理</Button>
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
        <hand-over-detail></hand-over-detail>
        <create-request @update="get_data"></create-request>
        <create-file @update="get_data"></create-file>
        <comfirm-file @update="get_data"></comfirm-file>
    </Card>
</template>

<script>
import handOverDetail from './hand_overdetail'
import createRequest from './create_request'
import createFile from './create_file'
import comfirmFile from './comfirm_request'

export default {
    name: 'handovermanagement_index',
    components:{
        handOverDetail,
        createRequest,
        createFile,
        comfirmFile
    },
    data(){
        return{
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
                    title: "创建人",
                    key: "realname",
                    minWidth:150
                },
                {
                    title: "备注",
                    key: "memo",
                    key: 200
                }
            ],
            requestData: [],
            //  交接详情
            detailApplicantRealname:"",
            detailReceiverRealname:"",
            fileHeader: [
                {
                    title: "资料名称",
                    key: "file_type_name",
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
                companyname: "",
                name: "",
                tel: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "申请人",
                    key: "applicant_realname",
                    minWidth: 120
                },
                {
                    title: "接收人",
                    key: "receiver_realname",
                    minWidth: 120
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
                    title: "申请状态",
                    key: "application_status",
                    minWidth: 120
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 200,
                    render: (h, parmas) =>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.open_detail(parmas.row.id)
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
                            },'[查看协商]'),
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        open_detail(e){
            let _self = this
            this.$bus.emit("OPEN_HANDOVER_DETAIL", e)
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
                    companyname: _self.seacrhFormInline.companyname,
                    customername: _self.seacrhFormInline.customername,
                    tel: _self.seacrhFormInline.tel,
                    sortField: "id"
                }
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
                // for(let i = 0;i<_self.data.length; i++){
                    // _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                // }
            }

            this.$Get(url, config, success)
        },
        // get_data_center(){
        //     let _self = this
        //     return new Promise((resolve, reject) => {
        //         let parmas = ""
        //         function success(res){
        //             resolve()
        //         }
        //         _self.$GetDataCenter(params, success)

        //     })
        // },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        search(){

        },
        reset(){

        },
        create_request(){
            let _self = this
            _self.$bus.emit("OPEN_CREATE_REQUEST_FILE", true)
        },
        create_file(){
            this.$bus.emit("OPEN_CREATE_RESOURE_FILE", true)
        },
        confirm_request(){
            let _self = this
            if(!this.selectRow){
                this.$Message.warning("请选择一行进行处理！")
            }else{
                this.$bus.emit("OPEN_CONFIRM_FILE", _self.selectRow)
            }
        },
        select_row(e){
            // console.log(e)
            this.selectRow = e
        }
    },
    created(){
        let _self = this
        // this.get_data_center().then(
        //     () => {
                _self.get_data()
        //     }
        // )
    }
}
</script>
