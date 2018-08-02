<template>
    <Modal
        title="修改销售规则"
        v-model="edit_create_rule"
        width="900"
        @on-cancel="handleReset('formdata')"
        :mask-closable="false"
    >
        <Row :gutter="20">
            <Col span="15">
            <Form :label-width="100" ref="formdata" :rules="formdataRule" :model="formdata" :show-message="false">
                <Row>
                    <Col span="12" >
                        <FormItem prop="customerStatus" >
                            <span slot="label" class="warning">客户状态</span>
                            <Cascader size="small"  v-model="customerStatus" :data="CUStype" style="width:100%" trigger="hover" transfer >
                            </Cascader >
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户等级" prop="customerLevel">
                            <Select transfer size="small" v-model="formdata.customerLevel" style="width:100%">
                                <Option v-for="item in customerrating" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="客户地区" prop="customerArea">
                            <Select transfer size="small" v-model="formdata.customerArea" style="width:100%">
                                <Option v-for="item in area" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户渠道" prop="channelTypeId">
                            <Select transfer size="small" v-model="formdata.channelTypeId" style="width:100%">
                                <Option v-for="item in cluesources" :key="item.id" :value="item.id">{{item.channel_type_name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="行为" prop="behavior">
                            <Select transfer size="small" v-model="formdata.behavior" style="width:100%">
                                <Option v-for="item in behavior" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="惩罚" prop="punishment">
                            <Select transfer size="small" v-model="formdata.punishment" style="width:100%">
                                <Option v-for="item in fpunishment" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="跟进评分" prop="followRanks">
                            <Select transfer size="small" v-model="formdata.followRanks" style="width:100%">
                                <Option v-for="item in rating" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <!-- <Col span="12">
                        <FormItem label="产品类型" prop="producttype">
                            <Select transfer size="small" v-model="formdata.producttype" style="width:100%">
                                <Option v-for="item in productType" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col> -->
                </Row>
                <Row>
                    <Col>
                        <FormItem label="划入期限" prop="changeTime">
                            <Input  size="small" style="width:80px;margin-right:5px" v-model="formdata.changeTime">
                            </Input>
                            <span>天（有效天数，非工作日）</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="提前通知时间" prop="notifyTime">
                            <Input  size="small"  style="width:80px;margin-right:5px" v-model="formdata.notifyTime">
                            </Input>
                            <span>天（有效天数，非工作日）</span>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            </Col>
            <Col span="9">
                <Row :gutter="5">
                    <div style="padding-bottom:5px">说明：</div>
                    <Input type="textarea" v-model="formdata.ruleMemo" rows=6></Input>
                </Row>
                <Row :gutter="5">
                    <div style="padding-bottom:1px;padding-top:5px" class="warning">部门：</div>
                    <!--不使用树形结构，数据太复杂了-->
                    <Tree :data="departTree" show-checkbox @on-check-change="getCheckedNodes" ></Tree>
                    <!-- <RadioGroup v-model="selectDepart">
                        <Col span="8" v-for="item in allDepart" :key="item.ID">
                            <Radio :label="item.ID">
                            <span>{{item.departname}}</span>
                        </Radio>
                        </Col>
                    </RadioGroup> -->

                </Row>
            </Col>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="submit" style="margin-bottom:10px">修改</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    props:{
        CUStype: Array,
        cluesources: Array,
        area: Array,
        behavior: Array,
        fpunishment: Array,
        productType: Array,
        customerrating: Array
    },
    data(){
        return{
            check_depart_id:"",
            departTree:[],
            selectDepart:"",
            allDepart:[],
            customerStatus:[],
            rating:[
                {
                    id:1,
                    typename:1,
                    typecode:"1"
                },
                {
                    id:2,
                    typename:2,
                    typecode:"2"
                },{
                    id:3,
                    typename:3,
                    typecode:"3"
                },{
                    id:4,
                    typename:4,
                    typecode:"4"
                },{
                    id:5,
                    typename:5,
                    typecode:"5"
                }
            ],
            customerTypes:[],
            edit_create_rule:false,
            formdata:{
                id:"",
                customerLevel:"",
                customerArea:"",
                channelTypeId:"",
                behavior:"",
                punishment:"",
                followRanks:"",
                changeTime:"",
                notifyTime:"",
                ruleMemo:""
            },
            formdataRule:{
                customerLevel:{ required: true, message:"客户等级必选！", trigger: 'change' },
                // customerArea:{ required: true, message:"客户地区必选！",  trigger: 'change' },
                behavior:{ required: true, message:"行为必选！", trigger: 'change' },
                followRanks:{required: true, message:"跟进评分必选！", trigger: 'change'},
                punishment:{ required: true, message:"惩罚必选！",  trigger: 'change' },
                changeTime:{ required: true, message:"划入期限必填！",  trigger: 'blur' },
                notifyTime:{ required: true, message:"提前通知时间必填！",  trigger: 'blur' },
            },
        }
    },
    methods:{
        handleReset (name) {
            this.$refs[name].resetFields();
            this.customerStatus = []
            this.check_depart_id = ""
            this.getAllDepartTree()
        },
        submit(){
            let _self = this
            this.$refs['formdata'].validate((valid) => {
                if (valid) {
                    if(_self.check_depart_id != ""){
                        _self.create_rule()
                    }else{
                        this.$Message.error('请补全信息！');
                    }
                } else {
                    this.$Message.error('请补全信息！');
                }
            })
        },
        create_rule(){
            let _self = this
            let url = `api/crm/sale/rule/update`
            let temp 
            if(_self.customerStatus != ""){
                temp = _self.customerStatus[0] + '-' + _self.customerStatus[1]
            }else{
                temp = ""
            }
            let config = {
                id: _self.formdata.id,
                customerStatus: temp,
                customerLevel: _self.formdata.customerLevel,
                followRanks: _self.formdata.followRanks,
                punishment: _self.formdata.punishment,
                changeTime: _self.formdata.changeTime,
                notifyTime: _self.formdata.notifyTime,
                departId: _self.check_depart_id,
                ruleMemo: _self.formdata.ruleMemo,
                customerArea: _self.formdata.customerArea,
                channelTypeId: _self.formdata.channelTypeId,
                behavior: _self.formdata.behavior
            }

            function success(res){
                _self.open_create_rule = false
                _self.$bus.emit('update_customer_rule',true)
                _self.formdata.customerLevel = ""
                _self.formdata.followRanks = ""
                _self.formdata.changeTime = ""
                _self.formdata.notifyTime = ""
                _self.formdata.ruleMemo = ""
                _self.check_depart_id = ""
                _self.formdata.customerArea = ""
                _self.formdata.channelTypeId = ""
                _self.formdata.behavior = ""
                _self.customerStatus = []
                _self.edit_create_rule = false
            }

            function fail(err){
            }

            this.$Post(url, config, success, fail)
        },
        getAllDepart(){
            let _self = this
            let url = `api/system/depart/list`
            let config = {

            }

            function success(res){
                _self.allDepart = res.data.data
                // console.log(_self.allDepart)
            }

            this.$Get(url,config, success)
        },
        getAllDepartTree(){
            let _self = this
            let url = `api/system/depart/tree/list`
            let config = {

            }

            function success(res){
                _self.departTree = res.data.data
                // console.log(_self.allDepart)
                for(let i = 0; i<_self.departTree.length;i++){
                    _self.departTree[i].title = _self.departTree[i].departname
                    if(_self.departTree[i].ID == _self.check_depart_id){
                        _self.departTree[i].checked = true
                    }
                    if(_self.departTree[i].children){
                        for(let j = 0;j<_self.departTree[i].children.length;j++){
                            if(_self.departTree[i].children[j].ID == _self.check_depart_id){
                                _self.departTree[i].children[j].checked = true
                            }
                            _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                            if(_self.departTree[i].children[j].children){
                                for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                                    if(_self.departTree[i].children[j].children[k].ID == _self.check_depart_id){
                                        _self.departTree[i].children[j].children[k].checked = true
                                    }
                                    _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
                                    if(_self.departTree[i].children[j].children[k].children){
                                        for(let t = 0;t<_self.departTree[i].children[j].children[k].children.length;t++){
                                            if(_self.departTree[i].children[j].children[k].children[t].ID){
                                                _self.departTree[i].children[j].children[k].children[t].checked = true
                                            }
                                            _self.departTree[i].children[j].children[k].children[t].title = _self.departTree[i].children[j].children[k].children[t].departname
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(_self.departTree)
            }

            this.$Get(url,config, success)
        },
        getCheckedNodes(e){
            let _self = this
            if(e.length == 0){
                _self.check_depart_id = ""
            }else{
                _self.check_depart_id = e[0].ID
            }
            console.log(_self.check_depart_id)
        }
    },
    created(){
        // this.getCustomerType()
        let _self = this
        // this.getAllDepart()
        this.$bus.on('open_edit_customer_rule',(e)=>{
            console.log(e)
            _self.formdata.customerLevel = e.customer_level.toString()
            _self.formdata.customerArea = e.customer_area
            if(e.follow_ranks){
                _self.formdata.followRanks = e.follow_ranks.toString()
            }
            if(e.change_time){
                _self.formdata.changeTime = e.change_time.toString()
            }
            if(e.notify_time){
                _self.formdata.notifyTime = e.notify_time.toString()
            }
            _self.check_depart_id = e.depart_id
            _self.formdata.id = e.id
            _self.formdata.channelTypeId = e.channel_type_id
            _self.formdata.behavior = e.behavior
            _self.formdata.punishment = e.punishment
            _self.formdata.ruleMemo = e.rule_memo
            // _self.customerStatus = e.customer_status.split("-")
            if(e.customer_status){
                let temp1 = parseInt(e.customer_status.split("-")[0])
                let temp2 = parseInt(e.customer_status.split("-")[1])
                // console.log(temp1)
                // console.log(temp2)
                _self.customerStatus.push(temp1)
                _self.customerStatus.push(temp2)
            }
            // console.log(_self.customerStatus)
            
            _self.edit_create_rule = true
            this.getAllDepartTree()
        })
    }
}
</script>


<style scoped>
/* .warning::before{
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
} */
</style>

