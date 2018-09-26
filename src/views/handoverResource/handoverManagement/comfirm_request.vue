<template>
    <div>
        <Modal
            title="交接处理"
            v-model="openConfirm"
            width="600"
        >
                <Form ref="formValidate" :model="formValidate" :label-width="120" :rules="ruleInline">
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
                        <!-- <Input v-model="formValidate.storage" placeholder="请输入存放位置"></Input> -->
                        <Select v-model="formValidate.storage" placeholder="选择存放位置" >
                            <Option  v-for="item in customer_f_s_a" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="存放位置：" prop="storageCode" v-if="show">
                        <Input v-model="formValidate.storageCode" placeholder="请输入存放具体位置"></Input>
                    </FormItem>
                    <FormItem label="备注：" prop="memo" v-if="show">
                        <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="submit" :loading="loading">提交</Button>
                </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
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
            applicantRealname: "",
            ruleInline:{
                departId: [
                    { required: true, trigger: 'change', message: "存放部门必选！", type: 'number' }
                ],
                storage: [
                    { required: true, trigger: 'change', message: "存放地点必选！" }
                ],
                storageCode: [
                    { required: true, trigger: 'change', message: "存放位置必选！" }
                ]
            },
            customer_f_s_a: []
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
            let _self = this
            let url = "api/customer/file/connect/request/dispose"
            _self.loading = true
            function success(res){
                    _self.loading = false
                    _self.openConfirm = false
                    _self.$bus.emit("HANDOVER_FILE_UPDATE",true)
                }

                function fail(err){
                    _self.loading = false
                }
            if(this.show){
                //  true
                this.$refs["formValidate"].validate((valid) => {
                    if (valid) {
                        let config = {
                            status: "Y",
                            connectRequestId: _self.connectRequestId,
                            departId: _self.formValidate.departId,
                            memo: _self.formValidate.memo,
                            storage: _self.formValidate.storage,
                            storageCode: _self.formValidate.storageCode
                        }

                        _self.$Post(url, config, success, fail)
                    } else {
                        this.$Message.error('请补全信息!');
                        _self.loading = false
                    }
                })
            }else{
                //  false
                let config2 = {
                    status: "Y",
                    connectRequestId: _self.connectRequestId,
                    memo: _self.formValidate.memo
                }
                _self.$Post(url, config2, success, fail)

            }
        },
        get_center(){
            let _self = this
            let params = "customer_f_s_a"
            function success(res){
                _self.customer_f_s_a = res.data.data.customer_f_s_a
                // _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
            }
            _self.$GetDataCenter(params, success)
        }
    },
    created() {
        let _self = this
        _self.get_center()
        _self.$bus.on("OPEN_CONFIRM_FILE", (e)=>{
            // console.log(e)
            _self.get_data_center()
            _self.connectRequestId = e.id
            _self.currentRow = e
            _self.openConfirm = true
            _self.receiverRealname = e.receiver_name
            _self.applicantRealname = e.applicant_name
        })
    },
}
</script>
