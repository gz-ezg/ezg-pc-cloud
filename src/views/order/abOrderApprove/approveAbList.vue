<template>
  <div>
    <Card>
      <x-table
        ref="table"
        :list-query="query"
        @select="selectRow"
        :url="url"
        :handler="dataHandle"
        :header="tableHeader"
        :config="filtraConfig"
      >
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="ios-color-filter-outline" @click="onDownloadExcel">导出Excel</Button>
            <Button type="primary" icon="ios-color-filter-outline" @click="onRefresh">刷新</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
  </div>
</template>

<script>
import xTable from '@C/xTable';
import { DateFormat } from '../../../libs/utils.js';

export default {
  components: {
    xTable
  },
  data() {
    return {
      url: '/order/unusual/workorder/auditList',
      //数据字典
      unusualType: [],
      unusualTypeMap: null,
      //  当前选中的行

      currentRow: '',
      tableHeader: [
        {
          title: '异常工单号',
          key: 'unusual_code',
          minWidth: 140
        },
        {
          title: '公司名称',
          key: 'companyname',
          minWidth: 300
        },
        {
          title: '客户名称',
          key: 'name',
          minWidth: 120
        },
        {
          title: '客户电话',
          key: 'tel',
          minWidth: 120
        },
        {
          title: '产品内容',
          key: 'product_content',
          minWidth: 180,
          render: (h, params) => {
            if (params.row.product_content == '' || params.row.product_content == null) {
              return '';
            } else if (params.row.product_content.length > 10) {
              return h(
                'Poptip',
                {
                  props: {
                    trigger: 'hover',
                    placement: 'bottom'
                  }
                },
                [
                  h('span', params.row.product_content.slice(0, 10) + '...'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
                    }
                  }),
                  h(
                    'div',
                    {
                      slot: 'content'
                    },
                    [h('span', params.row.product_content)]
                  )
                ]
              );
            } else {
              return h('span', params.row.product_content);
            }
          }
        },
        {
          title: '异常类型',
          key: 'unusual_type',
          minWidth: 120
        },
        {
          title: '审批事由',
          key: 'apply_memo',
          minWidth: 180,
          render: (h, params) => {
            if (params.row.apply_memo == '' || params.row.apply_memo == null) {
              return '';
            } else if (params.row.apply_memo.length > 10) {
              return h(
                'Poptip',
                {
                  props: {
                    trigger: 'hover',
                    placement: 'bottom'
                  }
                },
                [
                  h('span', params.row.apply_memo.slice(0, 10) + '...'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
                    }
                  }),
                  h(
                    'div',
                    {
                      slot: 'content'
                    },
                    [h('span', params.row.apply_memo)]
                  )
                ]
              );
            } else {
              return h('span', params.row.apply_memo);
            }
          }
        },
        {
          title: '流程状态',
          key: 'process_type',
          minWidth: 120,
          sorttable: 'custom'
        },
        {
          title: '创建人',
          key: 'realname',
          minWidth: 100
        },
        {
          title: '创建时间',
          key: 'create_date',
          minWidth: 120,
          sortable: 'custom'
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 150,
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
                      this.order_detail(params);
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.open_approve_log(params);
                    }
                  }
                },
                '审批记录'
              )
            ]);
          }
        }
      ],
      exportField: [
        { field: 'unusual_code', title: '订单号码' },
        { field: 'companyname', title: '公司名称' },
        { field: 'name', title: '客户名称' },
        { field: 'tel', title: '客户电话' },
        { field: 'product_content', title: '产品内容' },
        { field: 'unusual_type', title: '异常类型', format: 'unusualType' },
        { field: 'tel', title: '客户电话' },
        { field: 'apply_memo', title: '审批事由' },
        { field: 'process_type', title: '流程状态' },
        { field: 'realname', title: '创建人' },
        { field: 'create_date', title: '创建时间' }
      ],
      filtraConfig: [
        { type: 'input', key: 'companyName', label: '企业名称' },
        { type: 'input', key: 'tel', label: '电话号码' },
        { type: 'input', key: 'crealname', label: '创建人' },
        { type: 'date', key: 'createdate', label: '创建时间' }
      ],
      query: {
        sortField: 'create_date',
        isAudit: 'Y'
      }
    };
  },
  methods: {
    //获取数据字典
    dataHandle(data) {
      return data.map(v => {
        v.unusual_type = this.unusualTypeMap[v.unusual_type];
        v.create_date = DateFormat(v.create_date);
        return v;
      });
    },

    //导出excel
    onDownloadExcel() {
      this.$refs.table.list.downloadExcel(this.exportField);
    },

    //刷新
    onRefresh() {
      this.$refs.table.list.fetchList();
    },

    //选择某行
    selectRow(e) {
      this.currentRow = e;
    },

    //  查看审批记录
    open_approve_log(e) {
      this.$bus.emit('ORDER_AB_APPROVELIST_LOG', e);
    },

    //  查看详情
    order_detail(e) {
      this.$bus.emit('OPEN_AB_ORDER_DETAIL', e.row);
    }
  },
  async created() {
    let [dataDict, MAP] = await this.$queryCodes('unusualType');
    this.unusualTypeMap = MAP;
    this.unusualType = dataDict;
    this.filtraConfig.push({
      type: 'select',
      key: 'unusualType',
      label: '异常类型',
      option: dataDict
    });
  }
};
</script>