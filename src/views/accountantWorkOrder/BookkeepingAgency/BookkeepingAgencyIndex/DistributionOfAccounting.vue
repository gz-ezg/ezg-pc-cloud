<template>
    <div>
        <Modal
                v-model="fenpei"
                title="分配会计"
                width="800"
                @on-ok="ok"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="CompanyName" label="归属公司">
                            <Input type="text" size="small" v-model="task_message.CompanyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="产品">
                            <Input type="text" size="small" v-model="task_message.product" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="customername" label="归属客户">
                            <Input type="text" size="small" v-model="task_message.customername" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务会计">
                            <Select transfer v-model="accMagid" @on-change="optionChange">
                                <Option v-for="item in accMag" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="c" label="服务备注">
                            <Input type="text" size="small" v-model="task_message.workordermemo" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <!-- <Col span="10">
                        <FormItem prop="companyName" label="兼职会计">
                            <Select transfer v-model="jzAccid" transfer>
                                <Option value="0">无</Option>
                                <Option v-for="item in jzAcc" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col> -->
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                fenpei:false,
                task_message:{},
                accMagid: '',
                jzAccid: '',
                accMag: [],
                jzAcc: []
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/user/getUserListByDepartId?departId=' + _self.task_message.service_depart_id

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.accMag = []

                    for (let i= 0; i < _data.length; i++) {
                        _self.accMag.push({
                            value: _data[i].id,
                            label: _data[i].realname,
                            link: _data[i].links
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            optionChange(a) {
                let _self = this

                for (let i = 0; i < _self.accMag.length; i++) {
                    if (a == _self.accMag[i].value && _self.accMag[i].link != "null") {
                        let _data = JSON.parse(_self.accMag[i].link)
                        _self.jzAcc = []

                        for (let j = 0; j < _data.length; j++) {
                            _self.jzAcc.push({
                                value: _data[j].id,
                                label: _data[j].realname
                            })
                        }
                    } else if (a == _self.accMag[i].value && _self.accMag[i].link == "null") {
                        _self.jzAcc = []
                    }
                }
            },

            ok() {
                let _self = this
                // let url = '/order/batchUpdateServicer'
                let url = '/order/work/order/share'
                let _data = {
                    workOrderIds: _self.task_message.cycle_work_order_id,
                    userId:_self.jzAccid,
                    managerId:_self.accMagid
                }

                if (_self.jzAccid != '' && _self.jzAccid != 0) {
                    _data.userId = _self.jzAccid
                } else {
                    _data.userId = _self.accMagid
                }

                function doSuccess() {
                    Bus.$emit('UPDATE_ALL_ACCOUNT_PAGE',true)
                }

                this.PostData(url, _data, doSuccess)
            }
        },
        created(){
            var _self = this
            Bus.$on('fenpei',(e)=>{
                console.log(e)
                _self.fenpei = true
                _self.task_message = e
                // _self.task_message.workordermemo = e.memo
                // _self.task_message.followby_realname = e.followbyrealname
                if(Array.isArray(_self.task_message.CompanyName)){
                    _self.task_message.CompanyName = _self.task_message.CompanyName[0].name
                }
                // if(e.companyname !=""){
                //     _self.task_message.CompanyName = e.companyname
                // } 
                // _self.task_message.CompanyName = _self.task_message.CompanyName[0]
                _self.getData()
            })
        },
    }
</script>
