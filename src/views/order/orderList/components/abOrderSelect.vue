<template>
    <div>
        <Modal
            v-model="openSelectAbOrder"
            title="选择对应的异常工单"
            width="80%">
            
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    :loading="loading"
                    size="small"
                    ref="selection"
                    :columns="header"
                    :data="data"
                    @on-row-dblclick="row_select"></Table>
            <Page
                    size="small"
                    :total="total"
                    :page-size="pageSize"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "selectName",
    props: {
        id: {
            type: [String, Number]
        }
    },
    data(){
        return {
            openSelectAbOrder: false,
            searchCompany: "",
            header: [
                {
                    title: '订单号码',
                    key: 'unusual_code',
                    minWidth:300
                },
                {
                    title: '产品内容',
                    key: 'product_content',
                    minWidth:150
                },
                {
                    title: '异常类型',
                    key: 'unusual_type',
                    minWidth:150
                },
                {
                    title: '审批是由',
                    key: 'apply_memo',
                    minWidth:100
                },
                {
                    title: '创建时间',
                    key: 'gdsStatus',
                    minWidth:130
                },
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
            gds_map: new Map([
                ["wbd", '未报道'],
                ["ybd", '已报道'],
                ["bybd", '不用报道'],
            ])

        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/order/unusual/workorder/findUnusualWorkOrderNotBindOrderByCompanyId`
            let config ={
                params:{
                    companyId: this.id
                }
            }
            function success(res){
                console.log(res)
                _self.data = res.data.data
                _self.total = res.data.data.length
            }
            this.$Get(url,config,success)
        },
        // get_data(){
        //     let _self = this
        //     let url = `api/customer/company/list`
        //     _self.loading = true
        //     let config = {
        //         params: {
        //             page: _self.page,
        //             pageSize: 10,
        //             companyname: _self.searchCompany
        //         }
        //     }

        //     function success(res){
        //         _self.data = res.data.data.rows
        //         _self.total = res.data.data.total
        //         for(let i = 0; i < _self.data.length; i++){
        //             _self.data[i].gdsStatus = _self.gds_map.get(_self.data[i].gdsreport)
        //         }
        //         _self.loading = false
        //     }

        //     this.$Get(url, config, success)
        // },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        row_select(e){
            // console.log(e)
            this.$emit("company-change", e)
            this.openSelectAbOrder = false
        }
    },
    created() {
        let _self = this
        this.$bus.off("SELECT_ABORDER", true)
        this.$bus.on("SELECT_ABORDER", (e)=>{
            _self.get_data()
            _self.openSelectAbOrder = true
        })
    },
}
</script>
