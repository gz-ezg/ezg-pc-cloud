<template>
    <Card>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="add">新增</Button>
                <Button type="primary" icon="information-circled" @click="show">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit">修改</Button>
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="import_excel">导入Excel</Button>-->
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    @on-row-dblclick="show"
                    border
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
        </Row>
        <detail></detail>
    </Card>
</template>

<script>
    import Detail from './common/detail'
    export default {
        name: "index",
        components: {Detail},
        props:{
            Detail
        },
        data(){
            return{
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                activity_status:[],
                activity_status_map:new Map(),
                data:[],
                header: [
                    {
                        title: '活动内容',
                        key: 'content',
                        minWidth: 120,
                    },
                    {
                        title: '活动时间',
                        key: 'activity_time',
                        width: 180
                    },
                    {
                        title: '数量',
                        key: 'amount',
                        minWidth: 120,
                    },
                    {
                        title: '范围',
                        key: 'departname',
                        minWidth: 100,
                    },
                    {
                        title: '状态',
                        key: 'status',
                        minWidth: 90,
                        render:(h,params)=>{
                            return h('div',{},this.activity_status_map.get(params.row.status))
                        }
                    },
                    {
                        title: '创建人',
                        key: 'realname',
                        minWidth: 70,
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 70,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:"center",
                        fixed:'right',
                        width: 250,
                        render:(h,params)=>{
                            if (params.row.status == "dd") {
                                return h('div',{},[
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        }
                                    },"[导入名单]"),
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        }
                                    },"[激活]")
                                ])
                            }
                            if (params.row.status == "hdz") {
                                return h('div',{
                                    style:{
                                        color:'#AEDD81'
                                    }
                                },'活动中')
                            }
                            if (params.row.status == "yjs") {
                                return h('div',{
                                    style:{
                                        color:'red'
                                    }
                                },'已结束')
                            }
                        }
                    },
                ]
            }
        },
        methods: {
            selectRow(e) {
                console.log(e)
                this.current_row = e;
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            add(){
                this.$bus.emit("ADD_SETTING_INFO",this.current_row)
            },
            show(){
                if (this.current_row) {
                    console.log(this.current_row)
                    this.$bus.emit("SHOW_SETTING_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            edit(){
                if (this.current_row) {
                    this.$bus.emit("EDIT_SETTING_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            get_data(){
                let _self = this;
                _self.data1 = []
                _self.loading = true;
                this.current_row = ""
                let url = `api/customer/highseasActivity/list`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                    }
                }

                function success(res){
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_data_center(){
                let params = "activity_status"
                let _self = this
                function success(res){
                    _self.activity_status = res.data.data.activity_status
                    _self.activity_status_map = _self.$array2map(_self.activity_status)
                }
                this.$GetDataCenter(params, success)
            },
        },
        created() {
            this.get_data_center()
            this.get_data()
            this.$bus.off("UPDATE_INDEX",true)
            this.$bus.on("UPDATE_INDEX",e=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>