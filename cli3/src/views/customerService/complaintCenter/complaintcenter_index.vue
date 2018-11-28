<template>
    <div >
        <Tabs value="name1" style="padding-bottom:200px;">
            <TabPane label="待处理" name="name1">
                <un-finsih :complaintType="complaintType_map" :processType="processType_map"></un-finsih>
            </TabPane>
            <TabPane label="已处理" name="name2">
                <finsih :complaintType="complaintType_map" :processType="processType_map"></finsih>
            </TabPane>
        </Tabs>
        <deal :complaintType="complaintType_map" :processType="processType"></deal>
        <show :complaintType="complaintType" :processType="processType"></show>
        <add-complaint :depart="smsDept" :type="complaintType"></add-complaint>
    </div>
</template>

<script>
import unFinsih from './index/unfinished'
import finsih from './index/finished'
import deal from './index/deal'
import show from './index/show'
import addComplaint from './index/add_complaint'
import {arrayToMap} from '../../../libs/utils.js'

export default {
    name:'complaintcenter_index',
    components:{
        unFinsih,
        finsih,
        deal,
        show,
        addComplaint
    },
    data(){
        return{
            //  数据相关
            smsDept:[],
            complaintType:[],
            processType:[],
            user:[],
            smsDept_map:new Map(),
            complaintType_map:new Map(),
            processType_map:new Map(),
            user_map:new Map()
        }
    },
    methods: {
        getData(){
            let _self = this
            let url2 = `api/customer/checkDepartMsg`
            // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
            // let config = {
            //     params:{
            //         groupCodes:'complaintType,processType'
            //     }
            // }
            // this.$http.get(url, config).then(function(res){
            //     _self.$backToLogin(res)                
            //     let temp = res.data.data
            //     // _self.smsDept = temp.smsDept.reverse()
            //     _self.complaintType = temp.complaintType
            //     _self.processType = temp.processType
            //     // _self.smsDept_map = arrayToMap(_self.smsDept)
            //     _self.complaintType_map = arrayToMap(_self.complaintType)
            //     _self.processType_map = arrayToMap(_self.processType)
            //     // console.log(_self.processType_map)
            // })

            let params = "complaintType,processType"

            function finish(res){
                let temp = res.data.data
                _self.complaintType = temp.complaintType
                _self.processType = temp.processType
                _self.complaintType_map = arrayToMap(_self.complaintType)
                _self.processType_map = arrayToMap(_self.processType)
            }

            this.$GetDataCenter(params, finish)

            this.$http.get(url2).then(function(res){
                // console.log(res.data.data)
                _self.smsDept = res.data.data
            })
            // this.getUser()
        },
        getUser(){
            let _self = this
            let url = `api/user/list`
            let config = {
                params:{
                    page:1,
                    pageSize:10000
                }
            }
            this.$http.get(url,config).then(function(res){
                let temp = res.data.data.rows
                _self.user = temp
                _self.user_map = arrayToMap(_self.user)
            })
        }
    },
    created () {
        this.getData()
    }
}
</script>
