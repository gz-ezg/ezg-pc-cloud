<template>
    <Modal
            title="开票流水"
            v-model="openDetailMission"
            width="1000"
            :transfer="false"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Card>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </Modal>
</template>

<script>
    export default {
        name: "detail",
        props:["digits_map","type_map"],
        data(){
            return{
                openDetailMission:false,
                loading:false,
                data:[],
                page:1,
                pageSize:10,
                total:1000,
                companyId:"",
                header:[
                    {
                        title: '时间',
                        key: 'createdate',
                        minWidth: 140,
                    },
                    {
                        title: '发票类型',
                        key: 'invoice_type',
                        minWidth: 140,
                    },
                    {
                        title: '发票位数',
                        key:"digits",
                        minWidth: 140,

                    },
                    {
                        title: '开票数量',
                        key: 'amount',
                        minWidth: 140,
                    },
                    {
                        title: '开票人',
                        key: 'realname',
                        minWidth: 140,
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            get_data(){
                let _self = this;
                _self.loading = true
                let url = `api/order/cycle/service/dljz/companyInvoiceList`;
                let config = {
                    params:{
                        companyId:_self.companyId,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }
                function success(res){
                    _self.total = res.data.data.total
                    _self.data = res.data.data.rows
                    _self.data = res.data.data.rows.map(item => {
                        item.invoice_type = _self.type_map.get(item.invoice_type);
                        item.digits = _self.digits_map.get(item.digits);
                        return item;
                    })
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.$bus.on("DETAIL_INVOICE",(i,n)=>{
                this.companyId = i
                this.openDetailMission = true
                this.get_data()
            })
        }
    }
</script>

<style>

</style>