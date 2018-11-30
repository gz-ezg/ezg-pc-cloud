<template>
    <div>
        <Modal
            title="创建产品类型"
            width=600
            v-model="show"
            @on-cancel="close"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="类型名" prop="typename">
                    <Input v-model="formValidate.typename"></Input>
                </FormItem>
                <FormItem label="排序" prop="sortid">
                    <Input v-model="formValidate.sortid"></Input>
                </FormItem>
                <FormItem label="父节点名称" prop="pname">
                    <Input :value="pname" readonly></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create_product_type" :loading="loading">新增</Button>
                <Button type="ghost" @click="close" >关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        pid: {
            type: [Number, String],
            default: ""
        },
        pname: {
            type: [String],
            default: "一级类型"
        }
    },
    data(){
        return {
            show: true,
            formValidate: {
                typename: "",
                sortid: "",
                pid: ""
            },
            ruleValidate: {
                typename: [
                    { required: true, message: '必填项', trigger: 'blur' }
                ],
                sortid: [
                    { required: true, message: '必填项，任填一个数字', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    methods: {
        close(){
            this.$emit("close")
        },
        create_product_type(){
            let _self = this
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    _self.submit()
                }
            })
        },
        submit(){
            let _self = this
            this.loading = true
            let url = "api/product/type/create"

            let config = {
                typename: _self.formValidate.typename,
                sortid: _self.formValidate.sortid,
                pid: _self.pid
            }

            function success(res){
                _self.loading = false
                _self.close()
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        }
    }
    
}
</script>
