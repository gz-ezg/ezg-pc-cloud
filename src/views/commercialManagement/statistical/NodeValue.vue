<!--    节点总值    -->
<template>
    <div style="width:100%;height:100%;" id="Node">
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
                let visiteVolume = echarts.init(document.getElementById('Node'));
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
                    // title : {
                    //     text: '某站点用户访问来源',
                    //     subtext: '纯属虚构',
                    //     x:'center'
                    // },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data : ['陈志超','梁家兴','符东','张威雄','王威娜','李振威','罗汉淇','潘美珊']
                    },
                    series : [
                        {
                            name: '产生价值',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'陈志超'},
                                {value:310, name:'梁家兴'},
                                {value:234, name:'符东'},
                                {value:135, name:'张威雄'},
                                {value:1548, name:'王威娜'},
                                {value:1548, name:'李振威'},
                                {value:1548, name:'罗汉淇'},
                                {value:1548, name:'潘美珊'},                                
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
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
            // console.log('22')
            /*this.$nextTick(() => {

            });*/
        }
}
</script>
