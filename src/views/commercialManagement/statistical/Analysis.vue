<!-- 分析 -->
<template>
    <div>
        <Table
            :columns="header" 
            :data="data1"
        >
        </Table>
    </div>
</template>

<script>
export default {
    props:['time'],
    data(){
        return{
            header:[
                {
                    title:'人员',
                    key:''
                },
                {
                    title:'产品',
                    key:''
                },
                {
                    title:'子产品',
                    key:''
                },
                {
                    title:'命中节点',
                    key:''
                },
                {
                    title:'额外节点',
                    key:''
                },
                {
                    title:'无效外勤',
                    key:''
                },
                {
                    title:'总外勤',
                    key:''
                }


            ]
        }
    }
}
</script>
