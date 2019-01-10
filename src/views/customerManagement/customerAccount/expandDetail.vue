<template>
    <div style="padding-left:50px">
        <Table
            size="small"
            :columns="header"
            :data="data"
            :loading="loading"
        ></Table>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: [String, Number],
            default: ""
        },
        accountChangeItemType: {
            type: [Map]
        }
    },
    data(){
        return {
            header: [
                {
                    title: "序号",
                    type: "index",
                    width: 90
                },
                {
                    title: "订单号",
                    key: "ordercode",
                    minWidth: 150
                },
                {
                    title: "明细类型",
                    key: "item_type",
                    minWidth: 150
                },
                {
                    title: "金额",
                    key: "item_amount",
                    minWidth: 120
                }
            ],
            data: [],
            loading: false
        }
    },
    methods: {
        get_data(id){
            let _self = this
            let url = `api/customer/account/record/items`
            _self.loading = true
            let config = {
                params:{
                    recordId: id
                }
            }

            function success(res){
                let { data } = res.data
                _self.data = data.map((item)=>{
                    item.item_type = _self.accountChangeItemType.get(item.item_type)
                    return item
                })
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    mounted(){
        this.get_data(this.id)
    }
}
</script>

<style>
td.ivu-table-expanded-cell{
    padding: 0!important;
}
</style>


