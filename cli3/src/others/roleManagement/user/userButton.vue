<template>
    <div>
        <ButtonGroup style="float:left;margin-bottom:10px">
        <Button type="primary" icon="plus" @click="creatRole">角色录入</Button>
        <Button type="primary" icon="edit" @click="editRole">角色编辑</Button>
        <Button type="primary" icon="ios-cloud-upload-outline" @click="import_role">导入</Button>
        <Button type="primary" icon="ios-cloud-upload-outline">导出</Button>
        <Button type="primary" icon="ios-cloud-upload-outline">模板下载</Button>  
        </ButtonGroup>
        <RoleSearch></RoleSearch>
        <!-- 角色录入 -->
        <Modal
            v-model="edit_role"
            title="角色录入"
            width="400"
            @on-cancel="handleReset('AddRole')"
        >
            <Form ref="AddRole" :model="AddRole" :rules="ruleAddRole" :label-width="80">
                <FormItem label="角色名称：" prop="roleName">
                    <Input v-model="AddRole.roleName" placeholder="角色名称范围在2~8位字符" style="width:200px"></Input>
                </FormItem>
                <FormItem label="角色编码：" prop="paydir">
                    <Input v-model="AddRole.roleId" placeholder="角色编码范围在2~15位字符" style="width:200px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit_add('AddRole')">新增</Button>
                    <Button type="ghost" @click="handleReset('AddRole')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <!-- 角色编辑 -->
        <Modal
            title="角色编辑"
            width="400"
            @on-cancel="handleReset('EditRole')"
        >
            <Form ref="AddRole" :model="AddRole" :rules="ruleEditRole" :label-width="80">
                <FormItem label="角色名称：" prop="roleName">
                    <Input v-model="AddRole.roleName" placeholder="角色名称范围在2~8位字符" style="width:200px"></Input>
                </FormItem>
                <FormItem label="角色编码：" prop="paydir">
                    <Input v-model="AddRole.roleId" placeholder="角色编码范围在2~15位字符" style="width:200px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit_edit('AddRole')">修改</Button>
                    <Button type="ghost" @click="handleReset('AddRole')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <!-- 导入 -->
    </div>
</template>

<script>
import RoleSearch from './RoleSearch'

export default {
    //  获取被选中的行
    props:['row'],
    data(){
        return{
            add_role:false,
            edit_role:false,
            AddRole:{
                roleName:'',
                roleId:''
            },
            EditRole:{
                roleName:'',
                roleId:''
            }
        }
    },
    components:{
        RoleSearch
    },
    created(){
        console.log(this.row)
    },
    methods:{
        //  录入界面弹出
        creatRole(){
            this.add_role = true
        },
        //  编辑界面弹出
        editRole(){
            if(this.row == null){
                this.$Message.warn('请选择需要修改的一栏');
                
            }else{
                this.edit_role = true
            }
        },
        //  导入界面弹出
        import_role(){},
        //  角色录入校验
        handleSubmit_add(name) {
            var _that = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var url = ''
                    const params = {
                        roleName:'',
                        roleId:''
                    }
                    this.$http.post(url, params).then(function(res){
                        if(res.data.msgCode==40000){
                            _that.$Message.success('添加成功');
                            _that.add_role = false
                            Bus.$emit('update',true)
                        }else{
                            _that.$Message.error('添加失败，请重新添加')
                        }
                    })     
                } else {
                }
            })
        },
        //  角色编辑校验
        handleSubmit_edit(name) {
            var _that = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var url = ''
                    const params = {
                        roleName:'',
                        roleId:''
                    }
                    this.$http.post(url, params).then(function(res){
                        if(res.data.msgCode==40000){
                            _that.$Message.success('修改成功');
                            _that.edit_role = false
                            Bus.$emit('update',true)
                        }else{
                            _that.$Message.error('修改失败，请重新提交')
                        }
                    })     
                } else {
                }
            })
        },
        //  重置表单及清除
        handleReset(name){
            this.refs[name].resetFields();
        }
    }
}
</script>
