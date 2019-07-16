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
                                    <FormItem label="客户跟进：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                            <Option value="Y">完成</Option>
                                            <Option value="N">未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="电子税务局状态：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                                            <Option :value="1">账号正常</Option>
                                            <Option :value="2">账号异常</Option>
                                            <Option :value="3">无账号</Option>
                                        </Select>
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
                <Button type="primary" icon="ios-color-wand-outline" @click="add_important_reminder">新增重要提醒</Button>
                <Button type="primary" icon="information-circled" @click="add_account_note">新增做账备注</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="add_unfinished_things">新增未完事项</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="change_accounting">变更会计</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_detail">服务详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="open_acc_change_log">会计变更日志</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_offline">服务下线</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="service_paused">暂停服务</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    :loading="loading"
                    ref="selection"
                    highlight-row
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
        <invoice></invoice>
        <level></level>
        <data-management></data-management>
    </Card>
</template>

<script>
    import Clipboard from 'clipboard'
    import Invoice from '../serving/InvoiceManagement/index'
    import {DateFormatYearMonth2} from "../../../../libs/utils";
    import * as accountApi from './api'
    import Level from './level/index'
    import DataManagement from './DataManagement/index'

    export default {
        name: "serving",
        components:{
            Invoice,
            Level,
            DataManagement
        },
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                period:"",
                currentIndex:-1,
                currentIndexx:-2,
                currentIndexxx:-3,
                currentIndexxxx:-4,
                l:-5,
                SearchValidate: {
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    begin_end_period: '',
                    end_end_period: '',
                    note_kj_flag: '',
                    etaxStatus: ''
                },
                data:[{ 'a':"厉害了我的哥公司",
                        'b':"申报税种",
                        'c':"重要提醒",
                        'd':"aalyc",
                        'f':"bblyc",
                        'g':"ezglyc",
                        'h':"ezglycc",
                        'i':"代账类型",
                        'j':undefined,
                        'k':"做账备注",
                        'l':288,
                        'm':"未完事项",
                        'n':5,
                        'o':"税种状态",
                        'p':"市场",
                        'q':"李晓音",
                        'r':"成功"}],
                header: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                        minWidth: 250
                    },
                    {
                        title: '申报税种',
                        key: 'b',
                        width: 120,
                        render: (h, params) => {
                            if (params.row.b == "" || params.row.b == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.b.split(",")
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
                        title: '重要提醒',
                        key: 'importantList',
                        minWidth: 180,
                        render: (h, params) => {
                            if (params.row.importantList == "" || params.row.importantList == null) {
                                return "";
                            } else {
                                let temp = params.row.importantList
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "归属公司",
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
                                                        padding: "4px"
                                                    }
                                                },"公司名：" + item.taskContent)
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
                                                    },"公司名：" + item.taskContent)
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
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != _self.currentIndex) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            class: {
                                                  foo: true,
                                                  bar: false
                                                     },
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '60px',
                                                cursor:'pointer'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.copy(params.row.nationalnum);
                                                }
                                            }
                                        },params.row.nationalnum
                                    ),
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'edit',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.handle_edit_unit_price(params.row, params.index);
                                                }
                                            }
                                        }
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            value: this.data[params.index].nationalnum,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].nationalnum = event.target.value;
                                            }
                                        }
                                    }),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'info',
                                                size: 'small'
                                            },
                                            style: {
                                                display: 'inline-block'
                                            },
                                            on: {
                                                click: () => {
                                                    _self.update_nationalnum(params.index);
                                                }
                                            }
                                        },
                                        '保存'
                                    )
                                ]);
                            }
                        }
                    },
                    {
                        title: '密码',
                        key: 'nationalpsw',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.currentIndexx) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            class: {
                                                foo: true,
                                                bar: false
                                            },
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '60px',
                                                cursor:'pointer'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.copy(params.row.nationalpsw);
                                                }
                                            }
                                        },
                                        params.row.nationalpsw
                                    ),
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'edit',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.handle_edit_unit_pricex(params.row, params.index);
                                                }
                                            }
                                        }
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            value: this.data[params.index].nationalpsw,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].nationalpsw = event.target.value;
                                            }
                                        }
                                    }),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'info',
                                                size: 'small'
                                            },
                                            style: {
                                                display: 'inline-block'
                                            },
                                            on: {
                                                click: () => {
                                                    _self.update_nationalpsw(params.index);
                                                }
                                            }
                                        },
                                        '保存'
                                    )
                                ]);
                            }
                        }
                    },
                    {
                        title: '税号',
                        key: 'tax_number',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.currentIndexxx) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            class: {
                                                foo: true,
                                                bar: false
                                            },
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '60px',
                                                cursor:'pointer'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.copy(params.row.tax_number);
                                                }
                                            }
                                        },
                                        params.row.tax_number
                                    ),
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'edit',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.handle_edit_unit_pricexx(params.row, params.index);
                                                }
                                            }
                                        }
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            value: this.data[params.index].tax_number,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].tax_number = event.target.value;
                                            }
                                        }
                                    }),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'info',
                                                size: 'small'
                                            },
                                            style: {
                                                display: 'inline-block'
                                            },
                                            on: {
                                                click: () => {
                                                    _self.update_taxnumber(params.index);
                                                }
                                            }
                                        },
                                        '保存'
                                    )
                                ]);
                            }
                        }
                    },
                    {
                        title: '个税密码',
                        key: 'tax_password',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.currentIndexxxx) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            class: {
                                                foo: true,
                                                bar: false
                                            },
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '60px',
                                                cursor:'pointer'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.copy(params.row.tax_password);
                                                }
                                            }
                                        },
                                        params.row.tax_password
                                    ),
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'edit',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.handle_edit_unit_pricexxx(params.row, params.index);
                                                }
                                            }
                                        }
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            value: this.data[params.index].tax_password,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].tax_password = event.target.value;
                                            }
                                        }
                                    }),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'info',
                                                size: 'small'
                                            },
                                            style: {
                                                display: 'inline-block'
                                            },
                                            on: {
                                                click: () => {
                                                    _self.update_taxpassword(params.index);
                                                }
                                            }
                                        },
                                        '保存'
                                    )
                                ]);
                            }
                        }
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
                            let _self = this;
                            if (params.row.shebao == undefined) {
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
                                return h('div', params.row.shebao.slice(0, 10));
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
                                let temp = params.row.accountList
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "归属公司",
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
                                                    h("span",{},"公司名：" + item.taskContent),
                                                    h("Button",
                                                        {
                                                            props: {
                                                                type: 'primary',
                                                                size: 'small'
                                                            },
                                                            style:{
                                                                marginTop:'-3px',
                                                                marginLeft:'15px'
                                                            },
                                                            on: {
                                                                click: function() {
                                                                    _self.completed(params.row, params.index);
                                                                }
                                                            },
                                                        },
                                                        "完成"
                                                    )
                                                    ]
                                                )

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
                                                        h("span",{},"公司名：" + item.taskContent),
                                                        h("Button",
                                                            {
                                                                props: {
                                                                    type: 'primary',
                                                                    size: 'small'
                                                                },
                                                                style:{
                                                                    marginTop:'-3px',
                                                                    marginLeft:'15px'
                                                                },
                                                                on: {
                                                                    click: function() {
                                                                        _self.completed(params.row, params.index);
                                                                    }
                                                                },
                                                            },
                                                            "完成"
                                                        )
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
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.l) {
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
                                        params.row.unit_price
                                    ),
                                    h(
                                        'Button',{
                                            style: {
                                                display: 'inline-block',
                                                marginTop:'-3px'
                                            },
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.level(params.row);
                                                }
                                            }
                                        },"[升级]"),
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'edit',
                                                size: 'small'
                                            },
                                            on: {
                                                click: function() {
                                                    _self.handle_edit_unit_pricel(params.row, params.index);
                                                }
                                            }
                                        }
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            value: this.data[params.index].unit_price,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].unit_price = event.target.value;
                                            }
                                        }
                                    }),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'info',
                                                size: 'small'
                                            },
                                            style: {
                                                display: 'inline-block'
                                            },
                                            on: {
                                                click: () => {
                                                    console.log('123');
                                                    _self.update_unit_price(params.index);
                                                }
                                            }
                                        },
                                        '保存'
                                    )
                                ]);
                            }
                        }
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
                                let temp = params.row.undoList
                                if (temp[0].taskContent.length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "归属公司",
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
                                                        h("span",{},"公司名：" + item.taskContent),
                                                        h("Button",
                                                            {
                                                                props: {
                                                                    type: 'primary',
                                                                    size: 'small'
                                                                },
                                                                style:{
                                                                    marginTop:'-3px',
                                                                    marginLeft:'15px'
                                                                },
                                                                on: {
                                                                    click: function() {
                                                                        _self.completed(params.row, params.index);
                                                                    }
                                                                },
                                                            },
                                                            "完成"
                                                        )
                                                    ]
                                                )

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
                                                        h("span",{},"公司名：" + item.taskContent),
                                                        h("Button",
                                                            {
                                                                props: {
                                                                    type: 'primary',
                                                                    size: 'small'
                                                                },
                                                                style:{
                                                                    marginTop:'-3px',
                                                                    marginLeft:'15px'
                                                                },
                                                                on: {
                                                                    click: function() {
                                                                        _self.completed(params.row, params.index);
                                                                    }
                                                                },
                                                            },
                                                            "完成"
                                                        )
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
                        minWidth: 120
                    },
                    // {
                    //     title: '税种状态',
                    //     key: 'tax_status',
                    //     minWidth: 120
                    // },
                    {
                        title: '市场',
                        key: 'followbyrealname',
                        minWidth: 120
                    },
                    {
                        title: '服务会计',
                        key: 'realname',
                        minWidth: 120
                    },
                    // {
                    //     title: '本月税报结果',
                    //     key: 'r',
                    //     minWidth: 120
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
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
            invoice(e){
                this.$bus.emit("OPEN_INVOICE_PAGE",e)
            },
            level(e){
                this.$bus.emit("OPEN_LEVEL_PAGE",e)
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
                this.SearchValidate.note_kj_flag = '';
                this.SearchValidate.etaxStatus = '';
                this.Search();
            },
            handle_edit_unit_price(row, index) {
                this.currentIndex= index;
            },
            handle_edit_unit_pricex(row, index) {
                this.currentIndexx= index;
            },
            handle_edit_unit_pricexx(row, index) {
                this.currentIndexxx= index;
            },
            handle_edit_unit_pricexxx(row, index) {
                this.currentIndexxxx= index;
            },
            handle_edit_unit_pricel(row,index){
                this.l = index;
            },
            copy(prx){
                let clipboard = new Clipboard('.foo',{
                    text:()=>{
                        return prx
                    }
                })
                console.log(clipboard)
                clipboard.on('success', e=> {
                    this.$Message.success("复制成功")
                    clipboard.destroy()
                });
                clipboard.on('error', e=> {
                    this.$Message.error("该网页不允许复制")
                    clipboard.destroy()
                });

            },
            completed(){
                alert("完成")
            },
            add_important_reminder(){
                alert("新增重要提醒")
            },
            add_account_note(){
                alert("新增做账备注")
            },
            add_unfinished_things(){
                alert("新增未完事项")
            },
            change_accounting(){
                alert("变更会计")
            },
            service_detail(){
                alert("服务详情")
            },
            open_acc_change_log(){
                alert("会计变更日志")
            },
            downloadExcel(){
                alert("导出excel")
            },
            service_offline(){
                alert("服务下线")
            },
            service_paused(){
                alert("服务暂停")
            },
            update_nationalnum(index){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
                let config = {
                    companyId:_self.data[index].company_id,
                    type:"nationalnum",
                    text:_self.data[index].nationalnum
                }
                function success(res){
                    _self.currentIndex=-1
                    _self.get_data()
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            update_nationalpsw(index){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
                let config = {
                    companyId:_self.data[index].company_id,
                    type:"nationalpsw",
                    text:_self.data[index].nationalpsw
                }
                function success(res){
                    _self.currentIndexx=-1
                    _self.get_data()
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
                },
            update_taxnumber(index){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
                let config = {
                    companyId:_self.data[index].company_id,
                    type:"taxNumber",
                    text:_self.data[index].tax_number
                }
                function success(res){
                    _self.currentIndexxx=-1
                    _self.get_data()
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
                },
            update_taxpassword(index){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
                let config = {
                    companyId:_self.data[index].company_id,
                    type:"taxPassword",
                    text:_self.data[index].tax_password
                }
                function success(res){
                    _self.currentIndexxxx=-1
                    _self.get_data()
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
                },
            async update_unit_price(index) {
                let config = {
                    workOrderId: this.data[index].cycle_work_order_id,
                    unitprice: this.data[index].unit_price
                };

                try {
                    let { status, data } = await accountApi.workOrderCycleUnitPriceUpdate(config);
                    if (status) {
                        (this.l = -5), this.get_data();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/cycleMothList`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        period: _self.period,
                        sortField: 'updatedate',
                        companyname: _self.SearchValidate.CompanyName,
                        realname: _self.SearchValidate.server_realname,
                        followbyrealname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        note_kj_flag: _self.SearchValidate.note_kj_flag,
                        hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
                        hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
                        hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : ''
                    }
                }
                    function success(res){
                        _self.data = res.data.data.rows
                        _self.pageTotal = res.data.data.total
                        _self.loading = false
                    }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            let _self = this
            let date = new Date()
            _self.period = DateFormatYearMonth2(date)
            _self.get_data()
        }
    }
</script>

<style>

</style>