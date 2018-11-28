<template>
    <div>
        <Table
            :columns="header" 
            :data="data"
            size="small"
            @on-row-dblclick="changetable"
            :loading="accLoading"     
        >

        </Table>
    </div>
</template>

<script>
export default {
    props:['account','loading'],
    data(){
        return{
            accLoading:true,
            // total:new Number(),
            header:[
                {
                    title: '序号',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title:'企业疑点',
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
    // computer:{
    //     accLoading(){
    //         return this.loading
    //     }
    // },
    watch:{
        'loading':'loading_change',
        'account':'init'
    },
    methods: {
        // 加载状态更新函数        
        loading_change(){
            if(this.loading == false){
                this.accLoading = false
            }else{
                this.accLoading = true
            }
        },
        changetable(e){
            // console.log(e)
            this.$emit('updateaccount',e)
        },
        init(){
            this.data = this.account
        }
    },
    created(){
        // this.show_data = []
        // this.show_data = this.account
    }
}
</script>
