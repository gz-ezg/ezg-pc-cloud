<template>
    <div>
        <Card style="min-width:800px">
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
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading:false,
                data:[],
                total:1000,
                page:1,
                pageSize:10,
                formValidateSearch: {
                    ordercode: "",
                    companyName: "",
                    creatorName: "",
                    customertel: "",
                    payDir: "",
                    date: [],
                    crealname: "",
                    frealname: "",
                    paytime: [],
                    customerCreateTime: []
                },
                header:[
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 240,
                    },
                    {
                        title: '服务内容',
                        key: 'alisname',
                        minWidth: 140,
                    },
                    {
                        title: '升级意见',
                        key: 'opinion',
                        minWidth: 140,
                    },
                    {
                        title: '提出时间',
                        key: 'createdate',
                        minWidth: 140,
                    },
                    {
                        title: '服务会计',
                        key: 'serverName',
                        minWidth: 140,
                    },
                    {
                        title: '市场',
                        key: 'followbyName',
                        minWidth: 140,
                    }
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
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/companyOpinionList`;
                let config = {
                    params:{
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }
                function success(res){
                    _self.total = res.data.data.total
                    _self.data = res.data.data.rows
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.get_data()
        }
    }
</script>

<style>

</style>