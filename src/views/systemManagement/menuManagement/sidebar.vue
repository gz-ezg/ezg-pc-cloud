<template>
  <div>
    <Card>
      <span slot="extra" @click="closeSidebar">
        <Icon type="close"></Icon>
      </span>
      <ButtonGroup style="margin-bottom:10px">
        <Button type="primary" @click="createButton">新建按钮</Button>
      </ButtonGroup>
      <Table :columns="headers" :data="data" size="small"></Table>
    </Card>
  </div>
</template>

<script>
import { getButtonList } from '@A/systemManage';
export default {
  name: 'menu_sidebar',
  props: {
    code: {}
  },
  data() {
    return {
      data: [],
      headers: [
        {
          title: '按钮名称',
          key: 'operationname',
          minWidth: 150
        },
        {
          title: '按钮编码',
          key: 'operationcode',
          minWidth: 200
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 160,
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
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.updateButton(params.row);
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.del_button(params);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    async getButton(e) {
      this.data = await getButtonList({ menuId: e });
    },
    //  创建按钮
    createButton() {
      this.$Bus = ['OPEN_CREATE_BUTTON', this.code];
    },

    updateButton() {
      console.log('编辑按钮');
    },
    //  关闭
    closeSidebar() {
      this.$emit('close-sidebar', true);
    }
  },
  created() {
    this.getButton(this.code);
  },

  $Bus: {
    UPDATE_BUTTON(e) {
      this.getButton(this.code);
    }
  },
  watch: {
    code(val) {
      this.getButton(val);
    }
  }
};
</script>

