<!--
    创建一级属性值
-->
<template>
    <div>
        <Modal
            title="创建属性"
            width="500"
            v-model="openProductAttr"
            @on-cancel="close"
        >
            <Form ref="formInline" :model="formInline" :label-width="80">
                <Row>
                    <Col span="24">
                        <FormItem prop="name" label="属性名：">
                            <Input type="text" v-model="formInline.name">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem prop="typeId" label="产品类型:">
                        <Input type="text" v-model="currentTypeName" readonly @on-focus="open_type_tree">
                        </Input>
                    </FormItem>
                </Row>
            </Form>
            <Table
                id="orderItem"
                highlight-row 
                border
                size="small"
                :columns="header"
                :data="propertyV">
                <Button slot="footer" type="text" @click="create_property" icon="plus" long>新增属性值</Button>
            </Table>
            <div slot="footer">
                <Button type="primary" @click="create_attr">创建</Button>
            </div>
        </Modal>
        <Modal
            v-model="openTypeTree"
            width="400"
            title="产品类型"
        >
            <Tree :data="productType" show-checkbox ref="tree"></Tree>
            <div slot="footer">
                <Button type="primary" @click="create_type">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openProductAttr: true,
            formInline: {
                name: "",
            },
            propertyV: [],
            header: [
                {
                    title: "序号",
                    type: "index",
                    minWidth: 80
                },
                {
                    title: "属性值",
                    key: "propertyValue",
                    minWidth: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.propertyV[parmas.index].propertyValue,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.propertyV[parmas.index].propertyValue = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.propertyV[parmas.index].propertyValue = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "属性编码",
                    key: "propertyVCode",
                    minWidth: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.propertyV[parmas.index].propertyVCode,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.propertyV[parmas.index].propertyVCode = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.propertyV[parmas.index].propertyVCode = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    width: 120,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Button', {
                                props: {
                                    type: "error",
                                    size: "small",
                                    icon: "trash-a",
                                },
                                style: {
                                    marginLeft: "5px"
                                },
                                on: {
                                    click: () => {
                                        _self.propertyV.splice(parmas.index, 1)
                                    }
                                }
                            }, "移除")
                        ])
                    }
                }
            ],
            productType: [],
            openTypeTree:false,
            currentType: "",
            currentTypeName: ""
        }
    },
    methods: {
        close(){
            this.$emit("close", false)
        },
        create_attr(){
            let _self = this
            let url = `api/product/property/createProperty`

            let config = {
                name: _self.formInline.name,
                typeId: _self.currentType,
                propertyValues: JSON.stringify(_self.propertyV)
            }

            function success(res){
                _self.$emit("close", true)
            }

            function fail(err){

            }
            
            this.$Post(url, config, success, fail)
        },
        create_property(){
            this.propertyV.push({
                propertyVCode: "",
                propertyValue: "",
            })
        },
        open_type_tree(){
            this.openTypeTree = true
        },
        get_product_type_tree(){
            let _self = this
            let url = `api/product/type/tree`
            let config = {}

            function success(res){
                _self.productType = res.data.data
                replace_text_title(_self.productType)
            }

            function replace_text_title(tree){
                for(let i = 0; i<tree.length; i++){
                    tree[i].title = tree[i].text
                    if(tree[i].children){
                        replace_text_title(tree[i].children)
                    }
                }
            }

            this.$Get(url, config, success)
        },
        create_type(){
            let temp = this.$refs.tree.getCheckedNodes()
            this.currentType = temp[temp.length-1].id
            this.currentTypeName = temp[temp.length-1].title
            this.openTypeTree = false
            // console.log(this.currentType)
        }
    },
    created() {
        this.get_product_type_tree()
    },
}
</script>

<style>
#orderItem .ivu-input{
    border: 0px solid #dddee1
}
#orderItem .ivu-select-selection{
    border: 0px solid #dddee1
}
#orderItem .ivu-table-footer{
}
</style>