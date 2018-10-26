<template>
    <div>
        <Modal
        v-model="openCreateButton"
        width="600"
        >
            <div slot="header"><h3>创建按钮</h3></div>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <FormItem label="按钮名称：" prop="operationname">
                        <Input v-model="formValidate.operationname" placeholder="菜单名称范围2~15位字符,且不为空" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="按钮编码" prop="operationcode">
                        <Input v-model="formValidate.operationcode" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="菜单编码：" prop="interfaceId">
                        <Input v-model="formValidate.interfaceId" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <!-- <FormItem label="父菜单ID：" prop="parentInterfaceId">
                        <Input v-model="formValidate.parentInterfaceId" placeholder="" style="width:240px"></Input>
                    </FormItem> -->
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
                operationname: "",
                operationcode: "",
                interfaceId: "",
            },
            openCreateButton: false,
            ruleValidate: {
                operationname: [
                    { required: true, message: '请输入菜单名称', trigger: 'change' }
                ],
                operationcode: [
                    { required: true, message: '请输入菜单层级', trigger: 'change' }
                ],
                interfaceId: [
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
                    _self.create_button()
                } else {
                    _self.$Message.error("请补全信息！")
                }
            })
        },
        create_button(){
            let _self = this
            let url = `api/menu/createButton`
            _self.loading = true
            let config = {
                operationname: _self.formValidate.operationname,
                operationcode: _self.formValidate.operationcode,
                interfaceId: _self.formValidate.interfaceId,
            }

            function success(res){
                _self.loading = false
                _self.openCreateButton = false
                _self.$bus.emit("UPDATE_BUTTON", true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        _self.$bus.off("OPEN_CREATE_BUTTON", true)
        _self.$bus.on("OPEN_CREATE_BUTTON", (e) => {
            console.log(e)
            _self.formValidate.interfaceId = e
            // _self.formValidate.interfaceLevel = e.interfaceLevel.toString()
            _self.openCreateButton = true
        })
    },
}
</script>
