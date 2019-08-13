<template>
    <Card>
        <Row style="margin-bottom:20px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div slot="content" @keydown.enter="Search">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                            <Row  style="height:56px">
                                <Col span="6">
                                    <FormItem label="姓名：" prop="name">
                                        <Input v-model="SearchValidate.name" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="入职时间：" prop="inductionDate">
                                        <DatePicker type="daterange" size="small" v-model="SearchValidate.inductionDate" style="width:100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="性别：" prop="sex">
                                        <Select v-model="SearchValidate.sex" size="small" style="width:100%">
                                            <Option value="男">男</Option>
                                            <Option value="女">女</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="是否员工手册：" prop="ifEmployeeHandbook">
                                        <Select v-model="SearchValidate.ifEmployeeHandbook" size="small" style="width:100%">
                                            <Option value="0">是</Option>
                                            <Option value="1">否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row  style="height:56px">
                                <Col span="6">
                                    <FormItem label="所在省份：" prop="provinceId">
                                        <Cascader :data="provinceData" v-model="SearchValidate.provinceId" change-on-select></Cascader>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="转正时间：" prop="positiveDate">
                                        <DatePicker type="daterange" v-model="SearchValidate.positiveDate" size="small"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="出生年月：" prop="birthday">
                                        <DatePicker type="daterange" v-model="SearchValidate.birthday" size="small" style="width:100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="最高学历：" prop="highest_education">
                                        <Input v-model="SearchValidate.highest_education" size="small"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row  style="height:56px">
                            <Col span="6">
                                <FormItem label="部门：" prop="departId">
                                    <Cascader :render-format="format" :data="departData" v-model="SearchValidate.departId" change-on-select></Cascader>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="职位：" prop="position">
                                    <Select v-model="SearchValidate.position" size="small" type="text" transfer>
                                        <Option v-for="(item,index) in applyPosition" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="是否劳动合同：" prop="ifLaborContract">
                                    <Select v-model="SearchValidate.ifLaborContract" size="small" style="width:100%">
                                        <Option value="0">是</Option>
                                        <Option value="1">否</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="是否试用：" prop="ifTrial">
                                    <Select v-model="SearchValidate.ifTrial" size="small" style="width:100%">
                                        <Option value="0">是</Option>
                                        <Option value="1">否</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                            <Row  style="height:56px">
                                <Col span="6">
                                    <FormItem label="入职年月数：" prop="inductionMoth">
                                        <Input type="number" v-model="SearchValidate.inductionMoth" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="婚姻状况：" prop="maritalStatus">
                                        <Select v-model="SearchValidate.maritalStatus" size="small" style="width:100%">
                                            <Option :value="0">已婚</Option>
                                            <Option :value="1">未婚</Option>
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
                <Button type="primary" icon="ios-color-wand-outline" @click="add">录入</Button>
                <Button type="primary" icon="information-circled" @click="show">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit">修改</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="import_excel">导入Excel</Button>-->
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    @on-row-dblclick="show"
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
        <info :provinceData="provinceData" :departData="departData" :applyPosition="applyPosition" :employeesStatus="employeesStatus" :maritalStatus="maritalStatus" :sf01="sf01"></info>
    </Card>
</template>

<script>
    import {DateFormat} from "../../../../libs/utils";
    import Info from '../common/detail'
    export default {
        name: "index",
        components:{
            Info
        },
        data(){
            return{
                search_model: '',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                provinceData:[],
                departData:[],
                applyPosition:[],
                employeesStatus:[],
                maritalStatus:[],
                sf01:[],
                applyPosition_map:new Map(),
                employeesStatus_map:new Map(),
                maritalStatus_map:new Map(),
                sf01_map:new Map(),
                SearchValidate: {
                    name:"",
                    inductionDate:"",
                    sex:"",
                    ifEmployeeHandbook:"",
                    positiveDate:"",
                    birthday:"",
                    provinceId:"",
                    cityId:"",
                    departId:"",
                    position:"",
                    ifLaborContract:"",
                    ifTrial:"",
                    maritalStatus:"",
                    inductionMoth:"",
                    highest_education:""
                },
                data:[],
                data2:[],
                header: [
                    {
                        title: '姓名',
                        fixed: 'left',
                        key: 'name',
                        minWidth: 120
                    },
                    {
                        title: '部门',
                        key: 'departname',
                        width: 180,
                    },
                    {
                        title: '职位',
                        key: 'position',
                        minWidth: 220,
                        render: (h, params) => {
                            let _self = this
                            return h('div',{},_self.applyPosition_map.get(params.row.position))}
                    },
                    {
                        title: '学历',
                        key: 'highest_education',
                        minWidth: 150,
                    },
                    {
                        title: '毕业年份',
                        key: 'graduation_date',
                        minWidth: 150,
                    },
                    {
                        title: '毕业院校',
                        key: 'graduated_school',
                        minWidth: 150,
                    },
                    {
                        title: '入职时间',
                        key: 'induction_date',
                        minWidth: 150,
                    },
                    {
                        title: '联系方式',
                        key: 'tel',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                                this.leave(params.row);
                                            }
                                        }
                                    },
                                    '[确定离职]'
                                )
                            ]);
                        }
                    },
                ]
            }
        },
        methods:{
            format(labels, selectedData){
                const index = labels.length - 1;
                // const data = selectedData[index] || false;
                // if (data && data.departname) {
                //     return labels[index] + ' - ' + data.code;
                // }
                return labels[index];
            },
            selectRow(e) {
                console.log(e)
                this.current_row = e;
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            handleReset(){
                this.SearchValidate = {
                    name:"",
                    inductionDate:"",
                    sex:"",
                    ifEmployeeHandbook:"",
                    positiveDate:"",
                    birthday:"",
                    provinceId:"",
                    cityId:"",
                    departId:"",
                    position:"",
                    ifLaborContract:"",
                    ifTrial:"",
                    maritalStatus:"",
                    inductionMoth:""
                }
                this.get_data()
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
            add(){
                this.$bus.emit("ADD_EMPLOY_INFO",true)
            },
            show(){
                if (this.current_row) {
                    console.log(this.current_row)
                    this.$bus.emit("SHOW_EMPLOY_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            edit(){
                if (this.current_row) {
                    this.$bus.emit("EDIT_EMPLOY_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            downloadExcel(){
                let field = [
                    {field:'name',title:'姓名'},
                    {field:'tel',title:'联系方式'},
                    {field:'email',title:'邮箱'},
                    {field:'sex',title:'性别'},
                    {field:'birthday',title:'出生年月'},
                    {field:'adress',title:'省份 '},
                    {field:'graduated_school',title:'毕业院校'},
                    {field:'graduation_date',title:'毕业时间'},
                    {field:'if_employee_handbook',title:'是否员工合同',format:'sf01'},
                    // {field:'calltype',title:'问题类型',format:'hfwtlx'},
                    {field:'if_labor_contract',title:'是否劳动合同',format:'sf01'},
                    {field:'trial_salary',title:'试用底薪'},
                    // {field:'serviceranks',title:'回访状态',format:'hfzt'},
                    {field:'marital_status',title:'婚姻状况',format:'maritalStatus'},
                    {field:'bank_account',title:'银行账户'},
                    {field:'bank_address',title:'开户行地址'},
                    {field:'if_trial',title:'是否试用',format:'sf01'},
                    {field:'trial_performance',title:'试用绩效'},
                    {field:'positive_performance',title:'转正绩效'},
                    // {field:'depart',title:'责任部门',format:'departAlias'},
                    {field:'employees_status',title:'员工状态',format:'employeesStatus'},
                    {field:'highest_education',title:'最高学历'},
                    {field:'inductionMonth',title:'入职年月数'},
                    {field:'departname',title:'部门'},
                    {field:'contract_period',title:'合同期限'},
                    {field:'positive_date',title:'转正时间'},
                    {field:'positive_salary',title:'转正底薪'},
                    {field:'id_card',title:'身份证'},
                    {field:'profession',title:'专业'},
                    {field:'position',title:'职位',format:'applyPosition'},
                    {field:'remark',title:'备注'},
                ]
                let _self = this
                let url = `api/system/employee/list`
                let config = {
                    page: "1",
                    pageSize: "1000000",
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field)),
                    sortField:'createdate',
                    name: _self.SearchValidate.name,
                    employeesStatus:"0",
                    binductionDate: DateFormat(_self.SearchValidate.inductionDate[0]),
                    cinductionDate: DateFormat(_self.SearchValidate.inductionDate[1]),
                    sex: _self.SearchValidate.sex,
                    ifEmployeeHandbook:    _self.SearchValidate.ifEmployeeHandbook,
                    bpositiveDate: DateFormat(_self.SearchValidate.positiveDate[0]),
                    epositiveDate: DateFormat(_self.SearchValidate.positiveDate[1]),
                    bbirthday: DateFormat(_self.SearchValidate.birthday[0]),
                    ebirthday: DateFormat(_self.SearchValidate.birthday[1]),
                    provinceId: _self.SearchValidate.provinceId[0],
                    cityId: _self.SearchValidate.provinceId[1],
                    departId: _self.SearchValidate.departId[(_self.SearchValidate.departId.length)-1],
                    position: _self.SearchValidate.position,
                    ifLaborContract: _self.SearchValidate.ifLaborContract,
                    ifTrial: _self.SearchValidate.ifTrial,
                    maritalStatus: _self.SearchValidate.maritalStatus,
                    inductionMoth: _self.SearchValidate.inductionMoth,
                    highestEducation:_self.SearchValidate.highest_education
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
            leave(p){
                let _self = this;
                _self.loading = true;
                let url = `api/system/employee/changeEmployeesStatus`;
                let config = {
                        params: {
                            id:p.id,
                            status:1
                        }
                }

                function success(res){
                    _self.$bus.emit("UPDATE_INFO",true)
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/employee/list`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        sortField:'createdate',
                        name: _self.SearchValidate.name,
                        employeesStatus:"0",
                        binductionDate: DateFormat(_self.SearchValidate.inductionDate[0]),
                        cinductionDate: DateFormat(_self.SearchValidate.inductionDate[1]),
                        sex: _self.SearchValidate.sex,
                        ifEmployeeHandbook: _self.SearchValidate.ifEmployeeHandbook,
                        bpositiveDate: DateFormat(_self.SearchValidate.positiveDate[0]),
                        epositiveDate: DateFormat(_self.SearchValidate.positiveDate[1]),
                        bbirthday: DateFormat(_self.SearchValidate.birthday[0]),
                        ebirthday: DateFormat(_self.SearchValidate.birthday[1]),
                        provinceId: _self.SearchValidate.provinceId[0],
                        cityId: _self.SearchValidate.provinceId[1],
                        departId: _self.SearchValidate.departId[(_self.SearchValidate.departId.length)-1],
                        position: _self.SearchValidate.position,
                        ifLaborContract: _self.SearchValidate.ifLaborContract,
                        ifTrial: _self.SearchValidate.ifTrial,
                        maritalStatus: _self.SearchValidate.maritalStatus,
                        inductionMoth: _self.SearchValidate.inductionMoth,
                        highestEducation:_self.SearchValidate.highest_education
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows.map(item => {
                        // item.marital_status = _self.maritalStatus_map.get(item.marital_status);
                        // item.if_trial = _self.sf01_map.get(item.if_trial)
                        // item.if_labor_contract = _self.sf01_map.get(item.if_labor_contract);
                        // item.if_employee_handbook = _self.sf01_map.get(item.if_employee_handbook);
                        // item.employees_status = _self.employeesStatus_map.get(item.employees_status);
                        if (item.marital_status==0){
                            item.marital_status = "0"
                        }
                        if (item.marital_status==1){
                            item.marital_status = "1"
                        }
                        if (item.if_trial==0){
                            item.if_trial = "0"
                        }
                        if (item.if_trial==1){
                            item.if_trial = "1"
                        }
                        if (item.if_labor_contract==0){
                            item.if_labor_contract = "0"
                        }
                        if (item.if_labor_contract==1){
                            item.if_labor_contract = "1"
                        }
                        if (item.if_employee_handbook==0){
                            item.if_employee_handbook = "0"
                        }
                        if (item.if_employee_handbook==1){
                            item.if_employee_handbook = "1"
                        }
                        if (item.employees_status==0){
                            item.employees_status = "0"
                        }
                        if (item.employees_status==1){
                            item.employees_status = "1"
                        }
                        return item;
                    });
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            get_data_center() {
                let params = "applyPosition,sf01,employees_status,marital_status"

                let _self = this

                function success(res) {
                    _self.applyPosition = res.data.data.applyPosition
                    _self.employeesStatus = res.data.data.employees_status
                    _self.maritalStatus = res.data.data.marital_status
                    _self.sf01 = res.data.data.sf01
                    _self.applyPosition_map = _self.$array2map(_self.applyPosition)
                    _self.employeesStatus_map = _self.$array2map(_self.employeesStatus)
                    _self.maritalStatus_map = _self.$array2map(_self.maritalStatus)
                    _self.sf01_map = _self.$array2map(_self.sf01)
                }

                this.$GetDataCenter(params, success)
            },
            get_province_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/employee/getProvinceAndCity`;
                let config = {
                    params: {
                    }
                }
                function success(res){
                    _self.provinceData = res.data.data
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            get_depart_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/depart/tree/list`;
                let config = {
                    params: {
                    }
                }
                function success(res){
                    // _self.departData = res.data.data
                    _self.departData = res.data.data.map(item =>({
                        value:item.ID,
                        label:item.departname,
                        children:item.children.map(e =>({
                            value:e.ID,
                            label:e.departname,
                            children:e.children?e.children.map(i =>({
                                value:i.ID,
                                label:i.departname,
                                children:i.children?i.children.map(a =>({
                                    value:a.ID,
                                    label:a.departname,
                                    children:a.children?a.children.map(b =>({
                                        value:b.ID,
                                        label:b.departname
                                    })):[]
                                })):[]
                            })):[]
                        }))
                    }))
                    console.log(_self.departData)
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
        },
        created() {
            this.get_data_center()
            this.get_data()
            this.get_province_data()
            this.get_depart_data()
            this.$bus.off("UPDATE_INFO",true)
            this.$bus.on("UPDATE_INFO",e=>{
                this.get_data()
                this.current_row=""
            })
        }
    }
</script>

<style>

</style>