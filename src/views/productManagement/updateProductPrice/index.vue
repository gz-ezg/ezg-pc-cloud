<template>
    <div>
        <Card>
            <span slot="title"><h3>{{title}}</h3></span>
            <div v-for="(item, index) in queryProperty" :key="index" style="margin-top:10px">
                <Row>
                    <Col span="4">
                        <span style="padding-right:10px;padding-left:10px;width:100px;display:inline-block;text-align:right">{{item.name}} :</span>
                    </Col>
                    <Col span="20">
                        <RadioGroup v-model="typeArray[index]" type="button">
                            <Radio v-for="(item2, index2) in item.children" :label="item2.ppvId" :key="index2">{{item2.propertyValue}}</Radio>
                        </RadioGroup>
                    </Col>
                </Row> 
            </div>
            <Row>
                <Col span="24">
                    <tree-table 
                        :data="data" 
                        :columns="columns" 
                        border 
                    />
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
            queryProperty: [],
            typeArray: [],
            title: "",
            columns: [
                {
                    text: '类型名称',
                    value: 'typeName',
                    width: 350
                },
                {
                    text: '类型排序',
                    value: 'typeLevel',
                    width: 120
                },
            ],
            data: [],
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
