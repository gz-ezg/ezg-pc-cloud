<template>
    <div>
        <Modal
            title="查看"
            v-model="isOpenShow"
            width = 800
        >
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
                            <Input type="text" v-model="add.serviceranks" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="calltype" label="问题类型：">
                            <Select transfer v-model="add.calltype" placeholder="" disabled>
                                <Option v-for="(item,index) in hfwtlx" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="depart" label="责任部门：">
                            <CheckboxGroup v-model="add.depart" >
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
                        <FormItem prop="callbackstatus" label="回访状态：" >
                            <Select transfer v-model="add.callbackstatus" placeholder="" disabled>
                                <Option v-for="(item,index) in hfzt" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="callbackdate" label="回访时间：" >
                            
                                <DatePicker transfer type="date" placeholder="选择日期" style="width:100%" v-model="add.callbackdate" disabled></DatePicker>
                            <!-- <Col span="1" style="text-align: center">-</Col>
                            <Col span="4">
                                <TimePicker  transfer type="time" placeholder="选择时间" style="width:100%" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]"></TimePicker>
                            </Col> -->
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="reason" label="问题反馈或建议：">
                            <Input type="textarea" v-model="add.reason" :row="3" disabled></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="solutionbymarketer" label="市场反馈：">
                            <Input type="textarea" v-model="add.solutionbymarketer" :row="3" disabled></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="solutionbyservicer" label="服务部门反馈：">
                            <Input type="textarea" v-model="add.solutionbyservicer" :row="3" disabled></Input>
                        </FormItem> 
                    </Col>
                </Row>

            </Form>
            <div slot="footer">
                <Button type="ghost" @click="close_complaint_detail">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'
    import {DateFormat} from '../../../../libs/utils.js'
export default {
    props:['hfwtlx','hfzt'],
    data(){
        return{
            departAlias:[],
            isOpenShow:false,
            add:{
            }
        }
    },
    methods: {
        getDataCenter(){
                let _self = this
                let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
                let config = {
                    params:{
                        groupCodes:"departAlias"
                    }
                }
                this.$http.get(url, config).then(function(res){
                    _self.departAlias = res.data.data.departAlias              
                    // console.log(_self.departAlias)
                })

            },
            close_complaint_detail(){
                this.isOpenShow = false
            }
    },
    created () {
        this.getDataCenter()
        let _self = this
        // console.log(this.departAlias)
        Bus.$on('open_returnVisit_show',(e)=>{
            _self.add = e
            _self.isOpenShow = true
            _self.add.depart = _self.add.depart.split(',')
            // console.log(e)      
        })
    }
}
</script>

