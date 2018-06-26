<template>
    <div>
    <Modal
        v-model="connect_detail_show"
        title="添加映射"
        width="810"
        :loading = "connect_detail_loading"
        @on-ok = "conncet_detail_sql"
        @on-cancel = "cancel"
        ok-text = "确定"
        :mask-closable="false"
    >
        <Form 
            :model="connect_detail_item"
            :label-width="60"
            :rules="connect_detail_rule"
        >
            <div style="background:#eee;padding: 20px">
                <Card :bordered="false">
                    <Table 
                        highlight-row 
                        :data="tableShowData" 
                        :columns="header"	 
                        >
                    </Table>
                </Card>
                <Card :bordered="false">
                    <p slot="title">已选角色</p>
                    <span>{{connect_detail_item.roleId}}</span>
                </Card>
                <!-- <Card :bordered="false">
                    <FormItem label="角色ID" prop="roleId" >
                        <CheckboxGroup v-model="connect_detail_item.roleId" >
                            <span v-for="(item,index) in role" :key=index>
                                <Checkbox  :label=item.id disabled>
                                    <span>{{item.value}}</span>
                                </Checkbox>
                            </span>         
                        </CheckboxGroup>
                    </FormItem>
                </Card> -->
            </div>            
        </Form>
    </Modal>
    <Modal
        v-model="edit"
        title="编辑"
        width="810"
        @on-ok="edit_connect"
        @on-cancel="cancel_edit"
        ok-text="提交"
        :mask-closable="false"        
    >
        <Form 
            :model="SQL_item"
            :label-width="120"
        >
            <FormItem label="SQL主体" prop="sql_main">
                <Input v-model="SQL_item.sql_main" placeholder="" type="textarea" row="5"></Input>
            </FormItem>
            <FormItem label="SQL排序" prop="sort">
                <Input v-model="SQL_item.sort" placeholder=""></Input>
            </FormItem>
            <FormItem label="SQL模板名称" prop="sql_template_role_name">
                <Input v-model="SQL_item.sql_template_role_name" placeholder=""></Input>
            </FormItem>
            <FormItem label="包含角色权限" prop="role_id_must_all">
                <Select transfer v-model="SQL_item.role_id_must_all" placeholder="">
                    <Option value="Y">包含</Option>
                    <Option value="N">不包含</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal>
    </div>
</template>

<script>
import Bus from '../bus'

export default {
    data(){
        const sort_check = (rule, value, callback) => {
            if (value === '') {
                    callback(new Error('必要'));
                } else {
                    if (isNaN(parseInt(this.connect_item.sort))) {
                        callback(new Error('请输入数字'))
                    }
                    callback();
                }
        }
        return{
            SQL_item:{},
            edit:false,
            tableShowData:[],
            header:[
                {
                    title:'序号',
                    type:'index',
                    align:'center',
                    width:60,
                    fixed:'left'
                },
                // {
                //     title:'sql_main',
                //     key:'sql_main',
                //     width:190
                // },
                {
                    title:'role_id',
                    key:'role_id',
                    width:100
                },
                {
                    title:'sql_template_role_name',
                    key:'sql_template_role_name',
                    width:200
                },
                {
                    title:'role_id_must_all',
                    key:'role_id_must_all',
                    width:150
                },
                {
                    title:'编辑',
                    width:150,
                    render:(h, params) =>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style:{
                                    marginRight: '5px'
                                },
                                on: {
                                    click:()=>{
                                        this.edit_connect_show(params)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                },
                {
                    title:'删除',
                    width:150,
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type: 'text',
                                    size: 'small'
                                },
                                style:{
                                    marginRight: '5px'
                                },
                                on:{
                                    click:()=>{
                                        this.delete(params.row.id)
                                    }
                                }
                            },'删除')
                        ])
                    }
                }
            ],
            connect_detail_loading:false,
            current_detail_id:'',
            connect_detail_show:false,
            connect_detail_item:{
                id:'',
                sqlMain:'',
                roleId:[],
                sqlTemplateId:'',
                sqlTemplateRoleName:'',
                sort:'',
                roleIdMustAll:''
            },
            role:[],
            connect_detail_rule:{
                sqlMain:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                roleId:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sqlTemplateId:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sqlTemplateRoleName:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                sort:[
                    { required: true, trigger: 'blur',validator:sort_check}
                ],
                roleIdMustAll:[
                    { required: true, message: '必要', trigger: 'blur'}
                ]
            }
        }
    },
    created:function(){
        this.init()
    },
    methods:{
        cancel_edit(){},
        init(){
            var _that = this
            _that.role = []
            Bus.$on('connect_detail_sql_user',(e)=>{
                _that.connect_detail_show = true
                _that.connect_detail_item.sqlMain = e.sql_main
                _that.connect_detail_item.id = e.id
                _that.load_role_list()
            })
            //  获取角色信息
            var url = 'api/user/role/list?page=1&pageSize=100'
            this.$http.get(url).then(function(res){
                _that.$backToLogin(res)
                
                for(let i = 0; i<res.data.data.total;i++){
                    var temp = {}
                    temp.id = res.data.data.rows[i].ID
                    temp.value = res.data.data.rows[i].rolename
                    _that.role.push(temp)
                }
                Object.freeze(_that.role)
            })
        },
        //  查询角色列表
        load_role_list(){
            var _that = this
            var url = "api/system/sqlTemplateRoleByTemplateId?sqlTemplateId=" + _that.connect_detail_item.id
            this.$http.get(url).then(function(res){
                if(res.data.msgCode =="40000"){
                    _that.tableShowData = res.data.data
                    _that.connect_detail_item.roleId = []
                    for(let i = 0;i<res.data.data.length;i++){
                        _that.connect_detail_item.roleId.push(parseInt(res.data.data[i].role_id))
                    }
                }else{
                    _that.$Message.error('查询失败')
                }
            }).catch(function(err){
                _that.$Message.error('查询失败')
            })
        },
        cancel(){
            this.connect_detail_show = false
        },
        conncet_detail_sql(){
            
        },
        edit_connect_show(e){
            console.log(e)
            this.SQL_item = e.row
            this.edit = true
        },
        cancel2(){
            this.edit = false
        },
        edit_connect(){
            let _self = this
            let url = 'api/system/updateSqlTemplateRole'
            let config = {
                id:_self.SQL_item.id,
                sqlMain:_self.SQL_item.sql_main,
                sort:_self.SQL_item.sort,
                sqlTemplateRoleName:_self.SQL_item.sql_template_role_name,
                roleIdMustAll:_self.SQL_item.role_id_must_all
            }
            this.$http.post(url,config).then(function(res){
                console.log(res)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        delete(e){
            let url = 'api/system/delSqlTemplateRole'
            let config = {
                id:e
            }
            this.$http.post(url,config).then(function(res){
                console.log(res)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        }
    }
}
</script>
