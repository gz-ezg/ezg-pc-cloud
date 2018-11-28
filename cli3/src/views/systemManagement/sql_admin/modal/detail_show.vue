<template>
    <Modal
        v-model="show_show"
        title="SQL详情"
        width = "80%"
        :mask-closable="false"
    >
        <div style="background:#eee;padding: 20px">
            
            <Card :bordered="false" v-for="(value, key, index) in SQL_item" :key=index>
                <p slot="title">{{key}}</p>
                <p>{{value}}</p>
            </Card>
        </div>
        <div slot="footer">
            <Button type="ghost" @click="cancel">返回</Button>
        </div>
    </Modal>
</template>

<script>

export default {
    data(){
        return{
            show_show:false,
            SQL_item:{
                id:'',
                sqlSelect:'',
                sqlCount:'',
                sqlMain:'',
                sqlCode:'',
                sqlName:'',
                sqlFunctionName:'',
                mustRolePermission:""
            },
        }
    },
    created:function(){
        this.init()
    },
    methods:{
        init(){
            var _that = this
            _that.$bus.on('isshow',(e)=>{
                _that.SQL_item.id = e.id
                _that.SQL_item.sqlSelect = e.sql_select
                _that.SQL_item.sqlCount = e.sql_count
                _that.SQL_item.sqlMain = e.sql_main
                _that.SQL_item.sqlCode = e.sql_code
                _that.SQL_item.sqlName = e.sql_name
                _that.SQL_item.sqlFunctionName = e.sql_function_name
                _that.SQL_item.mustRolePermission = e.must_role_permission
                _that.SQL_item.skipPermissionCheck = e.skip_permission_check
                _that.SQL_item.paramsOr = e.params_or
                if(e.must_role_permission == 'Y'){
                    _that.SQL_item.mustRolePermission = "包含"
                }else{
                    _that.SQL_item.mustRolePermission = "不包含"

                }
                _that.show_show = true
            })
        },
        cancel(){
            this.show_show = false
        }
  }
}
</script>
