<template>
    <div>
        <Modal
            title="修改申请"
            v-model="update_request"
            width="70%"
        >
            <Row>
                <span>申请人：</span><span style="padding-right:100px">{{data.applicant_name}}</span>
                <span>接收人：</span><span>{{data.receiver_name}}</span>
            </Row>
            <Row style="margin-top:10px">
                <tables
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    v-model="files"
                >
                </tables>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>

import tables from '../../woa-components/tables/tables'

export default {
    components:{
        tables
    },
    data(){
        return{
            update_request: false,
            id: "",
            data: {
                applicant_name: "",
                receiver_name: "",
                application_memo: ""
            },
            loading: false,
            header:[
                {
                    title: '移除',
                    key: 'handle',
                    minWidth: 90,
                    button: [
                        (h, params, vm) => {
                            return h('Icon', {
                                props:{
                                    type:"close"
                                },
                                on:{
                                    click: ()=>{
                                        console.log(params.row)
                                        let url = "api/customer/file/connect/request/file/del"
                                        let config = {
                                            id: params.row.id
                                        }

                                        function success(res){

                                        }

                                        function fail(err){

                                        }

                                        this.$Post(url, config, success)
                                        vm.$emit('on-delete', params)
                                        vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                                    }
                                }
                            })
                        }
                    ]
                },
                {
                    title: "资料名称",
                    key: "file_type_name",
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
                }
            ],
            files:[]
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
                console.log(res.data.data)
                _self.data = res.data.data
                _self.files = res.data.data.files
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_UPDATE_RESOURE_FILE", (e)=>{
            console.log(e)
            _self.id = e.id
            _self.update_request = true
            _self.get_data(e.id)
        })
    },
}
</script>

