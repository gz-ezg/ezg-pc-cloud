<template>
    <div>
        <Row>
            <ve-line :data="chartData" :extend="extend"></ve-line>
        </Row>
    </div>
</template>

<script>
  export default {
      
    data: function () {
    this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      }
      return {
        chartData: {
          columns: ['日期', '新增客户', '下线客户'],
          rows: [
            { '日期': '201801', '新增客户': 13, '下线客户': 10, '下单率': 0.32 },
            { '日期': '201802', '新增客户': 30, '下线客户': 3, '下单率': 0.26 },
            { '日期': '201803', '新增客户': 11, '下线客户': 2, '下单率': 0.76 },
            { '日期': '201804', '新增客户': 23, '下线客户': 1, '下单率': 0.49 },
            { '日期': '201805', '新增客户': 22, '下线客户': 3, '下单率': 0.323 },
            { '日期': '201806', '新增客户': 15, '下线客户': 4, '下单率': 0.78 }
          ]
        }
      }
    }
  }
</script>