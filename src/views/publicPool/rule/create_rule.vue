<template>
    <Modal
        title="新增销售规则"
        v-model="open_create_rule"
        width="800"
    >
        <Row :gutter="20">
            <Col span="12">
            <Form :label-width="90">
                <Row>
                    <Col span="12">
                        <FormItem label="客户状态" prop="customerStatus">
                            <Cascader size="small" v-model="customerStatus" :data="CUStype" style="width:100%" trigger="hover" transfer >
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
                    <Col span="12">
                        <FormItem label="产品类型" prop="customersource">
                            <Select transfer size="small" v-model="formdata.customerStatus" style="width:100%">
                                <Option v-for="item in productType" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
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
            <Col span="12">
                <Row :gutter="5">
                    <div style="padding-bottom:5px">说明：</div>
                    <Input type="textarea" v-model="formdata.ruleMemo" rows=6></Input>
                </Row>
                <Row :gutter="5">
                    <div style="padding-bottom:1px;padding-top:5px">部门：</div>
                    <!--不使用树形结构，数据太复杂了-->
                    <Tree :data="departTree" show-checkbox @on-check-change="getCheckedNodes" ></Tree>
                    <!-- <CheckboxGroup v-model="social">
                        <Checkbox label="twitter">
                            <Icon type="social-twitter"></Icon>
                            <span>Twitter</span>
                        </Checkbox>
                        <Checkbox label="facebook">
                            <Icon type="social-facebook"></Icon>
                            <span>Facebook</span>
                        </Checkbox>
                        <Checkbox label="github">
                            <Icon type="social-github"></Icon>
                            <span>Github</span>
                        </Checkbox>
                        <Checkbox label="snapchat">
                            <Icon type="social-snapchat"></Icon>
                            <span>Snapchat</span>
                        </Checkbox>
                    </CheckboxGroup> -->
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
            <Button type="primary" @click="create_rule" style="margin-bottom:10px">新增</Button>
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
                    typecode:1
                },
                {
                    id:2,
                    typename:2,
                    typecode:2
                },{
                    id:3,
                    typename:3,
                    typecode:3
                },{
                    id:4,
                    typename:4,
                    typecode:4
                },{
                    id:5,
                    typename:5,
                    typecode:5
                }
            ],
            customerTypes:[],
            open_create_rule:false,
            formdata:{
            },
            depart: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        create_rule(){
            let _self = this
            let url = `api/crm/sale/rule/create`
            let temp 
            // console.log(_self.formdata.customerStatus)
            if(_self.customerStatus != ""){
                temp = _self.customerStatus[0] + '-' + _self.customerStatus[1]
            }else{
                temp = ""
            }
            let config = {
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
                _self.formdata.followRanks = ""
                _self.formdata.changeTime = ""
                _self.formdata.notifyTime = ""
                _self.formdata.ruleMemo = ""
                _self.formdata.departId = ""
                _self.formdata.customerArea = ""
                _self.formdata.channelTypeId = ""
                _self.formdata.behavior = ""
                _self.customerStatus = []
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
                    if(_self.departTree[i].children){
                        for(let j = 0;j<_self.departTree[i].children.length;j++){
                            _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                            if(_self.departTree[i].children[j].children){
                                for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                                    _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
                                }
                            }
                        }
                    }
                }
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
        this.getAllDepart()
        this.getAllDepartTree()
        this.$bus.on('open_create_customer_rule',(e)=>{
            // console.log(_self.CUStype)
            _self.open_create_rule = true
        })
    }
}
</script>

