<template>
    <div>
        <Modal
            v-model="openDetail"
            title="交接详情"
            width="80%">
            <Row :gutter="20">
                <Col span="12"><span><h3>申请人：{{detailApplicantRealname}}</h3></span></Col>
                <Col span="12"><span><h3>接收人：{{detailReceiverRealname}}</h3></span></Col>
            </Row>
            <Row :gutter="20">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="fileHeader"
                    :data="fileData"
                    style="margin-top:10px"
                >
                </Table>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openDetail: false,
            fileHeader: [
                {
                    title: "序号",
                    type: 'index',
                    minWidth: 90
                },
                {
                    title: "资料名称",
                    key: "customer_file_name",
                    minWidth: 150
                },
                {
                    title: "所属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "客户名称",
                    key: "name",
                    minWidth: 150
                },
                {
                    title: "文件数量",
                    key: "file_num",
                    minWidth: 120
                },
                {
                    title: "交接数量",
                    key: "connect_num",
                    minWidth: 120
                },
                {
                    title: "存放部门",
                    key: "departname",
                    minWidth: 120
                },
                {
                    title: "存放地点",
                    key: "storage",
                    minWidth: 120
                },
                {
                    title: "存放位置",
                    key: "storage_code",
                    minWidth: 120
                }
            ],
            fileData: [],
            detailApplicantRealname: "",
            detailReceiverRealname: "",
            customer_f_s_a: "",
            customer_f_s_a_map: new Map()
        }
    },
    methods:{
        get_data(e){
            let _self = this
            let url = "api/customer/file/connect/request/detail"

            let config = {
                params: {
                    id: e
                }
            }

            function success(res){
                _self.detailApplicantRealname = res.data.data.applicant_name
                _self.detailReceiverRealname = res.data.data.receiver_name
                _self.fileData = res.data.data.files
                for(let i = 0; i < _self.fileData.length; i++){
                    _self.fileData[i].storage = _self.customer_f_s_a_map.get(_self.fileData[i].storage)
                }
                _self.openDetail = true

            }

            this.$Get(url, config, success)
        },
        get_center(){
            let _self = this
            let params = "customer_f_s_a"
            function success(res){
                _self.customer_f_s_a = res.data.data.customer_f_s_a
                _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
            }
            _self.$GetDataCenter(params, success)
        }
    },
    created() {
        let _self = this
        this.get_center()
        this.$bus.on("OPEN_HANDOVER_DETAIL",(e)=>{
            _self.get_data(e)
        })
    },
}
</script>

