<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="SearchValidate" :model="SearchValidate" :label-width="80" style="margin-top: 15px">
                                <Row :gutter="8">
                                    <Col span="8">
                                    <FormItem label="企业名称：" prop="CompanyName">
                                        <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="服务人员：" prop="server_realname">
                                        <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="跟进人：" prop="followby_realname">
                                        <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="8">
                                    <Col span="8">
                                    <FormItem label="服务部门：" prop="departname">
                                        <Select v-model="SearchValidate.departname" size="small" transfer @on-change="getData">
                                            <Option value="广州会计1组">广州会计1组</Option>
                                            <Option value="深圳会计部">深圳会计部</Option>
                                            <Option value="东莞会计部">东莞会计部</Option>
                                            <Option value="郑州会计部">郑州会计部</Option>
                                            <Option value="兰州会计部">兰州会计部</Option>
                                        </Select>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem>
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                            重置
                                        </Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="start_service">开始服务</Button>
                <Button type="primary" icon="information-circled" @click="fpkj">变更会计</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :loading="loading"
                    @on-row-click="selectrow"
                    :columns="header"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    :current.sync="page"
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
    import Bus from '../../../../../components/bus'
    import * as accountApi from '../../api'

    export default {
        data() {
            return {
                loading:false,
                search_model:"",
                SearchValidate:{
                    CompanyName:'',
                    server_realname:'',
                    followby_realname:'',
                    departname:'',
                    begin_end_period: '',
                    end_end_period: ''
                },
                page: 1,
                pageSize: 10,
                tiaozheng: false,
                zl: false,
                zz: false,
                bs: false,
                zlid: '',
                zzid: '',
                bsid: '',
                id: {},
                pageTotal: 0,
                task_message:{
                    companyName:'1111111111'
                },
                data:[],
                gdsreportMap:new Map([
                    ["ybd","已报道"],
                    ["wbd","未报道"],
                    ["bybd","不用报道"]
                ]),
                header: [
                    {
                        title: '对应企业',
                        key: 'CompanyName',
                        width: 250
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 160
                    },
                    {
                        title: '国地税报道',
                        key: 'gdsreport',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'server_realname',
                        width: 120
                    },
                    {
                        title: '市场',
                        key: 'followby_realname',
                        width: 120
                    },
                    {
                        title: '剩余时长',
                        key: 'balance_count',
                        width: 120
                    },
                    {
                        title: '开始税期',
                        key: 'begin_period',
                        width: 120
                    },
                    {
                        title: '结束税期',
                        key: 'end_period',
                        width: 120
                    },
                    {
                        title: '下线税期',
                        key: 'downline_period',
                        width: 120
                    },
                    {
                        title: '单价',
                        key: 'unit_price',
                        minWidth: 120
                    },
                    {
                        title: '警戒值',
                        key: 'accounter_security_line',
                        width: 120
                    },
                    {
                        title: '累计外勤',
                        key: 'dljz_legwork',
                        minWidth:100
                    },
                    {
                        title: '备注',
                        key: 'workordermemo',
                        width: 200,
                        render:(h,params) => {
                            if(params.row.workordermemo == ''||params.row.workordermemo == null){
                                return ''
                            }else if(params.row.workordermemo.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.workordermemo.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.workordermemo)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.workordermemo)
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
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
                                            this.$store.commit("open_gobal_company_detail_modal", params.row.company_id)
                                            
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.batchBookId != null){
                                                Bus.$emit('open_yichang_detail',params.row.batchBookId)
                                            }else{
                                                this.$Message.warning('未绑定账本')
                                            }                                            
                                        }
                                    }
                                }, '[查看异常]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            downloadExcel(){
                let field = [
                    {field:'service_status',title:'服务状态',format:'cservicest'},
                    {field:'CompanyName',title:'对应企业'},
                    {field:'product',title:'产品名称'},
                    {field:'server_realname',title:'服务人员'},
                    {field:'followby_realname',title:'市场'},
                    {field:'balance_count',title:'剩余时长'},
                    {field:'begin_period',title:'开始期间'},
                    {field:'end_period',title:'结束期间'},
                    {field:'unit_price',title:'单价'},
                    ]
                let _self = this
                let url = `api/order/cycle/service/record/list`
                let config = {
                        service_status:'stop',
                        sort:'updatedate',
                        service_type:'dljz',
                        page: '1',
                        pageSize: '1000000',
                        CompanyName: _self.SearchValidate.CompanyName,
                        server_realname: _self.SearchValidate.server_realname,
                        followby_realname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        departname: _self.SearchValidate.departname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            handleReset(){
                this.SearchValidate.CompanyName = ""
                this.SearchValidate.server_realname = ""
                this.SearchValidate.followby_realname = "" 
                this.SearchValidate.departname = ""
                this.SearchValidate.begin_end_period = ""
                this.SearchValidate.end_end_period = ""
                this.Search()               
            },
            Search(){
                this.page = 1
                this.getData()
            },
            show(e){
                if(e.key=='Enter'){
                    this.Search()
                }
            },
            async getData() {
                let _self = this
                this.loading = true
                
                let config = {
                    params: {
                        service_status: "stop",
                        sortField: "updatedate",
                        service_type: "dljz",
                        page: this.page,
                        pageSize: this.pageSize,
                        followby_realname: this.SearchValidate.followby_realname,
                        CompanyName: this.SearchValidate.CompanyName,
                        server_realname: this.SearchValidate.server_realname,
                        departname: this.SearchValidate.departname,
                        begin_end_period: this.SearchValidate.begin_end_period,
                        end_end_period: this.SearchValidate.end_end_period,
                    }
                }

                try {
                    let { total, rows} = await accountApi.getOrderCycleServiceRecordList(config)
                    this.pageTotal = total
                    this.data = rows.map((item)=>{
                        item.gdsreport = this.gdsreportMap.get(item.gdsreport)
                        return item
                    })
                } catch (error) {
                    console.log(error)
                }

                this.loading = false
            },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getData()
            },

            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            // 分配会计 
            fpkj() {
                 let _self = this

                if (_self.id.id == '') {
                    this.$Message.warning('请选择要变更会计的项目')
                } else {
                    Bus.$emit('fenpei', _self.id)
                }
            },

            start_service() {
                let _self = this

                if (_self.id.id == '') {
                    this.$Message.warning('请选择要开始服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定开始服务吗</p>',
                    onOk: async() => {
                        let config = {
                            id: _self.id.id,
                            serviceStatus: 'inservice'
                        }
                        try {
                            let {status, data} = await accountApi.cycleServiceRecordUpdate(config)
                            if(status){
                                this.page = 1
                                this.getData()
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    },
                    onCancel: () => {}
                });
                }
            },

            selectrow(a) {
                let _self = this
                _self.id = a
            }

        },
        mounted() {
            this.getData()
        },
        created () {
            let _self = this
            Bus.$on('UPDATE_ALL_ACCOUNT_PAGE',(e)=>{
                _self.getData()
            })
            Bus.$on('update_auditlist_detail',(e)=>{
                _self.getData()
            })
        }
    }
</script>

