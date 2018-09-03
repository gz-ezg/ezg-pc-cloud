<template>
    <Modal
        v-model="edit_show"
        title="修改SQL模板"
        width="80%"
        :mask-closable="false"
    >
        <Form 
            :model="SQL_item"
            :label-width="120"
            :rules="SQL_rule"
        >
            <FormItem label="SQL查询" prop="sqlSelect">
                <Input v-model="SQL_item.sqlSelect" placeholder="" type="textarea" :rows="2"></Input>
            </FormItem>
            <FormItem label="SQL组" prop="sqlGroup" >
                <Input v-model="SQL_item.sqlGroup" placeholder="" type="textarea" ></Input>
            </FormItem>
            <FormItem label="SQL主体" prop="sqlMain">
                <Input v-model="SQL_item.sqlMain" placeholder="" type="textarea" :rows="10"></Input>
            </FormItem>
            <FormItem label="跳过权限设置" prop="skipPermissionCheck">
                <Input v-model="SQL_item.skipPermissionCheck" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="SQL编码" prop="sqlCode">
                <Input v-model="SQL_item.sqlCode" placeholder=""></Input>
            </FormItem>
            <FormItem label="SQL名称" prop="sql_name">
                <Input v-model="SQL_item.sqlName" placeholder=""></Input>
            </FormItem>
            <FormItem label="对应函数名称" prop="sqlFunctionName">
                <Input v-model="SQL_item.sqlFunctionName" placeholder=""></Input>
            </FormItem>
            <FormItem label="附加or条件" prop="paramsOr">
                <Input v-model="SQL_item.paramsOr" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="包含角色权限" prop="mustRolePermission">
                <Select transfer v-model="SQL_item.mustRolePermission" placeholder="">
                    <Option value="Y">包含</Option>
                    <Option value="N">不包含</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="edit_sql" :loading="edit_loading">添加</Button>
        </div>
    </Modal>
</template>

<script>

export default {
    data(){
        return{
            edit_loading:false,
            edit_show:false,
            SQL_item:{
                id:'',
                sqlSelect:'',
                sqlGroup:'',
                sqlMain:'',
                sqlCode:'',
                sqlName:'',
                sqlFunctionName:'',
                mustRolePermission:"",
                skipPermissionCheck:"",
                paramsOr:""
            },
            SQL_rule:{
                sqlSelect:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sqlGroup:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sqlMain:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sqlFunctionName:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                mustRolePermission:[
                    { required: true, message: '必要', trigger: 'blur'},
                ]
            }

        }
    },
    created:function(){
        this.init()
    },
    methods:{
        init(){
            var _that = this
            _that.$bus.on('edit_sql',(e)=>{
                _that.edit_show = true
                _that.SQL_item.id = e.id
                _that.SQL_item.sqlSelect = e.sql_select
                _that.SQL_item.sqlGroup = e.sql_group
                _that.SQL_item.sqlMain = e.sql_main
                _that.SQL_item.sqlCode = e.sql_code
                _that.SQL_item.sqlName = e.sql_name
                _that.SQL_item.sqlFunctionName = e.sql_function_name
                _that.SQL_item.mustRolePermission = e.must_role_permission
                _that.SQL_item.skipPermissionCheck = e.skip_permission_check
                _that.SQL_item.paramsOr = e.params_or
            })            
        },
        edit_sql(){
            var _that = this
            _that.edit_loading = true
            var url = 'api/system/updateSqlTemplate'
            // var temp = JSON.stringify(this.SQL_item)
            let config = {
                id: _that.SQL_item.id,
                sqlSelect: _that.SQL_item.sqlSelect,
                sqlGroup: _that.SQL_item.sqlGroup,
                sqlMain: _that.SQL_item.sqlMain,
                sqlCode: _that.SQL_item.sqlCode,
                sqlName: _that.SQL_item.sqlName,
                sqlFunctionName: _that.SQL_item.sqlFunctionName,
                mustRolePermission: _that.SQL_item.mustRolePermission,
                skipPermissionCheck: _that.SQL_item.skipPermissionCheck,
                paramsOr: _that.SQL_item.paramsOr
            }


            function success(res){
                _that.edit_loading = false
                _that.edit_show = false
                _that.SQL_item.sqlSelect = ''
                _that.SQL_item.sqlMain = ''
                _that.SQL_item.sqlCode = ''
                _that.SQL_item.sqlName = ''
                _that.SQL_item.sqlFunctionName = ''
                _that.SQL_item.mustRolePermission = ""
                _that.SQL_item.skipPermissionCheck = ""
                _that.SQL_item.paramsOr = ""
                _that.SQL_item.sqlGroup = ''
            }

            function fail(err){
                _that.edit_loading = false                
            }
            this.$Post(url, config, success, fail)
        },
        cancel(){
            this.edit_show = false
        }
    }
}
</script>
