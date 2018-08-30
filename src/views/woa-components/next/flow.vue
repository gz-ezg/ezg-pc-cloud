<template>
    <div>
        <Modal
            width="700"
            title="流转"
            v-model="flow_show"
        >
            <Form ref="current_row" :model="current_row" :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="CurrentProcess" label="当前流程：">
                            <Input size="small" type="text"  v-model="current_row.CurrentProcess" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="product" label="产品：">
                            <Input size="small" type="text"  v-model="current_row.product" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="companyname" label="归属公司：">
                            <Input size="small" type="text"  v-model="current_row.companyname" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="servername" label="服务人员：">
                            <Input size="small" type="text"  v-model="current_row.servername" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="name" label="归属客户：">
                            <Input size="small" type="text"  v-model="current_row.name" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="departname" label="服务部门：">
                            <Input size="small" type="text"  v-model="current_row.departname" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="backup" label="服务备注：">
                            <Input type="textarea" v-model="backup" :rows="5" >
                            </Input>
                        </FormItem>
                    </Col>
                </Row> -->
            </Form>
            <div slot="footer">
                <Button type="primary" @click="save_flow" :loading="loading">确定</Button>
                <Button type="ghost" @click="flow_show=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    data(){
        return {
            //  备注
            backup:'',
            current_row:new Object(),
            flow_show:false,
            flow_message:{
                companyName:''
            },
            loading:false,
        }
    },
    methods:{
        save_flow(){
            let _self = this
            _self.loading = true
            let url = `api/order/next`
            let config = {
                workOrderId:_self.current_row.id,
                backup:_self.backup
            }
            this.$http.post(url, config).then(function(res){
                if(res.data.msgCode==40000){
                    if(res.data.msg =="流转成功"){
                        _self.$Message.success(res.data.msg)
                        _self.flow_show = false
                        _self.loading = false
                        // _self.backup = ''
                        Bus.$emit('flowsuccess',true)
                    }else{
                        _self.$Message.warning(res.data.msg)
                        _self.loading = false
                    }
                    
                }else{
                    _self.$Message.warning('流转失败')
                }
            }).catch(function(error){
                _self.$Message.warning('流转失败')
            })
        }
    },
    created(){
        var _self = this
        Bus.$on('myflow',(e)=>{
            _self.flow_show = true
            _self.current_row = e
        })
    }
}
</script>
