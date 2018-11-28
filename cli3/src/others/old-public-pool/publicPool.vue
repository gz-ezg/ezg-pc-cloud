<template>
    <div>
        <Tabs value="name1">
            <TabPane label="运营未分配" name="name1">
                <unallocated></unallocated>
            </TabPane>
            <TabPane label="运营已分配" name="name2">
                <assigned></assigned>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

    import Unallocated from './publicPool_Unallocated.vue'
    import Assigned from './publicPool_Assigned.vue'

    export default {
        components: {
            Unallocated,
            Assigned
        }
    }
</script>