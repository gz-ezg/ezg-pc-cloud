<template>
    <div>
        <Modal
            title="账户流水"
            v-model="openAccountFlow"
            width="1100"
            @on-cancel="close"
        >
            <Table
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                :loading="loading"
                class="expand-table"
            ></Table>
            <Page
                size="small"
                :total="total"
                :current.sync="page"
                show-total
                show-elevator
                @on-change="page_change"
                style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import expandItem from './expandDetail'
import * as api from './api';
export default {
    props: {
        id: {
            type:[String, Number]
        },
        accountChangeType: {
            type: [Map, String]
        },
        accountChangeItemType: {
            type: [Map, String]
        },
    },
    components: {
        expandItem
    },
    data(){
        return {
            loading: false,
            openAccountFlow: true,
            total: 0,
            page: 1,
            pageSize: 10,
            header: [
                {
                    title: "序号",
                    type: "index",
                    width: 90
                },
                // {
                //     type: 'expand',
                //     width: 50,
                //     render: (h, params) => {
                //         let _self = this
                //         return h(expandItem, {
                //             props: {
                //                 id: params.row.id,
                //                 accountChangeItemType: _self.accountChangeItemType
                //             }
                //         })
                //     }
                // },
                {
                    title: "流水类型",
                    key: "record_type",
                    minWidth: 150
                },
                {
                    title: "积分",
                    key: "actual_integral",
                    minWidth: 120
                },
                {
                    title: "订单号",
                    key: "ordercode",
                    minWidth: 150
                },
                {
                    title: "归属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "缴费时间",
                    key: "actual_date",
                    minWidth: 150
                },
                {
                    title: "流水生成时间",
                    key: "createdate",
                    minWidth: 150
                }
            ],
            data: []
        }
    },
    methods: {
        page_change(e){
            this.page = e
            this.get_data(this.id)
        },
        async get_data(id){
            let _self = this
            // let url = `api/customer/account/record/list`
            _self.loading = true
            let config = {
                params: {
                    customer_integral_id: id,
                    page: this.page,
                    pageSize: this.pageSize,
                    sortField: "id",
                    order: "desc"
                }
            }
            try {
                let { total, rows } = await api.getCustomerIntegralList(config)
                _self.total = total
                _self.data = rows.map((item)=>{
                    if(item.actual_date){
                        item.actual_date = item.actual_date.slice(0,10)
                    }
                    if(item.createdate){
                        item.createdate = item.createdate.slice(0,10)
                    }
                    item.record_type = _self.accountChangeType.get(item.record_type)

                    return item
                })
            } catch (error) {
                // console.log(error)
                _self.$Message.error("页面异常！")
            }
            _self.loading = false
        },
        close(){
            this.$emit("close")
        }
    },
    mounted(){
        if(!this.id){
            this.$Message.error("未知客户")
            return false
        }

        this.get_data(this.id)
    }
}
</script>

<style>
.expand-table .td.ivu-table-expanded-cell{
    padding: 0;
}
</style>
