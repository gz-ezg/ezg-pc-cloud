<template>
  <div>
      <Modal
            v-model="show"
            title="新增"
            width="70"
            >
            <Form :model="c_com" :rules="c_comInline" :label-width="120" ref="c_com">
                <Row>
                    <Col span="10">
                        <FormItem label="公司名称:" prop="company">
                            <Input v-model="c_com.company" placeholder=""></Input>
                        </FormItem> 
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户:" style="margin-right:10px" prop="attr">
                            <Input v-model="c_com.attr" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="2">
                        <Button type="primary">选择</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="20">
                        <FormItem label="服务地址:">
                            <Input v-model="c_com.address" placeholder=""></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="客户电话:">
                            <Input v-model="c_com.tel" placeholder=""></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="企业来源:">
                            <Select transfer v-model="c_com.where">
                                <!--    使用何种方式渲染这个选择队列呢  -->
                                <Option value="person">个人拓展</Option>
                                <Option value="market">市场活动</Option>
                                <Option value="leader">领导推荐</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="企业状态:">
                            <Select transfer v-model="c_com.zhuangtai"> 
                                <Option value="123">无意向</Option>
                                <Option value="123133">有意向</Option>
                                <Option value="1233">减款</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="重要等级:">
                            <Select transfer v-model="c_com.importLevelText">
                                <Option value="highest">最高</Option>
                                <Option value="higher">较高</Option>
                                <Option value="normal">一般</Option>
                                <Option value="less">普通</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="年度纳税评级:">
                            <Select transfer v-model="c_com.jibie">
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="企业交易状态:">
                            <Select transfer v-model="c_com.charge">
                                <Option value="normal">正常</Option>
                                <Option value="charge">可交易</Option>
                                <Option value="post">已预购</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="机构代码:">
                        <Input v-model="c_com.jigoudaima" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="信用机构代码:">
                        <Input v-model="c_com.xinyongdaima" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="0">
                    <FormItem label="开户许可证:">
                        <Input v-model="c_com.xukezheng" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="基本户开户行:">
                        <Input v-model="c_com.basic_bank" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="基本户开户行账号:">
                        <Input v-model="c_com.basic_account" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="一般开户行:">
                        <Input v-model="c_com.normal_bank" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="企业纳税类型:">
                        <Input v-model="c_com.tax" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="国税号码:">
                        <Input v-model="c_com.guo_tax" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="地税号码:">
                        <Input v-model="c_com.di_tax" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem label="国税密码:">
                        <Input v-model="c_com.g_tax_sercet" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="10">
                    <FormItem label="地税密码:">
                        <Input v-model="c_com.d_tax_sercet" placeholder=""></Input>
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
        </Modal>
  </div>
</template>

<script>
import Bus from '../bus'

export default {
  data(){
      return{
          show:false,
          file:null,
          loadingStatus: false,
          c_com:{
              company:'',
              attr:'',

          },
          c_comInline:{
              company:[
                  { required: true, message: '请输入公司名称', trigger: 'blur' }
              ],
              attr:[
                  { required: true, message: '请输入公司名称', trigger: 'blur' }
              ]

          }
      }
  },
  created:function(){
       Bus.$on('create',e =>{
                this.show = true
            })
  },
    method:{
        ok(){},
        cancel(){},
        handleUpload (file) {
                this.file = file;
                return false;
            },
        upload () {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('Success')
            }, 1500);
        }
    }
}
</script>


<!-- 还需要完成的工作
    1.异步生成的data，无法被准确加载到table组件当中
    2.Modal的数据校验
-->
