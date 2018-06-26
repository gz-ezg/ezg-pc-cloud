<template>
  <div>
      <modal
            v-model="show"
            title="新增"
            width="70"
        >
            <Form :model="c_com" :label-width="120" ref="c_com">
                <Row>
                    <Col span="10">
                        <FormItem label="公司名称:" prop="CompanyName">
                            <Input v-model="c_com.CompanyName" placeholder=""></Input>
                        </FormItem> 
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户:" style="margin-right:10px" prop="NAME">
                            <Input v-model="c_com.NAME" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="2">
                        <Button type="primary">选择</Button>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="服务地址:">
                        <Input v-model="c_com.serviceaddress" placeholder=""></Input>
                    </FormItem>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="客户电话:">
                            <Input v-model="c_com.TEL" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业来源:" v-model="c_com.where">
                            <Select transfer>
                                <Option value="123">1212</Option>
                                <Option value="123133">3131</Option>
                                <Option value="1233">13131</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="企业状态:" v-model="c_com.zhuangtai">
                            <Select transfer>
                                <Option value="123">1212</Option>
                                <Option value="123133">3131</Option>
                                <Option value="1233">13131</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="重要等级:" v-model="c_com.importlevel">
                            <Select transfer>
                                <Option value="123">1212</Option>
                                <Option value="123133">3131</Option>
                                <Option value="1233">13131</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="年度纳税评级:" v-model="c_com.financelevel">
                            <Select transfer>
                                <Option value="123">1212</Option>
                                <Option value="123133">3131</Option>
                                <Option value="1233">13131</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="企业交易状态:">
                            <Select transfer>
                                <Option value="123">1212</Option>
                                <Option value="123133">3131</Option>
                                <Option value="1233">13131</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="机构代码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="信用机构代码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="开户许可证:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="基本户开户行:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="基本户开户行账号:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="一般开户行:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="企业纳税类型:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="国税号码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="地税号码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="国税密码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="地税密码:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="备注:">
                        <Input v-model="c_com.company" placeholder=""></Input>
                    </FormItem>
                    </Col>                   
                </Row>
                <Row>
                    <Col span="20">
                    <FormItem label="附件:">
                        <div>
                            <Upload
                            :before-upload="handleUpload"
                            action="//jsonplaceholder.typicode.com/posts/"
                            >
                            <Button type="primary" icon="ios-cloud-upload-outline">选择上传文件</Button>
                            </Upload>
                            <div v-if="file !== null">Upload file: {{ file.name }} <Button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
                        </div>   
                    </FormItem>
                    </Col>                   
                </Row>

            </Form>
        </modal>
  </div>
</template>

<script>
import Bus from '../bus'

export default {
    name:"edit_modal",
    created:function(){
        Bus.$on('edit',e =>{
                this.show = true
            })
        Bus.$on('current_data',this.save)
    },
  data(){
      return{
          show:false,
          c_com:{},
          file:{},
          loadingStatus:false
      }
  },
  methods:{
      save(e){
        this.c_com = e;
      },
      handleUpload(){},
      upload(){}
  }
}
</script>

