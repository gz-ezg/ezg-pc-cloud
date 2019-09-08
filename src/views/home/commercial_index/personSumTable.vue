<!--    人员工作统计汇总    -->
<template>
    <div>
        <Table
            :columns="header" 
            :data="data"
            :loading="table_loading"
        >
        </Table>
        <!-- <Page
            size="small"
            :total="pageTotal"
            show-total
            show-sizer
            show-elevator
            :current.sync = "page"
            @on-change="pageChange"
            style="margin-top: 10px"></Page> -->
    </div>
</template>

<script>
export default {
    props:{
        date:{
            type:Array
        },
        type:{
            type:String
        }
      },
    data(){
        return{
            table_loading:false,
            pageTotal:new Number(),
            page: 1,
            pageSize: 10,
            header:[
                {
                    title:'服务人员',
                    key:'realname',
                },
                {
                    title: '命中外勤',
                    key: 'hit'
                },
                {
                    title: '有效外勤',
                    key: 'valid'
                },
                {
                    title: '无效外勤',
                    key: 'invalid'
                },
                {
                    title:'完成工单',
                    key:'finished_workorder',
                },
                {
                    title:'新增工单',
                    key:'new_workorder',
                },
                {
                    title:'其他',
                    key:'other',
                },
            ],
            data:[]
        }
    },
    methods: {
        getData(){
            var _self = this
            _self.table_loading = true
            // _self.Sloading = true       
            var url = 'api/order/bussiness/index/work/order/analysis/list'
            var config = {
                params:{
                    // page: _self.page,
                    // pageSize: 10,
                    begin_date: _self.date[0],
                    end_date: _self.date[1],
                    resulttype: _self.type
                }
            }

            function success(res){
                _self.table_loading = false
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created () {
        this.getData()
    },
    watch:{
        'date':'getData',
        'type':'getData'
    }
}
</script>
