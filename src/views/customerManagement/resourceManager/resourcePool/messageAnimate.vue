<template>
    <div>
        <Card v-if="sending">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px">短信发送中...</div>
            </div>
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="width: 30px"><Icon class="animated infinite fadeOutRight" type="ios-filing-outline" style="width: 30px;text-align: center;color: green"></Icon></div>
                <div style="width: 30px"><Icon class="animated infinite fadeInLeft" type="ios-email-outline" style="width: 30px;text-align: center;color: green"></Icon></div>
                <div style="width: 30px"><Icon class="animated infinite fadeOutRight" type="ios-filing-outline" style="width: 30px;text-align: center;color: green"></Icon></div>
            </div>
        </Card>
        <Card v-if="sendSuccess">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px;color: green">短信发送成功！</div>
            </div>
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="width: 30px"><Icon type="ios-filing-outline" style="width: 30px;text-align: center;color: green"></Icon></div>
                <div style="width: 30px"><Icon type="checkmark-round" style="width: 30px;text-align: center;color: green"></Icon></div>
            </div>
        </Card>
        <Card v-if="sendFailed">
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="margin-bottom: 50px;color: red">短信发送失败！</div>
            </div>
            <div style="font-size: 24px;display: flex;justify-content: center">
                <div style="width: 30px"><Icon type="ios-filing-outline" style="width: 30px;text-align: center;color: red"></Icon></div>
                <div style="width: 30px"><Icon type="close-round" style="width: 30px;text-align: center;color: red"></Icon></div>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "messageAnimate",
        props:['sending','sendSuccess','sendFailed']
    }
</script>

<style>

</style>