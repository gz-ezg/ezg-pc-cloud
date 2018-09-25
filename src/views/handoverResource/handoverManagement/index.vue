<template>
    <div>
        <Tabs value="1">
            <TabPane label="未处理" name="1">
                <normal></normal>
            </TabPane>
            <TabPane label="已接收" name="2">
                <finish></finish>
            </TabPane>
            <TabPane label="已拒绝" name="3">
                <reject></reject>
            </TabPane>
            <TabPane label="全部" name="4">
                <all></all>
            </TabPane>
        </Tabs>
        <hand-over-detail></hand-over-detail>
        <create-request></create-request>
        <create-file></create-file>
        <comfirm-file></comfirm-file>
    </div>
</template>

<script>
import handOverDetail from './hand_overdetail'
import createRequest from './create_request'
import createFile from './create_file'
import comfirmFile from './comfirm_request'

import all from './tabs/all'
import finish from './tabs/finish'
import normal from './tabs/normal'
import reject from './tabs/reject'

export default {
    name: 'handovermanagement_index',
    components:{
        handOverDetail,
        createRequest,
        createFile,
        comfirmFile,
        all,
        finish,
        normal,
        reject
    },
    data(){
        return{
        }
    },
    methods:{
        get_data(){
            
        },
    },
    created(){

    }
}
</script>
