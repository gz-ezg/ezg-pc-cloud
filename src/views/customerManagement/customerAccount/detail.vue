<template>
    <div>
        <Modal
            title="账户流水"
            v-model="openAccountFlow"
            width="900"
            @on-cancel="close"
        >
            <Table
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                :loading = "loading"
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
    data(){
        return {
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
                {
                    title: "流水类型",
                    key: "record_type",
                    minWidth: 150
                },
                {
                    title: "金额",
                    key: "actual_amount",
                    minWidth: 120
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
        get_data(id){
            let _self = this
            let url = `api/customer/account/record/list`
            let config = {
                params: {
                    customer_account_id: id,
                    page: this.page,
                    pageSize: this.pageSize
                }
            }

            function success(res){
                let {total, rows} = res.data.data
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
            }

            this.$Get(url, config, success)
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

