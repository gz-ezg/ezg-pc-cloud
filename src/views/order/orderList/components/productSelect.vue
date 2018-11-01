<template>
    <div>
        <Modal
            v-model="orderAddProduct"
            title="产品名称"
            width="1000">
            <Row style="margin-bottom:10px">
                <Col span="4">
                        <Input v-model="searchProduct" placeholder="输入产品搜索" @on-enter="search_product">
                            <Button slot="append" icon="ios-search" @click="search_product"></Button>
                        </Input>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <Card>
                    <Col span="16">
                        <p slot="title">产品列表</p>
                    </Col>
                    
                    <Table
                        :loading="loading"
                        highlight-row
                        :row-class-name="rowClassName"
                        @on-row-click="select_product"
                        :columns="productColumns"
                        :data="productData">
                    </Table>
                    <Page
                            size="small"
                            :total="total"
                            :current.sync="page"
                            show-total
                            show-elevator
                            @on-change="pageChange"
                            style="margin-top: 10px"
                            simple
                    ></Page>
                </Card>
                </Col>
                <Col span="15" offset="1">
                    <Spin size="large" fix v-if="sideLoading"></Spin>
                    <Card dis-hover v-if="selectProduct">
                        <p slot="title">产品详情</p>
                        <Row class="productDetail-title" style="margin-bottom:20px">
                            <p id="product_name">{{selectProduct.product}}</p>
                            <p class="productDetail-title-price">
                                <span>￥<strong id="product_price">{{productPrice}}</strong></span>
                            </p>
                            <div class="productDetail-title-content">
                            </div>
                        </Row>
                        <Row v-for="(item, index) in queryProperty" :key="index" class="type-select">
                            <p>{{item.name}}</p>
                            <RadioGroup v-model="selectProperty[index]" type="button" size="large" @on-change="property_change">
                                <Radio v-for="(type, index2) in item.children" :label="type.pvId" :key="index2">{{type.propertyValue}}</Radio>
                            </RadioGroup>
                        </Row>
                        <Row style="margin-top:20px">
                            <p style="font-size:16px;padding-bottom:16px">地区</p>
                            <Col span="10">
                                <al-cascader v-model="areaCode" data-type="code" level="2" @on-change="area_change"/>
                            </Col>
                        </Row>
                        <Row>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="add_product" :disabled="disabled">立即购买</Button>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="open_flow_img" :disabled="disabled" v-if="isAdmin">查看流程图</Button>
                        </Row>
                    </Card>
                    <!-- <Card dis-hover v-if="isProductDetail">
                        <p slot="title">产品详情</p>
                        <div class="productDetail-title">
                            <p id="product_name"></p>
                            <p class="productDetail-title-price">
                                <span>￥<strong id="product_price">加载中</strong></span>
                            </p>
                            <div class="productDetail-title-content">
                            </div>
                        </div>
                        <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
                            <div class="_propertys_class_" v-for="(item, index) in basePropertys" :key=index>
                                <p :id="item.propertyId">{{ item.name }}</p>
                                <div class="productDetail-option-buttonList" :name="index==0?'firstProperty':''">
                                    <button
                                            type="button"
                                            v-for="(item2, index2) in item.children"
                                            :key = index2
                                            :class="index2==0?'active':''"
                                            :id="item2.pvId"
                                            @click="chooseThisProperty(item2.pvId)">
                                        {{ item2.propertyValue }}
                                    </button>
                                </div>
                            </div>
                            <p id="areaId">地区</p>
                            <Row :gutter="16">
                                <Col span="10">
                                <al-cascader v-model="res1" data-type="code" level="2" @on-change="areaChange()"/>
                                </Col>
                            </Row>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="addProduct">立即购买</Button>
                            <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="open_flow_img" v-if="isAdmin">查看流程图</Button>
                        </div>
                    </Card> -->
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            companyId: "",
            loading: false,
            sideLoading: false,
            productPrice: 0,
            areaCode: ['440000', '440100', '440103'],
            SKU: "",
            orderAddProduct: false,
            //  产品检索
            searchProduct: '',
            productColumns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '产品名称',
                    key: 'product'
                },
                // {
                //     title: '状态',
                //     key: 'status'
                // },
                // {
                //     title: '产品编码',
                //     key: 'productCode'
                // },
            ],
            productData: [],
            total: 0,
            page: 1,
            pageSize: 10,
            selectProduct: "",
            //  产品的相关属性
            queryProperty: [],
            producSku: [],
            selectProperty: [],
        }
    },
    computed:{
        disabled(){
            if((this.queryProperty.length == this.selectProperty.length) && this.queryProperty.length != 0 ){
                return false
            }else{
                return true
            }
        },
        isAdmin(){
            if(localStorage.getItem("id") == "10059"){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        //  产品检索
        search_product(){
            let _self = this
            let url = `api/product/list`
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    product: _self.searchProduct
                }
            }

            function success(res){
                _self.productData = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.search_product()
        },
        //  生成产品详情
        select_product(e){
            if(e.id == "14"){
                this.$Message.error("对不起，该产品已经不允许操作！")
                return false;
            }
            this.sideLoading = true
            this.selectProduct = e
            this.productPrice = 0
            this.queryProperty = []
            this.selectProperty = []
            this.get_queryProperty(e.id)
            this.get_product_sku(e.id)
        },
        //  获取产品子属性
        get_queryProperty(e){
            let _self = this
            let url = `api/product/queryPropertyByProductId`
            let config = {
                params: {
                    productId: e
                }
            }

            function success(res){
                _self.queryProperty = res.data.data
            }

            this.$Get(url, config, success)
        },
        //  获取产品所有sku
        get_product_sku(e){
            let _self = this
            let url = `api/product/getSKUListByProductId`
            let config = {
                params:{
                    productId: e
                }
            }

            function success(res){
                _self.producSku = res.data.data
                setTimeout(()=>{
                    _self.sideLoading = false
                }, 200)
            }

            this.$Get(url, config, success)
        },
        //  通过属性值获取sku
        find_sku(){
            let _self = this
            return new Promise(function(resolve, reject){
                _self.SKU = ""
                let len = _self.producSku[0].linkPropertys.split(",").length
                if(_self.selectProperty.length == len){
                    let arr = []
                    let total = _self.selectProperty.join(",")
                    for(let i = 0; i< _self.producSku.length;i++){
                        arr = _self.producSku[i].linkPropertys.split(",")
                        let flag = _self.find_array(arr, total)
                        if(flag){
                            _self.SKU = _self.producSku[i].id
                            resolve()
                        }
                    }
                }else{

                }

            })
        },
        //  数组比较
        find_array(cur, params){
            params = params.split(",")
            if(cur.length == params.length){
                let len = cur.length
                let flag = 0
                cur = cur.sort()
                params = params.sort()
                for(let i = 0; i<len; i++){
                    if(cur[i] == params[i]){
                        flag ++;
                    }else{
                        return false
                    }
                }
                if(flag == len){
                    return true
                }
            }else{
                return false
            }
        },
        //  获取产品价格
        get_product_price_by_sku(){
            let url = `api/product/getPriceByAreaAndSKU`

            let _self = this

            let config = {
                params:{
                    skuId: _self.SKU,
                    areaId: _self.areaCode[2]
                }
            }

            function success(res){
                _self.productPrice = res.data.data[0].oaprice
            }

            this.$Get(url, config, success)
        },
        area_change(e){
            this.property_change()
        },
        property_change(e){
            let _self = this
            this.productPrice = 0
            if(this.selectProperty.length){
                this.find_sku().then(() => {
                    _self.get_product_price_by_sku()
                }).catch(function(err){
                    console.log(err)
                })
            }else{
            }
        },
        //  产品操作
        add_product(){
            let _self = this
            let url = '/api/order/queryItemDetail'

            let config = {
                params:{
                    productSkuIds: _self.SKU,
                    areaId: _self.areaCode[2]
                }
            }

            function success(res){
                _self.detail = res.data.data[0]
                // console.log(_self.detail)
                if(res.data.data[0].iscycle == "Y"){
                    let url2 = "api/order/cycle/service/record/budget/period"
                    let config2 = {
                        params: {
                            productId: _self.selectProduct.id,
                            companyId: _self.companyId
                        }
                    }

                    function success2(re){
                        _self.detail.servicestartdate = re.data.data
                        _self.$bus.emit("ADD_PRODUCT",_self.detail)
                        _self.productListShow = false
                    }

                    _self.$Get(url2, config2, success2)
                }else{
                    _self.$bus.emit("ADD_PRODUCT", _self.detail)
                    _self.productListShow = false
                }
            }

            this.$Get(url, config, success)
        },
        //  产品流程图
        open_flow_img(){
            window.open("/api/dataCenter/activiti/getInputStreamBySkuId?skuId=" + this.SKU)
        },
        //  限制某项产品
        rowClassName(row, index){
            if(row.id == "14"){
                return 'disabled-row';
            }
        }
    },
    watch: {
        // queryProperty: function(){
        //     let _self = this
        //     this.productPrice = 0
        //     if(this.queryProperty.length){
        //         this.find_sku().then(() => {
        //             _self.get_product_price_by_sku()
        //         }).catch(function(err){
        //             console.log(err)
        //         })
        //     }else{

        //     }
        // }
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_ORDER_PRODUCT_LIST", true)
        this.$bus.on("OPEN_ORDER_PRODUCT_LIST", (e) => {
            _self.productPrice = 0
            _self.selectProduct = ""
            _self.searchProduct = ""
            _self.companyId = e
            _self.search_product()
            _self.orderAddProduct = true
        })
        
    }
}
</script>


<style>
.type-select .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper{
    margin: 10px;
    border-radius: 8px;
    border-left: 1px solid #dddee1;
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before{
    content: none;
    
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper-checked{
    background: #2d8cf0;
    color: #fff;
    border-left: none!important;
}
.productDetail-title {
    border-bottom: 1px solid #d9d9d9;
    padding: 1rem;
    background: #fff;
    position: relative;
}
.productDetail-title > p {
    line-height: 2;
    color: #742323;
    font-size: 1.2rem;
}
.productDetail-title-price > span {
    color: #ed3f14;
    font-weight: 400;
}
.productDetail-title-price > span > strong {
    font-size: 1.5rem;
}
.disabled-row{
    color: #EAEAEA
}
</style>

