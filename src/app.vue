<template>
    <div id="app" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tip: true,
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
        
        },
        created () {

        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
/* body .ivu-modal .ivu-select-dropdown{
  position: fixed !important;
} */
</style>
