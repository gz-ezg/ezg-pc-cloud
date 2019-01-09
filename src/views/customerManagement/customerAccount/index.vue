<template>
    <Card style="min-width:800px">
        <Row style="margin-bottom:10px;">
            <search @search="search">
            </search>
            <!-- <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        
                            <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户名称：" prop="name">
                                            <Input v-model="formValidate.name" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="电话：" prop="tel">
                                            <Input v-model="formValidate.tel" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidate.companyname" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="类型：" prop="type">
                                            <Select transfer v-model="formValidate.type" size="small" @on-change="Search" style="width:100%">
                                                <Option v-for="item in customerDynamicType" :value="item.typecode" :key="item.id">
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="跟进人：" prop="realname">
                                            <Input v-model="formValidate.realname" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem style="margin-top:10px">
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                            重置
                                        </Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse> -->
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