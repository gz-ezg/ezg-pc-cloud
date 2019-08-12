<template>
  <div>
    <Modal id="top" ref="log" :value="true" title="查看审批备注" width="70%" @on-cancel="cancel">
      <Table border :loading="loading" :columns="header" :data="data" size="small"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { DateFormat } from '../../../../../libs/utils.js';
import listManage from '../../../../../utils/listManage';
export default {
  data() {
    return {
      list: new listManage({ pageSize: 10 }, auditList),
      header: [
        {
          title: '审批情况',
          key: 'record',
          minWidth: 100
        },
        {
          title: '审批备注',
          key: 'recordDesc',
          minWidth: 200
        },
        {
          title: '审批时间',
          key: 'createDate',
          minWidth: 150
        },
        {
          title: '创建人',
          key: 'auditName',
          minWidth: 120
        }
      ],
      data: []
    };
  },
  methods: {
    get_data(e) {
      console.log(e);
      if (e.row._info) {
        let b;
        let a = e.row._info.split('_&_');
        for (let i = 0; i < a.length; i++) {
          b = a[i].split('``');
          console.log(b);
          if (b[1] == '1' || b[1] == 'Agree') {
            b[1] = '同意';
          }
          if (b[1] == '0' || b[1] == 'Reject') {
            b[1] = '不同意';
          }
          this.data.push({
            auditName: b[0],
            record: b[1],
            createDate: DateFormat(b[2]),
            recordDesc: b[3]
          });
        }
        // console.log(this.data)
      }
    },
    cancel() {
      this.data = [];
    }
  },
  created() {
    let _self = this;
    this.$bus.off('ORDER_AB_APPROVELIST_LOG', true);
    this.$bus.on('ORDER_AB_APPROVELIST_LOG', e => {
      console.log(e);
      _self.get_data(e);
      _self.opencheckMemo = true;
    });
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


