<template>
    <div>
        <Modal
            title="选择产品属性"
            v-model="openTypeList"
            width="500"
            @on-cancel="close"
        >
            <Row style="margin-top:10px">
                <Form ref="formValidate" :model="formValidate" inline>
                    <FormItem prop="typeName">
                        <Input type="text" v-model="formValidate.typeName" placeholder="属性分类">
                            <!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
                        </Input>
                    </FormItem>
                    <FormItem prop="name">
                        <Input type="text" v-model="formValidate.name" placeholder="属性名称" >
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="get_data">查询</Button>
                    </FormItem>
                </Form>
            </Row>
            <Row>
                <Table
                    :loading="loading"
                    highlight-row 
                    border
                    size="small"
                    :columns="header"
                    :data="data"></Table>
                <Page
                    simple
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    :current.sync="page"
                    @on-change="page_change"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            page: 1,
            pageSize: 10,
            total: 0,
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
                {
                    title: "操作",
                    key: "",
                    minWidth: 120,
                    render: (h, parmas) => {
                        return h('Button',{
                            props:{
                                size: 'small',
                                type: 'info'
                            },
                            on: {
                                "click": ()=>{
                                    // console.log(parmas.row)
                                    this.$emit("add-attr", parmas.row.id)
                                }
                            }
                        }, "添加")
                    }
                }
            ],
            data: [],
            openTypeList: true,
            formValidate: {
                name: "",
                typeName: ""
            }
        }
    },
    methods: {
        close(){
            this.$emit("close")
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = `api/product/property/list`
            _self.loading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    name: _self.formValidate.name,
                    typeName: _self.formValidate.typeName
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>
