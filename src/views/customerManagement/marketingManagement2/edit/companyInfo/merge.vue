<template>
    <div>
        <Modal
                v-model="openMergeCompany"
                title="企业合并"
                :mask-closable="false"
                :closable="false">
                <Form>
                    <FormItem label="请选择要合并的公司" prop="merge">
                        <Select transfer
                                v-model="idArray.id"
                                placeholder="请输入客户名称搜索"
                                filterable
                                remote
                                :remote-method="get_company"
                                :loading="companyLoading">
                            <Option v-for="item in companyList" :value="item.companyid" :key="item.companyid">{{item.companyname}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            <div slot="footer">
                <Button type="warning" @click="cancel" :loading="loading">取消</Button>
                <Button type="primary" @click="merge" :loading="loading">合并</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    export default {
        name: "merge",
        props:{
            data:{
                type:Array,
                default:[],
            },
        },
        data(){
            return{
                openMergeCompany:false,
                id:"",
                newData:[],
                companyList:[],
                companyLoading:false,
                idArray:[
                    {id:'',companyname:""}
                ],
                customerId:''
            }
        },
        methods:{
            cancel(){
                let _self = this
                _self.newData = []
                _self.openMergeCompany = false
            },
            get_company(query){
                let _self = this
                _self.companyLoading = true
                let url = "api/legwork/apiQueryCompanyOrCustomerMsg"
                let config = {
                    params:{
                        page: 1,
                        pageSize: 10,
                        companyname: query
                    }
                }

                function success(res){
                    _self.companyLoading = false
                    _self.companyList = res.data.data
                }

                this.$Get(url, config, success)
            },
            merge(){
                let _self = this
                let url ='api/customer/company/companyMerge'
                let config = {
                    params:{
                        fistId:_self.id,
                        secondId:_self.idArray.id
                    }
                }
                function success(res){
                    _self.$bus.emit("UPDATE_CUSTOMER_NEW",true)
                    _self.newData = []
                    _self.$Message.success(res.data.msg)
                    _self.openMergeCompany = false
                    _self.idArray  = [{id:'',companyname:""}]
                }
                this.$Get(url, config ,success)
            }
        },
        created() {
            let _self = this
            this.$bus.off("OPEN_COMPANY_MERGE", true)
            this.$bus.on("OPEN_COMPANY_MERGE",(e)=>{
                _self.openMergeCompany = true
                _self.id = e
                console.log(_self.id)
                for (let i=0;i<_self.data.length;i++){
                    if (_self.data[i].id!==e){
                        _self.newData.push({id:_self.data[i].id,companyname: _self.data[i].companyname})
                    }
                }
                if (_self.newData.length!==0){
                    _self.idArray.id = _self.newData[0].id
                    _self.idArray.companyname = _self.newData[0].companyname
                }
                console.log(_self.newData)
            })
        }
    }
</script>

<style>

</style>