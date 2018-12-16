<template>
    <div>
        <Modal
            title="开票信息"
            width="600"
            v-model="openInvoice"
        >
            <div slot="footer">
                <Button type="primary" @click="save" v-if="type='create'">保存</Button>
                <Button type="primary" @click="update" v-else>修改</Button>
                <Button type="ghost" @click="cancel">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openInvoice: false,
            type: "",
            info: {},
            detail: {}
        }
    },
    methods:{
        get_invoice(){

        },
        //  不知道订单id
        save(){

        },
        //  知道订单id
        update(){

        },
        cancel(){
            this.openInvoice = false
        }
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_ORDER_INVOICE")
        this.$bus.on("OPEN_ORDER_INVOICE", (e)=>{
            this.type = e.type
            this.info = e
            this.openInvoice = true
        })
    }
}
</script>

