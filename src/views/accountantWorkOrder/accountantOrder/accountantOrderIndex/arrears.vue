<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div  slot="content" @keydown="show">
                            <Form ref="formInline" :model="formInline" :label-width="100">
                                <Row :gutter="12">
                                    <Col span="8">
                                        <FormItem prop="companyName" label="公司名称：">
                                            <Input size="small" type="text" v-model="formInline.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="server_realname" label="服务人员：">
                                            <Input size="small" type="text" v-model="formInline.server_realname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <!-- <Col span="12">
                                        <FormItem prop="accmanager_realname" label="会计经理名称：">
                                            <Input size="small" type="text" v-model="formInline.accmanager_realname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col> -->
                                    <Col span="8">
                                        <FormItem prop="followby_realname" label="跟进人：">
                                            <Input size="small" type="text" v-model="formInline.followby_realname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="12">
                                    <Col span="8">
                                    <FormItem label="结束账期：" prop="followby_realname">
                                        <Input v-model="formInline.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                        -
                                        <Input v-model="formInline.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
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
            <ButtonGroup>
                <!-- <Button type="primary" icon="information-circled" @click="scbd">时长变动日志</Button> -->
                <Button type="primary" icon="ios-color-wand-outline" @click="ksfw">停止服务</Button>
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="bgcp">产品变更</Button>-->
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="tiaozheng = true">调整服务余额</Button>-->
                <Button type="primary" icon="ios-color-wand-outline" @click="bgkj">变更会计</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="bgmx">会计变更明细</Button> -->
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="gszx">公司注销详情</Button>-->
                <Button type="primary" icon="ios-color-wand-outline" @click="fuwuxiang">查看会计到家服务项目</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="kjfw">会计到家服务</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="yfwjh">查看服务计划</Button> -->
                <Button type="primary" icon="ios-color-wand-outline" @click="openFieldByCompanyId">外勤详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="ydzj">查看月度总结</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
            <!-- <Poptip 
                title="筛选" 
                placement="bottom-end" 
                width="700" 
                style="float:right;margin-right:20px" 
            >
                <Button type="text" size="small" icon="funnel">筛选</Button>
                
            </Poptip> -->
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
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    style="margin-top: 10px"></Page>
        </Row>
        <Modal
                v-model="tiaozheng"
                title="调整服务余额"
                width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务余额：">
                            <Input size="small" type="text" v-model="task_message.companyName" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="单价/月：">
                            <Input size="small" type="text" v-model="task_message.companyName">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </Card>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return {
                search_model:"",
                formInline:{
                    companyName:"",
                    server_realname:"",
                    accmanager_realname:"",
                    followby_realname:"",
                    begin_end_period: "",
                    end_end_period: ""
                },
                tiaozheng: false,
                page: 1,
                pageSize: 10,
                pageTotal: new Number(),
                id: {},
                task_message:{
                    companyName:''
                },
                data:[],
                header: [
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'server_realname',
                        width: 120
                    },
                    {
                        title: '剩余时长',
                        key: 'balance_count',
                        width: 120
                    },
                    {
                        title: '国地税报道',
                        key: 'gdsreport',
                        width: 120
                    },
                    {
                        title: '对应企业',
                        key: 'CompanyName',
                        render: (h, params) => {
                            if (params.row.CompanyName == '' || params.row.CompanyName == null) {
                                return ''
                            } else {
                                return h('Poptip', {
                                    props: {
                                        trigger: 'hover',
                                        title: '公司名称',
                                        placement: 'bottom'
                                    }
                                }, [
                                    h('span', this.data[params.index].CompanyName[0].name + ''),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b'
                                        }
                                    }),
                                    h('div', {
                                        slot: 'content'
                                    }, [
                                        h('ul', this.data[params.index].CompanyName.map(item => [
                                            h('li', {
                                                style: {
                                                    padding: '4px'
                                                }
                                            }, '公司名：' + item.name),
                                        ]))
                                    ])
                                ])
                            }
                        },
                        ellipsis: true,
                        width: 300
                    },
                    {
                        title: '跟进人',
                        key: 'followby_realname',
                        width: 100
                    },
                    {
                        title: '警戒值',
                        key: 'accounter_security_line',
                        width: 100
                    },
                    {
                        title: '开始时间',
                        key: 'begin_period',
                        width: 100
                    },
                    {
                        title: '结束时间',
                        key: 'end_period',
                        width: 100
                    },
                    // {
                    //     title: '是否与计划相符',
                    //     key: 'gjr',
                    //     width: 120
                    // },
                    {
                        title: '备注',
                        key: 'workordermemo',
                        width: 120,
                        render:(h,params) => {
                            if(params.row.workordermemo == ''||params.row.workordermemo == null){
                                return ''
                            }else if(params.row.workordermemo.length>5){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.workordermemo.slice(0,5)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.workordermemo)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.workordermemo)
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
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
                                            Bus.$emit('detail', params)
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.batchBookId != null){
                                                Bus.$emit('open_yichang_detail',params.row.batchBookId)
                                            }else{
                                                this.$Message.warning('未绑定账本')
                                            }
                                        }
                                    }
                                }, '[查看异常]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            downloadExcel(){
                let field = [
                    {field:'product',title:'产品名称'},
                    {field:'server_realname',title:'服务人员'},
                    // {field:'createbyrealname',title:'创建人'},
                    {field:'balance_count',title:'剩余时长'},
                    {field:'gdsreport',title:'国地税报道',format:'GDSreport'},
                    {field:'followby_realname',title:'跟进人'},
                    {field:'gjr',title:'警戒值'},
                    {field:'begin_period',title:'开始时间'},
                    {field:'end_period',title:'结束时间'},
                    {field:'workordermemo',title:'备注'}
                    ]
                let _self = this
                let url = `api/order/cycle/service/record/list`
                let config = {
                        service_status:'arrears',
                        sortField:'createdate',
                        service_type:'kjdj',
                        page: '1',
                        pageSize: '1000000',
                        companyName: _self.formInline.companyName,
                        server_realname: _self.formInline.server_realname,
                        accmanager_realname: _self.formInline.accmanager_realname,
                        followby_realname: _self.formInline.followby_realname,
                        begin_end_period: _self.formInline.begin_end_period,
                        end_end_period: _self.formInline.end_end_period,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)

            },
            show(e){
                if(e.key == "Enter"){
                    this.search()
                }
            },
            search(){
                this.getData()
            },
            reset(){
                this.formInline.companyName = ""
                this.formInline.server_realname = ""
                this.formInline.accmanager_realname = ""
                this.formInline.followby_realname = ""
                this.formInline.begin_end_period = ""
                this.formInline.end_end_period = ""
                this.getData()
            },
            getData() {
                let _self = this
                let url = '/order/cycle/service/record/list?sortField=createdate&service_type=kjdj&page=' + _self.page + '&pageSize=' + _self.pageSize + '&service_status=arrears' +'&companyName=' + _self.formInline.companyName + '&server_realname=' + _self.formInline.server_realname + '&accmanager_realname=' + _self.formInline.accmanager_realname + '&followby_realname=' + _self.formInline.followby_realname + '&begin_end_period=' + _self.formInline.begin_end_period + "&end_end_period=" + _self.formInline.end_end_period

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        let _company = [{
                            name: _data.rows[i].CompanyName
                        }]
                        _data.rows[i].CompanyName = _company

                        if (_data.rows[i].gdsreport == 'ybd') {
                            _data.rows[i].gdsreport = '已报道'
                        } else if (_data.rows[i].gdsreport == 'wbd') {
                            _data.rows[i].gdsreport = '未报道'
                        } else if (_data.rows[i].gdsreport == 'bybd') {
                            _data.rows[i].gdsreport = '不用报道'
                        }

                        _self.data.push(_data.rows[i])
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
            
            scbd() {
                Bus.$emit('shic',true)
            },

            bgcp() {
                Bus.$emit('biangeng',true)
            },

            ksfw() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    _self.$Message.warning('请选择要停止服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {
                        let url = '/order/cycle/service/record/update'
                        let _data = {
                            id: _self.id.id,
                            serviceStatus: 'stop'
                        }

                        function doSuccess() {
                            _self.$Message.success('成功停止服务')
                            _self.page = 1
                            _self.getData()
                            Bus.$emit('UPDATE_ALL_ACCOUNT_PAGE',  true)
                        }

                        _self.PostData(url, _data, doSuccess)
                    },
                    onCancel: () => {}
                });
                }
            },

            bgkj() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    this.$Message.warning('请选择要变更会计的项目')
                } else {
                    Bus.$emit('fenpei', _self.id)
                }
            },

            bgmx() {
                Bus.$emit('rizhi',true)
            },

            gszx() {
                Bus.$emit('zhuxiao',true)
            },

            kjfw() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    this.$Message.warning('请选择要查看的项目')
                } else {
                   Bus.$emit('kjfuwu',_self.id)
                }
            },

            yfwjh() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    this.$Message.warning('请选择要查看的项目')
                } else {
                  Bus.$emit('yuefw', _self.id)  
                }
            },

            ydzj() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    this.$Message.warning('请选择要查看的项目')
                } else {
                  Bus.$emit('zongjie', _self.id)  
                }
            },

            fuwuxiang() {
                let _self = this

                if (_self.id.id == '' || _self.id.id == undefined) {
                    this.$Message.warning('请选择要查看的项目')
                } else {
                  Bus.$emit('fuwux',  _self.id.company_id)
                }
            },

            selectrow(a) {
                let _self = this
                _self.id = a
            },
            openFieldByCompanyId(){
                let _self = this

                if (!_self.id) {
                    this.$Message.warning('请选择要查看的项目！')
                } else {
                    console.log(_self.id)
                    _self.$bus.emit('OPEN_FIELD_LIST_BY_COMPANYID', [_self.id.company_id,_self.id.companyname])
                }
            }
        },
        mounted() {
            this.getData()
        },
        created () {
            let _self = this
            Bus.$on('UPDATE_ALL_ACCOUNT_PAGE',(e)=>{
                _self.getData()
            })
            Bus.$on('update_auditlist_detail',(e)=>{
                _self.getData()
            })
        }
    }
</script>

