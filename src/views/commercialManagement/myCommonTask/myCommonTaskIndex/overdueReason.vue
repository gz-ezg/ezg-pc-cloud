<template>
        <!-- 逾期原因 -->
        <Modal
            title="逾期原因"
            v-model="overdueOpen"
            width="400"
        >
            <Row :gutter="10" style="margin-bottom:20px">
                <Col span="8"><h3>服务公司：</h3></Col>
                <Col span="16"><h3>{{selectRow.companyname}}</h3></Col>
            </Row>
            <Row :gutter="10" style="margin-bottom:20px">
                <Col span="8"><h3>产品名称：</h3></Col>
                <Col span="16"><h3>{{selectRow.product}}</h3></Col>
            </Row>
            <Row>
                <Input type="textarea" placeholder="请填写逾期原因！" v-model="content" :rows="5" />
            </Row>
            <div slot="footer">
                <Button type="primary" long @click="submit" :disabled="isContent" :loading="loading">提交</Button>
            </div>
        </Modal>
</template>

<script>
import Bus from '../../../../components/bus'

export default {
    data(){
        return{
            overdueOpen:false,
            content:"",
            selectRow:{},
            loading:false
        }
    },
    methods:{
        submit(){
            let _self = this
            _self.loading = true

            let url = "api/order/work/order/setOverdueCause"

            let config = {
                params:{
                    id: _self.selectRow.id,
                    reason:_self.content
                }
            }

            function success(res){
                _self.loading = false
                _self.overdueOpen = false
                Bus.$emit('flowsuccess', true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Get(url, config ,success, fail)
        }
    },
    computed:{
        isContent(){
            if(!this.content){
                return true
            }else{
                return false
            }
        }
    },
    created(){
        let _self = this
        _self.$bus.on("OPEN_OVER_DUE_REASON",(e)=>{
            console.log(e)
            _self.selectRow = {}
            _self.overdueOpen = true
            _self.selectRow = e
            _self.content = ""
            // console.log(e)
        })
    }
}
</script>

