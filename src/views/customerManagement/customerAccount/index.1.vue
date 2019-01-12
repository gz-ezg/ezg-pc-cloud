<template>
    <Card style="min-width:800px">
        <Row style="margin-bottom:10px;">
            <search @search="search"></search>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading = "loading"
            ></Table>
            <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="page_change"
                    @on-page-size-change="page_size_change"
                    style="margin-top: 10px"></Page>
            </Row>
            <detail 
                :accountChangeType="accountChangeType" 
                :accountChangeItemType="accountChangeItemType"
                @close="openDetail=false"
                v-if="openDetail"
                :id="currentId" 
            ></detail>
    </Card>
</template>

<script>
import search from './search'
import detail from './detail'
export default {
    name: "customerAccount_index",
    components: {
        detail,
        search
    },
    data(){
        return {
            form: {},
            openDetail: false,
            data: [],
            header: [
                {
                    title: "序号",
                    type: "index",
                    width: 90
                },
                {
                    title: "客户",
                    key: "name",
                    minWidth: 150
                },
                {
                    title: "联系方式",
                    key: "tel",
                    minWidth: 150
                },
                {
                    title: "账户余额",
                    key: "account_amount",
                    minWidth: 180
                },
                {
                    title: "冻结余额",
                    key: "lock_amount",
                    minWidth: 180
                },
                {
                    title: "操作",
                    width: 120,
                    render: (h, params) => {
                        return h('Button',{
                            props: {
                                type: "info",
                                size: "small"
                            },
                            on: {
                                click: ()=>{
                                    this.currentId = params.row.id
                                    this.openDetail = true
                                    // console.log(params.row.id)
                                }
                            }
                        }, "流水")
                    }
                }
            ],
            loading: false,
            total: 0,
            page: 1,
            pageSize: 10,
            accountChangeType: new Map(),
            accountChangeItemType: new Map(),
            currentId: "",
            searchForm: ""
        }
    },
    methods: {
        search(e){
            console.log(e)
            this.searchForm = e
            if(this.searchForm.hasOwnProperty("createdate")){
                this.searchForm["bcreatedate"] = this.searchForm.createdate[0]
                this.searchForm["ecreatedate"] = this.searchForm.createdate[1]
                delete this.searchForm.createdate
            }
            this.get_data()
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = `api/customer/account/list`
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            Object.assign(config.params, this.searchForm)
            for(let x in config.params){
                if(config.params[x]==undefined){
                    config.params[x] = ""
                }
            }
            console.log(config.params)

            function success(res){
                let {total, rows} = res.data.data
                _self.total = total
                _self.data = rows.map((item)=>{
                    return item
                })
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.page = 1
            this.get_data()
        },
        get_data_center(){
            let _self = this
            let params = "account_change_type,account_change_item_type"

            function success(res){
                let {account_change_type, account_change_item_type} = res.data.data
                _self.accountChangeType = _self.$array2map(account_change_type)
                _self.accountChangeItemType = _self.$array2map(account_change_item_type)
                // console.log(account_change_type, account_change_item_type)
            }

            this.$GetDataCenter(params,success)
        }
    },
    created(){
        this.get_data()
        this.get_data_center()
    }

}
</script>

<style>
    
</style>