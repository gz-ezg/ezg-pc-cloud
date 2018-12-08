<template>
    <div>
        <Card :title="title">
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading = "tableLoading"
                    @on-row-dblclick="open_show"
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            title: this.$route.query.type == "dealCycle"? "客户成交周期详情" : "二次成交比例详情",
            header: [
                {
                    title: "姓名",
                    key: "NAME",
                    minWidth: 120
                },
                {
                    title: "归属公司",
                    key: "companynames",
                    minWidth: 210,
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
                    title: "电话",
                    key: "TEL",
                    minWidth: 120
                },
                {
                    title: "客户状态",
                    key: "customerType",
                    minWidth: 140,
                },
                {
                    title: "客户来源",
                    key: "customersource",
                    minWidth: 120,
                },
                {
                    title: "客户等级",
                    key: "importlevel",
                    minWidth: 120,
                },
                {
                    title: "区域",
                    key: "AREA",
                    minWidth: 80,
                },
                {
                    title: "渠道名称",
                    key: "channelTypeName",
                    minWidth: 140,
                },
                {
                    title: "跟进人",
                    key: "followbyname",
                    minWidth: 120,
                },
                {
                    title: "创建时间",
                    key: "CREATEDATE",
                    minWidth: 120,
                },
                {
                    title: "更新时间",
                    key: "updatedate",
                    minWidth: 120,
                },
                {
                    title: "微信绑定",
                    key: "isbound",
                    minWidth: 90
                }
            ],
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            tableLoading: true,

            customerTypes: [],
            cluesources: [],
            customerrating: [],
            area: [],
            sf_yn: [],
            importance: [],
            //  数据字典map
            cluesources_map: new Map(),
            customerrating_map: new Map(),
            area_map: new Map(),
            sf_yn_map: new Map(),
            importance_map: new Map(),
            //  单独处理的客户状态
            customerTypes_Casr: [], //  二级联表专用
            customerTypes_array: [], // 二维数组转一维数组
        }
    },
    watch:{
        '$route'(to, from){
            this.get_data(to.query)
        }
    },
    methods: {
        get_data(params){
            let _self = this
            this.tableLoading = true
            if(params.type == "dealCycle"){
                _self.get_deal_cycle(params)
            }else{
                _self.get_second_deal(params)
            }
        },
        get_deal_cycle(params){
            let config = {
                params: {

                }
            }
            let url = `api/crm/sale/index/customer/deal/cycle/list`
            // type=dealCycle&dealType=c1&idType=depart&id=${params.row.id}
            if(params.idType == 'depart'){
                config.params.departId = params.id
            }else{
                config.params.userId = params.id
            }
            
            if(params.dealType == 'c1'){
                config.params.c1 = 1
            }else if(params.dealType == 'c2'){
                config.params.c2 = 1
            }else if(params.dealType == 'c3'){
                config.params.c3 = 1
            }else{
                config.params.c4 = 1
            }

            config.params.page = this.page
            config.params.pageSize = this.pageSize
            config.params.bcreatedate = ''
            config.params.ecreatedate = ''

            this.get_all_data(url, config)
        },
        get_second_deal(params){

        },
        get_all_data(url, config){
            let _self = this
            function success(res){
                console.log(res)
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i<_self.data.length; i++){
                    _self.data[i].customerType = _self.findCustomerType(_self.data[i].customerType)
                    if(_self.data[i].importlevel){
                        _self.data[i].importlevel = _self.customerrating_map.get(_self.data[i].importlevel.toString())
                    }
                    _self.data[i].AREA = _self.area_map.get(_self.data[i].AREA)
                    _self.data[i].customersourceCode = _self.data[i].customersource
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
        page_change(e){
            this.page = e
            this.get_data(this.$route.query)
        },
        page_size_change(e){
            this.pageSize = e
            this.page = 1
            this.get_data(this.$route.query)
        },
        open_show(e){
            this.$store.commit('open_gobal_customer_detail_modal', {ID:e.ID});
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject)=>{
                let _self = this
                let params = "customerTypes,cluesources,customerrating,area,sf_yn,importance";

                function success(res){
                    _self.customerTypes = res.data.data.customerTypes
                    _self.cluesources = res.data.data.cluesources
                    _self.customerrating = res.data.data.customerrating
                    _self.area = res.data.data.area
                    _self.sf_yn = res.data.data.sf_yn
                    _self.importance = res.data.data.importance

                    _self.cluesources_map = _self.$array2map(_self.cluesources)
                    _self.customerrating_map = _self.$array2map(_self.customerrating)
                    _self.area_map = _self.$array2map(_self.area)
                    _self.sf_yn_map = _self.$array2map(_self.sf_yn)
                    _self.importance_map = _self.$array2map(_self.importance)
                    _self.customerTypes_Casr = _self.$changeCars(_self.customerTypes)
                    _self.customerTypes_array = _self.$Data2Casr(_self.customerTypes)
                    resolve()
                }
                this.$GetDataCenter(params, success)
            })
        },
    },
    created(){
        this.get_data_center().then(()=>{
            this.get_data(this.$route.query)
        })
    }
}
</script>

