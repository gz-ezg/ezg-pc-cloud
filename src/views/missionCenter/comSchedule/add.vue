<template>
    <div>
            <Modal
                    :transfer="false"
                    title="输入快捷短语"
                    v-model="openAddTask"
                    width="500"
                    :mask-closable="false"
            >
                <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                    <div class="sp">
                        <Input size="large" v-model="content" ></Input>
                    </div>
                </Form>
                <div slot="footer">
                    <Button @click="add_phrase" type="primary" :loading="createLoading">添加</Button>
                    <Button @click="cancel_task" type="ghost">清空</Button>
                </div>
            </Modal>
    </div>
</template>

<script>
    // import editDiv from './editDiv'
    export default {
        name: "add",
        // components:{
        //     editDiv
        // },
        data(){
          return{
              openAddTask:false,
              content:null
          }
        },
        methods:{
            add_phrase(){
                if (this.content===null || this.content===""){
                    this.$Message.warning("请输入快捷短语")
                } else {
                this.add_phrase_list(this.content)
                this.openAddTask = false
                this.content = null
                }
            },
            add_phrase_list(e){
                let _self = this
                _self.phraseLoading = true
                let url = 'api/task/addTaskQuick'
                let config={
                    quickType:"business",
                    quickContent:e,
                    quickIndex:1,
                }
                function success(res){
                    _self.phraseLoading = false
                    _self.$bus.emit("UPDATE_PHRASE_LIST", true)
                }
                function fail(err){
                    _self.phraseLoading = true

                }
                this.$Post(url, config, success, fail)
            },
            cancel_task(){
                this.content = null
            }
        },
        created() {
            this.$bus.on("ADD_SCHTASK",()=>{
                this.openAddTask=true
            })
        }
    }
</script>

<style>

</style>