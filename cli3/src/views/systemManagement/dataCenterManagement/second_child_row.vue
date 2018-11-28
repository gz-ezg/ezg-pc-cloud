<template>
    <Card v-show="isOpenSecondDetail">
        <Row style="visibility:hidden;margin-bottom:10px">
            <Collapse>
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="secondDataAdd">三级类型录入</Button>
                <Button type="primary" icon="edit" @click="closeSecondData">关闭</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                highlight-row
                size="small"
                :columns="secondHeader"
                :data="secondData"></Table>
            <Page
                size="small"
                :total="second_pageTotal"
                show-total
                show-elevator
                :current.sync="second_child_page"
                @on-change="secondchildpageChange"
                style="margin-top: 10px">
            </Page>
        </Row>
        <Modal
            title="录入二级字典"
            v-model="is_open_add"
            width="500"
        >
            <Form ref="secondAdd" :model="secondAdd" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="fathertypename" label="父级字典名称：">
                            <Input size="small" type="text" v-model="child_name" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typename" label="字典名称：">
                            <Input size="small" type="text" v-model="secondAdd.typename" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typecode" label="字典编码：">
                            <Input size="small" type="text" v-model="secondAdd.typecode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sort" label="字典排序：">
                            <Input size="small" type="text" v-model="secondAdd.sort" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="AddMethod" :loading="button_loading">提交</Button>
                    <!-- <Button type="ghost" style="margin-left:20px" @click="this.$refs['childdatamodeladd'].resetFields()">重置</Button> -->
            </div>
        </Modal>
        <Modal
            title="编辑二级字典"
            v-model="is_open_edit"
            width="500"
        >
            <Form ref="secondEdit" :model="secondEdit"  :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typegroupname" label="父级字典名称：">
                            <Input size="small" type="text" v-model="child_name" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typename" label="字典名称：">
                            <Input size="small" type="text" v-model="secondEdit.typename" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="typecode" label="字典编码：">
                            <Input size="small" type="text" v-model="secondEdit.typecode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sort" label="字典排序：">
                            <Input size="small" type="text" v-model="secondAdd.sort" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="EditMethod" :loading="button_loading">提交</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
export default {
    data(){
        return{
            secondAdd:{
                typename:"",
                typecode:"",
                sort:"0"
            },
            secondEdit:{
                typename:"",
                typecode:"",
                id:"",
                sort:"0"
            },
            //  弹出录入框
            is_open_add:false,
            is_open_edit:false,
            button_loading:false,
            child_id:"",
            child_name:"",
            isOpenSecondDetail:false,
            secondHeader:[
                {
                    title: '字典名称',
                    key: 'typename',
                    minWidth: 200
                },
                {
                    title: '字典code',
                    key: 'typecode',
                    minWidth: 200
                },
                {
                    title: '排序',
                    key:'sort',
                    minWidth: 120
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    minWidth: 200,
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
                                        let url = `api/system/deleteTSType`
                                        let _self = this
                                        let config = {
                                            id: params.row.ID
                                        }
                                        function success(res){
                                            _self.getSecondData()
                                        }
                                        function fail(res){

                                        }
                                        this.$Post(url, config, success, fail)
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
                                        this.open_second_detail(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            secondData:[],
            second_pageTotal:new Number(),
            second_child_page:1
        }
    },
    methods: {
        secondDataAdd(){
            this.is_open_add = true
        },
        closeSecondData(){
            this.$bus.emit('open_groups_data',true)
            this.isOpenSecondDetail = false
        },
        secondchildpageChange(e){
            this.second_child_page = e
            this.getSecondData()
        },
        getSecondData(){
            let _self = this
            let url = `api/system/queryTSTypeByTypepid/list`
            let config = {
                params:{
                    id: _self.child_id,
                    page: _self.second_child_page,
                    pageSize: 10
                }
            }

            function success(res){
                // console.log(res.data.data.rows)
                _self.secondData = res.data.data.rows
                _self.second_pageTotal = res.data.data.total
            }

            function fail(res){

            }

            this.$Get(url, config, success, fail)
        },
        open_second_detail(e){
            // console.log(e)
            this.secondEdit.id = e.ID
            this.secondEdit.typename = e.typename
            this.secondEdit.typecode = e.typecode
            this.is_open_edit = true     
        },
        AddMethod(){
            let _self = this
            _self.button_loading = true
            let url = `api/system/saveTSTypeByTypePid`
            let config = {
                id: _self.child_id,
                typegroupid: 10383,
                typename: _self.secondAdd.typename,
                typecode: _self.secondAdd.typecode,
                sort: _self.secondAdd.sort
            }

            function success(res){
                _self.getSecondData()
                _self.button_loading = false                
                _self.is_open_add = false
                _self.secondAdd.typename = ""
                _self.secondAdd.typecode = ""
                _self.secondAdd.sort = "0"

            }

            function fail(res){

            }

            this.$Post(url, config, success, fail)
        },
        EditMethod(){
            let _self = this
            _self.button_loading = true                            
            let url = `api/system/updateTSType`
            let config = {
                id: _self.secondEdit.id,
                typename: _self.secondEdit.typename,
                typecode: _self.secondEdit.typecode,
                sort: _self.secondEdit.sort

            }

            function success(res){
                _self.getSecondData()
                _self.is_open_edit = false
                _self.button_loading = false                                
            }

            function fail(res){

            }

            this.$Post(url, config, success, fail)
        }
    },
    created () {
        let _self = this
        this.$bus.on('open_second_child',(e)=>{
            _self.second_child_page = 1
            _self.isOpenSecondDetail = true
            _self.child_id = e.ID
            _self.child_name = e.typename
            _self.getSecondData()
        })
    }
}
</script>

