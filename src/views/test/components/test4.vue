<template>
    <div>
    <Tabs value="name1">
        <TabPane label="未领取" name="name1">
            <Card>
                <Row style="margin-bottom:10px">
                    <Collapse v-model="search_model">
                        <Panel name="1">
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            <div slot="content">
                                <Form ref="SearchValidate" :model="SearchValidate" :label-width="80">
                                    <Row :gutter="16">
                                        <Col span="8">
                                        <FormItem label="客户名称：" prop="customerName">
                                            <Input v-model="SearchValidate.customerName" size="small"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                        <FormItem label="客户电话：" prop="customerTel">
                                            <Input v-model="SearchValidate.customerTel" size="small"></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                        <FormItem label="创建人：" prop="crealname">
                                            <Input v-model="SearchValidate.crealname" size="small"></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row :gutter="16" style="height:56px">
                                        <Col span="8">
                                        <FormItem label="线索类型：" prop="clueType">
                                            <Select v-model="model2" size="small">
                                                <Option v-for="item in clue_level" :value="item.value" :key="item.value">{{item.value}}</Option>
                                            </Select>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                        <FormItem label="线索级别：" prop="clueLevel">
                                            <Select v-model="model2" size="small">
                                                <Option v-for="item in clue_level" :value="item.value" :key="item.value"></Option>
                                            </Select>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                        <FormItem label="创建时间：" prop="date">
                                            <DatePicker type="daterange" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <center>
                                        <FormItem style="margin-top:10px">
                                            <Button type="primary" @click="Search">搜索</Button>
                                            <Button type="ghost" @click="handleReset('SearchValidate')" style="margin-left: 8px">
                                                重置
                                            </Button>
                                        </FormItem>
                                    </center>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
                </Row>
                <Row>
                    <ButtonGroup>
                        <Button type="primary" icon="ios-color-wand-outline" @click="modal1 = true">新增</Button>
                        <Button type="primary" icon="ios-color-wand-outline" @click="DeleteClues">删除</Button>
                    </ButtonGroup>
                </Row>
                <Row style="margin-top: 10px;">
                    <Table highlight-row size="small" :loading="loadingN" :columns="tableColumns" :data="tableData"
                    @on-current-change="selectRow"></Table>
                    <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync = "paget"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                </Row>
            </Card>
        </TabPane>
        <TabPane label="已领取" name="name2">
            <Card>
                <Row>
                    <Collapse v-model="search_model2">
                        <Panel name="1">
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选er
                            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                        </Panel>
                    </Collapse>
                </Row>
            </Card>
        </TabPane>
    </Tabs>
    
    <Modal
        v-model="modal1"
        title="新增线索"
        ok-text="保存"
        :loading="loading"
        @on-ok="ok22('formValidate')"
        @on-cancel="cancel('formValidate')">
        <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="90">
            <FormItem label="客户类型" prop="neworold">
                <RadioGroup v-model="formValidate.neworold" size="large">
                    <Radio label="0">老客户</Radio>
                    <Radio label="1">新客户</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="公司地址" prop="companyname">
                <Select v-model="formValidate.affiliationArea" size="small">
                    <Option v-for="(item,index) in affiliation_area" :value="item.value" :key="index">{{item.value}}</Option>
                </Select>
            </FormItem>
            <FormItem label="客户名称" prop="customerName">
                <Input v-model="formValidate.customerName"></Input>
            </FormItem>
            <FormItem label="公司名称" prop="companyName">
            <Input v-model="formValidate.companyName" size="small"></Input>
            </FormItem>
            <FormItem label="客户电话" prop="customerTel">
                <Input v-model="formValidate.customerTel" size="small" ></Input>
            </FormItem>
            <FormItem label="线索说明" prop="clueMemo">
                    <Input v-model="formValidate.clueMemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" size="small">></Input>
            </FormItem>
        </Form>
    </Modal>
    </div>
    
</template>

<script>
    // import ImgEdit from '../../my-components/image-editor/image-editor'
    import {DateFormat} from '../../../libs/utils'

    export default {
        components: {
            // ImgEdit
        },
        data() {
            const validateCosName = (rule, value, callback) => {
                if(value == '' || value ==null) {
                    callback(new Error('请填写客户信息'));
                } else {
                    callback()
                }
            };
            const validateTel = (rule, value, callback) => {
                var re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback(new Error('电话不能为空'));
                } else {
                    if (re.test(value)) {
                        callback()
                    } else {
                        callback(new Error('电话格式不正确'));
                    }
                }
            };
            const validateClueMeno = (rule, value, callback) => {
                if(value == '' || value ==null) {
                    callback(new Error('请填写线索说明'));
                } else {
                    callback()
                }
            };
            return {
                right_click_show: false,
                rightTop: "",
                rightLeft: "",
                el: "",
                ctx: "",
                event,
                current: "12345",
                search_model2:"",
                search_model:"",
                model2: "",
                loadingN: false,
                loading: true,
                clue_level: [{
                        value: "系统线索"
                    },
                    {
                        value: "渠道线索"
                    },
                    {
                        value: "其他线索"
                    },
                    {
                        value: "服务部线索"
                    }
                ],
                //  未领取的线索
                ishandleSubmit:false,                
                SearchValidate:{
                    customerName:'',
                    customerTel:'',
                    crealname:'',
                    clueStatus:'',
                    clueType:'',
                    date:'',
                    clueLevel:''
                },
                rrealname:'',
                clue_level_map:new Map(),
                cluetype: [],
                tableColumns: [{
                        title: '客户名称',
                        key: 'customername',
                        minWidth: 130
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        minWidth: 130
                    },
                    {
                        title: '公司名称',
                        key: 'company_name',
                        minWidth: 200
                    },
                    {
                        title: '销售人员',
                        key: 'saler_name',
                        minWidth: 130
                    },
                    {
                        title: '线索状态',
                        key: 'cluesstatus',
                        minWidth: 100
                    },
                    {
                        title: '线索详情',
                        key: 'memo',
                        minWidth: 300
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        minWidth: 160
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        minWidth: 100
                    },
                    {
                        title: '线索级别',
                        key: 'clue_level',
                        minWidth: 120
                    },
                    {
                        title: '客户类型',
                        key: 'type',
                        minWidth: 120
                    },
                    {
                        title: '线索类型',
                        key: 'cluestype',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        fixed: 'right',
                        width:120
                    }
                ],
                tableData: [],
                pageTotal: new Number(),
                modal1: false,
                formValidate: {
                    neworold:"1",
                    customerTel: '',
                    clueMemo: '',
                    customerName: '',
                    companyid:"",
                    companyName:"",
                    customerId: "",
                    affiliationArea: "guangzhou"
                },
                // formValidate: {
                //     name: '',
                //     mail: '',
                //     city: '',
                //     gender: '',
                //     interest: [],
                //     date: '',
                //     time: '',
                //     desc: '',
                //     affiliationArea: "guangzhou"
                // },
                ruleValidate: {
                    neworold: [
                        { required: true, message: '请选择客户类型', trigger: 'change'}
                    ],
                    customerName: [
                        { required: true, trigger: 'blur', validator: validateCosName}
                    ],
                    customerTel: [
                        { required: true, trigger: 'change', validator: validateTel}
                    ],
                    clueMemo: [
                        { required: true, trigger: 'blur', validator: validateClueMeno}
                        // { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
                        // { required: true, message: '请填写线索说明', trigger: 'change' },
                    ]
                },
                // ruleValidate: {
                //     neworold: [
                //         { required: true, message: '请选择客户类型', trigger: 'change'}
                //     ],
                //     mail: [
                //         { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                //         { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                //     ],
                //     city: [
                //         { required: true, message: 'Please select the city', trigger: 'change' }
                //     ],
                //     gender: [
                //         { required: true, message: 'Please select gender', trigger: 'change' }
                //     ],
                //     interest: [
                //         { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                //         { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                //     ],
                //     date: [
                //         { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                //     ],
                //     time: [
                //         { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                //     ],
                //     desc: [
                //         { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //         { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                //     ]
                // },
                affiliation_area:[
                    {
                        value: '广州'
                    },
                    {
                        value:"深圳"
                    },
                    {
                        value:"兰州"
                    },
                    {
                        value:"东莞"
                    },
                    {
                        value:"郑州"
                    }
                ],
                cluesid: '',
                paget: 1,
                pageSizet: 10
                
            }
        },
        methods: {
            //重置
            handleReset(){
                var _self = this
                _self.SearchValidate.customerName = ''
                _self.SearchValidate.customerTel = ''
                _self.SearchValidate.crealname = ''
                _self.SearchValidate.date = ''
                _self.SearchValidate.clueType = ''
                _self.SearchValidate.clueLevel = ""
                _self.paget = 1
                _self.getTableData()
            },
            getTableData(){
                let _self = this
                let url = 'api/clue/list'
                _self.loadingN = true
                var config = {
                    params:{
                        receipt:'N',
                        page:_self.paget,
                        pageSize:_self.pageSizet,
                        customerName:_self.SearchValidate.customerName,
                        customerTel:_self.SearchValidate.customerTel,
                        clueStatus:_self.SearchValidate.clueStatus,
                        clueType:_self.SearchValidate.clueType,
                        crealname:_self.SearchValidate.crealname,
                        clueLevel:_self.SearchValidate.clueLevel,
                        rrealname:_self.rrealname,
                        bcreatedate:DateFormat(_self.SearchValidate.date[0]),
                        ecreatedate:DateFormat(_self.SearchValidate.date[1])
                        // un_clueType: "xtxs"
                    }
                }

                function doSuccess(response){
                    _self.tableData = []
                    _self.pageTotal = response.data.data.total
                    for (let i = 0;i < response.data.data.rows.length; i++){
                        let _tel
                        if(response.data.data.rows[i].customer_tel == null){
                            _tel = ''
                        } else{
                            _tel = response.data.data.rows[i].customer_tel
                        }
                        let type = ""
                        if(response.data.data.rows[i].neworold){
                            if(response.data.data.rows[i].neworold == 0){
                                type = "老客户"
                            }else{
                                type = "新客户"
                            }
                        }
                        _self.tableData.push({
                            type,
                            id: response.data.data.rows[i].id,
                            memo: response.data.data.rows[i].clue_memo,
                            cluesstatus: '未领取',
                            companyname: response.data.data.rows[i].companyname,
                            tel: _tel,
                            people: [
                                {
                                    tel: _tel,
                                    customername: response.data.data.rows[i].customer_name,
                                }
                            ],
                            customername: response.data.data.rows[i].customer_name,
                            createby: (response.data.data.rows[i].crealname),
                            labelName: response.data.data.rows[i].labelname,
                            createdate: response.data.data.rows[i].createdate,
                            clue_level: _self.clue_level_map.get(response.data.data.rows[i].clue_level),
                            saler_name: response.data.data.rows[i].saler_name,
                            customer_id: response.data.data.rows[i].customer_id,
                            company_name: response.data.data.rows[i].company_name
                        })
                    }
                    _self.loadingN = false
                }

                _self.$http.get(url,config).then(function(res){
                    console.log(res)
                    doSuccess(res)
                })
            },

            // 改变页码
            pageChange(a){
                let _self = this
                _self.paget = a
                _self.getTableData()
            },

            // 改变每页显示的数据条数
            pageSizeChange(a){
                let _self = this
                _self.pageSizet = a
                _self.getTableData()
            },

            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.cluesid = a.id
                _self.selectData = a
            },

            //条件搜索
            Search() {
                var _self = this;
                _self.paget = 1;
                _self.getTableData();
            },

            /*************************录入提交验证********************************/
            ok22(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                        this.$refs[name].validate((valid) => {
                            if (valid) {
                                if (_self.customerlabelGroup != undefined) {
                                    let labelIds = []
                                    for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                        labelIds.push(_self.customerlabelGroup[i].id)
                                    }
                                    _self.formValidate.labelIds = labelIds.toString()
                                }

                                let url = '/clue/create'

                                function doSuccess(response) {
                                    _self.modal1 = false
                                    _self.$Message.success('新增成功!')
                                    _self.cancel('formValidate')
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('新增失败!');
                                }

                                this.PostData(url, _self.formValidate, doSuccess, otherConditions)
                            } else {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                            }
                        })
                }, 2000);
            },

            cancel(name) {
                this.customerlabelGroup = []
                this.$refs[name].resetFields();
            },
            
            //删除某行
            DeleteClues() {
                let _self = this
                if (_self.cluesid == '') {
                    _self.$Message.warning('请选择要删除的线索!')
                } else {
                    _self.$Modal.confirm({
                        title: '删除线索',
                        content: '确定要删除此线索吗',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            let url = '/clue/del'
                            let _data = {
                                id: _self.cluesid
                            }

                            function doSuccess(re) {
                                _self.$Message.success('删除成功!')
                                _self.getTableData()
                            }

                            _self.PostData(url, _data, doSuccess)
                        }
                    });
                }
            },

            // handleSubmit (name) {
            //     this.$refs[name].validate((valid) => {
            //         if (valid) {
            //             this.$Message.success('Success!');
            //         } else {
            //             this.$Message.error('Fail!');
            //         }
            //     })
            // },
            // handleReset (name) {
            //     this.$refs[name].resetFields();
            // },
            ok () {
                this.$Message.info('Clicked ok')
            },
            // cancel () {
            //     this.$Message.info('Clicked cancel')
            // },
            right_click(event) {
                console.log(event)
                this.event = event
                this.right_click_show = true
                this.rightTop = event.y
                this.rightLeft = event.x
            },
            add_text() {
                console.log("123")
                //  设置下一次画笔颜色
                //  以下属性均可以自定义，同事layerY必须加上font-size的大小，否则会出现异常
                this.ctx.fillStyle = 'red'
                this.ctx.font = "30px Arial";
                this.ctx.fillText("Hello World", this.event.layerX, this.event.layerY + 30);
            },
            close_right_menu() {
                this.right_click_show = false
            },
        },
        mounted() {
            this.getTableData()
            // this.el = document.getElementById("myCanvas")
            // this.ctx = this.el.getContext("2d")
            // this.ctx.fillStyle = "#666666";
            // this.ctx.fillRect(0, 0, 375, 667);
        }
    }
</script>