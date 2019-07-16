<template>
    <Modal
            :transfer="false"
            title="升级意见"
            v-model="openLevelTask"
            width="500"
            :mask-closable="false"
    >
        <Form ref="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <div class="sp">
                <Input type="textarea" v-model="content" :autosize="{minRows: 5,maxRows: 8}" placeholder="请详细填写该企业升级的意见"></Input>
            </div>
        </Form>
        <div slot="footer">
            <Button @click="add_level" type="primary" :loading="loading">建议升级</Button>
            <Button @click="empty" type="ghost">清空</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                openLevelTask:false,
                content:"",
                loading:false,
            }
        },
        methods:{
            add_level(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/createCompanyOpinion`;
                let config = {
                    companyId:_self.companyId,
                    cycleServiceRecordId:_self.Id,
                    opinion:_self.content
                }
                function success(res){
                    _self.openLevelTask = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            empty(){
                this.content = ""
            }
        },
        created() {
            this.$bus.on("OPEN_LEVEL_PAGE",(e)=>{
                this.openLevelTask = true
                this.Id = e.cycle_service_record_id
                this.companyId = e.company_id
            })
        }
    }
</script>

<style>

</style>