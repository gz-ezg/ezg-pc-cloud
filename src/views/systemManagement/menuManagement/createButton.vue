<template>
  <div>
    <Modal v-model="openCreateButton" width="600">
      <div slot="header"><h3>创建按钮</h3></div>
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <FormItem label="按钮名称：" prop="operationname">
            <Input v-model="formValidate.operationname" placeholder="菜单名称范围2~15位字符,且不为空" style="width:240px"></Input>
          </FormItem>
          <FormItem label="按钮编码" prop="operationcode">
            <Input v-model="formValidate.operationcode" placeholder="" style="width:240px"></Input>
          </FormItem>
          <FormItem label="菜单编码：" prop="interfaceId">
            <Input v-model="formValidate.interfaceId" placeholder="" style="width:240px"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit" :loading="loading">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 20px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { createButton } from '@A/systemManage';
export default {
  name: 'menuManagement_create',
  data() {
    return {
      formValidate: {
        operationname: '',
        operationcode: '',
        interfaceId: ''
      },
      openCreateButton: false,
      ruleValidate: {
        operationname: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
        operationcode: [{ required: true, message: '请输入菜单层级', trigger: 'change' }],
        interfaceId: [{ required: true, message: '请输入菜单编码', trigger: 'change' }]
      },
      loading: false
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    submit() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          this.createButton();
        } else {
          this.$Message.error('请补全信息！');
        }
      });
    },
    async createButton() {
      try {
        await createButton({
          operationname: this.formValidate.operationname,
          operationcode: this.formValidate.operationcode,
          interfaceId: this.formValidate.interfaceId
        });
      } catch (error) {
      } finally {
        this.loading = false;
        this.openCreateButton = false;
        this.$bus.emit('UPDATE_BUTTON', true);
      }
    }
  },
  created() {},
  $Bus: {
    OPEN_CREATE_BUTTON(e) {
      this.formValidate.interfaceId = e;
      this.openCreateButton = true;
    }
  }
};
</script>
