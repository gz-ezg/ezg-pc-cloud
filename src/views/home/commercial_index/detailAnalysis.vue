<template>
    <div>
        <!-- <ve-histogram :data="chartData" :settings="chartSettings" :extend="extend"></ve-histogram> -->
        <Table
            :columns="columns" 
            :data="data"
        >
        </Table>
    </div>
</template>

<script>
// import VeHistogram from 'v-charts/lib/histogram.common'
// import axios from 'axios'
export default {
    components: {
        // VeHistogram
    },
    data(){
        // this.extend = {
        //     series: {
        //         label: { show: true, position: "top" }
        //     }
        // }
        // this.chartSettings = {
        //     labelMap: {
        //         'username': '姓名',
        //         'all': '全部',
        //         'zhuce': '公司注册',
        //         'zhuxiao': '公司注销',
        //         'biangeng': '变更服务',
        //     },
        //     legendName: {
        //         'username': '姓名',
        //         'all': '全部',
        //         'zhuce': '公司注册',
        //         'zhuxiao': '公司注销',
        //         'biangeng': '变更服务',
        //     }
        // }
        return {
            data: [],
            columns: [
                {
                    title: "用户名",
                    key: "realname",
                    minWidth: 120
                },
                {
                    title: "全部",
                    key: "all_num",
                    minWidth: 120
                },
                {
                    title: "公司注册",
                    key: "gszc_num",
                    minWidth: 120
                },
                {
                    title: "公司注销",
                    key: "zx_num",
                    minWidth: 120
                },
                {
                    title: "变更",
                    key: "bgfw_num",
                    minWidth: 120
                },
                {
                    title: "其他",
                    key: "other_num",
                    minWidth: 129
                },
            ]
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/order/bussiness/index/work/order/product/type/report`
            _self.loading = true
            let config = {
                params: {
                    page: 1,
                    pageSize: 10
                }
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        this.get_data()
    },
}
</script>
