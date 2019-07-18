<template>
  <div>
    <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
    <Card>
      <Row style="margin-top:10px">
        <Table highlight-row size="small" :columns="header" :data="list.data" :loading="list.loading"> </Table>
        <Page
          size="small"
          :total="list.total"
          show-total
          show-elevator
          @on-change="list.handleSizeChange($event)"
          placement="top"
          style="margin-top: 10px"
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import listManage from '@U/listManage';
import filtra from '@C/filtra';
const url = '/system/showClickOnInfo';
export default {
  components: {
    filtra
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url),
      header: [
        {
          title: '操作人员',
          key: 'realname',
          width: 180
        },
        {
          title: '操作按钮',
          key: 'buttonname',
          width: 250
        },
        {
          title: '按钮code',
          key: 'buttoncode',
          width: 250
        },
        {
          title: '操作时间',
          key: 'create_date',
          width: 200
        }
      ],
      filtraConfig: [
        {
          type: 'input',
          label: '操作人员',
          key: 'realname'
        }
      ]
    };
  },
  methods: {},
  created() {
    this.list.setDefaultConfig({ type: 'button' });
    this.list.fetchList();
  }
};
</script>
