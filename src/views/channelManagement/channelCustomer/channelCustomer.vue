<template>
    <div>
        <channel-table @isExamine="isExamineChange"></channel-table>
        <Modal
                v-model="modal"
                width="100%"
                :styles="{height: '100%', top: '0px'}"
                title="查看"
                @on-ok="ok"
                @on-cancel="cancel">
            <Row>
                <Col span="6">
                <channel-from v-if="isExamine" :customerid='customerid'></channel-from>
                </Col>
                <Col span="18">
                <Card>
                    <Collapse accordion>
                        <Panel name="Company">
                            企业信息
                            <P slot="content">
                                <channel-company
                                        v-if="isExamine"
                                        :customerid='customerid'></channel-company>
                            </P>
                        </Panel>
                        <Panel name="CustomerContent">
                            客户跟进记录
                            <P slot="content">
                                <channel-fllow-up v-if="isExamine"
                                                  :customerid='customerid'></channel-fllow-up>
                                <!-- 以下组件未注册 -->
                                <!-- <edit-collapse-follow-up v-if="isEdit"
                                                         :customerid='customerid'></edit-collapse-follow-up> -->
                            </P>
                        </Panel>
                        <Panel name="Order">
                            订单详情
                            <P slot="content">
                                <channel-order-list v-if="isExamine"
                                                     :customerid='customerid'></channel-order-list>
                            </P>
                        </Panel>
                        <Panel name="CustomerRelation">
                            客户关系人
                            <P slot="content">
                                <channel-relation-person v-if="isExamine"
                                                         :customerid='customerid'></channel-relation-person>
                            </P>
                        </Panel>
                        <Panel name="CustomerWorkOrder">
                            服务动态
                            <P slot="content">
                                <channel-service-dynamic v-if="isExamine"
                                                         :customerid='customerid'></channel-service-dynamic>
                            </P>
                        </Panel>
                    </Collapse>
                </Card>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
    import channelTable from './channelCustomer_table.vue'
    import channelFrom from './channelManagement_examine_from.vue'
    import channelCompany from './channelManagement_examine_company.vue'
    import channelOrderList from './channelManagement_examine_orderList.vue'
    import channelFllowUp from './channelManagement_examine_followUp.vue'
    import channelRelationPerson from './channelManagement_examine_relationPerson.vue'
    import channelServiceDynamic from './channelManagement_examine_serviceDynamic.vue'

    export default {
        name:'channelCustomer_index',
        components: {
            channelTable,
            channelFrom,
            channelCompany,
            channelOrderList,
            channelFllowUp,
            channelRelationPerson,
            channelServiceDynamic,
        },
        data() {
            return {
                modal: false,
                customerid: '',
                isExamine: false,
            }
        },
        methods: {
            isExamineChange(e) {
                var _self = this
                _self.customerid = e
                _self.isExamine = true
                _self.modal = true
            },
            cancel() {
                var _self = this
                _self.customerid = ''
                _self.isExamine = false
            },
            ok(){
                
            },
            isEdit(){

            }
        }
    }
</script>