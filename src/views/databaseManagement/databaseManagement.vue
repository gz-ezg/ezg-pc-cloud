<template>
    <div>
        <database_table @isAdd="isAddChange"></database_table>
        <add-from v-if="modal5" :modal5="modal5" @hideAddPanel="hideAddPanel"></add-from>
    </div>
</template>

<script>
    import database_table from './databaseManagement_table.vue'
    import addFrom from './databaseManagement_add.vue'

    export default {
        components: {
            database_table,
            addFrom,
        },
        data() {
            return{
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
        }
    }
</script>