<template>
    <Card>
        <div>
            <Tabs value="6">
                <TabPane label="执行中" name="6" >
                    <executing></executing>
                </TabPane>
                <TabPane label="已完结" name="1">
                    <finished></finished>
                </TabPane>
                <TabPane label="作废" name="2">
                    <obsolete></obsolete>
                </TabPane>
            </Tabs>
        </div>
    </Card>
</template>

<script>
    import executing from './executing'
    import finished from './finished'
    import obsolete from './obsolete'
    export default {
        name: "busiTaskList_index",
        components:{
            executing,
            finished,
            obsolete
        }
    }
</script>

<style>

</style>