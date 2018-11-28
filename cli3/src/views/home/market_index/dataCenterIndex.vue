<template>
    <div>
        <Row>
            <Col span="6">
                <Card title="选择人员">
		  	        <RadioGroup v-model="selecrUser" @on-change="change">
                        <Row>
                            <Col span="12" v-for="item in allUser" :key="item.id" style="padding-bottom:10px">
                                <Radio :label="item.id">{{item.realname}}</Radio>
                            </Col>
                        </Row>
                    </RadioGroup>
                </Card>
            </Col>
            <Col span="18">
                <market-index></market-index>
            </Col>
        </Row>
    </div>
</template>

<script>
import marketIndex from './marketIndex'

export default {
    components:{
        marketIndex
    },
    data(){
        return{
            allUser:[],
            selecrUser:""
        }
    },
    methods:{
        get_all_market(){
            let _self = this
            let url = `api/user/getAllUserListByDepartId`
            let config = {
                params:{
                    departId:11532
                }
            }

            function success(res){
                // console.log(res.data.data)
                _self.allUser = res.data.data
            }

            this.$Get(url, config, success)
        },
        change(e){
            console.log(e)
            this.$bus.emit("UPDATE_MARKET_INDEX",e)
        }
    },
    created(){
        this.get_all_market()
    }
}
</script>

