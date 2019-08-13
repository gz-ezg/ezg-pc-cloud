 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" :handler="dataHandle" :header="tableHeader" :config="filtraConfig" @select="selectRow">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="handleShow">查看</Button>
            <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>

    <show v-if="isShow" :row="currentRow" @cancel="isShow = false"></show>
  </div>
</template>

<script>
import show from './Menu/show';
import xTable from '@C/xTable';

export default {
  components: {
    xTable,
    show
  },
  data() {
    return {
      url: '/system/log/queryWechatTemplatelog/list',
      tableHeader: [
        {
          title: '模版名称',
          key: 'templateName',
          minWidth: 180
        },
        {
          title: '发送时间',
          key: 'sendDate',
          minWidth: 150
        },
        {
          title: '发送人',
          key: 'realname',
          minWidth: 90
        },
        {
          title: '手机号',
          key: 'mobile',
          minWidth: 120
        },
        {
          title: '客户',
          key: 'name',
          minWidth: 90
        },
        {
          title: '是否成功',
          key: 'isSuccess',
          minWidth: 90
        },
        {
          title: '返回信息',
          key: 'resultMsg',
          minWidth: 130
        },
        {
          title: '公司名称',
          key: 'companyname',
          minWidth: 130
        }
      ],
      filtraConfig: [
        { type: 'input', key: 'templateName', label: '模版名称：' },
        { type: 'date', key: 'createdate', label: '发送时间：' },
        { type: 'input', key: 'realname', label: '发送人：' },
        { type: 'input', key: 'mobile', label: '手机号：' },
        {
          type: 'select',
          key: 'isSuccess',
          label: '是否成功：',
          option: [
            { value: 'Y', label: '成功' },
            {
              value: 'N',
              label: '失败'
            }
          ]
        },
        { type: 'input', key: 'name', label: '公司名称：' }
      ],
      excelField: [
        { field: 'templateName', title: '模版名称' },
        { field: 'sendDate', title: '发送时间' },
        { field: 'realname', title: '发送人' },
        { field: 'name', title: '客户' },
        { field: 'isSuccess', title: '是否成功' },
        { field: 'resultMsg', title: '返回信息' },
        { field: 'first', title: '短信内容' },
        { field: 'keyword', title: '关键词' },
        { field: 'remark', title: '链接标题' },
        { field: 'companyname', title: '公司名称' }
      ],
      currentRow: null,
      isShow: false
    };
  },
  methods: {
    //  获取当前点击行
    selectRow(e) {
      this.currentRow = e;
    },
    handleShow() {
      if (!this.currentRow) {
        return this.$Message.warning('请选择一行进行查看！');
      }
      this.isShow = !this.isShow;
    },

    downloadExcel() {
      this.$refs.table.list.downloadExcel(this.excelField);
    }
  }
};
</script>
