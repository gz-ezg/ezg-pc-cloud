<template>
    <div>
        <Card>
            <Row style="margin-top:10px">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                >
                </Table>
                <Page
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    name: "useRecord_index",
    data(){
        return{
            page: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            data: [],
            header: [
                {
                    title: "公司名称",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "客户名称",
                    key: "customername",
                    minWidth: 120
                },
                {
                    title: "联系方式",
                    key: "customertel",
                    minWidth: 120
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    minWidth: 150
                },
                {
                    title: "创建人",
                    key: "realname",
                    minWidth: 150
                }
            ]
        }
    },
    methods:{
        get_data(){
            let _self = this
            let url = `api/customer/verifyList`
            _self.loading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    },
    created() {
        this.get_data()
    },
}
</script>
