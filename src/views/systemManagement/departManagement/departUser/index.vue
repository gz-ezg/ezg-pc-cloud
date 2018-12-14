<template>    
    <div>
        <Table
            highlight-row
            size="small"
            :loading="loading"
            :columns="header"
            :data="data"></Table>
        <Page
            size="small"
            :total="total"
            show-total
            show-elevator
            :current.sync="page"
            @on-change="page_change"
            style="margin-top: 10px"></Page>
    </div>
</template>

<script>
export default {
    props: {
        departId: {
            type: [String, Number],
            default: ""
        }
    },
    watch: {
        "departId"(){
            this.get_data()
        }
    },
    data(){
        return {
            data: [],
            header: [
                {
                    title: "序号",
                    type: "index",
                    minWidth: 90
                },
                {
                    title: "用户名",
                    key: "username",
                    minWidth: 120
                },
                {
                    title: "真实姓名",
                    key: "realname",
                    minWidth: 120
                },
                {
                    title: "状态",
                    key: "status",
                    minWidth: 90
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 120,
                    render: (h, params) => {
                        return h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    'marginLeft': '5px'
                                }
                            },[
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要移除此用户吗！',
                                    },
                                    on: {
                                        'on-ok': ()=>{
                                            // console.log(params.row.id)
                                            this.del_depart_user(params.row.id)
                                        },
                                    }
                                }, '移除')
                            ])
                    }
                }
            ],
            page: 1,
            total: 0,
            loading: false,
        }
    },
    methods: {
        get_data(){
            if(this.departId){
                let _self = this
                _self.loading = true
                let url = `api/user/list`
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: 10,
                        departid: _self.departId
                    }
                }

                function success(res){
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i<_self.data.length; i++){
                        if(_self.data[i].status == 1){
                            _self.data[i].status = "激活"
                        }else{
                            _self.data[i].status = "未激活"
                        }
                    }
                    _self.loading = false
                }

                this.$Get(url, config, success)
            }
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        del_depart_user(e){
            let _self = this
            let url = `api/system/depart/user/del`

            let config = {
                userId: e,
                departId: _self.departId
            }

            function success(res){
                _self.get_data()
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        console.log(this.departId)
        this.get_data()
    },
}
</script>
