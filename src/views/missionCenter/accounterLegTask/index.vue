<template>
    <div>
        <div style="min-width:1300px" @click="close_right_menu">
            <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9000" type="primary" @click="add_task">新增会计任务</Button>
            <Card title="会计任务">
                <Card style="width:400px;position:fixed;z-index:9999" v-if="click_show" :style="{top: top + 'px', left: left + 'px'}">
                    <Row :gutter="20">
                        <Col span="6">
                            <span>任务对象：</span>
                        </Col>
                        <Col span="18"><span>{{hover_local.companyName}}</span></Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>任务详情：</span>
                        </Col>
                        <Col span="18"><span>{{hover_local.taskContent}}</span></Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>执行人：</span>
                        </Col>
                        <Col span="18"><span>{{hover_local.executorName}}</span></Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>创建人：</span>
                        </Col>
                        <Col span="18"><span>{{hover_local.creatorName}}</span></Col>
                    </Row>
                </Card>
                <Row :gutter="20">
                    <Col span="18">
                        <full-calendar
                                ref="calendar"
                                :events="events"
                                :config="config"
                                :header="header"
                                @event-selected="eventSelected"
                                :defaultView="defaultView"
                                :editable="false"
                                @day-click="dayClick"
                                @day-right-click="dayRightClick"
                                @event-mouseover="mouse_over"
                                @event-mouseout="mouse_out"
                        >
                        </full-calendar>
                    </Col>
                    <Col span="6">
                        <Row style="height:340px">
                            <datepicker
                                    v-model="date"
                                    :inline="true"
                                    :language="zh"
                                    @selected="change_date">
                            </datepicker>
                        </Row>
                        <Row>
                            <span>未完成——<span style="color:#00CCFF">蓝色</span><br/></span>
                            <span>成功——<span style="color:#AEDD81">绿色</span><br/></span>
                            <span>失败——<span style="color:#D24D57">红色</span><br/></span>
                        </Row>
                        <Row>
                            <Row style="margin-bottom:10px"><h3>{{local_date}}</h3></Row>
                            <Row>
                                <Scroll height="520">
                                    <Timeline>
                                        <TimelineItem v-for="item in oneData" :key="item.id">
                                            <p class="time">{{item.planDate.slice(10)}}</p>
                                            <p class="content">{{item.taskName}}</p>
                                        </TimelineItem>
                                    </Timeline>
                                </Scroll>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <create-accounter-task></create-accounter-task>
            <detail-accounter-task></detail-accounter-task>
        </div>
        <div v-if="showFilter">
            <div class="filter">
                <Form :label-width="80" style="margin:20px 20px 0 0">
                    <FormItem label="任务类型：" >
                        <div class="d" v-for="(item,index) in taskList" :class="{b:currentIndex==index}" @click="showItem(item,index)" >
                            <span>{{item}}</span>
                        </div>
                    </FormItem>
                    <FormItem label="企业名称：" prop="companyId">
                        <Select ref="select"
                                v-model="newMission.companyName" placeholder="请输入企业名称搜索"
                                filterable
                                remote
                                @on-change="get_data"
                                :remote-method="get_company"
                                :loading="companyLoading"
                        >
                            <Option v-for="item in companyList" :value="item.companyname" :key="item.companyid" >{{item.companyname}}</Option>
                        </Select>
                    </FormItem>
                    <!--<FormItem label="任务时间" prop="planDate">-->
                        <!--<DatePicker type="daterange" v-model="newMission.planDate" style="width:100%"></DatePicker>-->
                    <!--</FormItem>-->
                    <FormItem label="执行人：" style="display: inline-block" v-if="showList">
                        <div class="d" v-for="(item,index) in personList" :class="{b:currentIndexTwo==index}"  @click="showItemTwo(item,index)">
                            <span>{{item.realname}}</span>
                        </div>
                    </FormItem>
                    <FormItem label="执行人：" v-if="showSearch">
                        <Input placeholder="搜索相关的人员" v-model="newMission.personName">
                            <Button  slot="append" icon="ios-search"  style="background: #2d8cf0;color: #fff;border-radius: 0px;font-weight: 700" @click="get_data"></Button>
                        </Input>
                    </FormItem>
                    <FormItem label="状态：" >
                        <div class="d" v-for="(item,index) in statusList" :class="{b:currentIndexOne==index}" @click="showItemOne(item,index)" >
                            <span>{{item}}</span>
                        </div>
                    </FormItem>
                    <Row style="margin-right: 5px;margin-bottom: 15px">
                        <Button style="margin-left: 240px" type="primary" size="small" @click="reset">重置</Button>
                    </Row>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import { zh } from 'vuejs-datepicker/dist/locale/index'
    import Datepicker from 'vuejs-datepicker'
    import {FullCalendar} from 'vue-full-calendar'
    import {DateFormat} from "../../../libs/utils";
    import 'fullcalendar/dist/locale/zh-cn'
    import CreateAccounterTask from './createAccounterTask'
    import DetailAccounterTask from './detailAccounterLegTask'
    export default {
        name: "index",
        components:{
            FullCalendar,
            Datepicker,
            CreateAccounterTask,
            DetailAccounterTask
        },
        data(){
            return{
                load:false,
                showSearch:false,
                showList:false,
                taskList:["全部","外勤任务","重要提醒","做账备注","未完事项"],
                personList:["全部","符东","张威雄","王碧心","梁宝愿","潘美珊"],
                statusList:["全部","未完成","成功","失败"],
                executor_id:"",
                newMission:{
                    companyName:"",
                    personName:""
                },
                currentIndex:"",
                currentIndexOne:"",
                currentIndexTwo:"",
                taskKind:"",
                taskType:"",
                roleCode:"",
                teamList:[],
                companyLoading:false,
                companyList:[],
                businessArea:[],
                businessPlace:[],
                businessArea_map:new Map(),
                businessPlace_map:new Map(),
                showFilter:false,
                rightTop:"",
                rightLeft: "",
                right_click_show: false,
                local_date:"",
                //  控制右侧弹出页面
                openRightHover: false,
                //  控制悬浮菜单位置
                top: "",
                left: "",
                //  控制悬浮菜单展示
                click_show: false,
                zh: zh,
                date: new Date(),
                header:{
                    left:   'prev,next today',
                    center: 'title',
                    right:  'filter,month,agendaWeek,agendaDay'
                },
                config:{
                    locale: 'zh-cn',
                    //  周末不显示
                    // weekends: false,
                    slotEventOverlap:false,
                    timezone:"local",
                    customButtons:{
                        filter:{
                            text:"筛选",
                            click:function () {
                                this.showFilter=!this.showFilter
                                event.stopPropagation()
                            }.bind(this)
                        }
                    }
                },
                events:[

                ],
                events_temp: [],
                //  默认显示月
                defaultView:"month",
                // defaultView:{
                //     month: {
                //         eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
                //     }
                // },
                hover_local: "",
                oneData: [],
                rightClickDate: ""
            }
        },
        methods:{
            showItem(item,index){
                this.currentIndex = index
                if (index==0) {
                    this.taskKind = ""
                    this.taskType = ""
                    this.get_data()
                }
                if (index==1){
                    this.taskKind = ""
                    this.taskType = "tkLegAcc"
                    this.get_data()
                }
                if (index==2){
                    this.taskKind = "tkRemImport"
                    this.taskType = ""
                    this.get_data()
                }
                if (index==3){
                    this.taskKind = "tkRemAccMemo"
                    this.taskType = ""
                    this.get_data()
                }
                if (index==4){
                    this.taskKind = "tkRemUndo"
                    this.taskType = ""
                    this.get_data()
                }
            },
            showItemOne(item,index){
                this.currentIndexOne = index
                if (index==0) {
                    this.taskStage = ""
                    this.mission = ""
                    this.get_data()
                }
                if (index==1){
                    this.taskStage = "tesUnstarted"
                    this.mission = ""
                    this.get_data()
                }
                if (index==2){
                    this.taskStage = "tesFinished"
                    this.mission = "Completed"
                    this.get_data()
                }
                if (index==3){
                    this.taskStage = "tesFinished"
                    this.mission = "Failed"
                    this.get_data()
                }
            },
            showItemTwo(item,index){
                this.currentIndexTwo = index
                this.executor_id = item.ID
                this.get_data()
            },
            reset(){
                this.currentIndex = ""
                this.currentIndexOne = ""
                this.currentIndexTwo = ""
                this.newMission.companyName = ""
                this.newMission.personName = ""
                this.taskKind = ""
                this.taskStage = ""
                this.taskType = ""
                this.mission = ""
                this.executor_id = ""
                this.get_data()
            },
            get_company(query){
                let _self = this
                _self.companyLoading = true
                let url = "api/legwork/apiQueryCompanyOrCustomerMsg"
                let config = {
                    params:{
                        page: 1,
                        pageSize: 10,
                        companyname: query
                    }
                }

                function success(res){
                    _self.companyLoading = false
                    _self.companyList = res.data.data
                    _self.companyNameList = res.data.data
                }
                this.$Get(url, config, success)
            },
            // close_right_menu(){
            //     console.log("123")
            //     this.right_click_show = false
            //     this.showFilter = false
            // },
            eventSelected(event, jsEvent, view){
                //  点击展示事件详情
                this.$bus.emit("OPEN_ACCOUNTER_DETAIL_TASK",event)
            },
            dayClick(date, jsEvent, view){
                //  可以在此处新增日程
                console.log(date)
                let _self = this
                this.date = date._d
                let dateTemp = DateFormat(date)
                this.get_onedate_data(dateTemp)
            },
            add_task(){
                let _self = this
                this.$bus.emit("SCHEDULE_CREATE_ACCOUNTER_TASK", _self.rightClickDate)
            },
            next() {
                //  通过这个函数调用calendar中的方法，
                //  方法名，参数
                this.$refs.calendar.fireMethod('getEventSources')
            },
            change_date(e){
                let date = DateFormat(e)
                // console.log(date)
                // this.local_date = e.toLocaleDateString().replace(new RegExp("/",'g'),"-")


                // console.log(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))

                // this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type, e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
                this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type , date)

                // console.log(this.$refs.calendar.fireMethod("getView").type)
                // this.get_onedate_data(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
                this.get_onedate_data(date)

            },
            //  右键点击触发
            dayRightClick(date, jsEvent, view){
                this.right_click_show = true
                // this.rightClickDate = DateFormat(date._d)
                this.rightClickDate = date._d
                this.rightTop = jsEvent.pageY
                this.rightLeft = jsEvent.pageX
                // console.log(date, jsEvent, view)
            },
            close_right_menu(){
                this.right_click_show = false
                this.showFilter = false
            },
            mouse_out(){
                // console.log("鼠标离开了！")
                this.click_show = false
                // console.log($(this.$refs["calendar"]).fullCalendar('getDate'))
            },
            mouse_over(event, jsEvent, view){
                this.click_show = true

                this.top = jsEvent.clientY
                this.left = jsEvent.clientX
                this.hover_local = event
                console.log(this.hover_local)
            },
            get_date(){
                //  获取当前日期
                // fireMethod 调用内置方法$(this.$el).fullCalendar(...options)
                // console.log(this.$refs.calendar.fireMethod('getDate'))
                // 更改到指定日期
                this.$refs.calendar.fireMethod('changeView', 'agendaDay', '2017-06-01')
            },
            remove_data(){
                this.$refs.calendar.fireMethod('removeEvents')
            },
            get_data(){
                let _self = this
                let url = 'api/task/getLegWorklist'
                let config = {
                    params:{
                        page: 1,
                        pageSize: 1000,
                        accountKind:"accountKind",
                        sortField: "plan_date",
                        task_type:_self.taskType,
                        task_kind:_self.taskKind,
                        task_stage:_self.taskStage,
                        executor_id:_self.executor_id,
                        mission:_self.mission,
                        companyName:_self.newMission.companyName,
                        executor_name:_self.newMission.personName
                        // cbegin_date:DateFormat(_self.newMission.planDate[0]),
                        // cend_date:DateFormat(_self.newMission.planDate[1]),
                    }
                }

                function success(res){
                    _self.events_temp = res.data.data.rows
                    console.log(_self.events_temp )
                    if (_self.events_temp.length==0) {
                        _self.remove_data()
                    }
                    for(let i = 0;i<_self.events_temp.length;i++){
                        _self.events_temp[i].start = _self.events_temp[i].planDate
                        _self.events_temp[i].title = _self.events_temp[i].taskName
                        //  请一一对应！！！！！
                        //  title => 任务名称
                        //  realname => 真实姓名
                        //  CompanyName => 公司名称
                        //  Area => 地区
                        //  depart => 具体地点
                        _self.events_temp[i].realname = _self.events_temp[i].executorName
                        _self.events_temp[i].Area = _self.businessArea_map.get(  _self.events_temp[i].taskArea)
                        _self.events_temp[i].depart = _self.businessPlace_map.get(_self.events_temp[i].taskPlace)
                        _self.events_temp[i].CompanyName = _self.events_temp[i].companyName
                        if (_self.events_temp[i].taskStage=="tesFinished" && _self.events_temp[i].mission=="Completed") {
                            _self.events_temp[i].color = "#AEDD81"
                        }
                        if (_self.events_temp[i].taskKind=="tkRemImport" || _self.events_temp[i].taskKind=="tkRemUndo" || _self.events_temp[i].taskKind=="tkRemAccMemo"){
                            if (_self.events_temp[i].taskStage=="tesFinished"){
                                _self.events_temp[i].color = "#AEDD81"
                            }
                        }
                        if (_self.events_temp[i].taskStage=="tesUnstarted") {
                            _self.events_temp[i].color = "#00CCFF"
                        }
                        if (_self.events_temp[i].taskStage=="tesFinished" && _self.events_temp[i].mission=="Failed") {
                            _self.events_temp[i].color = "#D24D57"
                        }
                        _self.events = _self.events_temp
                    }

                }

                function fail(err){
                }

                this.$Get(url, config, success, fail)
            },
            get_data_center(){
                let params = "gzbusinessarea,gzbusinessplace"
                let _self = this
                function success(res){
                    _self.businessArea = res.data.data.gzbusinessarea
                    _self.businessPlace = res.data.data.gzbusinessplace
                    _self.businessArea_map = _self.$array2map(_self.businessArea)
                    _self.businessPlace_map = _self.$array2map(_self.businessPlace)
                    console.log(_self.businessPlace_map)
                }
                this.$GetDataCenter(params, success)
            },
            get_onedate_data(e){
                let _self = this
                // console.log(e)
                this.local_date = e
                let url = 'api/task/getLegWorklist'
                let config = {
                    params:{
                        page: 1,
                        pageSize: 1000,
                        day: e,
                        sortField: "plan_date",
                        accountKind:"accountKind"
                    }
                }

                function success(res){
                    // _self.events_temp = res.data.data.rows
                    // for(let i = 0;i<_self.events_temp.length;i++){
                    //     _self.events_temp[i].start = _self.events_temp[i].plan_date
                    //     _self.events_temp[i].title = _self.events_temp[i].task_name
                    // }

                    _self.oneData = res.data.data.rows
                }

                function fail(err){
                }

                this.$Get(url, config, success, fail)
            },
            get_person_list(){
                let _self = this
                let url = 'api/user/user/accountList'
                let config = {}

                function success(res){
                    _self.roleCode = res.data.data.roleList[0].rolecode
                    _self.personList = res.data.data.list
                    _self.personList.unshift({realname:"全部",ID:""})
                    console.log(_self.roleCode)
                    console.log(_self.personList)
                    if (_self.roleCode.indexOf("admin")!=-1){
                        _self.showSearch = true
                    }
                    if (_self.roleCode.indexOf("teamLeader")!=-1){
                        _self.showList = true
                    }
                }

                function fail(err){
                }

                this.$Get(url, config, success, fail)
            }
        },
        created() {
            let _self = this
            _self.get_data_center()
            _self.get_data()
            _self.get_onedate_data((new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-"))
            this.local_date = (new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-")
            this.local_date = DateFormat(new Date())
            this.get_onedate_data(DateFormat(new Date()))
            _self.get_person_list()
            _self.$bus.on("UPDATE_ACCOUNT_TASK_LIST_DEMO", (e)=>{
                _self.get_data()
                _self.get_onedate_data(DateFormat(new Date()))
            })
            _self.$bus.on("UPDATE_ACCOUNT_TASK_LIST",(e)=>{
                _self.get_data()
                _self.load=true
            })
        }
    }
</script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
    .fc-unthemed td.fc-today{
        background: #fcf4cd;
    }
    .fc-event{
        font-size:14px;
        border: 1px solid #2d8cf0;
        color: #ffffff
    }
    .fc-event, .fc-event-dot{
        background: #2d8cf0
    }
    .vdp-datepicker__calendar .cell.selected{
        background:  #2d8cf0;
        color: #ffffff;
    }
    .vdp-datepicker__calendar .cell.selected:hover{
        background:  #2d8cf0;
        color: #ffffff;
    }
    .fc-state-down, .fc-state-active {
        background-color: #2d8cf0;
        background-image: none;
        box-shadow: none;
        color: #ffffff
    }
    .filter{
        background: white none;
        border: 1px solid #CCC;
        box-shadow: 1px 1px 3px #ccc;
        position: absolute;
        right: 160px;
        top: 120px;
        width: 300px;
        z-index: 1;
    }
    .a{
        display: flex;
        justify-content: flex-start;
    }
    .d{
        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        border: 1px solid #e9eaec;
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    .d:hover{
        opacity: 0.8;
        background:  #2d8cf0;
        color: #fff;
    }
    .b{
        opacity: 0.8;
        background:  #2d8cf0;
        color: #fff;
    }
</style>