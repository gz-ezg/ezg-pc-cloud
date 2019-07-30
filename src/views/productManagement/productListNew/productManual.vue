<template>
    <Modal
            :title="title"
            v-model="openManualTask"
            width="500"
            :mask-closable="false"
    >
        <Form ref="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <div class="sp">
                <Input type="textarea" v-model="data.remark" :autosize="{minRows: 5,maxRows: 8}" placeholder="请填写产品说明......"></Input>
            </div>
        </Form>
        <div slot="footer">
            <Button @click="add_manual" type="primary" :loading="loading">保存</Button>
            <Button @click="empty" type="ghost">清空</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "productManual",
        data() {
            return {
                title: "",
                openManualTask: false,
                content: "",
                loading: false,
                productId: "",
                product: "",
                data:[]
            }
        },
        methods:{
            add_manual(){
                let _self = this;
                _self.loading = true;
                let url = `api/product/createProductRemark`;
                let config = {
                    id:_self.productId,
                    tags:_self.data.remark,

                }
                function success(res){
                    _self.openManualTask = false
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            get_data(){
                let _self = this;
                let url = `api/product/getProductRemarkById`;
                let config = {
                    params:{
                        id:_self.productId
                    }
                }
                function success(res){
                    _self.data = res.data.data
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            empty(){
                this.data.remark = ""
            }
        },
        created() {
            this.$bus.off("OPEN_PRODUCT_MANUAL", true)
            this.$bus.on("OPEN_PRODUCT_MANUAL", (e, p) => {
                this.openManualTask = true
                this.productId = e
                this.product = p
                this.title = this.product + "使用说明"
                this.get_data()
            })
        }
    }
</script>

<style>

</style>