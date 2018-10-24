<template>
    <div>
        <Modal
            v-model="opencheckMemo"
            title="查看审批备注"
            width="70%">
            <Table 
                border
                :loading="loading"
                :columns="header" 
                :data="data" 
                size="small"></Table>
                <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loading: false,
            opencheckMemo: false,
            header: [
                {
                    title: '审批备注',
                    key: 'record',
                    minWidth: 200,
                },
                {
                    title: '审批时间',
                    key: 'createDate',
                    minWidth: 150
                },
                {
                    title: '创建人',
                    key: 'auditName',
                    minWidth: 120
                },
                ],
            data: []
        }
    },
    methods: {
        get_data(e){
            let _self = this
            _self.loading = true
            let url = 'api/order/approveRecord?orderId=' + e
            

            let config = {}

            function success(res){
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        let _self = this
        this.$bus.on("ORDER_APPROVELIST_LOG", (e)=>{
            _self.get_data(e)
            _self.opencheckMemo = true
        })
    },
}
</script>

