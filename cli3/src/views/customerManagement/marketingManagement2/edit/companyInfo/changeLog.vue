<template>
    <div>
        <Modal
            v-model="openComNameLog"
            width = "680"
            title = "公司名称变更日志"             
            >
            <Row style="margin-top: 10px;">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data: [],
            header: [
                {
                    title:"变更前公司名称",
                    key: 'oldValue',
                    minWidth: 160
                },
                {
                    title: "变更后公司名称",
                    key: 'newValue',
                    minWidth: 160
                },
                {
                    title: "修改时间",
                    key: 'updateDate',
                    minWidth: 160
                },
                {
                    title: "操作人员",
                    key: 'realname',
                    minWidth: 160
                }
            ],
            loading: false,
            openComNameLog: false
        }
    },
    methods: {
        get_data(e){
            let _self = this;
            _self.$ButtonCollect("marketingManagement_index_company_businessinfo_namelog");
            _self.loading = true
            let url = `api/customer/company/companyNameChangeLogList`

            let config = {
                params:{
                    companyid: e,
                    page: 1,
                    pageSize: 100,
                    sortField: "updateDate"
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.loading = false
            }

            this.$Get(url,config,success)
        }
    },
    created(){
        this.$bus.off("OPEN_COMPANY_LOG", true)
        this.$bus.on("OPEN_COMPANY_LOG", (e)=>{
            this.get_data(e)
            this.openComNameLog = true
        })
    }
}
</script>

