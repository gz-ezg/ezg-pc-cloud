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
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
                @on-row-dblclick="open_detail"
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
    name: 'handovermanagement_index',
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
                    title: "公司名称",
                    key: "companyname",
                    width: 200
                },
                {
                    title: "客户名称",
                    key: "name",
                    width: 120
                },
                {
                    title: "电话",
                    key: "tel",
                    width: 120
                },
                {
                    title: "资料名称",
                    key: "resourename",
                    width: 150
                },
                {
                    title: "数量",
                    key: "number",
                    width: 90
                },
                {
                    title: "交接人",
                    key: "person",
                    width: 120
                },
                {
                    title: "交接时间",
                    key: "time",
                    width: 200
                },
                {
                    title: "存放部门",
                    key: "depart",
                    width: 150
                },
                {
                    title: "保管人",
                    key: "companyname",
                    width: 120
                },
                {
                    title: "确认时间",
                    key: "comfirmtime",
                    width: 150
                },
                {
                    title: "状态",
                    key: "status",
                    width: 120
                },
                {
                    title: "接收方式",
                    key: "recieveType",
                    width: 120
                },
                {
                    title: "快递号",
                    key: "expressNumber",
                    width: 150
                },
                {
                    title: "保存方式",
                    key: "saveType",
                    width: 150
                },
                {
                    title: "柜号",
                    key: "number",
                    width: 90
                },
                {
                    title: "操作",
                    key: "action",
                    width: 120,
                    render: (h, parmas) =>{
                        return h('Button',{
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.open_detail(parmas)
                                }
                            }
                        },'[查看详情]')
                    }
                }
            ]
        }
    },
    methods:{
        open_detail(e){
            this.selectRow = e
            this.openDetail = true
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
