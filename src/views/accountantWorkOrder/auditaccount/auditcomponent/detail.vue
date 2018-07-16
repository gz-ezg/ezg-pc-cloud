<template>
    <div>
        <Modal
            title="异常详情"
            width=1000
            v-model="opendetail"
        >
            <Form ref="detail" :model="detail" :label-width="120" style="width:900px;margin:auto">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="companyname" label="公司：">
                            <Input type="text" size="small" v-model="detail.companyname" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="product" label="服务内容：">
                            <Input type="text" size="small" v-model="detail.product" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="serverrealname" label="服务人员：">
                            <Input type="text" size="small" v-model="detail.serverrealname" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="followrealname" label="市场人员：">
                            <Input type="text" size="small" v-model="detail.followrealname" readonly></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="companyfname" label="异常情况（企业）：">
                            <Input type="textarea" v-html="detail.companyfname" readonly>
                            </Input>
                            <!-- <div v-html="detail.companyfname" style="border:#D3D3D3 solid 1px；padding:5px"></div> -->
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="acconterfname" label="异常情况（财务）：">
                            <Input type="textarea" v-html="detail.acconterfname" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="companyfname" label="其他异常情况：">
                            <Input type="textarea" v-model="detail.other_exception"> </Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="acconterfname" label="解决方案：">
                            <Input type="textarea" v-model="detail.solution"> </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="detail" label="是否处理：">
                            <Select transfer v-model="detail.batch_book_status" placeholder="">
                                <Option v-for="(item,index) in disposes" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="update" :disabled="updateButton">更新数据</Button>                
                <Button type="primary" @click="save">保存</Button>
                <Button type="ghost" @click="opendetail=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../../components/bus.js'

export default {
    props:['disposes'],
    data(){
        return {
            local_id:'',
            updateButton:false,
            opendetail:false,
            detail:{
                id:"",
                companyname:"",
                companyfname:"",
                acconterfname:"",
                product:"",
                serverrealname:"",
                followrealname:"",
                batch_book_status:"",
                period:"",
                account_book_id:"",
                createdate:"",
                other_exception:"",
                solution:""
            }
        }
    },
    methods: {
        save(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/batch/book/update`
            let config = {
                id: _self.detail.id,
                disposeStatus: _self.detail.batch_book_status,
                otherException: _self.detail.other_exception,
                solution: _self.detail.solution
            }
            this.$http.post(url,config).then(function(res){
                _self.$backToLogin(res)
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                    Bus.$emit('update_auditlist_detail',true)
                    _self.opendetail = false
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        update(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/begin`
            _self.updateButton = true
            let config = {
                companyId: _self.detail.account_book_id,
                period: _self.detail.period
            }
            this.$http.post(url, config).then(function(res){
                _self.$backToLogin(res)
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    Bus.$emit('update_auditlist_detail',true)
                    // _self.init()                    
                    _self.$Message.success('更新成功！')
                    _self.opendetail = false
                }else{
                    _self.$Message.error(res.data.msg)
                    _self.updateButton = false
                }
            })
        },
        updateButton_function(){
            let _self = this
            let temp = _self.detail.createdate.slice(-5,-3)
            let min = new Date().getMinutes()
            if(min == temp){
                _self.updateButton = true
                setTimeout(buttonuse,1000*60)
            }else{
                this.updateButton = false
            }
            
        },
        buttonuse(){
            _self.updateButton = false
        },
        init(){
            let _self = this
            let url2 = `api/order/cycle/finance/analysis/batch/book/detail?batchBookId=` + _self.local_id
            this.$http.get(url2).then(function(res){
                // _self.$backToLogin(res)
                // console.log(res.data.data)
                _self.$backToLogin(res)
                _self.detail =  res.data.data
                // for(let i = 0 ;i<res.data.data.length;i++){
                // }
                _self.opendetail = true
                _self.updateButton_function()
            })
        }
    },
    created () {
        let _self = this
        // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=disposes`
        // this.$http.get(url).then(function(res){
        //     // console.log(res.data.data)
        //     _self.disposes = res.data.data.disposes
        // })
        Bus.$on('open_audit_detail',(e)=>{
            // console.log(e)
            _self.local_id = e
            _self.init()
            // console.log(e)
        })
        
    }
}
</script>
