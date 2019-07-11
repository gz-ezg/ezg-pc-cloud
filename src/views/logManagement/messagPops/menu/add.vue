 <template>
  <div>
    <Modal v-model="show" title="新增" width="500" @on-cancel="onCancel">
      <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="130">
        <FormItem label="类型：">
          <Select v-model="formValidate.type" style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="部门：">
          <Tree ref="tree" :data="treeData" @on-check-change="checkChange" show-checkbox></Tree>
        </FormItem>
        <FormItem label="内容：">
          <Input v-model="formValidate.content" placeholder="Enter something..." style="width: 300px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" style="margin-left:20px" @click="handleNewTemplate">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import serviceApi, { userApi } from '../../service';
export default {
  data() {
    return {
      show: true,
      loading: false,
      treeData: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      typeList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      formValidate: {
        type: 'New York'
      }
    };
  },
  methods: {
    async getUser(query) {
      let config = query ? { page: 1, pageSize: 10, realname: query } : { page: 1, pageSize: 10 };
      const resp = await userApi.getList(config);
      this.userList = resp.rows;
    },
    async handleNewTemplate() {
      console.log(this.$refs.tree.getCheckedNodes());

      // try {
      //   this.loading = true;
      //   this.formValidate.linked_user_json = JSON.stringify(this.formValidate.linked_user_json);
      //   await serviceApi.create(this.formValidate);
      // } catch (error) {
      // } finally {
      //   this.$emit('ok');
      //   this.loading = false;
      // }
    },
    checkChange(e) {
      console.log(e)
    },
    onCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    this.getUser();
  }
};
</script>
