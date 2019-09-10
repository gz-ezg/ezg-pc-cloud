<template>
    <Card>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="add">新增</Button>
                <Button type="primary" icon="information-circled" @click="show">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="edit">修改</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="openInfo = true">同步数据</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="change_status">{{statusName}}</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    @on-row-dblclick="show"
                    border
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
        </Row>
        <detail></detail>
        <Modal v-model="openImportCustomer" title="导入客户" width="200">
            <Row :gutter="20">
                <Col span="24">
                    <center>
                        <Upload ref="upload" :before-upload="handleUpload" action="/api/customer/highseasActivity/importInfo">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:20px">选择文件</Button>
                            <Button type="info" icon="ios-cloud-download-outline" style="margin-top:20px;" @click="open">导入模板</Button>
                        </Upload>
                    </center>
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="openInfo" title="提示" width="200">
            是否同步数据？
            <div slot="footer">
                <Button type="primary" @click="sync_data">确定</Button>
                <Button type="primary" @click="openInfo = false">取消</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import Detail from './common/detail'
    export default {
        name: "index",
        components: {Detail},
        props:{
            Detail
        },
        data(){
            return{
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                status:"",
                statusName:"",
                activity_id:"",
                activity_status:[],
                activity_status_map:new Map(),
                data:[],
                openImportCustomer:false,
                openInfo:false,
                header: [
                    {
                        title: '活动内容',
                        key: 'content',
                        minWidth: 120,
                    },
                    {
                        title: '活动时间',
                        key: 'activity_time',
                        width: 180
                    },
                    {
                        title: '数量',
                        key: 'amount',
                        minWidth: 120,
                    },
                    {
                        title: '范围',
                        key: 'departname',
                        minWidth: 120,
                        render: (h, params) => {
                            if (params.row.departname == "" || params.row.departname == null) {
                                return "";
                            } else {
                                // console.log(params.row.companynames)
                                let temp = params.row.departname.split(",")
                                if (temp[0].length > 6) {
                                    return h("Poptip",{
                                        props: {
                                            trigger: "hover",
                                            title: "范围",
                                            placement: "bottom"
                                        }
                                    },[
                                        h("span",temp[0].slice(0,6)+"..."),
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
                                                },"部门：" + item)
                                            ]))
                                        ])
                                    ]);
                                } else {
                                    return h("Poptip",{
                                            props: {
                                                trigger: "hover",
                                                title: "范围",
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
                                                    },"部门：" + item)
                                                ]))
                                            ])
                                        ]
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        minWidth: 90,
                        render:(h,params)=>{
                            return h('div',{},this.activity_status_map.get(params.row.status))
                        }
                    },
                    {
                        title: '创建人',
                        key: 'realname',
                        minWidth: 70,
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 160,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align:"center",
                        fixed:'right',
                        width: 200,
                        render:(h,params)=>{
                            if (params.row.status == "dd") {
                                return h('div',{},[
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        },
                                        on:{
                                            click:()=>{
                                                this.import_excel()
                                            }
                                        }
                                    },"[导入名单]"),
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        },
                                        on:{
                                            click:()=>{
                                                this.activate(params.row.id,'hdz')
                                            }
                                        }
                                    },"[激活]")
                                ])
                            }
                            if (params.row.status == "hdz") {
                                return h('div',{},[
                                    h('span',{
                                        style:{
                                            color:'#AEDD81'
                                        }
                                    },"活动中"),
                                    h('Button',{
                                        props:{
                                            type:"text"
                                        },
                                        on:{
                                            click:()=>{
                                                this.activate(params.row.id,'yjs')
                                            }
                                        }
                                    },"[结束]")
                                ])
                            }
                            if (params.row.status == "yjs") {
                                return h('div',{
                                    style:{
                                        color:'red'
                                    }
                                },'已结束')
                            }
                        }
                    },
                ]
            }
        },
        methods: {
            selectRow(e) {
                this.current_row = e;
                this.activity_id = e.id
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            import_excel(){
                this.openImportCustomer = true;
            },
            handleUpload(file) {
                let _self = this;
                _self.$Spin.show();
                let formdata = new FormData();
                let url = 'api/customer/highseasActivity/importInfo';

                formdata.append('activityId', _self.activity_id);
                formdata.append('file', file);

                function success(res) {
                    _self.get_data();
                    _self.openImportCustomer = false;
                    _self.$Spin.hide();
                    return false;
                }

                function fail(err) {
                    _self.$Spin.hide();
                    return false;
                }

                this.$Post(url, formdata, success, fail);
                return false;
            },
            open() {
                window.open('/api/assets/upload/commonImg/public_pool_template.xlsx');
            },
            activate(e,i){
                let _self = this;
                this.current_row = ""
                let url = `api/customer/highseasActivity/changeStatus`;
                let config = {
                    params: {
                        id: e,
                        status: i,
                    }
                }

                function success(res){
                    _self.get_data();
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            add(){
                this.$bus.emit("ADD_SETTING_INFO",this.current_row)
            },
            show(){
                if (this.current_row) {
                    this.$bus.emit("SHOW_SETTING_INFO",this.current_row)
                }else {
                    this.$Message.warning("请选择一行进行操作")
                }
            },
            edit(){
                if (this.current_row) {
                    if (this.current_row.status=='dd') {
                        this.$bus.emit("EDIT_SETTING_INFO",this.current_row)
                    } else {
                        this.$Message.warning("当前状态不允许修改！")
                    }
                }else {
                    this.$Message.warning("请选择一行进行操作！")
                }
            },
            sync_data(){
                let _self = this;
                _self.openInfo = false
                _self.loading = true;
                let url = `api/customer/highseasActivity/synchronizedDate`;
                let config = {
                    params: {

                    }
                }

                function success(res){
                    _self.loading = false
                    _self.get_data()
                }

                function fail(err){
                    _self.get_data()
                }

                this.$Get(url, config, success, fail)
            },
            get_status(){
                let _self = this;
                let url = `api/customer/highseasActivity/getHighseasStatus`;
                let config = {
                    params: {

                    }
                }

                function success(res){
                    let a = res.data.data
                    if (a==0){
                        _self.status = 1
                        _self.statusName = "锁定公海池"
                    }
                    if (a==1){
                        _self.status = 0
                        _self.statusName = "解锁公海池"
                    }
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            change_status(){
                let _self = this;
                let url = `api/customer/highseasActivity/lockHighseas`;
                let config = {
                    params: {
                        status:_self.status
                    }
                }

                function success(res){
                    _self.get_status()
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                this.current_row = ""
                let url = `api/customer/highseasActivity/list`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        sortField:"activity_time"
                    }
                }

                function success(res){
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_data_center(){
                let params = "activity_status"
                let _self = this
                function success(res){
                    _self.activity_status = res.data.data.activity_status
                    _self.activity_status_map = _self.$array2map(_self.activity_status)
                }
                this.$GetDataCenter(params, success)
            },
        },
        created() {
            this.get_data_center()
            this.get_status()
            this.get_data()
            this.$bus.off("UPDATE_INDEX",true)
            this.$bus.on("UPDATE_INDEX",e=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>