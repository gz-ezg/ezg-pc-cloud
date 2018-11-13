<template>
    <div>
        <!-- <tree-table :data="data" :columns="columns" border @get-all-selection="get_all_selection" selection/> -->
        <Card>
            <Row :gutter="20" style="margin-bottom:10px">
                <Col><Button type="primary">新增</Button></Col>
            </Row>
            <Row :gutter="20">
                <tree-table :data="data" :columns="columns" border expandAll @edit="edit" @delete="delete_type"/>
            </Row>
        </Card>
    </div>
</template>

<script>
import treeTable from './TreeTable/index'
export default {
    name: "productType_index",
    components: {
        treeTable
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
            currentRow: {}
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/product/type/tree`

            let config = {}

            function success(res){
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        },
        select_row(e){
            this.currentRow = e
        },
        edit(e){
            // console.log(e)
        },
        delete_type(e){
            // console.log(e)
        }
    },
    mounted(){
        this.get_data()
    },
    computed:{
        
    }
}
</script>
