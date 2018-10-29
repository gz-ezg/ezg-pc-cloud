<template>
    <div>
        <Modal
            title="公司名称"
            width="400"
            v-model="openCompanyForm"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="公司名称：" prop="companyname">
                    <Input v-model="formValidate.companyname" placeholder="" size="small"></Input>
                </FormItem>
                <FormItem label="客户名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder="" size="small"></Input>
                </FormItem>
                <FormItem label="客户电话：" prop="tel">
                    <Input v-model="formValidate.tel" placeholder="" size="small"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit_project">生成</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "tool_index",
    data(){
        return{
            openCompanyForm: true,
            formValidate: {
                companyname: "",
                name: "",
                tel: ""
            },
            ruleValidate: {
                companyname: [
                    { required: true, message: '请输入公司名称！', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入客户名称！', trigger: 'change' }
                ],
                tel: [
                    { required: true, message: '请输入电话！', trigger: 'change' }
                ],
            }
        }
    },
    submit_project(){
        
    }
}
</script>
