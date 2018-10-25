<template>
    <Modal
        v-model="pagedelwith"
        width="600"
    >
    <div slot="header"><h3>{{title}}</h3></div>
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="按钮名称：" prop="operationname">
                    <Input v-model="formValidate.operationname" placeholder="Enter your name" style="width:200px"></Input>
                </FormItem>
                <FormItem label="按钮编码：" prop="operationcode">
                    <Input v-model="formValidate.operationcode" placeholder="Enter your e-mail" style="width:200px"></Input>
                </FormItem>
                <FormItem label="菜单ID：" prop="interfaceId">
                    <Input v-model="formValidate.interfaceId" placeholder="Enter your name" style="width:200px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 20px">重置</Button>
                </FormItem>
            </Form>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>


<script>
import Bus from '../../../components/bus'

export default {
        data () {
            return {
                isAdd:true,
                title:'',
                pagedelwith:false,
                formValidate: {
                    operationcode:'',
                    operationname:'',
                    status:'0',
                    interfaceId:'',
                    operationtype:'0'
                },
                ruleValidate: {
                    operationcode: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    operationname: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    interfaceId: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    operationtype: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                var _self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.isAdd = true){
                            //  创建
                            var url = 'api/menu/createButton'
                        }else{
                            //  更新
                            var url = 'api/menu/updateButton'
                        }
                        this.$Message.success('Success!');
                    } else {
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            init(){
                var _self = this
                Bus.$on('edit_page_rule_modal',(e)=>{
                    _self.pagedelwith = true
                    console.log(e)
                    _self.title = "操作编辑"
                    _self.isAdd = false
                })
                Bus.$on('add_page_rule_modal',(e)=>{
                    _self.pagedelwith = true                    
                    console.log(e)
                    _self.title="操作录入"
                    _self.isAdd = true
                })
            }
        },
        created(){
            this.init()
        }
}
</script>
