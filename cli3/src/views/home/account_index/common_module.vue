<template>
    <Modal
        title="查看企业"
        v-model="open_common_module"
        width=1200
    >
        <Row style="margin-top: 10px;">
            <Table
                    :loading="loading"
                    highlight-row
                    size="small"
                    :columns="header"
                    :row-class-name="rowClassName"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
        </Row>
    </Modal>
</template>

<script>
    export default {
        data() {
            return {
                open_common_module:false,
                managestatus:[],
                financialLevel:"",
                cservicest:"",
                cservicest_map:new Map(),
                loading:false,
                search_model:"",
                SearchValidate:{
                    CompanyName:'',
                    server_realname:'',
                    followby_realname:''
                },
                page: 1,
                pageSize: 10,
                pageTotal: new Number(),
                data:[],
                header: [
                    {
                        title: '对应企业',
                        key: 'companyname',
                        width: 250
                    },
                    // {
                    //     title: '企业经营状态',
                    //     key: 'managestatusName',
                    //     width: 120
                    // },
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
                    // {
                    //     title:'服务状态',
                    //     key: 'service_status',
                    //     width: 120
                    // },
                    // {
                    //     title: '结束期间',
                    //     key: 'end_period',
                    //     width: 120
                    // },

                    {
                        title: '联系客户',
                        key: 'lianxikehu',
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            if(params.row.lianxikehu.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.baoshui.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.koukuan.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.shebao.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.gongjijin.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.zuozhang.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
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
                            if(params.row.saopiao.confirm_date == undefined){
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                }, '[ 未完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.saopiao.confirm_date.slice(0,10))
                            }
                        }
                    },
                    // {
                    //     title: '警戒值',
                    //     key: 'accounter_security_line',
                    //     width: 120
                    // },
                    // {
                    //     title: '账务等级',
                    //     key: 'accountgrade',
                    //     width: 120
                    // },
                    // {
                    //     title: '备注',
                    //     key: 'memo',
                    //     width: 120,
                    //     render:(h,params) => {
                    //         if(params.row.memo == ''||params.row.memo == null){
                    //             return ''
                    //         }else if(params.row.memo.length>5){
                    //             return h('Poptip',{
                    //                 props:{
                    //                     trigger:'hover',
                    //                     placement:'bottom'
                    //                 }
                    //             },[
                    //                 h('span',params.row.memo.slice(0,5)+'...'),
                    //                 h('Icon', {
                    //                     props: {
                    //                         type: 'arrow-down-b',
                    //                     }
                    //                 }),
                    //                 h('div',{
                    //                     slot:'content',
                                        
                    //                 },[
                    //                     h('span',params.row.memo)
                    //                 ])
                    //             ])
                    //         }else{
                    //             return h('span',params.row.memo)
                    //         }
                    //     }
                    // },
                ]
            }
        },
        methods: {
            getData(){
                let _self = this
                _self.loading =  true
                let url = `api/order/cycle/month/service/list`
                let config = {
                    params:{
                        page: _self.page,
                        pageSize: 10,
                        period:"",
                        realname: _self.SearchValidate.server_realname,

                    }
                }

                function success(res){
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
                }

                this.$Get(url, config, success)

                // this.$http.get(url,config).then(function(res){
                //     _self.data = res.data.data.rows 
                //     _self.pageTotal = res.data.data.total
                //     for(let i = 0;i<_self.data.length;i++){
                //         _self.data[i].service_status = _self.cservicest_map.get(_self.data[i].service_status)
                //         for(let j = 0;j<_self.managestatus.length;j++){
                //             if(_self.data[i].managestatus == _self.managestatus[j][0]){
                //                 _self.data[i].managestatusName = _self.managestatus[j][1]
                //                 break
                //             }
                //         }
                //     }
                //     _self.loading = false
                // })
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
            rowClassName(row, index) {
                let _self = this
                if (row.balance_count <= 2) {
                    return 'demo-table-error-row2';
                }
            },
            getDataCenter(){
                let _self = this
                let params = `financialLevel`
                
                function success(res){
                    _self.financialLevel = res.data.data.financialLevel
                }

                this.$GetDataCenter(params, success)
            },
            getGlobalDataCenter(){
                let _self = this
                let temp = JSON.parse(localStorage.getItem("global_datacenter"))
                _self.managestatus = temp
            }
        },
        created() {
            let _self = this
            this.getDataCenter()
            this.getGlobalDataCenter()
            this.$bus.on('OPEN_COMMON_COMPANY_MODULE',(e)=>{
                console.log(e)
                _self.open_common_module = true
                _self.SearchValidate.server_realname = e
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

