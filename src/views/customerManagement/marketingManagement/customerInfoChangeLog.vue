<template>
    <Modal
        title="客户日志"
        v-model="isOpenCustomerLog"
        width="90%"
    >
        <Row><center><h2>客户名称：{{customerName}}</h2></center></Row>
          <Row style="margin-top: 10px;">
            <Table
                    highlight-row
                    size="small"
                    :columns="columns"
                    :data="data"
                    :loading = "loading"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    data(){
        return{
            isOpenCustomerLog: false,
            loading: false,
            page: 1,
            pageSize: 10,
            columns: [
                {
                    title:"公司名称",
                    key:"companyname"
                },
                {
                    title:"类型",
                    key: "typename"
                },
                {
                    title:"动态",
                    key:"content",
                    width:250,
                    render: (h, params) => {
                            // console.log(params)
                            if(params.row.content == ''||params.row.content == null){
                                return ''
                            }else if(params.row.content.length>15){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.content.slice(0,15)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:"200px",
                                            whiteSpace: "normal"
                                        }
                                    },[
                                        h('span',params.row.content)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.content)
                            }
                        }
                },
                {
                    title: "变更时间",
                    key:"createdate",
                    width: 150
                },
                {
                    title: "操作人",
                    key: "realname",
                    width: 150
                }
            ],
            data: [],
            pageTotal: new Number(),
            customerId: "",
            customerName: "",
            customerDynamicType: []
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = `api/customer/dynamic/record/list`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    customer_id: _self.customerId
                }
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    if(_self.data[i].type){
                        _self.data[i].typename = _self.find_customer_dynamic_type(_self.data[i].type)
                    }
                }
            }

            this.$Get(url, config, success)
        },
        find_customer_dynamic_type(type){
            let _self = this
            let temp = type.split("-")
            for(let i = 0; i<_self.customerDynamicType.length;i++){
                if(_self.customerDynamicType[i].typecode == temp[0]){
                    if(temp.length>1){
                        for(let j = 0; j<_self.customerDynamicType[i].children.length; j++){
                            if(_self.customerDynamicType[i].children[j].typecode == temp[1]){
                                return _self.customerDynamicType[i].typename + ' - ' + _self.customerDynamicType[i].children[j].typename
                                break
                            }
                        }
                    }
                }
            }
        },
        get_data_center(){
            // let _self = this
            // let params = "customer_dynamic_type"

            // function success(res){
            //     _self.customerDynamicType = res.data.data.customer_dynamic_type
            //     _self.get_data()
            // }

            // this.$GetDataCenter(params, success)

            return new Promise((resolve,reject) => {
                let _self = this
                let params = "customer_dynamic_type"

                function success(res){
                    _self.customerDynamicType = res.data.data.customer_dynamic_type
                    // _self.get_data()
                    resolve()
                }

                this.$GetDataCenter(params, success)
            })
        }
    },
    created(){
        let _self = this

        this.$bus.on("OPEN_CUSTOMER_INFO_LOG",(e)=>{
            _self.customerId = e[0]
            _self.customerName = e[1]
            _self.isOpenCustomerLog = true
            _self.get_data_center().then(()=>{
                _self.get_data()
            })
        })
    }
}
</script>

