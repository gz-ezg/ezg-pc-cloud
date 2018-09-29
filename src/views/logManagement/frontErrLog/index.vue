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
    name: "frontErrLog_index",
    data(){
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "router",
                    key: "name",
                    minWidth: 250
                },
                {
                    title: "hook",
                    key: "hook",
                    minWidth: 200
                },
                {
                    title: "err",
                    key: "err",
                    minWidth: 300
                },
                {
                    title: "createdate",
                    key: "createdate",
                    minWidth: 150
                },
                {
                    title: "realname",
                    key: "realname",
                    minWidth: 150
                },
            ],
            loading: false
        }
    },
    methods:{
        get_data(){
            let _self = this
            let url = `api/system/fontErrList`
            _self.loading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: "id"
                }
            }

            function success(res){
                _self.loading = false
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
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

