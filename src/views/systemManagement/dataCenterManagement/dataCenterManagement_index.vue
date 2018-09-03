<template>
    <div>
        <Row>
            <Col :span="showwidth">
                <Card v-if="groupDataCenter">
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="search">
                                    <Form ref="searchModel" :model="searchModel" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="8">
                                                <FormItem prop="typegroupname" label="字典名称：">
                                                    <Input size="small" type="text" v-model="searchModel.typegroupname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="typegroupcode" label="字典编码：">
                                                    <Input size="small" type="text" v-model="searchModel.typegroupcode" placeholder="">
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
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="plus" @click="dataAdd">字典分类录入</Button>
                            <Button type="primary" icon="edit" @click="dataEdit">编辑</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="fatherDataHeader"
                                @on-current-change="selectFatherRow"
                                :data="fatherData"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-elevator
                                :current.sync="page"
                                @on-change="pageChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
            <Col span="12">
                <Card v-show="isOpenDetail">
                    <Row style="visibility:hidden;margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="plus" @click="typeDataAdd">类型录入</Button>
                            <Button type="primary" icon="edit" @click="closechilddata">关闭</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                            highlight-row
                            size="small"
                            :columns="childData_header"
                            :data="childData"></Table>
                        <Page
                            size="small"
                            :total="child_pageTotal"
                            show-total
                            show-elevator
                            :current.sync="child_page"
                            @on-change="childpageChange"
                            style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
            <Col span="12">
                <second-child></second-child>
            </Col>
        </Row>
        <Modal
            :title="father_detail_title"
            width="400"
            v-model="open_father_data"
            @on-cancel="close_father_data"
        >
            <Form ref="dataModel" :model="dataModel" :rules="dataModelRule" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typegroupname" label="字典名称：">
                            <Input size="small" type="text" v-model="dataModel.typegroupname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typegroupcode" label="字典编码：">
                            <Input size="small" type="text" v-model="dataModel.typegroupcode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button type="primary" @click="save" v-if="isADD" :loading="button_loading">新增</Button>
                    <Button type="primary" @click="save" v-if="!isADD" :loading="button_loading">修改</Button>
                    <!-- <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button> -->
                </div>
        </Modal>
        <Modal
            title="类型编辑"
            width="400"
            v-model="open_children_data_edit"
            @on-cancel="open_children_data_edit=false"
        >
            <Form ref="child_data_model" :model="child_data_model" :rules="child_data_modelrule" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typegroupname" label="字典名称：">
                            <Input size="small" type="text" v-model="child_data_model.typegroupname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typename" label="字典名称：">
                            <Input size="small" type="text" v-model="child_data_model.typename" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typecode" label="字典编码：">
                            <Input size="small" type="text" v-model="child_data_model.typecode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sort" label="字典排序：">
                            <Input size="small" type="text" v-model="child_data_model.sort" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button type="primary" @click="updateChildren" :loading="button_loading">修改</Button>
                    <Button type="ghost" style="margin-left:20px" @click="open_children_data_edit=false">关闭</Button>
                </div>
        </Modal>
        <Modal
            title="类型录入"
            width="400"
            v-model="open_children_data_add"
            @on-cancel="open_children_data_add = false"
        >
            <Form ref="childdatamodeladd" :model="child_data_model_add" :rules="child_data_model_addrule" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typegroupname" label="字典名称：">
                            <Input size="small" type="text" v-model="child_data_model_add.typegroupname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typename" label="字典名称：">
                            <Input size="small" type="text" v-model="child_data_model_add.typename" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typecode" label="字典编码：">
                            <Input size="small" type="text" v-model="child_data_model_add.typecode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sort" label="字典排序：">
                            <Input size="small" type="text" v-model="child_data_model_add.sort" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button type="primary" @click="typeDataAddMethod" :loading="button_loading">提交</Button>
                    <!-- <Button type="ghost" style="margin-left:20px" @click="this.$refs['childdatamodeladd'].resetFields()">重置</Button> -->
                </div>
        </Modal>
    </div>
</template>

<script>
import secondChild from './second_child_row'

export default {
    components: {
        secondChild
    },
    data(){
        return{
            groupDataCenter:true,
            button_loading:false,
            //  页面展示方式相关
            showwidth:24,
            isOpenDetail:false,
            //  筛选相关
            search_model:"",
            searchModel:{
                typegroupcode:"",
                typegroupname:""
            },
            //  一级字典表格相关
            current_father_row:[],
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            fatherDataHeader:[
                {
                    title: '字典名称',
                    key: 'typegroupname',
                    // width: 200
                },
                {
                    title: '字典code',
                    key: 'typegroupcode',
                    // width: 200
                },
                // {
                //     title: '排序',
                //     key:'sort'
                // },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.deleteRole(params)
                                        let url = `api/system/deleteTSTypegroup`
                                        let _self = this
                                        let config = {
                                            id: params.row.ID
                                        }
                                        this.$http.post(url, config).then(function(res){
                                            _self.$backToLogin(res)
                                            if(res.data.msgCode == "40000"){
                                                _self.$Message.success(res.data.msg)
                                                _self.getData()
                                            }else{
                                                _self.$Message.error(res.data.msg)
                                            }
                                        }).catch(function(res){
                                            _self.$Message.error("网络错误！")
                                        })
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.cheekUser(params.row.id)
                                        this.open_data_detail(params.row)
                                    }
                                }
                            }, '查看')
                        ]);
                    }
                }
            ],
            fatherData:[],
            //  新增
            open_father_data:false,
            dataModel:{
                id:"",
                typegroupcode:"",
                typegroupname:""
            },
            dataModelRule:{
                typegroupcode: [
                    {required: true, trigger: 'blur', message: '编码不能为空！'}
                ],
                typegroupname: [
                    {required: true, trigger: 'blur', message: '名称不能为空！'}
                ],
            },
            //  当前点击的id
            current_data_id:"",
            //  二级数据字典相关
            child_data_model:{
                typegroupname:"",
                typename:"",
                typecode:"",
                id:"",
                sort:""
            },
            child_data_modelrule:{
                typecode: [
                    {required: true, trigger: 'blur', message: '编码不能为空！'}
                ],
                typename: [
                    {required: true, trigger: 'blur', message: '名称不能为空！'}
                ],
            },
            child_data_model_addrule:{
                typecode: [
                    {required: true, trigger: 'blur', message: '编码不能为空！'}
                ],
                typename: [
                    {required: true, trigger: 'blur', message: '名称不能为空！'}
                ],
            },
            current_child_row:[],
            child_page:1,
            // child_pageSize:10,
            child_pageTotal:new Number(),
            childData:[],
            childData_header:[
                {
                    title: '类型名称',
                    key: 'typename',
                    // width: 200
                },
                {
                    title: '类型code',
                    key: 'typecode',
                    // width: 200
                },
                {
                    title: '排序',
                    key:'sort'
                },
                                    {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.deleteRole(params)
                                        let url = `api/system/deleteTSType`
                                        let _self = this
                                        let config = {
                                            id: params.row.ID
                                        }
                                        this.$http.post(url, config).then(function(res){
                                            _self.$backToLogin(res)
                                            if(res.data.msgCode == "40000"){
                                                _self.$Message.success(res.data.msg)
                                                _self.getChildrenData()
                                            }else{
                                                _self.$Message.error(res.data.msg)
                                            }
                                        }).catch(function(res){
                                            _self.$Message.error("网络错误！")
                                        })
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.cheekUser(params.row.id)
                                        this.open_child_data(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.cheekUser(params.row.id)
                                        this.open_second_child_data(params.row)
                                    }
                                }
                            }, '查看')
                        ]);
                    }
                }
            ],
            //  一级数据字典弹出框相关
            father_detail_title:"",
            isADD:true,
            open_children_data_edit:false,
            open_children_data_add:false,
            child_data_model_add:{
                typename:"",
                typecode:"",
                typegroupname:"",
                id:"",
                sort:"0"
            }
        }
    },
    methods:{
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.$refs['searchModel'].resetFields();
            this.page = 1
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        // pageSizeChange(e){
        //     this.pageSize = e
        //     this.getData()
        // },
        getData(){
            let _self = this
            let url = `api/system/queryTSTypeGroupsByNameOrCode/list`
            let config = {
                params:{
                    typegroupcode: _self.searchModel.typegroupcode,
                    typegroupname: _self.searchModel.typegroupname,
                    page: _self.page,
                    pageSize: 10
                }
            }
            this.$http.get(url, config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == "40000"){
                    _self.fatherData = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        //  获取当前点击行
        selectFatherRow(e){
            this.current_father_row = e
        },
        // clickAdd(){
        //     this.isOpenDetail = true
        //     this.showwidth = 12
        // },
        dataAdd(){
            this.open_father_data = true
            this.father_detail_title = '录入'
            this.isADD = true
            this.$refs['dataModel'].resetFields();            
        },
        close_father_data(){
            this.open_father_data = false            
        },
        dataEdit(){
            if(this.current_father_row == "" || this.current_father_row == null){
                this.$Message.warning("请选择一行进行编辑！")
            }else{
                this.open_father_data = true
                this.dataModel = this.current_father_row
                this.father_detail_title = '修改'
                this.isADD = false
            }
        },
        save(){
            let _self = this
            // console.log(this.dataModel)
            this.$refs['dataModel'].validate((valid) => {
                if (valid){
                    _self.button_loading = true
                    let url = ""
                    let config = ""
                    if(_self.isADD){
                        //  录入
                        url = `api/system/saveTSTypeGroup`
                        config = {
                            typegroupcode: _self.dataModel.typegroupcode,
                            typegroupname: _self.dataModel.typegroupname,
                        }
                    }else{
                        //  编辑
                        url = `api/system/updateTSTypeGroup`
                        config = {
                            id: _self.dataModel.ID,
                            typegroupcode: _self.dataModel.typegroupcode,
                            typegroupname: _self.dataModel.typegroupname,
                        }
                    }
                    _self.$http.post(url, config).then(function(res){
                        _self.$backToLogin(res)
                        if(res.data.msgCode == "40000"){
                            _self.$Message.success(res.data.msg)
                            _self.button_loading = false
                            _self.open_father_data = false
                            _self.current_father_row = ""
                            _self.getData()
                        }else{
                            _self.$Message.error(res.data.msg)
                            _self.button_loading = false
                        }
                    }).catch(function(res){
                        _self.$Message.error("网络错误！")
                        _self.button_loading = false
                    })
                }else{
                    _self.$Message.warning("请输入信息！")
                }
            })
        },
        // clickEdit(){
        //     this.isOpenDetail = false
        //     this.showwidth = 24
        // },
        open_data_detail(e){
            // console.log(e)
            this.isOpenDetail = true
            this.showwidth = 12
            this.child_page = 1
            this.current_data_id = e.ID
            this.child_data_model.typegroupname = e.typegroupname
            this.child_data_model_add.id = e.ID
            this.child_data_model_add.typegroupname = e.typegroupname
            this.getChildrenData()
        },
        

        /**
         * 子集数据相关方法
         */
        //  获取子集数据
        closechilddata(){
            this.isOpenDetail = false
            this.showwidth = 24
        },
        getChildrenData(){
            let _self = this
            let url = `api/system/queryTSTypeByTSTGroupId/list`
            let config = {
                params:{
                    typegroupid: _self.current_data_id,
                    page: _self.child_page,
                    pageSize: 10
                }
            }
            this.$http.get(url, config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == "40000"){
                    _self.childData = res.data.data.rows
                    _self.child_pageTotal = res.data.data.total
                }else{
                    _self.$Message.error(res.data.msg)
                }
            }).catch(function(res){
                _self.$Message.error("网络异常！")
            })
        },
        childpageChange(e){
            this.child_page = e
            this.getChildrenData()
        },
        open_child_data(e){
            this.child_data_model.id = e.ID
            this.child_data_model.typename = e.typename
            this.child_data_model.typecode = e.typecode
            this.child_data_model.sort = e.sort
            this.open_children_data_edit = true
        },
        //  字典type的录入
        typeDataAdd(){
            // this.$refs['childdatamodeladd'].resetFields()
            this.open_children_data_add = true
            this.child_data_model_add.typename = ""
            this.child_data_model_add.typecode = ""
        },
        typeDataAddMethod(){
            let _self = this            
            this.$refs['childdatamodeladd'].validate((valid) => {
                if (valid){
                    _self.button_loading = true
                    let url = `api/system/saveTSType`
                    let config = {
                        typename: _self.child_data_model_add.typename,
                        typecode: _self.child_data_model_add.typecode,
                        typegroupid: _self.child_data_model_add.id,
                        sort: _self.child_data_model_add.sort
                    }

                    function success(res){
                        _self.getChildrenData()
                        _self.open_children_data_add = false
                        _self.button_loading = false
                        
                    }

                    function fail(res){
                        _self.button_loading = false                
                    }
                    this.$Post(url,config, success,fail)
                }else{
                    _self.$Message.warning("请补全信息！")
                }
            })
        },
        updateChildren(){
            let _self = this            
            this.$refs['child_data_model'].validate((valid) => {
                if (valid){
                    let url = `api/system/updateTSType`
                    let config = {
                        typename: _self.child_data_model.typename,
                        typecode: _self.child_data_model.typecode,
                        id: _self.child_data_model.id,
                        sort: _self.child_data_model.sort
                    }

                    function success(res){
                        _self.getChildrenData()
                        _self.open_children_data_edit = false
                    }

                    function fail(res){

                    }
                    this.$Post(url,config, success,fail)
                }else{
                    _self.$Message.warning("请补全信息")
                }
            
            })
        },
        open_second_child_data(e){
            // console.log(e)
            this.$bus.emit('open_second_child',e)
            this.groupDataCenter = false
        }
        
    },
    created(){
        this.getData()
        let _self = this
        this.$bus.on('open_groups_data',(e)=>{
            _self.groupDataCenter = true
        })
    }
}
</script>
