<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="SearchValidate" :model="SearchValidate" :label-width="80" style="margin-top: 15px">
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
                                    <FormItem label="跟进人：" prop="followby_realname">
                                        <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="8" style="height:56px">
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
                                    <Col span="8">
                                        <FormItem label="客户跟进：" prop="note_kj_flag">
                                            <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                                                <Option value="Y">完成</Option>
                                                <Option value="N">未完成</Option>
                                            </Select>
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
                <Button type="primary" icon="ios-color-wand-outline" @click="ksfw" v-permission="['bookkeepingAgency.startService']">开始服务</Button>
                <Button type="primary" icon="information-circled" v-permission="['accounterManager.share']" @click="fpkj">变更会计</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="openFieldByCompanyId">外勤详情</Button>
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
                loading: false,
                managestatus:[],
                managestatus_map: new Map(),
                cservicest : [],
                cservicest_map :  new Map(),
                financialLevel :[],
                financialLevel_map : new Map(),
                GDSreport :[],
                GDSreport_map :new Map(),
                search_model:"",
                SearchValidate:{
                    CompanyName:'',
                    server_realname:'',
                    followby_realname:'',
                    departname:'',
                    begin_end_period:"",
                    end_end_period:"",
                    note_kj_flag: ""
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
                header: [
                    {
                        title: '服务状态',
                        key: 'service_status',
                        width: 120,
                        render:(h,params)=>{
                            return h('div',{},this.cservicest_map.get(params.row.service_status))
                        }
                    },
                    {
                        title: '对应企业',
                        key: 'CompanyName',
                        width: 250
                    },
                    {
                        title: '经营状态',
                        key: 'managestatus',
                        width: 120,
                        render:(h,params)=>{
                            return h('div',{},this.managestatus_map.get(params.row.managestatus))
                        }
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 160
                    },
                    {
                        title: '国地税报道',
                        key: 'gdsreport',
                        width: 120,
                        render:(h,params)=>{
                            return h('div',{},this.GDSreport_map.get(params.row.gdsreport))
                        }
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
                        title: '单价',
                        key: 'unit_price',
                        minWidth: 120,
                    },
                    {
                        title: "实名账号",
                        key: "has_account",
                        minWidth: 120
                    },
                    {
                        title: '警戒值',
                        key: 'accounter_security_line',
                        width:100
                    },
                    {
                        title: '累计外勤',
                        key: 'dljz_legwork',
                        minWidth:100
                    },
                    {
                        title: "客户跟进",
                        key: "note_kj_flag",
                        minWidth: 120,
                        render:(h,params)=>{
                            if (params.row.note_kj_flag=='Y'){
                                return h('div',{},'完成')
                            } else {
                                return h('div',{},'未完成')
                            }

                        }
                    },
                    {
                        title: '备注',
                        key: 'workordermemo',
                        width: 120,
                        render:(h,params) => {
                            if(params.row.workordermemo == ''||params.row.workordermemo == null){
                                return ''
                            }else if(params.row.workordermemo.length>5){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.workordermemo.slice(0,5)+'...'),
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
                        width: 250,
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
                                h('Button',{
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click:() => {
                                            console.log(params.row)
                                            if(params.row.service_status == '异常'){
                                                this.$Message.warning('当前服务状态已为异常')
                                            } else{
                                                this.setException(params.row.id)
                                            }
                                        }
                                    }
                                },'列为异常')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            //列为异常
            setException(id){
                let _self = this
                let url = `api/order/cycle/service/record/update`
                let config = {
                    id: id,
                    serviceStatus: 'exception'
                }

                function success(res){
                    console.log('列为异常成功')
                    _self.getData()
                    Bus.$emit('UPDATE_EXCEPTION',true)
                }
                function fail(){

                }

                this.$Post(url,config,success,fail)
            },

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
                    // {field:'serverrealname',title:'服务人员'},
                    // {field:'period',title:'服务周期'}
                    ]
                let _self = this
                let url = `api/order/cycle/service/record/list`
                let config = {
                        sort:'updatedate',
                        service_type:'dljz',
                        page: '1',
                        pageSize: '1000000',
                        CompanyName: _self.SearchValidate.CompanyName,
                        server_realname: _self.SearchValidate.server_realname,
                        followby_realname: _self.SearchValidate.followby_realname,
                        departname: _self.SearchValidate.departname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        note_kj_flag: _self.SearchValidate.note_kj_flag,
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
                this.SearchValidate.end_end_period = ""
                this.SearchValidate.begin_end_period = ""
                this.SearchValidate.note_kj_flag = ''
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
            getData() {
                let _self = this
                _self.loading = true
                let url = 'api/order/cycle/service/record/list'

                let config = {
                    params: {
                        sortField: "updatedate",
                        service_type: "dljz",
                        page: _self.page,
                        pageSize: _self.pageSize,
                        followby_realname: _self.SearchValidate.followby_realname,
                        CompanyName: _self.SearchValidate.CompanyName,
                        server_realname: _self.SearchValidate.server_realname,
                        CompanyName: _self.SearchValidate.CompanyName,
                        departname: _self.SearchValidate.departname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                        note_kj_flag: _self.SearchValidate.note_kj_flag
                    }
                }

                function doSuccess(res) {
                    _self.data  = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                this.$Get(url,config, doSuccess)
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

            // 查看变更日志
            ckbgrz() {
                Bus.$emit('rizhi',true)
            },

            gsxq() {
                Bus.$emit('detail',true)
            },

            gszx() {
                Bus.$emit('zhuxiao',true)
            },

            ddxq() {
                Bus.$emit('orderdetail',true)
            },

            ksfw() {
                let _self = this

                if (_self.id.id == '') {
                    this.$Message.warning('请选择要开始服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定开始服务吗</p>',
                    onOk: () => {
                        let url = '/order/cycle/service/record/update'
                        let _data = {
                            id: _self.id.id,
                            serviceStatus: 'inservice'
                        }

                        function doSuccess() {
                            _self.$Message.success('成功开始服务')
                            _self.page = 1
                            setTimeout(function(){
                                _self.getData()
                            },1000)
                        }

                        _self.PostData(url, _data, doSuccess)
                    },
                    onCancel: () => {}
                });
                }
            },

            tzfw() {
                let _self = this

                if (_self.id.id == '') {
                    this.$Message.warning('请选择要停止服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {
                        let url = '/order/cycle/service/record/update'
                        let _data = {
                            id: _self.id.id,
                            serviceStatus: 'stop'
                        }

                        function doSuccess() {
                            _self.$Message.success('已停止该服务')
                            _self.page = 1
                            _self.getData()
                        }

                        _self.PostData(url, _data, doSuccess)
                    },
                    onCancel: () => {}
                });
                }
            },

            tzfw() {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {},
                    onCancel: () => {},
                });
            },
            
            scbd() {
                Bus.$emit('shic',true)
            },

            cpbg() {
                Bus.$emit('biangeng',true)
            },

            selectrow(a) {
                let _self = this
                // let url = '/order/cycle/month/service/item/list?monthServiceId=' + a.month_service_id
                _self.id = a
                _self.zl = false
                _self.zz = false
                _self.bs = false

                function doSuccess(res) {
                    let _data = res.data.data

                    for (let i = 0; i < _data.length; i++) {
                        if (_data[i].item_status == 'serviceing') {
                            if (_data[i].serviceitemname == '资料完成') {
                                _self.zl = true
                                _self.zlid = _data[i].id
                            } else if (_data[i].serviceitemname == '做账完成') {
                                _self.zz = true
                                _self.zzid = _data[i].id
                            } else if (_data[i].serviceitemname == '报税完成') {
                                _self.bs = true
                                _self.bsid = _data[i].id
                            }
                        }
                    }
                }

                // this.GetData(url, doSuccess)
            },

            zlwc() {
                let _self = this
                let url = '/order/cycle/month/service/item/finish'
                let _data = {
                    monthServiceItemId: _self.zlid
                }

                function doSuccess(res) {
                    _self.$Message.success('提交成功')
                    _self.page = 1
                    _self.getData()
                }

                this.PostData(url, _data, doSuccess)
            },

            zzwc() {
                let _self = this
                let url = '/order/cycle/month/service/item/finish'
                let _data = {
                    monthServiceItemId: _self.zzid
                }

                function doSuccess(res) {
                    _self.$Message.success('提交成功')
                    _self.page = 1
                    _self.getData()
                }

                this.PostData(url, _data, doSuccess)
            },

            bswc() {
                let _self = this
                let url = '/order/cycle/month/service/item/finish'
                let _data = {
                    monthServiceItemId: _self.bsid
                }

                function doSuccess(res) {
                    _self.$Message.success('提交成功')
                    _self.page = 1
                    _self.getData()
                }

                this.PostData(url, _data, doSuccess)
            },
            rowClassName(row, index) {
                let _self = this
                if (row.balance_count <= 2) {
                    return 'demo-table-error-row';
                }
            },
            getGlobalDataCenter(){
                let _self = this
                let temp = JSON.parse(localStorage.getItem("global_datacenter"))
                _self.managestatus = temp
            },
            openFieldByCompanyId(){
                let _self = this

                if (!_self.id) {
                    this.$Message.warning('请选择要查看的项目！')
                } else {
                    // console.log(_self.id)
                    _self.$bus.emit('OPEN_FIELD_LIST_BY_COMPANYID', [_self.id.company_id,_self.id.CompanyName])
                }
            },
            get_data_center(){
                let _self = this
                let config = "managestatus,cservicest,financialLevel,GDSreport"
                function finsih(res){
                    _self.managestatus = res.data.data.managestatus
                    _self.managestatus_map = _self.$array2map(_self.managestatus)
                    _self.cservicest = res.data.data.cservicest
                    _self.cservicest_map = _self.$array2map(_self.cservicest)
                    _self.financialLevel = res.data.data.financialLevel
                    _self.financialLevel_map = _self.$array2map(_self.financialLevel)
                    _self.GDSreport = res.data.data.GDSreport
                    _self.GDSreport_map = _self.$array2map(_self.GDSreport)

                }
                this.$GetDataCenter(config, finsih)

                // await this.getData()
                
            },
        },
        mounted() {
            let _self = this
            async function start() {
                await _self.get_data_center()
                await _self.getData()
            }

            start()
        },
        created () {
            this.getGlobalDataCenter()
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

<style>
    .demo-table-error-row{
        color:red
    }
</style>


