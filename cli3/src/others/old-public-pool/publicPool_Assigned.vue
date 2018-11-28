<template>
    <div>
        <assigned-table></assigned-table>
    </div>
</template>
<script>
    import AssignedTable from './publicPool_Assigned_table.vue'

    export default {
        components: {
            AssignedTable,
        },
        data() {
            return {
                modal5: false,
            }
        },
        methods: {
            isAddChange() {
                var _self = this
                _self.modal5 = true
            },

            hideAddPanel() {
                var _self = this
                _self.modal5 = false;
            },
        },
        mounted() {}
    }
</script>
