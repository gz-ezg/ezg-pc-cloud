<template>
    <div>
        <Modal
            title="编辑"
            v-model="isEdit"
            width="400"
            :mask-closable="false"
        >
            <Form ref="row" :model="row" :rules="row_rule" :label-width="140" style="margin:auto">
                <Row :gutter="16">
                    <Col span="22">                                       
                        <FormItem prop="Type" label="文件类别：">
                            <Select transfer v-model="row.Type" placeholder="" size="small">
                                <Option v-for="(item,index) in selectType" :key=index :value="item.typecode" >{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>                    
                </Row>
                <Row :gutter="16">
                    <Col span="22">                   
                        <FormItem prop="fileName" label="文件名称：">
                            <Input type="text" v-model="row.fileName" size="small" >
                            </Input>
                        </FormItem>
                    </Col>                    
                </Row>
                <Row :gutter="16">
                    <Col span="22">
                        <FormItem prop="fileMemo" label="文件说明：">
                            <Input type="text" v-model="row.fileMemo"  size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="22">
                        <FormItem prop="sourceurl" label="视频地址：">
                            <Input type="text" v-model="row.sourceurl" size="small" >
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit_index">修改</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    data(){
        return{
            selectType:[],
            row:{
                fileName:"",
                fileMemo:"",
                id:"",
                Type:"",
                sourceurl:""
            },
            row_rule:{
                fileName:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                fileMemo:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                Type:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
            },
            key:"",
            isEdit:false
        }
    },
    methods: {
        submit_index(){
            let _self = this
            this.$refs['row'].validate((valid) => {
                if (valid) {
                    _self.submit()
                } else {
                    this.$Message.error('请填写必选项！');
                }
            })
        },
        submit(){
            // let url = ""
            // let config = ""
            let _self = this

            let url = "api/system/resource/updateSource"
            let config = {
                id: _self.row.id.toString(),
                sourcetype: _self.row.Type,
                filename: _self.row.fileName,
                sourcememo: _self.row.fileMemo,
                sourceurl: _self.row.sourceurl,
                classify: _self.key
            }
            this.$http.post(url,config).then(function(res){
                //   console.log(res)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.isEdit = false
                    _self.$emit('update',true)
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
            
        },
        close(){
            this.row.fileName = ""
            this.row.fileMemo = ""
            this.row.id = ""
            this.row.contractType = ""
            this.row.sourceurl = ""
            this.isEdit = false
        }  
        },
        created () {
            let _self = this
            Bus.$off('Open_material_house_edit')
            Bus.$on('Open_material_house_edit',(e)=>{
                console.log(e)
                _self.selectType = e[1]        
                _self.key = e[2]
                if(e[2]=="depart"){
                    _self.row.id = e[0].id
                    _self.row.fileName = e[0].filename
                    _self.row.fileMemo = e[0].sourcememo
                    _self.row.Type = e[0].sourcetype
                    _self.row.sourceurl = e[0].sourceurl
                }
                if(e[2]=="company"){
                    _self.row.id = e[0].id
                    _self.row.fileName = e[0].filename
                    _self.row.fileMemo = e[0].sourcememo
                    _self.row.Type = e[0].sourcetype
                    _self.row.sourceurl = e[0].sourceurl
                }
                // console.log(_self.row)
                _self.isEdit = true
            })
        }
    }
</script>
