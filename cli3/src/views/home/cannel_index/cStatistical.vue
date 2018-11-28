<template>
    <div >
        <ve-funnel :data="chartData" style="width:100%;height:200px" ></ve-funnel>
    </div>
</template>

<script>
import VeFunnel from 'v-charts/lib/funnel.common'

    export default {
        components: {
            VeFunnel
        },
        name: 'visiteVolume',
        data () {
            return {
                //
                // customerTypeGroupData: [],
                customerT: 0,
                chartData: {
                    columns: ['状态', '数值'],
                    rows: [
                    ]
                }
            };
        },
        methods: {
            getEchartsData() {
                let _self = this
                let url = '/channel/type/queryUserChannel'

                function doSuccess(re) {
                    let url2 = '/customer/groupQueryByChannelId?channelTypeId='+re.data.data[0].id+'&reportTypes=customerTypeGroup'

                    function doSuccess2(re) {
                        let _data = re.data.data.customerTypeGroup
                        // console.log(re)
                        for (let i = 0; i < _data.length; i++) {
                            let _color = ''
                            _self.customerT = _self.customerT + parseInt(_data[i].value)

                            _self.chartData.rows.push({
                                "数值": _data[i].value,
                                "状态": _data[i].name,
                            })
                        }
                        // _self.getEcharts()
                    }

                    _self.GetData(url2, doSuccess2)
                }

                this.GetData(url, doSuccess)
            },

            getEcharts() {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con3'));
                let _self = this
                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                for (let i = 0; i < 20; i++) {
                    xAxisData.push('类目' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                const option = {
                    title : {
                        text: '总计：' + _self.customerT + '个客户',
                        x:'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        // top: 0,
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: [
                            // _self.customerTypeGroupData[0].name,
                            // _self.customerTypeGroupData[1].name,
                            // _self.customerTypeGroupData[2].name,
                            // _self.customerTypeGroupData[3].name,
                            // _self.customerTypeGroupData[4].name,
                            // _self.customerTypeGroupData[5].name,
                            // _self.customerTypeGroupData[6].name,
                        ],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '总数',
                            type: 'funnel',
                            data: [
                                {value: _self.customerTypeGroupData[0].value, name: _self.customerTypeGroupData[0].name, itemStyle: {normal: {color: '#91A7D0'}}},
                                {value: _self.customerTypeGroupData[1].value, name: _self.customerTypeGroupData[1].name, itemStyle: {normal: {color: '#F5C9C8'}}},
                                {value: _self.customerTypeGroupData[2].value, name: _self.customerTypeGroupData[2].name, itemStyle: {normal: {color: '#82677E'}}},
                                {value: _self.customerTypeGroupData[3].value, name: _self.customerTypeGroupData[3].name, itemStyle: {normal: {color: '#609087'}}},
                                {value: _self.customerTypeGroupData[4].value, name: _self.customerTypeGroupData[4].name, itemStyle: {normal: {color: '#8F5F50'}}},
                                {value: _self.customerTypeGroupData[5].value, name: _self.customerTypeGroupData[5].name, itemStyle: {normal: {color: '#EB9587'}}},
                                {value: _self.customerTypeGroupData[6].value, name: _self.customerTypeGroupData[6].name, itemStyle: {normal: {color: '#BA55D3'}}}
                            ]
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
            this.getEchartsData()
            /*this.$nextTick(() => {

            });*/
        }
    };
</script>
