<template>
    <div>
        <Tabs value="name1" style="padding-bottom:150px">
            <TabPane label="待分配" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="Distribution_task">一键分配</Button>
                        </ButtonGroup>
                        <Poptip 
                            title="筛选" 
                            placement="bottom-end" 
                            width="350" 
                            style="float:right;margin-right:20px" 
                            >
                            <Button type="text" size="small" icon="funnel">筛选</Button>
                            <div  slot="content" @keydown.enter="searchN">
                            <Form ref="formInlineN" :model="formInlineN" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="22">
                                        <FormItem prop="companyName" label="公司名称：">
                                            <Input type="text" v-model="formInlineN.companyname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <!-- <Col span="22">
                                        <FormItem prop="servicename" label="服务人员名称：">
                                            <Input type="text" v-model="formInlineN.servicename" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col> -->
                                </Row>
                                <FormItem>
                                    <Button type="primary" @click="searchN">搜索</Button>
                                    <Button type="ghost" style="margin-left:20px" @click="resetN">重置</Button>
                                </FormItem>
                            </Form>
                            </div>
                        </Poptip>
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
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="transfer_task">批量转移</Button>
                        </ButtonGroup>
                        <Poptip 
                            title="筛选" 
                            placement="bottom-end" 
                            width="350" 
                            style="float:right;margin-right:20px" 
                            >
                            <Button type="text" size="small" icon="funnel">筛选</Button>
                            <div  slot="content" @keydown.enter="searchY">
                            <Form ref="formInlineY" :model="formInlineY" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="22">
                                        <FormItem prop="companyName" label="公司名称：">
                                            <Input type="text" v-model="formInlineY.companyname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="22">
                                        <FormItem prop="servicename" label="服务人员名称：">
                                            <Input type="text" v-model="formInlineY.servicename" placeholder="">
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
                        </Poptip>
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
        <!-- 分配商事和企划工单start -->
        <Modal
            title="一键分配工单"
            width="300"
            v-model="Distribution"
        >
            <Form ref="task_detail" :model="task_detail" :label-width="90">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="departname" label="服务部门：">
                            <Input type="text" v-model="departname" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="服务人员：">
                            <Select transfer v-model="userId">
                            <Option v-for="(item,index) in allDepartUser" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="兼职会计：">
                            <Select transfer v-model="userId">
                            <Option v-for="(item,index) in allDepartUser" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row> -->
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="Distribution=false">关闭</Button>
                <Button type="primary" @click="allot">分配</Button>                
            </div>
        </Modal>
        <Modal
            title="批量转移"
            width="300"
            v-model="transfer"
        >
            <Form ref="transfer_detail" :model="transfer_detail" :label-width="90">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="departname" label="服务部门：">
                            <Input type="text" v-model="departname" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="服务人员：">
                            <Select transfer v-model="userId">
                            <Option v-for="(item,index) in allDepartUser" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="transfer=false">关闭</Button>
                <Button type="primary" @click="allot2">分配</Button>                
            </div>
        </Modal>
        <!-- 分配商事和企划工单end -->
        <!-- 分配会计start -->
        <Modal
                v-model="fenpei"
                title="分配会计"
                width="300"
        >
            <Form ref="task_message" :model="task_message" :label-width="90">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="departname" label="服务部门：">
                            <Input type="text" v-model="departname" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="companyName" label="会计经理">
                            <Select transfer v-model="accMagid" @on-change="optionChange">
                                <Option v-for="item in accMag" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16"> 
                    <Col span="1" style="visibility:hidden">1</Col>                                   
                    <Col span="20">
                        <FormItem prop="companyName" label="兼职会计">
                            <Select transfer v-model="jzAccid">
                                <Option value="0">无</Option>
                                <Option v-for="item in jzAcc" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="fenpei=false">关闭</Button>
                <Button type="primary" @click="allot3">分配</Button>                
            </div>
        </Modal>
        <!-- 分配会计end -->
    </div>
</template>

<script>
import Bus from '../../../components/bus'
import AllotDetail from './detail'

    export default {
        components:{
            AllotDetail
        },
        data() {
            return {
                local_router_name:'',
                //  会计分配 
                fenpei:false,
                task_message:{},
                accMagid: '',
                jzAccid: '',
                accMag: [],
                jzAcc: [],
                //  加载种处理
                Nloading:false,
                Yloading:false,
                //  是否处于搜索状态
                isSearhN:false,
                isSearhY:false,
                //  分配和重新分配           
                Distribution:false,
                transfer:false,
                //  已选择
                change_rows:[],
                change_rows2:[],
                detailModal: false,
                huashu: false,
                value1: '1',
                task_detail:{},
                transfer_detail:{},
                formItem: [{
                    input: ''
                }],
                formInlineN:{
                    companyname:'',
                    servicename:''
                },
                formInlineY:{
                    companyname:'',
                    servicename:''
                },
                //  商事部人员列表
                allDepartUser:'',
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
                    // {
                    //     title: '服务人员',
                    //     key: 'servername',
                    //     width: 120
                    // },
                    // {
                    //     title: '开始服务时间',
                    //     key: 'ServiceStart',
                    //     width: 150
                    // },
                    // {
                    //     title: '当前流程',
                    //     key: 'CurrentProcess',
                    //     width: 120
                    // },
                    // {
                    //     title: '服务起始时间',
                    //     key: 'createby',
                    //     width: 120
                    // },
                    // {
                    //     title: '是否开始执行',
                    //     key: 'createby',
                    //     width: 120
                    // },
                    // {
                    //     title: '已读/未读',
                    //     key: 'createby',
                    //     width: 120
                    // },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    // {
                    //     title: '服务是否完成',
                    //     key: 'createby',
                    //     width: 120
                    // },
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
                                            console.log(params)
                                            Bus.$emit('openAllotTask',params)
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
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    // {
                    //     title: '开始服务时间',
                    //     key: 'ServiceStart',
                    //     width: 150
                    // },
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
                    // {
                    //     title: '已读/未读',
                    //     key: 'createby',
                    //     width: 120
                    // },
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
                                            console.log(params)
                                            Bus.$emit('openAllotTask',params)
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
                //  分配相关
                userId:'',
                workOrderIds:'',
                //  服务部门id
                ServiceDeptID:'',
                departname:'',
                
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
                    _self.Ndata = res.data.data.rows
                    _self.NpageTotal = res.data.data.total
                    for(let i = 0;i<res.data.data.rows.length;i++){
                        _self.Ndata[i].UpdateDate = _self.Ndata[i].UpdateDate.slice(0,10)
                        _self.Ndata[i].CreateDate = _self.Ndata[i].CreateDate.slice(0,10)
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
                this.change_rows = [],
                this.change_rows = e
                // console.log(this.change_rows)
            },
            select_change2(e){
                this.change_rows2 = [],
                this.change_rows2 = e
            },
        //  分配工单
            Distribution_task(){
                let flag = false
                let _self = this
                if(_self.change_rows!=''){
                    let temp = _self.change_rows[0].ServiceDeptID
                    for(let i = 0;i<_self.change_rows.length;i++){
                        // console.log('11')
                        if(temp==_self.change_rows[i].ServiceDeptID && i==_self.change_rows.length-1){
                            flag = true
                        }
                    }
                    if(flag==true){
                        if(_self.change_rows[0].ServiceDeptID!=11570){
                            _self.Distribution = true
                            _self.ServiceDeptID = _self.change_rows[0].ServiceDeptID
                            _self.departname = _self.change_rows[0].departname
                            _self.getAllUserList()
                        }else{
                            _self.fenpei = true
                            _self.ServiceDeptID = _self.change_rows[0].ServiceDeptID
                            _self.departname = _self.change_rows[0].departname
                            _self.getData3()
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
                if(_self.change_rows2!=''){
                    let temp = _self.change_rows2[0].ServiceDeptID
                    for(let i = 0;i<_self.change_rows2.length;i++){
                        // console.log('11')
                        if(temp==_self.change_rows2[i].ServiceDeptID && i==_self.change_rows2.length-1){
                            flag = true
                        }
                    }
                    if(flag==true){
                        if(_self.change_rows2[0].ServiceDeptID!=11570){
                            _self.Distribution = true
                            _self.ServiceDeptID = _self.change_rows2[0].ServiceDeptID
                            _self.departname = _self.change_rows2[0].departname
                            _self.getAllUserList()
                        }else{
                            _self.fenpei = true
                            _self.ServiceDeptID = _self.change_rows2[0].ServiceDeptID
                            _self.departname = _self.change_rows2[0].departname
                            _self.getData3()
                        }
                    }else{
                        _self.$Message.warning('请选择相同的服务部门！')
                    }
                    
                }else{
                    _self.$Message.warning('请选择需要分配的工单！')
                }
            },
        //  获取所在部门人员
            getAllUserList(){
                let url = 'api/user/getUserListByDepartId?departId='+ this.ServiceDeptID
                // 11572
                let _self = this
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data)
                    _self.allDepartUser = res.data.data
                })
            },
            allot(){
                let _self = this
                let url = 'api/order/batchUpdateServicer'
                let temp = []
                for(let i = 0;i<_self.change_rows.length;i++){
                    temp.push(_self.change_rows[i].id)
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
                for(let i = 0;i<_self.change_rows2.length;i++){
                    temp.push(_self.change_rows2[i].id)
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
                        _self.transfer = false
                        _self.getDataN()
                        _self.getDataY()
                        _self.userId = ''
                    }else{
                        _self.$Message.error(res.data.msg)
                    }
                })
        },
        //  分配会计
        getData3() {
                let _self = this
                let url = '/user/getUserListByDepartId?departId=' + _self.ServiceDeptID

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.accMag = []

                    for (let i= 0; i < _data.length; i++) {
                        _self.accMag.push({
                            value: _data[i].id,
                            label: _data[i].realname,
                            link: _data[i].links
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            optionChange(a) {
                let _self = this

                for (let i = 0; i < _self.accMag.length; i++) {
                    if (a == _self.accMag[i].value && _self.accMag[i].link != "null") {
                        let _data = JSON.parse(_self.accMag[i].link)
                        _self.jzAcc = []

                        for (let j = 0; j < _data.length; j++) {
                            _self.jzAcc.push({
                                value: _data[j].id,
                                label: _data[j].realname
                            })
                        }
                    } else if (a == _self.accMag[i].value && _self.accMag[i].link == "null") {
                        _self.jzAcc = []
                    }
                }
            },

            allot3() {
                let _self = this
                // let url = '/order/batchUpdateServicer'
                let url = '/order/work/order/share'
                let temp = []
                if(_self.change_rows2!=''&&_self.change_rows2 !=null){
                    for(let i = 0;i<_self.change_rows2.length;i++){
                    temp.push(_self.change_rows2[i].id)
                }
                }else{
                    for(let i = 0;i<_self.change_rows.length;i++){
                    temp.push(_self.change_rows[i].id)
                }
                }
                    _self.workOrderIds = temp.join(",")
                let _data = {
                    workOrderIds: _self.workOrderIds,
                    userId:_self.jzAccid,
                    managerId:_self.accMagid
                }

                if (_self.jzAccid != '' && _self.jzAccid != 0) {
                    _data.userId = _self.jzAccid
                } else {
                    _data.userId = _self.accMagid
                }

                function doSuccess() {
                    _self.getDataN()
                    _self.getDataY()
                    _self.userId = ''
                    _self.managerId = ''
                    _self.workOrderIds = ''
                    _self.accMagid =""
                    _self.jzAccid = ""
                    _self.change_rows2 = ""
                    _self.change_rows = ""
                    _self.fenpei = false
                }

                this.PostData(url, _data, doSuccess)
            },
            init(){
                this.local_router_name = this.$route.name
                this.getDataY()
                this.getDataN()
            }
    },
    watch:{
        '$route':'init'
    },
    mounted(){
            console.log(this.$route.name)
            this.init()
            // console.log(this.$route)
            
        }
    }
</script>