<template>
    <div>
        <Tabs value="name1" v-if="loading">
            <TabPane label="代账产品" name="name1">
                <bookkeeping-agency></bookkeeping-agency>
            </TabPane>
            <!-- <TabPane label="其他产品(待开发)" name="name2">
                <accounting-home></accounting-home>
            </TabPane> -->
        </Tabs>
    </div>
</template>

<script>
    import BookkeepingAgency from "./BookkeepingAgencyProduct/index"
    import AccountingHome from "./AccountingHome/index"
    export default {
        name: "index",
        components:{
            BookkeepingAgency,
            AccountingHome,

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