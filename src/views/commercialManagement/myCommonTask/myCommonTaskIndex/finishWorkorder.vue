<template>
    <div>
        <Modal
            title="完结证明"
            v-model="openFinishWorkorder"
            width="400"
        >
        <Table
            ref="selection"
            highlight-row
            size="small"
            :columns="header"
            :data="data"
            :loading="loading"
        >
        </Table>
        <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
            openFinishWorkorder: false,
            header:[
                {
                    title: "创建时间",
                    key: 'createdate',
                    width: 150
                },
                {
                    title: "#",
                    key: "realpath",
                    render:(h, params) => {
                            // console.log(params)
                        if(params.row.realpath == ''||params.row.realpath == null){
                            return ''
                        }else{
                            return h('div',{
                                    },[
                                        h('img',{
                                            domProps: {
                                                height: 100,
                                                src: '/api/assets/'+params.row.realpath,
                                            },
                                            on:{
                                                click:() => {
                                                    window.open('/api/assets/'+params.row.realpath)
                                                }
                                            }
                                        })
                                    ])
                        }
                    }
                }
            ],
            data: []
        }
    },
    methods:{
        get_data(e){
            let _self = this
            _self.loading = true
            _self.openFinishWorkorder = true
            let url = 'api/legwork/showAttendancePictuer'

            let config = {
                params:{
                    workorderId: e,
                    page: 1,
                    pageSize: 100,
                    sortField: "createdate",
                    order: "desc"
                }
            }

            function success(res){
                _self.loading = false
                // console.log(res.data.data.rows)
                _self.data = res.data.data.rows
            }

            _self.$Get(url, config, success)
        }
    },
    created() {
        let _self = this
        _self.$bus.on("OPEN_FINISH_WORKORDER",(e)=>{
            // console.log(e)
           _self.get_data(e) 
        })
    },
}
</script>
