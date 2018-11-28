<template>
  <div>
    <Form :label-width="120">
      <Row>
        <Col span="12">
          <FormItem prop="user" label="公司名称:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="企业来源:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem prop="user" label="服务地址:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="归属客户:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="客户电话:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem prop="user" label="企业纳税类型:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="年度纳税评级:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="企业交易状态:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="开户许可证:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="基本开户行:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="基本户开户行账号:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="一般开户行:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="国税号码:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="地税号码:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem prop="user" label="国税密码:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem prop="user" label="地税密码:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row
      <Row>
        <Col span="24">
          <FormItem prop="user" label="附件:">
            <Input type="text"  placeholder="Username" disabled>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import Bus from '../bus'
export default {
  data(){
    return{
      id:'',
      basic_data:[]
    }
  },
  props:['id'],
  created:function() {
    Bus.$on('current_data',this.init)
  },
  methods:{
    init(e){
      this.id = e.cpid
      var _that = this
      var url_basic = "api/company/findCompanyById/" + this.id +"/basic"
      this.$http.get(url_basic).then(function(res){
      }).catch(function(err){
      })
      // 33021写死
    }
  }
}
</script>

