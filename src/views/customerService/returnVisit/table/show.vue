<template>
    <div>
        <Modal
            title="查看"
            v-model="isOpenEdit"
            width = 800
            @on-cancel="close"
        >
            <Tabs v-model="showTab">
                <TabPane label="当前回访记录" name="1">
                    <Form ref="data" :model="data" :label-width="140" style="margin:auto">
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="companyname" label="公司名称：">
                                <Input type="text" v-model="data.companyname" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="name" label="客户名称：">
                                <Input type="text" v-model="data.name" readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="TEL" label="客户电话：">
                                <Input type="text" v-model="data.TEL" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="alisname" label="产品名称：">
                                <Input type="text" v-model="data.alisname"  readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="server_realname" label="服务人员：">
                                <Input type="text" v-model="data.server_realname" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="marketername" label="市场人员：">
                                <Input type="text" v-model="data.followby_realname"  readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="serviceranks" label="服务评分：">
                                <Input  type="text" v-model="data.serviceranks" style="width:100%" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="calltype" label="问题类型：">
                                <Select transfer v-model="data.calltype" placeholder="" disabled>
                                    <Option v-for="(item,index) in hfwtlx" :key=index :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="reply_time" label="答复时间:">
                                <Rate disabled v-model="data.reply_time"></Rate>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="professional_level" label="专业程度:">
                                <Rate disabled v-model="data.professional_level"></Rate>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="service_attitude" label="服务态度:">
                                <Rate disabled v-model="data.service_attitude"></Rate>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="service_attitude" label="其他:">
                                <Rate disabled v-model="data.service_attitude"></Rate>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="depart" label="责任部门：">
                                <CheckboxGroup v-model="data.depart">
                                    <span v-for="item in departAlias" :key=item.id>
                                        <Checkbox :label="item.typecode" disabled>
                                            <span>{{item.typename}}</span>
                                        </Checkbox>
                                    </span>         
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="callbackstatus" label="回访状态：">
                                <Select transfer v-model="data.callbackstatus" placeholder="" disabled>
                                    <Option v-for="(item,index) in hfzt" :key=index :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="callbackdate" label="回访时间：">
                                    <DatePicker transfer type="date" placeholder="选择日期" style="width:100%" v-model="data.callbackdate" readonly></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="reason" label="问题反馈或建议：">
                                <Input type="textarea" v-model="data.reason" :row="3" readonly></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="solutionbymarketer" label="市场反馈：">
                                <Input type="textarea" v-model="data.solutionbymarketer" :row="3" readonly></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="solutionbyservicer" label="服务部门反馈：">
                                <Input type="textarea" v-model="data.solutionbyservicer" :row="3" readonly></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    </Form>
                </TabPane>
                <TabPane label="历史回访记录" name="2">
                    <history-list :companyname="data.companyname" :hfwtlx="hfwtlx" :hfzt="hfzt" :departAlias="departAlias" readonly></history-list>
                </TabPane>
            </Tabs>
            <div slot="footer">

            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'
    import { DateFormat } from '../../../../libs/utils.js'
    import HistoryList from './histroy_list_show'

export default {
    components:{
        HistoryList
    },
    props:{
        hfwtlx: {
            type: [String, Array, Object]
        },
        hfzt: {
            type: [String, Array, Object]
        },
        data: {
            type: [String, Array, Object]
        },
        departAlias: {
            type: [String, Array, Object]
        }
    },
    data(){
        return{
            loading: false,
            showTab:"1",
            companyname:"",
            isservice:true,
            ismarket:true,
            isreturn:true,
            isOpenEdit:true,
        }
    },
    methods: {
        close(){
            this.$emit("close")
        }
    },
    created () {
        let _self = this
        if(Array.isArray(_self.data.depart) == false){
            _self.data.depart = _self.data.depart.split(',')
        }
    }
}
</script>

