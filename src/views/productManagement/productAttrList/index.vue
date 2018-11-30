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
                                        <FormItem label="产品名称：" prop="product">
                                            <Input v-model="formValidate.product" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="产品编码：" prop="productCode">
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
            
            <Row style="margin-top: 10px;" :gutter="20">
                <Col span="12">
                    <Row style="margin-bottom:10px" :gutter="20">
                        <Col>
                            <Button type="primary" @click="openCreateAttr=true">新增属性</Button>
                        </Col>
                    </Row>
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
                    <product-attr-list style="margin-left:5px" :productAttr="selectRow"></product-attr-list>
                </Col>
            </Row>
        </Card>
        <create-attr v-if="openCreateAttr" @close="openCreateAttr=false"></create-attr>
    </div>
</template>

<script>
import productAttrList from './editProductAttr'
import createAttr from './createAttr'
export default {
    name: "productAttrList_index",
    components:{
        productAttrList,
        createAttr
    },
    data(){
        return {
            openCreateAttr: false,
            search_model: "",
            loading: false,
            header: [
                // {
                //     title: "序号",
                //     type: "index",
                //     width: 90
                // },
                {
                    title: "分类",
                    key: "typeName",
                    minWidth: 150
                },
                {
                    title: "属性名称",
                    key: "name",
                    minWidth: 150,
                },
                // {
                //     title: "产品编码",
                //     key: "productCode",
                //     minWidth: 150
                // },
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
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    'marginLeft': '5px'
                                }
                            },[
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要删除此附件吗！',
                                    },
                                    on: {
                                        'on-ok': ()=>{
                                            this.deleteProductAttr(params.row.id)
                                        },
                                    }
                                }, '删除')
                            ])
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
            let url = `api/product/property/list`
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
        },
        //  删除属性
        deleteProductAttr(e){
            let url = `api/product/property/delProperty`

            let config = {
                params: {
                    id: e.id
                }
            }

            function success(res){
                _self.$Message.success("删除成功！")
                _self.get_data()
            }

            function fail(err){
                _self.$Message.error("删除失败！")
            }

            this.$Get(url, config, success, fail)
        },
        create_attr(){

        }
    },
    watch:{

    },
    created(){
        this.get_data()
    }
}
</script>
