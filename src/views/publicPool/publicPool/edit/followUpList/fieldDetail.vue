<template>
    <div>
        <Modal
                title="查看外勤详情"
                v-model="openAllDetail"
                width="600"
            >
                <Form ref="fiedDetail" :model="fiedDetail" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="clocktime" label="上门时间：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.clocktime"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="endtime" label="离开时间：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.endtime"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="fieldlength" label="外勤时长：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.fieldlength"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="assiststatus" label="外勤类型：" style="margin-bottom:5px">
                                    <Select type="text" v-model="fiedDetail.assiststatus"  disabled>
                                        <Option value="N">非协助外勤</Option>
                                        <Option value="Y">协助外勤</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="22">
                                <FormItem prop="clockshows" label="打卡说明：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.clockshows"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
    
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="22">
                                <FormItem prop="address1" label="第一次打卡地址：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.address1" readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                                                        
                            <Col span="22">
                                <FormItem prop="address2" label="第二次打卡地址：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.address2"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <!-- <Col span="11" style="visibility:hidden"> -->
                            <!-- </Col> -->
                            <Col span="22">
                                <FormItem prop="remark" label="备注总结：" style="margin-bottom:5px">
                                    <Input type="textarea" v-model="fiedDetail.remark"  readonly>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="Providentfund" label="附件：" style="margin:5px" readonly >
                                    <Row v-for="(item,index) in fiedDetail.imgs " :key="index">
                                        <a target="_blank" :href="'/api/assets/' + item" >
                                            <img :src="'/api/assets/' +item" alt=""  width="100" height="100">
                                        </a>
                                    </Row>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div slot="footer"></div>
            </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openAllDetail: false,
            fiedDetail:{
                clocktime:"",
                endtime:"",
                fieldlength:"",
                assiststatus:"",
                clockshows:"",
                address1:"",
                address2:"",
                remark:"",
                imgs:[]
            },
        }
    },
    methods:{
        get_data(e){
            let _self = this
            let url = 'api/customer/follow/record/detail'
            let config = {
                params:{
                    followRecordId: e
                }
            }

            function success(res){
                let temp = res.data.data
                if(res.data.data != null){
                    _self.openAllDetail = true
                    _self.fiedDetail = res.data.data
                    if(res.data.data.realpaths){
                        _self.fiedDetail.imgs = []
                        let pic = ""
                        pic = _self.fiedDetail.realpaths.split(",")
                        for(let i = 0;i<pic.length;i++){
                            _self.fiedDetail.imgs.push(pic[i])
                        }
                    }
                }else{
                    _self.$Message.warning("暂无数据！")
                }    
            }
            this.$Get(url, config, success)
        }
    },
    created(){
        let _self = this
        this.$bus.on("SHOW_OPEN_CUSTOMER_FOLLOW_FIELD",(e)=>{
            _self.openAllDetail = true
            _self.get_data(e)
        })
    }
}
</script>

