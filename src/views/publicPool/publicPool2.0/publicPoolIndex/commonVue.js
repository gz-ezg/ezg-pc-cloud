//  营销管理-公共内容
export default {
    data() {
        return {
            //  选中的一行
            selectRow: "",
            selectRowArray:[],
            customerId: "",
            //  数据字典
            customerTypes: [],
            cluesources: [],
            customerrating: [],
            area: [],
            sf_yn: [],
            importance: [],
            //  数据字典map
            cluesources_map: new Map(),
            customerrating_map: new Map(),
            area_map: new Map(),
            sf_yn_map: new Map(),
            importance_map: new Map(),
            pool_type_map: new Map(),
            pool_sub_type_map: new Map(),
            //  单独处理的客户状态
            customerTypes_Casr: [], //  二级联表专用
            customerTypes_array: [], // 二维数组转一维数组
        }
    },
    methods: {
        //  获取数据字典函数,后面可接其他内容
        //  在客户列表获取
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject)=>{
                let _self = this
                let params = "customerTypes,cluesources,customerrating,area,sf_yn,importance,poolType,poolSubType";

                function success(res){
                    _self.customerTypes = res.data.data.customerTypes
                    _self.cluesources = res.data.data.cluesources
                    _self.customerrating = res.data.data.customerrating
                    _self.area = res.data.data.area
                    _self.sf_yn = res.data.data.sf_yn
                    _self.importance = res.data.data.importance
                    _self.poolType = res.data.data.poolType
                    _self.poolSubType = res.data.data.poolSubType

                    _self.cluesources_map = _self.$array2map(_self.cluesources)
                    _self.customerrating_map = _self.$array2map(_self.customerrating)
                    _self.area_map = _self.$array2map(_self.area)
                    _self.sf_yn_map = _self.$array2map(_self.sf_yn)
                    _self.importance_map = _self.$array2map(_self.importance)
                    _self.pool_type_map = _self.$array2map(_self.poolType)
                    _self.pool_sub_type_map = _self.$array2map(_self.poolSubType)
                    _self.customerTypes_Casr = _self.$changeCars(_self.customerTypes)
                    _self.customerTypes_array = _self.$Data2Casr(_self.customerTypes)
                    resolve()
                }
                this.$GetDataCenter(params, success)
            })
        },
        refresh(){
            let _self = this;
            _self.get_data();
        },
        check_select(e){
            console.log(e)

            if (e == 'CUSTOMER_CHANGE_MARKETER') {
                console.log(0);
                if (this.selectRow.length !== 0) {
                    console.log(1);
                  this.$bus.emit(e, this.selectRow)
                } else if (this.row) {
                    console.log(2);
                  this.$bus.emit(e, [this.row])
                } else {
                    console.log(3);
                  this.$Message.warning('请选择需要操作的客户！')
                }
              }else{
                if(this.selectRow){
                    this.$bus.emit(e, this.selectRow)
                }else{
                    this.$Message.warning("请选择需要操作的客户！")
                }
              }

            
        }
    },
    created(){
        
    }
}
