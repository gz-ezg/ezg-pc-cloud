<template>
  <div>
    <Modal v-model="model2" @on-ok="ok" @on-cancel="cancel">
       <p>确定不需要装订吗？</p>
       <span>理由：</span>
       <Input v-model="value8" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="" />
    </Modal>
  </div>
</template>

<script>
export default {
    props:["model2"],
    methods: {
        ok(){
            this.$emit("model")
        }
    },
}
</script>