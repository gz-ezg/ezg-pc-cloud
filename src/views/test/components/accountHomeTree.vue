<template>
    <div>
        <Modal
            title="会计到家服务项"
            v-model="openServiceItem"
            width="400"
            @on-cancel="close"
        >
            <el-tree
                ref="itemsTree"
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-checked-keys="selectItems"
                :props="defaultProps"

            ></el-tree>
            <div slot="footer">
                <Button type="primary" @click="save" :loading="loading" v-if="readonly">保存</Button>
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
        id: {
            type: [String, Number]
        },
        readonly: {
            type: [String, Boolean],
            default: true
        }
    },
    data(){
        return {
            openServiceItem: true,
            selectItems: [],
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'serviceitemname'
            },
            loading: false
        }
    },
    methods: {
        get_service_item(){
            let _self = this
            let url = `api/system/serviceContract/template/queryTreegridByCode`
            let config = {
                params: {
                    templateCode: "kjdafwxy",
                    objectId: this.id
                }
            }

            function success(res){
                if(res.data.data.selectItems){
                    _self.selectItems = res.data.data.selectItems.split(",")
                }else{
                    _self.selectItems = []
                }
                
                _self.treeData = res.data.data.treeData
            }

            this.$Get(url, config, success)
        },
        close(){
            this.$emit("close")
        },
        save(){
            let temp = this.$refs.itemsTree.getCheckedNodes()
            let ids = []
            for(let i = 0; i<temp.length; i++){
                ids.push(temp[i].id)
            }
            let _self = this
            let url = `api/system/serviceContract/template/item/target/save`
            _self.loading = true
            let config = {
                templateCode: "kjdafwxy",
                itemIds: ids.join(","),
                objectId: _self.id
            }

            function success(res){
                _self.loading = false
                _self.close()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        this.get_service_item()
    }
}
</script>
