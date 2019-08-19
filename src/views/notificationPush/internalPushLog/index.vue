 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" :handler="dataHandle" :header="tableHeader" :config="filtraConfig">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
  </div>
</template>

<script>
import xTable from '@C/xTable';

export default {
  components: {
    xTable
  },
  data() {
    return {
      url: '/system/log/queryWechatCompanyLog/list',
      tableHeader: [
        {
          title: '模版名称',
          key: 'msgtname',
          minWidth: 250
        },
        {
          title: '消息',
          key: 'msg',
          minWidth: 300
        },
        {
          title: '发送时间',
          key: 'sendDate',
          minWidth: 180
        },
        {
          title: '接收人',
          width: 80,
          key: 'wechatname',
          minWidth: 90
        },
        {
          title: '接收人手机号',
          minWidth: 120,
          key: 'mobile'
        },
        {
          title: '是否成功',
          minWidth: 90,
          key: 'issuccess'
        },
        {
          title: '返回信息',
          key: 'resultMsg',
          minWidth: 180
        }
      ],
      filtraConfig: [
        { type: 'input', key: 'msgtname', label: '模版名称：' },
        { type: 'date', key: 'createdate', label: '发送时间：' },
        { type: 'input', key: 'wechatname', label: '接受人：' },
        { type: 'input', key: 'mobile', label: '手机号：' },
        {
          type: 'select',
          key: 'issuccess',
          label: '是否成功：',
          option: [
            { value: 'Y', label: '成功' },
            {
              value: 'N',
              label: '失败'
            }
          ]
        }
      ],
      excelField: [
        { field: 'msgtname', title: '模版名称' },
        { field: 'msg', title: '消息' },
        { field: 'sendDate', title: '发送时间' },
        { field: 'wechatname', title: '接收人' },
        { field: 'issuccess', title: '是否成功' },
        { field: 'resultMsg', title: '返回信息' }
      ]
    };
  },
  methods: {
    downloadExcel() {
      this.$refs.table.list.downloadExcel(this.excelField);
    }
  }
};
</script>
