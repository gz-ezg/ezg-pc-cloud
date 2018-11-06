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
                    title: "id",
                    key: "id",
                    minWidth: 90
                },
                {
                    title: "队列名称",
                    key: 'queues',
                    minWidth: 180
                },
                {
                    title: "状态",
                    key: 'status',
                    minWidth: 120
                },
                {
                    title: "内容",
                    key: 'content',
                    minWidth: 300,
                    // tooltip: true 3.0的设置
                //     render:(h, params) => {
                //         if(params.row.content == ''|| params.row.content == null){
                //             return ''
                //         }else if(params.row.content.length>20){
                //             return h('Poptip',{
                //                 props:{
                //                     trigger:'hover',
                //                     placement:'bottom',
                //                     wordWrap:'true'
                //                 }
                //             },[
                //                 h('span',params.row.content.slice(0,20)+'...'),
                //                 h('Icon', {
                //                     props: {
                //                     type: 'arrow-down-b',
                //                     }
                //                 }),
                //                 h('div',{
                //                     slot:'content',
                //                     style:{
                //                         width:'250px',
                //                     }
                //                 },[
                //                     h('span', params.row.content)
                //                 ])
                //             ])
                //         }else{
                //             return h('span', params.row.content)
                //         }
                //     }
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    minWidth: 200
                },
                {
                    title: '方法名',
                    key: 'method_name',
                    minWidth: 120
                },
                {
                    title: '操作',
                    key: 'action',
                    minWidth: 120,
                    render:(h,params)=>{
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.resend(params.row.id)
                                    }
                                }
                            }, '[ 重发 ]')]
                        )
                    }
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
            let url = `api/system/showMQLogInfo`

            let config = {
                createDate: "",
                page: 1,
                pageSize: 10,
                sortField: "id",
                order: "desc",
                status: "fail"
            }

            function success(res){  
                console.log(res)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                _self.loading = false
            }

            function fail(res){
                console.log(res)
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
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
