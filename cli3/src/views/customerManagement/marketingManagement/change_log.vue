<template>
    <div>
        <Modal
            title="客户变更日志"
            v-model="open_customer_change_log"
            width = "600"
        >
            <Row :gutter="10">
                <Col span="8"><h3>客户名称：</h3></Col>
                <Col span="16"><h2>{{customerName}}</h2></Col>
            </Row>
            <Row :gutter="10">
                <Table
                    highlight-row
                    size="small"
                    :columns="columns"
                    :data="data"
                    :loading = "loading"
                ></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            open_customer_change_log: false,
            id: "",
            page: 1,
            pageSize: 10,
            customerName:"",
            pageTotal: new Number(),
            data:[],
            columns:[
                {
                    title: '变更前跟进人',
                    key: 'old_followby_realname',
                    width: 150
                },
                {
                    title: '变更后跟进人',
                    key: 'new_followby_realname',
                    width: 150
                },
                {
                    title: '变更时间',
                    key: 'shift_time',
                    width: 200
                },
            ]
        }
    },
    methods:{
        getData(){
            let _self = this

            let url = `api/customer/shift/log/list`

            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    customerId: _self.id
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.getData()
        }
    },
    created(){
        let _self = this
        this.$bus.on('open_customer_change_log',(e)=>{
            _self.open_customer_change_log = true
            _self.id = e[0]
            _self.customerName = e[1]
            _self.getData()
        })
    }
}
</script>

