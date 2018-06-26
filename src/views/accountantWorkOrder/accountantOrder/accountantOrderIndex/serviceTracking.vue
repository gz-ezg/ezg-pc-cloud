<template>
    <div>
        <Modal
                v-model="genzong"
                title="服务跟踪详情"
                width="800"
                @on-ok="save"
        >
            <Row>
                <Col span="12"><p>公司名称:	{{detail.companyname}}</p></Col>
                <Col span="12"><p>客户名称:	{{detail.name}}</p></Col>
            </Row>
            <Row>
                <Col span="12"><p>联系电话:	{{detail.tel}}</p></Col>
                <Col span="12"><p>企业负责人:	{{detail.legalrepresentative}}</p></Col>
            </Row>
                <Row>
                <Col span="12"><p>服务会计:	{{detail.serverrealname}}</p></Col>
                <Col span="12"><p>拜访时间:	{{detail.begin_time}}</p></Col>
            </Row>
            <Row>
                <Col span="12"><p>结束时间:	{{detail.end_time}}</p></Col>
                <Col span="12"><p>服务时长:	{{detail.service_timestamp}}</p></Col>
            </Row>
            <Row>
                <Col span="12"><p>更新人:	{{detail.crealname}}</p></Col>
                <Col span="12"><p>更新时间:	{{detail.createdate}}</p></Col>
            </Row>
            <Row style="margin-top: 15px">
                <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :data="data"></Table>
                    <!-- <Page
                            size="small"
                            :total="pageTotal"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top: 10px"></Page> -->
                </Row>
            </Row>
            <Row style="margin-top: 15px">
                <Form ref="task_message" :model="task_message" :label-width="80">
                    <Row :gutter="16">
                        <Col span="21">
                            <FormItem prop="serverMemo" label="服务总结">
                                <Input type="textarea" v-model="task_message.serverMemo" :rows="2">
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="21">
                            <FormItem prop="managerIdea" label="主管意见">
                                <Input type="textarea" v-model="task_message.managerIdea" :rows="2">
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <!-- <div slot="footer">
                <Button type="ghost" @click="fenpei=false">关闭</Button>
            </div> -->
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                genzong:false,
                id: '',
                detail: {},
                data:[],
                task_message: {
                    serverMemo: '',
                    managerIdea: '',
                    },
                header: [
                    {
                        title: '服务项',
                        key: 'pname',
                        width: 120
                    },
                    {
                        title: '上门计划',
                        key: 'serviceitemname',
                    },
                    {
                        title: '是否完成',
                        key: 'item_status',
                        width: 120
                    }
                ]
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/order/cycle/service/account/door/service/record/detail?accountDoorRecordId=' + _self.id
                let url2 = '/order/cycle/service/account/door/record/item/list?accountDoorRecordId=' + _self.id

                function doSuccess(res) {
                    _self.detail = res.data.data
                    _self.detail.service_timestamp = new Date(_self.detail.service_timestamp * 1000).getHours()
                }

                function doSuccess2(res) {
                    _self.data = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].item_status == 'unfinished') {
                            res.data.data[i].item_status = '未完成'
                        } else {
                            res.data.data[i].item_status = '已完成'
                        }
                        _self.data.push(res.data.data[i])
                    }
                }

                this.GetData(url, doSuccess)
                this.GetData(url2, doSuccess2)
            },

            save() {
                let _self = this
                let url = '/order/cycle/account/door/server/service/record/update'
                let _data = {
                    id: _self.id,
                    managerIdea:  _self.task_message.managerIdea,
                    serverMemo:  _self.task_message.serverMemo,
                }

                function doSuccess() {
                    _self.$Message.success('修改成功')
                    Bus.$emit('kjfuwu',_self.id)
                }

                this.PostData(url, _data, doSuccess)
            }
        },
        created(){
            var _self = this
            Bus.$on('genzong',(e)=>{
                _self.genzong = true,
                _self.id = e,
                _self.getData()
            })
        },
    }
</script>
