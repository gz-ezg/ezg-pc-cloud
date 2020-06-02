<template>
    <Modal
            title="新建做账备注"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <div @click="hidePhrase">
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <div class="sp">
                <new-edit-div v-model="newMission.taskName"></new-edit-div>
                <div class="spz">
                    <div class="spzz" @click.stop="showPhrase"><Icon type="android-chat" ></Icon></div>
                </div>
            </div>
            <div v-show="phraseShow" class="ssz">
                <Card>
                    <div class="sszz" v-for="(item,index) in phraseList" @click="giveData(item)" :loading="phraseLoading">
                        <div class="ssz1">{{item.quick_content}}</div>
                        <div class="ssz2" @click.stop="editable(item.quick_content,item.id)"><Icon type="edit" ></Icon></div>
                        <div class="ssz3" @click.stop="selectArr(item.id)"><Icon type="close" ></Icon></div>
                    </div>
                    <div class="sszz1" @click="add_schtask"><h4>+添加</h4></div>
                </Card>
            </div>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="代办于" prop="planDate">
                        <DatePicker type="datetime" v-model="newMission.planDate" style="width:100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        </div>
        <div slot="footer">
            <Button @click="create_task" type="primary" :loading="loading">发布</Button>
            <Button @click="cancel_task" type="ghost">清空</Button>
        </div>
        <add></add>
        <amend></amend>
    </Modal>
</template>

<script>
    import NewEditDiv from './newEditDiv'
    import Add from './add'
    import Amend from './amend'
    import {FixFULLDateFormat} from "@/libs/utils";
    import {FULLDateFormat} from "@/libs/utils";

    export default {
        name: "creat",
        components:{
            NewEditDiv,
            Amend,
            Add
        },
        data(){
            return{
                openAddMission:false,
                phraseShow:false,
                loading:false,
                companyId:"",
                phraseList:[],
                newMission:{
                    taskName:"",
                    planDate:"",
                }
            }
        },
        methods:{
            create_task(){
                let _self = this
                if (_self.newMission.taskName=="" || _self.newMission.taskName==null){
                    _self.$Message.warning("请将上述信息填写完整")
                    return
                }
                _self.loading = true
                let url = 'api/order/cycle/service/dljz/addAccountRemindTask'
                let config = {
                    companyId:_self.companyId,
                    taskKind: "tkRemAccMemo",
                    taskName:_self.newMission.taskName,
                    sPlanDate:FULLDateFormat(_self.newMission.planDate)
                }
                function success(res){
                    _self.loading = false
                    _self.$bus.emit("UPDATE_INDEX",true)
                    _self.newMission.taskName = ""
                    _self.openAddMission = false
                }
                this.$Post(url, config, success)
            },
            cancel_task(){
                this.newMission.taskName = ""
            },
            showPhrase(){
                if (this.phraseShow===true){
                    this.phraseShow=false
                } else {
                    this.phraseShow=true
                }
            },
            hidePhrase(){
                if (this.phraseShow===true){
                    this.phraseShow=false
                }
            },
            get_phrase_list(){
                let _self = this
                _self.phraseLoading = true
                let url = 'api/task/findTaskQuickList'
                let config = {
                    params:{
                        quickType: "tkRemAccMemo"
                    }
                }
                function success(res){
                    _self.phraseLoading = false
                    _self.phraseList = res.data.data
                }
                this.$Get(url, config, success)
            },
            giveData(item){
                this.newMission.taskName=this.newMission.taskName+item.quick_content
                this.phraseShow = false
            },
            editable(content,id){
                let _self = this
                _self.$bus.$emit("AMEND_PHRASE_DATA",content,id)
            },
            selectArr(id){
                this.delete_phrase_list(id)
                // this.addArr.splice(index.vue,1)
            },
            add_schtask(){
                this.$bus.emit("ADD_SCHTASK")
            },
            delete_phrase_list(id){
                let _self = this
                _self.phraseLoading = true
                let url = 'api/task/deleteTaskQuick'
                let config = {
                    params:{
                        taskQuickId: id
                    }
                }
                function success(res){
                    _self.phraseLoading = false
                    _self.$bus.emit("UPDATE_PHRASE_LIST", true)
                }
                this.$Get(url, config, success)
            },
        },
        created() {
            this.$bus.off("OPEN_ADD_ACCOUNT_NOTE",true)
            this.$bus.on("OPEN_ADD_ACCOUNT_NOTE",(e)=>{
                this.get_phrase_list()
                this.companyId = e.company_id
                this.newMission.taskName = ""
                this.openAddMission=true
                this.newMission.planDate = FixFULLDateFormat()
            })
            this.$bus.off("UPDATE_PHRASE_LIST",true)
            this.$bus.on("UPDATE_PHRASE_LIST",(e)=>{
                this.get_phrase_list()
            })
        }
    }
</script>

<style>
    .spz{
        height: 25px;
        width: 100%;
        border: 1px solid #dddee1;
        border-top: none;
        background-color: #fff;
        cursor: text;
    }
    .sp{
        margin-bottom: 25px;
    }
    .spzz{
        width: 20px;
        margin-left: 10px;
        cursor: pointer;
        text-align: center;
    }
    .spzz:hover{
        color: #2d8cf0;
    }
    .ssz{
        width: 200px;
        position: absolute;
        left: 68px;
        top: 228px;
        z-index: 100;
        background: #dddee1;
    }
    .ssz1{
        width: 100px;
        word-break: break-all;
    }
    .ssz1,.ssz2,.ssz3{
        display: inline-block;
    }
    .sszz{
        padding: 5px 0;
    }
    .sszz:hover{
        background: #fff5e6;
    }
    .ssz2:hover{
        color: #2d8cf0;
        cursor: pointer;
        font-size: 16px;
    }
    .ssz3:hover{
        cursor: pointer;
        font-size: 16px;
        color: #ed3f14;
    }
    .ssz2{
        margin-left: 30px;
    }

    .sszz1{
        padding: 10px 10px 0 10px;
        text-align: center;
        color: #2d8cf0;
    }
    .sszz1:hover{
        font-size: 16px;
        cursor: pointer;
    }
</style>