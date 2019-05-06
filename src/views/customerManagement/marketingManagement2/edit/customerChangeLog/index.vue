<template>
    <div>
        <Table
            border
            highlight-row
            size="small"
		    :loading="loading"
            @on-row-click="select_row"
            :columns="header"
            :data="data"
            style="margin-top: 15px"
        ></Table>

    </div>
</template>

<script>

export default {
    props: {
        customer: {
            type: [Array, Object, String]
        }
    },
    data(){
        return {
            loading: false,
            header: [
                {
                    title: '更改之前',
                    key: 'change_before',
                    minWidth: 140,                                      
                },
                {
                    title: '更改之后',
                    key: 'change_after',
                    minWidth: 300,                                              
                },
                {
                    title: '修改类型',
                    key: 'typ',
                    minWidth: 180
                },
                {
                    title: '修改时间',
                    key: 'createdate',
                    minWidth: 120,
                    // sortable: "custom"                                                
                },
                {
                    title: '修改人',
                    key: 'NAME',
                    minWidth: 140,
                    // sortable: "custom"                                                
                }
            ],
            data: [],
            customer_contact_log_map: new Map(),
            customer_contact_log:[],
            selectRow: ""
        }
    },
    methods: {
        get_data(e){
            let _self = this
            let url = `api/customer/customerCantactLog/customerCantactLogList`
            _self.loading = true
            let config = {
                params: {
                    customerId: _self.customer.ID,
                    sortField: "id",
                    order: "desc"
                }
            }

            function success(res){
                _self.data = res.data.data

                for(let i = 0; i < _self.data.length; i++){
                    _self.data[i].typ = _self.customer_contact_log_map.get(_self.data[i].typ)

                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },

        get_data_center(){
            let _self = this
            return new Promise((resolve, reject)=>{
                let params = "customer_contact_log"

                function success(res){
                    _self.customer_contact_log = res.data.data.customer_contact_log
                _self.customer_contact_log_map = _self.$array2map(_self.customer_contact_log)
                    resolve()
                }

                this.$GetDataCenter(params, success)
            })
        },
        select_row(e){
            if(e.id){
                this.selectRow = e
            }else{
                this.selectRow = ""
            }
        },

    },
    created(){
        let _self = this
        this.get_data_center().then(()=>{
            _self.get_data(_self.customer.ID)
        })
    }
}
</script>

<style>
.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color:#000;
}
</style>
