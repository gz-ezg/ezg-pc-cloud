<template>
    <div>
        <Modal
            title="编辑产品类型"
            width=600
            v-model="show"
            @on-cancel="close"
        >
            <Form ref="data" :model="data" :rules="ruleValidate" :label-width="80">
                <FormItem label="类型名" prop="typeName">
                    <Input v-model="data.typeName"></Input>
                </FormItem>
                <FormItem label="排序" prop="sortId">
                    <Input v-model="data.sortId"></Input>
                </FormItem>
                <FormItem label="父节点名称" prop="parent" v-if="data.parent">
                    <Input :value="data.parent.typeName" readonly></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create_product_type" :loading="loading">修改</Button>
                <Button type="ghost" @click="close" >关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: [String, Object],
            default: function(){
                return {
                    id: "",
                    pId: "",
                    typeName: "",
                    sortId: "",
                    parent: {
                        typeName: ""
                    }
                }
            }
        },
    },
    data(){
        return {
            show: true,
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
            this.$refs["data"].validate((valid) => {
                if (valid) {
                    _self.submit()
                }
            })
        },
        submit(){
            let _self = this
            this.loading = true
            let url = "api/product/type/update"

            let config = {
                id: _self.data.id,
                typename: _self.data.typeName,
                sortid: _self.data.sortId,
                pid: _self.data.pId
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
