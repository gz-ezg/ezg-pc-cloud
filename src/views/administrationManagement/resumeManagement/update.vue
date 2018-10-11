<template>
    <div>
        <Modal
            v-model="openUpdateTemplate"
            width="50%"
            title="修改简历"
        >
            <Form 
                ref="resumeTemplate"
                :model="resumeTemplate"
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
                    <Input v-model="resumeTemplate.memo" placeholder="" type="textarea" :rows=5></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="update_templ" :loading="loading">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openUpdateTemplate: false,
            loading: false,
            resumeTemplate: {
                id: "",
                name: "",
                age: "",
                sex: "",
                post: "",
                memo: "",
                tel: "",
                city: ""
            }
        }
    },
    methods:{
        update_templ(){
            let _self = this
            _self.loading = true
            let url = `api/system/resource/resume/update`

            let config = {
                name: _self.resumeTemplate.name,
                age: _self.resumeTemplate.age,
                sex: _self.resumeTemplate.sex,
                post: _self.resumeTemplate.post,
                memo: _self.resumeTemplate.memo,
                tel: _self.resumeTemplate.tel,
                city:_self.resumeTemplate.city,
                id:_self.resumeTemplate.id
            }
            
            function success(res){
                _self.loading = false
                _self.$refs['resumeTemplate'].resetFields()
                _self.openUpdateTemplate = false
                _self.$bus.emit("UPDATE_RESUME_LIST",true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_EDIT_RESUME_TEMPLATE",(e)=>{
            // console.log(e)
            _self.resumeTemplate.id = e.id;
            _self.resumeTemplate.name = e.name;
            _self.resumeTemplate.age = e.age;
            _self.resumeTemplate.sex = e.sex.toString();
            _self.resumeTemplate.post = e.post;
            _self.resumeTemplate.memo = e.memo;
            _self.resumeTemplate.tel = e.tel;
            _self.resumeTemplate.city = e.city;
            _self.openUpdateTemplate = true
        })
    },
}
</script>

