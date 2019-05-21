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
                this.$bus.emit("ADD_ACCOUNTER_PHRASE",this.content)
                this.openAddTask = false
                }
            },
            cancel_task(){
                this.content = null
            }
        },
        created() {
            this.$bus.on("ADD_ACCOUNT_TASK",(e)=>{
                this.openAddTask=true
            })
        }
    }
</script>

<style>

</style>