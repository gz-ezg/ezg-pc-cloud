<template>
    <div>
        <Tabs value="name1">
            <TabPane label="待分配" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="Distribution_task">一键分配</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="Ndata"
                                @on-selection-change="select_change"
                                :loading="Nloading"  ></Table>
                        <Page
                                size="small"
                                :total="NpageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="NpageChange"
                                @on-page-size-change="NpageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
            <TabPane label="已分配" name="name2">
            </TabPane>
        </Tabs>
        <AllotDetail></AllotDetail>
        <Modal
            title="一键分配工单"
            width="300"
            v-model="Distribution"
        >
            <Form ref="task_detail" :model="task_detail" :label-width="90">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="companyName" label="服务部门：">
                            <Input type="text" v-model="task_detail.companyName" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="服务人员：">
                            <Select transfer v-model="userId" transfer>
                            <Option v-for="(item,index) in allDepartUser" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="Distribution=false">关闭</Button>
                <Button type="primary" @click="allot">分配</Button>                
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'
import AllotDetail from './detail'

    export default {
        components:{
            AllotDetail
        },
        data() {
            return {
                Nloading:false,
                Distribution:false,
                change_rows:[],
                detailModal: false,
                huashu: false,
                value1: '1',
                task_detail:{},
                formItem: [{
                    input: ''
                }],
                //  商事部人员列表
                allDepartUser:'',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        width: 180
                    },
                    {
                        title: '归属客户',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        width: 150
                    },
                    {
                        title: '订单号',
                        key: 'ordercode',
                        width: 150
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 120
                    },
                    {
                        title: '开始服务时间',
                        key: 'ServiceStart',
                        width: 150
                    },
                    {
                        title: '当前流程',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '服务起始时间',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '是否开始执行',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '已读/未读',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '服务是否完成',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'UpdateDate',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            Bus.$emit('openAllotTask',params)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                //  表格相关
                NpageTotal:"",
                Npage:'1',
                NpageSize:'10',
                Ndata: [],
                //  分配相关
                userId:'',
                workOrderIds:'',
                //  服务部门id
                ServiceDeptID:''
            }
        },
        methods: {
            getData(){
                var _self = this
                _self.Nloading = true
                var url = 'api/order/workOrderList'
                var config = {
                    params:{
                        page:_self.Npage,
                        pageSize:_self.NpageSize,
                        state:"sharedN"
                    }
                }
                    
                _self.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)                    
                    _self.Ndata = res.data.data.rows
                    _self.NpageTotal = res.data.data.total
                    _self.Nloading = false
                })
                
            },
            NpageChange(e){
                this.Npage = e
                this.getData()
            },
            NpageSizeChange(e){
                this.NpageSize = e
                this.getData()
            },
        //  勾选检测
            select_change(e){
                // console.log(e)
                this.change_rows = [],
                this.change_rows = e
                console.log(this.change_rows)
            },
        //  分配工单
            Distribution_task(){
                let flag = false
                let _self = this
                if(_self.change_rows!=''){
                    console.log('111111111')
                    let temp = _self.change_rows[0].ServiceDeptID
                    console.log(temp)
                    for(let i = 0;i<_self.change_rows.length;i++){
                        if(temp==_self.change_rows[i].ServiceDeptID && i==_self.change_rows.length-1){
                            flag = true
                        }
                    }
                        if(flag==true){
                            _self.Distribution = true
                            _self.ServiceDeptID = _self.change_rows[0].ServiceDeptID
                            _self.getAllUserList()
                        }else{
                            _self.$Message.warning('请选择相同的服务部门！')
                        }    
                }else{
                    _self.$Message.warning('请选择需要分配的工单！')
                }
            },
        //  获取商事部人员
            getAllUserList(){
                let url = 'api/user/getUserListByDepartId?departId='+ this.ServiceDeptID
                // 11572
                let _self = this
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data)
                    _self.allDepartUser = res.data.data
                })
            },
            allot(){
                let _self = this
                let url = 'api/order/batchUpdateServicer'
                let temp = []
                for(let i = 0;i<_self.change_rows.length;i++){
                    temp.push(_self.change_rows[i].id)
                }
                    _self.workOrderIds = temp.join(",")
                let config = {
                    workOrderIds:_self.workOrderIds,
                    userId: _self.userId
                }
                this.$http.post(url,config).then(function(res){
                    console.log(res)
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>