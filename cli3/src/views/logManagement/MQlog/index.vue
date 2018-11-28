<template>
    <div>
        <Tabs value="name2">
            <TabPane label="失败" name="name2">
                <fail></fail>
            </TabPane>
            <TabPane label="已执行" name="name1">
                <executed></executed>
            </TabPane>
            <TabPane label="已接收" name="name4">
                <received></received>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import fail from './components/fail'
import executed from './components/executed'
import received from './components/received'

export default {
    components:{
        fail,
        executed,
        received
    },
    data(){
        return {

        }
    }
}
</script>

