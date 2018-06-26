<template>
    <Card>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="information-circled" @click="showdetail3">查询详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="showflow3">流转</Button>
                <Button type="primary" icon="ios-color-wand-outline">导出Excel</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="product_error">产品异常</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline">批量已读</Button>
                <Button type="primary" icon="ios-color-wand-outline">批量未读</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="foundClues">发现线索</Button>                -->
            </ButtonGroup>
            <search></search>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                @on-current-change="save_current_row"
                ></Table>
            <Page
                :placement="top"
                size="small"
                :total="pageTotal"
                show-total
                show-sizer
                show-elevator
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                style="margin-top: 10px"></Page>
        </Row>
        <detail></detail>
        <company-detail></company-detail>
        <!-- <clues></clues> -->
        <flow></flow>
        <Modal
                v-model="flowChart1"
                title="查看流程图"
                width="80%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal>
        <!-- <Modal
            v-model="pause"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否暂停/解锁</div>
            <div slot="footer">
                <Button type="primary" @click="pausetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="pause=!pause">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="endlife"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否退款终止</div>
            <div slot="footer">
                <Button type="primary" @click="endlifetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="endlife=!endlife">取消</Button>
            </div>
        </Modal> -->
    </Card>
</template>

<script>
import Search from './search'
import Detail from './detail'
import CompanyDetail from './companydetail'
// import Clues from './clues'
import Flow from './flow'
import Bus from '../../../../../components/bus'

export default {
    components:{
        Search,
        Detail,
        CompanyDetail,
        // Clues,
        Flow
    },
    data() {
            return {
                value1:[1,2],
                //  当前选中行
                current_row:'',
                //  流程图相关,1.弹出框2.流程图地址
                flowChart1:false,
                flowChartImg:'',
                //  暂停/重启
                pause:false,
                //  终止订单
                endlife:false,
                //  表格相关data
                pageTotal:"",
                page:'1',
                pageSize:'10',
                data:[
                ],
                header: [
                    {
                        title: '工单状态',
                        key: 'zhuangtai'
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 220
                    },
                    {
                        title: '提示',
                        key: 'baseorderid',
                        width: 120
                    },
                    // {
                    //     title: '订单',
                    //     key: 'ordercode',
                    //     width: 150
                    // },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 150
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '下个进度',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        width: 120
                    },
                    // {
                    //     title: '预计完成时间',
                    //     key: 'baseorderid',
                    //     width: 120
                    // },
                    {
                        title: '实际完成时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'followbyrealname',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params)
                                            Bus.$emit('showcompanydetail3',params)
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.flowChart(params)
                                        }
                                    }
                                }, '[流程图]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.pause = true
                                        }
                                    }
                                }, '[暂停/解锁]'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.endlife = true
                                //         }
                                //     }
                                // }, '[退款终止]'),
                            ]);
                        }
                    }
                ]
            }
        },
    methods:{
        getData(){
            var _self = this
            var url = 'api/order/workOrderList?state=over'
            var config = {
                params:{
                    page:_self.page,
                    pageSize:_self.pageSize
                }
            }
                
            _self.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)                
                // console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0;i<res.data.data.rows.length;i++){
                    // console.log(_self.data[i])
                    if(_self.data[i].CreateDate!=''){
                        _self.data[i].CreateDate = _self.data[i].CreateDate.slice(0,10)
                    }
                    if(_self.data[i].ServiceStart!=''){
                        _self.data[i].ServiceStart = _self.data[i].ServiceStart.slice(0,10)
                    }
                }

            })
        },
        //  保存当前选中行
        save_current_row(e){
            this.current_row = e
        },
        showdetail3(){
            console.log('111')
            if(this.current_row != ''){
                Bus.$emit('myCommonTask3',this.current_row)
            }else{
                this.$Message.warning('请选择一行查看详情！')
            }
        },
        showflow3(){
            if(this.current_row != ''){
                Bus.$emit('myflow3',this.current_row)
            }else{
                this.$Message.warning('请选择一行进行流转！')
            }
        },
        //  流程图
        flowChart(a) {
                let _self = this
                _self.flowChart1 = true
                _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + a.row.id +'&bussinessType=20&time=' + new Date()
        },
        // foundClues(){
        //     Bus.$emit('workOrderClues',true)
        // }
    },
    created(){
        this.getData()
    }

}
</script>



