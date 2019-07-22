<template>
  <div>
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
import listManage from '../../../utils/listManage';
const url = '/customer/verifyList';
export default {
  name: 'useRecord_index',
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url, this.dataHandle),
      header: [
        {
          title: '公司名称',
          key: 'companyname',
          minWidth: 200
        },
        {
          title: '客户名称',
          key: 'customername',
          minWidth: 120
        },
        {
          title: '联系方式',
          key: 'customertel',
          minWidth: 120
        },
        {
          title: '创建时间',
          key: 'createDate',
          minWidth: 150
        },
        {
          title: '创建人',
          key: 'realname',
          minWidth: 150
        }
      ]
    };
  },
  methods: {
    dataHandle(e) {
      //TODO： 数据处理
      return e;
    }
  },
  created() {
    this.list.fetchList();
  }
};
</script>
