<template>
    <div>
        <Modal
            title="简历编辑"
            :value="true"
            width="800"
            @on-cancel="close"
        >
            <!-- <Row :gutter="20">
                <Col span="24"> -->
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                        <FormItem label="姓名：" prop="name">
                            <Input v-model="formValidate.name" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="电话：" prop="tel">
                            <Input v-model="formValidate.tel" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="邮箱：" prop="email">
                            <Input v-model="formValidate.email" placeholder=""></Input>
                        </FormItem>
                        <FormItem label="性别：" prop="sex">
                            <Select transfer v-model="formValidate.sex">
                                <Option v-for="(item, index) in sextype" :value="item.typecode" :key="index">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="年龄：" prop="age">
                            <Input v-model="formValidate.age" placeholder="" ></Input>
                        </FormItem>
                        <FormItem label="城市：" prop="city">
                            <Select transfer v-model="formValidate.city" >
                                <Option v-for="(item, index) in applyArea" :value="item.typecode" :key="index">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="岗位：" prop="post">
                            <Select transfer v-model="formValidate.post" >
                                <Option v-for="(item, index) in applyPosition" :value="item.typecode" :key="index">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="备注" prop="memo">
                            <Input v-model="formValidate.memo" placeholder="" type="textarea"  :rows=5></Input>
                        </FormItem>
                    </Form>
                <!-- </Col>
            </Row> -->
            <div slot="footer">
                <Button type="primary" @click="update" :loading="loading">编辑</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { resumeUpdate } from './resume.js'
export default {
    props: {
        applyPosition: {
            type: [String, Array]
        },
        applyArea: {
            type: [String, Array]
        },
        sextype: {
            type: [String, Array]
        },
        detail: {
            type: [String, Object]
        }
    },
    data(){
        return {
            formValidate: {
                sex: 0,
                city: "gz"
            },
            ruleValidate: {
                // name:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                // post:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                // sex:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                // tel:[{ required: true, message: '必选项！', trigger: 'change', type:'number' }]
            },
            loading: false,
            file: []
        }
    },
    methods: {
        fileRemove(e) {
            this.file.splice(this.file.indexOf(e), 1);
        },
        handleUpload(file) {
            this.file.push(file)
            return false;
        },
        update(){
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    this.submit()
                }
            })
        },
        async submit(){
            this.loading = true
            let formdata = new FormData()
            // for(let x in this.formValidate){
            //     formdata.append(x, this.formValidate[x])
            // }
            // if(this.file[0] == null){
            //     this.$Message.error("请选择文件")
            //     this.loading = false
            //     return;
            // }
            // formdata.append('file',this.file[0]);
            let {status, data} = await resumeUpdate(this.formValidate)
            this.loading = false
            if(status){
                this.close(true)
            }
            
        },
        close(e){
            this.$emit("close", e)
        },
    },
    created(){
        console.log(this.sextype)
        console.log(this.detail.sex)
        this.formValidate = this.detail
        this.formValidate.sex = this.detail.sex.toString()
    }
}
</script>
