<template>
  <div>
    <Modal title="选择部门" :value="true" width="500" @on-cancel="close">
      <el-tree
        ref="tree"
        :data="departTree"
        show-checkbox
        node-key="ID"
        :default-checked-keys="check_depart_id"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer">
        <Button type="primary" @click="changeOrg">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Tree } from 'element-ui';
import { listDepartTree } from '@/api/logManagement';
export default {
  components: {
    elTree: Tree
  },
  data() {
    return {
      open_organize_modal: false,
      check_depart_id: [],
      check_depart_name: '',
      departTree: [],
      defaultProps: {
        children: 'children',
        label: 'departname'
      }
    };
  },
  methods: {
    async getAllDepartTree() {
      let data = await listDepartTree();
      this.departTree = data;
    },
    changeOrg() {
      let temp = this.$refs.tree.getCheckedNodes();
      if (!temp.length) {
        this.$Message.error('未选择部门！');
        return false;
      }

      let list = temp.filter(v1 => {
        return !temp.some(v2 => {
          return v2.ID == v1.parentdepartid;
        });
      });

      this.$emit('change-depart', {
        departId: list.map(v => {
          return v.ID;
        }),
        departName: list.map(v => {
          return v.departname;
        })
      });
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    }
  },
  created() {
    this.getAllDepartTree();
  }
};
</script>
