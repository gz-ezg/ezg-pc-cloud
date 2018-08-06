<template>
    <!--    投诉处理    -->
    <div>
        <Modal
            v-model="deal_complaint"
            title="投诉处理"
            width="600"
        >
            <Form ref="deal" :model="deal" :label-width="100" style="width:500px;margin:auto">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="companyname" label="公司：">
                            <Input type="text" v-model="deal.companyname" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="departname" label="投诉部门：">
                            <Input type="text" v-model="deal.departname" readonly></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typeName" label="投诉类型：">
                            <Input type="text" v-model="deal.typeName" readonly></Input>                        
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="record" label="投诉内容：" >
                            <Input type="textarea" v-model="deal.record" rows=rows readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="processType" label="处理状态：" >
                            <Select transfer v-model="deal.processType" placeholder="" readonly>
                                <Option v-for="(item,index) in processType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="rx" label="解决方案：">
                            <Input type="textarea" v-model="deal.rx" rows="4"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="receiving" label="受理人：" >
                            <Input type="text" v-model="deal.receiving" rows="4" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="createby" label="创建人：" >
                            <Input type="text" v-model="deal.createby" rows="4" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="complaintManage" label="客服反馈：">
                            <Input type="textarea" v-model="deal.complaintManage" rows=4 ></Input>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="deal_complaint_detail">处理</Button>
                <Button type="ghost" @click="deal_complaint=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    props:['complaintType','processType'],
    data(){
        return{
            rows:new Number("4"),
            deal_complaint:false,
            //  新增数据
            deal:{

            },
            selectCompany:false,
            searchCompany:"",
            columns44: 
                [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        width:300
                    },
                    {
                        title: '归属客户',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    }
                ],
            company_data:[],
            company_data_total:""
        }
    },
    methods:{
        //  处理投诉
        deal_complaint_detail(){
            let _self = this
            let url = 'api/customer/updateComplaint'
            let config = {
                id: _self.deal.id,
                rx: _self.deal.rx,
                processtype:_self.deal.processType,
                complaintManage:_self.deal.complaintManage
            }
            this.$http.post(url,config).then(function(res){
                // console.log(res)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                    _self.deal_complaint = false
                    Bus.$emit('UPDATE_COMPLAINT', true)                    
                }else{
                    _self.$Message.warning(res.data.msg)
                }
            })
        }
    },
    created () {
        let _self = this
        Bus.$on('DEAL_COMPLATNT',(e)=>{
            // console.log(e)
            _self.deal_complaint = true
            _self.deal = e
        })
    }
}
</script>
