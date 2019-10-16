<template>
    <div>
        <Modal v-model="openCopyCustomer" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>复制客户 - {{NAME}}</span>
            </p>
            <div style="text-align:center">
                <p>确定复制吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" name="marketingManagement_index_delete_delete" size="large" long :loading="loading" @click="copyCustomer">复制</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                openCopyCustomer: false,
                loading: false,
                NAME: "",
                ID: "",
                nameList:[],
                idList:[]
            }
        },
        methods:{
            copyCustomer(){
                let _self = this;
                _self.$ButtonCollect("marketingManagement_index_delete_delete");
                _self.loading = true
                let url = `/api/customer/public/pool/copyToResourceSeas`

                let config = {
                    params:{
                        ids:_self.ID
                    }
               }

                function success(res){
                    _self.openCopyCustomer = false
                    _self.$bus.emit("UPDATE_CUSTOMER", true)
                    _self.$Message.success("复制成功!")
                    _self.NAME = ""
                    _self.ID = ""
                    _self.loading = false
                }

                function fail(err){
                    _self.loading = false
                }

                this.$Get(url, config, success,fail)
            }
        },
        created(){
            let _self = this
            _self.$bus.off("COPY_CUSTOMER", true)
            _self.$bus.on("COPY_CUSTOMER", (e)=>{
                console.log(e)
                _self.nameList= []
                _self.idList = []
                for (let i=0;i<e.length;i++){
                    _self.nameList.push(e[i].NAME)
                    _self.idList.push(e[i].ID)
                }
                _self.NAME = _self.nameList.join(",")
                _self.ID = _self.idList.join(",")
                console.log(_self.NAME)
                console.log(_self.ID)
                _self.openCopyCustomer = true
            })
        }
    }
</script>