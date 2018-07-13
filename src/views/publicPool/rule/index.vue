<template>
    <div>
        <Card>
            <!-- <Cascader :data="customerTypes" v-model="value1" trigger="hover"></Cascader> -->
            <div slot="title">规则说明</div>
            <div>
                <Row>
                    1、如果启用了【超过N天“未成交”的客户，由系统定时划入公海】，即便在N天内跟进了，只要客户的客户状态不是“成交客户”，仍然会被划入公海。
                </Row>
                <Row>2、超级管理员负责的客户，不会自动划入客户公海。</Row>
                <Row>3、渠道客户的惩罚默认为由有效成交线索转成有效线索</Row>
                <Row>4、市场部客户的惩罚默认为转入公海池</Row>
                <Row>5、划入期限为0时，惩罚实时生效；划入时间为N时，惩罚不生效</Row>
                <Row>6、客户状态、客户等级。行为、跟进评分不能都选择“全部”或者“无”</Row>
            </div>
        </Card>
        <Card>
            <ButtonGroup>
                <Button type="primary" @click="open_create_pool_rule" style="margin-bottom:10px">新增规则</Button>
            </ButtonGroup>
            <Table
                highlight-row
                size="small"
                :columns="columns"
                :data="data"
                :loading = "rule_loading"
            ></Table>
            <Page
                size="small"
                :total="pageTotal"
                :current.sync="page"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Card>
        <create-rule :type="customerTypes"></create-rule>
        <update-rule :type="customerTypes"></update-rule>
    </div>
</template>

<script>
import createRule from './create_rule'
import updateRule from './update_rule'

export default {
    components:{
        createRule,
        updateRule
    },
    data(){
        return{
            columns:[
                {
                    title:'部门',
                    key:'depart_name',
                    width: 120
                },
                {
                    title:'客户状态',
                    key:'customer_status',
                    width: 150
                },
                {
                    title:'客户级别',
                    key:'customer_level',
                    width: 120
                },
                {
                    title:'客户区域',
                    key:'customer_area',
                    width:120
                },
                {
                    title:'客户渠道',
                    key:'channel_type_name',
                    width:120
                },
                {
                    title:'行为',
                    key:'behavior',
                    width: 120
                },
                {
                    title:'跟进评分',
                    key:'follow_ranks',
                    width: 120
                },
                // {
                //     title:'产品类型',
                //     key:'',
                //     width: 120
                // },
                {
                    title:'通知期限',
                    key:'notify_time',
                    width: 120
                },
                {
                    title:'更改期限',
                    key:'change_time',
                    width: 120
                },
                {
                    title:'惩罚',
                    key:'punishment',
                    width: 120
                },
                {
                    title:'规则备注',
                    key:'rule_memo',
                    width: 180,
                    render:(h,params) => {
                        if(1){
                            return h('div','内容')
                        }else{
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '说明',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.data[params.index].companyNames[0].name.slice(0,13) + '...'),
                                h('div', {
                                    slot: 'content'
                                },[
                                    h('span',params.row.address1)
                                ]
                                )
                            ]);
                        }
                    }
                },
                {
                    title:'规则状态',
                    key:'rule_status',
                    width: 120
                },
                {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            if(1){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, '[修改]'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, '[执行]'),
                                ]);
                            }else{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, '[修改]'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, '[停止]'),
                                ]);
                            }
                        }
                },
            ],
            data:[],
            rule_loading:false,
            pageTotal:new Number(),
            page:1,
            customerTypes:[],
            customerrating:[],
            cluesources:[],
            area:[],
            customerrating_Map:new Map(),
            cluesources_Map:new Map(),
            area_Map:new Map(),
            customerTypes_Array:[]
        }
    },
    methods:{
        getData(){
            let _self = this
            let url = `api/crm/sale/rule/list`
            _self.rule_loading = true
            let config = {
                params:{
                    page:_self.page,
                    pageSize:10
                }
            }

            function success(res){
                _self.pageTotal = res.data.data.total
                _self.data = res.data.data.rows
                _self.rule_loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        getCustomerType(){
            let _self = this
            function success(res){
                _self.customerTypes = _self.$changeCars(res.data.data.customerTypes)
                _self.customerTypes_Array = _self.$Data2Casr(res.data.data.customerTypes)
                console.log(_self.customerTypes_Array)
            }
            this.$GetDataCenter("customerTypes",success)
        },
        getDataCenter(){
            let _self = this
            function success(res){
                _self.customerrating = res.data.data.customerrating
                _self.area = res.data.data.area
                _self.cluesources = res.data.data.cluesources
                _self.customerrating_Map = _self.$array2map(_self.customerrating)
                _self.area = _self.$array2map(_self.area)
                _self.cluesources = _self.$array2map(_self.cluesources)
            }

            this.$GetDataCenter("customerrating,cluesources,area",success)
        },
        open_create_pool_rule(){
            this.$bus.emit('open_create_customer_rule',true)
        }
    },
    created(){
        this.getDataCenter()
        this.getCustomerType()
        this.getData()
    }
}
</script>

