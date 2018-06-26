<template>
    <Modal
        v-model="add_show"
        title="添加SQL模板"
        width="600"
        @on-ok="add_sql"
        @on-cancel="cancel"
        :loading = "add_loading"
        ok-text = "添加"
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
            <FormItem label="跳过权限设置" prop="sqlMain">
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
            <FormItem label="包含角色权限" prop="mustRolePermission">
                <Select transfer v-model="SQL_item.must_rolePermission" placeholder="">
                    <Option value="Y">包含</Option>
                    <Option value="N">不包含</Option>
                </Select>
            </FormItem>
        </Form>
        <!-- <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="add_sql" :loading="add_loading">添加</Button>
        </div> -->
    </Modal>
</template>

<script>
import Bus from '../bus'

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
            Bus.$on('add_sql',(e)=>{
                _that.add_show = true
            })
        },
        add_sql(){
            var _that = this
            _that.add_loading = true
            var url = 'api/system/createSqlTemplate'
            var temp = JSON.stringify(this.SQL_item)
            let config ={
                headers:{
                    'content-type': 'application/json;charset=UTF-8'
                }
            }
            this.$http.post(url,temp,config).then(function(res){
                if(res.data.msgCode =="40000"){
                    _that.add_loading = false
                    _that.$Message.success('新增成功')
                    _that.SQL_item.sqlSelect = '',
                    _that.SQL_item.sqlGroup = '',
                    _that.SQL_item.sqlMain = '',
                    _that.SQL_item.sqlCode = '',
                    _that.SQL_item.sqlName = ''
                    _that.SQL_item.sqlFunctionName = ''
                    _that.SQL_item.mustRolePermission = ""
                    _that.SQL_item.skipPermissionCheck = ""
                }else{
                    _that.add_loading = false
                    _that.$Message.error('新增失败')
                    _that.add_show = true
                }
            }).catch(function(err){
                _that.$Message.error('新增失败')
                _that.add_loading = false
            })                
        },
        cancel(){
            this.add_show = false
        }
    }
}
</script>
