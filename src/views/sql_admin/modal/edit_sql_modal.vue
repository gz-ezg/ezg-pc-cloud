<template>
    <Modal
        v-model="edit_show"
        title="修改SQL模板"
        width="80%"
        @on-ok="edit_sql"
        @on-cancel="cancel"
        :loading="edit_loading"
        ok-text = "修改"
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
            <FormItem label="包含角色权限" prop="mustRolePermission">
                <Select transfer v-model="SQL_item.mustRolePermission" placeholder="">
                    <Option value="Y">包含</Option>
                    <Option value="N">不包含</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import Bus from '../bus'

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
                skipPermissionCheck:""
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
            Bus.$on('edit_sql',(e)=>{
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
            })            
        },
        edit_sql(){
            var _that = this
            _that.edit_loading = true
            var url = 'api/system/updateSqlTemplate'
            var temp = JSON.stringify(this.SQL_item)
            let config ={
                headers:{
                    'content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.post(url,temp,config).then(function(res){
                if(res.data.msgCode =="40000"){
                    _that.edit_loading = false
                    _that.$Message.success('更新成功')
                    _that.SQL_item.sqlSelect = '',
                    _that.SQL_item.sqlCount = '',
                    _that.SQL_item.sqlMain = '',
                    _that.SQL_item.sqlCode = '',
                    _that.SQL_item.sqlName = ''
                    _that.SQL_item.sqlFunctionName = ''
                    _that.SQL_item.mustRolePermission = ""
                    _that.SQL_item.skipPermissionCheck = ""
                    Bus.$emit('refresh',true)

                }else{
                    _that.edit_loading = false
                    _that.$Message.error('更新失败')
                    _that.edit_show = true
                }
            }).catch(function(err){
                _that.$Message.error('更新失败')
                _that.edit_loading = false
            })
        },
        cancel(){
            this.edit_show = false
        }
    }
}
</script>
