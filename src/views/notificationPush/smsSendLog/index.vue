 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="handleShow">查看</Button>
              <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
              <Button type="primary" icon="search" @click="openSendEmail" v-permission="['smsSendLogSendEmail.send']"
                >发送短信</Button
              >
              <Button type="primary" icon="search" @click="openSendExcelEmail" v-permission="['smsExcelSendLogSendEmail.send']"
                >excel发送短信</Button
              >
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

    <show v-if="isShow" :row="currentRow" @cancel="isShow = false" />
    <send-excel-email v-if="sendExcelEmailModel" @ok="handleSendEmailOk" @cancel="sendExcelEmailModel = false" />
    <send-email v-if="sendEmailModel" @ok="handleSendOk" @cancel="sendEmailModel = false" />
  </div>
</template>

<script>
import listManage from '@U/listManage';
import filtra from '@C/filtra';
import show from './menu/show.vue';
import sendEmail from './menu/sendEmail';
import sendExcelEmail from './menu/sendExcelEmail';

let url = '/system/log/querySMSRquestLog/list';
export default {
  name: 'smsSendLog',
  components: {
    filtra,
    show,
    sendEmail,
    sendExcelEmail
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url),
      tableHeader: [
        {
          title: '客户',
          minWidth: 120,
          key: 'name'
        },
        {
          title: '电话号码',
          minWidth: 120,
          key: 'phone'
        },
        {
          title: '模版名称',
          minWidth: 180,
          key: 'msgtname'
        },
        {
          title: '结果',
          minWidth: 200,
          key: 'info'
        },
        {
          title: '公司',
          key: 'companyname',
          minWidth: 180
        },
        {
          title: '短信内容',
          key: 'msg_content',
          width: 300,
          ellipsis: true
        },
        {
          title: '发送日期',
          key: 'send_date',
          width: 150,
          ellipsis: true
        },
        {
          title: '短信发送人',
          key: 'realname',
          minWidth: 120
        }
      ],
      filtraConfig: [
        { type: 'input', key: 'companyname', label: '公司：' },
        { type: 'input', key: 'phone', label: '电话号码：' },
        { type: 'input', key: 'msgtname', label: '模板名称' },
        { type: 'date', key: 'createdate', label: '发送日期：' },
        { type: 'input', key: 'realname', label: '发送人' }
      ],
      excelField: [
        { field: 'name', title: '客户' },
        { field: 'msgtname', title: '模版名称' },
        { field: 'info', title: '结果' },
        { field: 'companyname', title: '公司' },
        { field: 'msg_content', title: '短信内容' },
        { field: 'send_date', title: '发送日期' },
        { field: 'realname', title: '短信发送人' }
      ],
      sendExcelEmailModel: false,
      sendEmailModel: false,
      isShow: false
    };
  },
  methods: {
    downloadExcel() {
      this.list.downloadExcel(this.excelField);
    },
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
    openSendEmail() {
      this.sendEmailModel = !this.sendEmailModel;
    },
    openSendExcelEmail() {
      this.sendExcelEmailModel = !this.sendExcelEmailModel;
    },
    handleSendOk() {
      this.sendEmailModel = !this.sendEmailModel;
      this.list.fetchList();
    },

    handleSendEmailOk() {
      this.sendExcelEmailModel = !this.sendExcelEmailModel;
      this.list.fetchList();
    }
  },
  created() {
    this.list.fetchList();
  }
};
</script>
