<template>
        <Modal
                title="未完事项列表"
                v-model="openUndoList"
                width="850"
                :mask-closable="false"
        >
            <Card>
                <Row style="margin-top: 10px;">
                    <Table
                            @on-current-change="selectRow"
                            :row-class-name="row_class_name"
                            :loading="loading"
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :data="data"
                    ></Table>
                </Row>
            </Card>
            <Modal
                    :title="title"
                    v-model="showReason"
                    width="800"
                    :mask-closable="false"
                    :transfer="false"
            >
                <Card>
                    <Form ref="detail"  :label-width="100">
                        <Row style="margin-top: 10px;" v-if="showContent">
                            <FormItem label="事项：" prop="taskContent">
                                <Input v-model="taskContent" readonly/>
                            </FormItem>
                        </Row>
                        <Row style="margin-top: 10px;" v-if="showSummary">
                            <FormItem label="原因：" prop="taskSummary">
                                <Input type="textarea" placeholder="请填写未完事项原因..." v-model="taskSummary" :autosize="{minRows: 5,maxRows: 7}" :readonly="!showEdit"/>
                            </FormItem>
                        </Row>
                    </Form>
                </Card>
                <div slot="footer">
                    <Button type="primary" @click="failed" v-if="showEdit">提交</Button>
                    <Button @click="closed">关闭</Button>
                </div>
            </Modal>
        </Modal>


</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading: false,
                openUndoList:false,
                showReason:false,
                showEdit:false,
                showContent:false,
                showSummary:false,
                title:"",
                page: 1,
                pageSize: 100,
                current_row:"",
                companyId:"",
                taskSummary:"",
                taskContent:"",
                id:"",
                data:[],
                header: [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.taskStage == 'tesUnstarted'){
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.completed(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[更新]'
                                    ),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[未完成]'
                                    )
                                ]);
                            }
                            if (params.row.taskStage == 'tesFinished'&& params.row.mission =='Completed') {
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.showS(params.row.taskContent);
                                                }
                                            }
                                        },
                                        '[查看]'
                                    )
                                ]);
                            }
                            if (params.row.taskStage == 'tesFinished'&& params.row.mission =='Failed') {
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.showF(params.row.task_summary,params.row.taskContent);
                                                }
                                            }
                                        },
                                        '[查看]'
                                    )
                                ]);
                            }
                        }
                    }
                ],
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            show(id){
                this.showReason = true
                this.id = id
                this.showEdit= true
                this.title = "填写未完事项原因"
                this.showContent = false
                this.showSummary = true
            },
            closed(){
                this.showReason = false
                this.taskSummary = ""
                this.taskContent = ""
            },
            showF(sum,con){
                this.showReason = true
                this.showEdit= false
                this.showContent = true
                this.showSummary = true
                this.taskSummary = sum
                this.taskContent = con
                this.title = "查看未完事项原因"
            },
            showS(e){
                this.showReason = true
                this.showEdit= false
                this.title = "查看已完成事项"
                this.taskContent = e
                this.showContent = true
                this.showSummary = false
            },
            completed(id){
                let _self = this;
                _self.comLoading = true;
                let url = `api/order/cycle/service/dljz/fininshTask`;
                let config = {
                    params:{
                        taskId:id,
                        taskSummary:_self.taskSummary,
                        mission:"Completed"
                    }
                }
                function success(res){
                    _self.comLoading = false
                    _self.get_data()
                    _self.$bus.emit("UPDATE_INDEX",true)
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            failed(){
                let _self = this;
                if(!_self.taskSummary) {
                    _self.$Message.warning("原因必填！！！")
                } else {
                    _self.comLoading = true;
                    let url = `api/order/cycle/service/dljz/fininshTask`;
                    let config = {
                        params:{
                            taskId:_self.id,
                            taskSummary:_self.taskSummary,
                            mission:"Failed"
                        }
                    }
                    function success(res){
                        _self.comLoading = false
                        _self.taskSummary = ""
                        _self.showReason = false
                        _self.get_data()
                        _self.$bus.emit("UPDATE_INDEX",true)
                    }

                    function fail(err){

                    }
                    this.$Get(url, config, success, fail)
                }
            },
            row_class_name(row, index) {
                if (row.mission == 'Failed') {
                    return 'demo-table-followdate-red-row';
                }else {
                    return ''
                }
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/findAccountRemindTaskList`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        taskKind:"tkRemUndo",
                        companyId:_self.companyId,
                        sortField:'taskStage desc,create_date'
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.$bus.off("OPEN_UNDO_LIST",true)
            this.$bus.on("OPEN_UNDO_LIST",(e)=>{
                this.header = [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.taskStage == 'tesUnstarted'){
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.completed(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[更新]'
                                    ),
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.show(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[未完成]'
                                    )
                                ]);
                            }
                            if (params.row.taskStage == 'tesFinished'&& params.row.mission =='Completed') {
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.showS(params.row.taskContent);
                                                }
                                            }
                                        },
                                        '[查看]'
                                    )
                                ]);
                            }
                            if (params.row.taskStage == 'tesFinished'&& params.row.mission =='Failed') {
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.showF(params.row.task_summary,params.row.taskContent);
                                                }
                                            }
                                        },
                                        '[查看]'
                                    )
                                ]);
                            }
                        }
                    }
                ]
                this.openUndoList = true
                this.companyId = e.company_id
                this.get_data()
            })
            this.$bus.off("OPEN_UNDO_ALL_LIST",true)
            this.$bus.on("OPEN_UNDO_ALL_LIST",(e)=>{
                this.header = [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                ]
                this.openUndoList = true
                this.companyId = e.company_id
                this.get_data()
            })
        }
    }
</script>

<style>
    .ivu-table .demo-table-followdate-red-row td{
        background-color: #D24D57;
    }
</style>