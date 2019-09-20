<template>
    <Modal
        v-model="qrcode2Open"
        title="交接二维码"
        >
        <center>
            <div style="margin-bottom:10px">请接收人扫描下方二维码确认</div>
            <div id="qrcode2"></div>
        </center>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
    data(){
        return{
            qrcode2Open: false
        }
    },
    methods:{
        get_code(url){
            document.getElementById("qrcode2").innerHTML = "";

            let qr = new QRCode("qrcode2", {
                text: url,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

        },
        get_url(e){
            let _self = this
            let url = "api/customer/file/connect/request/customer/qr"
            let config = {
                params:{
                    connectRequestId: e
                }
            }

            function success(res){
                _self.get_code(res.data.data)
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        //一个对内，企业微信登录，一个对外，我的服务登录
        let _self = this
        _self.$bus.off("OPEN_INNER_QCODER",true)
        _self.$bus.on("OPEN_INNER_QCODER", (e)=>{
            _self.qrcode2Open = true
            // let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7666e5cbbd22b505&redirect_uri=http://cloud.zgcfo.com/api/system/apiWechatQuickOfficeAuthLogin&response_type=code&scope=SCOPE&agentid=1000013&state=STATE#wechat_redirect"
           let url = `http://litooth.w3.luyouxia.net/customer/shortUrlCallBack/${e}`
            _self.get_code(url)
        })
        _self.$bus.off("OPEN_OUTER_QCODER",true)
        _self.$bus.on("OPEN_OUTER_QCODER", (e)=>{
            _self.qrcode2Open = true
            _self.get_url(e)
        })
    },
}
</script>
