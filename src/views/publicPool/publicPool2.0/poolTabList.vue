<template>
    <div>
        <Tabs v-model="openTab">
            <TabPane label="个人私域池" name="name1">
                <private-pool :companyarea="companyarea"></private-pool>
            </TabPane>
            <TabPane label="市场部公海池" name="name2">
                <market-pool :companyarea="companyarea"></market-pool>
            </TabPane> 
            <TabPane label="精准公海池" name="name3">
                <match-pool :companyarea="companyarea"></match-pool>
            </TabPane>
            <TabPane label="开放公海池" name="name4">
                <open-pool :companyarea="companyarea"></open-pool>
            </TabPane>
            <TabPane label="全部" name="name5">
                <all :companyarea="companyarea"></all>
            </TabPane>
        </Tabs>
        
    </div>
</template>

<script>

import PrivatePool from './publicPoolIndex/privatePool'
import OpenPool from './publicPoolIndex/openPool'
import MarketPool from './publicPoolIndex/marketPool'
import MatchPool from './publicPoolIndex/matchPool'
import All from './publicPoolIndex/all'
    export default {
        name:'poolTabListManagement',
        components:{
            PrivatePool,
            OpenPool,
            MarketPool,
            MatchPool,            
            All
        },
        data(){
            return{
                openTab:"name1",
                companyarea:[]
            }
        },
        methods:{
            
        },
        created(){
            let _self = this
            //  商事主管
            let temp = localStorage.getItem("id")
            if(temp == "10228"){
                _self.openTab = "name4"
            }
        },
		computed:{
			
		}

    }
</script>