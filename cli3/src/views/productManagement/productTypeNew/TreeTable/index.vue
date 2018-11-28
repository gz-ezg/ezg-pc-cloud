<template>
  <el-table 
    :data="formatData" 
    :row-style="showRow" 
    v-bind="$attrs" 
    ref="multipleTable" 
    @select="handleSelectionChange"
    @selection-change="get_all_change"
    @current-change="get_current_click"
    size="small">
    <el-table-column
      type="index"
      label="序号"
      width="60"
    >
    </el-table-column>
    <el-table-column
      v-if="selection"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <Button type="primary" size="small" @click="edit(scope.row)">编辑</Button>
        <Button type="error" size="small" @click="del(scope.row)">删除</Button>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import { Table, TableColumn } from 'element-ui';
import treeToArray from './eval'
export default {
  components: {
    elTable: Table,
    elTableColumn: TableColumn
  },
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    // 勾选状态转换
    handleSelectionChange(rows, index){
      if(index.children){
        for(let i = 0; i<index.children.length; i++){
          // console.log(index.children[i].event)
          this.$refs.multipleTable.toggleRowSelection(index.children[i]);
          this.handleSelectionChange("", index.children[i])
        }
      }
      // if(rows[0].children){
      //   console.log(rows[0].children)
      //   // this.$refs.multipleTable.toggleRowSelection(rows[0].children[0]);
      // }
    },
    get_current_click(e){
      this.$emit("current-change",e)
    },
    //  获取所有节点
    get_all_change(e){
      // console.log(e)
      this.$emit("get-all-selection",e)
    },
    edit(e){
      this.$emit("edit", e)
    },
    del(e){
      this.$emit("delete", e)
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
