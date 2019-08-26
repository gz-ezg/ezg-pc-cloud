<template>
  <div>
    <Table
      height="400"
      border
      ref="selection"
      :columns="header"
      :data="data"
      :loading="loading"
      @on-selection-change="selectionChange"
    ></Table>
    <Button @click="handleSelectAll(true)">设置全选</Button>
    <Button @click="handleSelectAll(false)">取消全选</Button>
  </div>
</template>

<script>
import * as userApi from '../api/user.js';
export default {
  data() {
    return {
      header: [
        {
          type: 'selection',
          width: 60
        },
        {
          title: 'sku',
          key: 'alisname',
          filters: [{ label: '一般纳税人零申报', value: 87 }],
          filterMethod(value, { linkPropertys }) {
            return linkPropertys.indexOf(value) !== -1;
          }
        }
      ],
      data: [],
      loading: false,
      filterArr: [{ label: '一般纳税人零申报', value: 87 }]
    };
  },
  computed: {
    userId() {
      return this.$store.state.serveManagement.userId;
    },
    productId() {
      return this.$store.state.serveManagement.productId;
    },
    data() {
      return this.$store.state.serveManagement.data;
    }
  },
  watch: {
    productId: {
      handler() {
        this.select_product();
      },
      deep: true
    }
  },
  methods: {
    select_product() {
      this.get_product_sku();
      this.getProductId();
    },
    selectionChange(selection) {
      let _self = this;
      _self.productSkuIds = [];
      for (let i = 0; i < selection.length; i++) {
        _self.productSkuIds.push(selection[i].id);
      }

      this.$store.commit('serveManagement/addProductSkuIds', JSON.stringify(_self.productSkuIds));
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    async getProductId() {
      let config = {
        params: {
          productId: this.productId
        }
      };
      let resp = await userApi.queryPropertyByProductId(config);
      console.log(resp);
      this.filterArr = resp.reduce((arr, v) => [...arr, ...v.children], []).map(v => ({ value: v.pvId, label: v.propertyValue }));
      console.log(this.filterArr);

      let configs = this.header[1];
      configs.filters = this.filterArr;
      this.header.splice(1, configs);
    },
    async get_product_sku() {
      let _self = this;
      _self.loading = true;
      let config = {
        params: {
          productId: _self.productId,
          userId: _self.userId
        }
      };

      let res = await userApi.getPorductSKU(config);
      let data = res;
      for (let i = 0; i < data.length; i++) {
        if (data[i].flag === 'Y') {
          data[i]._checked = true;
        }
      }
      _self.data = data;
      _self.loading = false;
    }
  },
  created() {
    let _self = this;

    this.$bus.on('CLEAR_DATA', e => {
      _self.data = [];
    });
  }
};
</script>

<style>
</style>
