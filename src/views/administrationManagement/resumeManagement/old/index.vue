<template>
   <div>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="name" label="姓名：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.name" placeholder=""/>
                                       
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="tel" label="电话：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.tel" placeholder=""/>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="post" label="岗位：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.post" placeholder=""/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
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
        <ButtonGroup style="float:left">
            <Button type="primary" icon="information-circled" @click="create_template">新增</Button>
            <Button type="primary" icon="information-circled" @click="update_template">修改</Button>
            <Button type="primary" icon="information-circled" @click="del_template">删除</Button>
        </ButtonGroup>
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
    <create-template @update="get_data"></create-template>
    <update-template @update="get_data"></update-template>
  </div>
</template>

<script>
import createTemplate from './create'
import updateTemplate from './update'

import { DateFormat }from '../../../libs/utils.js'

export default {
    components:{
        createTemplate,
        updateTemplate
    },
    name: "resumelist_index",
    data(){
        return{
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
                name: "",
                // age: "",
                sex: "",
                // city: "",
                tel:"",
                createdate: [],
                post: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                
                {
                    title: "姓名",
                    key: "name",
                    minWidth: 100
                },
                {
                    title: "电话",
                    key: "tel",
                    minWidth: 150
                },
                {
                    title: "性别",
                    key: "sex",
                    minWidth: 50,
                    render: (h, params) => {
                        let sexname = ""
                        if(params.row.sex == 0){
                            sexname = "男"
                        }else{
                            sexname = "女"
                        }
                        return h('div',{},sexname)
                    }
                },
                {
                    title: "年龄",
                    key: "age",
                    minWidth: 80,
                },
                {
                    title: "城市",
                    key: "city",
                    minWidth: 80
                },
                {
                    title: "岗位",
                    key: "post",
                    minWidth:120
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    minWidth:120,
                    render: (h, params) => {
                        let temp = params.row.createdate
                        if(temp){
                            temp = temp.slice(0,10)
                        }
                        return h('div',{},temp)
                    }
                },
                {
                    title: "备注",
                    key: "memo",
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
                                            // console.log(params)
                                            let url = `api/system/resource/download?id=` + params.row.id
                                            window.open(url)
                                        }
                                    }
                                }, '下载')
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
         create_template(){
            this.$bus.emit("OPEN_CREATE_RESUME_TEMPLATE",true)
        },
        upload_file(params){

        },
        update_template(e){
          
             if(this.current_row != ""){
               this.$bus.emit("OPEN_EDIT_RESUME_TEMPLATE",this.current_row)
            }else{
                this.$Message.warning('请选择一行进行编辑！')
            }    
        },
        del_template(){
            if(this.current_row != ""){
                let _self = this
                _self.loading = true
                
                let url = `api/system/resource/resume/del`

                let config = {
                    id:this.current_row.id
                }
                
                function success(res){
                    _self.loading = false
                    _self.get_data();
                
                }

                function fail(err){
                    _self.loading = false
                }

                this.$Post(url, config, success, fail)
            }else{
                this.$Message.warning('请选择一行进行删除！')
            }
        },
        get_data(){
            let _self = this
            let url = "api/system/resource/resume/list"

            _self.loading = true

            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: "id",
                    post: this.seacrhFormInline.post,
                    name: this.seacrhFormInline.name,
                    // age: this.seacrhFormInline.age,
                    sex: this.seacrhFormInline.sex,
                    // city: this.seacrhFormInline.city,
                    tel:this.seacrhFormInline.tel,
                    bcreatedate: DateFormat(this.seacrhFormInline.createdate[0]),
                    ecreatedate: DateFormat(this.seacrhFormInline.createdate[1]) 
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
    } ,
    created(){
        this.get_data()
        let _self = this

        this.$bus.on("UPDATE_RESUME_LIST",(e) => {
            _self.get_data()
        })
    }
}
</script>
