<template>
    <Card>
                    <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="NformInline" :model="NformInline" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="companyname" label="公司名称：">
                                                <Input type="text" v-model="NformInline.companyname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="name" label="客户名称：">
                                                <Input type="text" v-model="NformInline.name" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="tel" label="客户电话：">
                                                <Input type="text" v-model="NformInline.tel" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="product" label="产品名称：">
                                                <Input type="text" v-model="NformInline.product" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="marketername" label="市场人员：">
                                                <Input type="text" v-model="NformInline.marketername" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="servicename" label="服务人员：">
                                                <Input type="text" v-model="NformInline.servicename" placeholder="" size="small">
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
                <Button type="primary" icon="ios-color-wand-outline" @click="add" v-permission="['offlineCustomer-add']">录入</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit" v-permission="['offlineCustomer-edit']"> 编辑</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="check">查看</Button>
                <Button type="primary" icon="trash-b" @click="del">删除</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downExcel">导出Excel</Button>                                
            </ButtonGroup>
        </Row>

        <Row style="margin-top: 10px;">
            <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    @on-row-click="selectrow"
                    :columns="header"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    current.sync="page" 
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"                    
                    style="margin-top: 10px"></Page>
        </Row>

    </Card>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        components: {
        },
        data() {
            return {
                NformInline:{
                    companyname:"",
                    name:"",
                    tel:"",
                    product:"",
                    marketername:"",
                    servicename:""
                },
                search_model:"",
                isExamine: false,
                modal: false,
                pageTotal: new Number(),
                page: 1,
                pageSize: 10,
                row: {},
                customerid: [],
                data: [],
                header: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        width: 300
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户手机',
                        key: 'TEL',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 120
                    },
                    {
                        title: '回访时间',
                        key: 'callbackdate',
                        width: 160
                    },
                    {
                        title: '服务人员',
                        key: 'servicer',
                        width: 120
                    },
                    {
                        title: '市场人员',
                        key: 'marketer',
                        width: 120
                    },
                    {
                        title: '结束时间',
                        key: 'enddate',
                        width: 160
                    },
                    {
                        title: '服务开始时间',
                        key: 'servicebegindate',
                        width: 160
                    },
                    {
                        title: '流程状态',
                        key: 'process_type',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 300,
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
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID: params.row.customerid});                                            
                                            // Bus.$emit('Open_customer_detail',params.row.customerid)
                                            // this.customerDetail(params)
                                        }
                                    }
                                }, '[查看客户]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // Bus.$emit('openCompanyDetail',params.row.companyid)
                                            this.$store.commit("open_gobal_company_detail_modal", params.row.companyid)
                                            // Bus.$emit('detail', params)
                                        }
                                    }
                                }, '[查看企业]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params.row.id)
                                            this.$bus.emit('OPEN_LOG',params.row.id)
                                        }
                                    }
                                }, '[审批记录]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            downExcel(){
                let field = [
                    {field:'name',title:'客户名称'},
                    {field:'CompanyName',title:'公司名称'},
                    // {field:'baseorderid',title:'提示'},
                    {field:'product',title:'产品名称'},
                    {field:'enddate',title:'下线时间'},
                    {field:'callbackdate',title:'回访时间'},
                    {field:'servicebegindate',title:'服务开始时间'},
                    {field:'servicer',title:'服务人员'},                                                                   
                    {field:'marketer',title:'市场人员'},                                                                     
                    {field:'reasonforcallback',title:'客户实际下线原因'},
                    {field:'reasonformarketer',title:'市场通知下线原因'} 
                ]
                let _self = this
                let url = `api/customer/customerEndList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        status:"N",
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field)),
                        companyname: _self.NformInline.companyname,
                        customername:_self.NformInline.name,
                        customertel:_self.NformInline.tel,
                        productname:_self.NformInline.product,
                        marketer:_self.NformInline.marketername,
                        servicer:_self.NformInline.servicename,
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
            },
            cancel() {
                var _self = this
                _self.customerid = []
                _self.isExamine = false
            },
            search(){
                this.page = 1
                this.getData()
            },
            reset(){
                this.page = 1
                this.NformInline.companyname = ""
                this.NformInline.name = ""
                this.NformInline.tel = ""
                this.NformInline.product = ""
                this.NformInline.marketername = ""
                this.NformInline.servicename = ""
                this.getData()
            },
            customerDetail(a) {
                let _self = this
                // console.log(a.row.customerid)
                _self.customerid[0] = a.row.customerid
                // console.log(_self.customerid[0])
                _self.isExamine = true
                _self.modal = true
            },

            add() {
                let _self = this

                _self.row.type = 'add'
                // Bus.$emit('add', _self.row)
                _self.$bus.emit("OPEN_OFFLINE_ADD",true)
            },

            edit() {
                let _self = this
                console.log(_self.row)
                if (_self.row.id == null ) {
                    _self.$Message.warning('请选择要查看的项目')
                } else if(_self.row.current_process != 'kf'){
                    _self.$Message.warning('当前流程状态不允许此操作')
                } else {
                    _self.row.type  = 'edit'
                    // Bus.$emit('add', _self.row)
                    _self.$bus.emit("OPEN_OFFLINE_UPDATE",_self.row)
                }
            },

            check() {
                let _self = this

                if (_self.row.id == null) {
                    _self.$Message.warning('请选择要查看的项目')
                } else {
                    _self.$bus.emit('OPEN_OFFLINE_SHOW', _self.row)
                }
            },
            //删除下线数据
            del() {
                let _self = this
                if(_self.row.id == null){
                    _self.$Message.warning('请先选择一行！')
                } else {
                    let url = `api/customer/delete`
                    let config = {
                        params: {
                            applyId: _self.row.id
                        }
                    }
                    function success(res){
                        // console.log(res)
                        _self.$Message.success('删除成功')
                        _self.getData()
                    }
                    
                    _self.$Get(url,config,success)
                }
            },

            getData() {
                let _self = this
                let url = '/customer/customerEndList?sortField=id&page=' + _self.page + '&status=N&pageSize=' + _self.pageSize + '&companyname=' + _self.NformInline.companyname + '&customername=' + _self.NformInline.name + '&customertel=' + _self.NformInline.tel + '&productname=' + _self.NformInline.product + '&marketer=' + _self.NformInline.marketername + '&servicer=' + _self.NformInline.servicename 
                _self.row = {}
                function doSuccess(res) {
                    console.log(res.data.data)
                    let _data = res.data.data

                    _self.pageTotal = _data.total
                    _self.data = _data.rows
                    
                    for(let i = 0;i<_self.data.length;i++){
                        _self.data[i].company_id = _self.data[i].companyid                        
                        if(_self.data[i].enddate == null ||_self.data[i].enddate == ""){

                        }else{
                            _self.data[i].enddate = _self.data[i].enddate.slice(0,10)
                        }

                        if(_self.data[i].callbackdate == null ||_self.data[i].callbackdate == ""){

                        }else{
                            _self.data[i].callbackdate = _self.data[i].callbackdate.slice(0,10)
                        }

                        if(_self.data[i].servicebegindate == null ||_self.data[i].servicebegindate == ""){

                        }else{
                            _self.data[i].servicebegindate = _self.data[i].servicebegindate.slice(0,10)
                        }
                    }
                }

                this.GetData(url, doSuccess)
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

            selectrow(a) {
                this.row = a
            }
        },
        mounted() {
            this.getData()
        },
        created () {
            let _self = this
            Bus.$on('updateofflinecustomer',(e)=>{
                _self.getData()
            })
            
        }
    }
</script>