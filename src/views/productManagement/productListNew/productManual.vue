<template>
    <Modal
            :title="title"
            v-model="openManualTask"
            width="500"
            :mask-closable="false"
    >
        <Form ref="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <div class="sp">
                <Input type="textarea" v-model="content" :autosize="{minRows: 5,maxRows: 8}" placeholder="请填写产品说明......"></Input>
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
                SKU: "",
                product: ""
            }
        },
        methods:{
            add_manual(){
                // let _self = this;
                // _self.loading = true;
                // let url = `api/order/cycle/service/dljz/createCompanyOpinion`;
                // let config = {
                //     companyId:_self.companyId,
                //     cycleServiceRecordId:_self.Id,
                //     opinion:_self.content
                // }
                // function success(res){
                //     _self.openLevelTask = false
                // }
                //
                // function fail(err){
                //
                // }
                // this.$Post(url, config, success, fail)
            },
            empty(){
                this.content = ""
            }
        },
        created() {
            this.$bus.off("OPEN_PRODUCT_MANUAL", true)
            this.$bus.on("OPEN_PRODUCT_MANUAL", (e, p) => {
                this.openManualTask = true
                this.SKU = e
                this.product = p
                this.title = this.product + "产品使用说明"
            })
        }
    }
</script>

<style>

</style>