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
        <create-rule :CUStype="customerTypes" :cluesources="cluesources" :area="area" :behavior="behavior" :fpunishment="fpunishment" :productType="productType" :customerrating="customerrating"></create-rule>
        <update-rule :CUStype="customerTypes" :cluesources="cluesources" :area="area" :behavior="behavior" :fpunishment="fpunishment" :productType="productType" :customerrating="customerrating"></update-rule>
    </div>
</template>

<script>
import createRule from './create_rule'
import updateRule from './update_rule'

export default {
    name:'market_rule_index',
    components:{
        createRule,
        updateRule
    },
    data(){
        return{
            columns:[
                {
                    title:'部门',
                    key:'departname',
                    width: 120
                },
                {
                    title:'客户状态',
                    key:'customer_status_name',
                    width: 150
                },
                {
                    title:'排除客户状态',
                    key:'exculde_customer_status_name',
                    width: 150
                },
                {
                    title:'客户级别',
                    key:'customer_level_name',
                    width: 120
                },
                {
                    title:'客户区域',
                    key:'customer_area_name',
                    width:120
                },
                {
                    title:'客户渠道',
                    key:'channel_type_name',
                    width:120
                },
                {
                    title:'行为',
                    key:'behavior_name',
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
                    key:'punishment_name',
                    width: 120
                },
                {
                    title:'规则备注',
                    key:'rule_memo',
                    width: 180,
                    render:(h,params) => {
                        if(params.row.rule_memo.length<10){
                            return h('div',params.row.rule_memo)
                        }else{
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '详情',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', params.row.rule_memo.slice(0,10) + '...'),
                                h('div', {
                                    slot: 'content'
                                },[
                                    h('span',params.row.rule_memo)
                                ]
                                )
                            ]);
                        }
                    }
                },
                {
                    title:'规则状态',
                    key:'taskstate',
                    width: 120
                },
                {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.taskstate == "PAUSED" || params.row.taskstate == null){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.$bus.emit('open_edit_customer_rule',params.row)                                                
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
                                                this.start(params.row.task_id)
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
                                                this.$bus.emit('open_edit_customer_rule',params.row)
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
                                                this.stop(params.row.task_id)
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
            //  客户等级
            customerrating:[],
            //  客户渠道
            cluesources:[],
            //  地区
            area:[],
            //  行为
            behavior:[],
            //  惩罚措施
            fpunishment:[],
            //  产品类型
            productType:[],
            customerrating_Map:new Map(),
            cluesources_Map:new Map(),
            area_Map:new Map(),
            fpunishment_Map: new Map(),
            behavior_Map: new Map(),
            productType_Map: new Map(),
            customerTypes_Array:[]
        }
    },
    methods:{
        start(e){
            let _self = this
            let url = `api/system/task/job/begin`
            let config = {
                jobId:e
            }

            function success(res){
                _self.getData()
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        },
        stop(e){
            let _self = this
            let url = `api/system/task/job/pause`
            let config = {
                jobId:e
            }

            function success(res){
                _self.getData()
            }

            function fail(err){

            }

            this.$Post(url, config, success, fail)
        },
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
                for(let i = 0; i<_self.data.length;i++){
                    _self.data[i].customer_area_name = _self.area_Map.get(_self.data[i].customer_area)
                    _self.data[i].behavior_name = _self.behavior_Map.get(_self.data[i].behavior)
                    if(_self.data[i].customer_status != ""){
                        _self.data[i].customer_status_name = _self.getLocalType(_self.data[i].customer_status)
                    }
                    if(_self.data[i].exclude_customer_status){
                        _self.data[i].exculde_customer_status_name = _self.getLocalType(_self.data[i].exclude_customer_status)
                    }
                    if(_self.data[i].customer_level != null ){
                        _self.data[i].customer_level_name = _self.customerrating_Map.get(_self.data[i].customer_level.toString())
                    }
                    _self.data[i].behavior_name = _self.behavior_Map.get(_self.data[i].behavior)
                    _self.data[i].punishment_name = _self.fpunishment_Map.get(_self.data[i].punishment)
                    // if(_self.data[i].chan)
                }
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
                // _self.customerTypes_Array.push("{}")
                let temp = {
                    label:"空"
                }
                _self.customerTypes.push(temp)
                console.log(_self.customerTypes)
            }
            this.$GetDataCenter("customerTypes",success)
        },
        getLocalType(code){
            let _self = this
            let tempstart = code.split("-")[0]
            let temp = code.split("-")[1]
            for(let i = 0;i<_self.customerTypes_Array.length;i++){
                if(temp == _self.customerTypes_Array[i].id){
                    return _self.customerTypes_Array[i].ptypename + ' - ' + _self.customerTypes_Array[i].typename
                }
            }
            if(temp==""){
                for(let j = 0;j<_self.customerTypes_Array.length;j++){
                    if(tempstart == _self.customerTypes_Array[j].pid){
                        return _self.customerTypes_Array[j].ptypename + '- 无'
                    }
                }
            }
        },
        getDataCenter(){
            let _self = this
            function success(res){
                // console.log(res.data.data)
                _self.customerrating = res.data.data.customerrating
                _self.area = res.data.data.area
                let temp_area = {
                    typename:"空"
                }
                _self.area.push(temp_area)
                // console.log(_self.area)
                // _self.cluesources = res.data.data.cluesources
                _self.behavior = res.data.data.behavior
                _self.fpunishment = res.data.data.fpunishment
                _self.productType = res.data.data.productType
                _self.customerrating_Map = _self.$array2map(_self.customerrating)
                _self.area_Map = _self.$array2map(_self.area)
                // _self.cluesources_Map = _self.$array2map(_self.cluesources)
                _self.behavior_Map = _self.$array2map(_self.behavior)
                _self.fpunishment_Map = _self.$array2map(_self.fpunishment)
                _self.productType_Map = _self.$array2map(_self.productType)
            }

            this.$GetDataCenter("customerrating,cluesources,area,behavior,fpunishment,productType",success)
        },
        getChannelList(){
            let url = `api/channel/type/list`
            let _self = this
            function success(res){
                console.log(res.data.data.rows)
                _self.cluesources = res.data.data.rows
                let temp = {
                    channel_type_name:"空"
                }
                _self.cluesources.push(temp)
            }
            
            let config = {
                params: {
                    page: 1,
                    pageSize: 1000
                }
            }

            this.$Get(url, config, success)
        },
        // getLocalChannel(data){
        //     let _self = this
        //     for(let i = 0;i<_self.cluesources.length;i++){
        //         if(data == _self.customerTypes[i].id){
        //             return _self.customerTypes[i].channel_type_name
        //         }
        //     }
        // },
        open_create_pool_rule(){
            this.$bus.emit('open_create_customer_rule',true)
        }
    },
    created(){
        this.getChannelList()
        this.getDataCenter()
        this.getCustomerType()
        this.getData()

        let _self = this
        this.$bus.on('update_customer_rule',(e)=>{
            _self.getData()
        })
    }
}
</script>

