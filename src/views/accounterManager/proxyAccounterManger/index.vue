<template>
    <div>
        <Tabs value="name1" v-if="loading">
            <TabPane label="服务中" name="name1">
                <serving></serving>
            </TabPane>
            <TabPane label="未开始" name="name2">
                <notbegin></notbegin>
            </TabPane>
            <TabPane label="暂停" name="name3">
                <stop></stop>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all></all>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import Notbegin from "./notbegin/notbegin"
    import Serving from "./serving/serving"
    import Stop from "./stop/stop"
    import All from "./all/all"
    export default {
        name: "index",
        components:{
            Notbegin,
            Serving,
            Stop,
            All
        },
        data(){
            return{
                loading: true
            }
        },
        methods:{

        }
    }
</script>

<style>

</style>