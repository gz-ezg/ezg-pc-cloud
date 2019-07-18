<template>
  <div>
    <Row>
      <Table highlight-row size="small" :loading="loading" :columns="headers" :data="data"></Table>
    </Row>
  </div>
</template>

<script>
import { getLogList } from '@A/logManagement';
export default {
  methods: {
    async getList() {
      try {
        this.loading = true;
        this.data = await getLogList();
      } catch (error) {
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.getList();
  },
  data() {
    return {
      data: [],
      loading: false,
      headers: [
        {
          title: '日志',
          key: 'fileName'
        },
        {
          title: '操作',
          ket: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      window.open('/api/zuul/downLoadLogFile?fileName=' + params.row.fileName);
                    }
                  }
                },
                '下载'
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>

