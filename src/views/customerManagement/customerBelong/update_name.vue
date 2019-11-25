<template>
    <div>
        <Modal
            title="修改资料类型"
            width="500"
            v-model="updateResoureType"
        >
            <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem label="资料类型：" prop="file_type_name">
                    <Input v-model="formValidate.file_type_name" placeholder="请输入资料类型"></Input>
                </FormItem>
                <FormItem label="数量：" prop="plural">
                    <RadioGroup v-model="formValidate.plural">
                        <Radio label="Y">复数</Radio>
                        <Radio label="N">唯一</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="部门：" prop="use_departs">
                    <Select v-model="formValidate.use_departs" placeholder="选择使用部门" multiple>
                        <Option  v-for="item in departAlias" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="客户显示：" prop="show_customer">
                    <RadioGroup v-model="formValidate.show_customer">
                        <Radio label="Y">可见</Radio>
                        <Radio label="N">不可见</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="update_type" :loading="loading">修改</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
        departAlias:{
            type: Array
        }
    },
    data(){
        return{
            updateResoureType: false,
            formValidate: {
                id: "",
                file_type_name:"",
                plural: "Y",
                use_departs: [],
                show_customer: "Y"
            },
            loading: false
            
        }
    },
    methods:{
        update_type(){
            let _self = this
            let url = "api/customer/file/type/update"
            _self.loading = true

            let config = {
                id: _self.formValidate.id,
                fileTypeName: _self.formValidate.file_type_name,
                plural: _self.formValidate.plural,
                useDeparts: _self.formValidate.use_departs.join(","),
                showCustomer: _self.formValidate.show_customer
            }

            function success(res){
                _self.updateResoureType = false
                _self.loading = false
                _self.$emit("update",true)
                _self.reset_type()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        reset_type(){
            this.formValidate.id = ""
            this.formValidate.fileTypeName = ""
            this.formValidate.plural = "Y"
            this.formValidate.useDeparts = []
            this.formValidate.showCustomer = "Y"
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_UPDATE_RESOURE_TYPE")
        this.$bus.on("OPEN_UPDATE_RESOURE_TYPE", (e)=>{
            _self.updateResoureType = true
            _self.formValidate = e
        })
    },
}
</script>

