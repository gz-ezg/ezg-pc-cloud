<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                    <!-- <Search slot="content"></Search> -->
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="name" label="客户名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.name" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="tel" label="联系方式：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.tel" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="create_resoure">新增</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
        <Modal
                v-model="openDetail"
                title="交接详情"
                width="600">
            <Row>
                <Col span="5"><span>交接人：</span></Col>
                <Col span="7"></Col>
                <Col span="5"><span>接收人：</span></Col>
                <Col span="7"></Col>
            </Row>
            <Row>
                <Col span="5"><span>交接部门：</span></Col>
                <Col span="7"></Col>
                <Col span="5"><span>交接时间：</span></Col>
                <Col span="7"></Col>
            </Row>
            <Row>
                <Col span="6"><img />></Col>
            </Row>
        </Modal>
    </Card>
</template>

<script>
export default {
    name: 'resourelist_index',
    data(){
        return{
            loading: false,
            openDetail:false,
            selectRow:{

            },
            seacrhFormInline: {
                companyname: "",
                name: "",
                tel: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "资料名称",
                    key: "name",
                    width: 120
                },
                {
                    //  自定义，1
                    title: "数量",
                    key: "tel",
                    width: 120
                },
                {
                    title: "部门",
                    key: "companyname",
                    width: 200
                },
                {
                    title: "客户展示",
                    key: "resourename",
                    width: 150
                },
                {
                    title: "操作",
                    key: "action",
                    width: 250,
                    render: (h, parmas) =>{
                        if(parmas){
                            return h('div',[ 
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.open_img(parmas)
                                        }
                                    }
                                },'[ 失效 ]'),
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.open_img(parmas)
                                        }
                                    }
                                },'[ 编辑 ]'),
                            ])
                        }else{
                            return h('div',[ 
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.open_img(parmas)
                                        }
                                    }
                                },'[ 恢复 ]'),
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.open_img(parmas)
                                        }
                                    }
                                },'[ 编辑 ]'),
                            ])
                        }    
                    }
                }
            ]
        }
    },
    methods:{
        open_img(e){
            this.selectRow = e
            this.openDetail = true
        },
        logout(e){

        },
        open_flow(e){

        },
        //  新增项目
        create_resoure(){

        },
        get_data(){
            let _self = this
            let url = ""

            _self.loading = true

            let config = {
                page: _self.page,
                pageSize: _self.pageSize,
                companyname: _self.seacrhFormInline.companyname,
                customername: _self.seacrhFormInline.customername,
                tel: _self.seacrhFormInline.tel
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject) => {
                let parmas = ""
                function success(res){
                    resolve()
                }
                _self.$GetDataCenter(params, success)

            })
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    },
    created(){
        let _self = this
        this.get_data_center().then(
            () => {
                _self.get_data()
            }
        )
    }
}
</script>
