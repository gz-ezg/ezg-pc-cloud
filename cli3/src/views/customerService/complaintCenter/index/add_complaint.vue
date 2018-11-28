<template>
    <!--    我要投诉    -->
    <div>
        <Modal
            v-model="add_complaint"
            title="我要投诉"
            width="600"
        >
            <Form ref="add" :model="add" :label-width="100" style="width:500px;margin:auto">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="companyName" label="公司：">
                            <Input type="text" v-model="add.companyName" @on-focus="getCompany" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="departid" label="投诉部门：">
                            <Select transfer v-model="add.departid" placeholder="">
                                <Option v-for="(item,index) in depart" :key=index :value="item.ID">{{item.departname}}</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="type" label="投诉类型：">
                            <Select transfer v-model="add.type" placeholder="">
                                <Option v-for="(item,index) in InnerComplaintType" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="record" label="投诉内容：">
                            <Input type="textarea" v-model="add.record" :rows=rows></Input>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add_complaint_detail" :loading="loading">新增</Button>
                <Button type="ghost" @click="close_complaint_detail">关闭</Button>
            </div>
        </Modal>
        <Modal
                v-model="selectCompany"
                title="选择公司"
                width="80%">
            <Row :gutter="16">
                <Col span="8">
                <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-keydown="keyDown">
                <Button slot="append" icon="ios-search" @click="searchCompanyData"></Button>
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
                    :data="company_data"
                    @on-row-dblclick="rowSelect"></Table>
            <Page
                    size="small"
                    :total="company_data_total"
                    :current.sync="currentPage"
                    show-total
                    show-elevator
                    @on-change="company_page_change"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
// import Bus from '../../../../components/bus'

export default {
    props:['depart','type'],
    data(){
        return{
            loading: false,
            rows: 4,
            add_complaint:false,
            //  新增数据
            add:{
                companyid:'',
                departid:'',
                type:'',
                record:''
            },
            selectCompany:false,
            searchCompany:"",
            columns44: 
                [
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
                    }
                ],
            company_data:[],
            company_data_total:new Number(),
            currentPage:new Number(),
            InnerComplaintType: []
        }
    },
    methods:{
        //  新增投诉
        add_complaint_detail(){
            let _self = this
            _self.loading = true
            let url = 'api/customer/createComplaint'
            let config = {
                companyid: _self.add.companyid,
                departid: _self.add.departid,
                type: _self.add.type,
                record: _self.add.record
            }

            function success(res){
                _self.add_complaint = false
                _self.loading = false
                _self.$bus.emit('UPDATE_COMPLAINT', true)

                // Bus.$emit('UPDATE_COMPLAINT', true)
                _self.add.companyid = ""
                _self.add.departid = ""
                _self.add.type = ""
                _self.add.record = ""
            }

            function fail(err){
                _self.loading = false
            }
            // console.log(config)
            // this.$http.post(url,config).then(function(res){
            //     // console.log(res.data.msgCode)
            //     if(res.data.msgCode == 40000){
            //         _self.$Message.success(res.data.msg)
            //         _self.add_complaint = false
            //         _self.loading = false
            //         _self.$bus.emit('UPDATE_COMPLAINT', true)

            //         // Bus.$emit('UPDATE_COMPLAINT', true)
            //         _self.add.companyid = ""
            //         _self.add.departid = ""
            //         _self.add.type = ""
            //         _self.add.record = ""
            //     }else{
            //         _self.$Message.error(res.data.msg)
            //     }
            // })
            this.$Post(url, config, success, fail)
        },
        close_complaint_detail(){
            this.add_complaint = false
            this.add.companyid = ''
            this.add.departid = ''
            this.add.type = ''
            this.add.record = ''
        },
        getCompany() {
                let _self = this
                let url = ''
                _self.currentPage = 1

                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=1&pageSize=10'
                } else {
                    url = '/customer/company/list?page=1&pageSize=10&companyname=' + _self.searchCompany
                }

                _self.selectCompany = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.company_data = []
                    _self.company_data_total = _res.total
                        for(let i=0;i<10;i++){
                            _self.company_data.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                        })
                        }
                    }

                this.GetData(url, doSuccess)
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchCompanyData()
                }
            },
            searchCompanyData() {
                let _self = this
                console.log('11111111111')
                if (_self.searchCompany != '') {
                    _self.isSearch = true
                    _self.getCompany()
                } else {
                    _self.isSearch = false
                    _self.getCompany()
                }
            },

            // 公司列表 页码改变
            company_page_change(a) {
                let _self = this
                let url = ''
                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=' + a + '&pageSize=10'
                } else {
                    url = '/customer/company/list?page=' + a + '&pageSize=10' + '&companyname=' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.company_data = []
                    _self.company_data_total = _res.total
                        for(let i=0;i<10;i++){
                            _self.company_data.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                        })
                        }
                    }

                this.GetData(url, doSuccess)
            },
            rowSelect(a) {
                let _self = this
                _self.selectCompany = false
                _self.add.companyid = a.cpid
                _self.add.NAME = a.NAME
                _self.add.companyName = a.CompanyName
            },
            get_data_center(){
                let _self = this
                let params = "InnerComplaintType"

                function success(res){
                    _self.InnerComplaintType = res.data.data.InnerComplaintType
                }

                this.$GetDataCenter(params, success)
            }
    },
    created(){
        let _self = this
        // Bus.$on('ADD_COMPLAINT',(e)=>{
        //     _self.add_complaint = true
        // })
        _self.$bus.on('ADD_COMPLAINT',(e)=>{
            _self.add_complaint = true
            _self.get_data_center()
        })
    }
}
</script>
