<template>
    <!--    已处理投诉  -->
    <div>
        <Card>
            <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="YformInline" :model="YformInline" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="customername" label="客户：">
                                                <Input type="text" v-model="YformInline.customername" placeholder="">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="createdate" label="创建时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-start" v-model="YformInline.createdate" style="width:100%"></DatePicker>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="updatedate" label="更新时间：">
                                                <DatePicker transfer type="daterange" placement="bottom-end" v-model="YformInline.updatedate" style="width:100%"></DatePicker>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="departname" label="服务部门：">
                                                <Input type="text" v-model="YformInline.departname" placeholder="">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="customertel" label="客户电话：">
                                                <Input type="text" v-model="YformInline.customertel" placeholder="">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="companyname" label="公司：">
                                                <Input type="text" v-model="YformInline.companyname" placeholder="">
                                                </Input>
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
                    <!-- <Button type="primary" icon="ios-color-wand-outline" @click="Add_deal_complain" v-permission="['complaintY.complaintY']">我要投诉</Button> -->
                    <Button type="primary" icon="ios-color-wand-outline" @click="deal_complain"  v-permission="['complaintY.dealwith']">我要处理</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="open_complain">查看</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>  
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="Ydata"
                    @on-current-change="save_current_row"
                    :loading="Yloading"  
                    @on-row-dblclick="open_complain"     
                >
                </Table>
                <Page
                    size="small"
                    :total="NpageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="YpageChange"
                    @on-page-size-change="YpageSizeChange"
                    style="margin-top: 10px"
                >
                </Page>
            </Row>
        </Card>
    </div>
</template>

<script>
// import Bus from '../../../../components/bus'
import {DateFormat, DateFormat2} from '../../../../libs/utils.js'

export default {
    props:['complaintType','processType'],
    data(){
        return{
            search_model:"",
            Yloading:false,
            NpageTotal:new Number(),
            Npage:'1',
            NpageSize:'10',
            Ydata:[],
            //  筛选相关
            YformInline:{
                updatedate:[],
                createdate:[],
                companyname:"",
                customername:"",
                customertel:"",
                departname:""
            },
            page:1,
            pageSize:10,
            current_row:'',
            header:[
                {
                    title:'客户',
                    width:100,
                    key:'name'
                },
                {
                    title:'客户电话',
                    width:120,
                    key:'tel'
                },
                {
                    title:'公司',
                    width:240,
                    key:'companyname',
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>14){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,14)+'...'),
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
                    title:'服务部门',
                    width:200,
                    key:'departname'
                },
                {
                    title:'投诉类型',
                    width:120,
                    key:'typeName'
                },
                {
                    title:'处理状态',
                    width:120,
                    key:'processName'
                },
                {
                    title:'受理人',
                    width:120,
                    key:'receiving'                  
                },
                {
                    title:'创建时间',
                    width:120,
                    key:'createdate'             
                },
                {
                    title:'更新时间',
                    width:120,
                    key:'updatedate'                  
                },
                {
                    title:'创建人',
                    width:120,
                    key:'createby'                  
                }
            ]
        }
    },
    methods:{
        downloadExcel(){
                let field = [
                    {field:'name',title:'客户名称'},
                    {field:'companyname',title:'公司名称'},
                    // {field:'baseorderid',title:'提示'},
                    {field:'departname',title:'服务部门'},
                    {field:'type',title:'投诉类型',format:'complaintType'},
                    {field:'processType',title:'处理状态',format:'processType'},
                    {field:'receiving',title:'受理人'},
                    // {field:'ServiceStart',title:'服务开始时间'},
                    {field:'createdate',title:'创建时间'},                                                                   
                    {field:'updatedate',title:'更新时间'},                                                                     
                    {field:'createby',title:'创建人'},
                    {field:'record',title:'投诉内容'},
                    {field:'rx',title:'解决方案'},
                    // {field:'followname',title:'跟进人'} 
                ]
                let _self = this
                let url = `api/customer/complaintList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        processType:"done",
                        companyname:_self.YformInline.companyname,
                        customername:_self.YformInline.customername,
                        customertel:_self.YformInline.customertel,
                        bcreatedate:DateFormat(_self.YformInline.createdate[0]),
                        ecreatedate:DateFormat(_self.YformInline.createdate[1]),
                        bupdatedate:DateFormat(_self.YformInline.updatedate[0]),
                        eupdatedate:DateFormat(_self.YformInline.updatedate[1]),
                        departname:_self.YformInline.departname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.page = 1
            this.YformInline.companyname = ""
            this.YformInline.customername = ""
            this.YformInline.customertel = ""
            this.YformInline.updatedate = []
            this.YformInline.createdate = []
            this.YformInline.departname = ""         
            this.getData()
        },
        getData(){
            let _self = this
            let url = 'api/customer/complaintList'
            _self.Yloading = true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    processType:"done",
                    sortField:'updatedate',
                    companyname:_self.YformInline.companyname,
                    customername:_self.YformInline.customername,
                    customertel:_self.YformInline.customertel,
                    bcreatedate:DateFormat(_self.YformInline.createdate[0]),
                    ecreatedate:DateFormat(_self.YformInline.createdate[1]),
                    bupdatedate:DateFormat(_self.YformInline.updatedate[0]),
                    eupdatedate:DateFormat(_self.YformInline.updatedate[1]),
                    departname:_self.YformInline.departname                                                    
                }
            }

            function success(res){
                _self.Ydata =res.data.data.rows
                _self.NpageTotal = res.data.data.total
                 console.log(res)
                for(let i = 0;i<_self.Ydata.length;i++){
                    // console.log('1111')
                    _self.Ydata[i].typeName = _self.complaintType.get(_self.Ydata[i].type)
                    _self.Ydata[i].processName = _self.processType.get(_self.Ydata[i].processType)
                    _self.Ydata[i].complaintManage = _self.Ydata[i].complaint_manage
                    if(_self.Ydata[i].createdate == null || _self.Ydata[i].createdate == ""){
                    }else{
                        _self.Ydata[i].createdate = _self.Ydata[i].createdate.slice(0,10)
                    }
                    if(_self.Ydata[i].updatedate == null || _self.Ydata[i].updatedate == ""){
                    }else{
                        _self.Ydata[i].updatedate = _self.Ydata[i].updatedate.slice(0,10)
                    }
                }
            _self.Yloading = false
            }

            this.$Get(url, config, success)
            // console.log(config)
            // this.$http.get(url, config).then(function(res){
            //     // console.log(res.data.data.rows)
            //     _self.$backToLogin(res)                
            //     _self.Ydata =res.data.data.rows
            //     _self.NpageTotal = res.data.data.total
            //     // console.log(_self.Ydata.length)
            //     for(let i = 0;i<_self.Ydata.length;i++){
            //         // console.log('1111')
            //         _self.Ydata[i].typeName = _self.complaintType.get(_self.Ydata[i].type)
            //         _self.Ydata[i].processName = _self.processType.get(_self.Ydata[i].processType)
            //         _self.Ydata[i].complaintManage = _self.Ydata[i].complaint_manage
            //         if(_self.Ydata[i].createdate == null || _self.Ydata[i].createdate == ""){
            //         }else{
            //             _self.Ydata[i].createdate = _self.Ydata[i].createdate.slice(0,10)
            //         }
            //         if(_self.Ydata[i].updatedate == null || _self.Ydata[i].updatedate == ""){
            //         }else{
            //             _self.Ydata[i].updatedate = _self.Ydata[i].updatedate.slice(0,10)
            //         }
            //     }
            // })
        },
        save_current_row(e){
            // console.log(e)
            // console.log(this.complaintType)
            this.current_row = e
        },
        YpageChange(e){
            this.page = e
            this.getData()
        },
        YpageSizeChange(){
            this.pageSize = e
            this.getData()
        },
        Add_deal_complain(){
            this.$bus.emit('ADD_COMPLAINT',true)
            // Bus.$emit('ADD_COMPLAINT',true)
        },
        deal_complain(){
            let _self = this
            if(this.current_row != ''){
                // console.log('1111')
                // Bus.$emit('DEAL_COMPLATNT', _self.current_row)          
                _self.$bus.emit('DEAL_COMPLATNT', _self.current_row)          
            }else{
                this.$Message.warning('请选择一行进行处理！')
            }
        },
        open_complain(){
             let _self = this
            if(this.current_row != ''){
                // console.log('1111')
                // Bus.$emit('SHOW_COMPLATNT', _self.current_row) 
                _self.$bus.emit('SHOW_COMPLATNT', _self.current_row)          
            }else{
                this.$Message.warning('请选择一行进行处理！')
            }
        }
    },
    created () {
        let _self = this
        this.getData()
        // Bus.$on('UPDATE_COMPLAINT',(e)=>{
        //     _self.getData()
        // })
        _self.$bus.on('UPDATE_COMPLAINT',(e)=>{
            _self.getData()
        })
    }
}
</script>
