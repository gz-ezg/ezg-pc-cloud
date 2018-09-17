<template>
    <Modal
            title="一键分配工单"
            width="300"
            v-model="common_allot_open"
        >
            <Form :label-width="90">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="departName" label="服务部门：">
                            <Input type="text" v-model="departName" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="服务人员：">
                            <Select transfer v-model="servicerID" filterable>
                                <Option v-for="(item,index) in allDepartUser" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="common_allot_open=false">关闭</Button>
                <Button type="primary" @click="allot" :loading="loading">分配</Button>                
            </div>
        </Modal>
</template>

<script>
export default {
    data(){
        return{
            common_allot_open:false,
            workorderIds:"",
            departName:"",
            ServiceDeptID:"",
            allDepartUser:"",
            loading:false,
            servicerID:""
        }
    },
    methods:{
        getAllUserList(){
            let url = 'api/user/getUserListByDepartId?departId='+ this.ServiceDeptID
            // 11572
            let _self = this
            this.$http.get(url).then(function(res){
                _self.allDepartUser = res.data.data
            })
        },
        allot(){
            let _self = this
            _self.loading = true
            let url = 'api/order/batchUpdateServicer'
            let config = {
                workOrderIds:_self.workorderIds,
                userId: _self.servicerID
            }

            function success(res){
                _self.workorderIds = ""
                _self.departName = ""
                _self.ServiceDeptID = ""
                _self.servicerID = ""
                _self.common_allot_open = false
                _self.$bus.emit('update_allot_index',true)
                _self.loading = false
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        this.$bus.on('global_allot_commonorder',(e)=>{
            _self.ServiceDeptID = e[0]
            _self.departName = e[1]
            _self.workorderIds = e[2]
            _self.getAllUserList()
            _self.common_allot_open = true
        })
    }

    
}
</script>
