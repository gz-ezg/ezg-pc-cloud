<template>
    <div>
        <Modal
            title="编辑"
            v-model="isOpenEdit"
            width = 800
        >
            <Tabs v-model="showTab">
                <TabPane label="当前回访记录" name="1">
                    <Form ref="add" :model="add" :label-width="140" style="margin:auto">
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="companyname" label="公司名称：">
                                <Input type="text" v-model="add.companyname" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="name" label="客户名称：">
                                <Input type="text" v-model="add.name"  readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="tel" label="客户电话：">
                                <Input type="text" v-model="add.tel" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="product" label="产品名称：">
                                <Input type="text" v-model="add.product"  readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="servicename" label="服务人员：">
                                <Input type="text" v-model="add.servicename" readonly>
                                </Input>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="marketername" label="市场人员：">
                                <Input type="text" v-model="add.marketername"  readonly>
                                </Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem prop="serviceranks" label="服务评分：">
                                <InputNumber  type="text" v-model="add.serviceranks" :max="10" :min="0" style="width:100%" :disabled="isreturn">
                                </InputNumber>
                            </FormItem> 
                        </Col>
                        <Col span="12">
                            <FormItem prop="calltype" label="问题类型：">
                                <Select transfer v-model="add.calltype" placeholder="" :disabled="isreturn">
                                    <Option v-for="(item,index) in hfwtlx" :key=index :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="depart" label="责任部门：">
                                <CheckboxGroup v-model="add.depart">
                                    <span v-for="item in departAlias" :key="item.id">
                                        <Checkbox :label="item.typecode" :disabled="isreturn">
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
                                <Select transfer v-model="add.callbackstatus" placeholder="" :disabled="isreturn">
                                    <Option v-for="(item,index) in hfzt" :key=index :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem prop="callbackdate" label="回访时间：">
                                    <DatePicker transfer type="date" placeholder="选择日期" style="width:100%" v-model="add.callbackdate" :disabled="isreturn"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="reason" label="问题反馈或建议：">
                                <Input type="textarea" v-model="add.reason" :row="3" :disabled="isreturn"></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="solutionbymarketer" label="市场反馈：">
                                <Input type="textarea" v-model="add.solutionbymarketer" :row="3" :disabled="ismarket"></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem prop="solutionbyservicer" label="服务部门反馈：">
                                <Input type="textarea" v-model="add.solutionbyservicer" :row="3" :disabled="isservice"></Input>
                            </FormItem> 
                        </Col>
                    </Row>
                    </Form>
                </TabPane>
                <TabPane label="历史回访记录" name="2">
                    <history-list :tel="tel"></history-list>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="primary" @click="add_complaint_detail">修改</Button>
                <Button type="ghost" @click="close_complaint_detail">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'
    import {DateFormat} from '../../../../libs/utils.js'
    import HistoryList from './histroy_list_show'

export default {
    components:{
        HistoryList
    },
    props:['hfwtlx','hfzt'],
    data(){
        return{
            showTab:"1",
            companyname:"",
            isservice:true,
            ismarket:true,
            isreturn:true,
            departAlias:[],
            isOpenEdit:false,
            name:"",
            add:{

            },
            tel:""
        }
    },
    methods: {
        getDataCenter(){
                let _self = this
                // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
                // let config = {
                //     params:{
                //         groupCodes:"departAlias"
                //     }
                // }
                // this.$http.get(url, config).then(function(res){
                //     _self.departAlias = res.data.data.departAlias              
                //     // console.log(_self.departAlias)
                // })

                let params = "departAlias"

                function finish(res){
                    _self.departAlias = []
                    // _self.departAlias = res.data.data.departAlias
                    for(let i = 0;i<res.data.data.departAlias.length; i++){
                        _self.departAlias.push(res.data.data.departAlias[i])
                    }
                    // console.log(typeof(_self.departAlias))
                    // console.log(_self.departAlias)
                }

                this.$GetDataCenter(params, finish)

            },
            add_complaint_detail(){
                let _self = this
                let url = `api/customer/updateCustomerCallback`
                let depart = ""
                if(_self.add.depart){
                    depart = _self.add.depart.join(',')
                }
                let config = {
                    callbackdate:DateFormat(_self.add.callbackdate),
                    id:_self.add.id,
                    solutionbymarketer:_self.add.solutionbymarketer,
                    solutionbyservicer:_self.add.solutionbyservicer,
                    depart: depart,
                    serviceranks:_self.add.serviceranks,
                    calltype :_self.add.calltype,
                    callbackstatus:_self.add.callbackstatus,
                    reason:_self.add.reason,
                }
                // console.log(config)
                this.$http.post(url,config).then(function(res){
                    // console.log(res.data.msgCode)
                    if(res.data.msgCode == "40000"){
                        _self.$Message.success(res.data.msg)
                        _self.isOpenEdit = false
                        Bus.$emit('update_returnVisit_edit',true)
                    }else{
                        _self.$Message.warning(res.data.msg)
                    }
                })
            },
            close_complaint_detail(){
                this.isOpenEdit = false
            }
    },
    created () {
        this.getDataCenter()
        let _self = this
        // console.log(this.departAlias)
        Bus.$on('open_returnVisit_edit',(e)=>{
            console.log(e)
            _self.add = e
            _self.isOpenEdit = true
            _self.add.serviceranks = parseInt(_self.add.serviceranks)
            // console.log(_self.add.depart)
            // console.log(_self.add.depart)
            if(_self.add.depart){
                _self.add.depart = _self.add.depart.split(",")
            }else{
                _self.add.depart = []
            }
            // console.log(e)
            _self.companyname = e.companyname
            _self.name = e.name
            _self.tel = e.tel
            _self.showTab = "1"   
        })
        let role = localStorage.getItem('Role')
        // console.log(role)
        role = JSON.parse(role)
        // console.log(role)
        for(let i = 0;i<role.length;i++){
            if(role[i] == "salers"){
                _self.ismarket = false
            }
            if(role[i] == "hfgl"){
                _self.isreturn = false
            }
            if(role[i] == "kj" || role[i] == "servicer" || role[i] == "planner" || role[i] == "auditing" || role[i] == "ssbgd" || role[i] == "kjbgd" || role[i] == "qhbgd" || role[i] == "sjbgd"){
                _self.isservice = false
            }
        }
    }
}
</script>

