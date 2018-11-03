<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px;">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="search">
                            <Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户名称：" prop="name">
                                            <Input v-model="formValidate.name" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="电话：" prop="tel">
                                            <Input v-model="formValidate.tel" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="归属公司：" prop="companyname">
                                            <Input v-model="formValidate.companyname" size="small" ></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="跟进人：" prop="followbyname">
                                            <Input v-model="formValidate.followbyname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="客户状态：" prop="customerType">
                                            <Cascader trigger="hover" :data="customerTypes_Casr" v-model="formValidate.customerType" size="small" style="margin-top:5px;width:100%"></Cascader>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="区域：" prop="area">
                                            <Select transfer v-model="formValidate.area" size="small" @on-change="search" >
                                                <Option v-for="item in area" :value="item.typecode" :key="item.id">
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户来源：" prop="customersource">
                                            <Select transfer v-model="formValidate.customersource" size="small" @on-change="search" style="width:100%">
                                                <Option v-for="item in cluesources" :value="item.typecode" :key="item.id" >
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="渠道名称：" prop="channelTypeName">
                                            <Input v-model="formValidate.channelTypeName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="微信绑定：" prop="isbound">
                                            <Select transfer v-model="formValidate.isbound" size="small" @on-change="search" style="width:100%">
                                                <Option value="Y">是</Option>
                                                <Option value="N">否</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="创建时间：" prop="credate">
                                            <DatePicker type="daterange"  transfer v-model="formValidate.credate" placement="bottom-end" size="small" style="width:100%"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="更新时间：" prop="upddate">
                                            <DatePicker type="daterange"  transfer v-model="formValidate.upddate" placement="bottom-start" size="small" style="width:100%"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="标签：" prop="labelName">
                                            <Input v-model="formValidate.labelName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户等级：" prop="importlevel">
                                            <Select transfer v-model="formValidate.importlevel" size="small" @on-change="search"  style="width:100%">
                                                <Option value=""></Option>
                                                <Option v-for="item in customerrating" :value="item.typecode" :key="item.id">
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="剩余跟进时间：" prop="begin_residue_time">
                                            <Input  v-model="formValidate.begin_residue_time" size="small" style="width:30%" placeholder="起始"></Input> - 
                                            <Input  v-model="formValidate.end_residue_time" size="small" style="width:30%" placeholder="结束"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="客户重要性：" prop="importance">
                                            <Select transfer v-model="formValidate.importance" size="small" @on-change="search"  style="width:100%">
                                                <Option value="">     </Option>
                                                <Option v-for="item in importance" :value="item.typecode" :key="item.id">
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem style="margin-top:10px">
                                        <Button type="primary" name="marketingManagement_index_edit_search" @click="search">搜索</Button>
                                        <Button type="ghost" name="marketingManagement_index_edit_reset" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" name="marketingManagement_index_edit_add" icon="plus" @click="create_customer" v-permission="['marketingM.add']">录入</Button>
                    <Button type="primary" name="marketingManagement_index_edit_edit" icon="edit" @click="open_edit" v-permission="['marketingM.edit']">编辑</Button>
                    <Button type="primary" name="marketingManagement_index_edit_change" icon="ios-crop" @click="check_select('CUSTOMER_CHANGE_MARKETER')" v-permission="['marketingM.change']">变更</Button>
                    <Button type="primary" name="marketingManagement_index_edit_delete" icon="trash-b" @click="check_select('DELETE_CUSTOMER')" v-permission="['marketingM.delete']">删除</Button>
                    <Button type="primary" name="marketingManagement_index_edit_qrcode" icon="grid" @click="check_select('OPEN_CODE')">查看二维码</Button>
                    <Button type="primary" name="marketingManagement_index_edit_excel" icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                    <Button type="primary" name="marketingManagement_index_info_log" icon="ios-color-filter-outline" @click="check_select('OPEN_CHANGE_LOG')">销售变更日志</Button>
                    <Button type="primary" name="marketingManagement_index_edit_log" icon="ios-color-filter-outline" @click="check_select('OPEN_CUSTOMER_LOG')">客户动态</Button>
                    <Button type="primary" name="marketingManagement_index_field_log" icon="ios-color-filter-outline" @click="check_select('OPEN_CUSTOMER_FIELD_LOG')">客户外勤</Button>
                    <Button type="primary" name="marketingManagement_index_field_log" icon="ios-color-filter-outline" @click="check_select('OPEN_CUSTOMER_CLUE_LOG')">客户线索</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    @on-current-change="select_row"
                    :row-class-name="row_class_name"
                    :loading = "tableLoading"
                    @on-row-dblclick="open_edit"
                    @on-sort-change="sort"
                ></Table>
                <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="page_change"
                    @on-page-size-change="page_size_change"
                    style="margin-top: 10px">
                </Page>
            </Row>
        </Card>
        
        <tag-select></tag-select>
        <create-customer v-if="createCustomerStatus"
            :cluesources="cluesources"
            :customerrating="customerrating"
            :area="area"
            :sf_yn="sf_yn"
            :importance="importance"
            :customerTypes_Casr="customerTypes_Casr"
        ></create-customer>
        <change-marker></change-marker>
        <change-log></change-log>
        <clue-log></clue-log>
        <field></field>
        <dymaic></dymaic>
        <Qcode></Qcode>
        <del-customer></del-customer>
        <edit-customer 
            :customer="selectRow"
            @close-edit="close_edit" 
            v-if="openEdit"
            :cluesources="cluesources"
            :customerrating="customerrating"
            :area="area"
            :sf_yn="sf_yn"
            :importance="importance"
            :customerTypes_Casr="customerTypes_Casr"
        ></edit-customer>
    </div>
</template>

<script>
import commonVue from './commonVue'
import { DateFormat } from '../../../libs/utils'

import tagSelect from './components/tag_select'

import createCustomer from './components/create'
import editCustomer from './edit/index'

import changeMarker from './op/change'
import changeLog from './op/changeLog'
import clueLog from './op/clue'
import field from './op/field'
import dymaic from './op/dymaic'
import Qcode from './op/code'
import delCustomer from './op/del'

export default {
    mixins: [commonVue],
    components:{
        createCustomer,
        tagSelect,
        changeMarker,
        changeLog,
        clueLog,
        field,
        dymaic,
        Qcode,
        delCustomer,
        editCustomer
    },
    data(){
        return {
            openEdit: false,
            search_model: "",
            header: [
                {
                    title: "姓名",
                    key: "NAME",
                    sortable: "custom",
                    width: 120
                },
                {
                    title: "归属公司",
                    key: "companynames",
                    width: 210,
                    render: (h, params) => {
                        if (params.row.companynames == "" || params.row.companynames == null) {
                            return "";
                        } else {
                            // console.log(params.row.companynames)
                            let temp = params.row.companynames.split(",")
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
                    title: "剩余时间(天)",
                    key: "residue_time",
                    width: 130,
                    sortable: "custom"
                },
                {
                    title: "电话",
                    key: "TEL",
                    width: 120
                },
                {
                    title: "客户状态",
                    key: "customerType",
                    width: 140,
                    sortable: "custom"
                },
                {
                    title: "客户来源",
                    key: "customersource",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "客户等级",
                    key: "importlevel",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "客户重要性",
                    key: "importance",
                    width: 120,
                },
                {
                    title: "区域",
                    key: "AREA",
                    width: 80,
                    sortable: "custom"
                },
                {
                    title: "渠道名称",
                    key: "channelTypeName",
                    width: 140,
                    sortable: "custom"
                },
                {
                    title: "跟进人",
                    key: "followbyname",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "创建时间",
                    key: "CREATEDATE",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "线索权重",
                    key: "clue_ranks",
                    minWidth: 120,
                    sortable: "custom"
                },
                {
                    title: "更新时间",
                    key: "updatedate",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "微信绑定",
                    key: "isbound",
                    width: 90
                }
            ],
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            tableLoading: true,
            formValidate: {
                name: "",
                tel: "",
                companyname: "",
                followbyname: "",
                customerType: [],
                area: "",
                customersource: "",
                channelTypeName: "",
                isbound: "",
                credate: [],
                upddate: [],
                labelName: "",
                importlevel: "",
                begin_residue_time: "",
                end_residue_time: "",
                importance: "",
                order: "desc",
                sortField: "updatedate",
            },
            //  模态框控制
            createCustomerStatus: false,
        }
    },
    methods: {
        //  下载
        download_excel() {
            let field = [
                { field: "NAME", title: "姓名" },
                { field: "companynames", title: "公司" },
                { field: "customerType", title: "客户状态", format: "customerTypes" },
                { field: "customersource", title: "客户来源", format: "cluesources" },
                { field: "importlevel", title: "客户等级", format: "importlevel" },
                { field: "AREA", title: "地区", format: "area" },
                { field: "channelTypeName", title: "渠道名称" },
                { field: "followbyname", title: "跟进人" },
                { field: "CREATEDATE", title: "创建时间" },
                { field: "updatedate", title: "更新时间" },
                { field: "isbound", title: "微信绑定", format: "sf_yn" },
                { field: "lastfollowdate", title: "市场最后跟进时间" },
                { field: "importance", title:"客户重要性", format: "importance"}
            ];
            let _self = this;
            _self.$ButtonCollect("marketingManagement_index_edit_excel");

            //  当初为什么有这种写法，思考
            // let temp_status = "";
            // if (_self.formValidate.customerType.length != 2){
            //     temp_status = "";
            // }else{
            //     temp_status = _self.formValidate.customerType.join("-");
            // }
            let url = `api/customer/list`;
            let config = {
                page: "1",
                pageSize: "1000000",
                name: _self.formValidate.name,
                tel: _self.formValidate.tel,
                customerType: _self.formValidate.customerType.join("-"),
                // customerType: temp_status,
                channelTypeName: _self.formValidate.channelTypeName,
                followbyname: _self.formValidate.followbyname,
                isbound: _self.formValidate.isbound,
                customersource: _self.formValidate.customersource,
                area: _self.formValidate.area,
                companyname: _self.formValidate.companyname,
                labelName: _self.formValidate.labelName,
                importlevel: _self.formValidate.importlevel,
                importance: _self.formValidate.importance,
                bcreatedate: DateFormat(_self.formValidate.credate[0]),
                ecreatedate: DateFormat(_self.formValidate.credate[1]),
                bupdatedate: DateFormat(_self.formValidate.upddate[0]),
                eupdatedate: DateFormat(_self.formValidate.upddate[1]),
                export: "Y",
                exportField: encodeURI(JSON.stringify(field))
            };
            let toExcel = this.$MergeURL(url, config);
            window.open(toExcel);
        },
        sort(e){
            if (e.order == "normal") {
                this.order = "";
                this.sortName = "updatedate";
            } else {
                this.sortName = e.key;
                this.order = e.order;
            }
            this.get_data()
        },
        search(){
            this.page = 1
            this.get_data()
        },
        handleReset(){
            this.page = 1
            this.$refs["formValidate"].resetFields()
            this.formValidate.credate = []
            this.formValidate.upddate = []
            this.formValidate.end_residue_time = ""
            this.formValidate.customerType = []
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = `api/customer/list`
            this.selectRow = ""
            _self.tableLoading = true

            var config = {
                params: {
                    order: _self.order,
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: _self.sortName,
                    name: _self.formValidate.name,
                    tel: _self.formValidate.tel,
                    customerType: _self.formValidate.customerType.join("-"),
                    // customerType: temp_status,
                    channelTypeName: _self.formValidate.channelTypeName,
                    followbyname: _self.formValidate.followbyname,
                    isbound: _self.formValidate.isbound,
                    customersource: _self.formValidate.customersource,
                    area: _self.formValidate.area,
                    labelName: _self.formValidate.labelName,
                    importlevel: _self.formValidate.importlevel,
                    companyName: _self.formValidate.companyname,
                    importance: _self.formValidate.importance,
                    bcreatedate: DateFormat(_self.formValidate.credate[0]),
                    ecreatedate: DateFormat(_self.formValidate.credate[1]),
                    bupdatedate: DateFormat(_self.formValidate.upddate[0]),
                    eupdatedate: DateFormat(_self.formValidate.upddate[1]),
                    begin_residue_time: _self.formValidate.begin_residue_time,
                    end_residue_time: _self.formValidate.end_residue_time
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i<_self.data.length; i++){
                    _self.data[i].customerType = _self.findCustomerType(_self.data[i].customerType)
                    if(_self.data[i].importlevel){
                        _self.data[i].importlevel = _self.customerrating_map.get(_self.data[i].importlevel.toString())
                    }
                    _self.data[i].AREA = _self.area_map.get(_self.data[i].AREA)
                    _self.data[i].customersource = _self.cluesources_map.get(_self.data[i].customersource)
                    _self.data[i].importance = _self.importance_map.get(_self.data[i].importance)
                    _self.data[i].isbound = _self.sf_yn_map.get(_self.data[i].isbound)
                    if (_self.data[i].CREATEDATE) {
                        _self.data[i].CREATEDATE = _self.data[i].CREATEDATE.slice(0, 10);
                    }
                    if (_self.data[i].updatedate) {
                        _self.data[i].updatedate = _self.data[i].updatedate.slice(0, 10);
                    }
                    
                    //  剩余跟进时间
                    if (_self.data[i].residue_time == null) {
                    } else {
                        if (_self.data[i].residue_time < 1) {
                            let time = new Date();
                            let hour = 24 - time.getHours();
                            _self.data[i].residue_time = hour + "小时";
                        } else {
                            _self.data[i].residue_time = _self.data[i].residue_time;
                        }
                    }
                }
                
                _self.tableLoading = false
            }

            this.$Get(url, config, success)
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.page = 1
            this.get_data()
        },
        select_row(e){
            this.selectRow = e
        },
        row_class_name(row, index){
            if ((row.residue_time <= 7 || typeof row.residue_time == "string") && row.residue_time != null) {
                return "demo-table-followdate-warning-row";
            } else {
                return "";
            }
        },
        open_edit(){
            if(this.selectRow){
                this.openEdit = true
            }else{
                this.$Message.warning("请选择一行!")
            }
        },
        //  转换客户状态
        findCustomerType(temp) {
        if (temp == "" || temp == null) {
            return "";
        } else {
            let temp2 = temp.split("-");
            let _self = this;
            for (let i = 0; i < _self.customerTypes_array.length; i++) {
                if (_self.customerTypes_array[i].id == temp2[1] && temp2[1] != "") {
                    return (
                        _self.customerTypes_array[i].ptypename + " - " + _self.customerTypes_array[i].typename
                    )
                }
            }
            }
        },
        //  创建客户
        create_customer(){
            if(this.createCustomerStatus == false){
                this.createCustomerStatus = true
                setTimeout(()=>{
                    this.$bus.emit("CREATE_CUSTOMER", true)
                }, 200)
            }else{
                this.$bus.emit("CREATE_CUSTOMER", true)
            }
        },
        close_edit(){
            this.openEdit = false
        }
    },
    created(){
        let _self = this
        //  销售以跟进时间显示
        let temp = localStorage.getItem("Main_Role");
        if (temp == "salers") {
            _self.sortName = "lastfollowdate";
        } else {
            _self.sortName = "updatedate";
        }
        this.get_data_center().then(()=>{
            _self.get_data()
        }).catch(()=>{
            _self.get_data()
            _self.$Message.error("属性转换失败！")
        })
        //  更新表格内容
        this.$bus.off("UPDATE_CUSTOMER", true)
        this.$bus.on("UPDATE_CUSTOMER", (e)=>{
            _self.get_data()
        })
        this.$bus.off("CREATE_AFTER_EDIT", true)
        this.$bus.on("CREATE_AFTER_EDIT", (e)=>{
            e.ID = e.id
            this.selectRow = e
            this.openEdit = true
        })
    }
}
</script>

<style>
.ivu-table .demo-table-followdate-warning-row {
    color: #ff6600;
}
</style>