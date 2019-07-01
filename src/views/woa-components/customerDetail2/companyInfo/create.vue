<template>
  <div>
    <Modal v-model="openCreateCompany" title="新增企业" :mask-closable="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="公司名称" prop="companyname">
          <Input v-model="formValidate.companyname" size="small"></Input>
        </FormItem>
        <FormItem label="公司注册地" prop="companyarea">
          <Cascader :data="companyarea" v-model="formValidate.companyarea"></Cascader>
        </FormItem>
        <FormItem label="法人" prop="legalrepresentative">
          <Input v-model="formValidate.legalrepresentative" size="small"></Input>
        </FormItem>
        <FormItem label="重要等级" prop="importlevel">
          <Select transfer v-model="formValidate.importlevel" size="small">
            <Option v-for="item in importance" :value="item.typecode" :key="item.typecode">{{ item.typename }}</Option>
          </Select>
        </FormItem>
        <FormItem label="产品特点" prop="productFeature">
          <Input v-model="formValidate.productFeature" size="small"></Input>
        </FormItem>
        <FormItem label="是否在服" prop="isSuits">
          <Select v-model="formValidate.ifSuit" size="small">
            <Option v-for="item in ifSuits" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" size="small"></Input>
        </FormItem>
        <FormItem label="网址" prop="website">
          <Input v-model="formValidate.website" size="small"></Input>
        </FormItem>
        <!-- <FormItem label="企业来源" prop="cluesource">
                    <Select transfer v-model="formValidate.cluesource" placement="top" size="small">
                        <Option v-for="item in cluesources" :value="item.typecode" :key="item.typecode">{{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="企业纳税类型" prop="taxtype">
                    <Select transfer v-model="formValidate.taxtype" size="small">
                        <Option v-for="item in taxtype" :value="item.typecode" :key="item.typecode">{{ item.typename }}
                        </Option>
                    </Select>
        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit" :loading="loading">新增</Button>
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
      openCreateCompany: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.check_data(this.create);
    },
    create() {
      let _self = this;
      let url = '/api/channel/company/createChannelTypeCompany';

      let config = {
        // cluesource: _self.formValidate.cluesource,
        companyarea: _self.formValidate.companyarea.join('-'),
        companyname: _self.formValidate.companyname,
        customerid: _self.formValidate.customerid,
        importlevel: _self.formValidate.importlevel.toString(),
        legalrepresentative: _self.formValidate.legalrepresentative,
        address: _self.formValidate.address,
        ifSuit: _self.formValidate.ifSuit,
        productFeature: _self.formValidate.productFeature,
        website: _self.formValidate.website
      };

      function success(res) {
        _self.$refs['formValidate'].resetFields();
        _self.loading = false;
        _self.$emit('update', _self.customer.ID);
        _self.openCreateCompany = false;
      }

      function fail(err) {
        _self.loading = false;
      }

      this.$Post(url, config, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.off('OPEN_COMPANY_CREATE', true);
    this.$bus.on('OPEN_COMPANY_CREATE', e => {
      _self.openCreateCompany = true;
    });
  }
};
</script>
