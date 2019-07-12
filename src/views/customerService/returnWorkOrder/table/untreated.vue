<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="NformInline" :model="NformInline" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="companyname" label="公司名称：">
                                                <Input type="text" v-model="NformInline.companyname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="name" label="客户名称：">
                                                <Input type="text" v-model="NformInline.name" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="tel" label="客户电话：">
                                                <Input type="text" v-model="NformInline.tel" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="servicename" label="服务人员：">
                                                <Input type="text" v-model="NformInline.servicename" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="marketername" label="市场人员：">
                                                <Input type="text" v-model="NformInline.marketername" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="depart" label="责任部门：">
                                                <Select transfer v-model="NformInline.depart" placeholder="" size="small">
                                                    <Option v-for="(item,index) in departAlias" :key=index :value="item.typecode">{{item.typename}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="productname" label="产品名称：">
                                                <Input type="text" v-model="NformInline.productname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="createdate" label="创建时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-start" v-model="NformInline.createdate" style="width:100%" size="small"></DatePicker>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="updatedate" label="回访时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-end" v-model="NformInline.updatedate" style="width:100%" size="small"></DatePicker>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <FormItem>
                                        <Button type="primary" @click="search">搜索</Button>
                                        <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </p>
                    </Panel>
                </Collapse>
            </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="show">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit" v-permission="['returnVisitN-edit']">编辑</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="finish" v-permission="['returnVisitN-edit']">完结</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
        </Row>

        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    @on-selection-change="select_change"
                    @on-current-change="selectrow"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    :current.sync="page"                     
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
    import { DateFormat } from '../../../channelManagement/channelCustomer/utils';

    export default {
        props:['hfwtlxMap','departAliasMap','departAlias','hfztMap','hfwtlx','hfzt'],
        components: {
        },
        data() {
            return {
                selectRowArray: [],
                loading:false,
                search_model:"",
                NformInline:{
                    productname:"",
                    companyname:"",
                    name:"",
                    tel:"",
                    servicename:"",
                    marketername:"",
                    depart:"",
                    createdate:[],
                    updatedate:[]
                },
                page:1,
                pageSize:10,
                isExamine: false,
                modal: false,
                pageTotal: new Number(),
                row:"",
                customerid: [],
                data: [{
                    aaa: 111
                }],
                header: [
                    {
                        title: "#",
                        type: "selection",
                        width: 60,
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        minWidth: 260,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>16){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,16)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        minWidth: 120
                    },
                    {
                        title: '客户手机',
                        key: 'TEL',
                        minWidth: 120
                    },
                    {
                        title: '产品名称',
                        key: 'alisname',
                        minWidth: 180
                    },
                    {
                        title: '完结状态',
                        key: 'isfinish',
                        minWidth: 120
                    },
                    {
                        title: '问题类型',
                        key: 'calltypeNAME',
                        minWidth: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 120
                    },
                    {
                        title: '回访时间',
                        key: 'callbackdate',
                        minWidth: 120
                    },
                    {
                        title: '回访状态',
                        key: 'callbackstatusName',
                        minWidth:120
                    },
                    {
                        title: '服务人员',
                        key: 'server_realname',
                        minWidth: 120
                    },
                    {
                        title: '市场人员',
                        key: 'followby_realname',
                        minWidth: 120
                    },
                    {
                        title: '责任部门',
                        key: 'departNAME',
                        minWidth: 120
                    },
                    {
                        title: '服务评分',
                        key: 'serviceranks',
                        minWidth: 120
                    },
                    // {
                    //     title:'回访次数',
                    //     key:'num',
                    //     width: 120
                    // },
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
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID: params.row.customerid});
                                        }
                                    }
                                }, '[查看客户]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$store.commit("open_gobal_company_detail_modal", params.row.companyid)
                                        }
                                    }
                                }, '[查看企业]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            downloadExcel(){
                let field = [
                    {field:'name',title:'客户名称'},
                    {field:'companyname',title:'公司名称'},
                    {field:'alisname',title:'产品名称'},
                    {field:'calltype',title:'问题类型',format:'hfwtlx'},
                    {field:'createdate',title:'创建时间'},
                    {field:'callbackdate',title:'回访时间'},
                    {field:'callbackstatus',title:'回访状态',format:'hfzt'},
                    {field:'server_realname',title:'服务人员'},                                                                   
                    {field:'followby_realname',title:'市场人员'},                                                                     
                    {field:'depart',title:'责任部门',format:'departAlias'},
                    {field:'serviceranks',title:'服务评分'},
                    {field:'reason',title:'问题反馈或建议'},
                    {field:'solutionbymarketer',title:'市场反馈'},
                    {field:'solutionbyservicer',title:'服务部门反馈'}
                ]
                let _self = this
                let url = `api/customer/customerCallbackList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        status:"N",
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field)),
                        sortField:'callbackdate',
                        datatype:2,
                        companyname:_self.NformInline.companyname,
                        name:_self.NformInline.name,
                        tel:_self.NformInline.tel,
                        servicename:_self.NformInline.servicename,
                        marketername:_self.NformInline.marketername,
                        depart:_self.NformInline.depart,
                        bcreatedate:DateFormat(_self.NformInline.createdate[0]),
                        ecreatedate:DateFormat(_self.NformInline.createdate[1]),
                        bcallbackdate:DateFormat(_self.NformInline.updatedate[0]),
                        ecallbackdate:DateFormat(_self.NformInline.updatedate[1]),
                        productname:_self.NformInline.productname                        
                }
                let toExcel = this.$MergeURL(url, config)
                console.log(toExcel)
                window.open(toExcel)
            },
            search(){
                this.page = 1
                this.getDataN()
            },
            reset(){
                this.page = 1
                    this.NformInline.companyname = ""
                    this.NformInline.name = ""
                    this.NformInline.tel = ""
                    this.NformInline.servicename = ""
                    this.NformInline.marketername = ""
                    this.NformInline.depart = ""
                    this.NformInline.createdate = []
                    this.NformInline.updatedate = []
                    this.NformInline.productname = ""

                this.getDataN()
            },
            pageChange(e) {
                this.page = e
                this.getDataN()
            },

            pageSizeChange(e) {
                this.pageSize = e
                this.getDataN()
            },
            cancel() {
                var _self = this
                _self.customerid = []
                _self.isExamine = false
            },
            selectrow(e) {
                this.row = e
            },

            customerDetail(a) {
                let _self = this
                _self.customerid[0] = a.row.customerid
                _self.isExamine = true
                _self.modal = true
            },
            edit(){
                let _self = this
                if(this.row == null || this.row == ""){
                    this.$Message.warning('请选择一行进行编辑！')                    
                }else{
                    _self.$emit("edit", _self.row)
                }
            },
            show(){
                let _self = this
                if(this.row == null || this.row == ""){
                    this.$Message.warning('请选择一行进行编辑！')                    
                }else{
                    _self.$emit("show", _self.row)
                }
            },
            getDataN(){
                let _self = this
                _self.loading = true
                let url = `api/customer/customerCallbackList`
                _self.row = ""                
                let config = {
                    params:{
                        sortField:'callbackdate',
                        page:_self.page,
                        pageSize:_self.pageSize,
                        status:'N',
                        companyname:_self.NformInline.companyname,
                        name:_self.NformInline.name,
                        tel:_self.NformInline.tel,
                        servicename:_self.NformInline.servicename,
                        marketername:_self.NformInline.marketername,
                        depart:_self.NformInline.depart,
                        datatype:2,
                        bcreatedate:DateFormat(_self.NformInline.createdate[0]),
                        ecreatedate:DateFormat(_self.NformInline.createdate[1]),
                        bcallbackdate:DateFormat(_self.NformInline.updatedate[0]),
                        ecallbackdate:DateFormat(_self.NformInline.updatedate[1]),
                        productname:_self.NformInline.productname,
                        sortField: "updatedate",
                        order: "desc"
                        
                    }
                }
                this.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)
                    // // 默认选中第一条
                    // if(res.data.data.rows.length) {
                    //     res.data.data.rows[0]._checked = true;
                    // }
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    for(let i = 0;i<res.data.data.rows.length;i++){
                        _self.data[i].num = "1"
                        _self.data[i].company_id = _self.data[i].companyid
                        if(_self.data[i].createdate == null ||_self.data[i].createdate == ""){

                        }else{
                            _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                        }

                        if(_self.data[i].callbackdate == null ||_self.data[i].callbackdate == ""){

                        }else{
                            _self.data[i].callbackdate = _self.data[i].callbackdate.slice(0,10)
                        }
                        _self.data[i].calltypeNAME = _self.hfwtlxMap.get(_self.data[i].calltype)
                        _self.data[i].callbackstatusName = _self.hfztMap.get(_self.data[i].callbackstatus)
                        

                        if(_self.data[i].depart == null ||_self.data[i].depart == ""){
                            _self.data[i].depart = ""
                        }else{
                            let temp = _self.data[i].depart.split(',')
                            for(let j = 0;j<temp.length;j++){
                                temp[j] = _self.departAliasMap.get(temp[j])
                            }
                            _self.data[i].departNAME = temp.join(',')
                        }
                    }
                    _self.loading = false
                })
            },
            select_change(e){
                this.selectRowArray = e
            },
            finish(){
                let _self = this
                if(this.selectRowArray.length == 0){
                    _self.$Message.warning("请先勾选需要批量处理的行！")
                }else{
                    let ids = []
                    for(let i = 0; i<_self.selectRowArray.length; i++){
                        ids.push(_self.selectRowArray[i].id)
                    }

                    let url = `api/customer/callback/batch/finish`

                    let config = {
                        ids: ids.join(",")
                    }

                    function success(res){
                        // _self.getDataN()
                        _self.$bus.emit("update_returnVisit_edit")
                        _self.selectRowArray=[]
                    }

                    function fail(err){

                    }

                    _self.$Post(url, config, success, fail)
                }
            }
        },
        created() {
            let _self = this
            this.getDataN()

            _self.$bus.on("update_returnVisit_edit", (e)=>{
                _self.getDataN()
            })
            
        }
    }
</script>