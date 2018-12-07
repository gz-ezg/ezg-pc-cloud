<template>
    <div>
        <Card :title="title">
            <div>
                {{$route.query}}
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title: this.$route.query.type == "dealCycle"? "客户成交周期详情" : "二次成交比例详情",
            page: 1,
            pageSize: 10,
            loading: false
        }
    },
    watch:{
        '$route'(to, from){
            this.get_data(to.query)
        }
    },
    methods: {
        get_data(params){
            let _self = this
            this.loading = true
            if(params.type == "dealCycle"){
                _self.get_deal_cycle(params)
            }else{
                _self.get_second_deal(params)
            }
        },
        get_deal_cycle(params){
            let config = {
                params: {

                }
            }
            let url = `api/crm/sale/index/customer/deal/cycle/list`
            // type=dealCycle&dealType=c1&idType=depart&id=${params.row.id}
            if(params.idType == 'depart'){
                config.params.departId = params.id
            }else{
                config.params.userId = params.id
            }
            
            if(params.dealType == 'c1'){
                config.params.c1 = 1
            }else if(params.dealType == 'c2'){
                config.params.c2 = 1
            }else if(params.dealType == 'c3'){
                config.params.c3 = 1
            }else{
                config.params.c4 = 1
            }

            config.params.page = this.page
            config.params.pageSize = this.pageSize
            config.params.bcreatedate = ''
            config.params.ecreatedate = ''

            this.get_all_data(url, config)
        },
        get_second_deal(params){

        },
        get_all_data(url, config){
            let _self = this
            function success(res){
                console.log(res)
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data(this.$route.query)
    }
}
</script>

