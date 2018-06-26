<template>
    <div>
        <ButtonGroup style="margin-bottom:20px">
            <!-- <Button type="primary">导出excel</Button> -->
            <Button type="primary" icon="plus">更新数据</Button>
            <Button type="primary" icon="ios-information">生成审账列表</Button>
            <Button type="primary" icon="ios-information">生成汇报列表</Button>            
        </ButtonGroup>
        <Table
            highlight-row
            size="small"
            :columns="header"
            :data="data"></Table>
        <Page
            size="small"
            :total="pageTotal"
            show-total
            show-sizer
            show-elevator
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
            style="margin-top: 10px"></Page>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data:[],
            header:[
                {
                    title:'序号',
                    key:'index',
                    width:60,
                    align:'center'
                },{
                    title:'公司名称',
                    key:'',
                    width:150
                },{
                    title:'服务内容',
                    key:'',
                    width:150
                },{
                    title:'企业异常数量',
                    key:'',
                    width:120
                },{
                    title:'企业警戒值',
                    key:'',
                    width:120
                },{
                    title:'财务异常数量',
                    key:'',
                    width:120
                },{
                    title:'财务警戒值',
                    key:'',
                    width:120
                },{
                    title:'服务人员',
                    key:'',
                    width:120                    
                },{
                    title:'市场人员',
                    key:'',
                    width:120    
                },{
                    title:'分析时间',
                    key:'',
                    width:120    
                },{
                    title:'是否处理',
                    key:'',
                    width:120    
                }
            ],
            pageTotal:new Number()
        }
    },
    methods:{
        pageChange(){},
        pageSizeChange(){}
    }
}
</script>

