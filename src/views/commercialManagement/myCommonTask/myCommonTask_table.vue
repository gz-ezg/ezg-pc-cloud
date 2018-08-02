<template>
    <div>
        <Tabs v-model="openTab">
            <TabPane label="未开始" name="name1">
                <notbegin :companyarea="companyarea"></notbegin>
            </TabPane>
            <TabPane label="服务中" name="name2">
                <serving :companyarea="companyarea"></serving>
            </TabPane> 
            <TabPane label="已完结" name="name3">
                <finished :companyarea="companyarea"></finished>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all :companyarea="companyarea"></all>
            </TabPane>
        </Tabs>
        <detail></detail>
        <company-detail></company-detail>
        <flow></flow>
    </div>
</template>

<script>
import Detail from './myCommonTaskIndex/detail'
// import CompanyDetail from './myCommonTaskIndex/companydetail'
import CompanyDetail from '../../woa-components/companyDetail/CompanyDetail'
import Flow from './myCommonTaskIndex/flow'

import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'

    export default {
        name:'commercialTaskManagement',
        components:{
            Serving,
            All,
            Finished,
            Notbegin,
            Detail,
            CompanyDetail,
            Flow
        },
        data(){
            return{
                openTab:"name1",
                // hash:new Map(),
                companyarea:[]
            }
        },
        methods:{
            getDataCenter(){
                let _self = this
                // let url2 = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=companyarea`
            
                // _self.$http.get(url2).then(function(res){
                //     // console.log(res.data.data.companyarea.length)
                //     // let len = res.data.data.companyarea.length
                //     _self.companyarea = res.data.data.companyarea
                    
                // })

                let params = "companyarea"

                function finish(res){
                    _self.companyarea = res.data.data.companyarea
                }

                this.$GetDataCenter(params, finish)
            }
        },
        created(){
            this.getDataCenter()
            let _self = this
            //  商事主管
            let temp = localStorage.getItem("id")
            if(temp == "10228"){
                _self.openTab = "name4"
            }
        }

    }
</script>