export default {
    data(){
        return {
            sortField:'updatedate',
            order:'desc',
            search_model:"",
            formInline:{
                companyname:'',
                servicename:''
            },
            loading: false,
            currentRow: "",
            total: 0,
            page: 1,
            pageSize: 10,
            data:[],
            isAdmin: false
        }
    },
    methods: {
        sort(e){
            this.sortField = e.key
            if(e.order == 'normal'){
                this.order = 'desc'
                this.sortField = 'updatedate'
            }else{
                this.order = e.order
            }
            this.get_data()
        },
        download_excel(){
            let field = [
                {field:'workOrderStatus',title:'工单状态',format:'workOrderStatus'},
                {field:'companyname',title:'公司名称'},
                {field:'baseorderid',title:'提示'},
                {field:'departname',title:'服务部门'},
                {field:'product',title:'产品全称'},
                {field:'CurrentProcess',title:'目前进度'},
                {field:'nextprocess',title:'下个进度'},
                {field:'ServiceStart',title:'服务开始时间'},
                {field:'CreateDate',title:'创建时间'},                                                                   
                {field:'ServiceEnd',title:'实际完成时间'},                                                                     
                {field:'servername',title:'服务人员'},
                {field:'followname',title:'跟进人'} 
            ]
            let _self = this
            let url = `api/order/workOrderList`
            let config = {
                    page: '1',
                    pageSize: '1000000',              
                    companyName:_self.formInline.companyname,
                    serviceName:_self.formInline.servicename,
                    serviceDept:"'PLAN'",
                    export: 'Y',
                    workOrderStatus: _self.workStatusId,
                    exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        get_data(){
            var _self = this
            _self.loading = true
            var url = 'api/order/workOrderList'
            var config = {
                params:{
                    workOrderStatus: _self.workStatusId,
                    sortField:_self.sortField,
                    order:_self.order,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    companyName:_self.formInline.companyname,
                    serviceName:_self.formInline.servicename,
                    serviceDept:"'PLAN'"
                }
            }

            function success(res){
                // _self.data = res.data.data.rows
                _self.total = res.data.data.total
                _self.data = res.data.data.rows.map((item)=>{
                    if(item.CreateDate){
                        item.CreateDate = item.CreateDate.slice(0,10)
                    }
                    if(item.ServiceStart){
                        item.ServiceStart = item.ServiceStart.slice(0,10)
                    }
                    if(item.UpdateDate){
                        item.UpdateDate = item.UpdateDate.slice(0,10)
                    }
                    return item
                })
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.page = 1
            this.pageSize = e
            this.get_data()
        },
        search(){
            this.page = 1
            this.get_data()
        },
        reset(){
            this.page = 1
            this.$refs.formInline.resetFields()
            this.get_data()
        },
        save_current_row(e){
            this.currentRow = e
        },
        show_detail(){
            if(this.currentRow){
                this.$store.commit("open_gobal_work_order_detail_modal", this.currentRow.id)
            }else{
                this.$Message.warning('请选择一行查看详情！')
            }
        },
        next_step(){
            if(this.currentRow){
                this.$bus.emit("myflow", this.currentRow)
                return ;
            }
            this.$Message.warning('请选择一行进行流转！')
        },
        open_flow_chart(e){
            this.$emit("open-flow-chart", e.row.id)
        },
        company(){
            if(this.currentRow){
                this.$store.commit("open_gobal_company_detail_modal", this.currentRow.company_id)
                return ;
            }
            this.$Message.warning('请选择一行查看！')
        },
        re_create(){
            let _self = this
            if(this.currentRow){
                let url = `api/order/resetWorkOrderProcess`
                let config = {
                    params:{
                        workOrderId: _self.currentRow.id
                    }
                }
                function success(res){
                    _self.$Message.success(res.data.msg)
                    _self.$bus.emit("FLOW_NEXT")
                }
                _self.$Get(url,config,success)
            }else{
                this.$Message.warning('请选择一行！')
            }
        },
        finish_workerOrder(){
            let _self = this
            if(this.currentRow){
                console.log( _self.currentRow);
                let url = `api/order/goFinshWorkOrderProcess`
                let config = {
                    params:{
                        workOrderId: _self.currentRow.id
                    }
                }
                function success(res){
                    _self.$Message.success(res.data.msg)
                    _self.$bus.emit("FLOW_NEXT")
                }
                _self.$Get(url,config,success)
            }else{
                this.$Message.warning('请选择一行！')
            }
        },
        pass_workOrder(){
            let _self = this
            if(this.currentRow){
                let url = `api/order/work/order/plan/pass`
                let config = {
                    workOrderId: _self.currentRow.id
                }
                function success(res){
                    _self.get_data()
                }
                function fail(err){
                }
                _self.$Post(url,config,success,fail)
            }else{
                this.$Message.warning('请选择一行！')
            }
        },
        income_detail(){
            let _self = this
            if(this.currentRow){
                this.$bus.emit("PLAN_WORKORDER_INCOME_DETAIL", _self.currentRow.id)
            }else{
                this.$Message.warning('请选择一行！')
            }
        },
    },
    created() {
        let _self = this
        if(localStorage.getItem('id')==10059){
            _self.isAdmin = true
        }else{
            _self.isAdmin = false
        }
        _self.$bus.on('FLOW_NEXT',(e)=>{
            _self.get_data()
        })
		this.$bus.on("reflash",(e)=>{
			_self.get_data()
		})
    },
    mounted() {
        
    },
}