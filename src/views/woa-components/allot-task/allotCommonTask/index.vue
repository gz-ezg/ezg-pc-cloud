<!--
    页面需要进行改版
-->
<template>
    <div style="min-width:900px">
        <Tabs value="name1" style="padding-bottom:150px">
            <TabPane label="待分配" name="name1">
                <Card>
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div  slot="content" @keydown.enter="searchN">
                                    <Form ref="formInlineN" :model="formInlineN" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="8">
                                                <FormItem prop="companyName" label="公司名称：">
                                                    <Input type="text" v-model="formInlineN.companyname" placeholder="" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem>
                                            <Button type="primary" @click="searchN">搜索</Button>
                                            <Button type="ghost" style="margin-left:20px" @click="resetN">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="Distribution_task">一键分配</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="Ndata"
                                @on-selection-change="select_change"
                                :loading="Nloading"  ></Table>
                        <Page
                                size="small"
                                :total="NpageTotal"
                                placement="top"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="NpageChange"
                                @on-page-size-change="NpageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
            <TabPane label="已分配" name="name2">
                <Card>
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div  slot="content" @keydown.enter="searchY">
                                    <Form ref="formInlineY" :model="formInlineY" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="8">
                                                <FormItem prop="companyName" label="公司名称：">
                                                    <Input type="text" v-model="formInlineY.companyname" placeholder="" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="servicename" label="服务人员名称：">
                                                    <Input type="text" v-model="formInlineY.servicename" placeholder="" size="small">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem>
                                            <Button type="primary" @click="searchY">搜索</Button>
                                            <Button type="ghost" style="margin-left:20px" @click="resetY">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="transfer_task">批量转移</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="Ycolumns"
                                :data="Ydata"
                                @on-selection-change="select_change2"
                                :loading="Yloading"  ></Table>
                        <Page
                                size="small"
                                :total="YpageTotal"
                                placement="top"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="YpageChange"
                                @on-page-size-change="YpageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
        </Tabs>
        <AllotDetail></AllotDetail>
        <allot-account-service></allot-account-service>
        <allot-service></allot-service>
    </div>
</template>

<script>
// import Bus from '../../../components/bus'
import AllotDetail from './detail'
import allotService from './allot_service'
import allotAccountService from './allot_accout_service'

    export default {
        components:{
            AllotDetail,
            allotAccountService,
            allotService
        },
        data() {
            return {
                search_model:"",
                local_router_name:'',
                //  加载种处理
                Nloading:false,
                Yloading:false,
                //  是否处于搜索状态
                isSearhN:false,
                isSearhY:false,
                //  已选择
                //  选中未分配
                change_rowN:[],
                //  选中已分配
                change_rowY:[],
                detailModal: false,
                // 未分配检索
                formInlineN:{
                    companyname:'',
                    servicename:''
                },
                // 已分配检索
                formInlineY:{
                    companyname:'',
                    servicename:''
                },
                //  未分配任务表头
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                        title: '归属客户',
                        key: 'name',
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
                        title: '订单号',
                        key: 'ordercode',
                        width: 150
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'UpdateDate',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
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
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$bus.emit('openAllotTask',params)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                //  已分配表头
                Ycolumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220,
                        render:(h, params) => {
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
                        title: '归属客户',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 200,
                        render:(h, params) => {
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
                        title: '订单号',
                        key: 'ordercode',
                        width: 150
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '当前流程',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '服务起始时间',
                        key: 'ServiceStart',
                        width: 120
                    },
                    {
                        title: '服务终止时间',
                        key: 'ServiceEnd',
                        width: 120
                    },
                    {
                        title: '是否开始执行',
                        key: 'IsWork',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '服务是否完成',
                        key: 'IsOver',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'UpdateDate',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
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
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$bus.emit('openAllotTask',params)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                //  未分配表格相关
                NpageTotal:new Number(),
                Npage:'1',
                NpageSize:'10',
                Ndata: [],
                //  已分配表格相关
                YpageTotal:new Number(),
                Ypage:'1',
                YpageSize:'10',
                Ydata: [],
            }
        },
        methods: {
            //  未分配相关
            getDataN(){
                var _self = this
                _self.Nloading = true
                var url = 'api/order/workOrderList?&sortField=UpdateDate'
                var config = {
                    params:{
                        page:_self.Npage,
                        pageSize:_self.NpageSize,
                        workOrderStatus:"10",
                        companyName:_self.formInlineN.companyname,
                        serviceName:_self.formInlineN.servicename,
                        serviceDept:`${_self.local_router_name}`
                    }
                }
                    
                _self.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)
                    _self.Ndata = res.data.data.rows
                    _self.NpageTotal = res.data.data.total
                    for(let i = 0;i<res.data.data.rows.length;i++){
                        if(_self.Ndata[i].UpdateDate ==null ||_self.Ndata[i].UpdateDate == ""){
                        }else{
                            _self.Ndata[i].UpdateDate = _self.Ndata[i].UpdateDate.slice(0,10)
                        }
                        if(_self.Ndata[i].CreateDate ==null ||_self.Ndata[i].CreateDate == ""){
                        }else{
                            _self.Ndata[i].CreateDate = _self.Ndata[i].CreateDate.slice(0,10)
                        }
                    }
                    _self.Nloading = false
                })
                
            },
            NpageChange(e){
                this.Npage = e
                this.getDataN()
            },
            NpageSizeChange(e){
                this.NpageSize = e
                this.getDataN()
            },
            searchN(){
                this.Npage = 1
                this.isSearhN = true
                this.getDataN()
            },
            resetN(){
                this.isSearhN = false
                this.Npage = 1
                this.formInlineN.companyname = ""
                this.formInlineN.servicename = ""
                this.getDataN()
            },
            //  已分配相关
            getDataY(){
                var _self = this
                _self.Yloading = true
                var url = 'api/order/workOrderList?&sortField=UpdateDate'
                var config = {
                    params:{
                        page:_self.Ypage,
                        pageSize:_self.YpageSize,
                        nonWorkOrderStatus:"10",
                        companyName:_self.formInlineY.companyname,
                        serviceName:_self.formInlineY.servicename,
                        serviceDept:`${_self.local_router_name}`
                    }
                }

                _self.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)                    
                    _self.Ydata = res.data.data.rows
                    _self.YpageTotal = res.data.data.total
                    for(let i = 0;i<res.data.data.rows.length;i++){

                        if(_self.Ydata[i].UpdateDate==null || _self.Ydata[i].UpdateDate==""){
                        }else{
                        _self.Ydata[i].UpdateDate = _self.Ydata[i].UpdateDate.slice(0,10)

                        }
                        if(_self.Ydata[i].CreateDate==null || _self.Ydata[i].CreateDate==""){
                        }else{
                        _self.Ydata[i].CreateDate = _self.Ydata[i].CreateDate.slice(0,10)
                        }
                        if(_self.Ydata[i].ServiceStart==null || _self.Ydata[i].ServiceStart==""){
                        }else{
                        _self.Ydata[i].ServiceStart = _self.Ydata[i].ServiceStart.slice(0,10)

                        }
                        if(_self.Ydata[i].ServiceEnd==null || _self.Ydata[i].ServiceEnd==""){
                        }else{
                        _self.Ydata[i].ServiceEnd = _self.Ydata[i].ServiceEnd.slice(0,10)                        
                        }
                    }
                    _self.Yloading = false
                })
                
            },
            YpageChange(e){
                this.Ypage = e
                this.getDataY()
            },
            YpageSizeChange(e){
                this.YpageSize = e
                this.getDataY()
            },
            searchY(){
                this.Ypage = 1
                this.isSearhY = true
                this.getDataY()
            },
            resetY(){
                this.isSearhN = false
                this.Npage = 1
                this.formInlineY.companyname = ""
                this.formInlineY.servicename = ""
                this.getDataY()
            },
            //  勾选检测
            select_change(e){
                // console.log(e)
                this.change_rowN = [],
                this.change_rowN = e
                // console.log(this.change_rowN)
            },
            select_change2(e){
                this.change_rowY = [],
                this.change_rowY = e
            },
            //  分配工单
            Distribution_task(){
                let flag = false
                let _self = this
                if(_self.change_rowN!=''){
                    let temp = _self.change_rowN[0].ServiceDeptID
                    for(let i = 0;i<_self.change_rowN.length;i++){
                        if(temp == _self.change_rowN[i].ServiceDeptID && i ==_self.change_rowN.length-1){
                            flag = true
                        }
                    }
                    if(flag==true){
                        //  如果是会计部门工单分配，则使用allot_account_service组件
                        //  分配工单的id，生成字符串
                        let temp = []
                        for(let i = 0;i<_self.change_rowN.length;i++){
                            temp.push(_self.change_rowN[i].id)
                        }
                        let workOrderIds = temp.join(",")
                        if(_self.local_router_name =="'ACCOUNT'"){
                            //  分配表单需要接收三项数据1.服务部门的id，2.部门名称，3.分配的工单id
                            _self.$bus.emit("global_allot_accountorder",[_self.change_rowN[0].ServiceDeptID,_self.change_rowN[0].departname,workOrderIds])
                        }else{
                            //  否则则使用allot_service组件
                            _self.$bus.emit("global_allot_commonorder",[_self.change_rowN[0].ServiceDeptID,_self.change_rowN[0].departname,workOrderIds])                            
                        }
                    }else{
                        _self.$Message.warning('请选择相同的服务部门！')
                    }
                    
                }else{
                    _self.$Message.warning('请选择需要分配的工单！')
                }
            },
            //  批量转移
            transfer_task(){
                let flag = false
                let _self = this
                if(_self.change_rowY != ''){
                    let temp = _self.change_rowY[0].ServiceDeptID
                    for(let i = 0;i < _self.change_rowY.length; i++){
                        if(temp == _self.change_rowY[i].ServiceDeptID && i == _self.change_rowY.length-1){
                            flag = true
                        }
                    }
                    if(flag==true){
                        let temp = []
                        for(let i = 0;i<_self.change_rowY.length;i++){
                            temp.push(_self.change_rowY[i].id)
                        }
                        let workOrderIds = temp.join(",")
                        if(_self.local_router_name =="'ACCOUNT'"){
                            _self.$bus.emit("global_allot_accountorder",[_self.change_rowY[0].ServiceDeptID,_self.change_rowY[0].departname,workOrderIds])
                        }else{
                            _self.$bus.emit("global_allot_commonorder",[_self.change_rowY[0].ServiceDeptID,_self.change_rowY[0].departname,workOrderIds])                            
                        }
                    }else{
                        _self.$Message.warning('请选择相同的服务部门！')
                    }
                    
                }else{
                    _self.$Message.warning('请选择需要分配的工单！')
                }
            },
            allot(){
                let _self = this
                let url = 'api/order/batchUpdateServicer'
                let temp = []
                for(let i = 0;i<_self.change_rowN.length;i++){
                    temp.push(_self.change_rowN[i].id)
                }
                    _self.workOrderIds = temp.join(",")
                let config = {
                    workOrderIds:_self.workOrderIds,
                    userId: _self.userId
                }
                this.$http.post(url,config).then(function(res){
                    // console.log(res.data.msgCode)
                    if(res.data.msgCode == 40000){
                        _self.$Message.success(res.data.msg)
                        _self.Distribution = false
                        _self.getDataN()
                        _self.getDataY()
                        _self.userId = ''
                    }else{
                        _self.$Message.error(res.data.msg)
                    }
                })
            },
        //  重新分配
        allot2(){
            let _self = this
                let url = 'api/order/batchUpdateServicer'
                let temp = []
                for(let i = 0;i<_self.change_rowY.length;i++){
                    temp.push(_self.change_rowY[i].id)
                }
                    console.log(temp)
                    _self.workOrderIds = temp.join(",")
                let config = {
                    workOrderIds:_self.workOrderIds,
                    userId: _self.userId
                }
                this.$http.post(url,config).then(function(res){
                    // console.log(res.data.msgCode)
                    if(res.data.msgCode == 40000){
                        _self.$Message.success(res.data.msg)
                        _self.transfer = false
                        _self.getDataN()
                        _self.getDataY()
                        _self.userId = ''
                    }else{
                        _self.$Message.error(res.data.msg)
                    }
                })
        },
        init(){
            this.local_router_name = this.$route.name
            this.getDataY()
            this.getDataN()
        },
    },
    watch:{
        '$route':'init'
    },
    mounted(){
        this.init()
        console.log(this.$route)
    },
    created(){
        let _self = this
        _self.$bus.on('update_allot_index',(e)=>{
            _self.init()
        })
    }
    }
</script>