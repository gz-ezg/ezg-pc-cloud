<template>
    <div>
        <!-- <DatePicker type="daterange"  placeholder="选择日期" style="width: 200px;margin-bottom:10px" size="small" transfer @on-change="change"></DatePicker> -->
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
import dealCycle from './dealCycle'

export default {
    mixins: [dealCycle],
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
                                        path: `/customerList?type=dealCycle&dealType=c1&idType=depart&id=${params.row.id}`
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
                                        path: `/customerList?type=dealCycle&dealType=c2&idType=depart&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c2)
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
                                        path: `/customerList?type=dealCycle&dealType=c3&idType=depart&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c3)
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
                                        path: `/customerList?type=dealCycle&dealType=c4&idType=depart&id=${params.row.id}`
                                    })
                                },
                            }
                        }, params.row.c4)
                    }
                },
            ],
            loading: false,
            page: 1,
            pageSize: 10,
            total: 0,
            type: "depart"
        }
    }
}
</script>
