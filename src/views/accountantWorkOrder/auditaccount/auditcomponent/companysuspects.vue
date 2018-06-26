<template>
    <div>
        <Table
            :columns="header" 
            :data="data"
            size="small"
            @on-row-dblclick="changetable"
            :loading="comLoading"       
        >

        </Table>
    </div>
</template>

<script>
export default {
    props:['company','loading'],    
    data(){
        return{
            comLoading:true,
            header:[
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title:' 企业疑点内容',
                    key:'name',
                },
                {
                    title:'数量',
                    key:'exceptionCount',
                    width:60
                },
                {
                    title:'占比',
                    key:'percentage',
                    width:80
                }
            ],
            data:[]
        }
    },
    watch:{
        'loading':'loading_change',
        'company':'init'
    },
    methods: {
        // 加载状态更新函数
        loading_change(){
            if(this.loading == false){
                this.comLoading = false
            }else{
                this.comLoading = true
            }
            // window.scrollTo(0,0)
        },
        changetable(e){
            // console.log(e)
            this.$emit('updatecompany',e)
        },
        init(){
            this.data = this.company
        }
    },
    created(){

    }
}
</script>
