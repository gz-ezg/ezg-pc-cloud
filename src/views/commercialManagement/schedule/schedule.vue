<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="add_schedule">新增排程</Button>
                    <Button type="primary" icon="plus" @click="isAddChange">导出日报表</Button>
                </ButtonGroup>
                <center><DatePicker type="date" v-model="choosedate" style="width: 200px" @on-change="changeDate"></DatePicker></center>
            </Row>
            <Row style="margin-top:10px" v-for="(item,index) in user_list" :key="index">
                <Row><h3 style="margin-bottom:5px;margin-left:40px;">{{item}}</h3></Row>
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="schedule_data[index]"
                    style="margin-bottom:20px"
                >
                </Table>
            </Row>
        </Card>
        <schedule-add :user="allDepartUser"></schedule-add>
        <schedule-edit :user="allDepartUser"></schedule-edit>
    </div>
</template>

<script>
import ScheduleAdd from './schedule_add'
import ScheduleEdit from './schedule_edit'
import Bus from '../../../components/bus'

export default {
    components:{
        ScheduleAdd,
        ScheduleEdit
    },
    data(){
        return{
            choosedate:"",
            schedule_data:[],
            user_list:[],
            header:[
                {
                    title:'时间',
                    key:'beginTime',
                    width:120
                },
                {
                    title:'区域',
                    key:'area',
                    width:90
                },
                {
                    title:'地点',
                    key:'address',
                    width:120
                },
                {
                    title:'事件',
                    key:'event',
                    width:120
                },
                {
                    title:'公司',
                    key:'companyName',
                    width:200
                },
                {
                    title:'工单',
                    key:'workOrderId',
                    width:120
                },
                {
                    title:'外勤状态',
                    key:'scheduleStatus',
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
                        width: 180,
                        fixed: 'right',
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
                                            Bus.$emit('EDIT_COMMER_SCHEDULE',true)
                                        }
                                    }
                                }, '编辑'),
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
                                            console.log(params)
                                        }
                                    }
                                }, '完成')
                            ]);
                        }
                    }
            ],
            //  商事部门所有人员
            allDepartUser:""
        }
    },
    methods:{
        getData(){
            let _self = this
            _self.schedule_data = []
            // console.log(this.allDepartUser)
            for(let i = 0;i<this.allDepartUser.length;i++){
                let url2 = `api/order/workschedule/list`
                // console.log(_self.allDepartUser[i])
                let config = {
                    params:{
                        workerId:_self.allDepartUser[i].id,
                        scheduleDate:'20180315',
                        // workerId:'10074'
                    }
                }
                _self.$http.get(url2,config).then(function(res){
                    _self.$backToLogin(res)                    
                    // console.log(res.data.data[0])
                    // _self.schedule_data[res.data.data[0].userId] = res.data.data[0].workScheduleItems
                    // _self.schedule_data.push(res.data.data[0].workScheduleItems)
                    _self.schedule_data.push(res.data.data[0].workScheduleItems)
                    _self.user_list.push(res.data.data[0].realName)
                })
            }
            // console.log(_self.schedule_data)
            // console.log(_self.user_list)
        },
        add_schedule(){
            Bus.$emit('ADD_COMMER_SCHEDULE',true)
        },
        getAllUserList(){
            let url = 'api/user/getUserListByDepartId?departId=11572'
            let _self = this
            this.$http.get(url).then(function(res){
                // console.log(res.data.data)
                _self.allDepartUser = res.data.data
                _self.getData()
            })
        },
        changeDate(e){
            console.log(e)
        },
        getCurrentDate(){

        },
        getDateCenter(){
            let url = 'api/dataCenter/system/tsType/queryTsTypeByGroupCodes'
            let _self = this
            let config = {
                params:{
                    groupCodes:'SAASPropertiesArea,A04Area,A04Addr,SAASProperties'
                }
            }
            _self.$http.get(url,config).then(function(res){
                console.log(res)
            })
        }
    },
    created(){
        this.getDateCenter()
        this.getAllUserList()
    }
}
</script>
