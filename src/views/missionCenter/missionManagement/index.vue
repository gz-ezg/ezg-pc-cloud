<template>
    <div>
        <div>
            <Tabs value="6">
                <TabPane label="重要且紧急" name="1">
                </TabPane>
                <TabPane label="重要但不紧急" name="2">
                </TabPane>
                <TabPane label="紧急但不重要" name="3">
                </TabPane>
                <TabPane label="不重要也不紧急" name="4">
                </TabPane>
                <TabPane label="本周任务" name="5">
                </TabPane>
                <TabPane label="全部任务" name="6">
                    <all></all>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import all from './typeOfMission/all'

export default {
    name: "missionManagement_index",
    components: {
        all,
    }
}
</script>

