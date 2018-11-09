<template>
    <div>
        <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="ID"
            @check="check"
            :default-checked-keys=[11528]
            :props="defaultProps">
        </el-tree>
        <Button @click="get_all_check_node">获取</Button>
    </div>
</template>

<script>
import { Tree } from 'element-ui';
export default {
    components: {
        elTree: Tree
    },
    data() {
      return {
        data: [],
        defaultProps: {
            children: 'children',
            label: 'departname'
        }
      };
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/system/depart/tree/list`

            let config = {}
            function success(res){
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        },
        get_all_check_node(){
            console.log(this.$refs.tree.getHalfCheckedNodes())
        },
        check(x, y){
            console.log(x)
            console.log(y)
        }        
    },
    created(){
        let _self = this
        this.get_data()
    }
}
</script>
