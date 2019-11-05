<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                    <!-- <Search slot="content"></Search> -->
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="searchModel" :model="searchModel" :label-width="100">
                            <Row>
                                <Col span="6">
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input size="small"  type="text" v-model="searchModel.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem prop="zxName" label="商事名称：">
                                        <Input size="small"  type="text" v-model="searchModel.zxname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem prop="kjName" label="会计名称：">
                                        <Input size="small"  type="text" v-model="searchModel.kjname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem prop="allotTime" label="分配时间：">
                                        <DatePicker transfer type="daterange" placement="bottom-start" style="width:100%" v-model="searchModel.allotTime" size="small"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                <FormItem label="注销单状态：" prop="cancellation_status">
                                    <Select transfer v-model="searchModel.cancellation_status" size="small" @on-change="search"  style="width:100%">
                                        <Option value="">     </Option>
                                        <Option v-for="item in cancellation_workorder_status" :value="item.typecode" :key="item.id">
                                            {{ item.typename }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem>
                                        <Button size="small" type="primary" @click="search">搜索</Button>
                                        <Button size="small" type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="openCancelRemarkModel">添加注销备注</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        ref="selection"
                        highlight-row
                        size="small"
                        :loading="loading"
                        @on-current-change="selectrow"
                        :columns="header"

                        :data="data"></Table>
                <Page
                            size="small"
                            :total="pageTotal"
                            :current.sync="page"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            placement="top"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                style="margin-bottom:10px"
                v-model="cancel_remark_modal"
                title="添加注销备注"
                @on-cancel="closeCancelRemarkModel"
        >
            <Form ref="formInline" :model="formInline" >
                <FormItem >
                    <Input type="textarea" v-model="formInline.remark" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeCancelRemarkModel">关闭</Button>
                <Button type="primary" @click="submitCancelRemark">添加</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import Bus from '../../../components/bus'
    import { DateFormat,simpleCodeToText } from '../../../libs/utils.js'

    export default {
        name:'cancelWorkOrder_index',
    /*    components: {
            companyDetail
        },*/
        data() {
            return {
                formInline:{
                    remark:''

                },
                cancel_remark_modal:false,
                loading: false,

                //  查看框
                //  筛选
                search_model:1,
                current_row:"",
                pageTotal: new Number(),
                page: 1,
                pageSize: 10,
                searchModel: {
                    companyname: "",
                    cancellation_status: "",
                    zxName: "",
                    allotTime: [],
                    kjName: ""
                },
                cancellation_workorder_status:[],
                data: [],
                header: [
                    {
                        title: '公司',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '状态',
                        key: 'cancellation_status',
                        width: 120
                    },
                    {
                        title: '历史账务',
                        key: 'historical_ccounting',
                        width: 120
                    },
                    {
                        title: '分配时间',
                        key: 'allot_time',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        width: 120
                    },
                    {
                        title: '商事',
                        key: 'zxname',
                        width: 120
                    },
                    {
                        title: '会计',
                        key: 'kjname',
                        width: 210
                    },
                    {
                        title: '备注',
                        key: 'cancellation_remark',
                        width: 160
                    }
                ]
            }
        },
        methods:{
            getData(){
                let _self = this
                this.loading = true
                let url = `api/order/workorder/cancellationWorkorder/cancellationWorkOrderList`
                let config = {
                    params:{
                        page: _self.page,
                        pageSize: _self.pageSize,
                        companyname: _self.searchModel.companyname,
                        zxName: _self.searchModel.zxName,
                        kjName: _self.searchModel.kjName,
                        allotBeginTime: DateFormat(_self.searchModel.allotTime[0]),
                        allotEndTime: DateFormat(_self.searchModel.allotTime[1]),
                        cancellation_status: _self.searchModel.cancellation_status,
                        sortField:'allot_time'
                    }
                }

                function success(res){
                    // console.log(res.data.data)
                    _self.loading = false
                    _self.pageTotal = res.data.data.total
                    _self.data = res.data.data.rows
                    for(let i = 0; i<_self.data.length;i++){
                        _self.data[i].cancellation_status = simpleCodeToText( _self.data[i].cancellation_status,_self.cancellation_workorder_status)
                        _self.data[i].allot_time = DateFormat( _self.data[i].allot_time)
                        _self.data[i].updatedate = DateFormat( _self.data[i].updatedate)

                    }
                }

                function fail(err){
                    _self.loading = false
                }

                this.$Get(url, config, success, fail)
            },

            //  downexcel
            downloadExcel(){
                let field = [
                    {field:'companyname',title:'公司名称'},
                    {field:'cancellation_status',title:'状态',format:'cancellation_workorder_status'},
                    {field:'historical_ccounting',title:'历史账务'},
                    {field:'zxname',title:'商事人员'},
                    {field:'kjname',title:'会计人员'},
                    {field:'allot_time',title:'分配时间'},
                    {field:'cancellation_remark',title:'备注'}
                    ]
                let _self = this
                let url = `api/order/workorder/cancellationWorkorder/cancellationWorkOrderList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        companyname: _self.searchModel.companyname,
                        zxName: _self.searchModel.zxName,
                        kjName: _self.searchModel.kjName,
                        allotBeginTime: DateFormat(_self.searchModel.allotTime[0]),
                        allotEndTime: DateFormat(_self.searchModel.allotTime[1]),
                        cancellation_status: _self.searchModel.cancellation_status,
                        export: 'Y',
                        sortField:'allot_time',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            //  筛选重置
            reset(){
                this.page = 1
                this.$refs['searchModel'].resetFields();
                this.getData()
            },
            //  筛选开始
            search(){
                this.page = 1
                this.getData()
            },
            pageChange(e){
                this.page = e
                this.getData()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.getData()
            },
            getDataCenter(){
                let _self = this
                function  success(res){
                    _self.cancellation_workorder_status = res.data.data.cancellation_workorder_status
                }
                this.$GetDataCenter("cancellation_workorder_status",success)
            },
            //  弹出查看
            selectrow(e){
                this.current_row = e
            },
            //打开注销备注
            openCancelRemarkModel(){
                let _self = this
                if(_self.current_row.id){
                    _self.cancel_remark_modal = true;
                    _self.formInline.remark = _self.current_row.cancellation_remark;
                }else{
                    _self.$Message.warning('请选择一行后操作')
                }

            },
            //关闭注销备注
            closeCancelRemarkModel(){
                let _self = this
                this.cancel_remark_modal = false;
            },
            //提交注销备注
            submitCancelRemark(){
                let _self = this
                if(isNull(_self.formInline.remark )){
                    _self.$Message.warning('请先填写备注')
                    return;
                }

                _self.loading=true
                let url = "/order/workorder/cancellationWorkorder/updateCancellationWorkOrderStatus";
                let config ={
                    id:_self.current_row.id,
                    remark:_self.formInline.remark
                }
                function isNull(str) {
                    if ( str == "" ) {
                        return true;
                    }

                    if(str.replace(/(^\s*)|(\s*$)/g, "").length ==0){
                        return true;
                    }

                    var regu = "^[ ]+$";
                    var re = new RegExp(regu);
                    return re.test(str);
                }
                function doSuccess(re) {
                    _self.$Message.success('修改成功!')
                    _self.getData()
                    _self.formInline.remark = ""
                    _self.loading = false
                    _self.closeCancelRemarkModel()
                }
                function fail() {
                    _self.$Message.warning('网络异常!')
                    _self.loading = false
                }
                _self.PostData(url, config, doSuccess,fail)

            }
        },
        mounted() {

        },
        created () {
            this.getData()
            this.getDataCenter()
        }
    }
</script>

<style>
    .ivu-col-span-6 {
        height: 28px;
    }
</style>