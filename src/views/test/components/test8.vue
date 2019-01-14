<template>
    <div>
        <Button type="primary" @click="init">测试</Button>
    </div>
</template>

<script>
import axios from 'axios'
// import Vue from 'vue';

function commonFail(err){
    console.log("fail")
    if(err.status == 200){
        alert(err.data.msg)
    }else{
        alert(err)
    }
}

function AjaxGet(url, config, success, fail=commonFail){
    let baseUrl = 'api/' + url
    return new Promise((resolve, reject)=>{
        axios.get(baseUrl, config).then((res)=>{
            // console.log(res)
            if(res.status == 200 && res.data.msgCode == 40000){
                resolve(success(res.data.data))
            }else{
                fail(res)
            }
        }).catch((err)=>{
            fail(err)
        })
    })
}

function getData(url, config, success, fail){

    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success))
    })
}

export default {
    data() {
        return{

        }
    },
    methods: {
        async get_data(){
            let url = 'customer/list'
            let config = {
                params: {
                    page: 1,
                    pageSize: 5
                }
            }

            function success(res){
                // console.log(res)
                return res
            }
            
            let {total, rows} = await getData(url, config, success)
            await console.log(total)
            console.log(rows)
            // return new Promise((resolve, reject)=>{
            //     resolve(AjaxGet(url, config, success))
            // })        
        },
        get_data2(){
            console.log("this is get_data2!")
            let url = 'customer/list'
            let config = {
                params: {
                    page: 1,
                    pageSize: 10
                }
            }

            function success(res){
                console.log(res)
            }

            AjaxGet(url, config, success)
        },
        async init(){
            await this.get_data()
            await this.get_data2()
        }
    },
    created(){
        // this.get_data().then(()=>{
        //     this.get_data2()
        // })
    }
}
</script>
