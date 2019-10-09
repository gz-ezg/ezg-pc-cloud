<template>
    <div>
        <Card v-if="ringing">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px">电话正在拨打中...</div>
            </div>
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="width: 30px"><Icon class="animated infinite swing" type="ios-telephone" style="width: 30px;text-align: center;color: green"></Icon></div>
            </div>
        </Card>
        <Card v-if="link">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px;color: red">正在通话中...</div>
            </div>
            <!--<div style="font-size: 24px;display: flex;justify-content: center">-->
                <!--<div>{{endTime}}</div>-->
            <!--</div>-->
            <div style="font-size: 24px;display: flex;justify-content: center">
                <Icon type="volume-low" v-show="showLow"></Icon>
                <Icon type="volume-medium" v-show="showMedium"></Icon>
                <Icon type="volume-high" v-show="showHigh"></Icon>
            </div>
        </Card>
        <Card v-if="over">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px;color: red">通话结束！</div>
            </div>
            <div style="font-size: 24px;display: flex;justify-content: center">
                <Icon type="ios-telephone" style="color: red"></Icon>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "telAnimate",
        props:['ringing','link','over'],
        data(){
            return {
                showLow:true,
                showMedium:false,
                showHigh:false,
                time:{
                    hour:0,
                    min:0,
                    sec:0
                },
                endTime:""
            }
        },
        methods:{
            showLowF(){
                this.showLow = true
                this.showMedium = false
                this.showHigh = false
            },
            showMediumF(){
                this.showLow = false
                this.showMedium = true
                this.showHigh = false
            },
            showHighF(){
                this.showLow = false
                this.showMedium = false
                this.showHigh = true
            },
            controlShow(){
                setTimeout(()=>{
                    this.showLowF()
                }, 500);
                setTimeout(()=>{
                    this.showMediumF()
                }, 1000);
                setTimeout(()=>{
                    this.showHighF()
                }, 1500);
            },
            timer(){
                let str_hour = this.time.hour
                let str_min = this.time.min
                let str_sec = this.time.sec
                if (this.time.hour<10){
                    str_hour = "0" + this.time.hour
                }
                if (this.time.min<10){
                    str_min = "0" + this.time.min
                }
                if (this.time.sec<10){
                    str_sec = "0" + this.time.sec
                }
                this.endTime = str_hour + ":" + str_min + ":" + str_sec;
                this.time.sec++
                if (this.time.sec>59){
                    this.time.sec = 0;
                    this.time.min++
                }
                if (this.time.min>59){
                    this.time.min = 0;
                    this.time.hour++
                }
            }
        },
        created() {
            this.controlShow()
            setInterval(()=>{
                this.controlShow()
            }, 2000);
            setInterval(()=>{
                this.timer()
            }, 1000);
        }
    }
</script>

<style>

</style>