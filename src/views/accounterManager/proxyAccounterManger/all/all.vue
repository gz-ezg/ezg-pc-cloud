<template>
    <Card>
        <Row style="margin-bottom:20px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div slot="content" @keydown.enter="Search">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                            <Row :gutter="8" style="height:56px">
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
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="部门：" prop="departname">
                                        <Select v-model="SearchValidate.departname" size="small" transfer @on-change="get_data()">
                                            <Option value="广州会计1组">广州会计1组</Option>
                                            <Option value="深圳会计部">深圳会计部</Option>
                                            <Option value="东莞会计部">东莞会计部</Option>
                                            <Option value="郑州会计部">郑州会计部</Option>
                                            <Option value="兰州会计部">兰州会计部</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <!--<Col span="8">-->
                                    <!--<FormItem label="客户跟进：" prop="note_kj_flag">-->
                                        <!--<Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">-->
                                            <!--<Option value="Y">完成</Option>-->
                                            <!--<Option value="N">未完成</Option>-->
                                        <!--</Select>-->
                                    <!--</FormItem>-->
                                <!--</Col>-->
                                <!--<Col span="8">-->
                                    <!--<FormItem label="电子税务局状态：" prop="etaxStatus">-->
                                        <!--<Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">-->
                                            <!--<Option :value="1">账号正常</Option>-->
                                            <!--<Option :value="2">账号异常</Option>-->
                                            <!--<Option :value="3">无账号</Option>-->
                                        <!--</Select>-->
                                    <!--</FormItem>-->
                                <!--</Col>-->
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
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    :row-class-name="row_class_name"
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
        </Row>
    </Card>
</template>

<script>
    import * as accountApi from '../serving/api'
    export default {
        name: "all",
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                cservicest:[],
                TaxDeclareStatus:[],
                TaxCompleteStatus:[],
                GDSreport:[],
                GDSreport_map:new Map(),
                cservicest_map:new Map(),
                TaxDeclareStatus_map:new Map(),
                TaxCompleteStatus_map:new Map(),
                SearchValidate: {
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    begin_end_period: '',
                    end_end_period: '',
                    note_kj_flag: '',
                    etaxStatus: ''
                },
                data:[],
                header: [
                    {
                        title: '公司名称',
                        fixed: 'left',
                        key: 'CompanyName',
                        minWidth: 250
                    },
                    {
                        title: '申报税种',
                        key: 'tax_type',
                        width: 180,
                        render: (h, params) => {
                            if (params.row.tax_type == "" || params.row.tax_type == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.tax_type.split(",")
                                if (temp[0].length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "申报税种",
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
                                                },"税种：" + item)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "申报税种",
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
                                                    },"税种：" + item)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '下单时间',
                        key: 'createdate',
                        minWidth: 220
                    },
                    {
                        title: '国地税报道',
                        key: 'gdsreport',
                        minWidth: 140,
                        render:(h,params)=>{
                            return h('div',{},this.GDSreport_map.get(params.row.gdsreport))
                        }
                    },
                    {
                        title: '重要提醒',
                        key: 'importantList',
                        minWidth: 220,
                        render: (h, params) => {
                            let _self = this
                            if (params.row.importantList == "" || params.row.importantList == null) {
                                return h("div",{
                                    style: {
                                        //     display: 'inline-block',
                                        //     lineHeight: '24px',
                                        //     height: '24px',
                                        cursor:'pointer',
                                        minWidth:'20px'
                                        //     color:'#0162f4'
                                    },
                                    on:{
                                        click: function() {
                                            _self.open_import_list(params.row);
                                        }
                                    }
                                },"无");
                            } else {
                                let temp = JSON.parse(params.row.importantList)
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "提醒项",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",{
                                            style: {
                                                //     display: 'inline-block',
                                                //     lineHeight: '24px',
                                                //     height: '24px',
                                                cursor:'pointer',
                                                //     color:'#0162f4'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.open_import_list(params.row);
                                                }
                                            }
                                        },temp[0].taskContent.slice(0,13) + "..."),
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
                                                },"重要提醒：" + item.taskContent)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "提醒项",
                                                placement: "bottom"
                                            }},[
                                            h("span",{
                                                style: {
                                                    //     display: 'inline-block',
                                                    //     lineHeight: '24px',
                                                    //     height: '24px',
                                                    cursor:'pointer',
                                                    //     color:'#0162f4'
                                                },
                                                on:{
                                                    click: function() {
                                                        _self.open_import_list(params.row);
                                                    }
                                                }
                                            }, temp[0].taskContent),
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
                                                    },"重要提醒：" + item.taskContent)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '实名账号',
                        key: 'nationalnum',
                        minWidth: 150,
                    },
                    {
                        title: '密码',
                        key: 'nationalpsw',
                        minWidth: 150,
                    },
                    {
                        title: '税号',
                        key: 'tax_number',
                        minWidth: 150,
                    },
                    {
                        title: '个税密码',
                        key: 'tax_password',
                        minWidth: 150,
                    },
                    {
                        title: '代账类型',
                        key: 'product',
                        minWidth: 230
                    },
                    {
                        title: '社保',
                        key: 'shebao',
                        minWidth: 150,
                        render: (h, params) => {
                            if (!params.row.shebao){
                                return ""
                            }
                            let _self = this;
                            if (params.row.shebao.confirm_date == undefined) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '40px'
                                            }
                                        },
                                        "未完成"
                                    ),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            style:{
                                                marginTop:"-3px",
                                                marginLeft:"5px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.completed(params.row.shebao);
                                                }
                                            }
                                        },
                                        '[ 完成 ]'
                                    )
                                ]);
                            } else {
                                return h('div', params.row.shebao.confirm_date.slice(0, 10));
                            }
                        }
                    },
                    {
                        title: '做账备注',
                        key: 'accountList',
                        minWidth: 120,
                        render: (h, params) => {
                            let _self = this
                            if (params.row.accountList == "" || params.row.accountList == null) {
                                return "";
                            } else {
                                let temp = JSON.parse(params.row.accountList)
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "备注项",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].taskContent.slice(0,13) + "..."),
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
                                                            padding: "4px",
                                                        }
                                                    },[
                                                        h("span",{},"备注名：" + item.taskContent),
                                                    ]
                                                )

                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "备注项",
                                                placement: "bottom"
                                            }},[
                                            h("span", temp[0].taskContent),
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
                                                    },[
                                                        h("span",{},"备注名：" + item.taskContent),
                                                    ])
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '产品金额',
                        key: 'unit_price',
                        minWidth: 180,
                    },
                    {
                        title: '未完事项',
                        key: 'undoList',
                        minWidth: 120,
                        render: (h, params) => {
                            let _self = this
                            if (params.row.undoList == "" || params.row.undoList == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = JSON.parse(params.row.undoList)
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "未完项",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].taskContent.slice(0,13) + "..."),
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
                                                            padding: "4px",
                                                        }
                                                    },[
                                                        h("span",{},"事项名：" + item.taskContent),
                                                    ]
                                                )

                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "未完项",
                                                placement: "bottom"
                                            }},[
                                            h("span", temp[0].taskContent),
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
                                                    },[
                                                        h("span",{},"事项名：" + item.taskContent),
                                                    ])
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '剩余外勤',
                        key: 'remainder',
                        minWidth: 120,
                        render: (h, params) => {
                            let _self = this;
                            return h('div', [
                                h(
                                    'span',
                                    {
                                        style: {
                                            display: 'inline-block',
                                            lineHeight: '24px',
                                            height: '24px',
                                            cursor:'pointer',
                                            color:'#0162f4'
                                        },
                                        on:{
                                            click: function() {
                                                _self.field(params.row);
                                            }
                                        }
                                    },params.row.remainder
                                )])
                        }
                    },
                    {
                        title: '税种状态',
                        key: 'tax_status',
                        minWidth: 120
                    },
                    {
                        title: '市场',
                        key: 'followby_realname',
                        minWidth: 120
                    },
                    {
                        title: '服务会计',
                        key: 'server_realname',
                        minWidth: 120
                    },
                    {
                        title: '服务状态',
                        key: 'service_status',
                        minWidth: 120
                    },
                    {
                        title: '本月税报结果',
                        key: 'tax_result',
                        minWidth: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.invoice(params.row);
                                            }
                                        }
                                    },
                                    '[发票管理]'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.$store.commit('open_gobal_company_detail_modal', params.row.company_id);
                                            }
                                        }
                                    },
                                    '[公司详情]'
                                ),
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.data_management(params.row)
                                            }
                                        }
                                    },
                                    '[资料管理]'
                                )
                            ]);
                        }
                    },
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            row_class_name(row, index) {
                if (row.gdsreport == 'wbd') {
                    return 'demo-table-followdate-red-row';
                }else if(row.gdsreport == 'bybd'){
                    return 'demo-table-followdate-blue-row';
                } else {
                    return ''
                }
            },
            field(e){
                this.$bus.emit("OPEN_FIELD_DETAIL",e)
            },
            invoice(e){
                this.$bus.emit("OPEN_INVOICE_PAGE",e)
            },
            open_import_list(e){
                this.$bus.emit("OPEN_IMPORT_LIST",e)
            },
            data_management(e){
                this.$bus.emit("OPEN_DATA_MANAGEMENT",e)
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            handleReset() {
                this.SearchValidate.CompanyName = '';
                this.SearchValidate.server_realname = '';
                this.SearchValidate.followby_realname = '';
                this.SearchValidate.begin_end_period = '';
                this.SearchValidate.end_end_period = '';
                this.SearchValidate.departname = "";
                this.current_row = ""
                this.Search();
            },
            downloadExcel(){
                let field = [
                    {
                        field: 'companyname',
                        title: '公司名称',
                    },
                    {
                        field: 'tax_type',
                        title: '申报税种'
                    },
                    {
                        field: 'importEx',
                        title: '重要提醒'
                    },
                    {
                        field: 'nationalnum',
                        title: '实名账号'
                    },
                    {
                        field: 'nationalpsw',
                        title: '密码'
                    },
                    {
                        field: 'tax_number',
                        title: '税号'
                    },
                    {
                        field: 'tax_password',
                        title: '个税密码'
                    },
                    {
                        field: 'product',
                        title: '代账类型'
                    },
                    {
                        field: 'begin_period',
                        title: '开始税期'
                    },
                    {
                        field: 'end_period',
                        title: '结束税期'
                    },
                    {
                        field: 'shebao',
                        title: '社保'
                    },
                    {
                        field: 'accountEx',
                        title: '做账备注'
                    },
                    {
                        field: 'unit_price',
                        title: '产品金额'
                    },
                    {
                        field: 'undoEx',
                        title: '未完事项'
                    },
                    {
                        field: 'remainder',
                        title: '剩余外勤'
                    },
                    {
                        field: 'tax_status',
                        title: '税种状态',
                        format:'TaxCompleteStatus'
                    },
                    {
                        field: 'followbyrealname',
                        title: '市场'
                    },
                    {
                        field: 'realname',
                        title: '服务会计'
                    },
                    {
                        field: 'service_status',
                        title: '服务状态',
                        format:'cservicest'
                    },
                    {
                        field: 'tax_result',
                        title: '本月税报结果',
                        format:'TaxDeclareStatus'
                    },
                ];
                let _self = this;
                let url = `api/order/cycle/service/dljz/cycleMothList`;
                let config = {
                    page: '1',
                    pageSize: '100000',
                    period: _self.period,
                    companyname: _self.SearchValidate.CompanyName,
                    realname: _self.SearchValidate.server_realname,
                    sortField: 'unit_price',
                    followbyrealname: _self.SearchValidate.followby_realname,
                    begin_end_period: _self.SearchValidate.begin_end_period,
                    end_end_period: _self.SearchValidate.end_end_period,
                    note_kj_flag: _self.SearchValidate.note_kj_flag,
                    hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
                    hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
                    hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : '',
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))
                };
                let toExcel = this.$MergeURL(url, config);
                window.open(toExcel);
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/cycleRecordList`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        service_status:"",
                        sortField: 'unit_price',
                        service_type:"dljz",
                        CompanyName: _self.SearchValidate.CompanyName,
                        server_realname: _self.SearchValidate.server_realname,
                        followby_realname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        departname:_self.SearchValidate.departname
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows
                    _self.data = res.data.data.rows.map(item => {
                        item.service_status = _self.cservicest_map.get(item.service_status);
                        item.tax_status = _self.TaxCompleteStatus_map.get(item.tax_status)
                        item.tax_result = _self.TaxDeclareStatus_map.get(item.tax_result);
                        item.remainder = item.remainder == null ? '0': item.remainder;
                        // item.managestatusName = this.managestatus_map.get(item.managestatus);
                        // item.note_kj_flag = item.note_kj_flag == 'Y' ? '完成' : '未完成';
                        return item;
                    });
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            async get_data_center() {
                let params = 'GDSreport,cservicest,managestatus,financialLevel,TaxDeclareStatus,TaxCompleteStatus';
                try {
                    let { GDSreport,cservicest, managestatus, financialLevel,TaxDeclareStatus,TaxCompleteStatus } = await accountApi.getDictionary(params);
                    this.cservicest = cservicest;
                    this.cservicest_map = this.$array2map(this.cservicest);
                    this.managestatus = managestatus;
                    this.GDSreport = GDSreport
                    this.GDSreport_map = this.$array2map(GDSreport);
                    this.managestatus_map = this.$array2map(managestatus);
                    this.financialLevel = financialLevel;
                    this.TaxDeclareStatus = TaxDeclareStatus
                    this.TaxDeclareStatus_map = this.$array2map(TaxDeclareStatus)
                    this.TaxCompleteStatus = TaxCompleteStatus
                    this.TaxCompleteStatus_map = this.$array2map(TaxCompleteStatus)
                } catch (error) {
                    console.log(error);
                }
                // console.log(this.managestatus_map)
            },
        },
        created() {
            let _self = this
            _self.get_data()
            _self.get_data_center()
            _self.$bus.off("UPDATE_INDEX",true)
            _self.$bus.on("UPDATE_INDEX",(e)=>{
                _self.get_data()
                _self.current_row = ""
            })
        }
    }
</script>

<style>
    .ivu-table .demo-table-followdate-red-row td{
        background-color: #D24D57;
    }
    .ivu-table .demo-table-followdate-blue-row td{
        background-color: #00CCFF;
    }
</style>