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
    </Card>
</template>

<script>
    import Clipboard from 'clipboard'
    export default {
        name: "serving",
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
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
                        key: 'a',
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
                        key: 'c',
                        minWidth: 180,
                        render: (h, params) => {
                            if (params.row.c == "" || params.row.c == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.c.split(",")
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
                        title: '实名账号',
                        key: 'd',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != _self.currentIndex) {
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            props:{
                                                dataClipboardText:params.row.d
                                            },
                                            // domProps: {
                                            //     innerHTML: 'baz'
                                            // },
                                            class: {
                                                  foo: true,
                                                  bar: false
                                                     },
                                            style: {
                                                display: 'inline-block',
                                                lineHeight: '24px',
                                                height: '24px',
                                                width: '40px',
                                                cursor:'pointer'
                                            },
                                            on:{
                                                click: function() {
                                                    _self.copy(params.row, params.index);
                                                }
                                            }
                                        },
                                        params.row.d
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
                                            value: this.data[params.index].d,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].d = event.target.value;
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
                                                    // _self.update_unit_price(params.index);
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
                        key: 'f',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            console.log(params.index)
                            if (params.index != this.currentIndexx) {
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
                                        params.row.f
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
                                            value: this.data[params.index].f,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].f = event.target.value;
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
                                                    // _self.update_unit_price(params.index);
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
                        key: 'g',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.currentIndexxx) {
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
                                        params.row.g
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
                                            value: this.data[params.index].g,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].g = event.target.value;
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
                                                    // _self.update_unit_price(params.index);
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
                        key: 'h',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            if (params.index != this.currentIndexxxx) {
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
                                        params.row.h
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
                                            value: this.data[params.index].h,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].h = event.target.value;
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
                                                    // _self.update_unit_price(params.index);
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
                        key: 'i',
                        minWidth: 120
                    },
                    {
                        title: '社保',
                        key: 'j',
                        minWidth: 150,
                        render: (h, params) => {
                            let _self = this;
                            console.log(params.index)
                            if (params.row.j == undefined) {
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
                                                    this.completed(params.row.j);
                                                }
                                            }
                                        },
                                        '[ 完成 ]'
                                    )
                                ]);
                            } else {
                                return h('div', params.row.j.slice(0, 10));
                            }
                            }
                    },
                    {
                        title: '做账备注',
                        key: 'k',
                        minWidth: 120,
                        render: (h, params) => {
                            let _self = this
                            if (params.row.k == "" || params.row.k == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.k.split(",")
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
                                                        padding: "4px",
                                                    }
                                                },[
                                                    h("span",{},"公司名：" + item),
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
                                                    },[
                                                        h("span",{},"公司名：" + item),
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
                        key: 'l',
                        minWidth: 180,
                        render: (h, params) => {
                            let _self = this;
                            console.log(params.index)
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
                                        params.row.l
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
                                                    _self.level(params.row, params.index);
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
                                            value: this.data[params.index].l,
                                            size: 'small'
                                        },
                                        style: {
                                            display: 'inline-block',
                                            width: '60px'
                                        },
                                        on: {
                                            'on-blur': function(event) {
                                                _self.data[params.index].l = event.target.value;
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
                                                    // _self.update_unit_price(params.index);
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
                        key: 'm',
                        minWidth: 120,
                        render: (h, params) => {
                            let _self = this
                            if (params.row.m == "" || params.row.m == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.m.split(",")
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
                                                            padding: "4px",
                                                        }
                                                    },[
                                                        h("span",{},"公司名：" + item),
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
                                                    },[
                                                        h("span",{},"公司名：" + item),
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
                        key: 'n',
                        minWidth: 120
                    },
                    {
                        title: '税种状态',
                        key: 'o',
                        minWidth: 120
                    },
                    {
                        title: '市场',
                        key: 'p',
                        minWidth: 120
                    },
                    {
                        title: '服务会计',
                        key: 'q',
                        minWidth: 120
                    },
                    {
                        title: '本月税报结果',
                        key: 'r',
                        minWidth: 120
                    },
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
                                                this.$store.commit('open_gobal_company_detail_modal', params.row.company_id);
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
                                                if (params.row.batchBookId != null) {
                                                    Bus.$emit('open_yichang_detail', params.row.batchBookId);
                                                } else {
                                                    this.$Message.warning('未绑定账本');
                                                }
                                            }
                                        }
                                    },
                                    '[资料管理]'
                                )
                            ]);
                        }
                    },
                    // {
                    //     title: '单价',
                    //     key: 'unit_price',
                    //     minWidth: 160,
                    //     render: (h, params) => {
                    //         let _self = this;
                    //         if (params.index != this.currentIndex) {
                    //             return h('div', [
                    //                 h(
                    //                     'span',
                    //                     {
                    //                         style: {
                    //                             display: 'inline-block',
                    //                             lineHeight: '24px',
                    //                             height: '24px',
                    //                             width: '40px'
                    //                         }
                    //                     },
                    //                     params.row.unit_price
                    //                 ),
                    //                 h(
                    //                     'Button',
                    //                     {
                    //                         props: {
                    //                             type: 'text',
                    //                             size: 'small'
                    //                         },
                    //                         on: {
                    //                             click: function() {
                    //                                 _self.handle_edit_unit_price(params.row, params.index);
                    //                             }
                    //                         }
                    //                     },
                    //                     '修改'
                    //                 )
                    //             ]);
                    //         } else {
                    //             return h('div', [
                    //                 h('Input', {
                    //                     props: {
                    //                         value: this.data[params.index].unit_price,
                    //                         size: 'small'
                    //                     },
                    //                     style: {
                    //                         display: 'inline-block',
                    //                         width: '60px'
                    //                     },
                    //                     on: {
                    //                         'on-blur': function(event) {
                    //                             _self.data[params.index].unit_price = event.target.value;
                    //                         }
                    //                     }
                    //                 }),
                    //                 h(
                    //                     'Button',
                    //                     {
                    //                         props: {
                    //                             type: 'info',
                    //                             size: 'small'
                    //                         },
                    //                         style: {
                    //                             display: 'inline-block'
                    //                         },
                    //                         on: {
                    //                             click: () => {
                    //                                 console.log('123');
                    //                                 _self.update_unit_price(params.index);
                    //                             }
                    //                         }
                    //                     },
                    //                     '保存'
                    //                 )
                    //             ]);
                    //         }
                    //     }
                    // },
                    // {
                    //     title: '备注',
                    //     key: 'memo',
                    //     minWidth: 200,
                    //     render: (h, params) => {
                    //         return h('div', {
                    //             domProps: {
                    //                 innerHTML: params.row.memo
                    //             }
                    //         });
                    //     }
                    //     // render:(h,params) => {
                    //     //     if(params.row.memo == ''||params.row.memo == null){
                    //     //         return ''
                    //     //     }else if(params.row.memo.length>12){
                    //     //         return h('Poptip',{
                    //     //             props:{
                    //     //                 trigger:'hover',
                    //     //                 placement:'bottom'
                    //     //             }
                    //     //         },[
                    //     //             h('span',params.row.memo.slice(0,12)+'...'),
                    //     //             h('Icon', {
                    //     //                 props: {
                    //     //                     type: 'arrow-down-b',
                    //     //                 }
                    //     //             }),
                    //     //             h('div',{
                    //     //                 slot:'content',
                    //
                    //     //             },[
                    //     //                 h('span',params.row.memo)
                    //     //             ])
                    //     //         ])
                    //     //     }else{
                    //     //         return h('span',params.row.memo)
                    //     //     }
                    //     // }
                    // },
                    // {
                    //     title: '报税',
                    //     key: 'baoshui',
                    //     width: 120,
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         let reg = /^[-+]?\d*$/;
                    //         if (params.row.baoshui.confirm_date == undefined) {
                    //             return h('div', [
                    //                 h(
                    //                     'Button',
                    //                     {
                    //                         props: {
                    //                             type: 'text',
                    //                             size: 'small'
                    //                         },
                    //                         on: {
                    //                             click: () => {
                    //                                 this.zlwc(params.row.baoshui);
                    //                             }
                    //                         }
                    //                     },
                    //                     '[ 完成 ]'
                    //                 )
                    //             ]);
                    //         } else {
                    //             return h('div', params.row.baoshui.confirm_date.slice(0, 10));
                    //         }
                    //     }
                    // },
                    // {
                    //     title: '做账',
                    //     key: 'zuozhang',
                    //     align: 'center',
                    //     width: 120,
                    //     render: (h, params) => {
                    //         let reg = /^[-+]?\d*$/;
                    //         if (params.row.zuozhang.confirm_date == undefined) {
                    //             return h('div', [
                    //                 h(
                    //                     'Button',
                    //                     {
                    //                         props: {
                    //                             type: 'text',
                    //                             size: 'small'
                    //                         },
                    //                         on: {
                    //                             click: () => {
                    //                                 this.zlwc(params.row.zuozhang);
                    //                             }
                    //                         }
                    //                     },
                    //                     '[ 完成 ]'
                    //                 )
                    //             ]);
                    //         } else {
                    //             return h('div', params.row.zuozhang.confirm_date.slice(0, 10));
                    //         }
                    //     }
                    // },
                    // {
                    //     title: '客户跟进',
                    //     key: 'note_kj_flag',
                    //     minWidth: 120
                    // },
                    // {
                    //     title: '警戒值',
                    //     key: 'accounter_security_line',
                    //     minWidth: 120
                    // },
                    // {
                    //     title: '账务等级',
                    //     key: 'accountgrade',
                    //     minWidth: 120
                    // },
                    // {
                    //     title: '累计外勤',
                    //     key: 'dljz_legwork',
                    //     minWidth: 100
                    // },
                    // {
                    //     title: '实名账号',
                    //     key: 'has_account',
                    //     minWidth: 120
                    // },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     fixed: 'right',
                    //     width: 200,
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h(
                    //                 'Button',
                    //                 {
                    //                     props: {
                    //                         type: 'text',
                    //                         size: 'small'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                             this.$store.commit('open_gobal_company_detail_modal', params.row.company_id);
                    //                         }
                    //                     }
                    //                 },
                    //                 '[查看公司]'
                    //             ),
                    //             h(
                    //                 'Button',
                    //                 {
                    //                     props: {
                    //                         type: 'text',
                    //                         size: 'small'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                             if (params.row.batchBookId != null) {
                    //                                 Bus.$emit('open_yichang_detail', params.row.batchBookId);
                    //                             } else {
                    //                                 this.$Message.warning('未绑定账本');
                    //                             }
                    //                         }
                    //                     }
                    //                 },
                    //                 '[查看异常]'
                    //             )
                    //         ]);
                    //     }
                    // }
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
            },

            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
            },
            Search() {
                this.page = 1;
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
            copy(){
                let clipboard = new Clipboard('.foo')
                clipboard
            },
            completed(){
                alert("完成")
            },
            level(){
                alert("升级")
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
        }
    }
</script>

<style>

</style>