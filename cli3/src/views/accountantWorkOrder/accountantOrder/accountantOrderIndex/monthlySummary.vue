<template>
    <div>
        <Modal
                v-model="zongjie"
                title="查看月度总结"
                width="80%"
        >
            <Card>
                <Row>
                    <ButtonGroup>
                        <Button type="primary" icon="information-circled" @click="send = true">发送月度总结</Button>
                    </ButtonGroup>
                </Row>
                <Row style="margin-top: 10px;">
                    <Table
                            ref="selection"
                            highlight-row
                            size="small"
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
        </Modal>
        <Modal
                v-model="send"
                title="发送月度总结"
                width="50%"
                okText="确认发送"
                @on-ok="sendSummary"
                @on-cancel="cancel"
        >
            <Input size="small" v-model="value6" type="textarea" :rows="4" placeholder="月度总结"></Input>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return{
                send: false,
                value6: '',
                zongjie: false,
                id: {},
                page: 1,
                pageSize: 10,
                pageTotal: new Number(),
                data:[],
                header: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                    },
                    {
                        title: '内容',
                        key: 'summary_content',
                    },
                    {
                        title: '时间',
                        key: 'createdate',
                        width: 160
                    },
                    {
                        title: '创建人',
                        key: 'realname',
                        width: 120
                    }
                ]
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/order/cycle/month/service/summary/list?page=' + _self.page + '&pageSize=' + _self.pageSize + '&monthServiceId=' + _self.id.month_service_id

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            sendSummary() {
                let _self = this
                let url = '/order/cycle/month/service/summary/create'
                let _data = {
                    monthServiceId: _self.id.month_service_id,
                    summaryContent: _self.value6
                }

                function doSuccess(res) {
                    _self.$Message.success('提交成功')
                    _self.getData()
                    _self.send = false
                    _self.cancel()
                }

                this.PostData(url, _data, doSuccess)
            },

            cancel() {
                this.value6 = ''
            },
            pageChange(){},
            pageSizeChange(){}
        },
        created(){
            var _self = this
            Bus.$on('zongjie',(e)=>{
                _self.zongjie = true
                _self.id = e
                _self.getData()
            })
        },
    }
</script>