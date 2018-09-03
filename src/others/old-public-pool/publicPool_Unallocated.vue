<template>
    <div>
        <unallocated-table @isEdit="isEditChange" @isAdd="isAddChange"></unallocated-table>
        <add-from v-if="modal5" :modal5="modal5" @hideAddPanel="hideAddPanel"></add-from>
        <Modal
                v-model="edi"
                width="100%"
                :styles="{height: '100%', top: '0px'}"
                title="编辑"
                @on-ok="ok"
                @on-cancel="cancel2">
            <Row>
                <Col span="5">
                <edit-from v-if="isEdit" :customerid='customerid'></edit-from>
                </Col>
                <Col span="19">
                <Card>
                    <Collapse @on-change="collapseChange" accordion>
                        <Panel name="Company">
                            企业信息
                            <P slot="content">
                                <edit-collapse-company
                                        v-if="isEdit"
                                        :customerid='customerid'
                                        :customertypeText="customertypeText"
                                        :tel="tel"
                                        :customersource="customersource"
                                ></edit-collapse-company>
                            </P>
                        </Panel>
                        <Panel name="CustomerContent">
                            客户跟进记录
                            <P slot="content">
                                <edit-collapse-follow-up v-if="isEdit"
                                                         :customerid='customerid'></edit-collapse-follow-up>
                            </P>
                        </Panel>
                        <Panel name="Order">
                            订单详情
                            <P slot="content">
                                <!--<Button type="ghost" shape="circle" icon="plus" @click="modal1Open">新增</Button>
                                <Button type="ghost" shape="circle" icon="edit">修改</Button>
                                <Button type="ghost" shape="circle" icon="trash-b">作废</Button>-->
                                <edit-collapse-order-list v-if="isEdit"
                                                          :customerid='customerid'></edit-collapse-order-list>
                            </P>
                        </Panel>
                        <Panel name="CustomerRelation">
                            客户关系人
                            <P slot="content">
                                <edit-collapse-relation-person v-if="isEdit"
                                                               :customerid='customerid'></edit-collapse-relation-person>
                            </P>
                        </Panel>
                        <Panel name="CustomerWorkOrder">
                            服务动态
                            <P slot="content">
                                <edit-collapse-service-dynamic v-if="isEdit"
                                                               :customerid='customerid'></edit-collapse-service-dynamic>
                            </P>
                        </Panel>
                        <Panel name="FilesUpload">
                            附件
                            <P slot="content">
                                <Button type="primary" shape="circle" icon="plus" @click="modal3 = true">上传附件</Button>
                                <edit-collapse-upload ref="c1" v-if="isEdit" :customerid='customerid'
                                                      :modal3="modal3"></edit-collapse-upload>
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
    import UnallocatedTable from './publicPool_Unallocated_table.vue'
    import addFrom from './publicPool_Unallocated_add.vue'

    export default {
        components: {
            UnallocatedTable,
            addFrom,
        },
        data() {
            return {
                modal5: false,
                isEdit: false,
                edi: false,
            }
        },
        methods: {
            isAddChange() {
                var _self = this
                _self.modal5 = true
            },

            hideAddPanel() {
                var _self = this
                _self.modal5 = false;
            },

            /*************************打开【编辑】弹窗********************************/
            isEditChange(data) {
                var _self = this
                _self.customerid = data.customerid
                _self.edi = true
                _self.isEdit = true
            },

        },
        mounted() {}
    }
</script>
