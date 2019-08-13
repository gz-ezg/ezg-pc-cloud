<template>
    <Card>
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
    </Card>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                animate: false,
                list: ["恭喜***asdasdas获得10积分", "恭喜***获得20积分", "恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分","恭喜***获得40积分"]
            }
        },
        methods:{

        },
        mounted() {
            let _self = this
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
    }
</script>

<style lang="less" scoped>

    div,
    ul,
    li,
    span,
    img {
        margin: 0;
        padding: 0;
        display: flex;
        box-sizing: border-box;
    }

    .marquee {
        width: 100%;
        height: 500px;
        align-items: center;
        color: #3a3a3a;
        background-color: #b3effe;
        display: flex;
        box-sizing: border-box;
    }

    .marquee_title {
        padding: 0 20px;
        height: 300px;
        font-size: 14px;
        border-right: 1px solid #d8d8d8;
        align-items: center;
    }

    .marquee_box {
        display: block;
        position: relative;
        width: 60%;
        height: 300px;
        overflow: hidden;
    }

    .marquee_list {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }

    .marquee_top {
        transition: all 0.5s;
        margin-top: -30px;
    }

    .marquee_list li {
        height: 300px;
        line-height: 300px;
        font-size: 14px;
        padding-left: 20px;
    }

    .marquee_list li span {
        padding: 0 2px;
    }

    .red {
        color: #ff0101;
    }

    .roll-msg {
        position: absolute;
        top: 0.4rem;
        width: 100%;
        height: 500px;
        display: flex;
        justify-content: center;

        .popup {
            border-radius: 20px;
            width: 45%;
            height: 25rem;
            min-width: 150px;
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