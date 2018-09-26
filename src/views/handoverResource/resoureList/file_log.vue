<template>
    <div>
        <Modal
            title="交接记录"
            v-model="openFileLog"
            width="80%"
        >
            <Row>
                <Col span="12">
                    <h3>资料名称：{{fileName}}</h3>
                </Col>
                <Col span="12">
                    <h3>归属公司：{{companyName}}</h3>
                </Col>
            </Row>
            <Row style="margin-top:10px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :loading="loading"
                    :columns="header"
                    :data="data"
                >
                </Table>
                <Page
                    placement="top"
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>

export default {
    props:{
        customer_f_s_a:{
            type: Map
        }
    },
    data(){
        return{
            openFileLog: false,
            fileId: "",
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            loading: false,
            header: [
                {
                    title: "交接人",
                    key: "applicant_name",
                    minWidth: 120
                },
                {
                    title: "接收人",
                    key: "receiver_name",
                    minWidth: 120
                },
                {
                    title: "接收数量",
                    key: "customer_file_num",
                    minWidth: 120
                },
                {
                    title: "交接部门",
                    key: "old_departname",
                    minWidth: 120
                },
                {
                    title: "接收部门",
                    key: "new_departname",
                    minWidth: 120
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    minWidth: 180
                },
                {
                    title: "存放地点",
                    key: "new_storage",
                    minWidth: 120
                },
                {
                    title: "存放位置",
                    key: "new_storage_code",
                    minWidth: 120
                }
            ],
            fileName: "",
            companyName: ""
        }
    },
    methods:{
        get_data(){
            let _self = this
            let url = `api/customer/file/connect/request/log/list`

            _self.loading = true
            let config = {
                params:{
                    customer_file_id: _self.fileId,
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                _self.loading = false
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                // console.log(_self.customer_f_s_a)
                for(let i = 0;i<_self.data.length;i++){
                    _self.data[i].new_storage = _self.customer_f_s_a.get(_self.data[i].new_storage)
                }
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_FILE_LOG", (e)=>{
            // console.log(e)
            _self.fileName = e.file_type_name
            _self.companyName = e.companyname
            _self.fileId = e.id
            _self.get_data()
            _self.openFileLog = true
        })
    },
}
</script>
