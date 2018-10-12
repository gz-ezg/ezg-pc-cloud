<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="applicant_realname" label="申请人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.applicant_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="receiver_realname" label="接收人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.receiver_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
                @on-row-dblclick="open_task_detail"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
export default {
    data(){
        return {
            search_model: "",
            seacrhFormInline:{
                applicant_realname: "",
                receiver_realname: ""
            },
            loading: false,
            header: [
                {
                    title: "任务对象",
                    key: "companyName",
                    minWidth: 180
                },
                {
                    title: "任务名称",
                    key:"task_name",
                    minWidth: 150
                },
                {
                    title: "执行人",
                    key: "executor_name",
                    minWidth: 120
                },
                // {
                //     title:"任务级别",
                //     key:'task_level_name',
                //     minWidth:150
                // },
                {
                    title: "任务阶段",
                    key: "task_stage_name",
                    minWidth: 120
                },
                {
                    title: "安排时间",
                    key: "plan_date",
                    minWidth: 180
                },
                // {
                //     title: "任务类型",
                //     key: "task_kind_name",
                //     minWidth: 120
                // },
                // {
                //     title: "任务阶段",
                //     key: "task_stage_name",
                //     minWidth: 120
                // },
                // {
                //     title: "任务标签",
                //     key: "task_lable",
                //     minWidth: 120
                // },
                {
                    title: "操作",
                    minWidth: 180,
                    render: (h, parmas) => {
                        return h('div',[
                            h("Button",{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.open_task_detail(parmas.row)
                                    }
                                }
                            }, "查看"),
                            h("Button",{
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.delete_task(parmas.row.id)
                                    }
                                }
                            },"删除")
                        ])
                    }
                }
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        open_detail(e){

        },
        select_row(e){

        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = 'api/task/list'
            _self.loading = true
            let config = {
                page: _self.page,
                pageSize: _self.pageSize,
                sortField: "plan_date"
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
            }

            function fail(err){
                _self.loading = false

            }

            this.$Post(url, config, success, fail)
        },
        search(){
            this.get_data()
        },
        reset(){
            this.get_data()
        },
        delete_task(e){
            let _self = this

            let url = `api/task/deleteTask`
            let config = {
                params: {
                    taskId: e
                }
            }

            function success(res){
                _self.get_data()
            }

            this.$Get(url, config, success)
        },
        open_task_detail(e){
            this.$bus.emit("OPEN_TASK_DETAIL",e)
        }
    },
    created() {
        let _self = this
        this.get_data()
        _self.$bus.on("UPDATE_TASK_LIST_DEMO", (e)=>{
            _self.get_data()
        })
    },
}
</script>

