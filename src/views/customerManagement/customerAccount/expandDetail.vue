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
import * as api from './api';

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
                    minWidth: 90
                },
                {
                    title: "明细类型",
                    key: "item_type",
                    minWidth: 90
                },
                {
                    title: "金额",
                    key: "item_amount",
                    minWidth: 90
                },
                {
                    title: "备注",
                    key: "item_memo",
                    minWidth: 150
                }
            ],
            data: [],
            loading: false
        }
    },
    methods: {
        async get_data(id){
            let _self = this
            _self.loading = true
            let config = {
                params:{
                    recordId: id
                }
            }
            try {
                let data = await api.getAccountRecordItem(config)
                _self.data = data.map((item)=>{
                    item.item_type = _self.accountChangeItemType.get(item.item_type)
                    return item
                })
                _self.loading = false
            } catch (error) {
                console.log(error)          
                _self.$Message.error("页面错误！")
            }
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


