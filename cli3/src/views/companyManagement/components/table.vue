<template>
    <div >
        <Table highlight-row :data="tableShowData" :columns="header" @on-current-change="save_current"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: left;">
            <Page :total="total_Num" :current="1" :page-size="pageSize" @on-page-size-change="pageSizeChange" @on-change="changePage" show-sizer show-elevator></Page>
        </div>
    </div>
    </div>
</template>
<script>
    import Bus from './bus'
    export default {
        name:'Tableshow',
        data () {
            return{
                total_Num:"",
                total_Data:[],
                pageSize:10,
                current_page:1,
                total:0,
                tableShowData:[],
                header: [
                    {
                        title:'序号',
                        type:'index',
                        align:'center',
                        width:60,
                        fixed:'left'
                    },
                    {
                        title:'公司名称',
                        key:'CompanyName',
                        width:300,
                        fixed:'left'
                    },
                    {
                        title:'法人',
                        key:'legalrepresentative',
                        width:100
                    },
                    {
                        title:'重要等级',
                        key:'importlevel',
                        width:100,
                        align:'center',
                    },
                    {
                        title:'归属客户',
                        key:'NAME',
                        width:150
                    },
                    {
                        title:'客户电话',
                        key:'TEL',
                        width:150
                    },
                    {
                        title:'区域',
                        key:'area',
                        width:60,
                        align:'center',
                    },
                    {
                        title:'年度纳税评级',
                        key:'financelevel',
                        width:150,
                        align:'center',
                    },
                    {
                        title:'创建日期',
                        key:'createDate',
                        width:150
                    },
                    {
                        title:'创建人',
                        key:'CreateBy',
                        width:100
                    },
                    {
                        title:'跟进人',
                        key:'followby',
                        width:100
                    },
                    {
                        title:'更新时间',
                        key:'updatedate',
                        width:150
                    },
                    // {
                    //     title:'操作',
                    //     width:100,
                    //     fixed:'right'
                    // }
                ]
            }
        },
        created: function(){
            this.init()
        },
        methods:{

            save_current(e,v){
                Bus.$emit('current_data',e,v)
            },
            changePage(index){
                this.current_page = index
                this.loadingData()
                
            },
            pageSizeChange(index){
                this.pageSize = index
                this.loadingData()
            },
            loadingData(){
                var _that = this
                var url = 'api/company/findCompanyByPages/'+ _that.current_page +'/'+ _that.pageSize
                this.$http.get(url).then(function(res){
                    _self.$backToLogin(res)                    
                    _that.tableShowData = res.data.data.rows
                    _that.total_Num = res.data.data.total
                    window.scrollTo(0,0)
                }).catch(function(err){
                })
            },
            // 初始化并获取数据
            init(){
                this.loadingData()
            }
        }

    }
</script>