<!--    人员工作统计汇总    -->
<template>
    <div>
        <Table
            :columns="header" 
            :data="data"
        >
        </Table>
        <Page
            size="small"
            :total="pageTotal"
            show-total
            show-sizer
            show-elevator
            :current.sync = "page"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            style="margin-top: 10px"></Page>
    </div>
</template>

<script>
export default {
    props:['time'],
    data(){
        return{
            pageTotal:new Number(),
            page: 1,
            pageSize: 10,
            header:[
                {
                    title:'人员',
                    key:'servername',
                    width: 120
                },
                {
                    title:'公司名称',
                    key:'companyname',
                    width: 240,
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>14){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,14)+'...'),
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
                    title:'订单号',
                    key:'ordercode',
                    width: 150,
                },
                {
                    title:'创建时间',
                    key:'CreateDate',
                    width: 150
                },
                {
                    title:'产品',
                    key:'product',
                    width: 240,
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.product == ''||params.row.product == null){
                                return ''
                            }else if(params.row.product.length>16){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.product.slice(0,16)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.product)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.product)
                            }
                        }
                },
                {
                    title:'当前完成节点',
                    key:'nextprocess',
                    width: 150
                },
                {
                    title:'完成时间',
                    key:'ServiceEnd',
                    width: 150
                }
            ],
            data:[]
        }
    },
    methods: {
        getData(){
            var _self = this
            // _self.Sloading = true       
            var url = 'api/order/workOrderList?sortField=UpdateDate'
            var config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    // companyName:_self.formInline.companyname,
                    serviceName:localStorage.getItem('realname'),
                    serviceDept:"'BUSSINESS'",
                }
            }  
            _self.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)
                
                console.log(res.data.data.rows)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0;i<res.data.data.rows.length;i++){
                    // console.log(_self.data[i])
                    if(_self.data[i].CreateDate!='' && _self.data[i].CreateDate!=null){
                        _self.data[i].CreateDate = _self.data[i].CreateDate.slice(0,10)
                    }
                    if(_self.data[i].ServiceStart!='' && _self.data[i].ServiceStart!=null){
                        _self.data[i].ServiceStart = _self.data[i].ServiceStart.slice(0,10)
                    }
                    if(_self.data[i].ServiceEnd!='' && _self.data[i].ServiceEnd!=null){
                        _self.data[i].ServiceEnd = _self.data[i].ServiceEnd.slice(0,10)
                    }
                }
                // _self.Sloading = false
                //  测试块，测试map()

            })
            
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getDate()
        }
    },
    created () {
        this.getData()
    }
}
</script>
