<template>
    <ve-histogram style="width:100%;height:100%;" :data="chartData"></ve-histogram>
</template>

<script>
    // import echarts from 'echarts';
    import VeHistogram from 'v-charts/lib/histogram.common'
    export default {
        components:{
            VeHistogram
        },
        name: 'visiteVolume',
        data () {
            return {
                //
                customerDealSum: [],
                customerT: 0,
                chartData: {
                    columns: ['月份', '总数'],
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
                    let url2 = '/customer/groupQueryByChannelId?channelTypeId='+re.data.data[0].id+'&reportTypes=customerDealSum'

                    function doSuccess2(re) {
                        let _data = re.data.data.customerDealSum
                        // console.log(re)
                        for (let i = 0; i < _data.length; i++) {
                            let _color = ''
                            _self.customerT = _self.customerT + parseInt(_data[i].value)

                            _self.chartData.rows.push({
                                "总数": _data[i].value,
                                "月份": _data[i].name,
                            })
                        }
                        // _self.getEcharts()
                    }

                    _self.GetData(url2, doSuccess2)
                }

                this.GetData(url, doSuccess)
            },

            getEcharts() {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con2'));
                let _self = this
                // console.log(_self.customerDealSum)
                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                // for (let i = 0; i < 20; i++) {
                //     xAxisData.push('类目' + i);
                //     data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                //     data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                // }
                

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
                    legend: {
                        data:['成交金额']
                    },
                    xAxis: {
                        type: 'category',
                        data:[
                            _self.customerDealSum[0].name,
                            _self.customerDealSum[1].name,
                            _self.customerDealSum[2].name,
                            _self.customerDealSum[3].name,
                            _self.customerDealSum[4].name
                        ]
                    },
                    yAxis: {
                        type: 'value',
                        // data: ['二次签约', '续充值', '已成交', '待成交', '跟进中', '无意向', '其他'],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '总数',
                            type: 'bar',
                            data: [
                                _self.customerDealSum[0].value,
                                _self.customerDealSum[1].value,
                                _self.customerDealSum[2].value,
                                _self.customerDealSum[3].value,
                                _self.customerDealSum[4].value
                            ],
                            barWidth: '60%'
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
