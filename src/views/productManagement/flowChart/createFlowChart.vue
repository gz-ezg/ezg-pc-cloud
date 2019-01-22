<template>
    <div>
        <Modal
            title="新增流程图"
            :value="true"
            width="600"
            @on-cancel="handleReset('formValidate')"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="pId" prop="pId">
                    <Input v-model="formValidate.pId"></Input>
                </FormItem>
                <FormItem label="shortname" prop="shortname">
                    <Input v-model="formValidate.shortname"></Input>
                </FormItem>
                <FormItem label="processKey" prop="processKey">
                    <Input v-model="formValidate.processKey"></Input>
                </FormItem>
                <FormItem label="processType" prop="processType">
                    <Input v-model="formValidate.processType"></Input>
                </FormItem>
                <FormItem label="processArea" prop="processArea">
                    <Input v-model="formValidate.processArea"></Input>
                </FormItem>
                <FormItem label="memo" prop="memo">
                    <Input v-model="formValidate.memo"></Input>
                </FormItem>
                <FormItem label="seq" prop="seq">
                    <Input v-model="formValidate.seq"></Input>
                </FormItem>
                <FormItem label="rootOrgCode" prop="rootOrgCode">
                    <Input v-model="formValidate.rootOrgCode"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">新增</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import * as flowChartApi from './api.js'
export default {
    data(){
        return {
            loading: false,
            formValidate: {
                pId: '',
                shortname: '',
                processKey: '',
                processType: '1',
                processArea: 'ALL',
                memo: '',
                seq: '',
                rootOrgCode: ''
            },
            ruleValidate: {
                shortname: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ],
                processKey: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ],
                processType: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ],
                processArea: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ],
                memo: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '请补全信息！', trigger: 'blur' }
                ]

            }
        }
    },

    methods: {
        handleSubmit (name) {
            this.loading = true
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit()
                } else {
                    this.$Message.error('请补全信息!');
                    this.loading = false
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
            this.$emit('close')
        },
        async submit(){
            let _self = this
            try {
                let { status, data } = await flowChartApi.postProductCreateSkuFlowDiagram(this.formValidate)
                if(status){
                    this.handleReset ('formValidate')
                }
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        }
    },

    created(){

    }
}
</script>
