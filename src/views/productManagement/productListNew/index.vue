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
            <Row style="margin-top: 10px">
                <ButtonGroup>
                    <Button @click="create" type="primary">新增产品</Button>
					<Button @click="openEditSKU" type="primary">修改SKU权重</Button>
                </ButtonGroup>
            </Row>
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
                    <product-attr :product="selectRow" style="margin-left:5px"></product-attr>
                </Col>
            </Row>
			<editSKU v-if="editSKU_model"></editSKU>
        </Card>
    </div>
</template>

<script>
import productAttr from './productAttr'
import editSKU from './editSKU'
export default {
    name: "productList_index",
    components:{
        productAttr,
		editSKU
    },
	computed:{
		editSKU_model(){
			return this.$store.state.productListNew.editSKU_model
		}
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
                    width: 220,
                    render: (h, params) => {
                        let _self = this
                        return h("div", [
                            h("Button",{
                                props:{
                                    type: "primary",
                                    size: "small",
                                },
                                style:{
                                    marginRight: "5px"
                                },
                                on: {
                                    "click": function(event){
                                        _self.$router.push({
                                            path: '/productDetail?id=' + params.row.id
                                        })
                                        event.stopPropagation()
                                    }
                                }
                            }, "编辑"),
                            h("Button",{
                                props:{
                                    type: "info",
                                    size: "small",
                                },
                                style:{
                                    marginRight: "5px"
                                },
                                on :{
                                    "click": function(event){
                                        _self.edit_product_price(params.row.id)
                                        event.stopPropagation()
                                    }
                                }
                            }, "修改价格"),
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
        },
        edit_product_price(e) {
            let _self = this;
            this.$router.push({
                name: "updateProductPrice",
                params: {
                    id: e
                },
            });
        },
        create(){
            this.$router.push({
                 path: '/productDetail?id='
            })
        },
		openEditSKU(){
			let _self = this
			if(this.selectRow){
				this.$store.commit("productListNew/changeEditSKU_model")
				this.$store.commit("productListNew/addProductId",_self.selectRow.id)
			}else{
				this.$Message.warning("请选择一行查看")
			}
		}
    },
    watch:{

    },
    created(){
        this.get_data()
        this.$bus.off("UPDATE_PRODUCT_LIST")
        this.$bus.on("UPDATE_PRODUCT_LIST",()=>{
            this.get_data()
        })
    }
}
</script>
