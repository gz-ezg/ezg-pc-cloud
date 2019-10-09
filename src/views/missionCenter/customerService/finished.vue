<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row :gutter="24">
                                    <Col span="8">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <!--<Col span="8">-->
                                    <!--<FormItem label="客户联系方式：" prop="customername">-->
                                    <!--<Input v-model="formValidateSearch.customertel" size="small"></Input>-->
                                    <!--</FormItem>-->
                                    <!--</Col>-->
                                    <Col span="8">
                                        <FormItem label="市场人员：" prop="date">
                                            <Input v-model="formValidateSearch.creatorName" s size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="计划回访时间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="24">
                                    <Col span="8">
                                        <FormItem label="联系方式：" prop="customertel">
                                            <Input v-model="formValidateSearch.customertel" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <!--<Col span="8">-->
                                    <!--<FormItem label="客户联系方式：" prop="customername">-->
                                    <!--<Input v-model="formValidateSearch.customertel" size="small"></Input>-->
                                    <!--</FormItem>-->
                                    <!--</Col>-->
                                    <Col span="8">
                                        <FormItem label="服务评分：" prop="paytime">
                                            <Input v-model="formValidateSearch.brank" style="width:45%" size="small" type="number"></Input>
                                            ----
                                            <Input v-model="formValidateSearch.erank" style="width:45%" size="small" type="number"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem>
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>

            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
            </Row>

            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <detail></detail>
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";
    import {FULLDateFormat} from "../../../libs/utils";
    import detail from './detail'
    export default {
        name: "finished",
        components:{
            detail
        },
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                pageSize:10,
                data:[],
                taskKind:[],
                missionList:[{"typecode":"Completed","typename":"成功"},{"typecode":"Failed","typename":"失败"}],
                taskKind_map:new Map(),
                taskStage:[],
                taskStage_map:new Map(),
                search_model: "0",
                formValidateSearch: {
                    brank:"",
                    erank:"",
                    ordercode: "",
                    companyName: "",
                    creatorName: "",
                    customertel: "",
                    payDir: "",
                    mission:"",
                    date: [],
                    endDate:[],
                    crealname: "",
                    frealname: "",
                    paytime: [],
                    endtime:[],
                    customerCreateTime: []
                },
                header:[
                    {
                        title: '客户',
                        key: 'name',
                        minWidth: 140,
                    },
                    {
                        title: '联系方式',
                        key: 'tel',
                        minWidth: 140,
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        minWidth: 220,
                        render: (h, params) => {
                            if (params.row.companyname == "" || params.row.companyname == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.companyname.split(",")
                                if (temp[0].length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "归属公司",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].slice(0,13) + "..."),
                                        h("Icon", {
                                            props: {
                                                type: "arrow-down-b"
                                            }
                                        }),
                                        h("div",{
                                            slot: "content"
                                        },[
                                            h("ul",temp.map(item => [
                                                h("li", {
                                                    style: {
                                                        padding: "4px"
                                                    }
                                                },"公司名：" + item)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "归属公司",
                                                placement: "bottom"
                                            }},[
                                            h("span", temp[0]),
                                            h("Icon", {
                                                props: {
                                                    type: "arrow-down-b"
                                                }
                                            }),
                                            h("div", {
                                                slot: "content"
                                            },[
                                                h("ul",temp.map(item => [h("li",
                                                    {
                                                        style: {
                                                            padding: "4px"
                                                        }
                                                    },"公司名：" + item)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '回访任务',
                        key: 'taskName',
                        minWidth: 220,
                        render: (h, params) => {
                            if (params.row.taskName == "" || params.row.taskName == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.taskName.split("|")
                                for (let i=0;i<temp.length;i++){
                                    temp[i] = temp[i].substring(temp[i].indexOf('--')+2, temp[i].length)
                                    // console.log(temp[i])
                                }
                                if (temp[0].length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "回访任务",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].slice(0,13) + "..."),
                                        h("Icon", {
                                            props: {
                                                type: "arrow-down-b"
                                            }
                                        }),
                                        h("div",{
                                            slot: "content"
                                        },[
                                            h("ul",temp.map(item => [
                                                h("li", {
                                                    style: {
                                                        padding: "4px"
                                                    }
                                                },"任务名：" + item)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "回访任务",
                                                placement: "bottom"
                                            }},[
                                            h("span", temp[0]),
                                            h("Icon", {
                                                props: {
                                                    type: "arrow-down-b"
                                                }
                                            }),
                                            h("div", {
                                                slot: "content"
                                            },[
                                                h("ul",temp.map(item => [h("li",
                                                    {
                                                        style: {
                                                            padding: "4px"
                                                        }
                                                    },"任务名：" + item)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '计划回访时间',
                        key: 'plan_date',
                        minWidth: 180,
                    },
                    {
                        title: '服务评分',
                        key: 'serviceranks',
                        minWidth: 100,
                    },
                    {
                        title: '对应市场',
                        key: 'realname',
                        minWidth: 120,
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        minWidth: 140,
                    },
                    {
                        title: '操作',
                        fixed: 'right',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '[查看]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID: params.row.customerid});
                                        }
                                    }
                                }, '[查看客户]')
                            ]);
                        }
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            Search(){
                this.page = 1
                this.get_data()
            },
            handleReset(){
                this.$refs["formValidateSearch"].resetFields()
                this.formValidateSearch.date = []
                this.formValidateSearch.companyName=null
                this.formValidateSearch.creatorName=null
                this.formValidateSearch.customertel=null
                this.formValidateSearch.mission = null
                this.formValidateSearch.brank=null
                this.formValidateSearch.erank=null
                this.formValidateSearch.endDate=[]
                this.get_data()
            },
            downloadExcel(){
                let field = [
                    {field:'NAME',title:'客户名称'},
                    {field:'TEL',title:'联系方式'},
                    {field:'companyName',title:'公司名称'},
                    // {field:'calltype',title:'问题类型',format:'hfwtlx'},
                    {field:'taskName',title:'回访任务'},
                    {field:'plan_date',title:'计划回访时间'},
                    // {field:'serviceranks',title:'回访状态',format:'hfzt'},
                    {field:'serviceranks',title:'服务评分'},
                    {field:'realname',title:'市场人员'},
                    {field:'market_feedback',title:'市场反馈'},
                    {field:'problem_feedback',title:'问题反馈或建议'},
                    {field:'server_feedback',title:'服务人员反馈'}
                    // {field:'depart',title:'责任部门',format:'departAlias'},
                    // {field:'serviceranks',title:'服务评分'},
                ]
                let _self = this
                let url = `api/task/callback/taskServerCallbackList`
                let config = {
                    taskStage:"tesFinished",
                    page: "1",
                    pageSize: "1000000",
                    export: 'Y',
                    companyName:_self.formValidateSearch.companyName,
                    realname:_self.formValidateSearch.creatorName,
                    tel:_self.formValidateSearch.customertel,
                    startDate:DateFormat(_self.formValidateSearch.date[0]),
                    endDate:DateFormat(_self.formValidateSearch.date[1]),
                    exportField: encodeURI(JSON.stringify(field)),
                    startRanks:_self.formValidateSearch.brank,
                    endRanks:_self.formValidateSearch.erank
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
            show(p){
                this.$bus.emit("SHOW_FINISHED_RECORD",p)
            },
            get_data(){
                let _self = this
                let url =`api/task/callback/taskServerCallbackList`
                _self.loading = true
                let config = {
                    params: {
                        taskStage:"tesFinished",
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.formValidateSearch.companyName,
                        realname:_self.formValidateSearch.creatorName,
                        tel:_self.formValidateSearch.customertel,
                        startDate:DateFormat(_self.formValidateSearch.date[0]),
                        endDate:DateFormat(_self.formValidateSearch.date[1]),
                        startRanks:_self.formValidateSearch.brank,
                        endRanks:_self.formValidateSearch.erank
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i < _self.data.length; i++){
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        //     _self.data[i].taskKind = _self.taskKind_map.get(_self.data[i].taskKind)
                        _self.data[i].plan_date = FULLDateFormat(_self.data[i].plan_date)
                        //     _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                        //     if (_self.data[i].apply_status==="tesFinished") {
                        //         _self.data[i].apply_status="同意"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReturned") {
                        //         _self.data[i].apply_status="驳回"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReady") {
                        //         _self.data[i].apply_status="待审核"
                        //     }
                        //     _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        //     _self.data[i].check_date = DateFormat(_self.data[i].check_date)
                        //     _self.data[i].plan_date =  DateFormat(_self.data[i].plan_date)
                    }
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
        },
        created() {
            this.loading = true
            // this.get_data_center()
            this.get_data()
            this.$bus.on("UPDATE_FINISHED_DATA",()=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>