<template>
    <Card>
        <Tabs value="name1" v-if="loading">
            <TabPane label="在职" name="name1">
                <inservice></inservice>
            </TabPane>
            <TabPane label="离职" name="name2">
                <leave></leave>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "index",
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