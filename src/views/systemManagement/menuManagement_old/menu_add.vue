<template>
    <div>
        <Modal
        v-model="menu_deal"
        width="600"
        >
            <div slot="header"><h3>{{title}}</h3></div>
            <div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <FormItem label="菜单名称：" prop="interfaceName">
                        <Input v-model="formValidate.interfaceName" placeholder="菜单名称范围2~15位字符,且不为空" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="顺序：" prop="interfaceOrder">
                        <Input v-model="formValidate.interfaceOrder" placeholder="菜单名称范围2~15位字符,且不为空" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="接口层级" prop="interfaceLevel">
                        <Select transfer v-model="formValidate.interfaceLevel" placeholder="下级菜单" style="width:240px">
                            <Option value="1">一级菜单</Option>
                            <Option value="2">下级菜单</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="菜单编码：" prop="interfaceCode">
                        <Input v-model="formValidate.interfaceCode" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="父接口ID：" prop="parentInterfaceId">
                        <Input v-model="formValidate.parentInterfaceId" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <FormItem label="菜单地址：" prop="interfaceUrl">
                        <Input v-model="formValidate.interfaceUrl" placeholder="" style="width:400px"></Input>
                    </FormItem>
                    <FormItem label="菜单编码：" prop="interfaceCode">
                        <Input v-model="formValidate.interfaceCode" placeholder="" style="width:240px"></Input>
                    </FormItem>
                    <!-- <FormItem label="接口方法：" prop="interfaceMethod">
                        <Input v-model="formValidate.interfaceMethod" placeholder="" style="width:240px"></Input>
                    </FormItem> -->
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 20px">取消</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>


<script>
import Bus from '../../../components/bus'

export default {
        data () {
            return {
                add_or_edit:0,//新增或者编辑判断，0为新增，1为编辑
                select_row:'',//当前选中的一行
                title:'',
                menu_deal:false,
                formValidate: {
                    interfaceName: '',
                    interfaceLevel: '',
                    parentInterfaceId: '',
                    interfaceUrl: '',
                    interfaceCode: '',
                    interfaceMethod:'GET'
                },
                ruleValidate: {
                    interfaceName: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    interfaceLevel: [
                        { required: true, message: '请输入接口层级', trigger: 'change' }
                    ],
                    parentInterfaceId: [
                        // { required: true, message: '请输入父接口ID', trigger: 'blur' }
                    ],
                    interfaceUrl: [
                        // { required: true, message: '请输入菜单地址', trigger: 'blur' }
                    ],
                    interfaceCode: [
                        { required: true, message: '接口方法', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                var _self = this
                var url ='api/menu/createMenu'
                            _self.$http.post(url,_self.formValidate).then(function(res){
                                console.log(res)
                                _self.init()
                                this.$Message.success('Success!');
                            })
                
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         if(add_or_edit == 0){
                            
                //         }else{
                //             //  编辑
                //         }
                //     } else {
                //         this.$Message.error('Fail!');
                //     }
                // })
                
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.menu_deal = false
            },
            init(){
                var _self = this
                Bus.$on('add_menu',(e)=>{
                    _self.title = '新增菜单'
                    _self.menu_deal = true
                    _self.add_or_edit = 0
                    console.log(e)
                    if(e!=''){
                        console.log(e)
                        _self.formValidate.parentInterfaceId = e.id
                    }
                })
                Bus.$on('edit_menu',(e)=>{
                    _self.title = '编辑菜单'
                    _self.menu_deal = true
                    _self.add_or_edit = 1
                    _self.select_row = e
                    console.log(_self.select_row)        
                })
            }
        },
        created(){
            this.init()
        }
}
</script>
