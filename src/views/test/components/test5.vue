<template>
    <div v-html="html">

    </div>
</template>

<script>
export default {
    data(){
        return {
            html: ""
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = `api/store/tools/company/name/test`

            let config = {
                params: {
                    city:"广州",
                    company_name: "则为",
                    company_line: "信息",
                    mobile: "18617380143",
                    code: "975405"
                }
            }

            function success(res){
                _self.html = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        let _self = this
        this.get_data()
    },
}
</script>
