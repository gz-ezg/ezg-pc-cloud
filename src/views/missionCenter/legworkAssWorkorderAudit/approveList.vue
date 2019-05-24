<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";

    export default {
        name: "unApproveList",
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                data:[],
                selectRow:"",
                taskArea:[],
                taskPlace:[],
                taskArea_map:new Map(),
                taskPlace_map:new Map(),
                header:[
                    {
                        title: '协助工单号',
                        key: 'apply_code',
                        minWidth: 140,
                    },
                    {
                        title: '预计截止时间',
                        key: 'expect_date',
                        minWidth: 140,
                    },
                    {
                        title: '企业',
                        key: 'companyname',
                        minWidth: 240,
                    },
                    {
                        title: '工单',
                        key: 'productname',
                        minWidth: 140,
                    },
                    {
                        title: '事由',
                        key: 'apply_content',
                        minWidth: 140,
                    },
                    {
                        title: '区域',
                        key: 'task_area',
                        minWidth: 140,
                    },
                    {
                        title: '地点',
                        key: 'task_place',
                        minWidth: 140,
                    },
                    {
                        title: '会计',
                        key: 'creatorName',
                        minWidth: 140,
                    },
                    {
                        title: '商事',
                        key: 'excutor_name',
                        minWidth: 140,
                    },
                    {
                        title: '安排时间',
                        key: 'plan_date',
                        minWidth: 140,
                    },
                    {
                        title: '确认',
                        key: 'check_name',
                        minWidth: 140,
                    },
                    {
                        title: '核实备注',
                        key: 'check_memo',
                        minWidth: 140,
                    },
                    {
                        title: '核实时间',
                        key: 'check_date',
                        minWidth: 140,
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            get_data(){
                let _self = this
                let url =`api/task/getBusAssApplyList`
                _self.loading = true
                let config = {
                    params: {
                        Audited:"Audited"
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i < _self.data.length; i++){
                        _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        _self.data[i].task_area = _self.taskArea_map.get(_self.data[i].task_area)
                        _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                    }
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve,reject) => {
                    let params ="gzbusinessarea,gzbusinessplace"

                    function success(res){
                        _self.taskArea = res.data.data.gzbusinessarea
                        _self.taskPlace = res.data.data.gzbusinessplace
                        _self.taskArea_map = _self.$array2map(_self.taskArea)
                        _self.taskPlace_map = _self.$array2map(_self.taskPlace)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            }
        },
        created() {
            this.loading = true
            this.get_data_center()
                this.get_data()
            this.$bus.on("UPDATE_APPROVE_LIST",()=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>