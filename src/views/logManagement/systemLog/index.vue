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
const url = '/system/log/queryTSLog/list';
export default {
  name: 'systemlog',
  components: {
    filtra
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url),
      header: [
        {
          title: '日志类型',
          key: 'logType',
          minWidth: 90
        },
        {
          title: '日志内容',
          key: 'logcontent',
          minWidth: 400
        },
        {
          title: '操作IP',
          key: 'ip',
          minWidth: 90
        },
        {
          title: '操作人ID',
          key: 'userid',
          minWidth: 90
        },
        {
          title: '操作人名',
          key: 'update_name',
          minWidth: 90
        },
        {
          title: '操作浏览器',
          key: 'broswer',
          minWidth: 90
        },
        {
          title: '操作时间',
          key: 'operatetime',
          minWidth: 150
        }
      ],
      filtraConfig: [
        {
          type: 'select',
          label: '日志类型：',
          key: 'logType',
          option: [
            {
              label: '登录',
              value: '登录'
            },
            {
              label: '注销',
              value: '注销'
            }
          ]
        },
        {
          type: 'date',
          label: '操作时间',
          key: 'operateTime'
        }
      ]
    };
  },
  methods: {},
  created() {
    this.list.fetchList();
  }
};
</script>
