<template>
    <div>{{this.$route.params.id}}
        <!-- <tree-table 
            :data="data" 
            :columns="columns" 
            border
            @edit="edit" 
            @delete="delete_type"
            @create="create_type"
        /> -->
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
                if (e == 100) {
                    let temp = [];
                    for (let i = 0; i < _self.queryProperty.length; i++) {
                        if (_self.queryProperty[i].propertyId == 95) {
                            temp[0] = _self.queryProperty[i];
                        }
                        if (_self.queryProperty[i].propertyId == 23) {
                            temp[1] = _self.queryProperty[i];
                        }
                        if (_self.queryProperty[i].propertyId == 16) {
                            temp[2] = _self.queryProperty[i];
                        }
                    }
                    _self.queryProperty = temp;
                }
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
