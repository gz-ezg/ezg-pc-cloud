<template>
    <div>
        <Modal
            v-model="open"
            width="400"
            title="产品类型"
            @on-cancel="close"
        >
            <el-tree 
                :props="defaultProps"
                node-key="id"
                :data="productType" 
                show-checkbox 
                ref="tree" 
                :default-checked-keys="checkedId"></el-tree>
            <div slot="footer">
                <Button type="primary" @click="create_type">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Tree } from 'element-ui';

export default {
    components: {
        elTree: Tree
    },
    props: {
        id:{
            type: [String, Number],
            default: 0
        }
    },
    computed:{
        checkedId(){
            return [this.id]
        }
    },
    data(){
        return {
            open: true,
            defaultProps: {
                label: "typeName"
            },
            productType: []
        }
    },
    methods: {
        create_type(){
            let temp = this.$refs.tree.getCheckedNodes()
            // this.checkedId = []
            if(temp.length){
                this.$emit("close", {
                    typeName: temp[0].typeName,
                    id: temp[0].id
                })
            }else{
                this.$emit("close",{
                    typeName: "",
                    id: ""
                })
            }
        },
        close(){
            this.$emit("close")
        },
        get_data(){
            let _self = this
            let url = `api/product/type/tree`
            let config = {}

            function success(res){
                _self.productType = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
