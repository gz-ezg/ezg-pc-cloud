<template>
    <div>
        <transition name="slide-fade">
            <div class="bg" @click="close" v-show="visible" v-if="mask"></div>
        </transition>
        <transition name="slide-fade">
            <Card class="content" :title="title" :style="mainStyles" v-show="visible">
                <slot></slot>
            </Card>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        width: {
            type: [Number, String],
            default: 256
        },
        mask: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: true,
        }
    },
    computed: {
        mainStyles() {
            let style = {};
            const width = parseInt(this.width);
            const styleWidth = {
                width: width <= 100 ? `${width}%` : `${width}px`
            };
            Object.assign(style, styleWidth);
            return style;
        }
    },
    methods: {
        close(){
            this.$emit('close');
        }
    }
}
</script>

<style>
.bg {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  z-index: 1000;
}
.content {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  width: 400px;
  /* background-color: aliceblue; */
  overflow-y: scroll;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

