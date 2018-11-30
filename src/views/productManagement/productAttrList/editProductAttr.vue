<!--
    编辑属性详情
-->

<template>
    <div>
        <Spin size="large" fix v-if="sideLoading"></Spin>
            <Card dis-hover>     
                <div slot="title">
                    <span style="padding-right:10px">属性详情</span><Tag color="yellow" type="border" >点击左侧属性即可查看详情！</Tag>
                </div>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col span="12"><span>属性名称：</span></Col><Col span="12"><Input v-model="property[0].name" size="small"/></Col>
                </Row>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col>
                        <Button type="primary" @click="create_property" icon="plus">新增属性值</Button>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-bottom:5px">
                    <Col span="24">
                        <Table
                            :loading="loading"
                            highlight-row 
                            border
                            size="small"
                            :columns="header"
                            :data="propertyV"></Table>
                    </Col>
                </Row>        
            </Card>
    </div>
</template>

<script>
export default {
    props: {
        productAttr: {
            type: [Object, String]
        }
    },
    watch: {
        productAttr:{
            handler() {
                this.get_data()
            },
            deep: true
        }
    },
    data(){
        return {
            sideLoading: false,
            loading: false,
            property:[
                {
                    id: "",
                    typeId: "",
                    typeName:"",
                    name: ""
                }
            ],
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
                    minWidth: 120
                },
                {
                    title: "属性编码",
                    key: "propertyVCode",
                    minWidth: 120
                },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    render: (h, params) => {
                        return h('div',[
                            h('Button', {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        this.edit_property(params.row)
                                    }
                                }
                            }, "编辑"),
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
                                        this.deleted(params.row)
                                    }
                                }
                            }, "删除")
                        ])
                    }
                }
            ]
        }
    },
    methods: {
        get_data(){
            let _self = this
            _self.sideLoading = true
            _self.loading = true
            let url = `api/product/property/findPropertyById/` + _self.productAttr.id

            let config = {
                
            }

            function success(res){
                _self.property = res.data.data.property
                _self.propertyV = res.data.data.propertyV
                _self.sideLoading = false
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        deleted(e){

        },
        edit_property(e){

        },
        create_property(){

        }
    }
}
</script>
