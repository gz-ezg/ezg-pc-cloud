<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px">
                <!-- <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="企业名称：" prop="companyName">
                                            <Input v-model="formValidateSearch.companyName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                <Col span="8">
                                    <FormItem label="关联关系：" prop="type">
                                        <Select size="small" v-model="formValidateSearch.type">
                                            <Option value="all">全部</Option>
                                            <Option value="inRelation">关联</Option>
                                            <Option value="notInRelation">不关联</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <center>
                                <FormItem>
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Panel>
            </Collapse> -->
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                :loading="loading"
                highlight-row
                size="small"
                border
                :columns="header"
                :data="data"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-elevator
                :current.sync="page"
                @on-change="pageChange"
                style="margin-top: 10px;padding-bottom:10px"></Page>
        </Row>
    </Card>    
    </div>
</template>

<script>
export default {
    name: "customerRate_index",
    data(){
        return {
            data: [],
            header: [
                {
                    title: "序号",
                    type: 'index',
                    width: 80
                },
                {
                    title: "公司名称",
                    minWidth: 200,
                    render: (h, params) => {
                        let temp = []
                        for(let i = 0; i<params.row.itemObj.length; i++){
                            temp.push(params.row.itemObj[i].company_name)
                        }
                        return h('div', temp.join(","))
                    }
                },
                {
                    title: "产品名称",
                    minWidth: 200,
                    render: (h, params) => {
                        let temp = []
                        for(let i = 0; i<params.row.itemObj.length; i++){
                            temp.push(params.row.itemObj[i].product_name)
                        }
                        return h('div', temp.join(","))
                    }
                },
                {
                    title: "服务人员",
                    minWidth: 120,
                    render: (h, params) => {
                        return h('div', params.row.itemObj[0].server_name)
                    }
                },
                {
                    title: "评价完结",
                    minWidth: 120,
                    key: "status"
                },
                {
                    title: "专业能力",
                    minWidth: 120,
                    key: "ability_ranks"
                },
                {
                    title: "服务态度",
                    minWidth: 120,
                    key: "ability_ranks"
                },
                {
                    title: "服务态度",
                    minWidth: 120,
                    key: "service_ranks"
                },
                {
                    title: "意见与反馈",
                    minWidth: 120,
                    key: 'customer_memo'
                },
                {
                    title: "评价时间",
                    minWidth: 120,
                    key: "evaluate_time"
                }
            ],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
            search_model: "",
            formValidateSearch: {
                companyName: "",
                type: ""
            }
        }
    },
    methods: {
        Search() {
            this.page = 1
            this.get_data()
        },
        pageChange(e) {
            this.page = e
            this.get_data()
        },
        handleReset() {
            this.page = 1
            this.$refs["formValidateSearch"].resetFields()
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = 'api/customer/work/order/callback/list'
            
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: "id",
                    order: "desc"
                }
            }
            
            function success(res){
                _self.loading = false
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                for(let i = 0; i<_self.data.length; i++){
                    _self.data[i].itemObj = JSON.parse(_self.data[i].items)
                    if(_self.data[i].callback_status == "Y"){
                        _self.data[i].status = "完成"
                    }else{
                        _self.data[i].status = "未完成"
                    }
                    if(_self.data[i].evaluate_time){
                        _self.data[i].evaluate_time = _self.data[i].evaluate_time.slice(0,10)
                    }
                }
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
