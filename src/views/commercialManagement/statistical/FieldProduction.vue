<!--    外勤产值分析    -->
<!--  完成情况统计  -->
<template>
    <div style="width:100%;height:100%;" id="FieldProduction">
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'visiteVolume',
        props:['time'],
        data () {
            return {
                //
                customerTypeGroupData: [],
                customerT: 0,
            };
        },
        methods: {
        //     getEchartsData() {
        //         let _self = this
        //         let url = '/channel/type/queryUserChannel'

        //         function doSuccess(re) {
        //             let url2 = '/customer/groupQueryByChannelId?channelTypeId='+re.data.data[0].id+'&reportTypes=customerTypeGroup'

        //             function doSuccess2(re) {
        //                 let _data = re.data.data.customerTypeGroup
        //                 // console.log(re)
        //                 for (let i = 0; i < _data.length; i++) {
        //                     let _color = ''
        //                     _self.customerT = _self.customerT + parseInt(_data[i].value)

        //                     _self.customerTypeGroupData.push({
        //                         value: _data[i].value,
        //                         name: _data[i].name,
        //                     })
        //                 }
        //                 _self.getEcharts()
        //             }

        //             _self.GetData(url2, doSuccess2)
        //         }

        //         this.GetData(url, doSuccess)
        //     },

            getEcharts() {
                let visiteVolume = echarts.init(document.getElementById('FieldProduction'));
                // let _self = this
                // let xAxisData = [];
                // let data1 = [];
                // let data2 = [];
                // for (let i = 0; i < 20; i++) {
                //     xAxisData.push('类目' + i);
                //     data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                //     data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                // }

                let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['命中外勤','额外外勤','无效外勤']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['公司注册','工商变更','地址变更','国地税报到','解非','CA代办','公司注销']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'命中外勤',
                            type:'bar',
                            stack: '产值分析',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'额外外勤',
                            type:'bar',
                            stack: '产值分析',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'无效外勤',
                            type:'bar',
                            stack: '产值分析',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        }
                    ]
                };


                visiteVolume.setOption(option);

                window.addEventListener('resize', function () {
                    visiteVolume.resize();
                });
            }
        },
        mounted () {
            // console.log('11')
            this.getEcharts()
            // this.getEchartsData()
            // console.log('22')
            /*this.$nextTick(() => {

            });*/
        }
}
</script>


