<template>
    <div>
        <Modal
            v-model="isOpenAdd"
            title="录入"
            width="800"
        >
            <Form ref="task_message" :model="task_message" :rules="task_message_rule" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="company" label="公司名称">
                            <Input size="small" v-model="task_message.company" @on-focus="getCompany" />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="product" label="产品名称">
                            <Input size="small" v-model="task_message.product" @on-focus="getProduct" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="customer" label="客户名称">
                            <Input size="small" v-model="task_message.customer" @on-focus="getCompany" />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="tel" label="客户手机">
                            <Input size="small" v-model="task_message.tel" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="servicername" label="服务人员">
                            <Input size="small" v-model="task_message.servicername" @on-focus="getUser" />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="marketername" label="市场人员">
                            <Input size="small" v-model="task_message.marketername" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="servicebegindate" label="服务开始时间">
                            <DatePicker type="date" v-model="task_message.servicebegindate" style="width:100%" size="small"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="enddate" label="下线时间">
                            <DatePicker type="date" v-model="task_message.enddate" style="width: 100%" size="small" ></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="callbackdate" label="回访时间">
                            <DatePicker type="date" v-model="task_message.callbackdate" style="width: 100%" size="small" ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="endreason" label="客户类别">
                            <Select v-model="task_message.endreason" style="width:100%" size="small" >
                                <Option value="gszr">公司转让</Option>
                                <Option value="qysj">企业升级</Option>
                                <Option value="kjb">会计部</Option>
                                <Option value="hth">换同行</Option>
                                <Option value="zx">注销</Option>
                                <Option value="qt">其他</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="taxperiod" label="下线税期">
                            <Input size="small" v-model="task_message.taxperiod" type="text" placeholder="格式：2018-06"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="reasonformarketer" label="市场通知下线原因">
                            <Input size="small" v-model="task_message.reasonformarketer" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="reasonforcallback" label="客户实际下线原因">
                            <Input size="small" v-model="task_message.reasonforcallback" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="followbusiness" label="跟进中的业务">
                            <Input size="small" v-model="task_message.followbusiness" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" >新增</Button>
                <Button type="ghost" @click="close" >关闭</Button>
            </div>
        </Modal>
        <Modal
                v-model="selectCompany"
                title="选择公司"
                width="80%">
            <Row :gutter="16">
                <Col span="8">
                <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-keydown="keydown1">
                <Button slot="append" icon="ios-search" @click="searchCompanyData">搜索</Button>
                </Input>
                </Col>
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="columns44"
                    :data="data4"
                    @on-row-dblclick="rowSelect"></Table>
            <Page
                    size="small"
                    :total="pageTotal3"
                    :current.sync="page3"
                    show-total
                    show-elevator
                    @on-change="pageChange3"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>

        <Modal
                v-model="selectProduct"
                title="选择产品"
                width="300">
                <Row :gutter="16">
                    <Col span="20">
                        <Input v-model="searchProduct" placeholder="输入产品名称搜索" @on-keydown="keydown2">
                            <Button slot="append" icon="ios-search" @click="searchProductData">搜索</Button>
                        </Input>
                    </Col>
                </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="columns33"
                    :data="data33"
                    @on-row-dblclick="rowSelect33"></Table>
            <Page
                    size="small"
                    :total="pageTotal33"
                    :current.sync="page33"
                    show-total
                    show-elevator
                    @on-change="pageChange33"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>

        <Modal
                v-model="followbysTag"
                title="选择服务人员"
                width="500">
                <Row :gutter="16">
                    <Col span="12">
                        <Input v-model="searchFollow" placeholder="输服务人员搜索" @on-keydown="keydown3">
                            <Button slot="append" icon="ios-search" @click="searchFollowdata">搜索</Button>
                        </Input>
                    </Col>
                </Row>
            <Table
                    style="margin-top: 10px"
                    highlight-row
                    :columns="columns3"
                    @on-row-dblclick="rowSelect3"
                    :data="data3"></Table>
            <Page
                    size="small"
                    :total="pageTotala"
                    show-total
                    show-elevator
                    :current.sync="pagea"
                    @on-change="pageChangea"
                    style="margin-top: 10px"></Page>
                    <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'
    import { DateFormat } from '../../../libs/utils.js'

    export default {
        data() {
            return {
                searchCompany:"",
                searchProduct:"",
                searchFollow:"",
                isOpenAdd:false,
                task_message: {
                    companyid:"",
                    taxperiod:"",
                    marketername: "",
                    marketer: "",
                    company:"",
                    product:"",
                    customer:"",
                    id:"",
                    servicebegindate:"",
                    enddate:"",
                    callbackdate:"",
                    endreason:"",
                    reasonformarketer:"",
                    reasonforcallback:"",
                    tel:"",
                    followbusiness: ""
                },
                task_message_rule:{
                    taxperiod:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                    company:[{ required: true, message: '必选项！', trigger: 'change', type:'string' },],
                    product:[{ required: true, message: '必选项！', trigger: 'change', type:'string' },],
                    enddate:[{ required: true, message: '必选项！', trigger: 'change', type:'date' },],
                    reasonformarketer:[{ required: true, message: '必选项！', trigger: 'blur' },]                    
                },
                followbysTag: false,
                fuwu: false,
                title: '',
                isshow:true,
                currentPage: new Number(),
                isSearch: false,
                data4: [],
                data33: [],
                data3: [],
                page3:1,
                page33:1,
                pagea:1,
                pageTotal3: new Number(),
                pageTotal33: new Number(),
                pageTotala:new Number(),                
                selectCompany: false,
                selectProduct: false,
                columns3: [
                    {
                        title: '用户名',
                        key: 'username',
                    },
                    {
                        title: '真实姓名',
                        key: 'realname',
                    },
                    {
                        title: '电话',
                        key: 'mobilephone',
                    },
                ],
                columns44: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        width:300
                    },
                    {
                        title: '归属客户',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    },
                    {
                        title: '钱包余额',
                        key: 'balance'
                    },
                    {
                        title: '是否国地税报道',
                        key: 'gdsreport'
                    },
                ],
                columns33: [
                    {
                        title: '产品名称',
                        key: 'product',
                        width:300
                    }
                ],
            }
        },
        created() {
            let _self = this
            
            _self.$bus.on("OPEN_OFFLINE_ADD",(e)=>{
                    _self.isOpenAdd = true
                    _self.$refs["task_message"].resetFields();
                    _self.task_message.company = ""
                    _self.task_message.product = ""
                    _self.task_message.customer = ""
                    _self.task_message.id = ""
                    _self.task_message.servicebegindate = ""
                    _self.task_message.enddate = ""
                    _self.task_message.callbackdate = ""
                    _self.task_message.endreason = ""
                    _self.task_message.reasonformarketer = ""
                    _self.task_message.reasonforcallback = ""
                    _self.task_message.marketername = ""
                    _self.task_message.servicername = ""
                    _self.task_message.tel = ""
                    _self.task_message.taxperiod = ""
                    _self.task_message.followbusiness = ""
            })
        },
        methods: {
            cancel(){
                    let _self = this
                    _self.isshow = false
                    console.log("点击了取消！")
                    this.$refs["task_message"].resetFields();
                    _self.task_message.companyid = ""
                    console.log(_self.task_message.companyid)
                    _self.task_message.id = ""

            },
            keydown3(e){
                if(e.key == 'Enter'){
                    this.searchFollowdata()
                }
            },
            searchFollowdata(){
                this.pagea = 1
                this.getUser()
            },
            keydown1(e){
                if(e.key == 'Enter'){
                    this.searchCompanyData()
                }
            },
            searchCompanyData(){
                this.page3 = 1
                this.getCompany()
            },
            keydown2(e){
                if(e.key == 'Enter'){
                    this.searchProductData()
                }
            },
            searchProductData(){
                this.page33 = 1
                this.getProduct()
            },
            getCompany() {
                let _self = this
                _self.selectCompany = true
                let url = ''
                url = 'api/customer/company/list'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                let config = {
                    params:{
                        page: _self.page3,
                        pageSize: 10,
                        companyname: _self.searchCompany
                    }
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        let _gds = ''
                        if(_res.rows[i].gdsreport == 'wbd') {
                            _gds = '未报道'
                        } else if(_res.rows[i].gdsreport == 'ybd') {
                            _gds = '已报道'
                        } else if(_res.rows[i].gdsreport == 'bybd') {
                            _gds = '不用报道'
                        } else {
                            _gds = ''
                        }
                        _self.data4.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                            gdsreport: _gds,
                            followby:_res.rows[i].followby,
                            followbyid: _res.rows[i].followbyid
                        })
                    }
                }

                this.$Get(url, config, doSuccess)
            },
            close(){
                this.cancel()
                this.add = false
                this.task_message.company = ""
                this.task_message.product = ""
                this.task_message.customer = ""
                this.task_message.id = ""
            },
            getProduct() {
                let _self = this
                let url = 'api/product/list'
                let config = {
                    params:{
                        page: _self.page33,
                        pageSize: 10,
                        product: _self.searchProduct
                    }
                }

                _self.selectProduct = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data33 = []
                    _self.pageTotal33 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data33.push(_res.rows[i])
                    }
                }
                this.$Get(url, config, doSuccess)
                // this.GetData(url, doSuccess)
            },

            rowSelect(a) {
                let _self = this
                // console.log(a)
                _self.selectCompany = false
                _self.task_message.company = a.CompanyName
                _self.task_message.customer = a.NAME
                _self.task_message.tel = a.TEL
                _self.task_message.companyid = a.cpid
                _self.task_message.marketername = a.followby
                _self.task_message.marketer = a.followbyid
            },

            rowSelect33(a) {
                let _self = this

                _self.selectProduct = false
                _self.task_message.product = a.product
                _self.task_message.productid = a.id
            },

            getUser() {
                let _self = this
                let url = 'api/user/list'

                let config = {
                    params:{
                        page: _self.pagea,
                        pageSize: 10,
                        realname: _self.searchFollow
                    }
                }
                _self.followbysTag = true

                function doSuccess(re) {
                    let _data = re.data.data
                    _self.pageTotala = _data.total
                    _self.data3 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data3.push(_data.rows[i])
                    }
                }

                this.$Get(url, config, doSuccess)

                // this.GetData(url, doSuccess)
            },

            rowSelect3(a) {
                let _self = this
                _self.followbysTag = false
                _self.task_message.servicername = a.realname
                _self.task_message.servicer = a.id
            },
            pageChange3(e){
                this.page3 = e
                this.getCompany()
            },
            pageChange33(e){
                this.page33 = e
                this.getProduct()
            },
            pageChangea(e){
                this.pagea = e
                this.getUser()
            },
            submit(){
                let _self = this
                // if(_self.title == "录入"){
                    this.$refs['task_message'].validate((valid) => {
                        // console.log(valid)
                        if (valid) {
                            _self.postData()
                        } else {
                            this.$Message.error('请填写必选项！');
                        }
                    })
                // }else{
                //     this.$refs['task_message'].validate((valid) => {
                //         // console.log(valid)
                //         if (valid) {
                //             _self.postDataEdit()
                //         } else {
                //             this.$Message.error('请填写必选项！');
                //         }
                //     })
                // }
            },
            postData() {
                let _self = this
                let url = 'api/customer/createCustomerEnd'
                let _data = {
                    companyid: _self.task_message.companyid,
                    productid: _self.task_message.productid,
                    servicer: _self.task_message.servicer,
                    marketer: _self.task_message.marketer,
                    enddate: DateFormat(_self.task_message.enddate),
                    callbackdate: DateFormat(_self.task_message.callbackdate),
                    servicebegindate: DateFormat(_self.task_message.servicebegindate),
                    reasonformarketer: _self.task_message.reasonformarketer,
                    reasonforcallback: _self.task_message.reasonforcallback,
                    endreason: _self.task_message.endreason,
                    taxperiod: _self.task_message.taxperiod,
                    followbusiness: _self.task_message.followbusiness
                }

                

                function doSuccess(res) {
                    
                    // _self.$Message.success(res.data.msg)
                    Bus.$emit('updateofflinecustomer',true)
                    if(res.data.data.cycleid){
                        let url = `/api/order/cycle/service/record/update`

                        let config = {
                            id: res.data.data.cycleid,
                            serviceStatus: "stop",
                            downlinePeriod: _self.task_message.taxperiod
                        }

                        function success(res){
                            _self.add = false
                        }

                        function fail(err){

                        }

                        _self.$Post(url, config, success, fail)
                    }else{
                        _self.isOpenAdd = false
                    }
                    _self.cancel()
                }

                function fail(err){
                    console.log(err)
                }

                // this.PostData(url, _data, doSuccess)
                this.$Post(url, _data, doSuccess, fail)
            },
        }
    }
</script>