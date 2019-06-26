<template>
    <Modal
            title="查看详情"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Card>
            <Tabs value="1">
                <TabPane label="当前回访记录" name="1" >
                    <Form ref="newMission" :model="fieldDetail" :label-width="100" style="margin-left:50px;margin-right:50px">
                        <Row :gutter="12">
                            <Col span="12">
                                <FormItem label="客户名称">
                                    <Input  v-model="fieldDetail.NAME" size="small" readonly></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="联系方式">
                                    <Input v-model="fieldDetail.TEL" size="small" readonly></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Tabs value="1">
                        <TabPane label="市场" name="1" >
                            <market v-if="showDetail" :data="unMarket"></market>
                        </TabPane>
                        <TabPane label="商事" name="2">
                            <business v-if="showDetail" :data="unBusiness"></business>
                        </TabPane>
                        <TabPane label="会计" name="3">
                            <account v-if="showDetail" :data="unAccount"></account>
                        </TabPane>
                    </Tabs>
                    <Form ref="newMission" :model="fieldDetail" :label-width="100" style="margin-left:50px;margin-right:50px">
                        <Row :gutter="12">
                            <Col span="8">
                                <FormItem label="市场评分">
                                    <Input v-model="marketServiceRanks" size="small" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="商事评分">
                                    <Input v-model="businessServiceRanks" size="small" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="会计评分">
                                    <Input  v-model="accountServiceRanks" size="small" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12">
                            <Col span="24">
                                <FormItem label="问题反馈或建议">
                                    <Input type="textarea" v-model="fieldDetail.problem_feedback" :autosize="{minRows: 5}"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12">
                            <Col span="24">
                                <FormItem label="市场反馈">
                                    <Input type="textarea" v-model="fieldDetail.market_feedback" size="small" :autosize="{minRows: 5}"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12">
                            <Col span="24">
                                <FormItem label="服务人员反馈">
                                    <Input type="textarea" v-model="fieldDetail.server_feedback" size="small" :autosize="{minRows: 5}"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="历史回访记录" name="2" >
                    <Form ref="newMission" :model="fieldDetail" :label-width="100" style="margin-left:50px;margin-right:50px">
                        <Row :gutter="12">
                            <Col span="12">
                                <FormItem label="客户名称">
                                    <Input  v-model="fieldDetail.NAME" size="small" readonly></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="联系方式">
                                    <Input v-model="fieldDetail.TEL" size="small" readonly></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style="margin-top: 10px;">
                            <Table
                                    :loading="loading"
                                    highlight-row
                                    size="small"
                                    border
                                    :columns="header"
                                    :data="detail"></Table>
                        </Row>
                    </Form>
                    <!--<Tabs value="1">-->
                        <!--<TabPane label="市场" name="1" >-->
                            <!--<finish-market  :data="market"></finish-market>-->
                        <!--</TabPane>-->
                        <!--<TabPane label="商事" name="2">-->
                            <!--<finish-business  :data="business"></finish-business>-->
                        <!--</TabPane>-->
                        <!--<TabPane label="会计" name="3">-->
                            <!--<finish-account :data="account"></finish-account>-->
                        <!--</TabPane>-->
                    <!--</Tabs>-->
                    <!--<Form ref="newMission" :model="fieldDetail" :label-width="100" style="margin-left:50px;margin-right:50px">-->
                        <!--<Row :gutter="12">-->
                            <!--<Col span="8">-->
                                <!--<FormItem label="市场评分">-->
                                    <!--<Input v-model="marketRanks" size="small" disabled></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="8">-->
                                <!--<FormItem label="商事评分">-->
                                    <!--<Input v-model="businessRanks" size="small" disabled></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="8">-->
                                <!--<FormItem label="会计评分">-->
                                    <!--<Input  v-model="accountRanks" size="small" disabled></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="12">-->
                            <!--<Col span="24">-->
                                <!--<FormItem label="问题反馈或建议">-->
                                    <!--<Input type="textarea" v-model="fieldDetail.problem_feedback" :autosize="{minRows: 5}"></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="12">-->
                            <!--<Col span="24">-->
                                <!--<FormItem label="市场反馈">-->
                                    <!--<Input type="textarea" v-model="fieldDetail.market_feedback" size="small" :autosize="{minRows: 5}"></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="12">-->
                            <!--<Col span="24">-->
                                <!--<FormItem label="服务人员反馈">-->
                                    <!--<Input type="textarea" v-model="fieldDetail.server_feedback" size="small" :autosize="{minRows: 5}"></Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                    <!--</Form>-->
                </TabPane>
            </Tabs>
        </Card>
        <!--<Row :gutter="20" style="margin-top:20px">-->
        <!--<Col span="6">-->
        <!--<span style="line-height:24px">商事任务对象</span>-->
        <!--</Col>-->
        <!--<Col span="18">-->
        <!--<span style="line-height:24px">{{data.companyName}}</span>-->
        <!--</Col>-->
        <!--</Row>-->
        <div slot="footer">
            <Button @click="cancel_task" type="primary">取消</Button>
        </div>
    </Modal>
</template>

<script>
    import market from './market'
    import business from './business'
    import account from './account'
    import finishMarket from './finishMarket'
    import finishBusiness from './finishBusiness'
    import finishAccount from './finishAccount'
    export default {
        name: "finishedDetail",
        components:{
            market,
            business,
            account,
            finishBusiness,
            finishAccount,
            finishMarket
        },
        data(){
            return{
                openAddMission:false,
                showDetail:false,
                data:[],
                marketTotalServiceRanks:0,
                businessTotalServiceRanks:0,
                accountTotalServiceRanks:0,
                marketServiceRanks:0,
                businessServiceRanks:0,
                accountServiceRanks:0,
                marketTotalRanks:0,
                businessTotalRanks:0,
                accountTotalRanks:0,
                marketRanks:0,
                businessRanks:0,
                accountRanks:0,
                unMarket:[],
                unBusiness:[],
                unAccount:[],
                market:[],
                business:[],
                account:[],
                fieldDetail:[],
                detail:[],
                beginImgList:[],
                endImgList:[],
                dateLength:"",
                taskKind:"",
                taskKind_map:new Map(),
                header:[
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 240,
                    },
                    {
                        title: '服务评分',
                        key: 'serviceranks',
                        minWidth: 100,
                    },
                    {
                        title: '任务名称',
                        key: 'task_name',
                        minWidth: 280,
                    },
                ],
                // taskKind:[],
                // taskKind_map:new Map(),
                // taskArea:[],
                // taskArea_map:new Map(),
                // taskPlace:[],
                // taskPlace_map:new Map()
            }
        },
        methods:{
            cancel_task(){
                this.openAddMission = false
            },
            get_data(e){
                let _self = this
                let url = `api/task/callback/taskServerCallbackDetail`
                let config = {
                    params:{
                        id: e.row.id,
                    }
                }

                function success(res){
                    _self.fieldDetail = res.data.data
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_one_data(e){
                let _self = this
                let url = `api/task/callback/customerCallbackListByTaskId`
                let config = {
                    params:{
                        taskId: e.row.id,
                        status:"N"
                    }
                }

                function success(res){
                    // _self.detail = res.data.data

                    for (let i=0;i<res.data.data.length;i++){
                        if (res.data.data[i].datatype==1){
                            _self.unAccount.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                        if (res.data.data[i].datatype==2){
                            _self.unBusiness.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                        if (res.data.data[i].datatype==3){
                            _self.unMarket.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                    }
                    console.log(_self.unMarket)
                    console.log(_self.unBusiness)
                    console.log(_self.unAccount)
                    for (let i=0;i<_self.unMarket.length;i++){
                        if (_self.unMarket[i].serviceranks==null || _self.unMarket[i].serviceranks==""){
                            _self.unMarket[i].serviceranks = 0
                        }
                        _self.marketTotalServiceRanks = _self.marketTotalServiceRanks+parseFloat(_self.unMarket[i].serviceranks)
                    }
                    for (let i=0;i<_self.unBusiness.length;i++){
                        if (_self.unBusiness[i].serviceranks==null || _self.unBusiness[i].serviceranks==""){
                            _self.unBusiness[i].serviceranks = 0
                        }
                        _self.businessTotalServiceRanks = _self.businessTotalServiceRanks+parseFloat(_self.unBusiness[i].serviceranks)
                    }
                    for (let i=0;i<_self.unAccount.length;i++){
                        if (_self.unAccount[i].serviceranks==null || _self.unAccount[i].serviceranks==""){
                            _self.unAccount[i].serviceranks = 0
                        }
                        _self.accountTotalServiceRanks = _self.accountTotalServiceRanks+parseFloat(_self.unAccount[i].serviceranks)
                    }
                    console.log(_self.marketTotalServiceRanks )
                    console.log(_self.businessTotalServiceRanks )
                    console.log(_self.accountTotalServiceRanks )
                    if (_self.unMarket.length==0) {
                        _self.marketServiceRanks = 0
                    }
                    if (_self.unMarket.length!==0){
                        _self.marketServiceRanks = (_self.marketTotalServiceRanks)/_self.unMarket.length
                    }
                    if (_self.unBusiness.length==0) {
                        _self.businessServiceRanks = 0
                    }
                    if (_self.unBusiness.length!==0) {
                        _self.businessServiceRanks = (_self.businessTotalServiceRanks)/_self.unBusiness.length
                    }
                    if (_self.unAccount.length==0) {
                        _self.accountServiceRanks = 0
                    }
                    if (_self.unAccount.length!==0) {
                        _self.accountServiceRanks = (_self.accountTotalServiceRanks)/_self.unAccount.length
                    }
                    // _self.marketServiceRanks = (_self.marketTotalServiceRanks)/_self.unMarket.length
                    // _self.businessServiceRanks = (_self.businessTotalServiceRanks)/_self.unBusiness.length
                    // _self.accountrviceRanks = (_self.accountTotalServiceRanks)/_self.unAccount.length
                    console.log(_self.marketServiceRanks )
                    console.log(_self.businessServiceRanks )
                    console.log(_self.accountServiceRanks )
                    _self.showDetail = true
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_two_data(e){
                let _self = this
                let url = `api/task/callback/customerCallbackListByTaskId`
                let config = {
                    params:{
                        taskId: e.row.id,
                        status:"Y"
                    }
                }

                function success(res){
                    _self.detail = res.data.data
                    for (let i=0;i<res.data.data.length;i++){
                        if (res.data.data[i].datatype==1){
                            _self.account.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                        if (res.data.data[i].datatype==2){
                            _self.business.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                        if (res.data.data[i].datatype==3){
                            _self.market.push({CompanyName:res.data.data[i].CompanyName,serviceranks:res.data.data[i].serviceranks,task_name:res.data.data[i].task_name})
                        }
                    }
                    console.log(_self.market)
                    console.log(_self.business)
                    console.log(_self.account)
                    for (let i=0;i<_self.market.length;i++){
                        if (_self.market[i].serviceranks==null || _self.market[i].serviceranks==""){
                            _self.market[i].serviceranks = 0
                        }
                        _self.marketTotalRanks = _self.marketTotalRanks+parseFloat(_self.market[i].serviceranks)
                    }
                    for (let i=0;i<_self.business.length;i++){
                        if (_self.business[i].serviceranks==null || _self.business[i].serviceranks==""){
                            _self.business[i].serviceranks = 0
                        }
                        _self.businessTotalRanks = _self.businessTotalRanks+parseFloat(_self.business[i].serviceranks)
                    }
                    for (let i=0;i<_self.account.length;i++){
                        if (_self.account[i].serviceranks==null || _self.account[i].serviceranks==""){
                            _self.account[i].serviceranks = 0
                        }
                        _self.accountTotalRanks = _self.accountTotalRanks+parseFloat(_self.account[i].serviceranks)
                    }
                    console.log(_self.marketTotalRanks )
                    console.log(_self.businessTotalRanks )
                    console.log(_self.accountTotalRanks )
                    if (_self.market.length==0) {
                        _self.marketRanks = 0
                    }
                    if (_self.market.length!==0){
                        _self.marketRanks = (_self.marketTotalRanks)/_self.market.length
                    }
                    if (_self.business.length==0) {
                        _self.businessRanks = 0
                    }
                    if (_self.business.length!==0) {
                        _self.businessRanks = (_self.businessTotalRanks)/_self.business.length
                    }
                    if (_self.account.length==0) {
                        _self.accountRanks = 0
                    }
                    if (_self.account.length!==0) {
                        _self.accountRanks = (_self.accountTotalRanks)/_self.account.length
                    }
                    // _self.marketServiceRanks = (_self.marketTotalServiceRanks)/_self.unMarket.length
                    // _self.businessServiceRanks = (_self.businessTotalServiceRanks)/_self.unBusiness.length
                    // _self.accountrviceRanks = (_self.accountTotalServiceRanks)/_self.unAccount.length
                    console.log(_self.marketRanks )
                    console.log(_self.businessRanks )
                    console.log(_self.accountRanks )
                    _self.showDetail = true
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.$bus.off("SHOW_FINISHED_RECORD",true)
            this.$bus.on("SHOW_FINISHED_RECORD",(e)=>{
                this.openAddMission = true
                this.get_data(e)
                this.get_one_data(e)
                this.get_two_data(e)
                this.unMarket=[]
                this.unBusiness=[]
                this.unAccount=[]
                this.market=[]
                this.business=[]
                this.account=[]
                this.marketTotalServiceRanks=0,
                    this.businessTotalServiceRanks=0,
                    this.accountTotalServiceRanks=0,
                    this.marketServiceRanks=0,
                    this.businessServiceRanks=0,
                    this.accountServiceRanks=0,
                    this.marketTotalRanks=0,
                    this.businessTotalRanks=0,
                    this.accountTotalRanks=0,
                    this.marketRanks=0,
                    this.businessRanks=0,
                    this.accountRanks=0,
                    this.data = e.row
            })
            this.$bus.off("SHOW_FINISHED_DETAILS",true)
            this.$bus.on("SHOW_FINISHED_DETAILS",(e)=>{
                this.openAddMission = true
                this.get_data(e)
                this.get_one_data(e)
                this.get_two_data(e)
                this.unMarket=[]
                this.unBusiness=[]
                this.unAccount=[]
                this.market=[]
                this.business=[]
                this.account=[]
                this.data = e.row
            })
        }
    }
</script>

<style>
    .vertical-top-modal .ivu-modal{
        top: 0;
    }
</style>