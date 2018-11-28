<template>
    <ve-line :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>
</template>

<script>
// import echarts from 'echarts';
import VeLine from 'v-charts/lib/line.common'
export default {
    components: {
        VeLine
    },
    name: 'serviceRequests',
    data () {
      this.chartSettings = {
        // stack: { '用户': ['访问用户', '下单用户'] },
        // area: true
      }
      this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        },
      }
      return {
        chartData: {
          columns: ['日期', '客户管理', '订单管理', '服务管理', '任务中心'],
          rows: [
            { '日期': '周一', '客户管理': 445, '订单管理': 321, '服务管理': 331, "任务中心": 120 },
            { '日期': '周二', '客户管理': 452, '订单管理': 356, '服务管理': 331, "任务中心": 141 },
            { '日期': '周三', '客户管理': 430, '订单管理': 278, '服务管理': 331, "任务中心": 109 },
            { '日期': '周四', '客户管理': 390, '订单管理': 340, '服务管理': 331, "任务中心": 98 },
            { '日期': '周五', '客户管理': 430, '订单管理': 405, '服务管理': 331, "任务中心": 80 },
            { '日期': '周六', '客户管理': 105, '订单管理': 120, '服务管理': 331, "任务中心": 41 },
            { '日期': '周日', '客户管理': 110, '订单管理': 99, '服务管理': 331, "任务中心": 15 },
          ]
        }
      }
    },
    mounted () {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '运营商/网络服务',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#2d8cf0'
                    }},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '银行/证券',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#10A6FF'
                    }},
                    data: [257, 358, 278, 234, 290, 330, 310]
                },
                {
                    name: '游戏/视频',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#0C17A6'
                    }},
                    data: [379, 268, 354, 269, 310, 478, 358]
                },
                {
                    name: '餐饮/外卖',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#4608A6'
                    }},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {
                        color: '#398DBF'
                    }},
                    data: [820, 645, 546, 745, 872, 624, 258]
                }
            ]
        };
        // const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
        // serviceRequestCharts.setOption(option);

        // window.addEventListener('resize', function () {
        //     serviceRequestCharts.resize();
        // });
    }
};
</script>