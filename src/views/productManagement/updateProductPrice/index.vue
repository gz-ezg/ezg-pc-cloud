<template>
    <div>
        <Card>
            <span slot="title"><h3>{{title}}</h3></span>
            <div v-for="(item, index) in queryProperty" :key="index" style="margin-top:10px">
                <Row style="display:flex;justify-content:flex-start">
                    <!-- <Col span="4"> -->
                        <div style="padding-right:20px;padding-left:10px;width:120px;display:inline-block;text-align:right;line-height:32px;">{{item.name}} :</div>
                    <!-- </Col> -->
                    <!-- <Col span="20"> -->
                        <RadioGroup v-model="typeArray[index]" type="button">
                            <Radio v-for="(item2, index2) in item.children" :label="item2.pvId" :key="index2">{{item2.propertyValue}}</Radio>
                        </RadioGroup>
                    <!-- </Col> -->
                </Row> 
            </div>
            <Row style="margin-top:10px;margin-left:10px;">
                <ButtonGroup>
                    <Button type="primary" @click="get_price">查询</Button>
                    <Button type="primary" @click="showUpdatePrice=true;dbaseprice='';doaprice=''">修改价格</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top:10px;margin-left:10px" v-if="showUpdatePrice">
                <div style="display:flex;justify-content:flex-start;align-items:center">
                    <span>基础价格：</span><Input style="width:150px;margin-right:40px;" v-model="dbaseprice" />
                    <span>系统价格：</span><Input style="width:150px;margin-right:40px;" v-model="doaprice"/>
                    <span>状态：</span>
                    <Select style="width:150px;margin-right:40px;" v-model="status">
                        <Option value="0">未上架</Option>
                        <Option value="1">销售中</Option>
                    </Select>
                    <span>SKU别名：</span><Input style="width:150px;margin-right:40px;" v-model="alisname"/>
                    <ButtonGroup>
                        <Button @click="update_product_price" type="warning">确认修改</Button>
                        <Button @click="showUpdatePrice=false" type="ghost">关闭</Button>
                    </ButtonGroup>
                </div>
            </Row>
            <Row :gutter="20" style="margin-top:10px">
                <Spin v-if="loading" size="large" fix></Spin>
                <Col span="24" v-else>
                    <tree-table
                        selection
                        :data="data" 
                        :columns="columns" 
                        border
                        @get-all-selection="get_all_selection"/>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import treeTable from './TreeTable/index'

export default {
    name: "updateProductPrice",
    components: {
        treeTable
    },
    data() {
        return {
            showUpdatePrice: false,
            loading: false,
            queryProperty: [],
            typeArray: [],
            title: "",
            columns: [
                {
                    text: '地区全称',
                    value: 'areafullname',
                    width: 200
                },
                {
                    text: '地区名称',
                    value: 'realname',
                    width: 150
                },
                {
                    text: "地区编码",
                    value: "dispid",
                    width: 120
                },
                {
                    text: '基础价格',
                    value: 'baseprice',
                    width: 120
                },
                {
                    text: '系统价格',
                    value: 'oaprice',
                    width: 120
                },
                {
                    text: '状态',
                    value: 'statusName',
                    width: 120
                },
            ],
            data: [],
            selectRow: [],
            dbaseprice: "",
            doaprice: "",
            status: "1",
            alisname: ""
        };
    },
    methods: {
        //  获取产品属性
        get_product_attr(e) {
            let _self = this;
            let url = `api/product/queryPropertyByProductId`;
            let config = {
                params: {
                    productId: e
                }
            };

            function success(res) {
                _self.queryProperty = res.data.data;
                console.log(res.data.data[0].product)
                _self.title = res.data.data[0].product
                // if (e == 100) {
                //     let temp = [];
                //     for (let i = 0; i < _self.queryProperty.length; i++) {
                //         if (_self.queryProperty[i].propertyId == 95) {
                //             temp[0] = _self.queryProperty[i];
                //         }
                //         if (_self.queryProperty[i].propertyId == 23) {
                //             temp[1] = _self.queryProperty[i];
                //         }
                //         if (_self.queryProperty[i].propertyId == 16) {
                //             temp[2] = _self.queryProperty[i];
                //         }
                //     }
                //     _self.queryProperty = temp;
                // }
            }
            this.$Get(url, config, success);
        },
        get_price(){
            let _self = this
            this.loading = true
            let url = `api/product/area/findTreeSkuArea`

            let config = {
                params: {
                    propertys: _self.typeArray.join(","),
                    productId: _self.$route.params.id
                }
            }

            function success(res){
                _self.data = res.data.data
                tran_status(_self.data)
                _self.loading = false
            }

            function tran_status(child){
                for(let i = 0; i< child.length; i++){
                    if(child[i].status == 1){
                        child[i].statusName = "销售中"
                    }else{
                        child[i].statusName = "未上架"
                    }

                    if(child[i].children){
                        tran_status(child[i].children)
                    }
                }
            }

            this.$Get(url, config, success)
        },
        get_all_selection(e){
            this.selectRow = e
        },
        update_product_price(){
            let _self = this
            let url = `api/product/area/saveProductSku`

            let areaPrices = []

            for(let i = 0; i<_self.selectRow.length;i++){
                let temp = {}
                temp.areaid = _self.selectRow[i].dispid
                temp.skuareaid = _self.selectRow[i].skuAreaId
                temp.status = _self.status
                temp.baseprice = _self.dbaseprice
                temp.oaprice = _self.doaprice

                areaPrices.push(temp)
            }

            let config = {
                productId: _self.$route.params.id,
                propertys: _self.typeArray.join(","),
                doaprice: _self.doaprice,
                dbaseprice: _self.dbaseprice,
                areaPrices: JSON.stringify(areaPrices)
            }

            function success(res){
                _self.get_price()
                // _self.$bus.emit("update-price")
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        }
    },
    watch: {
        '$route'(to, from){
            if(to.params.id){
                this.get_product_attr(to.params.id)
            }
        }
    },
    created() {
        this.get_product_attr(this.$route.params.id)
    }
};
</script>
