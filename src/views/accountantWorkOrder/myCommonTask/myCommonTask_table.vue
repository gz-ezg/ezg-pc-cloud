<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未开始" name="name1">
                <notbegin :manageStatus="manageStatus_hash"></notbegin>
            </TabPane>
            <TabPane label="服务中" name="name2">
                <serving :manageStatus="manageStatus_hash"></serving>
            </TabPane> 
            <TabPane label="已完结" name="name3">
                <finished :manageStatus="manageStatus_hash"></finished>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all :manageStatus="manageStatus_hash"></all>
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
                manageStatus:"",
                manageStatus_hash:""
            }
        },
        // methods:{
        //     getDataCenter(){
        //         let _self = this
        //         let url2 = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDir`
            
        //         _self.$http.get(url2).then(function(res){
        //             console.log(res.data.data.payDir.length)
        //             let len = res.data.data.payDir.length
        //             let temp = res.data.data.payDir
        //             let payDir_Map = new Map()
        //             for(let i = 0; i<len;i++){
        //                 _self.hash.set(temp[i].typecode,temp[i].typename)
        //             }
        //             // console.log(payDir_Map)
        //             // console.log(payDir_Map.get('zht'))
        //             // _self.hash = payDir_Map
        //             console.log(_self.hash)
        //         })
        //     }
        // },
        // created(){
        //     this.getDataCenter()
        // }
        methods:{
            getDataCenter(){
                let _self = this
                let config = "manageStatus"

                function success(res){
                    _self.manageStatus = res.data.data.manageStatus
                    _self.manageStatus_hash = _self.$array2map(_self.manageStatus)
                } 

                _self.$GetDataCenter(config,success)
            }
        },
        created(){
            let _self = this
            _self.getDataCenter()
        }

    }
</script>