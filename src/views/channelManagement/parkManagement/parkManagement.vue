<template>
  <div>
    <Row>
      <Col>
        <Card>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="plus" @click="handleAdd">新增</Button>
            </ButtonGroup>
            <!-- <Col span="6" style="float:right">
              <Input
                v-model="searchLabel"
                placeholder="输入标签名称搜索"
                @on-keydown.enter="searchLabelData"
              >
                <Button slot="append" icon="ios-search" @click="searchLabelData"></Button>
              </Input>
            </Col>-->
          </Row>
          <Row style="margin-top: 10px;">
            <Table :loading="loading" :columns="columns" :data="data"></Table>
            <Page
              size="small"
              :total="pageTotal"
              show-total
              show-sizer
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="isShowAdd" footer-hide :title="title">
      <Form ref="formValidate" :model="formItem" :label-width="120">
        <img v-if="!!imgUrl" class="modal_img" :src="imgUrl">
        <Row type="flex" justify="center">
          <Upload
            max-size="5120"
            ref="upload"
            :on-format-error="handleFormatError"
            :format="['jpg','jpeg','png']"
            type="drag"
            action="/api/customer/addCustomerContentImg"
            :before-upload="handleBeforeUpload"
          >
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </Row>

        <FormItem v-if="isAdmin" label="内容类型">
          <Select v-model="formItem.type">
            <Option value="sy">扉页</Option>
            <Option value="cs">内容展示</Option>=
          </Select>
        </FormItem>
        <FormItem v-if="formItem.type=='sy'&&isAdmin" label="园区">
          <Input @on-focus="handleFocus" v-model="formItem.channelTypeName" placeholder="请填写园区"/>
        </FormItem>
        <Button class="mg-auto" :loading="loading" @click="uploadImg" type="primary">保存并更新</Button>
      </Form>
    </Modal>

    <Modal v-model="selectPark" footer-hide title="选择园区">
      <Row style="margin-top: 10px;">
        <Table
          highlight-row
          size="small"
          :columns="columns_park"
          :data="data_park"
          @on-row-dblclick="selectParkRow"
        ></Table>
        <Page
          size="small"
          :total="pageTotal_park"
          show-total
          @on-change="pageChangePark"
          style="margin-top: 10px"
        ></Page>
      </Row>
    </Modal>
  </div>
</template>

<script>
import {
  handleUploadImg,
  createChannelTypeImg,
  updateChannelTypeImgStatus,
  updateChannelTypeImg,
  isAdmin
} from "./serve";
import { DateFormat } from "../../../libs/utils.js";
import { async } from "q";
export default {
  name: "parkManagement_index",
  data() {
    return {
      isAdmin: false,
      title: "新增",
      selectPark: false,
      imgUrl: "",
      formItem: { type: "sy" },
      isShowAdd: false,
      loading: false,
      page: 1,
      pageTotal: "",
      pageTotal_park: "",
      page_park: 1,
      pageSize: 10,
      pageSize_park: 10,
      file: "",
      data: [],
      data_park: [],
      columns: [
        {
          title: "内容类型",
          key: "typ"
        },
        {
          title: "园区",
          key: "channel_type_name"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "创建人",
          key: "realname"
        },
        {
          title: "创建时间",
          key: "createdate"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.handleRemove(params.row);
                    }
                  }
                },
                params.row.status == "有效" ? "作废" : "还原"
              )
            ]);
          }
        }
      ],
      columns_park: [
        {
          title: "渠道编码",
          key: "channel_type_code"
        },
        {
          title: "渠道名称",
          key: "channel_type_name"
        }
      ]
    };
  },
  methods: {
    pageChange(e) {
      this.page = e;
      this.getParkList();
    },
    async handleRemove({ id, status }) {
      let title = status == "有效" ? "作废" : "还原";
      this.$Modal.confirm({
        title,
        content: `<p>是否${title}该内容</p>`,
        onOk: async () => {
          try {
            await updateChannelTypeImgStatus({
              id,
              status: status == "有效" ? "1" : "0"
            });
          } catch (error) {
            this.$Message.warn("修改成功");
          } finally {
            this.getParkList();
          }
        }
      });
    },
    pageSizeChange() {
      this.pageSize = a;
      this.getParkList();
    },
    handleAdd() {
      this.title = "新增";
      this.isShowAdd = true;
    },
    handleEdit({ id, typ, channel_type_name, path, channel_type_id }) {
      this.formItem = {
        type: typ == "扉页" ? "sy" : "cs",
        channelTypeName: channel_type_name,
        channelTypeId: channel_type_id,
        realpath: path
      };
      this.rowId = id;
      this.title = "编辑";
      this.isShowAdd = true;
      this.imgUrl = `/api/assets/${path}`;
    },
    selectParkRow({ id, channel_type_name }) {
      this.formItem.channelTypeId = `${id}`;
      this.formItem.channelTypeName = channel_type_name;
      this.selectPark = false;
    },
    handleFocus() {
      this.selectPark = true;
      this.getTableData();
    },
    priviewPic(pic) {
      let r = new FileReader();
      r.readAsDataURL(pic);
      r.onload = e => {
        this.imgUrl = e.target.result;
      };
    },
    handleBeforeUpload(file) {
      this.priviewPic(file);
      this.file = file;
      return false;
    },
    pageChangePark(e) {
      this.page_park = e;
      this.getTableData();
    },
    async uploadImg() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (!this.imgUrl) {
        return this.$Message.warning("请上传图片");
      }
      // if (this.formItem.type == "sy" && !this.formItem.channelTypeId) {
      //   return this.$Message.warning("请选择园区");
      // }
      if (
        this.file.type !== "image/jpeg" &&
        this.file.type !== "image/jpg" &&
        this.file.type !== "image/png"
      ) {
        return this.$Message.warning("请上传jpg或者png的类型图片");
      }
      let url = "/api/customer/addCustomerContentImg";
      let formdata = new FormData();
      formdata.append("files", this.file);
      try {
        if (!!this.file) {
          let resp = await handleUploadImg(formdata);
          this.formItem.realpath = resp.data.data[0].realpath;
        }
        let config = {
          channelTypeId:
            this.formItem.type == "sy" ? this.formItem.channelTypeId : "0",
          path: this.formItem.realpath,
          typ: this.formItem.type
        };
        if (!this.isAdmin) {
          delete config.channelTypeId;
        }
        if (this.title == "编辑") {
          config.id = this.rowId;
          await updateChannelTypeImg(config);
        } else {
          await createChannelTypeImg(config);
        }
      } catch (error) {
        this.$Message.warning("创建失败");
      } finally {
        this.isShowAdd = false;
        this.loading = false;
        // 初始化数据
        this.imgUrl = "";
        this.file = "";
        this.formItem.channelTypeId = "";
        this.formItem.channelTypeName = "";
        this.getParkList();
      }
    },
    getParkList() {
      let _self = this;
      _self.loading = true;
      var url =
        "/channel/img/channelTypeImgList?page=" +
        _self.page +
        "&pageSize=" +
        _self.pageSize;

      function doSuccess(re) {
        let _data = re.data.data;
        _self.pageTotal = _data.total;
        _self.data = _data.rows.map(v => {
          v.createdate = DateFormat(v.createdate);
          v.typ = v.typ == "cs" ? "内容展示" : "扉页";
          v.status = v.status == 0 ? "有效" : "作废";
          return v;
        });
        _self.loading = false;
      }

      this.GetData(url, doSuccess);
    },
    getTableData() {
      let _self = this;
      var url =
        "/channel/type/list?page=" +
        _self.page_park +
        "&pageSize=" +
        _self.pageSize_park;

      function doSuccess(re) {
        let _data = re.data.data;
        _self.pageTotal_park = _data.total;
        _self.data_park = [];
        for (let i = 0; i < _data.rows.length; i++) {
          _self.data_park.push({
            id: _data.rows[i].id,
            channel_type_code: _data.rows[i].channel_type_code,
            channel_type_name: _data.rows[i].channel_type_name
          });
        }
      }

      this.GetData(url, doSuccess);
    }
  },
  mounted() {
    this.getParkList();
  },
  created() {
    this.isAdmin = isAdmin();
  }
};
</script>

<style scoped>
.modal_img {
  margin: 0 auto 10px;
  display: block;
  width: 180px;
  border-radius: 4px;
  height: 180px;
}
.mg-auto {
  display: block;
  margin: 0 auto;
}
</style>
