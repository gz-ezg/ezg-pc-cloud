<template>
    <div>
        <Modal
                v-model="addGC"
                title="新增业务跟踪"
                width="80%"
                @on-ok="ok('task_message')"
                @on-cancel="handleReset('task_message')"
        >
            <Form ref="task_message" :model="task_message" :label-width="120" style="margin-top: 20px">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="公司名称">
                            <Input type="text" v-model="task_message.companyname" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="是否完成">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="客户名称">
                            <Input type="text" v-model="task_message.NAME" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="联系电话">
                            <Input type="text" v-model="task_message.TEL" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="企业负责人">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="联系电话">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="主管会计">
                            <Input type="text" v-model="task_message.zhuguan" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="提出时间">
                            <Input type="text" v-model="task_message.createdate" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="主管意见">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="服务时长">
                            <Input type="text" v-model="task_message.serviceTime" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="打卡时间">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="离开时间">
                            <Input type="text" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem label="检查周期">
                            <Select transfer size="small" disabled transfer>
                                <Option v-for="(item, index) in ywjczq" :value="item.typecode" :key=index>{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="检查锚点">
                            <Select transfer size="small" disabled transfer>
                                <Option v-for="(items, index) in ywjcmd" :value="items.typecode" :key=index>{{items.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务项">
                            <Input type="text" v-model="task_message.businessTrackingTemplate" readonly size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="2">
                        <Button type="primary" @click="fuwux">选择</Button>
                    </Col>
                </Row> -->
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="业务模板"><Button type="primary" @click="ywmb">选择</Button></FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="bussinessDescription" label="业务描述">
                            <Input type="textarea" v-model="task_message.bussinessDescription" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="solvingIdeas" label="解决思路">
                            <Input type="textarea" v-model="task_message.solvingIdeas" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="workerSummary" label="工作总结">
                            <Input type="textarea" v-model="task_message.workerSummary" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="recordMemo" label="备注">
                            <Input type="textarea" v-model="task_message.recordMemo" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal
                v-model="fwx"
                title="服务项协议"
                width="666"
        >
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    @on-row-dblclick="SelectFw"
                    :columns="header"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="fwpageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="fwpageChange"
                    @on-page-size-change="fwpageSizeChange"
                    style="margin-top: 10px"></Page>
        </Row>
        <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="ywmoban"
                title="业务模板列表"
                width="666"
        >
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    @on-row-dblclick="SelectYw"
                    :columns="header2"
                    :data="data2"></Table>
            <Page
                    size="small"
                    :total="ywpageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="ywpageChange"
                    @on-page-size-change="ywpageSizeChange"
                    style="margin-top: 10px"></Page>
        </Row>
        <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="chakan"
                title="业务模板详情"
                width="666"
        >
            <Row>
                <Col><p>检查周期:	{{detail.searchCycleT}}</p></Col>
            </Row>
            <Row style="margin-top: 15px">
                <Col><p>检查锚点:	{{detail.anchorT}}</p></Col>
            </Row>
            <Row style="margin-top: 15px">
                <Col><p>业务描述:	{{detail.businessDescription}}</p></Col>
            </Row>
            <Row style="margin-top: 15px">
                <Col><p>解决思路:	{{detail.solvingIdeas}}</p></Col>
            </Row>
        </Row>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                addGC: false,
                fwx: false,
                chakan: false,
                ywmoban: false,
                fwpage: 1,
                fwpageSize: 10,
                fwpageTotal: new Number(),
                ywpage: 1,
                ywpageSize: 10,
                ywpageTotal: new Number(),
                ywjczq: [],
                ywjcmd: [],
                detail: {},
                Fid: {},
                task_message: {
                    companyname: '',
                    NAME: '',
                    TEL: '',
                    zhuguan: '',
                    createdate: '',
                    serviceTime: '',
                    companyName:'',
                    businessTrackingTemplateId: '',
                    businessTrackingTemplate: '',
                    serviceType: 'addBussinessT',
                    bussinessDescription: '',
                    solvingIdeas: '',
                    workerSummary: '',
                    recordMemo: '',
                    cycleServiceRecordId: ''
                },
                data:[],
                header: [
                    {
                        title: '服务项名称',
                        key: 'serviceitemname',
                    },
                ],
                data2:[],
                header2: [
                    {
                        title: '业务描述',
                        key: 'businessDescription',
                        ellipsis: true,
                        width: 120
                    },
                    {
                        title: '解决思路',
                        key: 'solvingIdeas',
                        ellipsis: true,
                        width: 120
                    },
                    {
                        title: '检查周期',
                        key: 'searchCycleT',
                        ellipsis: true,
                        width: 120
                    },
                    {
                        title: '检查锚点',
                        key: 'anchorT',
                        ellipsis: true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
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
                                            this.cheekDetail(params)
                                        }
                                    }
                                }, '[详情]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            getData() {
                let _self = this

                function finish(res) {
                    _self.ywjcmd = res.data.data.ywjcmd
                    _self.ywjczq = res.data.data.ywjczq
                }

                let params = "ywjcmd,ywjczq"

                this.$GetDataCenter(params, finish)
            },

            ywmb() {
                let _self = this
                let url = '/order/cycle/bussiness/template/list?page=' + _self.ywpage + '&pageSize=' + _self.ywpageSize
                _self.ywmoban = true

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.ywpageTotal = _data.total 
                    _self.data2 = []

                    for (let i = 0; i < _data.rows.length; i++) {

                        for (let j = 0; j < _self.ywjczq.length; j++) {
                            if (_data.rows[i].searchCycleT ==  _self.ywjczq[j].typecode) {
                                _data.rows[i].searchCycleT = _self.ywjczq[j].typename
                            }
                        }

                        let _arr = []
                        let _array = []
                        if (_data.rows[i].anchorT.indexOf(",") != -1) {
                            _arr = _data.rows[i].anchorT.split(',')
                        } else {
                            _arr[0] = _data.rows[i].anchorT
                        }
                        
                        for (let k = 0; k < _arr.length; k++) {
                            for (let p = 0; p < _self.ywjcmd.length; p++) {
                                if (_arr[k] == _self.ywjcmd[p].typecode) {
                                    _array.push(_self.ywjcmd[p].typename)
                                }
                            }
                        }

                        _data.rows[i].anchorT = _array.join()

                        _self.data2.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            ywpageChange(a) {
                let _self = this
                _self.ywpage = a
                _self.ywmb()
            },

            ywpageSizeChange(a) {
                let _self = this
                _self.ywpageSize = a
                _self.ywmb()
            },

            fuwux() {
                let _self = this
                let url = '/system/serviceContract/item/list?page=' + _self.fwpage + '&pageSize=' + _self.fwpageSize + '&templatecode=kjdafwxy'
                _self.fwx = true

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.fwpageTotal = _data.total 
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            fwpageChange(a) {
                let _self = this
                _self.fwpage = a
                _self.fuwux()
            },

            fwpageSizeChange(a) {
                let _self = this
                _self.fwpageSize = a
                _self.fuwux()
            },

            SelectFw(a) {
                let _self = this
                _self.task_message.businessTrackingTemplateId = a.id
                _self.task_message.businessTrackingTemplate = a.serviceitemname
                _self.fwx = false
            },

            SelectYw(a) {
                let _self = this
                _self.ywmoban = false
                _self.task_message.businessTrackingTemplateId = a.id
                _self.task_message.bussinessDescription = a.businessDescription
                _self.task_message.solvingIdeas = a.solvingIdeas
            },

            cheekDetail(a) {
                let _self = this
                _self.chakan = true
                _self.detail = a.row

                this.GetData(url, doSuccess)
            },

            ok() {
                let _self = this
                let url = '/order/cycle/account/door/manager/service/record/create'

                function doSuccess(res) {
                    _self.$Message.success('新增成功')
                    Bus.$emit('kjfuwu',_self.Fid)
                }

                this.PostData(url, _self.task_message, doSuccess)
            },

            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created(){
            var _self = this
            Bus.$on('addGC',(e)=>{
                _self.addGC = true
                _self.Fid = e
                _self.task_message.cycleServiceRecordId = e.id
                _self.task_message.companyname = e.companyname
                _self.task_message.NAME = e.NAME
                _self.task_message.TEL = e.TEL
                _self.task_message.zhuguan = e.zhuguan
                _self.task_message.createdate = e.createdate
                _self.task_message.serviceTime = e.serviceTime
                _self.getData()
            })
        }
    }
</script>
