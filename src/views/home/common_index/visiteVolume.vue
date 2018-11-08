<template>
    <ve-bar style="width:95%;height:100%;" id="visite_volume_con" :data="chartData" :settings="chartSettings"></ve-bar>
</template>

<script>
// import echarts from 'echarts';
import VeBar from 'v-charts/lib/bar.common'
export default {
    components: {
        VeBar
    },
    name: 'visiteVolume',
    data () {
        this.chartSettings = {
                labelMap: {
                    'value': '访问量',
                },
                // dataOrder: true
            }
        return {
            //
            
            chartData: {
                columns: ['name', 'value'],
                rows: [
                    {value: 110, name: '星期日', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 130, name: '星期六', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 790, name: '星期五', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 749, name: '星期四', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 750, name: '星期三', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 695, name: '星期二', itemStyle: {normal: {color: '#2d8cf0'}}},
                    {value: 740, name: '星期一', itemStyle: {normal: {color: '#2d8cf0'}}},
                ]
            }
        };
    },
    mounted () {
        // this.$nextTick(() => {
        //     let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
        //     let xAxisData = [];
        //     let data1 = [];
        //     let data2 = [];
        //     for (let i = 0; i < 20; i++) {
        //         xAxisData.push('类目' + i);
        //         data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        //         data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        //     }

        //     const option = {
        //         tooltip: {
        //             trigger: 'axis',
        //             axisPointer: {
        //                 type: 'shadow'
        //             }
        //         },
        //         grid: {
        //             top: 0,
        //             left: '2%',
        //             right: '4%',
        //             bottom: '3%',
        //             containLabel: true
        //         },
        //         xAxis: {
        //             type: 'value',
        //             boundaryGap: [0, 0.01]
        //         },
        //         yAxis: {
        //             type: 'category',
        //             data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        //             nameTextStyle: {
        //                 color: '#c3c3c3'
        //             }
        //         },
        //         series: [
        //             {
        //                 name: '访问量',
        //                 type: 'bar',
        //                 data: [
        //                     {value: 453682, name: 'Mon', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 879545, name: 'Tues', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 2354678, name: 'Wed', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 1598403, name: 'Thur', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 543250, name: 'Fri', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 1305923, name: 'Sat', itemStyle: {normal: {color: '#2d8cf0'}}},
        //                     {value: 1103456, name: 'Sun', itemStyle: {normal: {color: '#2d8cf0'}}}
        //                 ]
        //             }
        //         ]
        //     };

        //     visiteVolume.setOption(option);

        //     window.addEventListener('resize', function () {
        //         visiteVolume.resize();
        //     });
        // });
    }
};
</script>
