<template>
    <div>
        <Modal
            v-model="qrcode2Open"
            title="查看二维码"
        >
            <Spin v-if="loading" fix></Spin>
            <center>
                <div  id="qrcode"></div>
            </center>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
    data(){
        return {
            qrcode2Open: false,
            loading: false,
        }
    },
    methods: {
        get_code(e){
            let _self = this
            _self.qrcode2Open = true
            // _self.codeLoading = false

            // document.getElementById("qrcode").innerHTML = "";

            let url = `api/customer/bind/image/create`;

            let config = {
                params: {
                    customerId: e,
                    redirectUrl: "/index"
                }
            };

            function success(res) {
                console.log(res.data.data);
                // _self.codeLoading = true
                let qr = new QRCode("qrcode", {
                    text: res.data.data,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                _self.loading = false

            }

            this.$Get(url, config, success);
        }
    },
    mounted(){
        let _self = this
        _self.$bus.off("OPEN_CODE")
        _self.$bus.on("OPEN_CODE",(e)=>{
            if(e.TEL){
                _self.loading = true
                _self.get_code(e.ID)
            }else{
                _self.$Message.warning("该客户未录入手机号，无法生成二维码！")
            }
        })
    }
}
</script>
