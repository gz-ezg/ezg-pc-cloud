<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" @click="create_depart">新增</Button>
                </ButtonGroup>
            </Row>
            <Row :gutter="20" style="margin-top:10px">
                <Spin  v-if="loading" size="large" style="margin-left:50%;margin-top:5%"></Spin>
                <tree-table 
                    v-else
                    :data="data" 
                    :columns="columns" 
                    border
                    @edit="edit_depart" 
                    @delete="delete_depart"
                    @create="create_depart"
                    @show_person="show_person"
                    @setting="setting"/>
            </Row>
        </Card>
    </div>
</template>

<script>
import treeTable from './TreeTable/index'
export default {
    name: "departManagement_index",
    components: {
        treeTable
    },
    data(){
        return {
            data: [],
            columns: [
                {
                    text: '部门名称',
                    value: 'departname',
                    width: 200
                },
                {
                    text: '部门别名',
                    value: 'alias_code',
                    width: 150
                },
                {
                    text: "组织机构描述",
                    value: "description",
                    width: 150
                },
                {
                    text: "机构代码",
                    value: "org_code",
                    width: 150
                }
            ],
            loading: false
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/system/depart/tree/list`
            _self.loading = true
            let config = {}

            function success(res){
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        edit_depart(e){

        },
        create_depart(e){

        },
        delete_depart(e){

        },
        show_person(e){

        },
        setting(e){

        }
    },
    created(){
        this.get_data()
    }
}
</script>
