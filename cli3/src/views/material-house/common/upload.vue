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
            <Row :gutter="16">
                <Col span="1" style="visibility:hidden">1</Col>
                <Col span="20">
                    <FormItem prop="isvideo" label="是否为视频资料：">
                        <RadioGroup v-model="upload.isvideo">
                            <Radio label="N">否</Radio>
                            <Radio label="Y">是</Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16" v-if="!isshow">
                <Col span="1" style="visibility:hidden">1</Col>
                <Col span="20">
                    <FormItem label="资料名称：">
                        <Input size="small" v-model="filename" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16" v-if="!isshow">
                <Col span="1" style="visibility:hidden">1</Col>
                <Col span="20">
                    <FormItem label="视频地址：">
                        <Input size="small" v-model="sourceurl" />
                    </FormItem>
                </Col>
            </Row>
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
            <Button type="primary" @click="uploadok" :loading="upload_loading">上传</Button>
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
                isvideo:"N",
            },
            sourceurl:"",
            filename:"",
            selectType:[],
            upload_rule:{
                fileMemo:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                resourceType:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }]
            },
            upload_loading:false,
            file:[]
        }
    },
    computed:{
        isshow(){
            if(this.upload.isvideo == "N"){
                return 1
            }else{
                return 0
            }
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
            let url = `api/zuul/system/resource/createSource`
            formdata.append('resourceType',_self.upload.resourceType)
            formdata.append('fileMemo',_self.upload.fileMemo)
            formdata.append('entityType',_self.entityType)
            formdata.append('isvideo', _self.upload.isvideo)
            if(_self.upload.isvideo == "N"){
                formdata.append('file',_self.file[0])
            }else{
                formdata.append('sourceurl',_self.sourceurl)
                formdata.append('filename',_self.filename)
            }

            this.$http.post(url, formdata).then(function(res){
                // console.log(res)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.cancel()
                    _self.upload_loading = false                    
                    _self.$emit('update',true)
                }else{
                    _self.$Message.error(res.data.msg)
                    _self.upload_loading = false                    
                }
            }).catch(function(err){
                _self.$Message.error(err)
                 _self.upload_loading = false                    
            })
        }
    },
    created () {
        let _self = this
        _self.$bus.off("upload_material_company")
        _self.$bus.on('upload_material_company',(e)=>{
            _self.entityType = e[1]
            _self.selectType = e[0]
            _self.upload_open = true
        })
    }
}
</script>
