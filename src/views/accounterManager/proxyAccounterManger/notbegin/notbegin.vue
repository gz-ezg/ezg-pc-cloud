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
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="start_serve">服务开始</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="add_important_reminder">新增重要提醒</Button>
                <Button type="primary" icon="information-circled" @click="add_account_note">新增做账备注</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="add_unfinished_things">新增未完事项</Button>
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
    import * as accountApi from '../serving/api'
    import Bus from '../../../../components/bus'
    export default {
        name: "notbegin",
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                period:"",
                taskSummary:"",
                openFollowUp:false,
                current_row:"",
                currentIndex:-1,
                currentIndexx:-2,
                currentIndexxx:-3,
                currentIndexxxx:-4,
                l:-5,
                cservicest:[],
                cservicest_map:new Map(),
                SearchValidate: {
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    begin_end_period: '',
                    end_end_period: '',
                    departname:''
                    // note_kj_flag: '',
                    // etaxStatus: ''
                },
                data:[],
                header:[
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 250
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
                                            h("span", {
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
                                            },temp[0].taskContent),
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
                                    {
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
                                                h("ul",temp.map(item =>{
                                                        if (temp[i].taskStage =="tesUnstarted") {
                                                            return [
                                                                h("li", {
                                                                        style: {
                                                                            padding: "4px",
                                                                        }
                                                                    },[
                                                                        h("span",{},"备注名：" + item.taskContent),
                                                                        h("Button",
                                                                            {
                                                                                props: {
                                                                                    type: 'primary',
                                                                                    size: 'small',
                                                                                },
                                                                                style:{
                                                                                    marginTop:'-3px',
                                                                                    marginLeft:'15px'
                                                                                },
                                                                                on: {
                                                                                    click: function() {
                                                                                        _self.completed(item.taskId);
                                                                                    }
                                                                                },
                                                                            },
                                                                            "完成"
                                                                        )
                                                                    ]
                                                                )

                                                            ]
                                                        }
                                                        if (item.taskStage=="tesFinished"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("span",
                                                                        {
                                                                            // props: {
                                                                            //     type: 'primary',
                                                                            //     size: 'small',
                                                                            // },
                                                                            style:{
                                                                                // marginTop:'-3px',
                                                                                marginLeft:'15px',
                                                                                color:'rgb(160 191 124)'
                                                                            },
                                                                            // on: {
                                                                            //     click: function() {
                                                                            //         _self.completed(item.taskId);
                                                                            //     }
                                                                            // },
                                                                        },
                                                                        "已完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                    }
                                                ))
                                            ])
                                        ]);
                                    }
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
                                                h("ul",temp.map(item =>{
                                                        if (item.taskStage=="tesUnstarted"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("Button",
                                                                        {
                                                                            props: {
                                                                                type: 'primary',
                                                                                size: 'small',
                                                                            },
                                                                            style:{
                                                                                marginTop:'-3px',
                                                                                marginLeft:'15px'
                                                                            },
                                                                            on: {
                                                                                click: function() {
                                                                                    _self.completed(item.taskId);
                                                                                }
                                                                            },
                                                                        },
                                                                        "完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                        if (item.taskStage=="tesFinished"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("span",
                                                                        {
                                                                            // props: {
                                                                            //     type: 'primary',
                                                                            //     size: 'small',
                                                                            // },
                                                                            style:{
                                                                                // marginTop:'-3px',
                                                                                marginLeft:'15px',
                                                                                color:'rgb(160 191 124)'
                                                                            },
                                                                            // on: {
                                                                            //     click: function() {
                                                                            //         _self.completed(item.taskId);
                                                                            //     }
                                                                            // },
                                                                        },
                                                                        "已完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                    }
                                                ))
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
                                let temp = JSON.parse(params.row.undoList)
                                if (temp[0].taskContent.length > 13) {
                                    {
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
                                                h("ul",temp.map(item =>{
                                                        if (temp[i].taskStage =="tesUnstarted") {
                                                            return [
                                                                h("li", {
                                                                        style: {
                                                                            padding: "4px",
                                                                        }
                                                                    },[
                                                                        h("span",{},"备注名：" + item.taskContent),
                                                                        h("Button",
                                                                            {
                                                                                props: {
                                                                                    type: 'primary',
                                                                                    size: 'small',
                                                                                },
                                                                                style:{
                                                                                    marginTop:'-3px',
                                                                                    marginLeft:'15px'
                                                                                },
                                                                                on: {
                                                                                    click: function() {
                                                                                        _self.completed(item.taskId);
                                                                                    }
                                                                                },
                                                                            },
                                                                            "完成"
                                                                        )
                                                                    ]
                                                                )

                                                            ]
                                                        }
                                                        if (item.taskStage=="tesFinished"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("span",
                                                                        {
                                                                            // props: {
                                                                            //     type: 'primary',
                                                                            //     size: 'small',
                                                                            // },
                                                                            style:{
                                                                                // marginTop:'-3px',
                                                                                marginLeft:'15px',
                                                                                color:'rgb(160 191 124)'
                                                                            },
                                                                            // on: {
                                                                            //     click: function() {
                                                                            //         _self.completed(item.taskId);
                                                                            //     }
                                                                            // },
                                                                        },
                                                                        "已完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                    }
                                                ))
                                            ])
                                        ]);
                                    }
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
                                                h("ul",temp.map(item =>{
                                                        if (item.taskStage=="tesUnstarted"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("Button",
                                                                        {
                                                                            props: {
                                                                                type: 'primary',
                                                                                size: 'small',
                                                                            },
                                                                            style:{
                                                                                marginTop:'-3px',
                                                                                marginLeft:'15px'
                                                                            },
                                                                            on: {
                                                                                click: function() {
                                                                                    _self.completed(item.taskId);
                                                                                }
                                                                            },
                                                                        },
                                                                        "完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                        if (item.taskStage=="tesFinished"){
                                                            return [h("li",
                                                                {
                                                                    style: {
                                                                        padding: "4px"
                                                                    }
                                                                },[
                                                                    h("span",{},"备注名：" + item.taskContent),
                                                                    h("span",
                                                                        {
                                                                            // props: {
                                                                            //     type: 'primary',
                                                                            //     size: 'small',
                                                                            // },
                                                                            style:{
                                                                                // marginTop:'-3px',
                                                                                marginLeft:'15px',
                                                                                color:'rgb(160 191 124)'
                                                                            },
                                                                            // on: {
                                                                            //     click: function() {
                                                                            //         _self.completed(item.taskId);
                                                                            //     }
                                                                            // },
                                                                        },
                                                                        "已完成"
                                                                    )
                                                                ])
                                                            ]
                                                        }
                                                    }
                                                ))
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
                _self.current_row=""
                _self.get_data()
            },

            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.current_row=""
                _self.get_data()
            },
            Search() {
                this.page = 1;
                this.current_row = ""
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
                // this.SearchValidate.note_kj_flag = '';
                // this.SearchValidate.etaxStatus = '';
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
            invoice(e){
                this.$bus.emit("OPEN_INVOICE_PAGE",e)
            },
            data_management(e){
                this.$bus.emit("OPEN_DATA_MANAGEMENT",e)
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
            completed(id){
                let _self = this;
                _self.comLoading = true;
                let url = `api/order/cycle/service/dljz/fininshTask`;
                let config = {
                    params:{
                        taskId:id,
                        taskSummary:_self.taskSummary,
                        mission:"Completed"
                    }
                }
                function success(res){
                    _self.comLoading = false
                    _self.get_data()
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            field(e){
                this.$bus.emit("OPEN_FIELD_DETAIL",e)
            },
            open_import_list(e){
                this.$bus.emit("OPEN_IMPORT_LIST",e)
            },
            level(e){
                this.$bus.emit("OPEN_LEVEL_PAGE",e)
            },
            start_serve(){
                if (this.current_row=="" || this.current_row==null) {
                    this.$Message.warning("请选择一行进行操作")
                }else{
                    console.log(this.current_row.id)
                    this.$store.commit('setPageId', this.current_row.id)
                    this.$store.commit('open_gobal_company_detail_modal', this.current_row.company_id)
                }
            },
            add_important_reminder(){
                if (this.current_row=="" || this.current_row==null) {
                    this.$Message.warning("请选择一行进行操作")
                }else{
                    this.$bus.emit("OPEN_ADD_IMPORTANT_REMINDER",this.current_row)
                }
            },
            add_account_note(){
                if (this.current_row=="" || this.current_row==null) {
                    this.$Message.warning("请选择一行进行操作")
                }else {
                    this.$bus.emit("OPEN_ADD_ACCOUNT_NOTE", this.current_row)
                }
            },
            add_unfinished_things(){
                if (this.current_row=="" || this.current_row==null) {
                    this.$Message.warning("请选择一行进行操作")
                }else {
                    this.$bus.emit("OPEN_ADD_UNFINISHED_THINGS", this.current_row)
                }
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
                let url = `api/order/cycle/service/dljz/cycleRecordList`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        service_status:"notStarted",
                        sortField: 'unit_price',
                        service_type:"dljz",
                        CompanyName: _self.SearchValidate.CompanyName,
                        server_realname: _self.SearchValidate.server_realname,
                        followby_realname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        departname:_self.SearchValidate.departname
                        // note_kj_flag: _self.SearchValidate.note_kj_flag,
                        // hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
                        // hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
                        // hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : ''
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows
                    _self.data = res.data.data.rows.map(item => {
                        item.service_status = _self.cservicest_map.get(item.service_status);
                        item.remainder = item.remainder == null ? '0': item.remainder
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
                let params = 'cservicest,managestatus,financialLevel';
                try {
                    let { cservicest, managestatus, financialLevel } = await accountApi.getDictionary(params);
                    this.cservicest = cservicest;
                    this.cservicest_map = this.$array2map(this.cservicest);
                    this.managestatus = managestatus;
                    this.managestatus_map = this.$array2map(managestatus);
                    this.financialLevel = financialLevel;
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
            Bus.$on('UPDATE_INDEX',e=>{
                _self.get_data()
                _self.current_row = ""
            })
        }
    }
</script>

<style>

</style>