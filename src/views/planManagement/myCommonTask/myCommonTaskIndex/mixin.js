export default {
    methods: {
        pass_workorder(){
            let _self = this
            if(this.current_row != ''){
                let url = `api/order/work/order/plan/pass`
                let config = {
                    workOrderId: _self.current_row.id
                }
                function success(res){
                    // _self.$Message.success(res.data.msg)
                    _self.getData()
                }
                function fail(err){
                    // _self.$Message.success(err)
                }
                _self.$Post(url,config,success,fail)
            }else{
                this.$Message.warning('请选择一行！')
            }
        },
        income_detail(){
            let _self = this
            if(this.current_row != ''){
                this.$bus.emit("PLAN_WORKORDER_INCOME_DETAIL", _self.current_row.id)
            }else{
                this.$Message.warning('请选择一行！')
            }
        }
    }
}