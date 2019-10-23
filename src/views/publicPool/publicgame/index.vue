<template>
    <Card>
        <div style="display: flex;justify-content: center;align-items: center; height:500px;width: 1000px;color: rgb(235, 62, 61);" v-if="!data">
            <div style="font-size: 36px;font-weight: bold">活动暂未开始，敬请期待！</div>
        </div>
        <div style="display: flex;justify-content: space-between" v-if="endTime">
            <div style="width: 550px;height: 500px">
                <Card style="width: 500px;height: 400px;display: flex;align-items: center">
                    <div style="width: 467px;padding-bottom: 20px;font-weight: bold">
                        <div>活动内容：{{data.content}}</div>
                        <div>参与部门：{{data.departname}}</div>
                        <div>您还能领取：<span style="color: red;margin:0 4px 0 0">{{recept}}</span>条</div>
                    </div>
                    <div style="width: 467px;display: flex;margin-bottom: 150px" v-if="showCountDown">
                        <div style="font-weight: bold;font-size: 16px;margin-right: 5px">
                            距离抢线索还有：
                        </div>
                        <count-down :endTime="endTime" :startTime="startTime" :endMsg="endMsg"></count-down>
                    </div>
                    <div style="width: 467px;margin-bottom: 150px" v-if="showNum">
                        <div style="width: 467px;display: flex;justify-content: space-between;font-weight: bold;font-size: 16px">
                            <div>公海池还剩余<span style="color: red;padding: 0 2px 0 2px">{{num}}</span>条</div>
                            <div>您已领取<span style="color: red;padding: 0 2px 0 2px">{{amount}}</span>条</div>
                        </div>
                    </div>
                    <div style="display: flex;justify-content: center">
                        <Button type="primary" disabled v-if="showCountDown">活动即将开始</Button>
                        <Button type="primary" size="large" style="width: 150px" v-if="showNum" @click="receive" :disabled="disabled">领取</Button>
                    </div>
                </Card>
            </div>
            <div class="roll-msg">
                <div class="popup">
                    <div class="box">
                        <ul class="lb" :class="{marquee_top:animate}">
                            <li v-for="(item, index) in list" >
                                <div class="a">{{list[index+index]}}</div>
                                <div class="b">{{list[index+index+1]}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
        <Modal
                v-model="showModal"
                type="info"
                title="提示"
                width="250"
                :closable="false"
                :draggable="true"
                :mask="false"
                :mask-closable="false"
                class-name="vertical-top-modal"
        >
            {{msg}}
            <div slot="footer">
                <Button type="primary" @click="sure">确定</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import {Service} from "../../../api/Service";
    import CountDown from './common/countDown'
    let serviceApi = new Service('socket');
    export default {
        name: "index",
        components: {CountDown},
        props:{
          CountDown
        },
        data(){
            return{
                showModal:false,
                animate: false,
                data:{
                    activity_time:"",
                    now:"",
                    amount:"",
                    num:"",
                },
                amount:"",
                num:"",
                recept:'',
                msg:"",
                endTime:"",
                startTime:"",
                endMsg:"aaa",
                disabled:false,
                showCountDown:true,
                showNum:false,
                list: []
            }
        },
        methods:{
            get_data(){
                let _self = this;
                let url = `api/customer/highseasActivity/startList`;
                let config = {
                    params: {
                        // page: _self.page,
                        // pageSize: _self.pageSize,
                    }
                }

                function success(res){
                    _self.data = res.data.data
                    if (_self.data ) {
                        _self.amount = _self.data.amount
                        _self.num = _self.data.num
                        _self.recept = res.data.data.recept
                        _self.endTime = _self.data.activity_time
                        _self.startTime = _self.data.now
                        if (new Date(_self.endTime) - new Date(_self.startTime)<=0){
                            _self.showCountDown = false
                            _self.showNum = true
                        }
                    }

                    // _self.pageTotal = res.data.data.total
                    // _self.loading = false
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            receive(){
                this.disabled = true
                this.go()
            },
            go(){
                let _self = this;
                let formdata = new FormData()
                let url = `api/customer/highseasActivity/go`;
                formdata.append("activityId", _self.data.id)

                function success(res){
                    if (res.data.msgCode==50000){
                        _self.showModal = false
                        _self.disabled = false
                    }
                    if (res.data.msgCode==40000) {
                        _self.showModal = true
                       _self.msg = res.data.msg
                        if (res.data.data) {
                            _self.amount = res.data.data.amount
                            _self.num = res.data.data.num
                            _self.recept = res.data.data.recept
                            if (res.data.data.end){
                                setTimeout(()=>{
                                    _self.sync_data()
                                },5000)
                            }
                        }
                    }
                    // _self.pageTotal = res.data.data.total
                    // _self.loading = false
                }

                function fail(err){

                }

                this.$Post(url, formdata, success, fail)
            },
            sync_data(){
                let _self = this;
                let url = `api/customer/highseasActivity/synchronizedDate`;
                let config = {
                    params: {

                    }
                }

                function success(res){

                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            sure(){
                this.showModal = false
                this.disabled = false
            },
            async initWebSocket() {
                const { port, key } = await serviceApi.auth();
                const wsuri = `ws://cloud.zgcfo.com:${port}/highseasActivity/websocket`;
                // const wsuri = `ws://192.168.0.220:${port}/highseasActivity/websocket`;
                // const wsuri = `ws://192.168.2.89:${port}/highseasActivity/websocket`;
                this.websock = new WebSocket(wsuri);
                console.log(this.websock)
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            async websocketonmessage(e) {
                console.log(e.data)
                try {
                    let _self = this
                    _self.list.push("恭喜"+e.data+"领取了一条线索")
                    if (_self.list.length>24){
                        // const timer = setInterval(() => {
                        //     this.animate = true;
                        //
                        //     setTimeout(() => {
                        //         _self.list.push(this.list[0],this.list[1]);
                        //         _self.list.shift();
                        //         _self.list.shift();
                        //         _self.animate = false;
                        //         console.log(Math.random());
                        //     }, 500);
                        // }, 300);
                        // this.$once("hook:beforeDestroy", () => {
                        //     clearInterval(timer);
                        // });
                        _self.animate = true
                        setTimeout(() => {
                                    _self.list.shift();
                                    _self.animate = false;
                                }, 100);
                        // _self.animate = false;
                    }
                } catch (error) {}


            },
            websocketonopen() {
                this.websocketsend('打开链接');
            },
            websocketsend(Data) {
                //数据发送
                this.websock.send(Data);
            },
            websocketonerror() {
                setTimeout(() => {
                    this.initWebSocket();
                }, 300000);
            },
            websocketclose(e) {
                console.log('断开连接', e);
            }
        },
        mounted(){
            this.$Notice.config({
                top: 500,
            });
        },
        created() {
            let _self = this
            _self.initWebSocket()
            _self.get_data()
            // _self.endTime = new Date('2019-08-14 19:49:00').getTime()
            // _self.startTime = new Date().getTime()
            // if (_self.list.length>24){
            //     const timer = setInterval(() => {
            //         this.animate = true;
            //
            //         setTimeout(() => {
            //             _self.list.push(this.list[0],this.list[1]);
            //             _self.list.shift();
            //             _self.list.shift();
            //             _self.animate = false;
            //             console.log(Math.random());
            //         }, 500);
            //     }, 300);
            //     this.$once("hook:beforeDestroy", () => {
            //         clearInterval(timer);
            //     });
            // }

            this.$bus.off("UPDATE_GAME_INDEX",true)
            this.$bus.on("UPDATE_GAME_INDEX",e =>{
                this.showCountDown = false
                this.showNum = true
            })

        }
    }
</script>

<style lang="less">
    .vertical-top-modal .ivu-modal{
        top: 220px;
        margin-left: 350px;
    }
    .ivu-modal-content{
    border: 1px solid #e9eaec;
    }
    .ivu-modal-mask{
        background-color: #ffffff;
        display: none!important;

    }

    .marquee_top {
        transition: all 0.1s;
        margin-top: -30px;
    }
    .roll-msg {
        height: 500px;
        min-width: 550px;

        .popup {
            border-radius: 4px;
            height: 25rem;
            min-width: 550px;
            align-items: center;
            color: #fff;
            background-color: rgb(10, 10, 10, 0.1);
            opacity: 0.7;
            display: flex;
            box-sizing: border-box;

            .box {
                display: block;
                position: relative;
                padding: 0 .3rem;
                width: 100%;
                height: 300px;
                overflow: hidden;

                .lb {
                    width: 100%;
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;


                    li{
                        display: flex;
                        justify-content: center;
                        margin-top: 4px;
                    }
                        .a{
                            display: inline-block;
                        }
                        .b{
                            display: inline-block;
                            margin-left: 25px;
                        }
                }
            }
        }
    }
</style>