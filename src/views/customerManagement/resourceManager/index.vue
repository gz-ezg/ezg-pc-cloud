<template>
    <div>
        <Tabs value="name1" v-if="loading">
            <TabPane label="资源池" name="name1">
                <resource-pool></resource-pool>
            </TabPane>
            <TabPane label="拨打情况" name="name2">
                <call-situation></call-situation>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import ResourcePool from './resourcePool/index'
    import CallSituation from './callSituation/index'
    export default {
        name: "index",
        components:{
            ResourcePool,
            CallSituation
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