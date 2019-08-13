<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="8">
                                    <FormItem label="打卡人：" prop="realname">
                                        <Input v-model="formValidateSearch.realname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="打卡部门：" prop="servicedepart">
                                        <Input v-model="formValidateSearch.servicedepart" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="客户名称：" prop="name">
                                        <Input v-model="formValidateSearch.name" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="8">
                                    <FormItem label="公司名称：" prop="companyname">
                                        <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="客户电话：" prop="tel">
                                        <Input v-model="formValidateSearch.tel" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                   <!-- <Col span="8">
                                    <FormItem label="任务类型：" prop="task_kind">
                                        <Select transfer v-model="formValidateSearch.task_kind" size="small">
                                            <Option v-for="(item, index) in taskKindArray" :key=index :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                    </Col>-->
                                    <Col span="8">
                                    <FormItem label="开始打卡时间：" prop="begin_time">
                                        <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.begin_time" style="width:100%" size="small"></DatePicker>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="任务结果：" prop="customername">
                                            <Select v-model="formValidateSearch.finish_status" size="small">
                                                <Option v-for="item in finishStatusList" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem>
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row>

                <ButtonGroup>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="showDetail">查看详情</Button>
                <!--    <Button  type="primary"  icon="ios-color-filter-outline" @click="showImage">查看图片</Button>-->
                </ButtonGroup>

            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        @on-row-click="select_row"
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="page_change"
                        @on-page-size-change="page_size_change"
                        style="margin-top: 10px"></Page>
            </Row>
            <detail :taskKindMap="taskKindMap" :legwork_finish_statusMap="legwork_finish_statusMap" :gzbusinessareaMap="gzbusinessareaMap" :gzbusinessplaceMap="gzbusinessplaceMap"></detail>
        </Card>

    </div>
</template>

<script>
    import detail from './detail.vue'
    import { DateFormat, DateFormatYearMonth } from "../../../libs/utils"
    export default {
        components:{
            detail
        },
        data(){
            return {
                order:'desc',
                sortField:"begin_time",
                currentRow: {},
                currentIndex:-1,
                loading: true,
                page: 1,
                pageSize: 10,
                total: 0,
                data:[],
                finishStatusList:[],
                legwork_finish_statusMap:{},
                taskKindMap:{},
                taskKindArray:{},
                gzbusinessareaMap:{},
                gzbusinessplaceMap:{},
                formValidateSearch:{},
                header: [
                    {
                        title: "公司名称",
                        key: 'CompanyName',
                        width: 180
                    },
                    {
                        title: "客户名称",
                        key: 'name',
                        minWidth: 80
                    },
                    {
                        title: "客户电话",
                        key: "tel",
                        minWidth: 120
                    },
                    {
                        title: "任务名称",
                        key: 'task_name',
                        minWidth: 220,
                        render: (h, params) => {
                            if (params.row.task_name == "" || params.row.task_name == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.task_name.split(",")
                                if (temp[0].length > 13) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "任务名称",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].slice(0,13) + "..."),
                                        h("Icon", {
                                            props: {
                                                type: "arrow-down-b"
                                            }
                                        }),
                                        h("div",{
                                            slot: "content"
                                        },[
                                            h("ul",temp.map(item => [
                                                h("li", {
                                                    style: {
                                                        padding: "4px"
                                                    }
                                                },"名称：" + item)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "任务名称",
                                                placement: "bottom"
                                            }},[
                                            h("span", temp[0]),
                                            h("Icon", {
                                                props: {
                                                    type: "arrow-down-b"
                                                }
                                            }),
                                            h("div", {
                                                slot: "content"
                                            },[
                                                h("ul",temp.map(item => [h("li",
                                                    {
                                                        style: {
                                                            padding: "4px"
                                                        }
                                                    },"名称：" + item)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: "任务类型",
                        key: "task_kind",
                        minWidth: 100
                    },
                    {
                        title: '任务结果',
                        key: 'finish_status',
                        minWidth: 90
                    },
                    {
                        title: '服务内容',
                        key: 'service_content',
                        minWidth: 90
                    },{
                        title: '打卡人',
                        key: 'realname',
                        minWidth: 90
                    },
                    {
                        title: '打卡部门',
                        key: 'departname',
                        minWidth: 120
                    },
                    {
                        title: '开始打卡时间',
                        key: 'begin_time',
                        minWidth: 140,
                    },
                    {
                        title: '结束打卡时间',
                        key: 'end_time',
                        minWidth: 140
                    },
                    {
                        title: '总结',
                        key: 'finish_memo',
                        minWidth: 250,
                        render: (h, params) => {
                            if (params.row.finish_memo == "" || params.row.finish_memo == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.finish_memo
                                if (temp.length > 10) {
                                    if (params.index != this.currentIndex){
                                        return h("div",{
                                        },[
                                            h("span",{
                                                style:{
                                                    display: 'inline-block',
                                                }
                                            },temp.slice(0,10) + "..."),
                                            h("Button", {
                                                props:{
                                                    type:'text',
                                                    display: 'inline-block',
                                                },
                                                style: {
                                                    color:'rgb(45,140,240)',
                                                },
                                                on:{
                                                    click: () => {
                                                       this.change(params.row,params.index)
                                                    }
                                                }
                                            },"点击展开")
                                        ]);
                                    } else {
                                        return h("div",{
                                        },[
                                            h("span",temp)
                                        ]);
                                    }

                                } else {
                                    return h("div",{
                                            },[
                                            h("span", temp)
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            console.log(params)
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             Bus.$emit('openCompanyDetail',params.row.companyid)
                                //         }
                                //     }
                                // }, '[公司详情]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params.row.customerid)
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID: params.row.customer_id});
                                            // Bus.$emit('Open_customer_detail',params.row.customerid)
                                        }
                                    }
                                }, '[客户详情]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/user/legwork/list'
                var config = {
                        params:{
                        order:_self.order,
                        page:_self.page,
                        pageSize:_self.pageSize,
                        sortField:_self.sortField,
                        realname:_self.formValidateSearch.realname,
                        servicedepart:_self.formValidateSearch.servicedepart,
                        companyname:_self.formValidateSearch.companyname,
                        name:_self.formValidateSearch.name,
                        tel:_self.formValidateSearch.tel,
                        finish_status:_self.formValidateSearch.finish_status,
                        bbegin_time:DateFormat(_self.formValidateSearch.begin_time[0]),
                        ebegin_time:DateFormat(_self.formValidateSearch.begin_time[1])
                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    _self.loading = false;
                   for(let i = 0; i < _self.data.length; i++){
                        if(_self.data[i].legwork_status =="begin"){
                            _self.data[i].legwork_status = "未结束打卡"
                        }else if(_self.data[i].legwork_status =="imgNotUpload"){
                            _self.data[i].legwork_status = "图片未上传"
                        }else{
                            _self.data[i].legwork_status = "打卡完成"
                        }
                        if(_self.data[i].begin_time){
                            _self.data[i].begin_time =   DateFormat(_self.data[i].begin_time);

                        }
                       if(_self.data[i].end_time){
                           _self.data[i].end_time =   DateFormat(_self.data[i].end_time);

                       }
                       _self.data[i].finish_status = _self.legwork_finish_statusMap.get( _self.data[i].finish_status);
                       _self.data[i].task_kind = _self.taskKindMap.get(_self.data[i].task_kind);
                    }

                })

            },
            page_size_change(e){
                this.pageSize = e
                this.get_data()
            },
            page_change(e){
                this.page = e
                this.get_data()
            },
            select_row(e){
                this.currentRow = e;
            },
            change(row,index){
                this.currentIndex= index;
            },
            download_excel(){
                let field = [
                    {field:'CompanyName',title:'公司名称'},
                    {field:'name',title:'客户名'},
                    {field:'tel',title:'电话号码'},
                    {field:'task_kind',title:'任务类型',format:'taskKind'},
                    {field:'finish_status',title:'完成状态',format:'legwork_finish_status'},
                    {field:'service_content',title:'服务内容'},
                    {field:'realname',title:'打卡人'},
                    {field:'departname',title:'服务部门'},
                    {field:'begin_time',title:'开始打卡时间'},
                    {field:'end_time',title:'结束打卡时间'},
                    {field:'task_name',title:'任务名称'},

                ]
                let _self = this
                var url = 'api/user/legwork/list'
                let config = {
                    order:_self.order,
                    page:'1',
                    pageSize:'1000000' ,
                    export: 'Y',
                    sortField:_self.sortField,
                    exportField: encodeURI(JSON.stringify(field)),
                    realname:_self.formValidateSearch.realname,
                    servicedepart:_self.formValidateSearch.servicedepart,
                    companyname:_self.formValidateSearch.companyname,
                    name:_self.formValidateSearch.name,
                    tel:_self.formValidateSearch.tel,
                    bbegin_time:DateFormat(_self.formValidateSearch.begin_time[0]),
                    ebegin_time:DateFormat(_self.formValidateSearch.begin_time[1])
                }

                console.log(config);
                let toExcel = this.$MergeURL(url,config)
                window.open(toExcel)
            },
            showDetail(){
                if(!this.currentRow.legwork_id){
                    this.$Message.warning("请选中一行后操作");
                    return
                }
                this.$bus.emit("OPEN_LEGWORK_DETAIL",{"id":this.currentRow.legwork_task_id})


            },
            handleReset(){
                this.formValidateSearch ={}
                this.formValidateSearch.begin_time=['','']
                this.loading = true;
                this.get_data();
            },
            Search(){
                this.loading = true;
                this.get_data();
            }

        },
        created(){
            let _self = this;
            this.$GetDataCenter("legwork_finish_status,taskKind,gzbusinessarea,gzbusinessplace",callback);
            function  callback(e) {
                _self.finishStatusList = e.data.data.legwork_finish_status
                _self.legwork_finish_statusMap = _self.$array2map(e.data.data.legwork_finish_status);
                _self.taskKindMap = _self.$array2map(e.data.data.taskKind);
                _self.gzbusinessareaMap = _self.$array2map(e.data.data.gzbusinessarea);
                _self.gzbusinessplaceMap = _self.$array2map(e.data.data.gzbusinessplace);
                _self.taskKindArray = e.data.data.taskKind;
                _self.get_data();
            }

        }
    }
</script>
