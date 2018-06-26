<!--  完成情况统计  -->
<template>
    <div style="width:100%;height:400px;" id="companySupsects">
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'accountSupsects',
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
                let visiteVolume = echarts.init(document.getElementById('companySupsects'));
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
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直达', selected:true},
                                {value:679, name:'营销广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data:[
                                {value:335, name:'直达'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1048, name:'百度'},
                                {value:251, name:'谷歌'},
                                {value:147, name:'必应'},
                                {value:102, name:'其他'}
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
            // console.log('11')
            this.getEcharts()
            // this.getEchartsData()
            // console.log('22')
            /*this.$nextTick(() => {

            });*/
        }
}
</script>

