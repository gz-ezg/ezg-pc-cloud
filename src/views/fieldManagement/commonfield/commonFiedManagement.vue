<template>
    <div>
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
                        <Form ref="searchModel" :model="searchModel" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input size="small"  type="text" v-model="searchModel.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="name" label="客户名称：">
                                        <Input size="small"  type="text" v-model="searchModel.name" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="tel" label="客户电话：">
                                        <Input size="small"  type="text" v-model="searchModel.tel" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="departname" label="服务部门：">
                                        <Input size="small"  type="text" v-model="searchModel.departname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="createdate" label="打卡时间：">
                                        <DatePicker transfer type="daterange" placement="bottom-start" style="width:100%" v-model="searchModel.createdate" size="small"></DatePicker>                                        
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="updatedate" label="离开时间：">
                                        <DatePicker transfer type="daterange" placement="bottom-start" style="width:100%" v-model="searchModel.updatedate" size="small"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="realname" label="服务人员：">
                                        <Input size="small"  type="text" v-model="searchModel.realname" placeholder="">
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
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="openShow">查看</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        ref="selection"
                        highlight-row
                        size="small"
                        :loading="loading"
                        @on-current-change="selectrow"
                        :columns="header"
                        @on-row-dblclick="openShow"
                        :data="data"></Table>
                <Page
                            size="small"
                            :total="pageTotal"
                            :current.sync="page"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            placement="top"                            
                            @on-page-size-change="pageSizeChange"
                            style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
            v-model="openFiedDetail"
            title="外勤详情"
            width="700"
            @on-cancel="openFiedDetail = false"
        >
            <Row>
                <Form ref="fiedDetail" :model="fiedDetail" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="companyname" label="公司名称：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.companyname"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="name" label="客户名称：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.name"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="tel" label="客户电话：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.tel"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="clocktime" label="上门时间：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.clocktime"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="endtime" label="离开时间：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.endtime"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="fieldlength" label="外勤时长：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.fieldlength"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="assiststatus" label="外勤类型：" style="margin-bottom:5px">
                                    <!-- <Select type="text" v-model="fiedDetail.fieldtype"  disabled>
                                        <Option v-for="(item,index.vue) in fieldClockType" :key=index.vue :value="item.typecode">{{item.typename}}</Option>
                                    </Select> -->
                                    <Input type="text" v-model="fiedDetail.assiststatus"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="22">
                                <FormItem prop="clockshows" label="打卡说明：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.clockshows"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
    
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="22">
                                <FormItem prop="startAddress" label="第一次打卡地址：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.startAddress" disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                                                        
                            <Col span="22">
                                <FormItem prop="endAddress" label="第二次打卡地址：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.endAddress"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <!-- <Col span="11" style="visibility:hidden"> -->
                            <!-- </Col> -->
                            <Col span="22">
                                <FormItem prop="remark" label="备注总结：" style="margin-bottom:5px">
                                    <Input type="text" v-model="fiedDetail.remark"  disabled>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="Providentfund" label="附件：" style="margin:5px" disabled >
                                    <Row v-for="(item,index) in imgList " :key="index">
                                        <!-- <a target="_blank" :href="'api/assets/' + item.realpath" >
                                            <img :src="'api/assets/' + item.realpath" alt=""  width="100" height="100">
                                        </a> -->
                                        <a target="_blank" :href="'/api/assets/' + item.realpath" >
                                            <img :src="'/api/assets/' +item.realpath" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                        </a>
                                    </Row>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <!-- <company-detail></company-detail> -->
    </div>
</template>

<script>
    import companyDetail from '../../woa-components/companyDetail/CompanyDetail.vue'
    import Bus from '../../../components/bus'
    import { DateFormat } from '../../../libs/utils.js'

    export default {
        name:'fieldWarning_index',
        components: {
            companyDetail
        },
        data() {
            return{
                service_record_status:"",
                service_record_status_Map:new Map(),
                fieldClockType:"",
                fieldClockType_Map:new Map(),
                loading:false,
                //  查看框
                current_row:"",
                openFiedDetail:false,
                fiedDetail:{},
                //  筛选
                search_model:"",
                pageTotal:new Number(),
                page:1,
                pageSize:10,
                searchModel:{
                    companyname:"",
                    name:"",
                    tel:"",
                    createdate:[],
                    updatedate:[],
                    realname:"",
                    departname:""
                },
                data:[],
                imgList:[],
                header: [
                    {
                        title: '公司',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '客户',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '打卡类型',
                        key: 'fieldClockTypeName',
                        width: 120
                    },
                    {
                        title: '打卡地址',
                        key: 'address1',
                        width: 210,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.address1 == ''||params.row.address1 == null){
                                return ''
                            }else if(params.row.address1.length>13){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.address1.slice(0,13)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',

                                    },[
                                        h('span',params.row.address1)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.address1)
                            }
                        }
                    },
                    {
                        title: '开始打卡时间',
                        key: 'clocktime',
                        width: 160
                    },
                    {
                        title: '离开打卡时间',
                        key: 'endtime',
                        width: 160
                    },
                    {
                        title: '外勤时长',
                        key: 'fieldlength',
                        width: 120
                    },
                    {
                        title: '打卡人',
                        key: 'realname',
                        width: 120
                    },
                    {
                        title:'外勤结果',
                        key:"service_record_statusName",
                        width:120
                    },
                    {
                        title: '总结',
                        key: 'remark',
                        width: 150
                    },
                    {
                        title: '外勤类型',
                        key: 'assiststatus',
                        width: 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             Bus.$emit('openCompanyDetail',params.row.companyid)
                                //         }
                                //     }
                                // }, '[公司详情]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params.row.customerid)
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID: params.row.customerid});
                                            // Bus.$emit('Open_customer_detail',params.row.customerid)
                                        }
                                    }
                                }, '[客户详情]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods:{
            getData(){
                let _self = this
                this.loading = true
                let url = `api/legwork/legworkList`
                let config = {
                    params:{
                        page: _self.page,
                        pageSize: _self.pageSize,
                        companyname: _self.searchModel.companyname,
                        name: _self.searchModel.name,
                        tel: _self.searchModel.tel,                        
                        bcreatedate: DateFormat(_self.searchModel.createdate[0]),
                        ecreatedate: DateFormat(_self.searchModel.createdate[1]),
                        bupdatedate: DateFormat(_self.searchModel.updatedate[0]),
                        eupdatedate: DateFormat(_self.searchModel.updatedate[1]),
                        realname: _self.searchModel.realname,
                        departname: _self.searchModel.departname,
                        sortField:'clocktime',
                    }
                }

                function success(res){
                    // console.log(res.data.data)
                    _self.loading = false                    
                    _self.pageTotal = res.data.data.total
                    _self.data = res.data.data.rows
                    for(let i = 0; i<_self.data.length;i++){
                        _self.data[i].fieldClockTypeName = _self.fieldClockType_Map.get(_self.data[i].fieldtype)
                        _self.data[i].service_record_statusName =_self.service_record_status_Map.get(_self.data[i].resulttype)
                        if(_self.data[i].assiststatus == "" || _self.data[i].assiststatus == "N"){
                            _self.data[i].assiststatus = "非协助外勤"
                        }else{
                            _self.data[i].assiststatus = "协助外勤"
                        }
                        // if(_self.data[i].clocktime == "" ||_self.data[i].clocktime == null){
                        //     return ""
                        // }else{
                        //     _self.data[i].clocktime = _self.data[i].clocktime.slice(0,10)
                        // }
                        // if(_self.data[i].endtime == "" ||_self.data[i].endtime == null){
                        //     return ""
                        // }else{
                        //     _self.data[i].endtime = _self.data[i].endtime.slice(0,10)
                        // }
                    }
                }

                function fail(err){
                    _self.loading = false                                        
                }

                this.$Get(url, config, success, fail)
            },

            getDetail(){
                let _self = this
                let url = `api/legwork/checkLegwork`
                let config = {
                    params:{
                        legworkId: _self.current_row.id,
                    }
                }

                function success(res){
                    console.log(res.data.data[1].realpath)
                    _self.fiedDetail = res.data.data[0]
                    console.log(_self.fiedDetail)
                    _self.imgList = res.data.data[1].realpath
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            //  downexcel
            downloadExcel(){
                let field = [
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'姓名'},
                    // {field:'tel',title:'电话'},
                    {field:'departname',title:'部门'},
                    {field:'fieldtype',title:'打卡类型',format:'fieldClockType'},
                    {field:'address1',title:'打卡地址'},
                    {field:'clocktime',title:'开始打卡时间'},
                    {field:'endtime',title:'离开打卡时间'},
                    {field:'fieldlength',title:'外勤时长'},
                    {field:'realname',title:'打卡人'},
                    {field:'remark',title:'总结'},
                    {field:'service_record_status',title:'外勤结果',format:'field_total'},
                    {field:'assiststatus', title: "外勤类型"}
                    ]
                let _self = this
                let url = `api/legwork/legworkList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        companyname: _self.searchModel.companyname,
                        name: _self.searchModel.name,
                        tel: _self.searchModel.tel,                        
                        bcreatedate: DateFormat(_self.searchModel.createdate[0]),
                        ecreatedate: DateFormat(_self.searchModel.createdate[1]),
                        bupdatedate: DateFormat(_self.searchModel.updatedate[0]),
                        eupdatedate: DateFormat(_self.searchModel.updatedate[1]),
                        realname: _self.searchModel.realname,
                        departname: _self.searchModel.departname,
                        export: 'Y',
                        sortField:'clocktime',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
            //  筛选重置
            reset(){
                this.page = 1
                this.$refs['searchModel'].resetFields();
                this.getData()
            },
            //  筛选开始
            search(){
                this.page = 1
                this.getData()
            },
            pageChange(e){
                this.page = e
                this.getData()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.getData()
            },
            //  弹出查看
            selectrow(e){
                this.current_row = e
            },
            openShow(){
                if(this.current_row == "" || this.current_row == null){
                    this.$Message.warning("请选择一行进行查看！")
                }else{
                    this.openFiedDetail = true
                    this.getDetail()
                }
            },
            getDataCenter(){
                let _self = this
                function  success(res){
                    _self.fieldClockType = res.data.data.fieldClockType
                    _self.service_record_status = res.data.data.field_total
                    _self.fieldClockType_Map = _self.$array2map(_self.fieldClockType)
                    _self.service_record_status_Map = _self.$array2map(_self.service_record_status)
                    // console.log(_self.fieldClockType_Map)
                }
                this.$GetDataCenter("fieldClockType,field_total",success)
            }

        },
        mounted() {
            
        },
        created () {
            this.getData()
            this.getDataCenter()
        }
    }
</script>
