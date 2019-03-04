<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                    <Collapse>
                        <Panel name="1" >
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                            <div slot="content" @keydown.enter="Search">
                                <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem label="企业名称：" prop="companyname">
                                                <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem label="电话号码：" prop="tel">
                                                <Input v-model="formValidateSearch.tel" size="small"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem label="审批流程：" prop="tel">
                                                <Input  size="small"></Input>
                                            </FormItem>
                                        </Col>
                                     </Row>
                                     <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem label="创建人：" prop="tel">
                                                <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem label="异常类型：" prop="unType">
                                                <Select transfer v-model="formValidateSearch.unType" size="small">
                                                    <Option v-for="(item, index) in unusualType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem label="创建时间" prop="date">
                                                <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:100%" size="small"></DatePicker>
                                            </FormItem>
                                        </Col>
                                     </Row>
                                    <center>
                                        <FormItem>
                                            <Button type="primary" @click="Search" >搜索</Button>
                                            <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </center>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="openAdd=true">新增</Button>
                    <Button type="primary" icon="edit" @click="open_edit">编辑</Button>
                    <Button type="primary" icon="information-circled" @click="abOrder_show">查看</Button>
                    <Button type="primary" icon="trash-b" @click="del_abOrder">删除</Button>
                    <Button type="primary" icon="ios-color-filter-outline" @click="refresh">刷新</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                    :loading="loading"
                    highlight-row
                    size="small"
                    border
                    :columns="header"
                    :data="data"
                    @on-row-click="select_row"
                    @on-row-dblclick="open_abOrder_detail"
                    @on-sort-change="sort"
                >
                </Table>
                <Page
                    size="small"
                    :total="total"
                    show-total
                    show-sizer
                    show-elevator
                    :current.sync="page"
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    style="margin-top: 10px">
                </Page>
            </Row>
        </Card>

        <add-ab-order v-if="openAdd" @close="close"></add-ab-order>
        <show-ab-order></show-ab-order>
        <edit-ab-order></edit-ab-order>
        <aduit-log></aduit-log>
    </div>
</template>

<script>

import addAbOrder from './components/abOrderOp/addAbOrder'
import showAbOrder from './components/abOrderOp/showAbOrder'
import editAbOrder from './components/abOrderOp/editAbOrder'
import aduitLog from './components/aduitLog'

import { DateFormat } from '../../../libs/utils.js'

export default {
    name: "abnormalOrderList_index",
    components:{
        addAbOrder,
        showAbOrder,
        editAbOrder,
        aduitLog
    },
    data() {
        return {
            //筛选相关
            formValidateSearch:{
                companyname: "",
                tel: "",
                crealname: "",
                unType: "",
                date: []
            },
            //数据字典
            unusualType:[],
            unusualType_map: new Map(),
            //异常工单列表
            sortField:"create_date",
            selectRow:'',
            data:[],
            page:1,
            pageSize:10,
            loading: false,
            total:0,
            header: [
                {
                    title: '异常工单号',
                    key: 'unusual_code',
                    minWidth: 140
                },
                {
                    title: '公司名称',
                    key: 'companyname',
                    minWidth: 300
                },
                {
                    title: '客户名称',
                    key: 'name',
                    minWidth: 120
                },
                {
                    title: '客户电话',
                    key: 'tel',
                    minWidth: 120
                },
                {
                    title: '产品内容',
                    key: 'product_content',
                    minWidth: 180,
                    render:(h,params) =>{
                        if(params.row.product_content =='' || params.row.product_content == null){
                            return ''
                        }else if(params.row.product_content.length>10){
                            return h('Poptip', {
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.product_content.slice(0,10)+'...'),
                                h('Icon',{
                                    props:{
                                        type: 'arrow-down-b'
                                    }
                                }),
                                h('div',{
                                    slot: 'content'
                                },[
                                    h('span',params.row.product_content)
                                ])
                            ])
                        }else{
                            return h('span',params.row.product_content)
                        }
                    }
                },
                {
                    title: '流程状态',
                    key: 'process_type',
                    minWidth: 120,
                    sorttable: "custom"
                },
                {
                    title: '当前审批',
                    key: 'process_type',
                    minWidth: 120,
                    sorttable: "custom"
                },
                {
                    title: "异常类型",
                    key: "unusual_type",
                    minWidth: 120
                },
                {
                    title: "审批事由",
                    key: "apply_memo",
                    minWidth: 180,
                    render:(h,params) =>{
                        if(params.row.apply_memo =='' || params.row.apply_memo == null){
                            return ''
                        }else if(params.row.apply_memo.length>10){
                            return h('Poptip', {
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.apply_memo.slice(0,10)+'...'),
                                h('Icon',{
                                    props:{
                                        type: 'arrow-down-b'
                                    }
                                }),
                                h('div',{
                                    slot: 'content'
                                },[
                                    h('span',params.row.apply_memo)
                                ])
                            ])
                        }else{
                            return h('span',params.row.apply_memo)
                        }
                    }
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    minWidth: 120,
                    sortable: "custom"                                                               
                },
                {
                    title: '创建人',
                    key: 'realname',
                    minWidth: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    minWidth: 100,
                    render: (h,params) =>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type: 'warning',
                                    size: 'small'
                                },
                                on:{
                                    click: () => {
                                        console.log(params.row.applyId)
                                        this.open_approve_log(params)
                                    }
                                }
                            },'审批记录')
                        ]);
                    }
                }
            ],
            openAdd: false
        }
    },
    methods:{
        //获取数据字典
        get_data_center(){
            let _self = this
            return new Promise((resolve,reject) => {
                let params = "unusualType"

                function success(res){
                    _self.unusualType = res.data.data.unusualType
                    _self.unusualType_map = _self.$array2map(_self.unusualType)
                    resolve()
                }

                this.$GetDataCenter(params, success)
                
            }) 
        },

        //获取异常工单列表
        get_data(){
            let _self = this
            let url = `api/order/unusual/workorder/list`
            _self.loading = true
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    companyName: _self.formValidateSearch.companyname,
                    tel: _self.formValidateSearch.tel,
                    sortField: _self.sortField,
                    bcreatedate: DateFormat(_self.formValidateSearch.date[0]),
                    ecreatedate: DateFormat(_self.formValidateSearch.date[1]),
                    createName: _self.formValidateSearch.crealname,
                    unusualType: _self.formValidateSearch.unType
                }
            }

            function success(res){
                console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                for(let i =0; i<_self.data.length; i++){
                    _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                    _self.data[i].unusual_type = _self.unusualType_map.get(_self.data[i].unusual_type)
                }
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url,config,success)
        },
        //  搜索相关
        Search(){
            this.page = 1
            this.get_data()
        },
        handleReset(){
            this.$refs["formValidateSearch"].resetFields()
            this.formValidateSearch.date = []
            this.formValidateSearch.crealname = ""
            this.get_data()
        },
        //更改页码
        pageChange(e){
            this.page = e
            this.get_data()
        },
        //每页显示条数
        pageSizeChange(e){
            this.pageSize = e
            this.get_data()
        },
        //选中某行
        select_row(e){
            if(e.applyId){
                this.selectRow = e
            }else {
                this.selectRow = ''
            }
        },

        close(e){
            this.openAdd = false
            if(e){
                this.get_data()
            }
        },
        //打开审批记录
        open_approve_log(e){
            this.$bus.emit("AB_APPROVELIST_LOG",e)
        },

        //编辑异常工单
        open_edit(){
            let _self = this
            if(this.selectRow){
                console.log(this.selectRow)
                if(this.selectRow.current_process != 'Ready'){
                    this.$Message.warning("当前订单状态不允许编辑！")
                }else{
                    this.$bus.emit('OPEN_AB_ORDERLIST_EDIT',_self.selectRow)
                }
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },

        //双击查看工单详情
        open_abOrder_detail(e){
            console.log(e)
            this.$bus.emit('OPEN_AB_ORDERLIST_DETAIL',e)
        },

        //点击查看工单详情
        abOrder_show(){
            let _self = this
            if(_self.selectRow){
                this.open_abOrder_detail(_self.selectRow)
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },

        //删除异常工单
        del_abOrder(){
            let _self = this
            if(_self.selectRow){
                let url = `api/order/unusual/workorder/deleteWorkOrder`
                let config ={
                    params:{
                        applyId : _self.selectRow.applyId
                    }
                }

                function success(res){
                    setTimeout(()=>{
                        _self.$Message.success("删除成功！")
                        _self.get_data()
                        _self.selectRow = ''
                    }, 500)
                }

                _self.$Get(url, config, success)

            }else {
                this.$Message.warning("请选择一行进行操作！")
            }
        },

        //排序
        sort(e){
            if(e.order =='desc'){
                this.sortField = ""
            }else{
                this.sortField = "create_date"
            }
            this.get_data()
        },

        //刷新
        refresh(){
            this.get_data()
        }

    },
    created() {
        this.get_data_center().then(
            this.get_data()
        )
        this.$bus.on('OPEN_AB_ORDER_LIST',(e)=>{
            this.get_data()
        })
        this.$bus.on('UPDATE_AB_ORDERLIST',(e)=>{
            this.get_data()
        })
    }
}
</script>