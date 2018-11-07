<template>
    <div>
        <Modal
            title="客户详情"
            v-model="openEdit"
            width="100"
            :styles="{height: '100%', top: '0px',minWidth: '900px'}"
            @on-cancel="close"
        >
            <!-- <div slot="close">
                <Icon type="close" @click="close" style="font-size:20px;padding-top:10px"></Icon>
            </div> -->
            <Spin v-if="loading" fix></Spin>
            <Row style="overflow: hidden; *zoom: 1;">
                <Card style="width:300px;float:left;" title="客户基本信息">
                    <edit-form
                        :customer="customer"
                        :cluesources="cluesources"
                        :customerrating="customerrating"
                        :area="area"
                        :sf_yn="sf_yn"
                        :importance="importance"
                        :customerTypes_Casr="customerTypes_Casr"
                        @cancel-loading="loading=false"
                    ></edit-form>
                </Card>
                <Card style="margin-left:310px;min-width:590px">
                    <Collapse v-model="openPanel" accordion>
                        <Panel name="company">
                            企业信息
                            <p slot="content">
                                <company 
                                    v-if="openPanel[0] == 'company'"
                                    :customer="customer"
                                    :importance="importance"
                                    :cluesources="cluesources"
                                ></company>
                            </p>
                        </Panel>
                        <Panel name="followUp">
                            客户跟进记录
                            <p slot="content">
                                <follow 
                                    v-if="openPanel[0] == 'followUp'"
                                    :customer="customer"
                                ></follow>
                            </p>
                        </Panel>
                        <Panel name="order">
                            订单详情
                            <p slot="content">
                                <order 
                                v-if="openPanel[0] == 'order'"
                                :customer="customer"
                                :cluesources="cluesources"
                                ></order>
                            </p>
                        </Panel>
                        <Panel name="relation">
                            客户关系人
                            <p slot="content">
                                <relation 
                                v-if="openPanel[0] == 'relation'"
                                :customer="customer"
                                ></relation>
                            </p>
                        </Panel>
                        <Panel name="dymaic">
                            服务动态
                            <p slot="content">
                                <dymaic 
                                v-if="openPanel[0] == 'dymaic'"
                                :customer="customer"    
                            ></dymaic>
                            </p>
                        </Panel>
                        <!-- <Panel name="upload">
                            附件
                            <p slot="content">
                                <upload 
                                    v-if="openPanel[0] == 'upload'" 
                                    :customer="customer"
                                ></upload>
                            </p>
                        </Panel> -->
                    </Collapse>
                </Card>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import editForm from './edit'

import company from './companyInfo/index'
import dymaic from './dymaic/index'
import follow from './followUpList/index'
import order from './orderDetail/index'
import relation from './relationPerson/index'
// import upload from './upload/index'

export default {
    components:{
        editForm,
        company,
        dymaic,
        follow,
        order,
        relation,
        // upload
    },
    props: {
        // cluesources: {
        //     type: Array
        // },
        // customerrating: {
        //     type: Array
        // },
        // area: {
        //     type: Array
        // },
        // sf_yn: {
        //     type: Array
        // },
        // importance: {
        //     type: Array
        // },
        // customerTypes_Casr: {
        //     type: Array
        // },
        customer:{
            type: [Array, Object, String]
        }
    },
    data(){
        return {
            loading: true,
            openPanel: [],
            openEdit: true,
            cluesources: [],
            customerrating: [],
            area: [],
            sf_yn: [],
            importance: [],
            customerTypes_Casr: []
        }
    },
    methods: {
        close(){
            this.$store.commit('close_gobal_customer_detail_modal');
        },
        open(){
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject)=>{
                let _self = this
                let params = "customerTypes,cluesources,customerrating,area,sf_yn,importance";

                function success(res){
                    _self.customerTypes = res.data.data.customerTypes
                    _self.cluesources = res.data.data.cluesources
                    _self.customerrating = res.data.data.customerrating
                    _self.area = res.data.data.area
                    _self.sf_yn = res.data.data.sf_yn
                    _self.importance = res.data.data.importance

                    _self.cluesources_map = _self.$array2map(_self.cluesources)
                    _self.customerrating_map = _self.$array2map(_self.customerrating)
                    _self.area_map = _self.$array2map(_self.area)
                    _self.sf_yn_map = _self.$array2map(_self.sf_yn)
                    _self.importance_map = _self.$array2map(_self.importance)
                    _self.customerTypes_Casr = _self.$changeCars(_self.customerTypes)
                    _self.customerTypes_array = _self.$Data2Casr(_self.customerTypes)
                    resolve()
                }
                this.$GetDataCenter(params, success)
            })
        },
    },
    created(){
        this.get_data_center()
    }
}
</script>

