<template>
    <div>
        <Modal
            id="top"
            ref="log"
            v-model="opencheckMemo"
            title="查看审批备注"
            width="70%"
            @on-cancel="cancel"
            >
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
import { DateFormat } from '../../../../libs/utils.js'

export default {
    data(){
        return {
            loading: false,
            opencheckMemo: false,
            header: [
                {
                    title: '审批情况',
                    key: 'audit_status',
                    minWidth: 100,
                },
                {
                    title: '审批备注',
                    key: 'audit_memo',
                    minWidth: 200,
                },
                {
                    title: '审批时间',
                    key: 'audit_date',
                    minWidth: 150
                },
                {
                    title: '创建人',
                    key: 'audit_user',
                    minWidth: 120
                },
                ],
            data: []
        }
    },
    methods: {
        get_data(e){
            // console.log(e.row.applyId)
            let _self = this
            let url = `api/order/unusual/workorder/getAuditList`
            let config = {
                params: {
                    applyId: e.row.applyId
                }
            }
            function success(res){
                console.log(res.data.data)
                _self.data = res.data.data
                for(let i=0;i<res.data.data.length;i++){
                    if(_self.data[i].audit_status == 'Agree'){
                        _self.data[i].audit_status = '同意'
                    } else{
                        _self.data[i].audit_status = '驳回'
                    }
                }
            }
            this.$Get(url,config,success)
            
            // let b
            // let a = e.row._info.split('_&_')
            // for(let i =0;i<a.length;i++){
            //     b = a[i].split('``')
            //     console.log(b)
            //     if(b[1]=='1' || b[1]=='Agree'){
            //         b[1] = '同意'
            //     }
            //     if(b[1]=='0' || b[1]=='Reject'){
            //         b[1] = '不同意'
            //     }
            //     this.data.push({
            //         'auditName':b[0],
            //         'record':b[1],
            //         'createDate':DateFormat(b[2]),
            //         'recordDesc':b[3]
            //     })
            // }
            // console.log(this.data)
        },
        cancel(){
            this.data = []
        }
    },
    created() {
        let _self = this
        this.$bus.off("AB_APPROVELIST_LOG", true)
        this.$bus.on("AB_APPROVELIST_LOG", (e)=>{
            console.log(e)
            _self.get_data(e)
            _self.opencheckMemo = true
        })
    },
}
</script>

<style>
#top .ivu-modal-mask{
    z-index: 9998
}
#top .ivu-modal-wrap{
    z-index: 9999
}
</style>


