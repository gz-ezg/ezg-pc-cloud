<template>
    <div>
        <woa-tabs :department="BUSSINESS"></woa-tabs>
    </div>
</template>

<script>
import woaTabs from './unCycleWorkOrder'
export default {
    data(){
        return{
            status:['unbegin','serving','finish','all']
        }
    }
}
</script>
