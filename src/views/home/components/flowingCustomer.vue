<template>
    <div style="width:100%;height:100%;" id="visite_volume_con1"></div>
</template>

<script>
    // import echarts from 'echarts';
    export default {
        name: 'visiteVolume',
        data () {
            return {
                //
                customerTypeGroupData: [],
                customerT: 0,
            };
        },
        methods: {
            getEchartsData() {
                let _self = this
                let url = '/channel/type/queryUserChannel'

                function doSuccess(re) {
                    // alert(1212)
                    let url2 = '/customer/groupQueryByChannelId?channelTypeId='+re.data.data[0].id+'&reportTypes=customerTypeFollowGroup'

                    function doSuccess2(re) {
                        let _data = re.data.data.customerTypeFollowGroup

                        for (let i = 0; i < _data.length; i++) {
                            _self.customerT = _self.customerT + parseInt(_data[i].value)

                            _self.customerTypeGroupData.push({
                                value: _data[i].value,
                                name: _data[i].name,
                            })
                        }
                        _self.getEcharts()
                    }

                    _self.GetData(url2, doSuccess2)
                }

                this.GetData(url, doSuccess)
            },

            getEcharts() {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con1'));
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
                            _self.customerTypeGroupData[0].name,
                            _self.customerTypeGroupData[1].name,
                            _self.customerTypeGroupData[2].name,
                            _self.customerTypeGroupData[3].name,
                            _self.customerTypeGroupData[4].name,
                            _self.customerTypeGroupData[5].name
                        ],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '总数',
                            type: 'bar',
                            data: [
                                {value: _self.customerTypeGroupData[0].value, name: _self.customerTypeGroupData[0].name, itemStyle: {normal: {color: '#91A7D0'}}},
                                {value: _self.customerTypeGroupData[1].value, name: _self.customerTypeGroupData[1].name, itemStyle: {normal: {color: '#F5C9C8'}}},
                                {value: _self.customerTypeGroupData[2].value, name: _self.customerTypeGroupData[2].name, itemStyle: {normal: {color: '#82677E'}}},
                                {value: _self.customerTypeGroupData[3].value, name: _self.customerTypeGroupData[3].name, itemStyle: {normal: {color: '#609087'}}},
                                {value: _self.customerTypeGroupData[4].value, name: _self.customerTypeGroupData[4].name, itemStyle: {normal: {color: '#8F5F50'}}},
                                {value: _self.customerTypeGroupData[5].value, name: _self.customerTypeGroupData[5].name, itemStyle: {normal: {color: '#EB9587'}}},
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
