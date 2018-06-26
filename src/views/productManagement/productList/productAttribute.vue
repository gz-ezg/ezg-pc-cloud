<style>
    @import './css/productDetail.min.css';
</style>
<style lang="less">
    @import '../../my-components/area-linkage/area-linkage.less';
    @import '../../../styles/common.less';
</style>
<template>
    <div>
        <div class="productDetail-title">
            <p id="product_name"></p>
            <p class="productDetail-title-price">
                <span>￥<strong id="product_price">加载中</strong></span>
            </p>
            <div class="productDetail-title-content">
            </div>
        </div>
        <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
            <div class="_propertys_class_" v-for="(item, index) in basePropertys">
                <p :id="item.propertyId">{{ item.name }}</p>
                <div class="productDetail-option-buttonList" :name="index==0?'firstProperty':''">
                    <button
                            type="button"
                            v-for="(item2, index2) in item.children"
                            :class="index2==0?'active':''"
                            :id="item2.pvId"
                            @click="chooseThisProperty(item2.pvId)">
                        {{ item2.propertyValue }}
                    </button>
                </div>
            </div>
            <p id="areaId">地区</p>
            <Row  :gutter="16">
                <Col span="4">
                <al-cascader v-model="res1" data-type="code" level="2" @on-change="areaChange()"/>
                </Col>
            </Row>
        </div>
<!--        <div class="productDetail-footer">
            <input id="areaPropertyId" type="hidden"/>
            <div class="tel">
                <a href="#" class="button" onclick="addOrder()">下单</a>
            </div>
        </div>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import iviewArea from 'iview-area';
    Vue.use(iviewArea);

    export default {
        data() {
            return{
                basePropertys: [],
                res1: ['440000','440100','440103'],
                productSKU: [],
                lastFirstPropertyValue: '',
                currentSKUId: '',
                price: '',
                SKU: '',
                lastObj: {},
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/product/queryPropertyByProductId?productId=' + sessionStorage.getItem('productId')

                function doSuccess(response) {
                    _self.basePropertys = response.data.data
                    document.getElementById('product_name').textContent = _self.basePropertys[0].product
                    _self.doProductSKU()
                }

                this.GetData(url, doSuccess)
            },

            // 获取SKU
            doProductSKU() {
                let _self = this
                let url = '/product/getSKUListByProductId?productId=' + sessionStorage.getItem('productId')

                function doSuccess(response) {
                    _self.productSKU = response.data.data
                    _self.resetProperty(_self.productSKU[0].linkPropertys, _self.productSKU[0].linkPropertyIds)
                    _self.setPrice(_self.productSKU[0].id);
                }

                this.GetData(url, doSuccess)
            },

            // 重置属性
            resetProperty(linkPropertyValueIds, linkPropertyIds) {
                let _self = this
                let propertyValueIds = linkPropertyValueIds.split(",")
                let propertyIds = linkPropertyIds.split(",")

                $('._propertys_class_').hide()

                for (let i = 0; i < propertyIds.length; i++) {
                    $('#'+propertyIds[i]).parent().show()

                    if ($('#'+propertyIds[i]).parent().attr("name") == 'firstProperty'){
                        _self.lastFirstPropertyValue = propertyValueIds[i]
                    }
                    _self.chooseThisProperty(propertyValueIds[i])
                }
                _self.lastObj = _self.getPropertyIdArray()		//设置缓存对象
            },

            // 点击属性
            chooseThisProperty(id) {
                $(document.getElementById(id)).parent().find("button").removeClass("active")
                $(document.getElementById(id)).addClass("active")
            },

            getPropertyIdArray() {
                let _self = this
                let obj ={}
                let areaId = _self.res1[2]
                let linkPropertyValueIds = []
                let linkPropertyIds = []
                $("._propertys_class_").each(function(i, obj){
                    if ($(obj).css("display") != "none"){
                        let div = $(obj).find("div")
                        linkPropertyIds.push(div[0].id)
                        let button = $(obj).find("button[class='active']")
                        linkPropertyValueIds.push(button[0].id)
                    }
                });
                obj.linkPropertyValueIds = linkPropertyValueIds
                obj.linkPropertyIds = linkPropertyIds
                obj.areaId = areaId
                return obj
            },

            setPrice(skuId, areaId) {
                let _self = this
                if (!skuId){
                    let linkPropertyArray = _self.lastObj.linkPropertyValueIds
                    let _sku_p_value,_sku_p,i,j,flag
                    if (_self.productSKU){
                        for(i=0,j=_self.productSKU.length; i<j; i++){
                            _sku_p_value = _self.productSKU[i].linkPropertys   //属性值
                            //长度一致
                            if (linkPropertyArray.join(",").length == _sku_p_value.length){
                                flag = _self.checkStrInArray(_sku_p_value, linkPropertyArray);
                                //内容都包含
                                if (flag){
                                    skuId = _self.productSKU[i].id;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!skuId){
                    _self.currentSKUId = null;
                    _self.price = 0;
                    $("#product_price").html("未知")
                } else {
                    _self.SKU = skuId
                    _self.currentSKUId = skuId

                    let url = '/product/getPriceByAreaAndSKU?skuId=' + skuId + '&areaId=' + _self.res1[2]

                    function doSuccess(response) {
                        if (response.data.data){
                            var baseprice = response.data.data[0].baseprice
                            var oaprice = response.data.data[0].oaprice
                            _self.price = oaprice
                            $("#product_price").html(oaprice)
                        }else{
                            $("#product_price").html("未知")
                        }
                    }

                    this.GetData(url, doSuccess)
                }
            },

            areaChange() {
                let _self = this
                let obj = _self.getPropertyIdArray()

                if (obj.areaId != _self.lastObj.areaId){
                    _self.lastObj = obj
                    _self.setPrice(_self.SKU, _self.res1[2])
                    //属性值改变
                } else if (obj.linkPropertyValueIds.join(',') != _self.lastObj.linkPropertyValueIds.join(',') ){
                    _self.lastObj = obj
                    let button = $("div[name='firstProperty']").find("button[class='active']")
                    if (button[0].id != _self.lastFirstPropertyValue){
                        _self.lastFirstPropertyValue = button[0].id
                        // 重置属性  
                        let _sku_p_value,_sku_p,i,j
                        if (_self.productSKU){
                            for(i=0,j=_self.productSKU.length; i<j; i++){
                                _sku_p_value = _self.productSKU[i].linkPropertys    //属性值
                                _sku_p = _self.productSKU[i].linkPropertyIds      //属性ID
                                if (_sku_p_value.indexOf(_self.lastFirstPropertyValue) >= 0){
                                    _self.resetProperty(_sku_p_value, _sku_p)    //重置属性
                                    break
                                }
                            }
                        }
                    }
                    _self.setPrice()
                } else{
                    console.log('没有触发')
                }
            },

            checkStrInArray(_sku_p_value, linkPropertyArray) {
                let m,n
                if (linkPropertyArray.length > 0){
                    for (m = 0,n = linkPropertyArray.length; m < n ; m++){
                        //不包含
                        if (_sku_p_value.indexOf(linkPropertyArray[m]) < 0){
                            return false
                        }
                    }
                    return true
                }
                return false
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>