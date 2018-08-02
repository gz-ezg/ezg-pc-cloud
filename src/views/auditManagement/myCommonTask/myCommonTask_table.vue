<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未开始" name="name1">
                <notbegin :managestatus="managestatus"></notbegin>
            </TabPane>
            <!-- <TabPane label="服务中" name="name2">
                <serving></serving>
            </TabPane>  -->
            <!-- <TabPane label="已完结" name="name3">
                <finished></finished>
            </TabPane> -->
            <TabPane label="全部" name="name4">
                <all :managestatus="managestatus"></all>
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
        name:'audittaskmanagement_index',
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
                managestatus:[],
                hash:new Map(),
            }
        },
        methods:{
            getGlobalDataCenter(){
                let _self = this
                let temp = JSON.parse(localStorage.getItem("global_datacenter"))
                _self.managestatus = temp
            }
        },
        created(){
            this.getGlobalDataCenter()
        }

    }
</script>