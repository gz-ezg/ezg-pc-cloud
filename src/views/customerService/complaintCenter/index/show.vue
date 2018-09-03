<template>
    <!--    投诉处理    -->
    <div>
        <Modal
            v-model="show_complaint"
            title="查看"
            width="600"
        >
            <Form ref="show" :model="show" :label-width="100" style="width:500px;margin:auto">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="companyname" label="公司：">
                            <Input type="text" v-model="show.companyname" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="departname" label="投诉部门：">
                            <Input type="text" v-model="show.departname" readonly></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typeName" label="投诉类型：">
                            <Input type="text" v-model="show.typeName" readonly></Input>                        
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="record" label="投诉内容：" >
                            <Input type="textarea" v-model="show.record" :rows="4" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="processType" label="处理状态：" >
                            <Select transfer v-model="show.processType" placeholder="" disabled>
                                <Option v-for="(item,index) in processType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="rx" label="解决方案：">
                            <Input type="textarea" v-model="show.rx" :rows="4" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="receiving" label="受理人：" >
                            <Input type="text" v-model="show.receiving" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="createby" label="创建人：" >
                            <Input type="text" v-model="show.createby" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="complaintManage" label="客服反馈：" >
                            <Input type="textarea" v-model="show.complaintManage" :rows="4" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <!-- <Button type="primary" @click="show_complaint_detail">处理</Button> -->
                <Button type="ghost" @click="show_complaint=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
// import Bus from '../../../../components/bus'

export default {
    props:['complaintType','processType'],
    data(){
        return{
            rows:4,
            show_complaint:false,
            //  新增数据
            show:{

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
        // show_complaint_detail(){
        //     let _self = this
        //     let url = 'api/customer/updateComplaint'
        //     let config = {
        //         id: _self.show.id,
        //         rx: _self.show.rx,
        //         processtype:_self.show.processType
        //     }
        //     this.$http.post(url,config).then(function(res){
        //         console.log(res)
        //         if(res.data.msgCode == 40000){
        //             _self.$Message.success(res.data.msg)
        //         }else{
        //             _self.$Message.warning(res.data.msg)
        //         }
        //     })
        // }
    },
    created () {
        let _self = this
        // Bus.$on('SHOW_COMPLATNT',(e)=>{
        //     // console.log(e)
        //     _self.show_complaint = true
        //     _self.show = e
        // })
        _self.$bus.on('SHOW_COMPLATNT',(e)=>{
            // console.log(e)
            _self.show_complaint = true
            _self.show = e
        })
    }
}
</script>
