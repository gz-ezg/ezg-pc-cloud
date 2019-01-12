<template>
    <div>
        <Button type="primary" @click="init">测试</Button>
    </div>
</template>

<script>
import axios from 'axios'
import * as api from './api'
// import Vue from 'vue';

export default {
    data() {
        return{
            page: 1,
            pageSize: 10,
            SearchBody: {

            }
        }
    },
    methods: {
        async getCustomerList(){
        // async getCustomerList(page, pageSize, SearchBody){
            let config = {
                params: {
                    page: 1,
                    pageSize: 5
                }
            }

            function success(res){
                return res
            }
            
            let {total, rows} = await api.getCustomerList(config, success)
            await console.log(total)
            console.log(rows)
  
        },
        async getCustomerList2(){
            console.log("this is get_data2!")
            let config = {
                params: {
                    page: 1,
                    pageSize: 10
                }
            }

            function success(res){
                return res
            }

            let {total, rows} = await api.getCustomerList(config, success)
            await console.log(total)
            console.log(rows)
        },
        async init(){
            await this.getCustomerList()
            await this.getCustomerList2()
        }
    },
    created(){
        // this.get_data().then(()=>{
        //     this.get_data2()
        // })
    }
}
</script>
