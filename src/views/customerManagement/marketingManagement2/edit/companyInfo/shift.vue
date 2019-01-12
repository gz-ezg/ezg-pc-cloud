<template>
    <div>
        <Modal
            title="转移公司"
            v-model="openShiftCompany"
            width="600"
            @on-cancel="close"
        >
            <Form :label-width="120">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="NAME" label="公司名称：">
                            <Input type="text" v-model="companyName" readonly size="small">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="newFollowName" label="新归属客户：">
                            <Input type="text" v-model="customerName" readonly size="small"></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <Input v-model="searchName" placeholder="输入客户名称搜索" @on-enter="get_data" >
                                <Button name="marketingManagement_index_change_search" slot="append" icon="ios-search" @click="get_data">搜索</Button>
                            </Input>
                        </Col>
                        <Col span="24" style="line-height:32px"><Tag color="blue">温馨提示：双击下方列表选择需要变更的客户名称</Tag></Col>
                    </Row>
                    <Table
                        style="margin-top: 10px"
                        highlight-row
                        :columns="header"
                        @on-row-dblclick="row_select_customer"
                        :loading="loading"
                        :data="data"
                        size="small"></Table>
                        
                    <Page
                        size="small"
                        :total="total"
                        show-total
                        show-elevator
                        :current.sync="page"
                        @on-change="page_change"
                        style="margin-top: 10px">
                    </Page>
                </Row>
            </Form>
            <div slot="footer">
                <Button name="marketingManagement_index_change_change" type="primary" @click="submit" :loading="submitLoading">变更</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import * as api from './api'
export default {
    props: {
        company: {
            type: [String, Object]
        }
    },
    data(){
        return {
            submitLoading: false,
            companyName: "",
            customerName: "",
            searchName: "",
            customerId: "",
            companyId: "",
            loading: false,
            total: 0,
            header: [
                {
                    title: "客户名称",
                    key: "name"
                },
                {
                    title: "联系方式",
                    key: "tel"
                }
            ],
            data: [],
            page: 1,
            pageSize: 10,
            openShiftCompany: true
        }
    },
    methods: {
        async get_data(){
            let _self = this
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    name: _self.searchName,
                }
            };
            
            try {
                let { total, rows } = await api.getCustomerList(config)
                _self.total = total
                _self.data = rows.map((item)=>{
                    let temp = {}
                    temp.id = item.ID
                    temp.name = item.NAME
                    temp.tel = item.TEL
                    return temp
                })
            } catch (error) {
                console.log(error)
                _self.$Message.error("页面异常！")
            }

            _self.loading = false

        },
        row_select_customer(e){
            this.customerName = e.name
            this.customerId = e.id
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        close(){
            this.$emit("close")
        },
        async submit(){
            let _self = this
            if(this.companyId && this.customerId){
                let config = {
                    companyId: _self.companyId,
                    customerId: _self.customerId
                }

                try {
                    let {status, data} = await api.postCustomerCompayShift(config)
                    // console.log(status, data)
                    if(status){
                        _self.close()
                    }
                } catch (error) {
                    _self.$Message.error("页面异常！")
                }

            }else{
                this.$Message.warning("请先选择变更对象！")
            }
        }
    },
    mounted(){
        this.get_data()
        this.companyName = this.company.companyname
        this.companyId = this.company.id
    }
}
</script>

