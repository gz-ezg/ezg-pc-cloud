<template>
    <Modal
        v-model="connect_show"
        title="添加映射"
        width="600"
        :mask-closable="false"
    >
        <Form 
            :model="connect_item"
            :label-width="120"
            :rules="connect_rule"
            ref="connect_item"
        >
            <FormItem label="SQL主体" prop="sqlMain">
                <Input v-model="connect_item.sqlMain" placeholder="" type="textarea" ></Input>
            </FormItem>
            <FormItem label="角色ID" prop="roleId" >
                <CheckboxGroup v-model="connect_item.roleId">
                    <span v-for="(item,index) in role" :key=index>
                        <Checkbox  :label=item.id>
                            <span>{{item.value}}</span>
                        </Checkbox>
                    </span>         
                </CheckboxGroup>
            </FormItem>
            <FormItem label="SQL模板ID" prop="sqlTemplateId">
                <Input v-model="connect_item.sqlTemplateId" placeholder="" readonly></Input>
            </FormItem>
            <FormItem label="角色权限名称" prop="sqlTemplateRoleName">
                <Input v-model="connect_item.sqlTemplateRoleName" placeholder=""></Input>
            </FormItem>
            <FormItem label="优先级" prop="sort">
                <Input v-model="connect_item.sort" placeholder="" input="text"></Input>
            </FormItem>
            <FormItem label="一致匹配性" prop="roleIdMustAll">
                <Select transfer v-model="connect_item.roleIdMustAll" placeholder="">
                    <Option value="Y">and</Option>
                    <Option value="N">or</Option>                    
                </Select>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="conncet_sql" :loading="connect_loading">添加</Button>
        </div>
    </Modal>
</template>

<script>
// import Bus from '../bus'

export default {
    data(){
        const sort_check = (rule, value, callback) =>{
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
            connect_loading:false,
            current_id:'',
            connect_show:false,
            connect_item:{
                sqlMain:'',
                roleId:[],
                sqlTemplateId:'',
                sqlTemplateRoleName:'',
                sort:'',
                roleIdMustAll:''
            },
            role:[],
            connect_rule:{
                // sqlMain:[
                //     { required: true, message: '必要', trigger: 'blur'},
                // ],
                roleId:[
                    { required: true, message: '必要', trigger: 'blur'},
                ],
                // sqlTemplateId:[
                //     { required: true, message: '必要', trigger: 'blur'},
                // ],
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
        init(){
            var _that = this
            _that.$bus.on('connect_sql_user',(e)=>{
                _that.connect_show = true
                _that.connect_item.sqlTemplateId = e.id
            })
            //  获取角色信息
            var url = 'api/user/role/list?page=1&pageSize=100'
            
            let config = {
                page: 1,
                pageSize: 100
            }

            function success(res){
                for(let i = 0; i<res.data.data.total;i++){
                    var temp = {}
                    temp.id = res.data.data.rows[i].ID
                    temp.value = res.data.data.rows[i].rolename
                    _that.role.push(temp)
                }
            }

            this.$Get(url, config, success)


        },
        conncet_sql(){
            var _that = this
            var url = 'api/system/createSqlTemplateRole'

            let config = {
                sqlMain: _that.connect_item.sqlMain,
                roleId: _that.connect_item.roleId.join(","),
                sqlTemplateId: _that.connect_item.sqlTemplateId,
                sqlTemplateRoleName: _that.connect_item.sqlTemplateRoleName,
                sort: _that.connect_item.sort,
                roleIdMustAll: _that.connect_item.roleIdMustAll,
            }


            function success(res){
                _that.connect_loading = false
                _that.connect_show = false
                // _that.$Message.success('新增成功')
                _that.connect_item.sqlMain = '',
                _that.connect_item.roleId = [],
                _that.connect_item.sqlTemplateId = '',
                _that.connect_item.sqlTemplateRoleName = '',
                _that.connect_item.sort = ''
                _that.connect_item.roleIdMustAll = ''
            }

            function fail(err){
                _that.connect_loading = false
            }

            this.$Post(url, config, success, fail)
             
            
        },
        cancel(){
            this.connect_show = false
            this.$refs['connect_item'].resetFields();
        }
    }
}
</script>
