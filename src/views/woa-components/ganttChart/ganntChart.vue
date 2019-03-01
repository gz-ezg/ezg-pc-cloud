<template>
    <div>
        <Card>
            <div id="container">
                <div class="carNum">
                    <div style="background:#ccc;height:30px;line-height:30px">服务人员</div>
                    <div style="line-height:30px;background:#ccc;" v-for="(x, index) in event" :key="index">{{x.carNum}}</div>
                </div>
                <div id="hour">
                    <div>
                        <div v-for="x in 23" :key="x" v-if="x>7&&x<21">{{x}}:00</div>
                    </div>
                    <template v-for="(x, index) in event">
                        <div :key="index" style="line-height:30px;border-left:1px solid #ddd">
                            <div v-for="(x2, index2) in x.innerData" 
                                :key="index2" 
                                @click.stop="eventClick(x2, $event)"
                                :style="{
                                    width:x2.width,
                                    'background-color': x2.bg,
                                    'margin-left': x2.leftOffset,
                                }"><slot name="eventBox" :event="x2">{{x2.value}}<Icon type="ios-close-outline" style="padding-left:5px" @click.stop="iconClose(x2)" v-if="closable"></Icon></slot></div>
                        </div>
                    </template>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    props: {
        closable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let demoData = [
            {
                carNum: '陈志超',
                innerData: [
                    {
                        start: '2019/1/21 8:23',
                        end: '2019/1/21 9:45',
                        value: '五山税务所',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 12:23',
                        end: '2019/1/21 16:45',
                        value: '工商银行博展分行',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 20:00',
                        end: '2019/1/21 21:35',
                        value: '航天信息',
                        bg: '#fff'
                    }
                ]
            },
            {
                carNum: '测财商',
                innerData: [
                    {
                        start: '2019/1/21 9:00',
                        end: '2019/1/21 10:00',
                        value: '农业银行',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 11:00',
                        end: '2019/1/21 14:00',
                        value: '天河科技园',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 19:00',
                        end: '2019/1/22 20:35',
                        value: '客户',
                        bg: '#fff'
                    },
                ]
            }
        ]
        return {
            data: demoData,
            event: []
        }
    },
    methods: {
        events() {
            let res = []
            this.data.forEach((item)=>{
                let tempObj = {}
                tempObj['carNum'] = item.carNum
                tempObj['innerData'] = []
                item.innerData.forEach((item2)=>{
                    let _left = tempObj.innerData[tempObj.innerData.length-1] ? tempObj.innerData[tempObj.innerData.length-1].allWidth + 0.5 : 0
                    let temp = {}
                    temp['start'] = item2.start
                    temp['end'] = item2.end
                    temp['value'] = item2.value
                    temp['bg'] = item2.bg
                    let startTime = new Date(item2.start)
                    let endTime = new Date(item2.end)
                    let startH = startTime.getHours()
                    let startM = startTime.getMinutes()
                    let endH = endTime.getHours() || startH + 1
                    let endM = endTime.getMinutes() || startM
                    if(endH > 20){
                        endH = 20
                        endM = 59
                    }
                    let leftOffset = 90 * (startH - 8) + startM * 1.5
                    let width = (endH - 8) * 90 + endM * 1.5 - leftOffset
                    let allWidth = leftOffset + width

                    temp['allWidth'] = allWidth
                    temp['leftOffset'] = leftOffset - _left + 'px'
                    temp['width'] = width + 'px'
                    temp['startTime'] = startTime
                    temp['endTime'] = endTime
                    temp['startH'] = startH
                    temp['startM'] = startM
                    temp['endH'] = endH
                    temp['endM'] = endM
                    tempObj.innerData.push(temp)
                })
                res.push(tempObj)
            })
            console.log(res)
            this.event = res
        },
        eventClick(event, jsEvent){
            // console.log(event, jsEvent)
            this.$emit('event-click', event, jsEvent)
        },
        iconClose(event){
            this.$emit('icon-close', event)
        }
    },
    created() {
        this.events()
    },
    mounted() {

    },
}
</script>

<style type="text/css">
#container {
  width: 100%;
  /* overflow: scroll; */
  height: calc(100vh - 0px);
  width: 1310px;
}
.carNum {
  float: left;
  width: 120px;
  text-align: center;
}
#hour {
  width: 1290px;
  /* overflow-x: scroll; */
}
#hour>div{
  width: 1290px;
  height: 30px;
  /* border-left: 1px solid #ddd; */
  background: #ccc;
  text-align: center;
  box-sizing: border-box;
}
#hour>div>div {
  width: 90px;
  height: 30px;
  line-height: 30px;
  float: left;
  border-left: 1px solid #ddd;
  background: #ccc;
  text-align: center;
  box-sizing: border-box;
}
.gantt-item {
  width: 1250px;
}
.gantt-item:hover {
  background: rgba(0, 0, 0, 0.1);
}
.gantt-item span {
  height: 20px;
  display: inline-block;
  margin: 5px 0px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: green;
}
.nowTime {
  border: 1px solid green;
  display: inline-block;
  height: 500px;
  height: calc(100vh - 0px);
  position: absolute;
  top: 0px;
}
</style>