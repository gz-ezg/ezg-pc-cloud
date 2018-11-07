<template>
<!-- 一次性服务 -->
    <div>
        <Table
            size="small"
            border
            :loading="loading"
            :columns="header"
            :data="data"
            @on-row-click="open_expand"
            style="margin-top: 15px"
            no-data-text="该客户未开通记账服务！"
        ></Table>
    </div>
</template>

<script>
import cycleExpandRow from './cycleExpandRow'

export default {
    props: {
        customer: {
            type: [String, Object, Array]
        }
    },
    data(){
        return {
            loading: false,
            header: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h( cycleExpandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '公司',
                    key: 'CompanyName'
                },
                {
                    title: '产品名称',
                    key: 'product'
                },
                {
                    title: '截止税期',
                    key: 'end_period'
                }
            ],
            data: []
        }
    },
    methods:{
        open_expand(row, index){
            if(this.data[index]._expanded == true){
                this.$set(this.data[index], "_expanded", false)
            }else{
                this.$set(this.data[index], "_expanded", true)
            }
        },
        get_data(id){
            let _self = this
            let url = `api/order/cycle/service/record/list`
            _self.loading = true
            let config = {
                params: {
                    page: 1,
                    pageSize: 100,
                    un_service_status: "stop",
                    customerid: id,
                }
            }

            function success(res){
                let result = res.data.data.rows
                _self.data = []
                for(let i = 0; i < result.length; i++){
                    let temp = {}
                    temp.id = result[i].id
                    temp.CompanyName = result[i].CompanyName
                    temp.product = result[i].product
                    temp.end_period = result[i].end_period
                    temp.ordercode = result[i].ordercode
                    temp.account_begin_time = result[i].account_begin_time
                    temp.departname = result[i].departname
                    temp.server_realname = result[i].server_realname
                    temp.accmanager_realname = result[i].accmanager_realname
                    temp.balance_count = result[i].balance_count
                    temp.createdate = result[i].createdate
                    temp.updatedate = result[i].updatedate
                    temp.service_time = result[i].service_time
                    temp.legwork_valid_num = result[i].legwork_valid_num
                    temp._expanded = false
                    _self.data.push(temp)
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    mounted(){
        this.get_data(this.customer.ID)
    }
}
</script>

