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
    import Notbegin from "./components/notbegin"
    import Serving from "./components/serving"
    import Stop from "./components/stop"
    import All from "./components/all"
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