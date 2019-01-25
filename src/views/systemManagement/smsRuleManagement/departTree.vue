<template>
    <div>
        <Modal
            title="选择部门"
            :value="true"
            width="500"
            @on-cancel="close"
        >
            <el-tree
                ref="tree"
                :data="departTree"
                show-checkbox
                node-key="ID"
                :default-checked-keys="check_depart_id"
                :props="defaultProps">
            </el-tree>
            <div slot="footer">
                <Button type="primary" @click="changeOrg">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { Tree } from 'element-ui';
import { getDepartTree } from '../api/depart.js';
export default {
    props: {
        index: {
            type: [String, Number]
        }
    },
    components: {
        elTree: Tree
    },
    data() {
      return {
        open_organize_modal:false,
        check_depart_id:[],
        check_depart_name:"",
        departTree:[],
        defaultProps: {
            children: 'children',
            label: 'departname'
        }
      };
    },
    methods: {
        async getAllDepartTree(){
            // let _self = this
            // let url = `api/system/depart/tree/list`
            let data = await getDepartTree()
            this.departTree = data
        },
        changeOrg(){
            let temp = this.$refs.tree.getCheckedNodes()
            // console.log(temp)
            if(!temp.length){
                this.$Message.error("未选择部门！")
                return false
            }
            this.$emit("change-depart", {
                index: this.index,
                depart: {
                    departId: temp[0].ID,
                    departname: temp[0].departname
                }
            })
            //  默认取第一个
            // this.$bus.emit("CREATE_USER_ORG_DATA",{id:temp[0].ID,departname:temp[0].departname})
            // this.open_organize_modal = false
        },
        close(){
            this.$emit("close")
        }     
    },
    created(){
        this.getAllDepartTree()
    },
}
</script>
