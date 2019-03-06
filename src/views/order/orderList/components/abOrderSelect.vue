<template>
    <div>
        <Modal
            v-model="openSelectAbOrder"
            title="选择对应的异常工单"
            width="80%">
            
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    :loading="loading"
                    size="small"
                    ref="selection"
                    :columns="header"
                    :data="data"
                    @on-row-dblclick="row_select"></Table>
            <Page
                    size="small"
                    :total="total"
                    :page-size="pageSize"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "selectName",
    props: {
        id: {
            type: [String, Number]
        }
    },
    data(){
        return {
            //数据字典
            unusualType:[],
            unusualType_map: new Map(),
            openSelectAbOrder: false,
            searchCompany: "",
            header: [
                {
                    title: '订单号码',
                    key: 'unusual_code',
                    minWidth:300
                },
                {
                    title: '产品内容',
                    key: 'product_content',
                    minWidth:150
                },
                {
                    title: '异常类型',
                    key: 'unusual_type',
                    minWidth:150
                },
                {
                    title: '审批事由',
                    key: 'apply_memo',
                    minWidth:100
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    minWidth:130
                },
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false
        }
    },
    methods: {
        //获取数据字典
        get_data_center(){
            let _self = this
            return new Promise((resolve,reject) => {
                let params = "unusualType"

                function success(res){
                    _self.unusualType = res.data.data.unusualType
                    _self.unusualType_map = _self.$array2map(_self.unusualType)
                    resolve()
                }

                this.$GetDataCenter(params, success)
                
            }) 
        },
        get_data(){
            let _self = this
            let url = `api/order/unusual/workorder/findUnusualWorkOrderNotBindOrderByCompanyId`
            let config ={
                params:{
                    companyId: this.id
                }
            }
            _self.data = []
            function success(res){
                console.log(res)
                if(_self.data.length !=0){
                    res.data.data[0].unusual_type =_self.unusualType_map.get(res.data.data[0].unusual_type)
                    console.log(res.data.data[0].unusual_type)
                }
                _self.data = res.data.data
                _self.total = res.data.data.length
            }
            this.$Get(url,config,success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        row_select(e){
            this.$emit("aborder-change", e)
            this.openSelectAbOrder = false
        }
    },
    created() {
        let _self = this
        this.$bus.off("SELECT_ABORDER", true)
        this.$bus.on("SELECT_ABORDER", (e)=>{
            _self.get_data_center().then(
                _self.get_data()
            )
            _self.openSelectAbOrder = true
        })
    },
}
</script>
