<template>
    <div>
        <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
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
            </Collapse>
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            data: [],
            header: [
                {
                    title: "序号",
                    type: 'index',
                    minWidth: 90
                },
                {
                    title: "服务人员",
                    key: "kj_name",
                    minWidth: 120
                },
                {
                    title: "企业名称",
                    key: "qybdname",
                    minWidth: 250,
                    render: (h, params) => {
                        return h('div', params.row.qybdname.split("（")[0])
                    }
                },
                {
                    title: "用户名",
                    key: "user_name",
                    minWidth: 150
                },
                {
                    title: "报税税期",
                    key: "bs_month",
                    minWidth: 150
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
            let url = 'api/customer/company/gdetax/etaxQyList'
            
            _self.loading = true
            let config

            if(_self.formValidateSearch.type == "notInRelation"){
                config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        qybdName: _self.formValidateSearch.companyName,
                        notInRelation: "1"
                    }
                }
            }else if(_self.formValidateSearch.type == "inRelation"){
                config = {
                    params:{
                        page: _self.page,
                        pageSize: _self.pageSize,
                        qybdName: _self.formValidateSearch.companyName,
                        inRelation: "1"
                    }
                }
            }else{
                config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        qybdName: _self.formValidateSearch.companyName,
                    }
                }
            }

            function success(res){
                _self.loading = false
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
