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
                                    <FormItem label="地区：" prop="CompanyName">
                                        <Select v-model="SearchValidate.area" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in area" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="地址：" prop="server_realname">
                                        <Input v-model="SearchValidate.place" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="开票类型：" prop="followby_realname">
                                        <Select v-model="SearchValidate.kpType" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in kpType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="地址属性：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.addrProperty" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in addrProperty" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="可开：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.canInvoice" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in sfYn" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="可查：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.canCheck" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in sfYn" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="工商情况：" prop="note_kj_flag">
                                        <Select v-model="SearchValidate.taxStatus" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in businessTaxStatus" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="税务情况：" prop="etaxStatus">
                                        <Select v-model="SearchValidate.businessStatus" size="small" type="text" transfer>
                                            <Option v-for="(item,index) in businessTaxStatus" :key="index" :value="item.typecode">{{item.typename}}</Option>
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
                <Button type="primary" icon="ios-color-wand-outline" @click="add">新增</Button>
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
                    border
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
        <info :gzbusinessarea="gzbusinessarea" :addr_property="addr_property" :kp_type="kp_type" :business_tax_status="business_tax_status" :sf_yn="sf_yn"></info>
    </Card>
</template>

<script>
    import Info from './common/detail'
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
                currentIndex:-1,
                gzbusinessarea:[],
                addr_property:[],
                kp_type:[],
                business_tax_status:[],
                sf_yn:[],
                gzbusinessarea_map:new Map(),
                addr_property_map:new Map(),
                kp_type_map:new Map(),
                business_tax_status_map:new Map(),
                sf_yn_map:new Map(),
                SearchValidate: {
                    area:"",
                    place:"",
                    kpType:"",
                    addrProperty:"",
                    canInvoice:"",
                    canCheck:"",
                    taxStatus:"",
                    businessStatus:""
                },
                data:[],
                header: [
                    {
                        title: '地区',
                        key: 'area',
                        minWidth: 120,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.gzbusinessarea_map.get(params.row.area))
                        }
                    },
                    {
                        title: '具体位置',
                        key: 'place',
                        width: 180
                    },
                    {
                        title: '地址属性',
                        key: 'addr_property',
                        minWidth: 120,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.addr_property_map.get(params.row.addr_property))
                        }
                    },
                    {
                        title: '开票类型',
                        key: 'invoice_type',
                        minWidth: 100,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.kp_type_map.get(params.row.invoice_type))
                        }
                    },
                    {
                        title: '价格',
                        key: 'price',
                        minWidth: 90
                    },
                    {
                        title: '可开',
                        key: 'can_invoice',
                        minWidth: 70,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.sf_yn_map.get(params.row.can_invoice))
                        }
                    },
                    {
                        title: '可查',
                        key: 'can_check',
                        minWidth: 70,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.sf_yn_map.get(params.row.can_check))
                        }
                    },
                    {
                        title: '工商情况',
                        key: 'tax_status',
                        minWidth: 90,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.business_tax_status_map.get(params.row.tax_status))
                        }
                    },
                    {
                        title: '税务情况',
                        key: 'business_status',
                        minWidth: 90,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.business_tax_status_map.get(params.row.business_status))
                        }
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 250,
                        render: (h, params) => {
                            if (params.row.memo == "" || params.row.memo == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.memo
                                console.log(temp.length)
                                if (temp.length > 10) {
                                    if (params.index != this.currentIndex){
                                        console.log("123")
                                        return h("div",{
                                        },[
                                            h("span",{
                                                style:{
                                                    display: 'inline-block',
                                                }
                                            },temp.slice(0,10) + "..."),
                                            h("Button", {
                                                props:{
                                                    type:'text',
                                                    display: 'inline-block',
                                                },
                                                style: {
                                                    color:'rgb(45,140,240)',
                                                },
                                                on:{
                                                    click: () => {
                                                        this.change(params.row,params.index)
                                                    }
                                                }
                                            },"点击展开")
                                        ]);
                                    } else {
                                        return h("div",{
                                        },[
                                            h("span",temp)
                                        ]);
                                    }

                                } else {
                                    return h("div",{
                                        },[
                                            h("span", temp)
                                        ]
                                    );
                                }
                            }
                        }
                    },
                ]
            }
        },
        methods:{
            selectRow(e) {
                console.log(e)
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
            Search() {
                this.page = 1;
                this.get_data()
            },
            handleReset(){
                this.SearchValidate= {
                    area:"",
                    place:"",
                    kpType:"",
                    addrProperty:"",
                    canInvoice:"",
                    canCheck:"",
                    taxStatus:"",
                    businessStatus:""
                }
                this.get_data()
            },
            change(row,index){
                this.currentIndex= index;
            },
            add(){
                this.$bus.emit("ADD_MANAGER_INFO",this.current_row)
            },
            show(){
                if (this.current_row) {
                    console.log(this.current_row)
                    this.$bus.emit("SHOW_MANAGER_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            edit(){
                if (this.current_row) {
                    this.$bus.emit("EDIT_MANAGER_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            downloadExcel(){
                let field = [
                    {field:'area',title:'地区',format:'gzbusinessarea'},
                    {field:'place',title:'地址'},
                    {field:'price',title:'价格'},
                    {field:'invoice_type',title:'开票类型',format:'kp_type'},
                    {field:'addr_property',title:'地址属性',format:'addr_property'},
                    {field:'can_invoice',title:'可开',format:'sf_yn'},
                    {field:'can_check',title:'可查',format:'sf_yn'},
                    {field:'tax_status',title:'工商情况',format:'business_tax_status'},
                    {field:'business_status',title:'税务情况',format:'business_tax_status'},
                    {field:'memo',title:'备注'},
                ]
                let _self = this
                let url = `api/system/addrPrice/list`
                let config = {
                    page: "1",
                    pageSize: "1000000",
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field)),
                    area: _self.SearchValidate.area,
                    place:_self.SearchValidate.place,
                    invoice_type:_self.SearchValidate.kpType,
                    addr_property: _self.SearchValidate.addrProperty,
                    can_invoice: _self.SearchValidate.canInvoice,
                    can_check: _self.SearchValidate.canCheck,
                    tax_status:_self.SearchValidate.taxStatus ,
                    business_status:_self.SearchValidate.businessStatus,
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/addrPrice/list`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        area: _self.SearchValidate.area,
                        place:_self.SearchValidate.place,
                        invoice_type:_self.SearchValidate.kpType,
                        addr_property: _self.SearchValidate.addrProperty,
                        can_invoice: _self.SearchValidate.canInvoice,
                        can_check: _self.SearchValidate.canCheck,
                        tax_status:_self.SearchValidate.taxStatus ,
                        business_status:_self.SearchValidate.businessStatus,
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
            },
            get_data_center(){
                let params = "gzbusinessarea,gzbusinessplace,addr_property,kp_type,business_tax_status,sf_yn"
                let _self = this
                function success(res){
                    _self.gzbusinessarea = res.data.data.gzbusinessarea
                    _self.addr_property = res.data.data.addr_property
                    _self.kp_type = res.data.data.kp_type
                    _self.business_tax_status = res.data.data.business_tax_status
                    _self.sf_yn = res.data.data.sf_yn
                    _self.gzbusinessarea_map = _self.$array2map(_self.gzbusinessarea)
                    _self.addr_property_map = _self.$array2map(_self.addr_property)
                    _self.kp_type_map = _self.$array2map(_self.kp_type)
                    _self.business_tax_status_map = _self.$array2map(_self.business_tax_status)
                    _self.sf_yn_map = _self.$array2map(_self.sf_yn)
                }
                this.$GetDataCenter(params, success)
            },
        },
        created() {
            this.get_data_center()
            this.get_data()
            this.$bus.off("UPDATE_MANAGER_INFO",true)
            this.$bus.on("UPDATE_MANAGER_INFO",e=>{
                this.current_row = ""
                this.get_data()
            })
        }
    }
</script>

<style>

</style>