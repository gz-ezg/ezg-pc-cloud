<template>
    <div>
        <Card>
            <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="search">
                            <Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户名称：" prop="product">
                                            <Input v-model="formValidate.product" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="电话：" prop="productCode">
                                            <Input v-model="formValidate.productCode" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem style="margin-top:10px">
                                        <Button type="primary" name="marketingManagement_index_edit_search" @click="search">搜索</Button>
                                        <Button type="ghost" name="marketingManagement_index_edit_reset" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            <Row style="margin-top: 10px;">
                <Col span="12">
                    <Table
                        :loading="loading"
                        highlight-row 
                        border
                        size="small"
                        :columns="header"
                        @on-current-change="select_row"
                        :data="data"></Table>
                    <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="page_change"
                        @on-page-size-change="page_size_change"
                        style="margin-top: 10px"></Page>
                </Col>
                <Col span="12">
                    <product-attr :product="selectRow"></product-attr>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import productAttr from './productAttr'
export default {
    components:{
        productAttr
    },
    data(){
        return {
            search_model: "",
            loading: false,
            header: [
                // {
                //     title: "序号",
                //     type: "index",
                //     width: 90
                // },
                {
                    title: "产品名称",
                    key: "product",
                    minWidth: 180
                },
                {
                    title: "状态",
                    key: "statusText",
                    minWidth: 90,
                },
                {
                    title: "产品编码",
                    key: "productCode",
                    minWidth: 150
                },
                {
                    title: "操作",
                    key: "action",
                    width: 180,
                    render: (h, params) => {
                        return h("div", [
                            h("Button",{
                                props:{
                                    type: "primary",
                                    size: "small",
                                },
                                style:{
                                    marginRight: "5px"
                                }
                            }, "编辑"),
                            // h("Button",{
                            //     props:{
                            //         type: "primary",
                            //         size: "small",
                            //     },
                            //     style:{
                            //         marginRight: "5px"
                            //     }
                            // }, "修改价格"),
                            // h("Button",{
                            //     props:{
                            //         type: "info",
                            //         size: "small",
                            //     },
                            //     style:{
                            //         marginRight: "5px"
                            //     }
                            // }, "查看价格"),
                            h("Button",{
                                props:{
                                    type: "warning",
                                    size: "small",
                                    icon: "trash-a",
                                    disabled: true
                                }
                            }, "删除"),
                        ])
                    }
                }
            ],
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            selectRow: "",
            formValidate: {
                product: "",
                productCode: ""
            }
        }
    },
    methods:{
        get_data(){
            let _self = this
            let url = `api/product/list`
            _self.loading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    product: _self.formValidate.product,
                    productCode: _self.formValidate.productCode
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0;i<_self.data.length; i++){
                    if(_self.data[i].status == 0){
                        _self.data[i].statusText = "下架"
                    }else{
                        _self.data[i].statusText = "在售"
                    }
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.page = 1
            this.pageSize = e
            this.get_data()
        },
        search(){
            this.page = 1
            this.get_data()
        },
        handleReset(){
            this.page = 1
            this.$refs["formValidate"].resetFields()
            this.get_data()
        },
        select_row(e){
            this.selectRow = e
        }
    },
    watch:{

    },
    created(){
        this.get_data()
    }
}
</script>
