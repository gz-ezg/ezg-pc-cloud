<template>
    <div>
        <Modal
            v-model="openCreateTemplate"
            width="40%"
            title="创建简历"
        >
            <Form 
                ref="resumeTemplate"
                :model="resumeTemplate"
                :rules="create_rule"
                :label-width="120"
            >
                <FormItem label="姓名" prop="name">
                    <Input v-model="resumeTemplate.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="年龄" prop="age" >
                    <Input v-model="resumeTemplate.age" placeholder=""></Input>
                </FormItem>
                <FormItem prop="sex" label="性别">
                    <RadioGroup v-model="resumeTemplate.sex">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="岗位" prop="post">
                    <Input v-model="resumeTemplate.post" placeholder=""></Input>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input v-model="resumeTemplate.tel" placeholder=""></Input>
                </FormItem>
                <FormItem label="城市" prop="city">
                    <Input v-model="resumeTemplate.city" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="memo">
                    <Input v-model="resumeTemplate.memo" placeholder="" type="textarea"  :rows=5></Input>
                </FormItem>
                 <Row>
                <center v-if="isshow">
                    <Upload
                        ref="upload"
                        :before-upload="handleUpload"
                        action=""
                        >
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                    </Upload>
                    <div v-for="(item,index) in file" :key=index>{{ item.name }}
                        <Button type="text" @click="fileRemove(item)">移除</Button>
                    </div>
                </center>
            </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create_templ" :loading="loading">新增</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isshow:true,
            openCreateTemplate: false,
            loading: false,
            file:[],
            resumeTemplate: {
                name: "",
                age: "",
                sex: "",
                post: "",
                memo: "",
                tel: "",
                city: ""
            },
            create_rule:{
                name:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                post:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }]
            },
        }
    },
    methods:{
         cancel(){
            this.file = []
        },
        fileRemove(e) {
            this.file.splice(this.file.indexOf(e), 1);
        },
         handleUpload(file) {
            this.file.push(file)
            return false;
        },
        create_templ(){
            let _self = this
            _self.loading = true
            let url = `api/zuul/system/resource/resume/create`
            var formdata = new FormData()
            if(_self.file[0] == null){
                   _self.$Message.error("请选择文件")
                return;
            }
              
            formdata.append('name', _self.resumeTemplate.name);
            formdata.append('age',_self.resumeTemplate.age);
            formdata.append('sex',_self.resumeTemplate.sex);
            formdata.append('post', _self.resumeTemplate.post);
            formdata.append('city', _self.resumeTemplate.city);
            formdata.append('memo', _self.resumeTemplate.memo);
            formdata.append('tel', _self.resumeTemplate.tel);
            formdata.append('file',_self.file[0]);
         
            this.$http.post(url, formdata).then(function(res){
                // console.log(res)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.cancel()
                    _self.loading = false                    
                    _self.$emit('update',true)
                    _self.loading = false
                    _self.$refs['resumeTemplate'].resetFields()
                    _self.openCreateTemplate = false
                    _self.$emit("update",true)
                    _self.$bus.emit("UPDATE_RESUME_LIST",true)
                }else{
                    _self.$Message.error(res.data.msg)
                    _self.loading = false                    
                }

               
            }).catch(function(err){
                _self.$Message.error(err)
                 _self.loading = false                    
            })


        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_CREATE_RESUME_TEMPLATE",(e)=>{
            _self.openCreateTemplate = true
        })
    },
}
</script>

