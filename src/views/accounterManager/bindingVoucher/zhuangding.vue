<template>
  <div>
     <Modal v-model="model3" width="1000">
    <p slot="header" style="color:#f60;text-align:center"></p>
    <div style="text-align:center;display:flex;">
      11
    </div>
    <div slot="footer">
      <Button type="primary" :loading="loading" @click="zhuang">装订</Button>
    </div>
  </Modal>
  </div>
</template>

<script>
export default {
    props:["model3"],
    methods: {
        zhuang(){
            this.$emit("model2")
        }
    },
}
</script>