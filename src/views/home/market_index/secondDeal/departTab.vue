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
import secondDeal from './secondDeal'
export default {
    mixins: [secondDeal],
    data(){
        return {
            type: "depart",
            data: [],
            header: [
                {
                    title: "部门",
                    key:"departname",
                    minWidth: 120
                },
                {
                    title: "代账客户数",
                    key:"cycle_count",
                    minWidth: 120,
                    render: (h,params) => {
                        // let color = "#2d8cf0"
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0 "
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=secondDeal&dealType=dljz&idType=depart&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.cycle_count)
                    }
                },
                {
                    title: "二次成交数",
                    key:"renew_order_count",
                    minWidth: 120,
                    render: (h,params) => {
                        // let color = "#2d8cf0"
                        return h('div',{
                            style: {
                                width: "100%",
                                color: "#2d8cf0"
                            },
                            on: {
                                click: ()=>{
                                    this.$router.push({
                                        path: `/customerList?type=secondDeal&dealType=dljz&idType=depart&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.renew_order_count)
                    }
                },
            ],
            loading: false,
            page: 1,
            pageSize: 10,
            total: 0
        }
    },
}
</script>
