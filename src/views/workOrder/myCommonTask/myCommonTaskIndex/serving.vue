<template>
    <Card style="height:700px">
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
                <Button type="primary" icon="ios-color-wand-outline">流转</Button>
                <Button type="primary" icon="ios-color-wand-outline">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline">产品异常</Button>
                <Button type="primary" icon="ios-color-wand-outline">批量已读</Button>
                <Button type="primary" icon="ios-color-wand-outline">批量未读</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="foundClues">发现线索</Button>               
            </ButtonGroup>
            <search></search>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :columns="header"
                :data="data"></Table>
            <Page
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
        <clues></clues>
        <Modal
                v-model="flowChart1"
                title="查看流程图"
                width="80%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal>
        <Modal
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
        </Modal>
    </Card>
</template>

<script>
import Search from './search'
import Detail from './detail'
import CompanyDetail from './companydetail'
import Clues from './clues'
import Bus from '../../../../components/bus'

export default {
    components:{
        Search,
        Detail,
        CompanyDetail,
        Clues
    },
    data() {
            return {
                //  流程图相关,1.弹出框2.流程图地址
                flowChart1:false,
                flowChartImg:'',
                //  暂停/重启
                pause:false,
                //  终止订单
                endlife:false,
                //  表格相关data
                pageTotal:"10",
                data:[
                    {
                        baseorderid:'1'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    },
                    {
                        baseorderid:'2'
                    }
                ],
                header: [
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '提示',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '订单',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '目前进度',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '下个进度',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '该项预计完成时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '实际完成时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '提示',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 330,
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
                                            console.log('1111111111111')
                                            Bus.$emit('showcompanydetail',true)
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
                                            console.log('111111');
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
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.endlife = true
                                        }
                                    }
                                }, '[退款终止]'),
                            ]);
                        }
                    }
                ]
            }
        },
    methods:{
        showdetail(){
            Bus.$emit('myCommonTask',true)
        },
        flowChart(a) {
                let _self = this
                // if (_self.customerId == '') {
                //     _self.$Message.warning('请选择订单项');
                // } else {
                _self.flowChart1 = true
                _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + a.row.id
                // }
        },
        foundClues(){
            console.log('111')
            Bus.$emit('workOrderClues',true)
        }
    }

}
</script>

