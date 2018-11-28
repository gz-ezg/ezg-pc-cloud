<template>
    <Modal
        v-model="add_show"
        title="添加SQL模板"
        width="600"
        :mask-closable="false"
        
    >
        <Form 
            :model="SQL_item"
            :label-width="120"
            :rules="SQL_rule"
        >
            <FormItem label="SQL查询" prop="sqlSelect">
                <Input v-model="SQL_item.sqlSelect" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="SQL组" prop="sqlGroup" >
                <Input v-model="SQL_item.sqlGroup" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="SQL主体" prop="sqlMain">
                <Input v-model="SQL_item.sqlMain" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="跳过权限设置" prop="skipPermissionCheck">
                <Input v-model="SQL_item.skipPermissionCheck" placeholder="" type="textarea"></Input>
            </FormItem>
            <FormItem label="SQL编码" prop="sqlCode">
                <Input v-model="SQL_item.sqlCode" placeholder=""></Input>
            </FormItem>
            <FormItem label="SQL名称" prop="sqlName">
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
            <Button type="primary" @click="add_sql" :loading="add_loading">添加</Button>
        </div>
    </Modal>
</template>

<script>

export default {
    data(){
        return{
            add_loading:false,
            add_show:false,
            SQL_item:{
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
            this.$bus.on('add_sql',(e)=>{
                _that.add_show = true
            })
        },
        add_sql(){
            var _that = this
            _that.add_loading = true
            var url = 'api/system/createSqlTemplate'

            let config = {
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
                _that.add_loading = false
                _that.add_show = false
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
                _that.add_loading = false                
            }
            this.$Post(url, config, success, fail)
        },
        cancel(){
            _that.add_show = false
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
    }
}
</script>
