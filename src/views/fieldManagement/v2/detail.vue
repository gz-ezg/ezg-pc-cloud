<template>
    <div>
        <Modal
                v-model="openLegworkDetail"
                title="外勤详情"
                width="450"
        >
            <div style="min-height:60vh;width:400px" >
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">任务名称</span>
                    </Col>
                    <Col span="18">
                    <Input v-model="detail.task_name" size="small" readonly="true" style="width:180px" >
                    </Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">公司名称</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{detail.CompanyName}}
                        </span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">客户</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.name}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px"  v-if="detail.task_kind != '会计代账' && detail.task_kind != '代账协助' ">
                    <Col span="6">
                    <span style="line-height:24px">任务类型</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.task_kind}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px"   v-if=" detail.task_kind == '会计代账' || detail.task_kind == '代账协助' ">
                    <Col span="6">
                    <span style="line-height:24px">任务类型</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.type}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if=" detail.task_kind == '商事外勤' || detail.task_kind == '工单协助' ">
                    <Col span="6">
                    <span style="line-height:24px">地区</span>
                    </Col>
                    <Col span="6">
                    <span style="line-height:24px">{{detail.task_area}}</span>
                    </Col>
                    <Col span="6">
                    <span style="line-height:24px">地点</span>
                    </Col>
                    <Col span="6">
                    <span style="line-height:24px">{{detail.task_place}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px"   v-if=" detail.task_kind != '市场外勤' ">
                    <Col span="6">
                    <span style="line-height:24px">服务内容</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.service_content}}</span>
                    </Col>
                </Row>

                <Row :gutter="20" style="margin-top:20px"  v-if=" detail.task_kind == '商事外勤' ">
                    <Col span="6">
                    <span style="line-height:24px">服务节点</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.process}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px"   v-if=" detail.task_kind == '市场外勤' ">
                    <Col span="6">
                    <span style="line-height:24px">跟进阶段</span>
                    </Col>
                    <Col span="18">
                    <span style="line-height:24px">{{detail.service_content}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">代办于</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.plan_date" style="width:180px" readonly="true" ></Input>
                    </Col>

                </Row>


                <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                    <span style="line-height:24px">外勤开始时间</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.begin_time" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                    <span style="line-height:24px">开始打卡地点</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.begin_address" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                    <span style="line-height:24px">外勤结束时间</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.end_time" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">结束打卡地点</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.end_address" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">外勤结果</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.finish_status" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                    <span style="line-height:24px">开始打卡备注</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.begin_memo" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                    <span style="line-height:24px">外勤总结</span>
                    </Col>
                    <Col span="18">
                    <Input size="small" v-model="detail.finish_memo" style="width:180px" readonly="true" ></Input>
                    </Col>
                </Row>
               <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                    <span style="line-height:24px">打卡照片</span>
                    </Col>
                    <Col span="18" v-for="(item,index) in imgUrls " :key="index">
                    <a target="_blank" :href="'/api/assets/' + item" >
                        <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                    </a>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button @click="openLegworkDetail = false" type="primary"  style="margin-left:40px"  :loading="loading" >关闭</Button>
            </div>
        </Modal>
        <create></create>
    </div>
</template>

<script>
    export default{
        props:["taskKindMap","legwork_finish_statusMap","gzbusinessareaMap","gzbusinessplaceMap"],
        data(){
            return{
                detail:{},
                openLegworkDetail:false,
                id:'',
                imgUrls:[]
            }
        },
        methods:{
            get_data(){
                let _self = this;
                var url = 'api/user/legwork/task/detail'
                var config = {
                    params:{
                        legworkTaskId:_self.id
                    }
                }

                _self.$http.get(url,config).then(function(res){
                    _self.imgUrls = [];
                    _self.detail = res.data.data;
                    if(res.data.data.begin_realpath){
                        for(let k = 0;k<res.data.data.begin_realpath.split(",").length;k++){
                            _self.imgUrls.push(res.data.data.begin_realpath.split(",")[k])
                        }
                    }
                    if(res.data.data.end_realpath){
                        for(let k = 0;k<res.data.data.end_realpath.split(",").length;k++){
                            _self.imgUrls.push(res.data.data.end_realpath.split(",")[k])
                        }
                    }
                    if(_self.detail.task_kind){
                        _self.detail.task_kind = _self.taskKindMap.get( _self.detail.task_kind);
                        _self.detail.finish_status = _self.legwork_finish_statusMap.get( _self.detail.finish_status);
                    }
                    if(_self.detail.task_area){
                        _self.detail.task_area = _self.gzbusinessareaMap.get( _self.detail.task_area);
                    }
                    if(_self.detail.task_place){
                        _self.detail.task_place = _self.gzbusinessplaceMap.get( _self.detail.task_place);
                    }
                })
            }
        },
        created() {
            let _self = this;
            this.$bus.off("OPEN_LEGWORK_DETAIL",true);
            this.$bus.on("OPEN_LEGWORK_DETAIL",(e)=>{
                _self.id = e.id;
                _self.get_data();
                 _self.openLegworkDetail = true;
            });
        }
    }
</script>
