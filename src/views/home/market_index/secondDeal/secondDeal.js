export default {
    props: {
        bcreatedate: {
            type: [String],
            default: ''
        },
        ecreatedate: {
            type: [String],
            default: ''
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/crm/sale/index/customer/second/deal`
            _self.loading = true
            let config = {
                params: {
                    type: _self.type,
                    page: _self.page,
                    pageSize: _self.pageSize,
                    bcreatedate: _self.bcreatedate,
                    ecreatedate: _self.ecreatedate
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
        },
    },
    created(){
        this.get_data()
    },
    watch: {
        "bcreatedate"(){
            this.get_data()
        }
    }
}