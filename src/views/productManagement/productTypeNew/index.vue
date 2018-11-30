<template>
    <div>
        <!-- <tree-table :data="data" :columns="columns" border @get-all-selection="get_all_selection" selection/> -->
        <Card>
            <Row :gutter="20" style="margin-bottom:10px">
                <Col><Button type="primary" @click="pid='';pname='';openCreateType = true">新增</Button></Col>
            </Row>
            <Row :gutter="20">
                <Spin  v-if="loading" size="large" style="margin-left:50%;margin-top:5%"></Spin>
                <tree-table 
                    v-else
                    :data="data" 
                    :columns="columns" 
                    border 
                    expandAll 
                    @edit="edit" 
                    @delete="delete_type"
                    @create="create_type"/>
            </Row>
        </Card>
        <create-type v-if="openCreateType" @close="close" :pname="pname" :pid="pid"></create-type>
        <update-type v-if="openUpdateType" @close="close" :data="currentData"></update-type>
    </div>
</template>

<script>
import treeTable from './TreeTable/index'
import createType from './create'
import updateType from './update'

export default {
    name: "productType_index",
    components: {
        treeTable,
        createType,
        updateType
    },
    data(){
        return{
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
            openCreateType: false,
            openUpdateType: false,
            pname: "",
            pid: "",
            currentData: "",
            loading: false
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/product/type/tree`
            _self.loading = true
            let config = {}

            function success(res){
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        edit(e){
            //  编辑
            this.currentData = e
            this.openUpdateType = true
        },
        delete_type(e){
            let _self = this
            let url = 'api/product/type/del'

            let config = {
                id: e.id
            }

            function success(res){
                _self.close()
            }

            function fail(err){
                _self.close()
            }

            this.$Post(url, config, success, fail)
        },
        create_type(e){
            this.pname = e.typeName
            this.pid = e.id
            this.openCreateType = true
        },
        close(){
            this.openCreateType = false
            this.openUpdateType = false
            setTimeout(() => {
                this.get_data()
            },300)
        }
    },
    mounted(){
        this.get_data()
    },
    computed:{
        
    }
}
</script>
