<template>
    <Card>
                <!-- <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="YformInline" :model="YformInline" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="companyname" label="公司名称：">
                                                <Input type="text" v-model="YformInline.companyname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="name" label="客户名称：">
                                                <Input type="text" v-model="YformInline.name" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="tel" label="客户电话：">
                                                <Input type="text" v-model="YformInline.tel" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="servicename" label="服务人员：">
                                                <Input type="text" v-model="YformInline.servicename" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="marketername" label="市场人员：">
                                                <Input type="text" v-model="YformInline.marketername" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="depart" label="责任部门：">
                                                <Select transfer v-model="YformInline.depart" placeholder="" size="small">
                                                    <Option v-for="(item,index) in departAlias" :key=index :value="item.typecode">{{item.typename}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="productname" label="产品名称：">
                                                <Input type="text" v-model="YformInline.productname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="createdate" label="创建时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-start" v-model="YformInline.createdate" style="width:100%" size="small"></DatePicker>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="updatedate" label="回访时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-end" v-model="YformInline.updatedate" style="width:100%" size="small"></DatePicker>
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
            </Row> -->
            <!-- <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="show" >查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit" v-permission="['returnVisitY-edit']">编辑</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup> -->

        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    @on-current-change="selectrow"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"                     
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
    import Bus from '../../../../components/bus'
    import { DateFormat } from '../../../channelManagement/channelCustomer/utils';
    import {arrayToMap} from '../../../../libs/utils'

    export default {
        props:['companyname'],
        components: {
            // channelFrom,
            // channelCompany,
            // channelOrderList,
            // channelFllowUp,
            // channelRelationPerson,
            // channelServiceDynamic,
        },
        data() {
            return {
                loading:false,
                search_model:"",
                YformInline:{
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
                //数据字典相关
                hfwtlx: [], //
                hfzt:[],
                departAlias:[],
                hfwtlx_map: new Map(), //
                hfzt_map: new Map(),
                departAlias_map: new Map(),
                header: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 260,
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
                        width: 120
                    },
                    {
                        title: '客户手机',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 150
                    },
                    {
                        title: '问题类型',
                        key: 'calltypeNAME',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 120
                    },
                    {
                        title: '回访时间',
                        key: 'callbackdate',
                        width: 120
                    },
                    {
                        title: '回访状态',
                        key: 'callbackstatusName',
                        width:120
                    },
                    {
                        title: '回访次数',
                        key: 'callbackstatuseCount',
                        width:120
                    },
                    {
                        title: '服务人员',
                        key: 'servicename',
                        width: 120
                    },
                    {
                        title: '市场人员',
                        key: 'marketername',
                        width: 120
                    },
                    {
                        title: '责任部门',
                        key: 'departNAME',
                        width: 120
                    },
                    {
                        title: '服务评分',
                        key: 'serviceranks',
                        width: 120
                    },
                    // {
                    //     title:'回访次数',
                    //     key:'',
                    //     width: 120
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
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
                                            this.show(params.row)
                                        }
                                    }
                                }, '[查看]')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            // downloadExcel(){
            //     let field = [
            //         {field:'name',title:'客户名称'},
            //         {field:'companyname',title:'公司名称'},
            //         // {field:'baseorderid',title:'提示'},
            //         {field:'product',title:'产品名称'},
            //         {field:'calltype',title:'问题类型',format:'hfwtlx'},
            //         {field:'createdate',title:'创建时间'},
            //         {field:'callbackdate',title:'回访时间'},
            //         // {field:'ServiceStart',title:'服务开始时间'},
            //         {field:'callbackstatus',title:'回访状态',format:'hfzt'},
            //         {field:'servicename',title:'服务人员'},                                                                   
            //         {field:'marketername',title:'市场人员'},                                                                     
            //         {field:'depart',title:'责任部门',format:'departAlias'},
            //         {field:'serviceranks',title:'服务评分'},
            //         // {field:'product',title:'产品名称'}
            //     ]
            //     let _self = this
            //     let url = `api/customer/customerCallbackList`
            //     let config = {
            //             page: '1',
            //             pageSize: '1000000',
            //             status:"Y",
            //             export: 'Y',
            //             exportField: encodeURI(JSON.stringify(field)),
            //             companyname:_self.YformInline.companyname,
            //             name:_self.YformInline.name,
            //             tel:_self.YformInline.tel,
            //             sortField:'callbackdate',
            //             servicename:_self.YformInline.servicename,
            //             marketername:_self.YformInline.marketername,
            //             depart:_self.YformInline.depart,                     
            //             bcreatedate:DateFormat(_self.YformInline.createdate[0]),
            //             ecreatedate:DateFormat(_self.YformInline.createdate[1]),
            //             bcallbackdate:DateFormat(_self.YformInline.updatedate[0]),
            //             ecallbackdate:DateFormat(_self.YformInline.updatedate[1]),
            //             productname:_self.YformInline.productname
            //     }
            //     console.log(config)
            //     let toExcel = this.$MergeURL(url, config)
            //     // console.log(toExcel)
            //     // console.log(toExcel)
            //     window.open(toExcel)
            // },
            // search(){
            //     this.page = 1
            //     this.getData()
            // },
            // reset(){
            //     this.page = 1
            //         this.YformInline.companyname = ""
            //         this.YformInline.name = ""
            //         this.YformInline.tel = ""
            //         this.YformInline.servicename = ""
            //         this.YformInline.marketername = ""
            //         this.YformInline.depart = ""
            //         this.YformInline.createdate = []
            //         this.YformInline.updatedate = []
            //         this.YformInline.productname = ""


            //     this.getData()
            // },
            pageChange(e) {
                this.page = e
                this.getData()
            },

            pageSizeChange(e) {
                this.pageSize = e
                this.getData()
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
            // edit(){
            //     let _self = this
            //     // console.log(this.row)
            //     // if(this.row == null || this.row == ""){
            //     //     this.$Message.warning('请选择一行进行编辑！')                    
            //     // }else{
            //         Bus.$emit('open_returnVisit_edit', _self.row)
            //     // }
            // },
            show(e){

                let _self = this
                // console.log(this.row)
                // if(this.row == null || this.row == ""){
                //     this.$Message.warning('请选择一行进行编辑！')                    
                // }else{
                    Bus.$emit('open_returnVisit_show', e)
                // }
            },
            getData(){
                let _self = this
                _self.loading = true
                _self.row = ""
                let url = `api/customer/customerCallbackList`
                let config = {
                    params:{
                        sortField:'callbackdate',
                        page:_self.page,
                        pageSize:_self.pageSize,
                        // status:'Y',
                        companyname:_self.companyname,
                        // name:_self.YformInline.name,
                        // tel:_self.YformInline.tel,
                        // servicename:_self.YformInline.servicename,
                        // marketername:_self.YformInline.marketername,
                        // depart:_self.YformInline.depart,
                        // bcreatedate:DateFormat(_self.YformInline.createdate[0]),
                        // ecreatedate:DateFormat(_self.YformInline.createdate[1]),
                        // bcallbackdate:DateFormat(_self.YformInline.updatedate[0]),
                        // ecallbackdate:DateFormat(_self.YformInline.updatedate[1]),
                        // productname:_self.YformInline.productname                        

                    }
                }
                this.$http.get(url,config).then(function(res){
                    // _self.$backToLogin(res)
                    // console.log(res)
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    for(let i = 0;i<res.data.data.rows.length;i++){
                        _self.data[i].company_id = _self.data[i].companyid
                        if(_self.data[i].createdate == null ||_self.data[i].createdate == ""){

                        }else{
                            _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                        }

                        if(_self.data[i].callbackdate == null ||_self.data[i].callbackdate == ""){

                        }else{
                            _self.data[i].callbackdate = _self.data[i].callbackdate.slice(0,10)
                        }
                        _self.data[i].calltypeNAME = _self.hfwtlx_map.get(_self.data[i].calltype)
                        _self.data[i].callbackstatusName = _self.hfzt_map.get(_self.data[i].callbackstatus)

                        if(_self.data[i].depart == null ||_self.data[i].depart == ""){
                            _self.data[i].depart = ""
                        }else{
                            let temp = _self.data[i].depart.split(',')
                            for(let j = 0;j<temp.length;j++){
                                // if(temp[j] == "ACCOUNT"){
                                //     temp[j] = "会计部"
                                // }else if(temp[j] == "BUSSINESS"){
                                //     temp[j] = "商事部"
                                // }else if(temp[j] == "PLAN"){
                                //     temp[j] = "企划部"
                                // }else if(temp[j] == "MARKET"){
                                //     temp[j] = "市场部"
                                // }
                                temp[j] = _self.departAlias_map.get(temp[j])
                            }
                            _self.data[i].departNAME = temp.join(',')
                        }
                    }
                    _self.loading = false
                })
            },
            getDataCenter(){
                let _self = this
                let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
                let config = {
                    params:{
                        groupCodes:"hfwtlx,hfzt,departAlias"
                    }
                }
                this.$http.get(url, config).then(function(res){
                    // console.log(res.data.data)
                    _self.hfwtlx = res.data.data.hfwtlx
                    _self.hfzt = res.data.data.hfzt
                    _self.departAlias = res.data.data.departAlias
                    _self.hfwtlx_map = arrayToMap(_self.hfwtlx)
                    _self.hfzt_map = arrayToMap(_self.hfzt)
                    _self.departAlias_map = arrayToMap(_self.departAlias)           
                })

            }
            // getDataCenter(){
            //     let _self = this
            //     let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
            //     let config = {
            //         params:{
            //             groupCodes:"hfwtlx,hfzt,departAlias"
            //         }
            //     }
            //     this.$http.get(url, config).then(function(res){
            //         console.log(res.data.data)
            //         _self.hfwtlx = res.data.data.hfwtlx
            //         _self.hfzt = res.data.data.hfzt
            //         _self.departAlias = res.data.data.departAlias
            //         _self.hfwtlx_map = _self.$array2map(_self.hfwtlx)
            //         _self.hfzt_map = _self.$array2map(_self.hfzt)
            //         _self.departAlias_map = _self.$array2map(_self.departAlias)
            //         console.log(_self.hfwtlx_map)                 
            //     })

            // }
            // init(){
            //     let _self = this
            //     _self.hfwtlx_map = _self.$array2map(_self.hfwtlx)
            //     // _self.hfzt_map = _self.$array2map(_self.hfzt)
            //     _self.departAlias_map = _self.$array2map(_self.departAlias)
            //     this.getData()
            //     console.log(_self.departAlias_map)
            // }
        },
        watch:{
            'companyname':'getData'
        },
        created() {
            // this.init()
            let _self = this
            this.getDataCenter()
            this.getData()
            // Bus.$on('update_returnVisit_edit',(e)=>{
            //     _self.getData()
            // })
            
        }
    }
</script>