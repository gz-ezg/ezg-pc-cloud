<template>
    <div>
        <Card style="min-width:800px">
            <!--    <Row style="margin-bottom:10px">
                    <search-model :data="searchData" @search="search"></search-model>
                </Row>-->
            <Row>

                <ButtonGroup>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="showDetail">查看详情</Button>
                <!--    <Button  type="primary"  icon="ios-color-filter-outline" @click="showImage">查看图片</Button>-->
                </ButtonGroup>

            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        @on-row-click="select_row"
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="page_change"
                        @on-page-size-change="page_size_change"
                        style="margin-top: 10px"></Page>
            </Row>
            <detail :legworkId="currentRow.id" :legwork_finish_statusMap="legwork_finish_statusMap" :taskKindMap="taskKindMap"></detail>
        </Card>

    </div>
</template>

<script>
    import detail from "./detail.vue"
    export default {
        components:{
            detail
        },
        data(){
            return {
                order:'begin_time',
                currentRow: {},
                loading: true,
                page: 1,
                pageSize: 10,
                total: 0,
                data:[],
                legwork_finish_statusMap:{},
                taskKindMap:{},
                header: [
                    {
                        title: "开始打卡地址",
                        key: 'begin_address',
                        width: 180
                    },
                    {
                        title: "开始打卡时间",
                        key: 'begin_time',
                        minWidth: 140
                    },
                    {
                        title: "结束打卡地址",
                        key: "end_address",
                        minWidth: 140
                    },
                    {
                        title: "结束打卡时间",
                        key: 'end_time',
                        minWidth: 100
                    },
                    {
                        title: "开始打卡备注",
                        key: "begin_memo",
                        minWidth: 100
                    },
                    {
                        title: '外勤状态',
                        key: 'legwork_status',
                        minWidth: 90
                    },{
                        title: '打卡人',
                        key: 'realname',
                        minWidth: 90
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/user/legwork/list'
                var config = {
                    params:{
                        order:_self.order,
                        page:_self.page,
                        pageSize:_self.pageSize

                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    _self.loading = false;
                   for(let i = 0; i < _self.data.length; i++){
                        if(_self.data[i].legwork_status =="begin"){
                            _self.data[i].legwork_status = "未结束打卡"
                        }else if(_self.data[i].legwork_status =="imgNotUpload"){
                            _self.data[i].legwork_status = "图片未上传"
                        }else{
                            _self.data[i].legwork_status = "打卡完成"
                        }
                    }

                })

            },
            page_size_change(e){
                this.pageSize = e
                this.get_data()
            },
            page_change(e){
                this.page = e
                this.get_data()
            },
            select_row(e){
                this.currentRow = e;
            },
            download_excel(){
                let field = [
                    {field:'begin_address',title:'开始打卡地址'},
                    {field:'begin_time',title:'开始打卡时间'},
                    {field:'end_address',title:'结束打卡地址'},
                    {field:'end_time',title:'结束打卡时间'},
                    {field:'begin_memo',title:'开始打卡备注'},
                    {field:'legwork_status',title:'外勤状态'},
                    {field:'realname',title:'打卡人'}
                ]
                let _self = this
                var url = 'api/user/legwork/list'
                let config = {
                    order:_self.order,
                    page:'1',
                    pageSize:'1000000' ,
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))

                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            showDetail(){
                if(!this.currentRow.id){
                    this.$Message.warning("请选中一行后操作");
                    return
                }
                this.$bus.emit("openShowDetail")
            }
        },
        created(){
            let _self = this;
            this.$GetDataCenter("legwork_finish_status,taskKind",callback);
            function  callback(e) {
                _self.legwork_finish_statusMap = _self.$array2map(e.data.data.legwork_finish_status);
                _self.taskKindMap = _self.$array2map(e.data.data.taskKind);
                _self.get_data();
            }

        }
    }
</script>
