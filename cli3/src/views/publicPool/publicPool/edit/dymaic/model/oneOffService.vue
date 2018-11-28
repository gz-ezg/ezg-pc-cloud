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
            no-data-text="该客户暂无服务中的工单！"
        ></Table>
    </div>
</template>

<script>
import oneExpandRow from './oneExpandRow'

export default {
    props: {
        workOrderStatus: {
            type: Map
        },
        departname: {
            type: String
        },
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
                        return h( oneExpandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '公司',
                    key: 'companyname'
                },
                {
                    title: '产品名称',
                    key: 'product'
                },
                {
                    title: '当前进度',
                    key: 'CurrentProcess'
                },
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
        get_data(id, departname){
            let _self = this
            let url = `api/order/workOrderList`
            _self.loading = true
            let config = {
                params: {
                    page: 1,
                    pageSize: 1000,
                    sortField: "UpdateDate",
                    nonWorkOrderStatus: 60,
                    customerId: id,
                    serviceDept: departname,
                    iscycle:'N'
                }
            }

            function success(res){
                let result = res.data.data.rows
                _self.data = []
                for(let i = 0; i < result.length; i++){
                    let temp = {}
                    temp.CreateDate = result[i].CreateDate
                    temp.CurrentProcess = result[i].CurrentProcess
                    temp.IsOver = result[i].IsOver
                    temp.IsShared = result[i].IsShared
                    temp.IsWork = result[i].IsWork
                    temp.ServiceDeptID = result[i].ServiceDeptID
                    temp.ServiceEnd = result[i].ServiceEnd
                    temp.ServiceStart = result[i].ServiceStart
                    temp.UpdateDate = result[i].UpdateDate
                    temp.companyname = result[i].companyname
                    temp.followname = result[i].followname
                    temp.id = result[i].id
                    temp.name = result[i].name
                    temp.ordercode = result[i].ordercode
                    temp.product = result[i].product
                    temp.resumeFlag = result[i].resumeFlag
                    temp.resumeMsg = result[i].resumeMsg
                    temp.servername = result[i].servername
                    temp.tel = result[i].tel
                    temp.departname = result[i].departname
                    temp.workOrderStatus = _self.workOrderStatus.get(result[i].workOrderStatus)
                    temp._expanded = false

                    _self.data.push(temp)
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    mounted(){
        this.get_data(this.customer.ID, this.departname)
    }
}
</script>

