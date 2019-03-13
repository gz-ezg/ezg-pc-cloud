<template>
    <div>
        <Modal
            id="top"
            ref="log"
            v-model="openLog"
            title="查看审批记录"
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
            openLog: false,
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
                    title: '审批人',
                    key: 'audit_user',
                    minWidth: 120
                },
                ],
            data: [],
            applyId: ""
        }
    },
    methods: {
        get_data(e){
            let _self = this
            let url = `api/customer/getAuditList`
            let config = {
                params: {
                    applyId: e
                }
            }
            function success(res){
                console.log(res.data.data)
                _self.data = res.data.data
                for(let i = 0;i<res.data.data.length;i++){
                    _self.data[i].audit_date = DateFormat(_self.data[i].audit_date)
                    if(_self.data[i].audit_status == 'Agree'){
                        _self.data[i].audit_status = '同意'
                    } else {
                        _self.data[i].audit_status = '驳回'
                    }
                }
            }
            this.$Get(url,config,success)
        },
        cancel(){
            this.data = []
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_ADUIT_LOG", true)
        this.$bus.on("OPEN_ADUIT_LOG", (e)=>{
            _self.get_data(e)
            _self.openLog = true
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


