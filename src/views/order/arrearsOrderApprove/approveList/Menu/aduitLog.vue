<template>
  <div>
    <Modal :value="true" title="查看审批备注" width="70%" @on-cancel="onClose">
      <Table border :loading="loading" :columns="header" :data="data" size="small"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { auditListByApplyId } from '../../../../../api/order';
export default {
  props: { id: String },
  data() {
    return {
      loading: false,
      header: [
        {
          title: '审批情况',
          key: 'audit_status',
          render(
            h,
            {
              row: { audit_status }
            }
          ) {
            return h('div', audit_status == 'Agree' ? '同意' : '驳回');
          },
          minWidth: 100
        },
        {
          title: '审批备注',
          key: 'audit_memo',
          minWidth: 200
        },
        {
          title: '审批时间',
          key: 'audit_date',
          minWidth: 150
        },
        {
          title: '创建人',
          key: 'realname',
          minWidth: 120
        }
      ],
      data: []
    };
  },
  methods: {
    onClose() {
      this.$emit('cancel');
    }
  },
  async created() {
    this.data = await auditListByApplyId({ applyId: this.id });
    console.log(this.data);
  }
};
</script>

<style>
#top .ivu-modal-mask {
  z-index: 9998;
}
#top .ivu-modal-wrap {
  z-index: 9999;
}
</style>


