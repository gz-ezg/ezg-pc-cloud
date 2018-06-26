<template>
    <Modal
        v-model="data_rule_add"
        width="400"
    >
    <div slot="header"><h3>{{title}}</h3></div>
        <div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="规则名称：" prop="ruleName">
                    <Input v-model="formValidate.ruleName" placeholder="Enter your name" style="width:200px"></Input>
                </FormItem>
                <FormItem label="规则列：" prop="ruleColumn">
                    <Input v-model="formValidate.ruleColumn" placeholder="Enter your e-mail" style="width:200px"></Input>
                </FormItem>
                <FormItem label="规则条件：" prop="ruleConditions">
                    <Select transfer v-model="formValidate.ruleConditions" placeholder="Select your city" style="width:200px">
                        <Option value=">">></Option>
                        <Option value=">=">>=</Option>
                        <Option value="<"><</Option>
                        <Option value="<="><=</Option>
                        <Option value="=">=</Option>
                        <Option value="!=">!=</Option>
                        <Option value="IN">IN</Option>
                        <Option value="NOT IN">NOT IN</Option>
                        <Option value="IS NULL">IS NULL</Option>
                        <Option value="IS NOT NULL">IS NOT NULL</Option>
                        <Option value="LIKE">LIKE</Option>
                        <Option value="NOT LIKE">NOT LIKE</Option>
                    </Select>
                </FormItem>
                <FormItem label="规则值：" prop="ruleValue">
                    <Input v-model="formValidate.ruleValue" placeholder="Enter your name" style="width:200px"></Input>
                </FormItem>
                <FormItem label="菜单ID：" prop="interfaceId">
                    <Input v-model="formValidate.interfaceId" placeholder="Enter your name" style="width:200px"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 40px">重置</Button>
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
                title:'',
                data_rule_add:false,
                isAdd:true,
                formValidate: {
                    id:'',
                    ruleName: '',
                    ruleColumn: '',
                    ruleConditions: '',
                    ruleValue: '',
                    interfaceId: []
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                var _self = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.isAdd == true){
                            url = 'api/menu/createDataRule'
                            //  新增，就删除id
                        }else{
                            //  编辑
                            url = 'api/menu/updateDataRule'
                        }
                        this.$Message.success('Success!');
                    } else {
                    }
                })

                
            },
            handleReset (name) {
                //  重置
                this.$refs[name].resetFields();
            },
            init(){
                console.log('22222222222222222')
                var _self = this
                Bus.$on('add_data_rule_modal',(e)=>{
                    _self.data_rule_add = true
                    _self.title = "录入"
                    _self.isAdd = true
                })
                Bus.$on('edit_data_rule_modal',(e)=>{
                    _self.data_rule_add = true
                    _self.formValidate = e
                    _self.title = "编辑"
                    _self.isAdd = false
                })
            }
        },
        created(){
            this.init()
        }
}
</script>
