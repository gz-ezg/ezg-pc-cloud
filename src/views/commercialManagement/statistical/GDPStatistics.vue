<!--生产总值统计-->
<template>
    <div style="width:100%;height:100%;" id="GDP">
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
                let visiteVolume = echarts.init(document.getElementById('GDP'));
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
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['订单总值','工单总值']
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2017.06','2017.07','2017.08','2017.09','2017.10','2017.11','2017.12']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ,000'
                        }
                    },
                    series: [
                        {
                            name:'订单总值',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'工单总值',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
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
            // console.log(this.time)
            /*this.$nextTick(() => {

            });*/
        }
}
</script>
