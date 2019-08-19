<template>
    <Card>
        <div style="display: flex;justify-content: center;align-items: center; height:500px;width: 1000px;color: rgb(235, 62, 61);" v-if="!endTime">
            <div style="font-size: 36px;font-weight: bold">活动暂未开始，敬请期待！</div>
        </div>
        <div style="display: flex;justify-content: space-between" v-if="endTime">
            <div style="width: 550px;height: 500px">
                <Card style="width: 500px;height: 400px;display: flex;align-items: center">
                    <div style="width: 467px;display: flex;margin-bottom: 150px" v-if="showCountDown">
                        <div style="font-weight: bold;font-size: 16px;margin-right: 5px">
                            距离抢线索还有：
                        </div>
                        <count-down :endTime="endTime" :startTime="startTime" :endMsg="endMsg"></count-down>
                    </div>
                    <div style="width: 467px;margin-bottom: 150px" v-if="showNum">
                        <div style="width: 467px;display: flex;justify-content: space-between;font-weight: bold;font-size: 16px">
                            <div>公海池还剩余xx条</div>
                            <div>你已领取xxx条</div>
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
                :draggable="true"
                :mask="false"
                :mask-closable="false"
                class-name="vertical-top-modal"
        >
            134
            <div slot="footer">
                <Button type="primary" @click="sure">确定</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import CountDown from './common/countDown'
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
                endTime:"",
                startTime:"",
                endMsg:"aaa",
                disabled:false,
                showCountDown:true,
                showNum:false,
                list: ["恭喜***asdasdas获得10积分","恭喜***asdasdas获得10积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分","恭喜***获得20积分"]
            }
        },
        methods:{
            receive(){
                this.disabled = true
                this.showModal = true
            },
            sure(){
                this.showModal = false
                this.disabled = false
            }
        },
        mounted(){
            this.$Notice.config({
                top: 500,
            });
        },
        created() {
            let _self = this
            _self.endTime = new Date('2019-08-14 19:49:00').getTime()
            _self.startTime = new Date().getTime()
            if (this.endTime - this.startTime<0 || this.endTime - this.startTime ==0){
                this.showCountDown = false
                this.showNum = true
            }
            console.log(_self.endTime)
            if (_self.list.length>24){
                const timer = setInterval(() => {
                    this.animate = true;

                    setTimeout(() => {
                        _self.list.push(this.list[0],this.list[1]);
                        _self.list.shift();
                        _self.list.shift();
                        _self.animate = false;
                        console.log(Math.random());
                    }, 500);
                }, 300);
                this.$once("hook:beforeDestroy", () => {
                    clearInterval(timer);
                });
            }

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
        top: 450px;
        margin-left: 350px;
    }
    .ivu-modal-content{
    border: 1px solid #e9eaec;

    }
    .ivu-modal-mask{
        background-color: #ffffff;
        display: none!important;

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