<template>
    <div>
        <div 
            id="capture" 
            style="width:375px;height:667px;background-color:#666666;color:#ffffff" 
            class="content" 
            @mousemove.prevent="mouseMoveState && mouseMoveFn($event)" 
            @mouseup.prevent="mouseMoveState && moseUpFn($event)">
            <center>
                <h1>这是测试页面</h1>
                <div>
                    <p
                        id="p1"
                        ref="p1" 
                        @mousedown="mousedownFn($event)"
                        style="position: absolute;top: 0px;left: 0px;padding:10px"
                    >你猜我是谁！</p>
                    <p id="p-2">不猜不猜我不猜！</p>
                    <p id="p-3">你猜我是谁！</p>
                    <p id="p-4">你猜我是谁！</p>
                    <p id="p-5">你猜我是谁！</p>
                </div>
                <h3 class="footer">哈哈哈！</h3>
            </center>
        </div>
        <div id="canvas"></div>
        <Button type="primary" @click="download">导出</Button>
        <!-- <a :href="img_href" id="img_src">导出的链接</a> -->
    </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
    data(){
        return {
            img_href: "",
            mouseMoveState: false,
            beginClientX: "",
            beginClientY: ""
        }
    },
    methods: {
        download(){
            html2canvas(document.querySelector("#capture")).then(canvas => {
                // document.querySelector("#canvas").appendChild(canvas)
                let dataURL = canvas.toDataURL("image/png");
                let temp = this.convertBase64UrlToBlob(dataURL)
                // this.img_href = URL.createObjectURL(temp)
                window.open(URL.createObjectURL(temp))
            });
        },
        convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
        //  拖拽部分
        mousedownFn(e){
            e.preventDefault && e.preventDefault();
            this.eleId = "#" + e.target.id
            console.log(document.querySelector(this.eleId).style.left.replace("px",""))
            console.log(document.querySelector(this.eleId).style.top.replace("px",""))
            this.mouseMoveState = true;
            this.beginClientX = document.querySelector(this.eleId).style.left.replace("px","")
            this.beginClientY = document.querySelector(this.eleId).style.top.replace("px","")
        },
        mouseMoveFn(e){
            if(this.mouseMoveState){
                console.log(e)
                let width = e.offsetX - this.beginClientX;
                let height = e.offsetY - this.beginClientY;
                console.log(width, height)
                if(width > 0 && width <= 375 && height > 0 && height <= 667){
                    console.log(e.target.id)
                    document.querySelector(this.eleId).style.left = width + 'px'
                    document.querySelector(this.eleId).style.top = height + 'px'
                }else{
                }
            }
        },
        moseUpFn(e){
            console.log(e)
            this.mouseMoveState = false
        }
    }
}
</script>

<style scoped>
.footer{
    position: absolute;
    bottom: 0;
    width: 100%
}
.content{
    position: relative;
}
</style>

