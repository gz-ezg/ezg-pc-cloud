<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown="show">
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
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                    </Col>
                                    <!-- <Col span="8">
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                    </FormItem>
                                    </Col> -->
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
                <Button type="primary" icon="ios-color-wand-outline" @click="ksfw" v-permission="['bookkeepingAgency.stop']">停止服务</Button>
                <Button type="primary" icon="information-circled" @click="fpkj">变更会计</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="setLevel">设置财务等级</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="openFollow">服务详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="openFieldByCompanyId">外勤详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="open_change_log">变更日志</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
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
                    :row-class-name="rowClassName"
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
        <Modal
            v-model="accout_level_open"
            title="设置账务等级"
            width="300"
        >
            <Row>
                <center>{{current_row.companyname}}</center>
            </Row>
            <Row style="margin-top:20px">
                <center>
                    <Select v-model="current_row.accountgrade" type="size" style="width:150px">
                        <Option v-for="item in financialLevel" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                    </Select>
                </center>
            </Row>
            <div slot="footer">
                <Button @click="set_account_level" type="primary">设置</Button>
            </div>
        </Modal>
        <Modal
            v-model="finsih_work"
            title="完成节点"
            width="500"
        >
            <Row>
                <div v-for="(item,index) in show_img" :key=index>
                    <Row>
                        <center>
                            <img :src="item.src" alt="节点" style="width: 300px;height:300px;"/>
                        </center>
                    </Row>
                    <center>
                        <Button type="text" @click="fileRemove(item)">移除</Button>
                    </center>
                </div>
                <Upload
                    ref="upload"
                    :before-upload="handleUpload"
                    action=""
                >
                    <Button type="ghost" icon="ios-cloud-upload-outline" style="margin:auto">选择文件</Button>
                </Upload>
            </Row>
            <div slot="footer">
                <Button type="primary"  style="margin:auto" @click="finsih_upload" :loading="finsih_loading">提交</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import Bus from '../../../../../components/bus'
    import { yasuo } from '../../../../../libs/img_beforeUpload'
    export default {
        data() {
            return {
                time:"",
                managestatus:[],
                finsih_loading:false,
                upload_id:"",
                finsih_work:false,
                img_array:[],
                show_img:[],
                // follow_open:false,
                financialLevel:"",
                accout_level_open:false,
                cservicest:"",
                cservicest_map:new Map(),
                loading:false,
                search_model:"",
                SearchValidate:{
                    CompanyName:'',
                    server_realname:'',
                    followby_realname:'',
                    begin_end_period:"",
                    end_end_period:""
                },
                current_row:"",
                page: 1,
                pageSize: 10,
                tiaozheng: false,
                zl: false,
                zz: false,
                bs: false,
                zlid: '',
                zzid: '',
                bsid: '',
                search_model: '',
                id: {},
                pageTotal: new Number(),
                task_message:{
                    companyName:'1111111111'
                },
                data:[],
                header: [
                    {
                        title: '对应企业',
                        key: 'companyname',
                        width: 250
                    },
                    {
                        title: '企业经营状态',
                        key: 'managestatusName',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 160
                    },
                    {
                        title: '服务人员',
                        key: 'realname',
                        width: 120
                    },
                    {
                        title:'服务状态',
                        key: 'service_status',
                        width: 120
                    },
                    {
                        title: '结束税期',
                        key: 'end_period',
                        width: 120
                    },

                    {
                        title: '联系客户',
                        key: 'lianxikehu',
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            // console.log(params.row.lianxikehu.confirm_date)
                            let reg=/^[-+]?\d*$/; 
                            if(params.row.lianxikehu.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.lianxikehu)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.lianxikehu.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '报税',
                        key: 'baoshui',
                        width:120,
                        align: "center",
                        render: (h, params) => {
                            let reg =/^[-+]?\d*$/;
                            // console.log(isNaN(params.row.zlwc))
                            // console.log(reg.test(params.row.zengzhishui))
                            if(params.row.baoshui.confirm_date == undefined){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.baoshui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.baoshui.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '扣款',
                        key: 'koukuan',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;                            
                            // console.log(isNaN(params.row.zlwc))
                            if(params.row.koukuan.confirm_date == undefined){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.koukuan)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.koukuan.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '社保',
                        key: 'shebao',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(params.row.shebao.confirm_date == undefined){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.shebao)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.shebao.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '公积金',
                        key: 'gongjijin',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            if(params.row.gongjijin.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.gongjijin)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.gongjijin.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '做账',
                        key: 'zuozhang',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            if(params.row.zuozhang.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.zuozhang)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.zuozhang.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '扫票',
                        key: 'saopiao',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            if(params.row.saopiao.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.saopiao)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.saopiao.confirm_date.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '警戒值',
                        key: 'accounter_security_line',
                        width: 120
                    },
                    {
                        title: '账务等级',
                        key: 'accountgrade',
                        width: 120
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 120,
                        render:(h,params) => {
                            if(params.row.memo == ''||params.row.memo == null){
                                return ''
                            }else if(params.row.memo.length>5){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[
                                    h('span',params.row.memo.slice(0,5)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.memo)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.memo)
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
                                            Bus.$emit('openCompanyDetail',params.row.company_id)
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
                    {field:'customername',title:'客户名称'},
                    {field:'companyname',title:'对应企业'},
                    {field:'product',title:'产品名称'},
                    {field:'realname',title:'服务人员'},
                    {field:'followbyrealname',title:'市场'},
                    // {field:'balance_count',title:'剩余时长'},
                    // {field:'begin_period',title:'开始期间'},
                    {field:'end_period',title:'结束期间'},
                    {field:'memo',title:'备注'}
                    // {field:'serverrealname',title:'服务人员'},
                    // {field:'period',title:'服务周期'}
                    ]
                let _self = this
                let url = `api/order/cycle/month/service/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        period:_self.time,
                        companyname: _self.SearchValidate.CompanyName,
                        realname: _self.SearchValidate.server_realname,
                        sortField:"updatedate",
                        followbyrealname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
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
                this.SearchValidate.begin_end_period = ""
                this.SearchValidate.end_end_period = "" 
                this.Search()               
            },
            Search(){
                this.page = 1
                this.getData()
            },
            show(e){
                // console.log(e)
                if(e.key=='Enter'){
                    this.Search()
                }
            },
            getData(){
                let _self = this
                _self.loading =  true
                let url = `api/order/cycle/month/service/list`
                let config = {
                    params:{
                        page: _self.page,
                        pageSize: _self.pageSize,
                        period:_self.time,
                        sortField:"updatedate",
                        companyname: _self.SearchValidate.CompanyName,
                        realname: _self.SearchValidate.server_realname,
                        followbyrealname: _self.SearchValidate.followby_realname,
                        begin_end_period: _self.SearchValidate.begin_end_period,
                        end_end_period: _self.SearchValidate.end_end_period,
                    }
                }
                this.$http.get(url,config).then(function(res){
                    _self.data = res.data.data.rows 
                    _self.pageTotal = res.data.data.total
                    for(let i = 0;i<_self.data.length;i++){
                        _self.data[i].service_status = _self.cservicest_map.get(_self.data[i].service_status)
                        for(let j = 0;j<_self.managestatus.length;j++){
                            if(_self.data[i].managestatus == _self.managestatus[j][0]){
                                _self.data[i].managestatusName = _self.managestatus[j][1]
                                break
                            }
                        }
                    }
                    _self.loading = false
                })
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

                if (_self.current_row ==  '' || _self.current_row == undefined) {
                    this.$Message.warning('请选择要变更会计的项目')
                } else {
                    _self.current_row.workordermemo = _self.current_row.memo
                    _self.current_row.followby_realname = _self.current_row.followbyrealname
                    _self.current_row.CompanyName = _self.current_row.companyname
                    Bus.$emit('fenpei', _self.current_row)
                }
            },

            ksfw() {
                let _self = this

                if (_self.current_row == '' || _self.current_row == undefined) {
                    _self.$Message.warning('请选择要停止服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {
                        let url = 'api/order/cycle/service/record/update'
                        let _data = {
                            id: _self.current_row.cycle_service_record_id,
                            serviceStatus: 'stop'
                        }

                        function doSuccess() {
                            _self.$Message.success('已停止该服务')
                            _self.page = 1
                            _self.getData()
                        }

                        function fail(res){

                        }

                        // _self.PostData(url, _data, doSuccess)
                        _self.$Post(url, _data, doSuccess, fail)
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

            selectRow(e){
                this.current_row = e
                // console.log(this.current_row)
            },
            fileRemove(e) {
                this.img_array.splice(this.img_array.indexOf(e), 1);
                this.show_img.splice(this.show_img.indexOf(e), 1)
            },

            handleUpload(file){
                let _self = this
                // console.log(file)
                this.img_array.push(file)
                // yasuo(file,_self.img_array)
                let reader = new FileReader()
                reader.readAsDataURL(file)
                let filename = file.name
                reader.onload = function(file){
                    var imgMsg = {
                        name:filename,
                        src:this.result
                    }
                    _self.show_img.push(imgMsg)
                }
                return false;
                
                },
            zlwc(e) {
                let _self = this
                this.finsih_work = true
                this.img_array = []
                this.show_img = []
                this.upload_id = e
            },

            finsih_upload(){
                let _self = this
                if(_self.img_array.length == 1){
                    _self.finsih_loading = true

                    let formdata = new FormData()
                    formdata.append("monthServiceItemId",_self.upload_id)
                    console.log(_self.img_array[0])
                    formdata.append("file", _self.img_array[0])
                    
                    let url = `api/order/cycle/month/service/item/finish`
                    
                    function success(res){
                        // console.log(res)
                        _self.finsih_work = false
                        _self.finsih_loading = false
                        _self.img_array = []
                        _self.show_img = []
                        _self.getData()
                    }

                    function fail(err){
                        _self.finsih_loading = false
                    }
                    
                    this.$Post(url, formdata, success, fail)
                }else{
                    _self.$Message.warning("请上传图片！(最多上传一张图片)")
                }
            },

            rowClassName(row, index) {
                let _self = this
                if (row.balance_count <= 2) {
                    return 'demo-table-error-row2';
                }
            },
            getCservicest(){
                let _self = this
                let config = "cservicest"
                function finsih(res){
                    _self.cservicest = res.data.data.cservicest
                    _self.cservicest_map = _self.$array2map(_self.cservicest)
                    // console.log(_self.cservicest_map)
                }
                this.$GetDataCenter(config, finsih)
            },
            setLevel(){
                let _self = this
                if(_self.current_row == "" || _self.current_row == null){
                    _self.$Message.warning("请选择要设置的记录！")
                }else{
                    _self.accout_level_open = true
                }
            },
            set_account_level(){
                let _self = this
                let url = `api/order/cycle/saveAccountGradeMsg`
                let config = {
                    companyid: _self.current_row.company_id,
                    accountgrade: _self.current_row.accountgrade
                }

                function success(res){
                    // _self.$Message.success("更新成功！")
                    _self.accout_level_open = false
                    _self.getData()
                }

                function fail(err){
                    _self.$Message.error(err.data.msg)
                }

                this.$Post(url,config,success,fail)
            },
            getDataCenter(){
                let _self = this
                let params = `financialLevel`
                
                function success(res){
                    _self.financialLevel = res.data.data.financialLevel
                }

                this.$GetDataCenter(params, success)
            },


            openFollow(){
                let _self = this
                if(_self.current_row == "" || _self.current_row == null){
                    _self.$Message.warning("请选择要设置的记录！")
                }else{
                    _self.$bus.emit('open_booking_follow',_self.current_row)
                }
            },
            getGlobalDataCenter(){
                let _self = this
                let temp = JSON.parse(localStorage.getItem("global_datacenter"))
                _self.managestatus = temp
            },

            //  打开会计变更日志（由于接口问题，暂时关闭，等接口修复完成后发布）
            open_change_log(){
                let _self = this

                if (!_self.current_row) {
                    this.$Message.warning('请选择要查看的项目！')
                } else {
                    _self.$bus.emit('rizhi', _self.current_row.cycle_service_record_id)
                }
            },
            //  打开外勤信息
            openFieldByCompanyId(){
                let _self = this

                if (!_self.current_row) {
                    this.$Message.warning('请选择要查看的项目！')
                } else {
                    console.log(_self.current_row)
                    _self.$bus.emit('OPEN_FIELD_LIST_BY_COMPANYID', [_self.current_row.company_id,_self.current_row.companyname])
                }
            }
        },
        mounted() {
            this.getData()
            this.getDataCenter()
        },
        created () {
            let _self = this
            this.getGlobalDataCenter()
            this.getCservicest()
            let now = new Date()
            let year = ""
            let month = ""
            if((now.getMonth())==0){
                year = now.getMonth() - 1
                month = "12"
            }else{
                year = now.getFullYear()
                if(now.getMonth()<9){
                    month = '0'+now.getMonth()
                }else{
                    month = now.getMonth()
                }
            }
            _self.time = year + month
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
    .demo-table-error-row2{
        color:red
    }
</style>

