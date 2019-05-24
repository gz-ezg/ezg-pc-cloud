<template>
    <div>
        <Row>
            <Col span="12">
                <Card title="效果预览">
                    <center style="margin-top:30px">
                        <div 
                            id="capture" 
                            style="width:375px;height:667px;color:#ffffff;overflow:hidden"
                            :style="{ backgroundImage:imgUrl, backgroundColor: backgroundColor}"
                            class="content" 
                            @mousemove.prevent=" (current == 1 || current == 2) && mouseMoveState && mouseMoveFn($event)" 
                            @mouseup.prevent="mouseMoveState && moseUpFn($event)">
                            <!-- <div v-for="(item, index.vue) in imgaeArray" :key="index.vue" @mousedown="mousedownFn($event)" :id="`image-${index.vue}`" @click.right.prevent="remove_img(index.vue)" :style="{backgroundImage: item.img, width: item.width+'px',height:item.height+'px'}" style="background-repeat:no-repeat;background-size:100%;"> -->
                            <div v-for="(item, index) in imgaeArray" :key="index" v-html="item.imageDom.outerHTML" @mousedown="mousedownImg(item.imageDom, index, $event)" :id="`image-${index}`" @click.right.prevent="remove_img(index)"></div>
                                <h1 id="p-99999" @mousedown="mousedownFn($event)">这是测试页面</h1>
                                <p
                                    id="p1"
                                    ref="p1" 
                                    @mousedown="mousedownFn($event)"
                                ><a href="#" id="p1" style="color:#fff">你猜我是谁！</a></p>
                                <!-- <p id="p-2" @mousedown="mousedownFn($event)">不猜不猜我不猜！</p>
                                <p id="p-3" @mousedown="mousedownFn($event)">你猜我是谁！</p>
                                <p id="p-4" @mousedown="mousedownFn($event)">你猜我是谁！</p>
                                <p id="p-5" @mousedown="mousedownFn($event)">你猜我是谁！</p> -->
                                <div v-for="(item, index) in textArray" :key="index" @mousedown="mousedownFn($event)" :id="`p-${index}`" @click.right.prevent="remove(index)">
                                    <a :id="`p-${index}`" :style="{color: item.color, fontSize: item.fontSize + 'px'}" :href="item.url" target="_blank" v-if="item.url">{{item.text}}</a>
                                    <span :id="`p-${index}`" :style="{color: item.color, fontSize: item.fontSize + 'px'}" v-else>{{item.text}}</span>
                                </div>
                        </div>
                    </center>
                </Card>
            </Col>
            <Col span="12">
                <Card title="操作区">
                    <Steps :current="current">
                        <Step title="背景图" icon="camera"></Step>
                        <Step title="编辑图片" icon="image"></Step>
                        <Step title="编辑文字" icon="edit"></Step>
                        <Step title="生成个性主页" icon="camera"></Step>
                    </Steps>
                    <div style='margin-top:20px'>
                        <div v-if="current == 0">
                            <Upload
                                ref="upload"
                                multiple
                                :before-upload="handleUpload"
                                action="/api/customer/addCustomerContentImg"
                                >
                            <Button type="primary" icon="ios-cloud-upload-outline">上传背景图</Button>
                        </Upload>
                        <Row>
                            或选择背景色：<ColorPicker v-model="backgroundColor"></ColorPicker>
                        </Row>
                        <Button type="primary" style="margin-top:20px" @click="current = 1">下一步</Button>
                        </div>
                        <div v-if="current == 1">
                            <Upload
                                ref="upload"
                                multiple
                                :before-upload="upload_img"
                                action="/api/customer/addCustomerContentImg"
                                >
                            <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                        <Row>
                            <Row><span>当前选中的图片属性</span></Row>
                            <Row>
                                <Col span="4">witdh:</Col>
                                <Col span="8"><Input v-model="currentImg.width"/></Col>
                                <Col span="4">height:</Col>
                                <Col span="8"><Input v-model="currentImg.height"/></Col>
                                <Col span="4">缩放:</Col>
                                <Col span="8"><Input v-model="scale"/></Col>
                                <Button @click="change_img">修改</Button>
                            </Row>
                        </Row>
                        <Button type="primary" style="margin-top:20px" @click="current = 0">上一步</Button>
                        <Button type="primary" style="margin-top:20px" @click="current = 2">下一步</Button>
                        </div>
                        <div v-else-if="current == 2">
                            <Tag color="blue" style="margin-bottom:10px">温馨提示：左侧面板中，文字可以任意拖动！右键点击文字可以清除！</Tag>
                            <div style="margin-top:10px">
                                <Row :gutter="12">
                                    <Col span="12">
                                        文字大小：
                                        <Select v-model="tempTextSize" style="width:100px">
                                            <Option v-for="(item, index) in fontSizeArray" :key="index" :value="item.size">{{item.text}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12">
                                        字体颜色：
                                        <ColorPicker v-model="tempColor"></ColorPicker>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="margin-top:10px">
                                    <Col>
                                        <Input type="textarea" placeholder="请输入文字" v-model="tempText"/>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="margin-top:10px">
                                    <Col><Tag color="blue" style="margin-bottom:10px">如果设置了url地址，请拖动文字附近空白区域，防止链接跳转</Tag></Col>
                                    <Col>
                                        <Input type="textarea" placeholder="请输入超链接" v-model="tempUrl"/>
                                    </Col>
                                </Row>
                                <Row :gutter="12" style="margin-top:10px">
                                    <Col>
                                        <Button long type="primary" @click="add_text_model">添加</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Button type="primary" style="margin-top:20px" @click="current = 1">上一步</Button>
                            <Button type="primary" style="margin-top:20px" @click="current = 3">下一步</Button>
                        </div>
                        <div v-else>
                            <Row>
                                <Button type="primary" @click="download" style="width:375px;margin-top:20px">导出</Button>
                            </Row>
                            <Row>
                                <Button type="primary" style="margin-top:20px" @click="current = 2">上一步</Button>
                            </Row>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <div id="canvas"></div>
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
            beginClientY: "",
            transformX: "",
            transformY: "",
            current: 1,
            imgUrl: "",
            tempColor: "#000000",
            tempText: "",
            tempUrl: "",
            tempTextSize: 18,
            backgroundColor: "#666666",
            textArray: [],
            fontSizeArray: [
                { text: "12px", size: 12 },
                { text: "14px", size: 14 },
                { text: "16px", size: 16 },
                { text: "18px", size: 18 },
                { text: "20px", size: 20 },
                { text: "22px", size: 22 },
                { text: "24px", size: 24 },
                { text: "26px", size: 26 },
                { text: "28px", size: 28 },
                { text: "30px", size: 30 },
                { text: "32px", size: 32 },
                { text: "34px", size: 34 },
                { text: "36px", size: 36 },
                { text: "38px", size: 38 },
            ],
            imgaeArray: [],
            //  当前选中的图片
            currentImg:{
                width: "",
                height: ""
            },
            scale: 1,
        }
    },
    methods: {
        //  下载
        download(){
            html2canvas(document.querySelector("#capture")).then(canvas => {
                // document.querySelector("#canvas").appendChild(canvas)
                let dataURL = canvas.toDataURL("image/png");
                let temp = this.convertBase64UrlToBlob(dataURL)
                // this.img_href = URL.createObjectURL(temp)
                // window.open(URL.createObjectURL(temp))
                let tempDom = document.querySelector("#capture")
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
        //  拖拽图片初始化
        mousedownImg(imageTemp,index,e){
            this.currentImg = imageTemp
            console.log(e)
            e.preventDefault && e.preventDefault();
            this.eleId = "#" + e.target.id
            this.mouseMoveState = true;
            let bodyDom = document.querySelector(this.eleId)
            this.transformX = 0
            this.transformY = 0
            let transform = /\(.*\)/.exec(bodyDom.style.transform)
            if (transform) {
                transform = transform[0].slice(1, transform[0].length - 1)
                let splitxy = transform.split('px, ')
                this.transformX = parseFloat(splitxy[0])
                this.transformY = parseFloat(splitxy[1].split('px')[0])
            }
            this.beginClientX = e.pageX
            this.beginClientY = e.pageY
        },
        //  拖拽部分
        mousedownFn(e){
            e.preventDefault && e.preventDefault();
            this.eleId = "#" + e.target.id
            this.mouseMoveState = true;
            let bodyDom = document.querySelector(this.eleId)
            this.transformX = 0
            this.transformY = 0
            let transform = /\(.*\)/.exec(bodyDom.style.transform)
            if (transform) {
                transform = transform[0].slice(1, transform[0].length - 1)
                let splitxy = transform.split('px, ')
                this.transformX = parseFloat(splitxy[0])
                this.transformY = parseFloat(splitxy[1].split('px')[0])
            }
            this.beginClientX = e.pageX
            this.beginClientY = e.pageY
        },
        mouseMoveFn(e){
            if(this.mouseMoveState){
                let xOffset = e.pageX - this.beginClientX + this.transformX
                let yOffset = e.pageY - this.beginClientY + this.transformY
                let scale = 1
                let bodyDom = document.querySelector(this.eleId)
                // console.log(this.eleId.indexOf("image") )
                if(this.eleId.indexOf("image") == 1){
                    console.log(bodyDom.style.getPropertyValue("transform").indexOf("scale") != "-1")
                    if(bodyDom.style.getPropertyValue("transform").indexOf("scale") != -1){
                        console.log("success")
                    }
                }
                //  计划作为界限判断，放弃
                // if(xOffset > 0 && xOffset <= 375 && yOffset > 0 && yOffset <= 667){
                // let bodyDom = document.querySelector(this.eleId)
                // console.log(bodyDom.style.getPropertyValue("transform"))
                // for(x in bodyDom.style){
                //     console.log(`${x}=>${bodyDom[x]}`)
                // }
                bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`
            }
        },
        moseUpFn(e){
            this.mouseMoveState = false
        },
        //  背景图上传
        handleUpload(file){
            let _self = this
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let filename = file.name
            reader.onload = function(e){
                var imgMsg = {
                    name: filename,
                    src: this.result
                }
                _self.imgUrl = `url(${this.result})`
            }
            return false;
        },
        //  上传图片
        upload_img(file){
            let _self = this
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let filename = file.name
            reader.onload = function(e){
                let image = new Image()
                // let width
                // let height
                image.src = e.target.result
                image.onload = function (){
                    // console.log(this.width, this.height)
                    return new Promise((resolve, reject) => {
                        _self.width = this.width
                        _self.height = this.height
                        // for(let x in this){
                        //     console.log(x, this[x])
                        // }
                        if(this.width > 375){
                            let radio = 375/this.width
                            this.width = 375
                            this.height = this.height*radio
                        }
                        let len = _self.imgaeArray.length
                        this.id = `image-${len}`
                        _self.imgaeArray.push({
                            imageDom: this,
                            width: this.width,
                            height: this.height,
                        })
                        resolve()
                    })
                }
                // var imgMsg = {
                //     name: filename,
                //     src: this.result
                // }
                
            }
            return false;
        },
        //  文字生成
        add_text_model(){
            this.textArray.push({
                text: this.tempText,
                color: this.tempColor,
                fontSize: this.tempTextSize,
                url: this.tempUrl
            })
        },
        //  移除文字
        remove(e){
            // this.textArray[e].text = ""
            this.textArray.splice(e, 1)
        },
        //  移除图片
        remove_img(e){
            this.imgaeArray.splice(e, 1)
        },
        change_img(){
            this.$set(this.imgaeArray[0].imageDom, "width", 100)
            // this.$nextTick()
            console.log(this.imgaeArray[0].imageDom.width)
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

