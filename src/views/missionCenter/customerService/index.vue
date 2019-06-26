<template>
    <Card>
        <div>
            <Tabs value="6">
                <TabPane label="未处理" name="6" >
                    <executing></executing>
                </TabPane>
                <TabPane label="已处理" name="2">
                    <finished></finished>
                </TabPane>
            </Tabs>
        </div>
    </Card>
</template>

<script>
    import executing from './executing'
    import finished from './finished'
    export default {
        name: "index",
        components:{
            executing,
            finished
        }
    }
</script>

<style>

</style>