<template>
    <div>
        <Modal
            :title="title"
            v-model="isVideo"
            width="400"
            :mask-closable="false"            
        >
            <Form ref="row" :model="row" :rules="row_rule" :label-width="140" style="margin:auto">
                <Row :gutter="16">
                    <Col span="22">                                       
                        <FormItem prop="videoType" label="视频类别：">
                            <Select transfer v-model="row.videoType" placeholder="" :disabled="showflag">
                                <Option v-for="(item,index) in videoType" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>                    
                </Row>
                <Row :gutter="16">
                    <Col span="22">                   
                        <FormItem prop="videoName" label="视频名称：">
                            <Input type="text" v-model="row.videoName"  :disabled="showflag">
                            </Input>
                        </FormItem>
                    </Col>                    
                </Row>
                <Row :gutter="16">
                    <Col span="22">
                        <FormItem prop="videoMemo" label="视频说明：">
                            <Input type="text" v-model="row.videoMemo" :disabled="showflag">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="22">
                        <FormItem prop="videoUrl" label="视频地址：">
                            <Input type="text" v-model="row.videoUrl" :disabled="showflag">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit_index" v-if="editFlag">修改</Button>
                <Button type="primary" @click="submit_index" v-if="addFlag">录入</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    props:['videoType'],
    data(){
        return{
            showflag:false,
            isVideo:false,
            addFlag:false,
            editFlag:false,
            title:"",
            isEdit:false,
            row:{
                videoType:"",
                videoName:"",
                videoMemo:"",
                videoUrl:"",
                id:""
            },
            row_rule:{
                videoType:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                videoName:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                videoMemo:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                videoUrl:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                
            }
        }
    },
    methods: {
        submit_index(){
            let _self = this
            this.$refs['row'].validate((valid) => {
                if (valid) {
                    if(_self.title == "录入"){
                        _self.add()
                    }else{
                        _self.submit()
                    }
                } else {
                    this.$Message.error('请填写必选项！');
                }
            })
        },
      submit(){
            let _self = this
            let url = `api/system/resource/video/manager/update`
            let config = {
                id: _self.row.id,
                videourl: _self.row.videoUrl,
                videomemo: _self.row.videoMemo,
                videoname: _self.row.videoName,
                videotype: _self.row.videoType
            }   
          this.$http.post(url,config).then(function(res){
            //   console.log(res)
              if(res.data.msgCode == "40000"){
                  _self.$Message.success(res.data.msg)
                  _self.isVideo = false
                  _self.$emit('update',true)
                  _self.close()
                  
              }else{
                  _self.$Message.error(res.data.msg)
              }
          })
      },
      add(){
          let _self = this
            let url = `api/system/resource/video/manager/create`
            let config = {
                videourl: _self.row.videoUrl,
                videomemo: _self.row.videoMemo,
                videoname: _self.row.videoName,
                videotype: _self.row.videoType
            }   
          this.$http.post(url,config).then(function(res){
            //   console.log(res)
            _self.$backToLogin(res)            
              if(res.data.msgCode == "40000"){
                  _self.$Message.success(res.data.msg)
                  _self.isVideo = false
                  _self.$emit('update',true)
                  _self.close()
              }else{
                  _self.$Message.error(res.data.msg)
              }
          })
      },
      close(){
          if(this.title == "录入"){
                this.row.videoType = ""
                this.row.videoName = ""
                this.row.videoMemo = ""
                this.row.videoUrl = ""
          }
          this.isVideo = false 
      }  
    },
    created () {
        let _self = this
        Bus.$on('edit_video_material_house',(e)=>{
            _self.addFlag = false
            _self.editFlag = false
            _self.showflag = false
            _self.title = e[1]
            _self.isVideo = true
            if(e[0] != ""){
                _self.row.videoType =e[0].videoType
                _self.row.videoName = e[0].videoName
                _self.row.videoMemo = e[0].videoMemo
                _self.row.videoUrl = e[0].videoUrl
                _self.row.id = e[0].id
            }
            if(_self.title == "录入"){
                _self.addFlag = true
                _self.row.videoType = ""
                _self.row.videoName = ""
                _self.row.videoMemo = ""
                _self.row.videoUrl = ""
                _self.$refs['row'].resetFields()
            }else if(_self.title == "编辑"){
                _self.editFlag = true
            }else{
                _self.showflag = true
            }
        })
    }
}
</script>
