<template>
    <div>
        <Modal
            title="客户详情"
            v-model="openEdit"
            width="100"
            :styles="{height: '100%', top: '0px',minWidth: '900px'}"
            @on-cancel="close"
        >
            <div slot="close">
                <Icon type="close" @click="close" style="font-size:20px;padding-top:10px"></Icon>
            </div>
            <Spin v-if="loading" fix></Spin>
            <Row style="overflow: hidden; *zoom: 1;">
                <Card style="width:300px;float:left;" title="信息编辑1">
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
                            <div slot="content">
                                <follow 
                                    v-if="openPanel[0] == 'followUp'"
                                    :customer="customer"
                                ></follow>
                            </div>
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
                        <Panel name="changeLog">
                            客户变更日志
                            <p slot="content">
                                <changeLog
                                        v-if="openPanel[0] == 'changeLog'"
                                        :customer="customer"
                                ></changeLog>
                            </p>
                        </Panel>
                        <Panel name="upload">
                            附件
                            <p slot="content">
                                <upload 
                                    v-if="openPanel[0] == 'upload'" 
                                    :customer="customer"
                                ></upload>
                            </p>
                        </Panel>
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
import changeLog from './customerChangeLog/index'
import upload from './upload/index'

export default {
    components:{
        editForm,
        company,
        dymaic,
        follow,
        order,
        relation,
        upload,
        changeLog
    },
    props: {
        cluesources: {
            type: Array
        },
        customerrating: {
            type: Array
        },
        area: {
            type: Array
        },
        sf_yn: {
            type: Array
        },
        importance: {
            type: Array
        },
        customerTypes_Casr: {
            type: Array
        },
        customer:{
            type: [Array, Object, String]
        }
    },
    data(){
        return {
            loading: true,
            openPanel: [],
            openEdit: true
        }
    },
    methods: {
        close(){
            this.$emit("close-edit", true)
        },
        open(){
            console.log("112")
        }
    },
    created(){
        this.$bus.off("CLOSE_EDIT_PAGE", true)
        this.$bus.on("CLOSE_EDIT_PAGE", (e)=>{
            this.close()
    })
    }
}
</script>

