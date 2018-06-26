<template>
    <div >
        <Table 
            highlight-row 
            :data="tableShowData" 
            :columns="header"
            @on-current-change="select_row"	 
            >
        </Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: left;">
            <Page :total="total_Num"
                :loading = "sql_loading"
                :current="1" 
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange" 
                @on-change="changePage" 
                show-sizer
                show-elevator
                >
            </Page>
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
                sql_loading:false,
                total_Num:new Number(),
                pageSize:10,
                current_page:1,
                tableShowData:[],
                header: [
                    {
                        title:'序号',
                        type:'index',
                        align:'center',
                        width:60,
                        fixed:'left'
                    },
                    // {
                    //     title:'SQL查询',
                    //     key:'sql_select',
                    //     width:200
                    // },
                    {
                        title:'SQL组',
                        key:'sql_group',
                        width:120
                    },
                    // {
                    //     title:'SQL主体',
                    //     key:'sql_main_show',
                    //     width:200
                    // },
                    {
                        title:'SQL编码',
                        key:'sql_code',
                        width:120
                    },
                    {
                        title:'SQL名称',
                        key:'sql_name',
                        width:120
                    },
                    // {
                    //     title:'SQL对应函数名称',
                    //     key:'sql_function_name',
                    //     width:180,
                    //     align:'center',
                    // },
                    {
                        title:'包含角色权限',
                        key:'must_role_permission',
                        width:180
                    },
                    {
                        title:'#',
                        key:'createDate',
                        align:'center',
                        width:100,
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
                                            this.detail_show(params)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    },
                    {
                        title:'#',
                        key:'createDate',
                        align:'center',
                        width:150,
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
                                            this.connect_detail_show(params)
                                        }
                                    }
                                }, '查看关联用户')
                            ]);
                        }
                    }
                ]
            }
        },
        created: function(){
            this.GetTableData()
            var _that = this
            Bus.$on('refresh',e =>{
                _that.GetTableData()
            })
        },
        methods:{
            connect_detail_show(e){
                Bus.$emit('connect_detail_sql_user',e.row)
            },
            //  传出点击的行
            select_row(e){
                Bus.$emit('select_row',e)
            },
            //  列表查看按钮弹出
            detail_show(e){
                Bus.$emit('isshow',e.row)
            },
            //  改变页号
            changePage(index){
                this.current_page = index
                this.GetTableData()
            },
            //  改变每页大小
            pageSizeChange(index){
                this.pageSize = index
                this.GetTableData()

            },
            // 初始化并获取数据
            GetTableData(){
                var _that = this
                _that.sql_loading = true 
                var url = '/api/system/sqlTemplateList?page='+ _that.current_page + '&pageSize=' + _that.pageSize
                this.$http.get(url).then(function(res){
                    _that.$backToLogin(res)
                    
                    _that.total_Num = res.data.data.total
                    _that.tableShowData = res.data.data.rows
                    // for(let i=0;i<res.data.data.rows.length;i++){
                    //     _that.tableShowData[i].sql_main_show = _that.tableShowData[i].sql_main.slice(0,130) + '...'
                    // }
                    _that.sql_loading = false
                }).catch(function(err){
                })
            }
        }
    }
</script>