<template>
    <div>
        <Tabs value="name1">
            <TabPane label="待补交" name="name1">
                <Npay></Npay>
            </TabPane>
            <TabPane label="已补交" name="name2">
                <Hpay></Hpay>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Hpay from './had_payment/had_pay_list'
import Npay from './no_payment/no_pay_list'

    export default {
        data() {
            return{}
        },
        components: {
            Hpay,
            Npay
        }
    }
</script>