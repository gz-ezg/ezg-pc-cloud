 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
            </ButtonGroup>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
              :loading="list.loading"
              highlight-row
              border
              size="small"
              :columns="tableHeader"
              @on-current-change="selectRow"
              :data="list.data"
            ></Table>
            <Page
              size="small"
              :total="list.total"
              :page-size="list.pageSize"
              show-total
              show-sizer
              show-elevator
              :current.sync="list.page"
              @on-change="list.handleSizeChange($event)"
              @on-page-size-change="list.handlePageSizeChange($event)"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import listManage from '@U/listManage';
import filtra from '@C/filtra';

let url = '/system/log/queryWechatCompanyLog/list';
export default {
  components: {
    filtra
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url),
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
      this.list.downloadExcel(this.excelField);
    }
  },
  created() {
    this.list.fetchList();
  }
};
</script>
