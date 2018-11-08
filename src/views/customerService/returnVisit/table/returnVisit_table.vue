<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未处理" name="name1">
                <Untreated :hfwtlxMap="hfwtlx_map" :departAliasMap="departAlias_map" :hfztMap="hfzt_map" :departAlias="departAlias"></Untreated>
            </TabPane>
            <TabPane label="已处理" name="name2">
                <processed :hfwtlxMap="hfwtlx_map" :departAliasMap="departAlias_map" :departAlias="departAlias" :hfztMap="hfzt_map"></processed>
            </TabPane>
        </Tabs>
        <!-- <customer-detail></customer-detail> -->
        <!-- <company-detail></company-detail> -->
        <!-- <companyDetail></companyDetail> -->
        <edit :hfwtlx="hfwtlx" :hfzt="hfzt" :hfwtlxMap="hfwtlx_map" :departAliasMap="departAlias_map" :departAlias="departAlias" :hfztMap="hfzt_map"></edit>
        <show :hfwtlx="hfwtlx" :hfzt="hfzt"></show>        
    </div>
</template>

<script>
    import Untreated from './untreated.vue'
    import Processed from './processed.vue'
    // import companyDetail from '../../../accountantWorkOrder/BookkeepingAgency/BookkeepingAgencyIndex/CompanyDetail'
    import edit from './edit.vue'
    import show from './show.vue'
    import {arrayToMap} from '../../../../libs/utils'
    // import customerDetail from '../../../woa-components/customerDetail/channelCustomer'
    // import companyDetail from '../../../woa-components/companyDetail/CompanyDetail'

    export default {
        name:'returnVisit_index',
        components:{
            Untreated,
            Processed,
            // customerDetail,
            // companyDetail,
            // companyDetail,
            edit,
            show
        },
        data(){
            return{
                hfwtlx:[],
                hfzt:[],
                departAlias:[],
                hfwtlx_map:new Map(),
                hfzt_map:new Map(),
                departAlias_map:new Map()
            }
        },
        methods:{
            getDataCenter(){
                let _self = this
                // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
                // let config = {
                //     params:{
                //         groupCodes:"hfwtlx,hfzt,departAlias"
                //     }
                // }
                // this.$http.get(url, config).then(function(res){
                //     // console.log(res.data.data)
                //     _self.hfwtlx = res.data.data.hfwtlx
                //     _self.hfzt = res.data.data.hfzt
                //     _self.departAlias = res.data.data.departAlias
                //     _self.hfwtlx_map = arrayToMap(_self.hfwtlx)
                //     _self.hfzt_map = arrayToMap(_self.hfzt)
                //     _self.departAlias_map = arrayToMap(_self.departAlias)           
                // })

                let params = "hfwtlx,hfzt,departAlias"

                function finish(res){
                    _self.hfwtlx = res.data.data.hfwtlx
                    _self.hfzt = res.data.data.hfzt
                    _self.departAlias = res.data.data.departAlias
                    _self.hfwtlx_map = arrayToMap(_self.hfwtlx)
                    _self.hfzt_map = arrayToMap(_self.hfzt)
                    _self.departAlias_map = arrayToMap(_self.departAlias)    
                }

                this.$GetDataCenter(params, finish)
            }
        },
        created(){
            this.getDataCenter()
        }
    }
</script>

