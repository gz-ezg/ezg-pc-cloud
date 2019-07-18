<!--
    可以使用在菜单管理之中
-->

<template>
  <div>
    <Row>
      <Col :span="span">
        <Card>
          <ButtonGroup style="margin-bottom:10px">
            <Button type="primary" @click="createMenu('', 0)">新增一级菜单</Button>
          </ButtonGroup>
          <Table :loading="loading" :columns="headers" :data="data" size="small"></Table>
        </Card>
      </Col>
      <Col :span="24 - span" v-if="24 - span">
        <side-bar :code="currentCode" @close-sidebar="span = 24"></side-bar>
      </Col>
    </Row>
    <create-menu></create-menu>
    <create-button></create-button>
  </div>
</template>
<script>
import { getMenuTree } from '@A/systemManage';
import createMenu from './createMenu.vue';
import createButton from './createButton.vue';

import childTable from './childTable/index.vue';
import sideBar from './sidebar.vue';
export default {
  name: 'menuMangement_index',
  components: {
    childTable,
    sideBar,
    createMenu,
    createButton
  },
  data() {
    return {
      currentCode: 0,
      span: 24,
      headers: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            if (params.row.children) {
              return h(childTable, {
                props: {
                  row: params.row.children
                },
                style: {
                  paddingLeft: '50px'
                },
                on: {
                  'open-sidebar': e => {
                    this.span = '12';
                    this.openSidebar(e);
                  }
                }
              });
            } else {
              return h('center', {}, '暂无菜单');
            }
          }
        },
        {
          title: '菜单名称',
          key: 'text',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.createMenu(params.row.id, 1);
                    }
                  }
                },
                '新增子菜单'
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
                      this.delMenu(params);
                    }
                  }
                },
                '删除菜单'
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    async getMenu() {
      try {
        this.loading = true;
        this.data = await getMenuTree();
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    createMenu(parentId, level) {
      this.$Bus = [
        'OPEN_CREATE_MENU',
        {
          parentInterfaceId: parentId,
          interfaceLevel: level
        }
      ];
    },

    async delMenu(e) {
      if (e.row.children) {
        return this.$Message.warning('该菜单下还有未删除的子菜单！');
      }
      try {
        await deleteMenu({ menuId: e.row.id });
      } catch (error) {
        this.getMenu();
      }
    },
    openSidebar(e) {
      this.currentCode = e.id;
    }
  },
  created() {
    this.getMenu();
  },
  $Bus: {
    UPDATE_MENU() {
      this.getMenu();
    }
  }
};
</script>
