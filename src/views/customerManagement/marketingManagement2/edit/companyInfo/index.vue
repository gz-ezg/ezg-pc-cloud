<template>
    <div>
        <Button name="marketingManagement_index_company_add" type="primary" shape="circle" icon="plus" @click="open_company_create">新增</Button>
        <Button name="marketingManagement_index_company_add" type="primary" shape="circle" icon="ios-crop" @click="open_company_change">公司变更</Button>
        <Table
                :loading="loading"
                border
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                @on-current-change="select_row"
                style="margin-top: 15px"
        ></Table>
        <!-- <Page
            size="small"
            :total="total"
            show-total
            show-elevator
            @on-change="pageChange"
            v-if="total>10"
            style="margin-top: 10px"></Page> -->
        <create-company v-if="close" @update="get_data" :taxtype="taxtype" :companyarea="companyarea_Casr" :customer="customer" :importance="importance" :cluesources="cluesources"></create-company>
        <update-company v-if="close" @update="get_data" :taxtype="taxtype" :companyarea="companyarea_Casr" :customer="customer" :importance="importance" :cluesources="cluesources"></update-company>
        <!-- <amend-company></amend-company> -->
        <change-log></change-log>
        <change-company v-if="close" @update="get_data" :companyData='companyData' :taxtype="taxtype" :companyarea="companyarea_Casr" :customer="customer" :importance="importance" :cluesources="cluesources"></change-company>
    </div>
</template>

<script>
import createCompany from "./create"
import updateCompany from "./update"
import amendCompany from "./amend"
import changeLog from "./changeLog"
import changeCompany from "./changeCompany"

export default {
    components: {
        createCompany,
        updateCompany,
        amendCompany,
        changeLog,
        changeCompany
    },
    props: {
        customer:{
            type: [Array, Object, String]
        },
        importance: {
            type: Array
        },
        cluesources: {
            type: Array
        }
    },
    data(){
        return {
            selectRow:{},
            companyData:[],
            loading: false,
            close: false,
            header: [
                {
                    title: "序号",
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '公司名称',
                    minWidth: 250,
                    render:(h, params) => {
                        if(params.row.companyname == ''||params.row.companyname == null){
                            return ''
                        }else if(params.row.companyname.length>15){
                            return h('Poptip',{
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.companyname.slice(0,15)+'...'),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div',{
                                    slot:'content',
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                    },
                    {
                        title: '跟进销售',
                        key: 'followby',
                        minWidth:100
                    },
                    {
                        title: '交易状态',
                        key: 'enterprisestatusText',
                        minWidth:100                        
                    },
                    {
                        title: '法人',
                        key: 'legalrepresentative',
                        minWidth:100                        
                    },
                    {
                        title: '重要等级',
                        key: 'importlevelText',
                        minWidth:100                        
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        minWidth:100                        
                    },
                    {
                        title: '企业来源',
                        key: 'cluesourceText',
                        minWidth:150                                                    
                    },
                    {
                        title: '操作',
                        key: 'action',
                        minWidth: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        disabled: params.row.status == "readonly"? true : false
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$bus.emit("OPEN_COMPANY_UPDATE", params.row)
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
                                            this.edit(params);
                                        }
                                    }
                                }, '工商信息'),
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
                                            this.get_company_name_change_log(params.row.id)
                                        }
                                    }
                                }, '名称变更日志'),
                            ]);
                        }
                    }
            ],
            data: [],
            companyarea_Casr: [],
            taxtype: []
        }
    },
    methods: {
        get_data(e){
            let _self = this
            _self.loading = true
            let url = 'api/customer/findCompanysByCustomerId/' + e
            let config = {}

            function success(res){
                console.log(res.data.data)
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config ,success)
        },
        get_data_center(){
            let _self = this
            let params = "companyarea,taxtype"
            function success(res){
                _self.companyarea_Casr = _self.$changeCars(res.data.data.companyarea)
                _self.taxtype = res.data.data.taxtype
                // 延迟加载，防止报错
                _self.close = true
            }

            this.$GetDataCenter(params, success)
        },
        get_company_name_change_log(e){
            this.$bus.emit("OPEN_COMPANY_LOG", e)
        },
        open_company_create(){
            this.$bus.emit("OPEN_COMPANY_CREATE",true)
        },
        open_company_change(){
            this.$bus.emit("OPEN_COMPANY_CHANGE",true)
        },
        select_row(e){
            console.log(e)
            this.selectRow = e
            this.companyData = this.selectRow
        },
    },
    created(){
        this.get_data_center()
        this.get_data(this.customer.ID)
    }
}
</script>

