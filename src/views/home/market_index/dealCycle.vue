<template>
    <div>
        <Table
            :loading="loading"
            highlight-row
            size="small"
            border
            :columns="header"
            :data="data"></Table>
        <Page
            v-if="total>10"
            size="small"
            :total="total"
            show-total
            show-elevator
            :current.sync="page"
            @on-change="pageChange"
            style="margin-top: 10px;padding-bottom:10px"></Page>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data: [],
            header: [
                {
                    title: "部门",
                    key:"departname",
                    minWidth: 120
                },
                {
                    title: "市场",
                    key: "realname",
                    minWidth: 90
                },
                {
                    title: "10天内成交",
                    key:"c1",
                    minWidth: 100,
                    render: (h,params) => {
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0"
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=dealCycle&dealType=c1&idType=user&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c1)
                    }
                },
                {
                    title: "10-30天内成交",
                    key:"c2",
                    minWidth: 120,
                    render: (h,params) => {
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0"
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=dealCycle&dealType=c2&idType=user&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c1)
                    }
                },
                {
                    title: "30-60天内成交",
                    key:"c3",
                    minWidth: 120,
                    render: (h,params) => {
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0"
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=dealCycle&dealType=c3&idType=user&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c1)
                    }
                },
                {
                    title: "60天以上",
                    key:"c4",
                    minWidth: 120,
                    render: (h,params) => {
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0"
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=dealCycle&dealType=c4&idType=user&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c1)
                    }
                },
            ],
            loading: false,
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/crm/sale/index/customer/deal/cycle`
            _self.loading = true
            let config = {
                params: {
                    type: "user",
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    },
    created(){
        this.get_data()
    }
}
</script>
