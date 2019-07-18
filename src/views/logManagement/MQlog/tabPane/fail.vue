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
          @on-change="list.handleSizeChange"
          placement="top"
          style="margin-top: 10px"
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import listManage from '@U/listManage';
import { mqRequest, showMQLogInfo } from '@A/logManagement';
const url = '/system/showMQLogInfo';
export default {
  data() {
    return {
      header: [
        {
          title: 'id',
          key: 'id',
          minWidth: 90
        },
        {
          title: '队列名称',
          key: 'queues',
          minWidth: 180
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 120
        },
        {
          title: '内容',
          key: 'content',
          minWidth: 300
        },
        {
          title: '创建时间',
          key: 'create_date',
          minWidth: 200
        },
        {
          title: '方法名',
          key: 'method_name',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.resend(params.row.id);
                    }
                  }
                },
                '[ 重发 ]'
              )
            ]);
          }
        }
      ],
      list: new listManage({ pageSize: 10 }, showMQLogInfo)
    };
  },
  methods: {
    async resend(id) {
      try {
        await mqRequest({ id });
        this.$Message.info('重发成功');
      } catch (error) {
        this.$Message.info('重发失败');
      } finally {
      }
    }
  },
  created() {
    this.list.setDefaultConfig({ sortField: 'id', order: 'desc', status: 'fail' });
    this.list.fetchList();
  }
};
</script>
