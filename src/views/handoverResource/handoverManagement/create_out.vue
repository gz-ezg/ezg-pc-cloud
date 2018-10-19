<template>
    <div>
        <Modal
            title="申请出库"
            width="95%"
            v-model="openCustomerOut"
            :mask-closable="false"
        >
            <Row :gutter="20">
                <Col span="12">
                    <Card title="创建请求">
                        <Row :gutter="20" style="height:40px">
                            <Col span="12">
                                <RadioGroup v-model="connectPlan">
                                    <Radio  v-for="item in connect_plan" :key="item.id" :label="item.typecode">{{item.typename}}</Radio>
                                </RadioGroup>
                            </Col>
                            <Col span="12" >
                                <Input v-model="trackingNumber" placeholder="快递单号" v-if="connectPlan == 'express'"/>
                            </Col>
                        </Row>
                        <Row :gutter="20" style="margin-top:10px">
                            <tables
                                ref="tables" 
                                editable 
                                v-model="fileList" 
                                :columns="columns"
                                @on-save-edit="check_data"
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
                                    @on-change="get_data"
                                >
                                    <Option  v-for="item in companyList" :value="item.companyname" :key="item.id">{{item.companyname}}</Option>
                                </Select>
                            </Col>
                            <!-- <Col span="12">
                                <Button type="primary" @click="get_data">搜索</Button>
                            </Col> -->
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
            //  提交操作
            connectPlan: "f_to_f",
            trackingNumber: "",
            connect_plan: [],
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
                    key: "customer_file_name",
                    minWidth: 150
                },
                {
                    title: "可交接数量",
                    key: "max_allow_connect_num",
                    minWidth: 120
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
                                        params.row.num = params.row.max_allow_connect_num
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
            submit_loading: false,
            openCustomerOut: false,
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
                        }
                    ]
                },
                {
                    title: "资料名称",
                    key: "customer_file_name",
                    minWidth: 150
                },
                {
                    title: "归属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "可交接数量",
                    key: "max_allow_connect_num",
                    minWidth: 120
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
        submit_request(){
            let _self = this
            if(this.connectPlan == 'express' && !this.trackingNumber){
                _self.$Message.warning("请输入快递单号！")
            }else{
                let url = "api/customer/file/connect/request/customer/create"
                _self.submit_loading = true
                let temp = {}
                for(let i = 0; i < _self.fileList.length; i++){
                    _self.fileList[i].num = parseInt(_self.fileList[i].num)
                    temp[_self.fileList[i].id] = _self.fileList[i].num
                }
                console.log(temp)

                let config = {
                    connectPlan: _self.connectPlan,
                    trackingNumber: _self.trackingNumber,
                    customerFileJson: JSON.stringify(temp)
                }

                function success(res){
                    _self.submit_loading = false
                    _self.openCustomerOut = false
                    _self.fileList = []
                    _self.trackingNumber = ""
                    //  根据返回值id，生成扫码页面，推送给客户
                    console.log(res.data)
                    _self.send_customer_msg(res.data.data.id)
                    _self.$bus.emit("OPEN_OUTER_QCODER", res.data.data.id)
                    _self.$bus.emit("HANDOVER_FILE_UPDATE",true)
                }

                function fail(err){
                    _self.submit_loading = false
                }

                this.$Post(url, config, success, fail)
            }
        },

        //  发送微信推送
        send_customer_msg(e){
            console.log(e)
            let url = `api/customer/file/connect/request/customer/send`
            let _self  = this
            let config = {
                connectRequestId: e
            }

            function success(res){

            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
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
                    companyname: query,
                    
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
                    companyname: _self.companyName,
                    file_status: "normal",
                    keeper_flag: 1
                }
                
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        check_data(e){
            let _self = this
            console.log(e.row)
            console.log(e.value)
            if(e.row.max_allow_connect_num < e.value){
                _self.$Message.warning("当前输入数量超过最大可交接数，请重新输入！")
                _self.fileList[e.index].num = e.row.max_allow_connect_num
            }
        },
        get_data_center(){
            let _self = this
            let params = "connect_plan"

            function success(res){
                _self.connect_plan = res.data.data.connect_plan
            }

            this.$GetDataCenter(params, success)
        }
    },
    created() {
        let _self = this
        this.get_data_center()
        this.$bus.on("OPEN_CREATE_OUT_FILE", (e)=>{
            _self.get_data()
            _self.userList = []
            _self.receiverId = ""
            // console.log(e)
            // _self.fileList = e
            _self.openCustomerOut = true
        })
    },
}
</script>

