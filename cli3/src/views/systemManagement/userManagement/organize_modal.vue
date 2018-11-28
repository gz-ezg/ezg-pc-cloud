<template>
    <div>
        <Modal
            title="选择所属部门"
            v-model="open_organize_modal"
            width="400"
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
export default {
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
        getAllDepartTree(){
            let _self = this
            let url = `api/system/depart/tree/list`

            let config = {}
            function success(res){
                _self.departTree = res.data.data
            }

            this.$Get(url, config, success)
        },
        changeOrg(){
            let temp = this.$refs.tree.getCheckedNodes()
            //  默认取第一个
            this.$bus.emit("CREATE_USER_ORG_DATA",{id:temp[0].ID,departname:temp[0].departname})
            this.open_organize_modal = false
        }       
    },
    created(){
        let _self = this
        this.getAllDepartTree()
        this.$bus.on('OPEN_ORGANIZE_TABLE',(e)=>{
            console.log(e)
            _self.check_depart_id = []
            if(e){
                let temp = e.split(",")
                for(let i = 0; i<temp.length; i++){
                    _self.check_depart_id.push(temp[i])
                }
            }
            _self.open_organize_modal = true
            this.getAllDepartTree()
        })
    },
}
</script>
