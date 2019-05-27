<template>
    <div>
        <Modal
                title="修改快捷短语"
                v-model="openAmendTask"
                width="500"
                :mask-closable="false"
                :transfer="false"
        >
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                <div class="sp">
                    <Input v-model="content"></Input>
                </div>
            </Form>
            <div slot="footer">
                <Button @click="amend_phrase" type="primary" :loading="amendLoading">修改</Button>
                <Button @click="cancel_task" type="ghost">清空</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "amend",
        data(){
            return{
                amendLoading:false,
                openAmendTask:false,
                content:"",
                id:null
            }
        },
        methods:{
            amend_phrase(){
                this.amend_phrase_list()
            },
            amend_phrase_list(){
                let _self = this
                _self.amendLoading = true
                let url = 'api/task/updateTaskQuick'
                let config={
                    quickType:"normal",
                    quickContent:_self.content,
                    quickIndex:1,
                    id:_self.id
                }
                function success(res){
                    _self.amendLoading = false
                    _self.$bus.$emit("UPDATE_ACCOUNTER_PHRASE_LIST",true)
                    _self.openAmendTask = false
                }
                function fail(err){
                    _self.amendLoading = true

                }
                this.$Post(url, config, success, fail)
            }
        },
        created() {
            let _self = this
            _self.$bus.on("AMEND_ACCOUNT_PHRASE_DATA",(content,id)=>{
                _self.openAmendTask = true
                _self.content = content
                console.log(id)
                _self.id = id
            })
        }
    }
</script>

<style>

</style>