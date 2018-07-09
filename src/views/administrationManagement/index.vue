<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未完成" name="name1">
                <un-finish></un-finish>
            </TabPane>
            <TabPane label="已完成" name="name2">
                <finish></finish>
            </TabPane>
        </Tabs>
        <flow></flow>
    </div>
</template>

<script>
import Finish from './finish'
import UnFinish from './unfinish'
import Flow from './flow'

export default {
    components:{
        Finish,
        UnFinish,
        Flow
    }
}
</script>
