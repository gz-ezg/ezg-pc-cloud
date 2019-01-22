<template>
    <div>
        <Modal
            v-model="openCreateCompany"
            title="公司变更"              
            >
            <Form :label-width="100">
                <FormItem label="公司名称" prop="company">
                    <Input type='text' v-model="companyData.companyname" readonly size="small"></Input>
                </FormItem>
                <FormItem label="新客户" prop="newCustomerName">
                    <Input v-model="newCustomerName" readonly size="small"></Input>
                </FormItem>
                <Row>
                    <Row :gutter="16">
                        <Col span="10">
                            <Input v-model="searchName" placeholder="输入客户名称搜索" @on-enter="get_data" >
                                <Button name="marketingManagement_index_change_search" slot="append" icon="ios-search" @click="get_data">搜索</Button>
                            </Input>
                        </Col>
                        <Col span="14" style="line-height:32px"><span>温馨提示：双击下方列表选择公司变更的客户</span></Col>
                    </Row>
                    <Table
                        style="margin-top: 10px"
                        highlight-row
                        :columns="header"
                        :loading="loading"
                        :data="data"
                        size='small'
                        @on-row-dblclick='row_select_customer'
                    ></Table>
                    <Page
                        size="small"
                        :total="total"
                        show-total
                        show-elevator
                        :current.sync = "page"
                        style="margin-top: 10px"
                        @on-change='pageChange'
                    ></Page>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit()" :loading="submit_loading">变更</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import relationCommon from './common'
export default {
    data(){
        return {
            loading:false,
            openCreateCompany: false,
            page:1,
            pageSize:10,
            header: [
                {
                  title: "客户名称",
                  key: "NAME",
                  minWidth: 200
                },
                {
                  title: "联系电话",
                  key: "TEL",
                  minWidth: 250
                }
              ],
            data:[],
            total:null,
            //新客户信息
            newCustomerName:'',
            newCustomerId:null,
            newCustomerTel:null,
            
            submit_loading:false,
            searchName:''
        }
    },
    props:[
        'companyData'
    ],
    methods: {
        get_data(){
            let _self = this
            _self.loading = true
            let url = 'api/customer/list'
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    name:this.searchName
                }
            }

            function success(res){
                console.log(res)
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url,config,success)
        },
        //变更提交
        submit(){
            console.log(this.companyData.id)
            let _self = this
            _self.submit_loading =true
            let url = 'api/customer/company/shift'
            let config = {
                companyId: this.companyData.id,
                customerId: _self.newCustomerId
            }

            function success(res){
                console.log(res)
                _self.submit_loading = false;
                _self.openCreateCompany = false
                _self.$bus.emit("UPDATE_CUSTOMER", true);
                this.data = []
            }

            this.$Post(url,config,success);
        },
        row_select_customer(e){
            console.log(e)
            this.newCustomerName = e.NAME
            this.newCustomerId = e.ID
            this.newCustomerTel = e.TEL
        },
        pageChange(e){
            console.log(e)
            this.page = e
            this.get_data()
        }
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_COMPANY_CHANGE", true)
        this.$bus.on("OPEN_COMPANY_CHANGE",(e)=>{
            _self.openCreateCompany = true
            _self.get_data()
        })
    }
}
</script>
