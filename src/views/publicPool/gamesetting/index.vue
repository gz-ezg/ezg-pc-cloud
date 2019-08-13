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
                data:[
                    {content:"发放1000客户资源",planDate:"2019-08-13",count:1000,range:"市场一部--市场四部",status:"未导入",createName:"vn",createDate:"2019-08-13 12:02:06"},
                    {content:"发放1000客户资源",planDate:"2019-08-13",count:1000,range:"市场一部--市场四部",status:"已导入",createName:"vn",createDate:"2019-08-13 12:02:06"},
                    {content:"发放1000客户资源",planDate:"2019-08-13",count:1000,range:"市场一部--市场四部",status:"活动中",createName:"vn",createDate:"2019-08-13 12:02:06"},
                    {content:"发放1000客户资源",planDate:"2019-08-13",count:1000,range:"市场一部--市场四部",status:"已结束",createName:"vn",createDate:"2019-08-13 12:02:06"}
                    ],
                header: [
                    {
                        title: '活动内容',
                        key: 'content',
                        minWidth: 120,
                    },
                    {
                        title: '活动时间',
                        key: 'planDate',
                        width: 180
                    },
                    {
                        title: '数量',
                        key: 'count',
                        minWidth: 120,
                    },
                    {
                        title: '范围',
                        key: 'range',
                        minWidth: 100,
                    },
                    {
                        title: '状态',
                        key: 'status',
                        minWidth: 90
                    },
                    {
                        title: '创建人',
                        key: 'createName',
                        minWidth: 70,
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                        minWidth: 70,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:"center",
                        fixed:'right',
                        width: 250,
                        render:(h,params)=>{
                            if (params.row.status == "未导入") {
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
                            if (params.row.status == "已导入") {
                                return h('div',{},[
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        }
                                    },"[激活]")
                                ])
                            }
                            if (params.row.status == "活动中" || params.row.status == "已结束") {
                                return h('div',{
                                    style:{
                                        color:'#AEDD81'
                                    }
                                },'已激活')
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
        }
    }
</script>

<style>

</style>