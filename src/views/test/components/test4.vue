<template>
    <div @click="close_right_menu">
        <div>canvas实现在线海报，文字指定位置添加部分</div>
        <!-- <img-edit></img-edit> -->
        <!-- <div style="width:375px;height:667px;background-color:#666666" @click.right.prevent="right_click($event)"></div> -->
        <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9000" type="primary" @click="add_text">新增文字</Button>
        <canvas id="myCanvas" width="375" height="667" style="border:1px solid #666666;" @click.right.prevent="right_click($event)">
        </canvas>
    </div>
</template>

<script>
// import ImgEdit from '../../my-components/image-editor/image-editor'

export default {
    components: {
        // ImgEdit
    },
    data(){
        return {
            right_click_show: false,
            rightTop: "",
            rightLeft: "",
            el: "",
            ctx: "",
            event,
            current: "12345"
        }
    },
    methods: {
        right_click(event){
            console.log(event)
            this.event = event
            this.right_click_show = true
            this.rightTop = event.y
            this.rightLeft = event.x
        },
        add_text(){
            console.log("123")
            //  设置下一次画笔颜色
            //  以下属性均可以自定义，同事layerY必须加上font-size的大小，否则会出现异常
            this.ctx.fillStyle = 'red'
            this.ctx.font="30px Arial";
            this.ctx.fillText("Hello World",this.event.layerX,this.event.layerY+30);
        },
        close_right_menu(){
            this.right_click_show = false
        },
    },
    mounted(){
        this.el = document.getElementById("myCanvas")
        this.ctx = this.el.getContext("2d")
        this.ctx.fillStyle="#666666";
        this.ctx.fillRect(0,0,375,667);
    }
}
</script>
