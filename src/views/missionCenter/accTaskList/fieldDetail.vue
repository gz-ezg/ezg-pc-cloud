<template>
    <Modal
            v-model="openFieldDetail"
            title="外勤详情"
            width="700"
            @on-cancel="openFiledDetail = false"
    >
        <Row>
            <Form ref="fiedDetail" :model="fieldDetail" :label-width="120" v-if="fieldDetail.length!==0">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="companyname" label="公司名称：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.CompanyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="name" label="客户名称：" style="margin-bottom:5px">
                            <Input type="text"  v-model="fieldDetail.NAME" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="tel" label="客户电话：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.tel"  disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="clocktime" label="上门时间：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.begin_time"  disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="endtime" label="离开时间：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.end_time" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="fieldlength" label="外勤时长：" style="margin-bottom:5px">
                            <Input type="text" v-model="dateLength"  disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem prop="assiststatus" label="外勤类型：" style="margin-bottom:5px">
                            <!-- <Select type="text" v-model="fiedDetail.fieldtype"  disabled>
                                <Option v-for="(item,index.vue) in fieldClockType" :key=index.vue :value="item.typecode">{{item.typename}}</Option>
                            </Select> -->
                            <Input type="text"  v-model="fieldDetail.follow_result_name" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="22">
                        <FormItem prop="clockshows" label="打卡说明：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.begin_memo"  disabled>
                            </Input>
                        </FormItem>
                    </Col>

                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="22">
                        <FormItem prop="startAddress" label="第一次打卡地址：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.begin_address" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="22">
                        <FormItem prop="endAddress" label="第二次打卡地址：" style="margin-bottom:5px">
                            <Input type="text" v-model="fieldDetail.end_address" disabled>
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
                            <Input type="text"  v-model="fieldDetail.finish_memo" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="Providentfund" label="开始打卡照片：" style="margin:5px" disabled >
                            <Row v-for="(item,index) in beginImgList " :key="index">
                                <!-- <a target="_blank" :href="'api/assets/' + item.realpath" >
                                    <img :src="'api/assets/' + item.realpath" alt=""  width="100" height="100">
                                </a> -->
                                <a target="_blank" :href="'/api/assets/' + item" >
                                    <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                </a>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="Providentfund" label="结束打卡照片：" style="margin:5px" disabled >
                            <Row v-for="(item,index) in endImgList " :key="index">
                                <!-- <a target="_blank" :href="'api/assets/' + item.realpath" >
                                    <img :src="'api/assets/' + item.realpath" alt=""  width="100" height="100">
                                </a> -->
                                <a target="_blank" :href="'/api/assets/' + item" >
                                    <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                </a>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Row>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
    import {DateDifference} from "../../../libs/utils";
    export default {
        name: "fieldDetail",
        data(){
            return{
                openFieldDetail:false,
                fieldDetail:[],
                beginImgList:[],
                endImgList:[],
                dateLength:""
            }
        },
        methods:{
            get_data(e){
                let _self = this
                let url = `api/user/legwork/task/detail`
                let config = {
                    params:{
                        legworkTaskId: e.row.legId,
                    }
                }

                function success(res){
                    _self.fieldDetail = res.data.data
                    _self.beginImgList = res.data.data.begin_realpath.split(",")
                    _self.endImgList = res.data.data.end_realpath.split(",")
                    _self.dateLength = DateDifference(res.data.data.begin_time,res.data.data.end_time)
                    console.log(_self.dateLength)
                    console.log(_self.beginImgList)
                    console.log(_self.endImgList)
                    console.log(_self.fieldDetail)
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
        },
        created() {
            this.$bus.on("SHOW_FIELD_DETAIL",(e)=>{
                this.openFieldDetail = true
                this.get_data(e)
            })
        }
    }
</script>

<style>

</style>