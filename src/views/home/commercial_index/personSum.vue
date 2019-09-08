<template>
    <div style="width:100%;height:300px" id="personSum"></div>
</template>

<script>
    // import echarts from 'echarts';
    export default {
        name: 'personSum',
        data () {
            return {
                //
                customerTypeGroupData: [],
                customerT: 0,
            };
        },
        methods: {
            // getEchartsData() {
            //     let _self = this
            //     let url = '/channel/type/queryUserChannel'

            //     function doSuccess(re) {
            //         let url2 = '/customer/groupQueryByChannelId?channelTypeId='+re.data.data[0].id+'&reportTypes=customerTypeGroup'

            //         function doSuccess2(re) {
            //             let _data = re.data.data.customerTypeGroup
            //             // console.log(re)
            //             for (let i = 0; i < _data.length; i++) {
            //                 let _color = ''
            //                 _self.customerT = _self.customerT + parseInt(_data[i].value)

            //                 _self.customerTypeGroupData.push({
            //                     value: _data[i].value,
            //                     name: _data[i].name,
            //                 })
            //             }
            //             _self.getEcharts()
            //         }

            //         _self.GetData(url2, doSuccess2)
            //     }

            //     this.GetData(url, doSuccess)
            // },

            getEcharts() {
                let visiteVolume = echarts.init(document.getElementById('personSum'));
                // let _self = this
                // let xAxisData = [];
                // let data1 = [];
                // let data2 = [];
                // for (let i = 0; i < 20; i++) {
                //     xAxisData.push('类目' + i);
                //     data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                //     data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                // }

                const option = {
                    // title: {
                    //     text: '折线图堆叠'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data : ['陈志超','梁家兴','符东','张威雄','王威娜','李振威','罗汉淇','潘美珊']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2017.06','2017.07','2017.08','2017.09','2017.10','2017.11','2017.12']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'陈志超',
                            type:'line',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'梁家兴',
                            type:'line',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'符东',
                            type:'line',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'张威雄',
                            type:'line',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'王威娜',
                            type:'line',
                            data:[150, 100, 200, 346, 414, 500, 100]
                        },
                        {
                            name:'李振威',
                            type:'line',
                            data:[150, 100, 200, 346, 414, 500, 100]
                        },
                        {
                            name:'罗汉淇',
                            type:'line',
                            data:[150, 100, 200, 346, 414, 500, 100]
                        },
                        {
                            name:'潘美珊',
                            type:'line',
                            data:[150, 100, 200, 346, 414, 500, 100]
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
            // this.getEchartsData()
            this.getEcharts()
            /*this.$nextTick(() => {

            });*/
        }
    };
</script>
