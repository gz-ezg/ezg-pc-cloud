<template>
    <div>
        <Modal
            title="新增资料类型"
            width="500"
            v-model="openResoureType"
        >
            <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem label="资料类型：" prop="fileTypeName">
                    <Input v-model="formValidate.fileTypeName" placeholder="请输入资料类型"></Input>
                </FormItem>
                <FormItem label="数量：" prop="plural">
                    <RadioGroup v-model="formValidate.plural">
                        <Radio label="Y">复数</Radio>
                        <Radio label="N">唯一</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="部门：" prop="useDeparts">
                    <Select v-model="formValidate.useDeparts" placeholder="选择使用部门" multiple>
                        <Option  v-for="item in departAlias" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="客户显示：" prop="showCustomer">
                    <RadioGroup v-model="formValidate.showCustomer">
                        <Radio label="Y">可见</Radio>
                        <Radio label="N">不可见</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="create_type" :loading="loading">新增</Button>
                    <Button type="ghost" @click="reset_type" style="margin-left: 8px">重置</Button>
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
            type:Array
        }
    },
    data(){
        return{
            openResoureType: false,
            formValidate: {
                fileTypeName:"",
                plural: "Y",
                useDeparts: [],
                showCustomer: "Y"
            },
            loading: false
        }
    },
    methods:{
        create_type(){
            let _self = this
            let url = "api/customer/file/type/create"
            _self.loading = true

            let config = {
                fileTypeName: _self.formValidate.fileTypeName,
                plural: _self.formValidate.plural,
                useDeparts: _self.formValidate.useDeparts.join(","),
                showCustomer: _self.formValidate.showCustomer
            }

            function success(res){
                _self.openResoureType = false
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
            this.formValidate.fileTypeName = ""
            this.formValidate.plural = "Y"
            this.formValidate.useDeparts = []
            this.formValidate.showCustomer = "Y"
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_CREATE_RESOURE_TYPE")
        this.$bus.on("OPEN_CREATE_RESOURE_TYPE", (e)=>{
            _self.openResoureType = true
        })
    },
}
</script>

