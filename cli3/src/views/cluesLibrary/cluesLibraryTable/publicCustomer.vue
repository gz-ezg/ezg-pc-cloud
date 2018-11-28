<template>
    <div>
        <Modal
            title="领取公海池客户"
            width="500"
            v-model="openPubilcCustomer"
            @on-cancel="close"
        >
            <h3>对不起！要领取该线索需要先领取该客户！确定领取该客户？</h3>
        <div slot="footer">
            <Button type="primary" @click="change_customer_follow">领取</Button>
            <Button type="ghost" @click="close">放弃</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        customer: {
            type: [String, Object]
        }
    },
    data(){
        return {
            openPubilcCustomer: true
        }
    },
    methods: {
        close(){
            this.$emit("close",true)
        },
        change_customer_follow(){
            let _self = this
            let url = `api/customer/receipt`

            let config = {
                customerId: _self.customer.customer_id
            }

            function success(res){
                _self.$emit("success",true)
                _self.close()
            }

            function fail(err){
                _self.close()
            }

            this.$Post(url,config,success,fail)
        }
    },
    created(){
        console.log(this.customer)
    }
}
</script>
