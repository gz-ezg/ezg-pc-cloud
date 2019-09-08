<template>
    <div>
        <!-- <ve-histogram :data="chartData" :settings="chartSettings" :extend="extend"></ve-histogram> -->
        <Table
            :columns="columns" 
            :data="chartData.rows"
        >
        </Table>
    </div>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram.common'
import axios from 'axios'
export default {
    components: {
        VeHistogram
    },
    data(){
        this.extend = {
            series: {
                label: { show: true, position: "top" }
            }
        }
        this.chartSettings = {
            labelMap: {
                'username': '姓名',
                'all': '全部',
                'zhuce': '公司注册',
                'zhuxiao': '公司注销',
                'biangeng': '变更服务',
            },
            legendName: {
                'username': '姓名',
                'all': '全部',
                'zhuce': '公司注册',
                'zhuxiao': '公司注销',
                'biangeng': '变更服务',
            }
        }
        return {
            dong: [],
            userList: [
                {
                    userName: "符东",
                    userId: 10074
                },
                {
                    userName: "陈志超",
                    userId: 10228
                },
                {
                    userName: "梁家兴",
                    userId: 10270
                },
                {
                    userName: "张威雄",
                    userId: 10296
                },
                {
                    userName: "潘美珊",
                    userId: 10428
                },
                {
                    userName: "罗汉淇",
                    userId: 10439
                },
            ],
            chartData: {
                columns: ['username', 'all', 'zhuce', 'zhuxiao', 'biangeng'],
                rows: [
                ]
            },
            columns: [
                {
                    title: "用户名",
                    key: "username",
                    minWidth: 120
                },
                {
                    title: "全部",
                    key: "all",
                    minWidth: 120
                },
                {
                    title: "公司注册",
                    key: "zhuce",
                    minWidth: 120
                },
                {
                    title: "公司注销",
                    key: "zhuxiao",
                    minWidth: 120
                },
                {
                    title: "变更",
                    key: "biangeng",
                    minWidth: 120
                },
            ]
        }
    },
    methods: {
        async get_workorder_num(productType, userId){
            let _self = this

            let url = 'api/order/workOrderList'
            let config = {
                params: {
                    page:1,
                    pageSize:1,
                    serverId: userId,
                    workOrderStatus: 30,
                    serviceDept:"'BUSSINESS'",
                    product: productType
                }
            }
            
            return await axios.get(url, config)
        },
        curry_get_workorder_num(productType){
            let _self = this
            return function (userId) {
                return _self.get_workorder_num(productType, userId)
            }
        },
        async get_info(userId, userName){
            //  柯里化四个函数
            let get_zhuce = this.curry_get_workorder_num("注册")
            let get_zhuxiao = this.curry_get_workorder_num("注销")
            let get_biangeng = this.curry_get_workorder_num("变更")
            let get_all = this.curry_get_workorder_num()
            //  获取数据
            let zhuce = await get_zhuce(userId).then(res => res.data.data.total)
            let zhuxiao = await get_zhuxiao(userId).then(res => res.data.data.total)
            let biangeng = await get_biangeng(userId).then(res => res.data.data.total)
            let all = await get_all(userId).then(res => res.data.data.total)
            let temp = {
                userid: userId,
                username: userName,
                all: all,
                zhuce: zhuce,
                zhuxiao: zhuxiao,
                biangeng: biangeng
            }

            await this.dong.push(temp)
            this.chartData.rows = this.dong
        }
    },
    created() {
        let _self = this
        for(let i = 0; i<_self.userList.length;i++){
            this.get_info(_self.userList[i].userId, _self.userList[i].userName)
        }
        // console.log(this.get_workorder_num(10228, '注册').then(res => {
        //     console.log(res)
        // }))

        // this.curry_get_workorder_num("10059")("产品")
        // 注册产品查询
        // let get_zhuce = this.curry_get_workorder_num("注册")
        // let get_zhuxiao = this.curry_get_workorder_num("注销")
        // let get_biangeng = this.curry_get_workorder_num("变更")
        // let get_all = this.curry_get_workorder_num()
        // get_all("10228")
    },
}
</script>
