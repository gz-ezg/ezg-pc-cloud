<template>
    <Modal
        title="上传资料"
        v-model="upload_open"
        width="600"
        :mask-closable="false"
        
    >
        <Form ref="upload" :model="upload" :rules="upload_rule" :label-width="120">
            <Row :gutter="16">
                <Col span="1" style="visibility:hidden">1</Col>
                <Col span="20">
                    <FormItem prop="resourceType" label="资料类型：">
                        <Select transfer v-model="upload.resourceType" placeholder="" size="small">
                                <Option v-for="(item,index) in selectType" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="1" style="visibility:hidden">1</Col>
                <Col span="20">
                    <FormItem prop="fileMemo" label="资料说明：">
                            <Input size="small" v-model="upload.fileMemo" />
                        </FormItem>
                    </Col>
            </Row>
            <Row>
                <center>
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
            <Button type="primary" @click="submit" :loading="upload_loading">上传</Button>
            <Button type="ghost" @click="cancel" style="margin-left: 8px">取消</Button>
        </div>
    </Modal>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    data(){
        return{
            upload_open:false,
            upload:{
                fileMemo:"",
                resourceType:"",
                entityType:"",  
            },
            selectType:[],
            upload_rule:{
                fileMemo:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                resourceType:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }]
            },
            upload_loading:false,
            file:[]
        }
    },
    methods: {
        submit(){
            let _self = this
            this.$refs['upload'].validate((valid) => {
                if (valid && _self.file !="") {
                    _self.uploadok()
                } else {
                    this.$Message.error('请填写必选项！');
                }
            })
        },
        handleUpload(file) {
            this.file.push(file)
            return false;
        },
        fileRemove(e) {
            this.file.splice(this.file.indexOf(e), 1);
        },
        cancel(){
            this.file = []
            this.upload.fileMemo = ""
            this.upload.resourceType = ""
            this.upload.entityType = ""
            this.upload_open = false
            this.$refs['upload'].resetFields();
        },
        //  上传的方法
        uploadok(){
            let _self = this
            _self.upload_loading = true
            var formdata = new FormData()
            let url = `api/zuul/system/resource/upload`
            formdata.append('file',_self.file[0])
            formdata.append('resourceType',_self.upload.resourceType)
            formdata.append('fileMemo',_self.upload.fileMemo)
            formdata.append('entityType',_self.entityType)            

            this.$http.post(url, formdata).then(function(res){
                // console.log(res)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.cancel()
                    _self.upload_loading = false                    
                    _self.$emit('update',true)
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        }
    },
    created () {
        let _self = this
        Bus.$on('upload_material_house',(e)=>{
            _self.entityType = e[1]
            _self.selectType = e[0]
            _self.upload_open = true
        })
    }
}
</script>
