<template>
    <div class="test">


        <div v-for="(item,index) of productList" :key="index">

            <div >
                <h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
                    <span>{{item.product}}</span>
                    <Button v-if="pageFlag =='createOrder' || pageFlag =='editOrder'" size="small" @click="removeItem(index)">删除</Button>
                    <Button style ="color: red"v-if="pageFlag =='showOrder' && (operatorId ==10059 || operatorId == 10182) && item.deleteflag !=5 && orderDetail.orderstatus == 'approval_finish'" size="small" @click="refundItem(index)">退款</Button>
                </h6>
                <Card>
                    <Form label-position="left" ref="formValidate" :rules="ruleValidate">
                        <Row>
                            <Col span="5">
                            <div>
                                <div v-html="item.propertys"></div>
                                <div>
                                    产品价格:
                                    <span>{{item.oaprice}}</span>
                                </div>
                                <div v-if="item.iscycle != 'N'">
                                    月单价:
                                    <span>{{item.unitprice}}</span>
                                </div>
                                <div>
                                    <FormItem label="销售金额￥" prop="paynumber">
                                        <Input
                                                @on-change="computer_paynumber()"
                                                v-model="item.paynumber"
                                                :value="item.paynumber"
                                                size="small"
                                                style="width:80px"
                                                :disabled="isDisabled"
                                        ></Input>
                                    </FormItem>
                                </div>
                            </div>
                            </Col>
                            <Col span="19">
                            <div>
                                <Row>
                                    <Col span="6">
                                    <FormItem label="购买数量" prop="productnumber">
                                        <!-- 手动处理修改数量后，业务逻辑 其他参照此-->
                                        <InputNumber
                                                :precision="0"
                                                :min ="1"
                                                @on-change="changeProductNumber(productList[index])"
                                                v-model="item.productnumber"
                                                number
                                                size="small"
                                                :readonly="readonly"
                                                style="width:80px"></InputNumber>
                                    </FormItem>
                                    </Col>
                                    <Col span="6"  v-if="item.iscycle != 'N'">
                                        <FormItem label="赠送数量">
                                            <InputNumber
                                                    :precision="0"
                                                    :disabled="isDisabled"
                                                    v-model="item.givethenumber"
                                                    value = "0"
                                                    size="small"
                                                    style="width:80px"></InputNumber>月
                                        </FormItem>
                                    </Col>
                                    <Col  v-if="item.iscycle !='N'" span="6">
                                        <FormItem label="开始税期" prop="servicestartdate">
                                            <DatePicker
                                                    :disabled="isDisabled"
                                                    type="month"
                                                    v-model="item.servicestartdate"
                                                    placeholder="选择月份"
                                                    style="width:100px"
                                                    size="small"></DatePicker>
                                        </FormItem>
                                    </Col>

                                    <Col span="6">
                                    <FormItem label="服务部门" prop="departid">

                                        <Select v-if="pageFlag =='createOrder' || pageFlag =='editOrder' "
                                                :disabled="isDisabled"
                                                style="width:120px"
                                                size="small"
                                                @on-change="departChange($event, index)"
                                                v-model="item.departid"
                                                label-in-value>
                                            <Option
                                                    :value="parseInt(departItem.type)"
                                                    v-for="departItem of JSON.parse(item.servicedeparts)"
                                                    :key="departItem.departCode">{{departItem.text}}</Option>
                                        </Select>
                                        <Input v-if="pageFlag =='showOrder' || pageFlag =='amendOrder'"
                                               :disabled="isDisabled"
                                               v-model="item.departname"
                                               style="width:120px"
                                               type="text"
                                               size="small"

                                        />
                                    </FormItem>
                                    </Col>
                                    <Col span="6" v-if="item.iscycle === 'Y' && item.product != '会计到家'">
                                    <FormItem label="A类外勤" prop="type_a_count">
                                        <InputNumber
                                                :precision="0"
                                                :disabled="isDisabled"
                                                v-model="item.type_a_count"
                                                size="small"
                                                style="width:80px"></InputNumber>次
                                    </FormItem>
                                    </Col>
                                    <Col span="6" v-if="item.iscycle === 'Y' && item.product != '会计到家'">
                                    <FormItem label="B类外勤" prop="type_b_count">
                                        <InputNumber
                                                :precision="0"
                                                :disabled="isDisabled"
                                                v-model="item.type_b_count"
                                                size="small"
                                                style="width:80px"></InputNumber>次
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FormItem label="服务说明">
                                        <Input
                                                :disabled="isDisabled"
                                                v-model="productList[index].memo"
                                                type="textarea"
                                                size="small"
                                                :rows="2"
                                                style="width:80%"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>


        </div>


    </div>
</template>

<script>
    import * as orderApi from '../../api'
    export default{
        props:["productList","isDisabled","orderDetail","pageFlag"],
        inject:['cancel_order'],
        data(){
            return{
                companyId:"",
                operatorId:localStorage.getItem("id"),
                ruleValidate:{
                    productnumber:[
                        {required: true,message: '请输入整数',trigger: 'blur',type:'integer'}
                    ]
                }
            }
        },
        methods:{

            //	改变产品数量后自动执行该函数，可以在此函数处理其他值的相关逻辑
            changeProductNumber(item) {
                let _self = this;
                if(!item.unitprice){
                    item.unitprice = item.oaprice
                }
                item.paynumber = item.productnumber*item.unitprice;
                _self.computer_paynumber();
            },
            //  计算总金额
            computer_paynumber(){
                let _self = this
                let temp = 0
                for(let i = 0; i < _self.productList.length; i++){
                    temp = parseInt(temp) + parseInt(_self.productList[i].paynumber)
                }
                let paynumber = parseInt(temp)
                let realnumber = parseInt(temp)
                this.$bus.emit("SET_PAYNUMBER",{paynumber:paynumber,realnumber:realnumber})
            },
            removeItem(index){
                this.productList.splice(index,1);
                this.departChange();
                this.computer_paynumber();
            },
            //针对部门发生改变的回调
            departChange(item,index){

                let idObj ={};
                let _self = this
                console.log(_self.productList);

                for(let i=0;i<_self.productList.length;i++){
                    let param = {};
                    let row = _self.productList[i];

                    let departs = JSON.parse(row.servicedeparts);

                    for(let k =0;k<departs.length;k++){
                        if(departs[k].type == row.departid ){
                            row.departname = departs[k].text;
                        }
                    }
                    param.departId = row.departid;
                    param.departName = row.departname;
                    param.productSkuId = row.skuid;
                    if(idObj[row.departid]){
                        var skuFlag = true;
                        var skuArray = (idObj[row.departid].productSkuId+"").split(",");
                        for(var j =0;j<skuArray.length;j++){
                            if(skuArray[j] == row.skuid){
                                skuFlag = false;
                            }
                        }
                        if(skuFlag){
                            idObj[row.departid].productSkuId = idObj[row.departid].productSkuId+","+row.skuid;
                        }

                    }else{
                        idObj[row.departid] =param;
                    }

                }
                this.$bus.emit("DEPART_CHANGE_"+this.pageFlag,idObj);


            },
            refundItem(index){
                let _self = this
                this.$Modal.confirm({
                            title: '您确定要对该订单项退款吗',
                            content:_self.productList[index].propertys,
                            onOk: () => {
                            _self.$bus.$emit('CANCEL_ORDER',{"id":_self.orderDetail.id,"itemid":_self.productList[index].itemid});
                  },
                onCancel: () => {

                }
            });
            }
        },
        created(){
            let _self = this
            console.log(_self.productList);

            this.$bus.on("ADD_PRODUCT_DETAIL_LIST",(e)=>{
                e.givethenumber = 0
            if(e.departid){
                e.departid = parseInt(e.departid);
            }
            _self.productList.push(e);
            _self.departChange();
            _self.computer_paynumber();
        })
            this.$bus.on("OPEN_ORDER_PRODUCT_LIST",(e)=>{
                _self.companyId = e
        })
        }
    }
</script>

<style>
    .test .ivu-form-item{
        margin-bottom: 2px;
    }
    .test .ivu-form-item-label{
        padding: 10px 2px;
    }


</style>
