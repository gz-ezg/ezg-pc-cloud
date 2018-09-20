<template>
    <div>
        <Modal
            title="交接处理"
            v-model="openConfirm"
            width="600"
        >
                <Form ref="formValidate" :model="formValidate" :label-width="80">
                    <FormItem label="接收人：">
                        <Input v-model="receiverRealname" readonly></Input>
                    </FormItem>
                    <FormItem label="申请人：">
                        <Input v-model="applicantRealname" readonly></Input>
                    </FormItem>
                    <FormItem label="状态：" prop="status">
                        <RadioGroup  v-model="formValidate.status">
                            <Radio  label="Y">接收</Radio>
                            <Radio  label="N">拒收</Radio>
                        </RadioGroup >
                    </FormItem>
                    <FormItem label="存放部门：" prop="departId" v-if="show">
                        <Select v-model="formValidate.departId" placeholder="选择存放部门" >
                            <Option  v-for="item in departAlias" :value="item.departid" :key="item.departid">{{item.departname}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="存放地点：" prop="storage" v-if="show">
                        <Input v-model="formValidate.storage" placeholder="请输入存放位置"></Input>
                    </FormItem>
                    <FormItem label="存放位置：" prop="storageCode" v-if="show">
                        <Input v-model="formValidate.storageCode" placeholder="请输入存放具体位置"></Input>
                    </FormItem>
                    <FormItem label="备注：" prop="memo" v-if="show">
                        <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openConfirm: false,
            currentRow: "",
            departAlias: [],
            connectRequestId: "",
            formValidate: {
                status: "Y",
                departId: "",
                memo: "",
                storage: "",
                storageCode: ""
            },
            receiverRealname: "",
            applicantRealname: ""
        }
    },
    computed:{
        show:function(){
            if(this.formValidate.status == "Y"){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        get_data_center(){
            let _self = this
            _self.departLoading = true 
            let url = "api/system/depart/queryDepartsByUserId"
            let config = {
                params:{
                }
            }
            function success(res){
                _self.departAlias = res.data.data
            }

            this.$Get(url, config, success)
        },
        submit(){
            
        }
    },
    created() {
        let _self = this
        _self.$bus.on("OPEN_CONFIRM_FILE", (e)=>{
            // console.log(e)
            _self.get_data_center()
            _self.connectRequestId = e.id
            _self.currentRow = e
            _self.openConfirm = true
            _self.receiverRealname = e.receiver_realname
            _self.applicantRealname = e.applicant_realname
        })
    },
}
</script>
