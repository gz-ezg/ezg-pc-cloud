<template>
  <div>
    <Modal v-model="openUpdateCompany" title="新增企业" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="公司名称" prop="companyname">
          <Input v-model="formValidate.companyname" size="small"></Input>
        </FormItem>
        <FormItem label="公司注册地">
          <Cascader :data="companyarea" v-model="formValidate.companyarea_temp"></Cascader>
        </FormItem>
        <FormItem label="跟进销售" prop="followby">
          <Input v-model="formValidate.followby" readonly size="small"></Input>
        </FormItem>
        <FormItem label="法人" prop="legalrepresentative">
          <Input v-model="formValidate.legalrepresentative" size="small"></Input>
        </FormItem>
        <FormItem label="电话" prop="tel">
          <Input v-model="formValidate.tel" size="small"></Input>
        </FormItem>
        <FormItem label="重要等级" prop="importlevel">
          <Select transfer v-model="formValidate.importlevel" size="small">
            <Option v-for="item in importance" :value="item.typecode" :key="item.typecode">{{ item.typename }} </Option>
          </Select>
        </FormItem>
        <FormItem label="创建人" prop="createby">
          <Input v-model="formValidate.createby" readonly size="small"></Input>
        </FormItem>
        <FormItem label="企业来源" prop="cluesource">
          <Select transfer v-model="formValidate.cluesource" placement="top" size="small">
            <Option v-for="item in cluesources" :value="item.typecode" :key="item.typecode">{{ item.typename }} </Option>
          </Select>
        </FormItem>
        <FormItem label="企业纳税类型" prop="taxtype">
          <Select transfer v-model="formValidate.taxtype" size="small">
            <Option v-for="item in taxtype" :value="item.typecode" :key="item.typecode">{{ item.typename }} </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit" :loading="loading">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import relationCommon from './common';
export default {
  mixins: [relationCommon],
  data() {
    return {
      openUpdateCompany: false
      // companyarea_temp: []
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.check_data(this.create);
    },
    create() {
      let _self = this;
      let url = 'api/customer/updateCompany';

      let config = {
        // 编辑待定
        companyname: _self.formValidate.companyname,
        companyarea: _self.formValidate.companyarea_temp.join('-'),
        legalrepresentative: _self.formValidate.legalrepresentative,
        tel: _self.formValidate.tel,
        importlevel: _self.formValidate.importlevel.toString(),
        accountgrade: _self.formValidate.accountgrade,
        cluesource: _self.formValidate.cluesource,
        id: _self.formValidate.id
      };

      function success(res) {
        _self.$refs['formValidate'].resetFields();
        _self.loading = false;
        _self.$emit('update', _self.customer.ID);
        _self.openUpdateCompany = false;
      }

      function fail(err) {
        _self.loading = false;
      }

      this.$Post(url, config, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.off('OPEN_COMPANY_UPDATE', true);
    this.$bus.on('OPEN_COMPANY_UPDATE', e => {
      _self.formValidate = e;
      if (_self.formValidate.companyarea !== null) {
        console.log(_self.formValidate.companyarea);
        _self.formValidate.companyarea_temp = _self.formValidate.companyarea.split('-');
        _self.formValidate.companyarea_temp[0] = parseInt(_self.formValidate.companyarea_temp[0]);
        _self.formValidate.companyarea_temp[1] = parseInt(_self.formValidate.companyarea_temp[1]);
        console.log(_self.formValidate.companyarea);
      } else {
        _self.formValidate.companyarea = null;
      }
      _self.openUpdateCompany = true;
    });
  }
};
</script>
