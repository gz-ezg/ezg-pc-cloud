<template>
    <div>
        <Button type="primary" @click="init">测试</Button>
    </div>
</template>

<script>
import axios from 'axios'

function fail(err){
    console.log(err)
}

function AjaxGet(url, config, success, fail=fail){
    let baseUrl = 'api/' + url
    return new Promise((resolve, reject)=>{
        axios.get(baseUrl, config).then((res)=>{
            if(res.data.msgCode == 40000){
                resolve(success(res.data))
            }
        })
    })
}


export default {
    data() {
        return{

        }
    },
    methods: {
        get_data(){
            let url = 'customer/list'
            let config = {
                params: {
                    page: 1,
                    pageSize: 5
                }
            }

            function success(res){
                console.log(res)
            }

            function result(resolve, reject){
                resolve(AjaxGet(url, config, success))
            }
            return new Promise(result)
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
