<template>
    <div>
        <Table 
            highlight-row 
            :data="tableShowData" 
            :columns="header"
            @on-current-change="select_row"	 
            >
        </Table>
    <div style="margin: 10px;">
        <div style="float: left;">
            <Page :total="total_Num"
                :loading = "sql_loading"
                :current="current_page" 
                :page-size="pageSize" 
                @on-page-size-change="pageSizeChange" 
                @on-change="changePage" 
                show-sizer
                show-elevator
                size="small"
                >
            </Page>
        </div>
    </div>
    </div>
</template>
<script>
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
                                }, '查看SQL详情')
                            ]);
                        }
                    },
                    {
                        title:'#',
                        key:'createDate',
                        align:'center',
                        width:200,
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
                                }, '查看用户权限组')
                            ]);
                        }
                    }
                ]
            }
        },
        created: function(){
            this.GetTableData()
            var _that = this
            _that.$bus.on('refresh',e =>{
                // _that.current_page = 1
                _that.GetTableData()
            })
        },
        methods:{
            connect_detail_show(e){
                this.$bus.emit('connect_detail_sql_user',e.row)
            },
            //  传出点击的行
            select_row(e){
                this.$bus.emit('select_row',e)
            },
            //  列表查看按钮弹出
            detail_show(e){
                this.$bus.emit('isshow',e.row)
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
                var url = '/api/system/sqlTemplateList'

                let config = {
                    params:{
                        page: _that.current_page,
                        pageSize: _that.pageSize
                    }
                }

                function success(res){
                    _that.total_Num = res.data.data.total
                    _that.tableShowData = res.data.data.rows
                    _that.sql_loading = false
                }

                this.$Get(url, config, success)
            }
        }
    }
</script>