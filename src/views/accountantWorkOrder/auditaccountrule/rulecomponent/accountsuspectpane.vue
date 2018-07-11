<template>
    <Card>
        <ButtonGroup style="margin-bottom:20px">
            <!-- <Button type="primary">导出excel</Button> -->
            <Button type="primary" icon="plus" @click="add_company_rule">录入</Button>
            <Button type="primary" icon="edit" @click="edit_company_rule">编辑</Button>
            <Button type="primary" icon="drag" @click="open_company_rule">查看</Button>            
        </ButtonGroup>
        <Table
            highlight-row
            size="small"
            :columns="header"
            :data="data"
            @on-current-change="save_current_row"
            ></Table>
        <Page
            size="small"
            :total="pageTotal"
            show-total
            show-sizer
            show-elevator
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            style="margin-top: 10px"></Page>
    </Card>
</template>

<script>
// import Bus from '../../../../components/bus.js'

export default {
    data(){
        return{
            type:'2',
            header:[
                {
                    title:'序号',
                    type:'index',
                    width:60,
                    align:'center'
                },{
                    title:'规则名称',
                    key:'name',
                    width:500
                },{
                    title:'创建时间',
                    key:'createdate',
                    width:150
                },{
                    title:'修改时间',
                    key:'updatedate',
                    width:150
                },
                {
                    title:'警戒值',
                    key:'security_line',
                    width:150
                },{
                    title:'操作',
                    key:'',
                    width:150,
                    render:(h,params)=>{
                        return h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:() => {
                                    this.delete(params.row)
                                }
                            }
                        },'删除'
                    )}
                }
            ],
            data:[],
            pageTotal:new Number(),
            page:1,
            pageSize:10,
            //  筛选
            searchName:"",
            select_row:""
        }
    },
    methods: {
        add_company_rule(){
            // Bus.$emit('open_audit_page',2)
            this.$bus.emit('open_audit_page',2)
        },
        edit_company_rule(){
            let _self = this
            if(this.select_row != ""){
                _self.$bus.emit('edit_audit_page',_self.select_row)
                // Bus.$emit('edit_audit_page',_self.select_row)
            }else{
                this.$Message.warning('请选择一行进行编辑！');
            }
        },
        open_company_rule(){
            let _self = this
            if(this.select_row != ""){
                // Bus.$emit('show_audit_page',_self.select_row)
                _self.$bus.emit('show_audit_page',_self.select_row)
            }else{
                this.$Message.warning('请选择一行进行查看！');
            }
        },
        save_current_row(e){
            this.select_row = e
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        },
        delete(e){
            // console.log(e.id)
            let _self = this
            let url = `api/order/cycle/finance/analysis/delete`
            let config = {
                id: e.id
            }
            this.$http.post(url, config).then(function(res){
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    _self.$Message.success(res.data.msg)
                    _self.getData()
                    _self.select_row = ""
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        getData(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/list`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    type: '2',
                    name: _self.searchName
                }
            }
            this.$http.get(url, config).then(function(res){
                // console.log(res.data.data.rows)
                // _self.$backToLogin(res)  
                _self.pageTotal = res.data.data.total
                _self.data = res.data.data.rows
            })
        }
    },
    created () {
        let _self = this
        this.getData()
        // Bus.$on('updateauditrule',(e)=>{
        //     _self.getData()
        // })
        _self.$bus.on('updateauditrule',(e)=>{
            _self.getData()
        })
    }
}
</script>

