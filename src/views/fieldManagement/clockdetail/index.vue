<template>
    <div></div>
</template>

<script>
export default {
    name: "clocktime_index",
    data(){
        return {
            data: [],
            header: [],
            loading: false,
            timeRanger: ""
        }
    },
    methods:{
        get_data(){
            let _self = this
            _self.loading = false

            let url = `api/legwork/exportLegworkMsg`
        }
    }

}
</script>
