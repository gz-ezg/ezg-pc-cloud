<template>
   <div>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100" style="margin-top: -10px">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="customerName" label="客户名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.customerName" placeholder=""/>
                                       
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="followName" label="跟进人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.followName" placeholder=""/>
                                    </FormItem>
                                </Col>
                                <!-- <Col span="8">
                                    <FormItem prop="post" label="岗位：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.post" placeholder=""/>
                                    </FormItem>
                                </Col> -->
                            </Row>
                            <!-- <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="sex" label="性别：">
                                        <Select type="text" size="small" v-model="seacrhFormInline.sex" placeholder="">
                                            <Option value="0">男</Option>
                                            <Option value="1">女</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="createdate" label="创建时间：">
                                        <DatePicker type="daterange" size="small" v-model="seacrhFormInline.createdate" placeholder="" style="width:100%"/>
                                    </FormItem>
                                </Col>
                            </Row> -->
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
     </Row>
     <Row>
        <!-- <ButtonGroup style="float:left">
            <Button type="primary" icon="information-circled" @click="create_template">新增</Button>
            <Button type="primary" icon="information-circled" @click="update_template">修改</Button>
            <Button type="primary" icon="information-circled" @click="del_template">删除</Button>
        </ButtonGroup> -->
     </Row>
     <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                @on-current-change="save_current_row"
                :loading="loading"
                :columns="header"
                :data="data"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
    <show-template :invoiceStatus="invoiceStatus"></show-template>
  </div>
</template>

<script>
import showTemplate from './show'
// import updateTemplate from './update'

import { DateFormat }from '../../../libs/utils.js'

export default {
    components:{
        showTemplate,
    //     updateTemplate
    },
    name: "invoicelist_index",
    data(){
        return{
            invoiceStatus: [],
            invoiceStatus_Map: new Map(),
            //  选中的列
            selectRow: [],
            logoutLoading: false,
            logoutReason: "",
            openLogout: false,
            selectRow:{},
            current_row:'',
            search_model:"",
            loading: false,
            openDetail:false,
            seacrhFormInline: {
                followName: "",
                // age: "",
                customerName: "",
                // city: "",
                // tel:"",
                // createdate: [],
                // post: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "状态",
                    key: "invoice_status_name",
                    minWidth:120,
                    render: (h, params) => {
                        let temp = this.invoiceStatus_Map.get(params.row.invoice_status)
                        return h('div',{},temp)
                    }
                },
                {
                    title: "客户名称",
                    key: "customerName",
                    minWidth: 100
                },
                {
                    title: "单位名称",
                    key: "enterprise_name",
                    minWidth: 220
                },
                {
                    title: "发票类别",
                    key: "invoice_type",
                    minWidth: 120,
                },
                {
                    title: "发票内容",
                    key: "invoice_content",
                    minWidth: 120,
                },
                {
                    title: "领取方式",
                    key: "express_type",
                    minWidth: 120
                },
                {
                    title: "跟进销售",
                    key: "followby",
                    minWidth:120
                },
                {
                    title: "创建时间",
                    key: "create_date",
                    minWidth:120,
                    render: (h, params) => {
                        let temp = params.row.create_date
                        if(temp){
                            temp = temp.slice(0,10)
                        }
                        return h('div',{},temp)
                    }
                },
                {
                    title: "备注",
                    key: "tax_memo",
                    minWidth: 150
                },
                {
                    title:"操作",
                    width: 100,
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
                                            this.update_template(params.row)
                                        }
                                    }
                                }, '查看')
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        save_current_row(e){
            this.current_row = e
        },
        update_template(e){
            // console.log(e)
            this.$bus.emit("OPEN_EDIT_INVOICE_TEMPLATE",e)  
        },
        get_data(){
            let _self = this
            let url = "api/customer/customerInvoiceList"

            _self.loading = true

            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: "id",
                    followName: _self.seacrhFormInline.followName,
                    customerName: _self.seacrhFormInline.customerName
                }
                
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
               
                _self.loading = false
            }

            this.$Get(url, config, success);
            this.current_row = '';
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
         search(){
            this.page = 1
            this.get_data()
        },
        reset(){
            this.$refs["seacrhFormInline"].resetFields()
            this.get_data()
        },
        get_data_center(){
            
            let _self = this
            let params = "invoiceStatus"

            function success(res){
              _self.invoiceStatus = res.data.data.invoiceStatus
              _self.invoiceStatus_Map = _self.$array2map(_self.invoiceStatus)
              _self.get_data()
            }
            
            this.$GetDataCenter(params, success)

        }
    } ,
    created(){
        this.get_data_center()
        let _self = this
        this.$bus.on("UPDATE_INVOICE_LIST",(e) => {
            _self.get_data()
        })
    }
}
</script>
