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
        <!-- <Modal
                v-model="flowChart1"
                title="查看流程图"
                width="80%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal> -->
    </Card>
</template>

<script>
export default {
    name: 'handovermanagement_index',
    data(){
        return{
            seacrhFormInline: {
                companyname: "",
                name: ""
            },
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

    },
    created(){

    }
}
</script>
