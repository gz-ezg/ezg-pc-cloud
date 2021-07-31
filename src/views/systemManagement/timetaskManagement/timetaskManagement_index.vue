<!--    定时任务    -->
<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="isAdd=true">录入</Button>
                    <Button type="primary" icon="drag" @click="edit">编辑</Button>
                    <Button type="primary" icon="ios-information" @click="show">查看</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Table
                    highlight-row
                    :columns="header" 
                    :data="task_data"
                    @on-current-change="save_current_row"
                    size="small"
                    style="margin-top: 10px"
                    :loading="loading"
                >
                </Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
            v-model="isAdd"
            title="录入"
            width="700"
        >
            <Form ref="addTimeTask" :model="addTimeTask" :label-width="150">
                <FormItem label="jobClassName：" prop="jobClassName">
                    <Input v-model="addTimeTask.jobClassName" type="textarea" style="width:500px"></Input>
                </FormItem>
                <FormItem label="jobGroupName：" prop="jobGroupName">
                    <Input v-model="addTimeTask.jobGroupName" style="width:500px"></Input>
                </FormItem>
                <FormItem label="cronExpression" prop="cronExpression：" >
                    <Input v-model="addTimeTask.cronExpression" style="width:500px"></Input>                        
                </FormItem>
                <FormItem label="jobParam" prop="job_param：" >
                    <Input v-model="addTimeTask.job_param" style="width:500px"></Input>                        
                </FormItem>
                <FormItem label="jobMemo" prop="jobMemo：" >
                    <Input v-model="addTimeTask.jobMemo" style="width:500px"></Input>                        
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="add_Reset">重置</Button>
                <Button type="primary" @click="add_task">提交</Button>
            </div>
        </Modal>
        <Modal
            v-model="isEdit"
            width="700"
            title="编辑"
        >
        <Form ref="EditTimeTask" :model="EditTimeTask" :label-width="150">
                <FormItem label="jobClassName：" prop="jobClassName">
                    <Input v-model="EditTimeTask.jobClassName" type="textarea" style="width:500px"></Input>
                </FormItem>
                <FormItem label="jobGroupName：" prop="groupName">
                    <Input v-model="EditTimeTask.groupName" style="width:500px" disabled></Input>
                </FormItem>
                <FormItem label="cronExpression:" prop="ncron" >
                    <Input v-model="EditTimeTask.ncron" style="width:500px"></Input>                        
                </FormItem>
                <FormItem label="jobParam:" prop="job_param" >
                    <Input v-model="EditTimeTask.job_param" style="width:500px"></Input>                        
                </FormItem>
                <FormItem label="jobMemo:" prop="job_memo" >
                    <Input v-model="EditTimeTask.job_memo" style="width:500px" disabled></Input>                        
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="edit_Reset">重置</Button>
                <Button type="primary" @click="edit_task">提交</Button>
            </div>
        </Modal>
        <Modal
            v-model="isShow"
            title="查看"
            width="700"
        >
        <Form ref="ShowTimeTask" :model="ShowTimeTask" :label-width="150">
                <FormItem label="jobClassName：" prop="jobClassName">
                    <Input v-model="ShowTimeTask.jobClassName" type="textarea" style="width:500px" readonly></Input>
                </FormItem>
                <FormItem label="jobGroupName：" prop="groupName">
                    <Input v-model="ShowTimeTask.groupName" style="width:500px" readonly></Input>
                </FormItem>
                <FormItem label="cronExpression：" prop="ncron" >
                    <Input v-model="ShowTimeTask.ncron" style="width:500px" readonly></Input>                        
                </FormItem>
                <FormItem label="cronExpression：" prop="job_param" >
                    <Input v-model="ShowTimeTask.job_param" style="width:500px" readonly></Input>                        
                </FormItem>
                <FormItem label="jobMemo" prop="jobMemo：" >
                    <Input v-model="ShowTimeTask.job_memo" style="width:500px" readonly></Input>                        
                </FormItem>
            </Form>
        <div slot="footer">
            <Button type="ghost" @click="isShow=false">取消</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "timetaskManagement",
    data(){
        return{
            isAdd:false,
            isEdit:false,
            isShow:false,
            header:[
                    // {
                    //     type: 'index.vue',
                    //     width: 50,
                    //     title:'序号',
                    //     align: 'center'
                    // },
                    {
                        title: '任务ID',
                        key: 'id',
                        width:80
                    },
                    {
                        title:'groupName',
                        key: 'groupName',
                        width:120
                    },
                    {
                        title: 'cron表达式',
                        key: 'ncron',
                        width:150
                    },
                    {
                        title:  'jobState',
                        key: 'jobState',
                        width:150
                    },
                    {
                        title: 'jstatus',
                        key: 'jstatus',
                        width:150
                    },
                    {
                        title: 'common.task.className',
                        key: 'jobClassName',
                        width:250,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.jobClassName == ''|| params.row.jobClassName == null){
                                return ''
                            }else if(params.row.jobClassName.length>30){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.jobClassName.slice(0,30)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.jobClassName)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.jobClassName)
                            }
                        }
                    },
                    {
                        title: 'job_param',
                        key: 'job_param',
                        width: 150
                    },
                    {
                        title: 'job_memo',
                        key: 'job_memo',
                        width: 150
                    },
                    {
                        title: '操作',
                        width: 240,
                        render:(h,params) =>{
                            return h('div',[
                                    h('Button',{
                                        props: {
                                            type:'ghost',
                                            size:'small'
                                        },
                                        style:{
                                            'margin-right':'10px'
                                        },
                                        on:{
                                            click:()=>{
                                                this.start(params.row.id)
                                            }
                                        }
                                    },'启动'),
                                    h('Button',{
                                        props: {
                                            type:'ghost',
                                            size:'small'
                                        },
                                        style:{
                                            'margin-right':'10px'
                                        },
                                        on:{
                                            click:()=>{
                                                this.stop(params.row.id)
                                            }
                                        }
                                    },'停止'),
                                    h('Button',{
                                        props: {
                                            type:'ghost',
                                            size:'small'
                                        },
                                        on:{
                                            click:()=>{
                                                this.delete(params.row.id)
                                            }
                                        }
                                    },'删除')
                                ])
                            // console.log(params)
                            // if(params.row.jobState != "PAUSED"){
                            //     return h('div',[
                            //         h('Button',{
                            //             props: {
                            //                 type:'error',
                            //                 size:'small'
                            //             },
                            //             style:{
                            //                 'margin-right':'10px'
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     this.stop(params.row.id)
                            //                 }
                            //             }
                            //         },'停止'),
                            //         h('Button',{
                            //             props: {
                            //                 type:'ghost',
                            //                 size:'small'
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     this.delete(params.row.id)
                            //                 }
                            //             }
                            //         },'删除')
                            //     ]) 
                            // }else{
                            //     return h('div',[
                            //         h('Button',{
                            //             props: {
                            //                 type:'success',
                            //                 size:'small'
                            //             },
                            //             style:{
                            //                 'margin-right':'10px'
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     this.start(params.row.id)
                            //                 }
                            //             }
                            //         },'启动'),
                            //         h('Button',{
                            //             props: {
                            //                 type:'ghost',
                            //                 size:'small'
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     this.delete(params.row.id)
                            //                 }
                            //             }
                            //         },'删除')
                            //     ]) 
                            // }
                        }
                    }
            ],
            task_data:[],
            current_row:'',
            loading:false,
            page:1,
            pageTotal:"",
            addTimeTask:{},
            ShowTimeTask:{},
            EditTimeTask:{}
        }
    },
    methods:{
        //  清空表单
        add_Reset(){
            this.addTimeTask.jobClassName = ''
            this.addTimeTask.jobGroupName = ''
            this.addTimeTask.cronExpression = ''
            this.addTimeTask.job_param = ''
            this.addTimeTask.jobMemo = ''
        },
        edit_Reset(){
            this.EditTimeTask.jobClassName = ''
            // this.EditTimeTask.groupName = ''
            this.EditTimeTask.ncron = ''
            this.EditTimeTask.job_param = ''
            // this.EditTimeTask.jobMemo = ''
        },
        handleReset(name){
            this.$refs[name].resetFields();
        },
        //  保存当前选中行
        save_current_row(e){
            this.current_row = e
        },
        //  弹出编辑框
        edit(){
            let _self = this
            if(_self.current_row != ""){
                _self.isEdit = true
                _self.EditTimeTask = _self.current_row
                // console.log(_self.EditTimeTask)
            }else{
                _self.$Message.warning('请选择一行进行编辑！')
            }
        },
        //  弹出展示框
        show(){
            let _self = this
            if(_self.current_row != ""){
                _self.isShow = true
                _self.ShowTimeTask = _self.current_row                
            }else{
                _self.$Message.warning('请选择一行进行查看！')
            }
        },
        //  添加定时任务
        add_task(){
            let _self = this
            let url  = `api/system/task/job/create`
            let config = {
                jobClassName:_self.addTimeTask.jobClassName,
                jobGroupName:_self.addTimeTask.jobGroupName,
                cronExpression:_self.addTimeTask.cronExpression,
                jobParam:_self.addTimeTask.job_param,
                jobMemo:_self.addTimeTask.jobMemo
            }
            this.$http.post(url,config).then(function(res){
                // console.log(res)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()
                    _self.isAdd = false
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        //  编辑定时任务
        edit_task(){
            let _self = this
            let url  = `api/system/task/job/update`
            let config = {
                jobId:_self.EditTimeTask.id,
                jobClassName:_self.EditTimeTask.jobClassName,
                // jobGroupName:_self.EditTimeTask.groupName,
                cronExpression:_self.EditTimeTask.ncron,
                jobParam:_self.EditTimeTask.job_param
                // jobMemo:_self.EditTimeTask.job_memo
            }
            this.$http.post(url,config).then(function(res){
                // console.log(res)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()
                    _self.isEdit = false
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        //  获取数据
        getData(){
            let _self = this
            let url = `api/system/task/job/list`
            let config = {
                params:{
                    page:_self.page,
                    pageSize: 10
                }
            }
            this.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)
                
                _self.pageTotal = res.data.data.total
                _self.task_data = res.data.data.rows
                // console.log(res.data.data.rows)
            })
            
        },
        //  页面改变
        pageChange(e){
            this.page = e
            this.getData()
        },
        //  开始定时任务
        start(e){
            let _self = this
            let url = `api/system/task/job/begin`
            let config = {
                jobId:e
            }
            _self.$http.post(url,config).then(function(res){
                // console.log(res.data)
                if(res.data.msgCode ==40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()            
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        //  停止定时任务
        stop(e){
            let _self = this
            let url = `api/system/task/job/pause`
            let config = {
                jobId:e
            }
            _self.$http.post(url,config).then(function(res){
                // console.log(res.data)
                if(res.data.msgCode ==40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        //  删除定时任务
        delete(e){
            let _self = this
            let url = `api/system/task/job/delete`
            let config = {
                jobId:e
            }
            _self.$http.post(url,config).then(function(res){
                // console.log(res.data)
                if(res.data.msgCode ==40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        }
    },
        created(){
            this.getData()
        }

    }
</script>
