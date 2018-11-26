<template>
    <Card>
        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
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

    export default {
        props:{
            companyname: {
                type: [String]
            },
            hfwtlx: {
                type: [Array, String]
            },
            hfzt: {
                type: [Array, String]
            },
            departAlias: {
                type: [Array, String]
            },
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
                // 数据字典相关
                hfwtlx_map: new Map(),
                hfzt_map: new Map(),
                departAlias_map: new Map(),
                header: [
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
                        minWidth: 150
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
                    //     title: '操作',
                    //     key: 'action',
                    //     fixed: 'right',
                    //     width: 120,
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'text',
                    //                     size: 'small'
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.show(params.row)
                    //                     }
                    //                 }
                    //             }, '[查看]')
                    //         ]);
                    //     }
                    // }
                ]
            }
        },
        methods: {
            pageChange(e) {
                this.page = e
                this.getData()
            },

            pageSizeChange(e) {
                this.pageSize = e
                this.getData()
            },

            customerDetail(a) {
                let _self = this
                _self.customerid[0] = a.row.customerid
                _self.isExamine = true
                _self.modal = true
            },
            
            show(e){
                let _self = this
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
                        companyname:_self.companyname,
                    }
                }
                this.$http.get(url,config).then(function(res){
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
                _self.hfwtlx_map = _self.$array2map(_self.hfwtlx)
                _self.hfzt_map = _self.$array2map(_self.hfzt)
                _self.departAlias_map = _self.$array2map(_self.departAlias)
                _self.getData()
            }
        },
        watch:{
            'companyname':'getData'
        },
        created() {
            let _self = this
            this.getDataCenter()
        }
    }
</script>