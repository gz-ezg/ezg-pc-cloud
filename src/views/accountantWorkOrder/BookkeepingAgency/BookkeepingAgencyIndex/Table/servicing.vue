<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown="show">
                            <Form ref="SearchValidate" :model="SearchValidate" :label-width="80" style="margin-top: 15px">
                                <Row :gutter="8" style="height:56px">
                                    <Col span="8">
                                    <FormItem label="企业名称：" prop="CompanyName">
                                        <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <Col span="8">
                                    <FormItem label="服务人员：" prop="server_realname">
                                        <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                    </FormItem>
                                    </Col>
                                    <!-- <Col span="8">
                                    <FormItem label="跟进人：" prop="followby_realname">
                                        <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                    </FormItem>
                                    </Col> -->
                                    <!-- <Col span="8">
                                    <FormItem label="服务部门：" prop="followby_realname">
                                        <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                    </FormItem>
                                    </Col> -->
                                </Row>
                                <center>
                                    <FormItem>
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                            重置
                                        </Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
        <Row>
            <ButtonGroup>
                <!-- <Button type="primary" icon="information-circled" @click="scbd">时长变动日志</Button> -->
                <Button type="primary" icon="ios-color-wand-outline" @click="ksfw">停止服务</Button>
                <Button type="primary" icon="information-circled" @click="fpkj">变更会计</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="zlwc" v-if="zl">资料完成</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="zzwc" v-if="zz">做账完成</Button> -->
                <Button type="primary" icon="ios-color-wand-outline" @click="bswc" v-if="bs">设置财务等级</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
            <!-- <Poptip
                        style="float: right"
                        placement="bottom-end"
                        width="400">
                    <Button type="text" icon="funnel">筛选</Button>
                    <div slot="content" @keydown="show">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="120" style="margin-top: 15px">
                            <Row :gutter="16" style="height:56px">
                                <Col span="22">
                                <FormItem label="企业名称：" prop="CompanyName">
                                    <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" style="height:56px">
                                <Col span="22">
                                <FormItem label="服务人员：" prop="server_realname">
                                    <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" style="height:56px">
                                <Col span="22">
                                <FormItem label="跟进人：" prop="followby_realname">
                                    <Input v-model="SearchValidate.followby_realname" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <center>
                                <FormItem style="margin-top:10px">
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                        重置
                                    </Button>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Poptip> -->
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :row-class-name="rowClassName"
                    :data="data"></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
    import Bus from '../../../../../components/bus'

    export default {
        data() {
            return {
                cservicest:"",
                cservicest_map:new Map(),
                loading:false,
                search_model:"",
                SearchValidate:{
                    CompanyName:'',
                    server_realname:'',
                    followby_realname:''
                },
                current_row:"",
                page: 1,
                pageSize: 10,
                tiaozheng: false,
                zl: false,
                zz: false,
                bs: false,
                zlid: '',
                zzid: '',
                bsid: '',
                search_model: '',
                id: {},
                pageTotal: new Number(),
                task_message:{
                    companyName:'1111111111'
                },
                data:[],
                header: [
                    {
                        title: '对应企业',
                        key: 'companyname',
                        width: 250
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        width: 160
                    },
                    // {
                    //     title: '国地税报道',
                    //     key: 'gdsreport',
                    //     width: 120
                    // },
                    {
                        title: '服务人员',
                        key: 'realname',
                        width: 120
                    },
                    {
                        title:'服务状态',
                        key: 'service_status',
                        width: 120
                    },
                    // {
                    //     title: '市场',
                    //     key: 'followby_realname',
                    //     width: 120
                    // },
                    // {
                    //     title: '剩余时长',
                    //     key: 'balance_count',
                    //     width: 120
                    // },
                    // {
                    //     title: '开始期间',
                    //     key: 'begin_period',
                    //     width: 120
                    // },
                    {
                        title: '结束期间',
                        key: 'end_period',
                        width: 120
                    },

                    {
                        title: '资料接收',
                        key: 'ziliaojieshou',
                        width: 120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/; 
                            // console.log(reg.test(params.row.ziliaojieshou))
                            if(reg.test(params.row.ziliaojieshou)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.ziliaojieshou)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.ziliaojieshou.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '增值税',
                        key: 'zzs',
                        width:120,
                        render: (h, params) => {
                            let reg =/^[-+]?\d*$/;
                            // console.log(isNaN(params.row.zlwc))
                            // console.log(reg.test(params.row.zengzhishui))
                            if(reg.test(params.row.zengzhishui)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.zengzhishui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.zengzhishui.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '所得税',
                        key: 'suodeshui',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.suodeshui)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.suodeshui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.suodeshui.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '附加税',
                        key: 'fujiashui',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.fujiashui)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.fujiashui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.fujiashui.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '个税',
                        key: 'geshui',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.geshui)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.geshui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.geshui.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '印花税',
                        key: 'yinhuashui',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.yinhuashui)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.yinhuashui)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.yinhuashui.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '社保',
                        key: 'shebao',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.shebao)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.shebao)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.shebao.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '公积金',
                        key: 'gongjijin',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.gongjijin)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.gongjijin)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.gongjijin.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '缴款',
                        key: 'jiaokuan',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.jiaokuan)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.jiaokuan)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.jiaokuan.slice(0,10))
                            }
                        }
                    },
                                        {
                        title: '抄税清卡',
                        key: 'chaoshuiqingka',
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.chaoshuiqingka)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.chaoshuiqingka)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.chaoshuiqingka.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '报税',
                        key: 'baoshuiwancheng',
                        width: 120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.baoshuiwancheng)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.baoshuiwancheng)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.baoshuiwancheng.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '做账',
                        key: 'zuozhangwancheng',
                        width: 120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            // console.log(isNaN(params.row.zlwc))
                            if(reg.test(params.row.zuozhangwancheng)){
                                // let color
                                // if(params.row.balance_count <= 2){
                                //     color = 'red'
                                // }else{
                                //     color = 'black'
                                // }
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    // style:{
                                    //     color: color
                                    // },
                                    on:{
                                        click:()=>{
                                            this.zlwc(params.row.zuozhangwancheng)
                                        }
                                    }
                                }, '[ 完成 ]'),
                            ]);
                            }else{
                                return h('div', params.row.zuozhangwancheng.slice(0,10))
                            }
                        }
                    },
                    {
                        title: '警戒值',
                        key: 'accounter_security_line',
                        width: 120
                    },
                    // {
                    //     title: '账务等级',
                    //     key: 'account_level',
                    //     width: 120
                    // },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 120,
                        render:(h,params) => {
                            if(params.row.memo == ''||params.row.memo == null){
                                return ''
                            }else if(params.row.memo.length>5){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[
                                    h('span',params.row.memo.slice(0,5)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.memo)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.memo)
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            Bus.$emit('openCompanyDetail',params.row.company_id)
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.batchBookId != null){
                                                Bus.$emit('open_yichang_detail',params.row.batchBookId)
                                            }else{
                                                this.$Message.warning('未绑定账本')
                                            }
                                            
                                        }
                                    }
                                }, '[查看异常]'),
                            ]);
                        }
                    }
                ]
            }
            //     header: [
            //         {
            //             title: '对应企业',
            //             key: 'CompanyName',
            //             width: 250
            //         },
            //         {
            //             title: '产品名称',
            //             key: 'product',
            //             width: 160
            //         },
            //         {
            //             title: '国地税报道',
            //             key: 'gdsreport',
            //             width: 120
            //         },
            //         {
            //             title: '服务人员',
            //             key: 'server_realname',
            //             width: 120
            //         },
            //         {
            //             title: '市场',
            //             key: 'followby_realname',
            //             width: 120
            //         },
            //         {
            //             title: '剩余时长',
            //             key: 'balance_count',
            //             width: 120
            //         },
            //         {
            //             title: '开始期间',
            //             key: 'begin_period',
            //             width: 120
            //         },
            //         {
            //             title: '结束期间',
            //             key: 'end_period',
            //             width: 120
            //         },
            //         {
            //             title: '收资料',
            //             key: 'zl',
            //             width: 120,
            //             render: (h, params) => {
            //                 if(params.row.zl == "" || params.row.zl == null){
            //                     let color
            //                     if(params.row.balance_count <= 2){
            //                         color = 'red'
            //                     }else{
            //                         color = 'black'
            //                     }
            //                     return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'text',
            //                             size: 'small'
            //                         },
            //                         style:{
            //                             color: color
            //                         },
            //                         on:{
            //                             click:()=>{
            //                                 this.zlwc()
            //                             }
            //                         }
            //                     }, '[ 完成 ]'),
            //                 ]);
            //                 }else{
            //                     return h('div', params.row.zl)
            //                 }
            //             }
            //         },
            //         {
            //             title: '做账',
            //             key: 'zz',
            //             width: 120,
            //             render: (h, params) => {
            //                 if(params.row.zz == "" || params.row.zz == null){
            //                     let color
            //                     if(params.row.balance_count <= 2){
            //                         color = 'red'
            //                     }else{
            //                         color = 'black'
            //                     }
            //                     return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'text',
            //                             size: 'small'
            //                         },
            //                         style:{
            //                             color: color
            //                         },
            //                         on:{
            //                             click:()=>{
            //                                 this.zzwc()
            //                             }
            //                         }
            //                     }, '[ 完成 ]'),
            //                 ]);
            //                 }else{
            //                     return h('div', params.row.zz)
            //                 }
            //             }
            //         },
            //         {
            //             title: '报税',
            //             key: 'bs',
            //             width: 120,
            //             render: (h, params) => {
            //                 if(params.row.bs == "" || params.row.bs == null){
            //                     let color
            //                     if(params.row.balance_count <= 2){
            //                         color = 'red'
            //                     }else{
            //                         color = 'black'
            //                     }
            //                     return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'text',
            //                             size: 'small'
            //                         },
            //                         style:{
            //                             color: color
            //                         },
            //                         on:{
            //                             click:()=>{
            //                                 this.bswc()
            //                             }
            //                         }
            //                     }, '[ 完成 ]'),
            //                 ]);
            //                 }else{
            //                     return h('div', params.row.bs)
            //                 }
            //             }
            //         },
            //         {
            //             title: '警戒值',
            //             key: 'accounter_security_line',
            //             width: 120
            //         },
            //         {
            //             title: '备注',
            //             key: 'workordermemo',
            //             width: 120,
            //             render:(h,params) => {
            //                 if(params.row.workordermemo == ''||params.row.workordermemo == null){
            //                     return ''
            //                 }else if(params.row.workordermemo.length>5){
            //                     return h('Poptip',{
            //                         props:{
            //                             trigger:'hover',
            //                             placement:'bottom'
            //                         }
            //                     },[

            //                         h('span',params.row.workordermemo.slice(0,5)+'...'),
            //                         h('Icon', {
            //                             props: {
            //                                 type: 'arrow-down-b',
            //                             }
            //                         }),
            //                         h('div',{
            //                             slot:'content',
                                        
            //                         },[
            //                             h('span',params.row.workordermemo)
            //                         ])
            //                     ])
            //                 }else{
            //                     return h('span',params.row.workordermemo)
            //                 }
            //             }
            //         },
            //         {
            //             title: '操作',
            //             key: 'action',
            //             fixed: 'right',
            //             width: 200,
            //             align: 'center',
            //             render: (h, params) => {
            //                 return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'text',
            //                             size: 'small'
            //                         },
            //                         on: {
            //                             click: () => {
            //                                 Bus.$emit('detail', params)
            //                             }
            //                         }
            //                     }, '[查看公司]'),
            //                     h('Button', {
            //                         props: {
            //                             type: 'text',
            //                             size: 'small'
            //                         },
            //                         on: {
            //                             click: () => {
            //                                 if(params.row.batchBookId != null){
            //                                     Bus.$emit('open_yichang_detail',params.row.batchBookId)
            //                                 }else{
            //                                     this.$Message.warning('未绑定账本')
            //                                 }
                                            
            //                             }
            //                         }
            //                     }, '[查看异常]'),
            //                 ]);
            //             }
            //         }
            //     ]
            // }
        },
        methods: {
            downloadExcel(){
                let field = [
                    {field:'service_status',title:'服务状态',format:'cservicest'},
                    {field:'customername',title:'客户名称'},
                    {field:'companyname',title:'对应企业'},
                    {field:'product',title:'产品名称'},
                    {field:'realname',title:'服务人员'},
                    {field:'followbyrealname',title:'市场'},
                    // {field:'balance_count',title:'剩余时长'},
                    // {field:'begin_period',title:'开始期间'},
                    {field:'end_period',title:'结束期间'},
                    {field:'memo',title:'备注'}
                    // {field:'serverrealname',title:'服务人员'},
                    // {field:'period',title:'服务周期'}
                    ]
                let _self = this
                let url = `api/order/cycle/month/service/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        period:"",
                        companyname: _self.SearchValidate.CompanyName,
                        realname: _self.SearchValidate.server_realname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            handleReset(){
                this.SearchValidate.CompanyName = ""
                this.SearchValidate.server_realname = ""
                this.SearchValidate.followby_realname = "" 
                this.Search()               
            },
            Search(){
                this.page = 1
                this.getData()
            },
            show(e){
                // console.log(e)
                if(e.key=='Enter'){
                    this.Search()
                }
            },
            getData(){
                let _self = this
                _self.loading =  true
                let url = `api/order/cycle/month/service/list`
                let config = {
                    params:{
                        page: _self.page,
                        pageSize: _self.pageSize,
                        period:"",
                        companyname: _self.SearchValidate.CompanyName,
                        realname: _self.SearchValidate.server_realname,
                    }
                }
                this.$http.get(url,config).then(function(res){
                    _self.data = res.data.data.rows 
                    _self.pageTotal = res.data.data.total
                    for(let i = 0;i<_self.data.length;i++){
                        _self.data[i].service_status = _self.cservicest_map.get(_self.data[i].service_status)
                    }
                    _self.loading = false
                })
            },
            // getData() {
            //     let _self = this
            //     _self.loading = true
            //     let url = '/order/cycle/service/record/list?sortField=updatedate&service_type=dljz&page=' + _self.page + '&pageSize=' + _self.pageSize + '&service_status=inservice&followby_realname='+_self.SearchValidate.followby_realname + '&CompanyName=' + _self.SearchValidate.CompanyName +'&server_realname=' +_self.SearchValidate.server_realname
            //     // let config ={
            //     //     params:{
            //     //         page: _self.page,
            //     //         pageSize: _self.pageSize,
            //     //         service_status:
            //     //     }
            //     // }
            //      function doSuccess(res) {
            //         let _data = res.data.data
            //         let _ids = []
            //         _self.pageTotal = _data.total
            //         _self.data = []

            //         for (let i = 0; i < _data.rows.length; i++) {
            //             _ids.push(_data.rows[i].month_service_id)
            //             let _gdsreport = ''
                        
            //             if (_data.rows[i].gdsreport == 'ybd') {
            //                 _gdsreport = '已报道'
            //             } else if (_data.rows[i].gdsreport == 'wbd') {
            //                 _gdsreport = '未报道'
            //             } else if (_data.rows[i].gdsreport == 'bybd') {
            //                 _gdsreport = '不用报道'
            //             }

            //             _self.data.push({
            //                 gdsreport: _gdsreport,                            
            //                 id: _data.rows[i].id,
            //                 month_service_id: _data.rows[i].month_service_id,
            //                 company_id: _data.rows[i].company_id,
            //                 service_depart_id: _data.rows[i].service_depart_id,
            //                 service_status: _data.rows[i].service_status,
            //                 CompanyName: _data.rows[i].CompanyName,
            //                 begin_period:_data.rows[i].begin_period,
            //                 end_period:_data.rows[i].end_period,
            //                 server_realname:_data.rows[i].server_realname,
            //                 followby_realname:_data.rows[i].followby_realname,
            //                 balance_count:_data.rows[i].balance_count,
            //                 workordermemo:_data.rows[i].workordermemo,
            //                 product:_data.rows[i].product,
            //                 batchBookId:_data.rows[i].batchBookId,
            //                 zl: '',
            //                 zz: '',
            //                 bs: '',
            //                 cycle_work_order_id:_data.rows[i].cycle_work_order_id
                            
            //             })
            //         }
            //         console.log(_ids)
                    

            //         let _url = '/order/cycle/month/service/item/details?monthServiceIds=' + _ids.join()

            //         function doSuccess2(res2) {
            //             let _obj = res2.data.data

            //             for (let i = 0; i < _self.data.length; i++) {
            //                 if (_self.data[i].month_service_id != null) {
            //                     _self.data[i].zl = res2.data.data[_self.data[i].month_service_id][0].confirm_date!=null?res2.data.data[_self.data[i].month_service_id][0].confirm_date.substr(0,10):''
            //                     _self.data[i].zz = res2.data.data[_self.data[i].month_service_id][1].confirm_date!=null?res2.data.data[_self.data[i].month_service_id][1].confirm_date.substr(0,10):''
            //                     _self.data[i].bs = res2.data.data[_self.data[i].month_service_id][2].confirm_date!=null?res2.data.data[_self.data[i].month_service_id][2].confirm_date.substr(0,10):''
            //                 }
            //             }
            //             _self.loading = false

            //         }

            //         _self.GetData(_url, doSuccess2)
            //     }

            //     this.GetData(url, doSuccess)
            // },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getData()
            },

            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            // 分配会计 
            fpkj() {
                let _self = this

                if (_self.current_row ==  '' || _self.current_row == undefined) {
                    this.$Message.warning('请选择要变更会计的项目')
                } else {
                    _self.current_row.workordermemo = _self.current_row.memo
                    _self.current_row.followby_realname = _self.current_row.followbyrealname
                    _self.current_row.CompanyName = _self.current_row.companyname
                    Bus.$emit('fenpei', _self.current_row)
                }
            },

            // 查看变更日志
            ckbgrz() {
                Bus.$emit('rizhi',true)
            },

            gsxq() {
                Bus.$emit('detail',true)
            },

            gszx() {
                Bus.$emit('zhuxiao',true)
            },

            ddxq() {
                Bus.$emit('orderdetail',true)
            },

            ksfw() {
                let _self = this

                if (_self.current_row == '' || _self.current_row == undefined) {
                    _self.$Message.warning('请选择要停止服务的项目')
                } else {
                    this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {
                        let url = 'api/order/cycle/service/record/update'
                        let _data = {
                            id: _self.current_row.cycle_service_record_id,
                            serviceStatus: 'stop'
                        }

                        function doSuccess() {
                            _self.$Message.success('已停止该服务')
                            _self.page = 1
                            _self.getData()
                        }

                        function fail(res){

                        }

                        // _self.PostData(url, _data, doSuccess)
                        _self.$Post(url, _data, doSuccess, fail)
                    },
                    onCancel: () => {}
                });
                }
            },

            tzfw() {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {},
                    onCancel: () => {},
                });
            },
            
            scbd() {
                Bus.$emit('shic',true)
            },

            cpbg() {
                Bus.$emit('biangeng',true)
            },

            selectRow(e){
                this.current_row = e
                // console.log(this.current_row)
            },
            // selectrow(a) {
            //     let _self = this
            //     let url = '/order/cycle/month/service/item/list?monthServiceId=' + a.month_service_id
            //     _self.id = a
            //     _self.zl = false
            //     _self.zz = false
            //     _self.bs = false

            //     function doSuccess(res) {
            //         let _data = res.data.data

            //         for (let i = 0; i < _data.length; i++) {
            //             if (_data[i].item_status == 'serviceing') {
            //                 if (_data[i].serviceitemname == '资料完成') {
            //                     _self.zl = true
            //                     _self.zlid = _data[i].id
            //                 } else if (_data[i].serviceitemname == '做账完成') {
            //                     _self.zz = true
            //                     _self.zzid = _data[i].id
            //                 } else if (_data[i].serviceitemname == '报税完成') {
            //                     _self.bs = true
            //                     _self.bsid = _data[i].id
            //                 }
            //             }
            //         }
            //     }

            //     this.GetData(url, doSuccess)
            // },

            zlwc(e) {
                // console.log(ease-enter)
                let _self = this
                let url = '/order/cycle/month/service/item/finish'
                let _data = {
                    monthServiceItemId: e
                }

                function doSuccess(res) {
                    _self.$Message.success('提交成功')
                    // _self.page = 1
                    _self.getData()
                }

                this.PostData(url, _data, doSuccess)
            },

            // zlwc2(e) {
            //     // console.log(ease-enter)
            //     let _self = this
            //     let url = '/order/cycle/month/service/item/finish'
            //     let _data = {
            //         monthServiceItemId: e
            //     }

            //     function doSuccess(res) {
            //         _self.$Message.success('提交成功')
            //         // _self.page = 1
            //         _self.getData()
            //     }

            //     this.PostData(url, _data, doSuccess)
            // },
            // zzwc() {
            //     let _self = this
            //     let url = '/order/cycle/month/service/item/finish'
            //     let _data = {
            //         monthServiceItemId: _self.zzid
            //     }

            //     function doSuccess(res) {
            //         _self.$Message.success('提交成功')
            //         // _self.page = 1
            //         _self.getData()
            //     }

            //     this.PostData(url, _data, doSuccess)
            // },

            // bswc() {
            //     let _self = this
            //     let url = '/order/cycle/month/service/item/finish'
            //     let _data = {
            //         monthServiceItemId: _self.bsid
            //     }

            //     function doSuccess(res) {
            //         _self.$Message.success('提交成功')
            //         // _self.page = 1
            //         _self.getData()
            //     }

            //     this.PostData(url, _data, doSuccess)
            // },
            rowClassName(row, index) {
                let _self = this
                if (row.balance_count <= 2) {
                    return 'demo-table-error-row2';
                }
            },
            getCservicest(){
                let _self = this
                let config = "cservicest"
                function finsih(res){
                    _self.cservicest = res.data.data.cservicest
                    _self.cservicest_map = _self.$array2map(_self.cservicest)
                    console.log(_self.cservicest_map)
                }
                this.$GetDataCenter(config, finsih)
            }
        },
        mounted() {
            this.getData()
        },
        created () {
            let _self = this
            this.getCservicest()            
            Bus.$on('UPDATE_ALL_ACCOUNT_PAGE',(e)=>{
                _self.getData()
            })
            Bus.$on('update_auditlist_detail',(e)=>{
                _self.getData()
            })
        }
    }
</script>

<style>
    .demo-table-error-row2{
        color:red
    }
</style>

