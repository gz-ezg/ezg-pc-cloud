<template>
  <Card>
    <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
    <Row>
      <ButtonGroup>
        <Button type="primary" icon="ios-color-wand-outline" @click="handleUpload">上传资料</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="handleEdit">编辑</Button>
      </ButtonGroup>
    </Row>

    <Row style="margin-top: 10px;">
      <Table
        ref="selection"
        highlight-row
        size="small"
        :columns="header"
        :loading="list.loading"
        @on-current-change="selectRow"
        :data="list.data"
      ></Table>
      <Page
        size="small"
        :total="list.total"
        :current.sync="list.page"
        show-total
        show-elevator
        @on-change="list.handleSizeChange($event)"
        placement="top"
        style="margin-top: 10px"
      ></Page>
    </Row>
  </Card>
</template>

<script>
import listManage from '@U/listManage';
import { updateSource } from '@A/resource';
import filtra from '@C/filtra';
const url = '/system/resource/showResourceInfo';
let resourceType = [];
export default {
  components: {
    filtra
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, url, this.dataHandle),
      filtraConfig: [
        {
          key: 'fileName',
          label: '文件名称：',
          type: 'input'
        },
        {
          key: 'fileMemo',
          label: '文件说明：',
          type: 'input'
        }
      ],
      header: [
        {
          type: 'index',
          title: '序号',
          minWidth: 60,
          align: 'center'
        },
        {
          title: '文件名称',
          key: 'filename',
          minWidth: 280
        },
        {
          title: '文件类型',
          key: 'resourceTypeName',
          minWidth: 120
        },
        {
          title: '文件说明',
          key: 'sourcememo',
          minWidth: 120
        },
        {
          title: '视频文件',
          key: 'isvideo',
          minWidth: 120,
          render: (h, params) => {
            if (params.row.isvideo == 'N') {
              return h('div', '否');
            } else {
              return h('div', '是');
            }
          }
        },
        {
          title: '创建人',
          key: 'realname',
          minWidth: 120
        },
        {
          title: '创建时间',
          key: 'createdate',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$Message.error('该文件暂不支持预览！');
                    }
                  }
                },
                '预览'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      if (params.row.isvideo == 'N') {
                        let url = `api/system/resource/download?id=` + params.row.id;
                        window.open(url);
                      } else {
                        window.open(params.row.sourceurl);
                      }
                    }
                  }
                },
                '下载'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    display: localStorage.getItem('realname') == '管理员' ? 'inline' : 'none'
                  },
                  on: {
                    click: () => {
                      this.deleteFile(params.row);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      resourceType: [],
      resourceTypeMap: {},
      currentRow: null,
      isUpload: false,
      isEdit: false
    };
  },
  methods: {
    handleUpload() {
      this.isUpload = !this.isUpload;
    },
    handleEdit() {
      this.isEdit = !this.isEdit;
    },
    selectRow(e) {
      this.currentRow = e;
    },
    async deleteFile(e) {
      try {
        await updateSource({ id: e.id, deleteflag: '1' });
        this.list.fetchList();
      } catch (error) {}
    },
    dataHandle(list) {
      return list.map(v => {
        v.createdate = v.createdate.slice(0, 10);
        v.resourceTypeName = this.resourceTypeMap[v.sourcetype];
        return v;
      });
    },
    async getDic() {
      let [DDIC, MAP] = await this.$queryCodes('resourceType');
      this.resourceType = DDIC;
      this.resourceTypeMap = MAP;

      this.filtraConfig.push({
        key: 'resourceType',
        label: '文件类型：',
        type: 'select',
        option: this.resourceType
      });
    }
  },
  async created() {
    this.getDic();
    this.list.setDefaultConfig({ sortField: 'createdate', order: 'desc', classify: 'company' });
    this.list.fetchList();
  }
};
</script>

