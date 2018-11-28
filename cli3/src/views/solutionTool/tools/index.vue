<template>
    <div>
        <Card>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-filter-outline" @click="openCreateProduct = true">新增</Button>                          
            </ButtonGroup>
            <Row style="margin-top:10px">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                >
                </Table>
                <Page
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
            title="新增"
            v-model="openCreateProduct"
            width="500"
        >
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="项目名称：" prop="productname">
                    <Input v-model="formValidate.productname" size="small"></Input>
                </FormItem>
                <FormItem label="优惠补贴：" prop="concessions">
                    <Input v-model="formValidate.concessions" size="small"></Input>
                </FormItem>
                <FormItem label="预计申报时间：" prop="declaredate">
                    <Input v-model="formValidate.declaredate" size="small"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="submitLoading">新增</Button>
            </div>
        </Modal>
        <Modal
            title="编辑"
            v-model="openEditProduct"
            width="500"
        >
           <Form ref="currentRow" :model="currentRow" :rules="ruleValidate" :label-width="120">
                <FormItem label="项目名称：" prop="productname">
                    <Input v-model="currentRow.productname" size="small"></Input>
                </FormItem>
                <FormItem label="优惠补贴：" prop="concessions">
                    <Input v-model="currentRow.concessions" size="small"></Input>
                </FormItem>
                <FormItem label="预计申报时间：" prop="declaredate">
                    <Input v-model="currentRow.declaredate" size="small"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="edit" :loading="editLoading">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "tool_product_index",
    data(){
        return{
            currentRow: {
                productname: "",
                concessions: "",
                declaredate: "",
                id: ""
            },
            submitLoading: false,
            editLoading: false,
            loading: false,
            openCreateProduct: false,
            openEditProduct: false,
            header: [
                {
                    title: "项目名称",
                    key: "productname",
                    minWidth: 200,
                },
                {
                    title: "优惠补贴",
                    key: "concessions",
                    minWidth: 150,
                },
                {
                    title: "预计申报时间",
                    key: "declaredate",
                    minWidth: 200,
                },
                {
                    title: "操作",
                    key: "productname",
                    minWidth: 120,
                    render: (h, params) => {
                        return h("Button", {
                            props: {
                                type: "primary",
                                size: "small"
                            },
                            on: {
                                "click": ()=>{
                                    // console.log(params.row)
                                    this.currentRow.id = params.row.id
                                    this.currentRow.productname = params.row.productname
                                    this.currentRow.concessions = params.row.concessions
                                    this.currentRow.declaredate = params.row.declaredate
                                    this.openEditProduct = true
                                }
                            }
                        }, "编辑")
                    }
                }
            ],
            total: 0,
            data: [],
            page: 1,
            openCompanyForm: true,
            formValidate: {
                productname: "",
                concessions: "",
                declaredate: ""
            },
            ruleValidate: {
                productname: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                concessions: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                declaredate: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/customer/program/ProgramProductList`
            _self.loading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: 10
                }
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        submit(){
            let _self = this
            let url = `api/customer/program/saveProgramProduct`
            _self.submitLoading = true
            let config = {
                productname: _self.formValidate.productname,
                concessions: _self.formValidate.concessions,
                declaredate: _self.formValidate.declaredate
            }

            function success(res){
                _self.submitLoading = false
                _self.get_data()
                _self.openCreateProduct = false
                _self.$refs["formValidate"].resetFields()
            }

            function fail(err){
                _self.submitLoading = false
            }

            this.$Post(url, config, success, fail)
        },
        edit(){
            let _self = this
            let url =`api/customer/program/updateProgramProduct`
            _self.editLoading = true

            let config = {
                id: _self.currentRow.id,
                productname: _self.currentRow.productname,
                concessions: _self.currentRow.concessions,
                declaredate: _self.currentRow.declaredate
            }

            function success(res){
                _self.editLoading = false
                _self.get_data()
                _self.openEditProduct = false
            }

            function fail(err){
                _self.editLoading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        this.get_data()
    },
}
</script>
