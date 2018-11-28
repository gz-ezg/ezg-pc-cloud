<template>
    <div>
        <Modal
        v-model="openCreateMenu"
        width="600"
        >
            <div slot="header"><h3>创建菜单</h3></div>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <FormItem label="菜单名称：" prop="interfaceName">
                        <Input v-model="formValidate.interfaceName" placeholder="菜单名称范围2~15位字符,且不为空" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="接口层级" prop="interfaceLevel">
                        <Select transfer v-model="formValidate.interfaceLevel" placeholder="下级菜单" style="width:240px">
                            <Option value="0" >一级菜单</Option>
                            <Option value="1" >下级菜单</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="菜单编码：" prop="interfaceCode">
                        <Input v-model="formValidate.interfaceCode" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="父菜单ID：" prop="parentInterfaceId">
                        <Input v-model="formValidate.parentInterfaceId" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submit" :loading="loading">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 20px">取消</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "menuManagement_create",
    data(){
        return {
            createMenu: false,
            formValidate: {
                interfaceName: "",
                interfaceLevel: "",
                interfaceCode: "",
                parentInterfaceId: ""
            },
            openCreateMenu: false,
            ruleValidate: {
                interfaceName: [
                    { required: true, message: '请输入菜单名称', trigger: 'change' }
                ],
                interfaceLevel: [
                    { required: true, message: '请输入菜单层级', trigger: 'change' }
                ],
                interfaceCode: [
                    { required: true, message: '请输入菜单编码', trigger: 'change' },
                ]
            },
            loading: false
        }
    },
    methods: {
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        submit(){
            let _self = this
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    _self.create_menu()
                } else {
                    _self.$Message.error("请补全信息！")
                }
            })
        },
        create_menu(){
            let _self = this
            let url = `api/menu/createMenu`
            _self.loading = true
            let config = {
                interfaceName: _self.formValidate.interfaceName,
                parentInterfaceId: _self.formValidate.parentInterfaceId,
                interfaceLevel: _self.formValidate.interfaceLevel,
                interfaceCode: _self.formValidate.interfaceCode,
            }

            function success(res){
                _self.loading = false
                _self.openCreateMenu = false
                _self.$bus.emit("UPDATE_MENU", true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        _self.$bus.off("OPEN_CREATE_MENU", true)
        _self.$bus.on("OPEN_CREATE_MENU", (e) => {
            console.log(e)
            _self.formValidate.parentInterfaceId = e.parentInterfaceId
            _self.formValidate.interfaceLevel = e.interfaceLevel.toString()
            _self.openCreateMenu = true
        })
    },
}
</script>
