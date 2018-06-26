<!--
    好像整的太复杂了
-->
<template>
    <div>
        <Tabs v-model="openIndex">
            <TabPane v-for="(item,index) in statusList" :key=index :label="item.label" :name="item.name">
                <Card>
                    <ButtonGroup style="float:left">
                        <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
                        <Button type="primary" icon="ios-color-wand-outline" @click="company">查看公司</Button>
                        <Button type="primary" icon="ios-color-wand-outline" @click="downExcel(item.statusCode)">导出Excel</Button>
                    </ButtonGroup>
                </Card>
                <Row style="margin-top:10px">
                    <Table
                        ref="selection"
                        highlight-row
                        size="small"
                        :loading="loading"
                        :columns="header"
                        :data="item.data"
                        @on-current-change="save_current_row"
                    ></Table>
                    <Page
                        :placement="top"
                        size="small"
                        :total="item.total"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange(item.statusCode,index)"
                        @on-page-size-change="pageSizeChange(item.statusCode,index)"
                        style="margin-top: 10px"></Page>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    props:['department'],
    data(){
        return{
            openIndex: "notbegin",
            loading:false,
            page:1,
            pageSize:10,
            search:{
                companyName:"",
                serviceName:""
            },
            statusList:[
                {
                    label: "未开始",
                    name: "notbegin",
                    statusCode: "20",
                    data: [],
                    loading: true,
                    total: new Number(),
                    search:{
                        companyName:"",
                        serviceName:""
                    }
                },
                {
                    label: "服务中",
                    name: "serving",
                    statusCode: "30",
                    data: [],
                    loading: true,
                    total: new Number(),
                    search:{
                        companyName:"",
                        serviceName:""
                    }
                },
                {
                    label: "已完结",
                    name: "finish",
                    statusCode: "40",
                    data: [],
                    loading: true,
                    total: new Number(),
                    search:{
                        companyName:"",
                        serviceName:""
                    }
                },
                {
                    label: "全部",
                    name: "all",
                    statusCode: "",
                    data: [],
                    loading: true,
                    total: new Number(),
                    search:{
                        companyName:"",
                        serviceName:""
                    }
                }
            ],
            header: [
                    {
                        title: '工单状态',
                        key: 'zhuangtai',
                        width:100,
                        render:(h, params) => {
                            // console.log(params.row.workOrderStatus.toString())
                            
                            // let temp = this.workOrderStatus_map.get(params.row.workOrderStatus.toString())
                            // return h('div',temp)
                            if(params.row.workOrderStatus == '10'){
                                return h('div','未分配')
                            }else if(params.row.workOrderStatus == '20'){
                                return h('div','未开始')
                            }else if(params.row.workOrderStatus == '30'){
                                return h('div','服务中')
                            }else if(params.row.workOrderStatus == '40'){
                                return h('div','暂停')
                            }else if(params.row.workOrderStatus == '50'){
                                return h('div','退款终止')                            
                            }else if(params.row.workOrderStatus == '60'){
                                return h('div','已完结')                                
                            }else{
                                return h('div','无状态')
                            }
                        }                       
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>12){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,12)+'...'),
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
                        title: '提示',
                        key: 'baseorderid',
                        width: 120
                    },
                    // {
                    //     title: '订单',
                    //     key: 'ordercode',
                    //     width: 150
                    // },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 200,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.product == ''||params.row.product == null){
                                return ''
                            }else if(params.row.product.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.product.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.product)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.product)
                            }
                        }
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '下个进度',
                        key: 'nextprocess',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        width: 120
                    },
                    // {
                    //     title: '预计完成时间',
                    //     key: 'baseorderid',
                    //     width: 120
                    // },
                    {
                        title: '实际完成时间',
                        key: 'ServiceEnd',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'followname',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 180,
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
                                //             // console.log(params)
                                //             Bus.$emit('showcompanydetail',params)
                                //         }
                                //     }
                                // }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click:() => {
                                            this.flowChart(params)
                                        }
                                    }
                                }, '[流程图]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            var _self = this
                                            console.log(params)
                                            //  暂停
                                            if(params.row.resumeFlag == null || params.row.resumeFlag == 3){
                                                let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=3`
                                                this.$http.get(url).then(function(res){
                                                    if(res.data.msgCode == 40000){
                                                        _self.$Message.success(res.data.msg)
                                                    }else{
                                                        _self.$Message.error(res.data.msg)
                                                    }
                                                    _self.getData()
                                                })
                                            }else if(params.row.resumeFlag == 2){
                                                let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=2`
                                                this.$http.get(url).then(function(res){
                                                    if(res.data.msgCode == 40000){
                                                        _self.$Message.success(res.data.msg)
                                                    }else{
                                                        _self.$Message.error(res.data.msg)
                                                    }
                                                    _self.getData()
                                                })
                                            }else{}
                                        }
                                    }
                                }, '[暂停/解锁]'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.endlife = true
                                //         }
                                //     }
                                // }, '[退款终止]'),
                            ]);
                        }
                    }
                ]
        }
    },
    methods:{
        //  只可以初始化，不能用于页面变化，否则性能捉急
        init(){
            let _self = this
            let url = `api/order/workOrderList`
            for(let i = 0; i < 4; i++){
                _self.loading = true
                let config = {
                    params:{
                        serviceDept:`"'${_self.department}'"`,
                        page:1,
                        pageSize:10,
                        workOrderStatus:`"${_self.statusList[i].statusCode}"`
                    }
                }
                _self.$http.get(url,config).then(function(res){
                    console.log(res.data.data.data.rows)
                    _self.statusList[i].data = res.data.data.rows
                    _self.statusList[i].total = res.data.data.total
                    for(let j = 0;j<res.data.data.rows.length;j++){
                        // console.log(_self.data[i])
                        if(_self.statusList[i].data[j].CreateDate!='' && _self.statusList[i].data[j].CreateDate!=null){
                            _self.statusList[i].data[j].CreateDate = _self.statusList[i].data[j].CreateDate.slice(0,10)
                        }
                        if(_self.statusList[i].data[j].ServiceStart!='' && _self.statusList[i].data[j].ServiceStart!=null){
                            _self.statusList[i].data[j].ServiceStart = _self.statusList[i].data[j].ServiceStart.slice(0,10)
                        }
                        if(_self.statusList[i].data[j].ServiceEnd!='' && _self.statusList[i].data[j].ServiceEnd!=null){
                            _self.statusList[i].data[j].ServiceEnd = _self.statusList[i].data[j].ServiceEnd.slice(0,10)
                        }
                    }
                    _self.loading = false        
                })
            }
        },
        //  获取数据
        getData(statusCode,index){
            _self.loading = true
            let config = {
                params:{
                    serviceDept:`"'${_self.department}'"`,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    workOrderStatus:`"${statusCode}"`,
                    companyName:_self.search.companyname,
                    serviceName:_self.search.servicename
                }
            }
            _self.$http.get(url,config).then(function(res){
                console.log(res.data.data.data.rows)
                _self.statusList[index].data = res.data.data.rows
                _self.statusList[index].total = res.data.data.total
                for(let j = 0;j<res.data.data.rows.length;j++){
                    // console.log(_self.data[i])
                    if(_self.statusList[index].data[j].CreateDate!='' && _self.statusList[index].data[j].CreateDate!=null){
                        _self.statusList[index].data[j].CreateDate = _self.statusList[index].data[j].CreateDate.slice(0,10)
                    }
                    if(_self.statusList[index].data[j].ServiceStart!='' && _self.statusList[index].data[j].ServiceStart!=null){
                        _self.statusList[index].data[j].ServiceStart = _self.statusList[index].data[j].ServiceStart.slice(0,10)
                    }
                    if(_self.statusList[index].data[j].ServiceEnd!='' && _self.statusList[index].data[j].ServiceEnd!=null){
                        _self.statusList[index].data[j].ServiceEnd = _self.statusList[index].data[j].ServiceEnd.slice(0,10)
                    }
                }
                _self.loading = false        
            })
        },
        clear(){
            this.search.companyname = "",
            this.search.servicename = "",
            this.page = 1,
            this.pageSize = 10
        }
    },
    watch:{
        'openIndex':'clear'
    },
    created(){
        this.init()
    }
}
</script>
