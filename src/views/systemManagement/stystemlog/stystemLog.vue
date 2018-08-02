<template>
    <div>
        <Row>
            <Table
                highlight-row
                size="small"
                :loading="tableLoading"                                
                :columns="headers"
                :data="data"></Table>
        </Row>
    </div>
</template>

<script>
export default {
    methods:{
        get_data(){
            let _self = this
            let url = `api/system/getLogList`

            let config = {}

            function success(res){
                // console.log(res)
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    },
    data(){
        return{
            data:[],
            tableLoading:false,
            headers:[
                {
                    title:"日志",
                    key: "fileName"
                },
                {
                    title:"操作",
                    ket:"action",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        let url = `api/zuul/downLoadLogFile`

                                        let config = {
                                            params:{
                                                fileName: params.row.fileName
                                            }
                                        }
                                        window.open("/api/zuul/downLoadLogFile?fileName="+params.row.fileName)
                                    }
                                }
                            }, '下载')
                        ])
                    }
                }
            ]
        }
    }
}
</script>

