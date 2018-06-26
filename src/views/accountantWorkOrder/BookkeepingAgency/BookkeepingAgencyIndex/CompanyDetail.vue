<template>
    <div>
        <Modal
                v-model="detail"
                title="公司详情"
                width="80%"
                @on-cancel="cancel"
        >
            <Tabs value="name1">
                <TabPane label="企业信息" name="name1">
                    <Form ref="task_message" :model="task_message" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="companyname" label="公司名称：">
                                    {{task_message.companyname}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="NAME" label="归属客户：">
                                    {{task_message.NAME}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="serviceaddress" label="服务地址：">
                                    {{task_message.serviceaddress}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="TEL" label="客户电话：">
                                    {{task_message.TEL}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="cluesource" label="企业来源：">
                                    {{task_message.cluesource}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="enterprisestatus" label="企业状态：">
                                    {{task_message.enterprisestatus}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="importlevel" label="重要等级：">
                                    {{task_message.importlevel}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="financelevel" label="年度纳税评级：">
                                    {{task_message.financelevel}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="transactiontype" label="企业交易状态：">
                                    {{task_message.transactiontype}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="机构代码：">
                                    {{task_message.bankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="信用机构代码：">
                                    {{task_message.bankcode}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="开户许可证：">
                                    {{task_message.bankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="basicbank" label="基本户开户行：">
                                    {{task_message.basicbank}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="basicbankcode" label="基本户开户行账号：">
                                    {{task_message.basicbankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="simplebank" label="一般开户行：">
                                    {{task_message.simplebank}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="type" label="企业纳税类型：">
                                    {{task_message.type}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="cnumber" label="国税号码：">
                                    {{task_message.cnumber}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="pnumber" label="地税号码：">
                                    {{task_message.pnumber}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="cpassword" label="国税密码：">
                                    {{task_message.cpassword}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="ppassword" label="地税密码：">
                                    {{task_message.ppassword}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="1" style="visibility:hidden">1</Col>
                            <FormItem prop="c">
                                <div slot="label">相关资料：</div>
                            </FormItem>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="主体信息" name="name2">
                    <Form ref="task_message2" :model="task_message2" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="companyName" label="公司名称：">
                                    {{task_message2.companyName}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="capitalCtb" label="注册资本：">
                                    {{task_message2.capitalCtb}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="regAddress" label="注册地址：">
                                    {{task_message2.regAddress}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="mainProduct" label="主营项目类别：">
                                    {{task_message2.mainProduct}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="busnissterm" label="营业期限：">
                                    {{task_message2.busnissterm}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="mainType" label="主体类型：">
                                    {{task_message2.mainType}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="legalPerson" label="法人：">
                                    {{task_message2.legalPerson}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="registerNo" label="注册号：">
                                    {{task_message2.registerNo}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="busnissstatus" label="营业状态：">
                                    {{task_message2.busnissstatus}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="issueDate" label="核发日期：">
                                    {{task_message2.issueDate}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="creditNo" label="社会信用代码：">
                                    {{task_message2.creditNo}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="companyName" label="issueDate">
                                    {{task_message2.issueDate}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="registerOffice" label="登记机关：">
                                    {{task_message2.registerOffice}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="shoptype" label="经营范围：">
                                    {{task_message2.shoptype}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="intellectualProperty" label="商事主体信息：">
                                    <div v-html="task_message2.intellectualProperty"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="shareholder" label="组织机构：">
                                    <div v-html="task_message2.shareholder"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="permissionShopType" label="许可经营范围：">
                                    {{task_message2.permissionShopType}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="staff" label="股东信息：">
                                    <div v-html="task_message2.staff"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="abnormalList" label="异常信息：">
                                    <div v-html="task_message2.abnormalList"></div>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="工单信息" name="name3">
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data"></Table>
                    </Row>
                </TabPane>
                <TabPane label="企业动态" name="name4">
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header2"
                                :data="data2"></Table>
                    </Row>
                </TabPane>
                <TabPane label="相关联系人" name="name5">
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header3"
                                :data="data3"></Table>
                    </Row>
                </TabPane>
                <TabPane label="公司变更明细" name="name6">
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header4"
                                :data="data4"></Table>
                    </Row>
                </TabPane>
            </Tabs>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                data2:[],
                data3:[],
                data4:[],
                detail:false,
                companyid: '',
                task_message:{
                    companyname: '',
                    NAME: '',
                    serviceaddress: '',
                    TEL: '',
                    cluesource: '',
                    enterprisestatus: '',
                    importlevel: '',
                    financelevel: '',
                    transactiontype: '',
                    bankcode: '',
                    basicbank: '',
                    basicbankcode: '',
                    simplebank: '',
                    type: '',
                    cnumber: '',
                    pnumber: '',
                    cpassword: '',
                    ppassword: ''
                },
                task_message2:{
                    companyName: '',
                    capitalCtb: '',
                    regAddress: '',
                    mainProduct: '',
                    busnissterm: '',
                    mainType: '',
                    legalPerson: '',
                    registerNo: '',
                    busnissstatus: '',
                    issueDate:'',
                    creditNo:'',
                    registerOffice: '',
                    shoptype: '',
                    intellectualProperty: '',
                    shareholder: '',
                    permissionShopType: '',
                    staff: '',
                    abnormalList: '',
                },
                data:[],
                header: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                    },
                    {
                        title: '所办服务',
                        key: 'product',
                        width: 200
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '联系方式',
                        key: 'servertel',
                        width: 120
                    },
                ],
                header2: [
                    {
                        title: '变更内容',
                        key: 'gsmc',
                    },
                    {
                        title: '备注',
                        key: 'xfze',
                    },
                    {
                        title: '创建人',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ],
                header3: [
                    {
                        title: '名称',
                        key: 'gsmc',
                    },
                    {
                        title: '手机号',
                        key: 'xfze',
                    },
                    {
                        title: '备注',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'yjjsqj',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ],
                header4: [
                    {
                        title: '旧公司名称',
                        key: 'gsmc',
                    },
                    {
                        title: '新公司名称',
                        key: 'xfze',
                    },
                    {
                        title: '操作人',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '变更时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ]
            }
        },
        methods: {
            fpkj(){},
            ckbgrz(){},
            getData() {
                let _self = this
                let url = '/customer/company/detail?id=' + _self.companyid + '&detailTypes=basic,main,workOrder'

                function doSuccess(res) {
                    _self.task_message = res.data.data.basic.length != 0 ? res.data.data.basic[0] : []
                    _self.task_message2 = res.data.data.main.length != 0 ? res.data.data.main[0] : []
                    _self.data = res.data.data.workOrder
                }

                this.GetData(url, doSuccess)
            },

            cancel () {
                this.detail = false
            }
        },
        created(){
            var _self = this
            Bus.$on('detail',(e)=>{
                _self.detail = true
                // console.log(e.row.company_id)
                _self.companyid = e.row.company_id
                _self.getData()
            })
        }
    }
</script>