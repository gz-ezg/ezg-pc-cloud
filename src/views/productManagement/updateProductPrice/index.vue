<template>
  <div>{{this.$route.params.skuId}}</div>
</template>

<script>
export default {
  name: "updateProductPrice",
  data() {
    return {};
  },
  methods: {
      get_product_price(e){
          // 获取产品价格
      }
  },
  watch: {
      '$route'(to, from){
          this.get_product_price(to.params.skuId)
      }
  },
  created() {
      this.get_product_price(this.$route.params.skuId)
    // console.log(this.$route.params);
    // console.log(this.$route.query);
  }
};
</script>
