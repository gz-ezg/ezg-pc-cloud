<template>
    <div>
        <Tabs value="name1" v-if="loading">
            <TabPane label="在职" name="name1">
                <inservice></inservice>
            </TabPane>
            <TabPane label="离职" name="name2">
                <leave></leave>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import Inservice from './inService/index'
    import Leave from './leave/index'

    export default {
        name: "index",
        components:{
            Inservice,
            Leave
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