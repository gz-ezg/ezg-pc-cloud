<template>
    <div>
        <Card title="操作统计">
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
                    :total="pageTotal"
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
    name:'MQ_index',
    data(){
        return{
            header:[
                {
                    title: "操作人员",
                    key: 'realname',
                    width: 180
                },
                {
                    title: "操作菜单",
                    key: 'interface_name',
                    width: 120
                },
                {
                    title: '菜单code',
                    key: 'menu_id',
                    width: 120
                },
                {
                    title: "操作时间",
                    key: 'create_date',
                    width: 200,
                }
            ],
            data:[],
            pageTotal:new Number(),
            page: 1,
            pageSize: 10,
            loading:false,
        }
    },
    methods:{
        getData(){
            let _self = this
            _self.loading = true
            let url = `api/system/showClickOnInfo`

            let config = {
                params:{
                    type: 'menu',
                    page: _self.page,
                    pageSize: 10,
                }
            }

            function success(res){
                console.log(res)
                _self.data = res.data.data.mapInfo.rows
                _self.pageTotal = res.data.data.mapInfo.total
                _self.loading = false
            }

            function fail(res){
                console.log(res)
                _self.loading = false
            }

            this.$Get(url, config, success, fail)
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        resend(e){
            let _self = this
            let url = `api/system/mqRequest`
            
            let config = {
                params:{
                    id: e
                }
            }
            function success(res){
                console.log(res)
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.getData()
    }
}
</script>
