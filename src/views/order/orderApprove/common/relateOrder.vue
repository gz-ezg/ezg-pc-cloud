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
                    key: 'unusual_code',
                    minWidth:100
                },
                {
                    title: '产品内容',
                    key: 'product_content',
                    minWidth:150
                },
				{
				    title: '公司名称',
				    key: 'companyName',
				    minWidth:150
				},
                {
                    title: '异常类型',
                    key: 'unusual_type',
                    minWidth:80
                },
                {
                    title: '审批是由',
                    key: 'apply_memo',
                    minWidth:200
                },
                {
                    title: '流程状态',
                    key: 'process_type',
                    minWidth:100
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    minWidth:100
                },
                {
                    title: '更新时间',
                    key: 'update_date',
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
                    orderId: _self.id
                }
            }
            function success(res){
                console.log(res)
                if(!res.data.data){
                    return
                }
                _self.data.push({
//                     applyMemo: res.data.data.applyMemo,
//                     companyId: res.data.data.companyId,
//                     createBy: res.data.data.createBy,
//                     createDate: DateFormat(res.data.data.createDate),
//                     updateDate: DateFormat(res.data.data.updateDate),
//                     id: res.data.data.id,
//                     currentProcessName: res.data.data.currentProcessName,
//                     productContent: res.data.data.productContent,
//                     unusualCode: res.data.data.unusualCode,
//                     unusualType: _self.unusualType_map.get(res.data.data.unusualType)
					
					apply_memo: res.data.data.apply_memo,
					companyName:res.data.data.companyName,
					company_id: res.data.data.company_id,
					create_by: res.data.data.create_by,
					create_date: DateFormat(res.data.data.create_date),
					update_date: DateFormat(res.data.data.update_date),
					id: res.data.data.id,
					process_type: res.data.data.process_type,
					product_content: res.data.data.product_content,
					unusual_code: res.data.data.unusual_code,
					unusual_type: _self.unusualType_map.get(res.data.data.unusual_type)
                })
            }
            this.$Get(url,config,success)
        }
    },
    created() {
        let _self = this
        this.$bus.off("RELATE_ORDER", true)
        this.$bus.on("RELATE_ORDER", (e)=>{
            _self.get_data_center().then(
                _self.get_data()
            )
            _self.openRelateOrder = true
            this.data = []
        })
    },
}
</script>
