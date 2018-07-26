<template>
    <div>
        <Tabs v-model="current_tab">
            <TabPane v-for="(item, index) in schedule_data" :key="index" :label="item.realName" :name="item.realName" style="padding-bottom:150px">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="plus" @click="add_schedule">新增排程</Button>
                            <!-- <Button type="primary" icon="plus" @click="isAddChange">导出日报表</Button> -->
                        </ButtonGroup>
                        <center style="padding:10px"><DatePicker type="date" v-model="choosedate" style="width: 200px" @on-change="changeDate" :clearable="false"></DatePicker></center>
                    </Row>
                    <Row style="margin-top:10px">
                        <Table
                            highlight-row
                            size="small"
                            :columns="header"
                            :data="item.workScheduleItems"
                            style="margin-bottom:20px"
                        >
                        </Table>
                    </Row>
                </Card>
            </TabPane>
        </Tabs>
        <schedule-add :user="allDepartUser" @UPDATESCHEDULE="updatedata" :area="A04Area" :addr="A04Addr" :fieldStatus="fieldStatus"></schedule-add>
        <!-- <schedule-edit :user="allDepartUser" :area="A04Area" :addr="A04Addr"></schedule-edit> -->
    </div>
        
    
</template>
<script>
import ScheduleAdd from './schedule_add'
// import ScheduleEdit from './schedule_edit'
import Bus from '../../../components/bus'
import {DateFormat2, arrayToMap} from '../../../libs/utils.js'

    export default {
        components:{
            ScheduleAdd,
            // ScheduleEdit
        },
        data(){
            return{
                current_tab:"",
                choosedate:"",
                allDepartUser:[],
                header:[
                    // {
                    //     title:'开始时间',
                    //     key:'showBeginTime',
                    //     width:100
                    // },
                    // {
                    //     title:'结束时间',
                    //     key:'showEndTime',
                    //     width:100
                    // },
                    {
                        title:'外勤时间',
                        key:'time',
                        width:160
                    },
                    {
                        title:'地点',
                        key:'worklocation',
                        width:160
                    },                  
                    // {
                    //     title:'区域',
                    //     key:'areaName',
                    //     width:90
                    // },
                    // {
                    //     title:'地点',
                    //     key:'addressName',
                    //     width:120
                    // },
                    {
                        title:'事件',
                        key:'event',
                        width:120
                    },
                    {
                        title:'公司',
                        key:'companyName',
                        width:200,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyName == ''||params.row.companyName == null){
                                return ''
                            }else if(params.row.companyName.length>12){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyName.slice(0,12)+'...'),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyName)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyName)
                            }
                        }
                    },
                    {
                        title:'产品名',
                        key:'productName',
                        width:180,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.productName == ''||params.row.productName == null){
                                return ''
                            }else if(params.row.productName.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.productName.slice(0,10)+'...'),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.productName)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.productName)
                            }
                        }
                    },
                    {
                        title:'外勤状态',
                        key:'fieldStatusName',
                        width:90
                    },
                    {
                        title:'完成状态',
                        key:'finishStatus',
                        width:90
                    },
                    {
                        title:'无效备注',
                        key:'statusMemo',
                        width:120
                    },
                    {
                            title: '操作',
                            key: 'action',
                            align: 'center',
                            width: 150,
                            fixed: 'right',
                            render: (h, params) => {
                                return h('div', [
                                    // h('Button', {
                                    //     props: {
                                    //         type: 'text',
                                    //         size: 'small'
                                    //     },
                                    //     style: {
                                    //         marginRight: '5px'
                                    //     },
                                    //     on: {
                                    //         click: () => {
                                    //             console.log(params.row)
                                    //             Bus.$emit('EDIT_COMMER_SCHEDULE',params.row)
                                    //         }
                                    //     }
                                    // }, '编辑'),
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
                                                // console.log(params)
                                                this.delete(params.row)
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.finish(params.row.id)
                                            }
                                        }
                                    }, '完成')
                                ]);
                            }
                        }
                ],
                schedule_data:[],
                user_list:[],
                flag:0,
                SAASPropertiesArea:"",
                A04Area:"",
                A04Addr:"",
                SAASProperties:"",
                fieldStatus:"",
                SAASPropertiesArea_map:new Map(),
                A04Area_map:new Map(),
                A04Addr_map:new Map(),
                SAASProperties_map:new Map(),
                fieldStatus_map:new Map()
            }
        },
        methods:{
            getData(){
                if(this.flag == 0){
                    let date = new Date()
                    this.choosedate = DateFormat2(date)
                    // console.log(this.choosedate)
                    this.flag = 1
                }
               
                let _self = this
                //  
                _self.schedule_data = []
                _self.user_list=[]
                // console.log(this.choosedate)
                
                // console.log(this.allDepartUser)
                /**
                 * 第一版：按照人员id遍历
                 * 
                 */
                // for(let i = 0;i<this.allDepartUser.length;i++){
                //     let url2 = `api/order/workschedule/list`
                //     // console.log(_self.allDepartUser[i])
                //     let config = {
                //         params:{
                //             workerId:_self.allDepartUser[i].id,
                //             // scheduleDate:"20180315"
                //             scheduleDate:_self.choosedate
                //             // scheduleDate:DateFormat2(_self.choosedate),
                //             // workerId:'10074'
                //         }
                //     }
                //     _self.$http.get(url2,config).then(function(res){
                //         // console.log(res.data.data[0])
                //         // _self.schedule_data[res.data.data[0].userId] = res.data.data[0].workScheduleItems
                //         // _self.schedule_data.push(res.data.data[0].workScheduleItems)
                //         _self.schedule_data.push(res.data.data[0].workScheduleItems)
                //         _self.user_list.push(res.data.data[0].realName)
                //         // setTimeout(,0)
                //     })
                // }
                // console.log(_self.schedule_data)
                // console.log(_self.user_list)
                /*第二版：按照部门id遍历 */
                 let url = 'api/order/workschedule/list'
                 let config = {
                     params:{
                         departId:'11572',
                        //  scheduleDate:"20180315"
                        scheduleDate:_self.choosedate
                     }
                 }
                 _self.$http.get(url, config).then(function(res){
                    _self.$backToLogin(res)                     
                     _self.schedule_data = res.data.data
                    //  console.log(_self.schedule_data)
                    /* 
                        _self.schedule_data.address = _self.A04Addr_map.get(temp.address)
                        _self.schedule_data.area = _self.A04Area_map.get(temp.area)
                        _self.schedule_data.beginTime = temp.beginTime
                        _self.schedule_data.endTime = temp.endTime
                        _self.schedule_data.companyId = temp.companyId
                        _self.schedule_data.companyName = temp.companyName
                        _self.schedule_data.event = temp.event
                        _self.schedule_data.finishStatus = temp.finishStatus
                        _self.schedule_data.id = temp.id
                        _self.schedule_data.scheduleStatus = temp.scheduleStatus
                        _self.schedule_data.statusMemo = temp.statusMemo
                        _self.schedule_data.workOrderId = temp.workOrderId
                    */
                    for(let i = 0; i<_self.schedule_data.length;i++){
                        // console.log(_self.schedule_data[i])
                        for(let j = 0;j<_self.schedule_data[i].workScheduleItems.length;j++){
                            _self.schedule_data[i].workScheduleItems[j].addressName = _self.A04Addr_map.get(_self.schedule_data[i].workScheduleItems[j].address)
                            _self.schedule_data[i].workScheduleItems[j].areaName = _self.A04Area_map.get(_self.schedule_data[i].workScheduleItems[j].area)
                            //  暂时注销！
                            // _self.schedule_data[i].workScheduleItems[j].fieldStatusName = _self.fieldStatus_map.get(_self.schedule_data[i].workScheduleItems[j].scheduleStatus)
                            // console.log(_self.schedule_data[i].workScheduleItems[j].fieldStatus)
                            // console.log(_self.fieldStatus_map.get(_self.schedule_data[i].workScheduleItems[j].fieldStatus))
                            if(_self.schedule_data[i].workScheduleItems[j].beginTime==null||_self.schedule_data[i].workScheduleItems[j].beginTime==""){
                                _self.schedule_data[i].workScheduleItems[j].showBeginTime = ""
                            }else{
                                _self.schedule_data[i].workScheduleItems[j].showBeginTime =  _self.schedule_data[i].workScheduleItems[j].beginTime.slice(10)                              
                            }
                            if(_self.schedule_data[i].workScheduleItems[j].endTime == null || _self.schedule_data[i].workScheduleItems[j].endTime == ""){
                                _self.schedule_data[i].workScheduleItems[j].showEndTime = ""
                            }else{
                                _self.schedule_data[i].workScheduleItems[j].showEndTime =  _self.schedule_data[i].workScheduleItems[j].endTime.slice(11)                              
                            }
                            // console.log(_self.schedule_data[i].workScheduleItems[j])
                            _self.schedule_data[i].workScheduleItems[j].time = _self.schedule_data[i].workScheduleItems[j].showBeginTime + ' - ' + _self.schedule_data[i].workScheduleItems[j].showEndTime
                            _self.schedule_data[i].workScheduleItems[j].worklocation = _self.schedule_data[i].workScheduleItems[j].areaName + ' - ' + _self.schedule_data[i].workScheduleItems[j].addressName                     }
                    }
                 })
            },
            updatedata(){
                let _self = this
                _self.choosedate = DateFormat2(_self.choosedate)
                _self.getData()
            },
            add_schedule(){
                Bus.$emit('ADD_COMMER_SCHEDULE',true)
                // console.log('1111')
            },
            getAllUserList(){
                let url = 'api/user/getUserListByDepartId?departId=11572'
                let _self = this
                _self.allDepartUser = []
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data)
                    _self.allDepartUser = res.data.data
                    _self.getData()
                })
            },
            getCurrentDate(){
                let date = new Date()
                this.choosedate = DateFormat2(date)
                // console.log(this.choosedate)
            },
            changeDate(e){
                // console.log(e)
                this.choosedate = e
                // console.log(DateFormat2(this.choosedate))
                this.choosedate = DateFormat2(this.choosedate)
                this.getData()
            },
            delete(e){
                let _self = this
                console.log(e)
                //  转换成可以判断的事件
                console.log(e.beginTime)
                let temp = e.beginTime.split(" ")[0].split("-")
                // console.log(temp)
                let temp_start = Date.UTC(temp[0],temp[1],temp[2])
                let local_time = new Date()
                let local = local_time.toLocaleString()
                let time = local.split(" ")[0].split("/")
                let temp_end = Date.UTC(time[0],time[1],time[2])
                if(temp_start<temp_end){
                    _self.$Message.error("不可删除已过期排程！")  
                }else{
                    let url = 'api/order/workschedule/del'
                    let config = {
                        id:e.id
                    }
                    this.$http.post(url,config).then(function(res){
                        if(res.data.msgCode == 40000){
                            _self.$Message.success(res.data.msg)
                            _self.choosedate = DateFormat2(_self.choosedate)
                            _self.getData()
                        }else{
                            _self.$Message.error(res.data.msg)                    
                        }
                    })
                }
                
            },
            finish(e){
                let _self = this
                let url = 'api/order/workschedule/finish'
                let config = {
                    id:e
                }
                this.$http.post(url,config).then(function(res){
                    // console.log(res.data)
                    if(res.data.msgCode == 40000){
                        _self.$Message.success(res.data.msg)
                        _self.choosedate = DateFormat2(_self.choosedate)                        
                        _self.getData()
                    }else{
                        _self.$Message.error(res.data.msg)                    
                    }
                })
            },
            //  获取数据字典同时将其处理成map
            getDateCenter(){
                // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
                let _self = this
                // let config = {
                //     params:{
                //         groupCodes:'SAASPropertiesArea,A04Area,A04Addr,SAASProperties,fieldStatus'
                //     }
                // }
                // _self.$http.get(url,config).then(function(res){
                //     console.log(res.data.data)
                //     let temp = res.data.data
                //     _self.SAASProperties = temp.SAASProperties
                //     _self.SAASPropertiesArea = temp.SAASPropertiesArea
                //     _self.A04Area = temp.A04Area
                //     _self.A04Addr = temp.A04Addr
                //     _self.fieldStatus = temp.fieldStatus
                //     _self.SAASProperties_map = arrayToMap(_self.SAASProperties)
                //     _self.SAASPropertiesArea_map = arrayToMap(_self.SAASPropertiesArea)
                //     _self.A04Area_map = arrayToMap(_self.A04Area)
                //     _self.A04Addr_map = arrayToMap(_self.A04Addr)
                //     _self.getAllUserList()
                // })

                let params = "SAASPropertiesArea,A04Area,A04Addr,SAASProperties,fieldStatus"

                function finish(res){
                    let temp = res.data.data
                    _self.SAASProperties = temp.SAASProperties
                    _self.SAASPropertiesArea = temp.SAASPropertiesArea
                    _self.A04Area = temp.A04Area
                    _self.A04Addr = temp.A04Addr
                    _self.fieldStatus = temp.fieldStatus
                    _self.SAASProperties_map = arrayToMap(_self.SAASProperties)
                    _self.SAASPropertiesArea_map = arrayToMap(_self.SAASPropertiesArea)
                    _self.A04Area_map = arrayToMap(_self.A04Area)
                    _self.A04Addr_map = arrayToMap(_self.A04Addr)
                    _self.getAllUserList()
                }

                this.$GetDataCenter(params, finish)
            },
            //  导出日报表
            exportReport(){
                let _self = this
                let url = `/order/workschedule/export/report?scheduleDate=` + _self.choosedate
                
                window.open(url)
            }
        },
        created(){
            var _self = this
            _self.getDateCenter()
            // this.getCurrentDate()
            // console.log(new Date()) 
        }
    }
</script>