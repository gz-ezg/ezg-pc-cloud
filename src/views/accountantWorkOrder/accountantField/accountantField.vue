<template>
    <div>
        <Card>
            <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div  slot="content" @keydown="show">
                            <Form ref="formInline" :model="formInline" :label-width="100">
                                <Row :gutter="10">
                                    <Col span="8">
                                        <FormItem prop="companyname" label="公司名称：">
                                            <Input type="text" v-model="formInline.companyname" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="name" label="客户：">
                                            <Input type="text" v-model="formInline.name" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="tel" label="客户电话：">
                                            <Input type="text" v-model="formInline.tel" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="10">
                                    <Col span="8">
                                        <FormItem prop="begin_address" label="打卡地址：">
                                            <Input type="text" v-model="formInline.begin_address" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="createdate" label="开始打卡时间：">
                                            <DatePicker transfer type="daterange" placement="bottom-start" style="width:100%" v-model="formInline.createdate" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="enddate" label="结束打卡时间：">
                                            <DatePicker transfer type="daterange" placement="bottom-end" style="width:100%" v-model="formInline.enddate" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    
                                </Row>
                                <Row :gutter="10">
                                    <Col span="8">
                                        <FormItem prop="serverrealname" label="打卡人：">
                                            <Input type="text" v-model="formInline.serverrealname" placeholder="" size="small">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="period" label="月服务期：">
                                            <Input type="text" v-model="formInline.period" placeholder="" size="small">
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
                    <Button type="primary" icon="ios-color-wand-outline" @click="ck">查看</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
                <!-- <Poptip 
                    title="筛选" 
                    placement="bottom-end" 
                    width="600" 
                    style="float:right;margin-right:20px" 
                >
                    <Button type="text" size="small" icon="funnel">筛选</Button>
                        
                </Poptip> -->
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            @on-row-click="selectRow"
                            :columns="header"
                            :data="data"></Table>
                <Page
                            size="small"
                            :total="pageTotal"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top: 10px"></Page>
            </Row>
        </Card>
                <!-- <Modal
                v-model="modal"
                width="100%"
                :styles="{height: '100%', top: '0px'}"
                title="客户详情"
                >
            <Row>
                <Col span="6">
                <channel-from v-if="isExamine" :customerid='customerid'></channel-from>
                </Col>
                <Col span="18">
                <Card>
                    <Collapse accordion>
                        <Panel name="Company">
                            企业信息
                            <P slot="content">
                                <channel-company
                                        v-if="isExamine"
                                        :customerid='customerid'></channel-company>
                            </P>
                        </Panel>
                        <Panel name="CustomerContent">
                            客户跟进记录
                            <P slot="content">
                                <channel-fllow-up v-if="isExamine"
                                                  :customerid='customerid'></channel-fllow-up>
                            </P>
                        </Panel>
                        <Panel name="Order">
                            订单详情
                            <P slot="content">
                                <channel-order-list v-if="isExamine"
                                                     :customerid='customerid'></channel-order-list>
                            </P>
                        </Panel>
                        <Panel name="CustomerRelation">
                            客户关系人
                            <P slot="content">
                                <channel-relation-person v-if="isExamine"
                                                         :customerid='customerid'></channel-relation-person>
                            </P>
                        </Panel>
                        <Panel name="CustomerWorkOrder">
                            服务动态
                            <P slot="content">
                                <channel-service-dynamic v-if="isExamine"
                                                         :customerid='customerid'></channel-service-dynamic>
                            </P>
                        </Panel>
                    </Collapse>
                </Card>
                </Col>
            </Row>
        </Modal> -->
        <!-- <customer-detail></customer-detail> -->
        <Campay></Campay>
        <clock-in-detail></clock-in-detail>
        <company-detail></company-detail>
        <customer-detail></customer-detail>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'
    import CustomerDetail from './accountantFieldIndex/customerDetail'
    import Campay from './accountantFieldIndex/campay'
    import ClockInDetail from './accountantFieldIndex/clockInDetail'
    import channelFrom from '../../channelManagement/channelCustomer/channelManagement_examine_from.vue'
    import channelCompany from '../../channelManagement/channelCustomer/channelManagement_examine_company.vue'
    import channelOrderList from '../../channelManagement/channelCustomer/channelManagement_examine_orderList.vue'
    import channelFllowUp from '../../channelManagement/channelCustomer/channelManagement_examine_followUp.vue'
    import channelRelationPerson from '../../channelManagement/channelCustomer/channelManagement_examine_relationPerson.vue'
    import channelServiceDynamic from '../../channelManagement/channelCustomer/channelManagement_examine_serviceDynamic.vue'
    // import companyDetail from '../BookkeepingAgency/BookkeepingAgencyIndex/CompanyDetail'
    import customerDetail from '../../woa-components/customerDetail/channelCustomer.vue'
    import companyDetail from '../../woa-components/companyDetail/CompanyDetail.vue'
    import { DateFormat } from '../../../libs/utils.js'

    export default {
        components:{
            companyDetail,
            Campay,
            ClockInDetail,
            CustomerDetail,
            channelFrom,
            channelCompany,
            channelOrderList,
            channelFllowUp,
            channelRelationPerson,
            channelServiceDynamic,
            customerDetail
        },
        data() {
            return{
                search_model:"",
                formInline:{
                    companyname:'',
                    name:'',
                    begin_address:'',
                    serverrealname:'',
                    createdate:[],
                    tel:"",
                    period:"",
                    enddate:[],
                },
                page: 1,
                pageSize: 10,
                pageTotal: new Number(),
                customerid: [],
                row: {},
                isExamine: false,
                modal: false,
                data:[],
                header: [
                    {
                        title: '公司',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '客户',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '打卡地址',
                        key: 'begin_address',
                        render: (h, params) => {
                            // console.log(params)
                            if (params.row.begin_address[0].name == '' || params.row.begin_address[0].name == null) {
                                return ' '
                            } else {
                                return h('Poptip', {
                                    props: {
                                        trigger: 'hover',
                                        title: '打卡地址',
                                        placement: 'bottom'
                                    }
                                }, [
                                    h('span', this.data[params.index].begin_address[0].name + ''),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b'
                                        }
                                    }),
                                    h('div', {
                                        slot: 'content'
                                    }, [
                                        h('ul', this.data[params.index].begin_address.map(item => [
                                            h('li', {
                                                style: {
                                                    padding: '4px'
                                                }
                                            }, '地址：' + item.name),
                                        ]))
                                    ])
                                ])
                            }
                        },
                        ellipsis: true,
                        width: 200
                    },
                    {
                        title: '开始打卡时间',
                        key: 'begin_time',
                        width: 160
                    },
                    {
                        title: '离开打卡时间',
                        key: 'end_time',
                        width: 160
                    },
                    {
                        title: '服务时长',
                        key: 'service_timestamp',
                        width: 120
                    },
                    {
                        title: '打卡类型',
                        key: 'type',
                        width: 120
                    },
                    {
                        title: '打卡人',
                        key: 'serverrealname',
                        width: 120
                    },
                    {
                        title: '月服务期间',
                        key: 'period',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.customerDetail(params)
                                            Bus.$emit('Open_customer_detail',params.row.customerId)
                                        }
                                    }
                                }, '[客户详情]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // params.row.company_id = params.row.companyId
                                            Bus.$emit('openCompanyDetail', params.row.companyId)
                                        }
                                    }
                                }, '[公司详情]'),
                            ]);
                        }
                    }
                ]
            }
        },
        computed: {
            bbegintime: function(){
                return DateFormat(this.formInline.createdate[0])
            },
            ebegintime: function(){
                return DateFormat(this.formInline.createdate[1])
            },
            bendtime: function(){
                return DateFormat(this.formInline.enddate[0])                
            },
            eendtime: function(){
                return DateFormat(this.formInline.enddate[1])                
            }
        },
        methods: {
            show(e){
                if(e.key == "Enter"){
                    this.search()
                }
            },
            search(){
                this.page = 1
                this.getData()
            },
            reset(){
                let _self = this
                this.page = 1
                _self.formInline.companyname = ""
                _self.formInline.name = ""
                _self.formInline.tel = ""
                _self.formInline.begin_address = ""
                _self.formInline.serverrealname =""
                _self.formInline.period = ""
                _self.formInline.createdate = ""
                _self.formInline.enddate = ""
                this.getData()
            },
            downloadExcel(){
                let field = [
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'姓名'},
                    // {field:'tel',title:'电话'},
                    {field:'begin_address',title:'打卡地址'},
                    {field:'begin_time',title:'打卡开始时间'},
                    {field:'end_time',title:'离开打开时间'},
                    {field:'service_timestamp',title:'服务时长'},
                    {field:'type',title:'打卡类型',format:'kjwq'},
                    {field:'serverrealname',title:'服务人员'},
                    {field:'period',title:'月服务周期'}
                    ]
                let _self = this
                let url = `api/order/cycle/service/account/door/record/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        type:'accountdoor',
                        sortField:'updatedate',
                        name: _self.formInline.name,
                        tel: _self.formInline.tel,
                        companyname:_self.formInline.companyname,
                        begin_address: _self.formInline.begin_address,
                        serverrealname: _self.formInline.serverrealname,
                        period: _self.formInline.period,
                        bbegintime:_self.bbegintime,
                        ebegintime:_self.ebegintime,
                        bendtime:_self.bendtime,
                        eendtime:_self.eendtime,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            getData() {
                let _self = this
                let url = '/order/cycle/service/account/door/record/list?page=' + _self.page + '&pageSize=' + _self.pageSize +'&type=accountdoor&sortField=updatedate' + `&name=${_self.formInline.name}&tel=${_self.formInline.tel}&begin_address=${_self.formInline.begin_address}&serverrealname=${_self.formInline.serverrealname}&period=${_self.formInline.period}&bendtime=${_self.eendtime}&eendtime=${_self.eendtime}&bbegintime=${_self.bbegintime}&ebegintime=${_self.ebegintime}&companyname=${_self.formInline.companyname}`


                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal = _data.total 
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        let _company = [{
                            name: _data.rows[i].begin_address
                        }]
                        _data.rows[i].begin_address = _company

                        // _data.rows[i].service_timestamp = new Date(_data.rows[i].service_timestamp * 1000).getHours()

                        if (_data.rows[i].type == 'accountdoor') {
                            _data.rows[i].type = '会计到家'
                        } else if (_data.rows[i].type == 'manager') {
                            _data.rows[i].type = '主管回访'
                        }
                        _self.data.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getData()
            },

            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            ck() {
                let _self = this

                if (_self.row.id == undefined) {
                    _self.$Message.warning('请选择要查看的项目')
                } else {
                    Bus.$emit('showclockindetail',_self.row)
                    // console.log(_self.row)
                }
            },

            customerDetail(a) {
                let _self = this
                _self.customerid[0] = a.row.customerId
                _self.isExamine = true
                _self.modal = true
                // console.log(a.row.customerId)
                // console.log(_self.customerid)
            },

            selectRow(a) {
                let _self = this
                _self.row = a
                // console.log(a)
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>
