<template>
    <div>
        <Modal
                v-model="addGC2"
                title="业务跟踪详情"
                width="80%"
                @on-ok="ok('task_message')"
                @on-cancel="handleReset('task_message')"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyname" label="公司名称">
                            <Input type="text" v-model="task_message.companyname" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="是否完成">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="name" label="客户名称">
                            <Input type="text" v-model="task_message.name" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="tel" label="联系电话">
                            <Input type="text" v-model="task_message.tel" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业负责人">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="联系电话">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="serverrealname" label="主管会计">
                            <Input type="text" v-model="task_message.serverrealname" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="createdate" label="提出时间">
                            <Input type="text" v-model="task_message.createdate" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业主意见">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务时长">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="打卡时间">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="离开时间">
                            <Input type="text" v-model="task_message.companyName" disabled size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="检查周期">
                            <Select transfer v-model="task_message.companyName" size="small" disabled transfer>
                                <Option v-for="(item, index) in ywjczq" :value="item.typecode" :key=index>{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="检查锚点">
                            <Select transfer v-model="task_message.companyName" size="small" disabled transfer>
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
                        <FormItem prop="bussiness_description" label="业务描述">
                            <Input type="textarea" v-model="task_message.bussiness_description" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="solving_ideas" label="解决思路">
                            <Input type="textarea" v-model="task_message.solving_ideas" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="worker_summary" label="工作总结">
                            <Input type="textarea" v-model="task_message.worker_summary" :rows="2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="21">
                        <FormItem prop="record_memo" label="备注">
                            <Input type="textarea" v-model="task_message.record_memo" :rows="2">
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
                addGC2: false,
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
                id: '',
                task_message: {},
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
                let url = '/order/cycle/service/account/door/manager/service/record/detail?accountDoorRecordId=' + _self.id

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.task_message = _data
                }

                this.GetData(url, doSuccess)
            },
            
            getData2() { 
                let _self = this
                let url = '/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=ywjczq,ywjcmd'

                function doSuccess(res) {
                    _self.ywjcmd = res.data.data.ywjcmd
                    _self.ywjczq = res.data.data.ywjczq
                }

                this.GetData(url, doSuccess)
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
                _self.task_message.bussiness_description = a.businessDescription
                _self.task_message.solving_ideas = a.solvingIdeas
            },

            cheekDetail(a) {
                let _self = this
                _self.chakan = true
                _self.detail = a.row

                this.GetData(url, doSuccess)
            },

            ok() {
                let _self = this
                let url = '/order/cycle/account/door/manager/service/record/update'
                let _data = {
                    id: _self.id,
                    workerSummary: _self.task_message.worker_summary,
                    bussinessDescription: _self.task_message.bussiness_description,
                    solvingIdeas: _self.task_message.solving_ideas,
                    recordMemo: _self.task_message.record_memo,
                    businessTrackingTemplateId: _self.task_message.businessTrackingTemplateId,
                }

                function doSuccess(res) {
                    _self.$Message.success('修改成功')
                    Bus.$emit('kjfuwu',_self.id)
                }

                this.PostData(url, _data, doSuccess)
            },

            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created(){
            var _self = this
            Bus.$on('addGC2',(e)=>{
                _self.getData2()
                _self.addGC2 = true
                _self.id = e
                _self.getData()
            })
        }
    }
</script>
