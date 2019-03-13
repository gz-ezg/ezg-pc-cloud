<template>
    <div>
        <Modal
            v-model="openRelateOrder"
            title="对应异常工单"
            width="70%">
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="header"
                    :data="data"
                    ></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { DateFormat } from '../../../../libs/utils.js'

export default {
    props: {
        id: {
            type: [String, Number]
        }
    },
    data(){
        return {
            openRelateOrder: false,
            header: [
                {
                    title: '订单号码',
                    key: 'unusualCode',
                    minWidth:100
                },
                {
                    title: '产品内容',
                    key: 'productContent',
                    minWidth:150
                },
                {
                    title: '异常类型',
                    key: 'unusualType',
                    minWidth:80
                },
                {
                    title: '审批是由',
                    key: 'applyMemo',
                    minWidth:200
                },
                {
                    title: '流程状态',
                    key: 'currentProcessName',
                    minWidth:100
                },
                {
                    title: '创建时间',
                    key: 'createDate',
                    minWidth:100
                },
                {
                    title: '更新时间',
                    key: 'updateDate',
                    minWidth:100
                }
            ],
            data: [],
            loading: false,
            //数据字典
            unusualType:[],
            unusualType_map: new Map()
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
            let url = `api/order/unusual/workorder/findUnusualWorkOrderByOrderId`
            let config ={
                params:{
                    orderId: this.id
                }
            }
            function success(res){
                console.log(res)
                if(!res.data.data){
                    return
                }
                _self.data.push({
                    applyMemo: res.data.data.apply_memo,
                    companyId: res.data.data.company_id,
                    createBy: res.data.data.createBy,
                    createDate: DateFormat(res.data.data.create_date),
                    updateDate: DateFormat(res.data.data.update_date),
                    id: res.data.data.id,
                    currentProcessName: res.data.data.current_process_name,
                    productContent: res.data.data.product_content,
                    unusualCode: res.data.data.unusual_code,
                    unusualType: _self.unusualType_map.get(res.data.data.unusual_type)
                })
            }
            this.$Get(url,config,success)
        }
    },
    created() {
        let _self = this
        this.$bus.off("RELATE_ORDER_TWO", true)
        this.$bus.on("RELATE_ORDER_TWO", (e)=>{
            _self.get_data_center().then(
                _self.get_data()
            )
            _self.openRelateOrder = true
            this.data = []
        })
    },
}
</script>
