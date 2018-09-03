<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="isAddChange">录入</Button>
                    <Button type="primary" icon="edit" @click="isEditChange">编辑</Button>
                    <Button type="primary" icon="trash-b" @click="deleteCustomer">删除</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
                        @on-current-change="selectRow"></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除客户</span>
            </p>
            <div style="text-align:center">
                <p>客户信息删除无法恢复</p>
                <p>确定删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="deleteCustomer2">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                ishandleSubmit: false,
                issearch: false,
                modal1: false,
                modal2: false,
                modal_loading: false,
                AutoCompletedata: [],
                customertypeValue: [],
                customersourceValue: [],
                areaValue: [],
                isboundValue: [],
                formValidate: {
                    name: '',
                    tel: '',
                    createby: '',
                    followby: '',
                    customertype: '',
                    customersource: '',
                    isbound: '',
                    area: '',
                },
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        width: 80
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '客户状态',
                        key: 'customertypeText',
                        width: 100
                    },
                    {
                        title: '客户来源',
                        key: 'customersourceText',
                        width: 100
                    },
                    {
                        title: '客户等级',
                        key: 'importLevelText',
                        width: 100
                    },
                    {
                        title: '区域',
                        key: 'areaText',
                        width: 80
                    },
                    {
                        title: '渠道名称',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'followby',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        width: 120
                    },
                    {
                        title: '微信绑定',
                        key: 'isbound',
                        width: 100
                    },
                    {
                        title: '跟进剩余期限',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '商事',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '会计',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '企划',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '审计',
                        key: 'createby',
                        width: 120
                    },
                ],
                data: [],
                pageTotal: '',
                pageSize: 10,
                customerid: '',
                customertypeText: '',
                tel: '',
                customersource: ''
            }
        },
        methods: {

            // 表格数据请求 
            getTableData() {
                var _self = this
                var url = '/system/queryAllSQLTemplete/1/10'
                _self.data = []

                this.GetData(url)
            },

            // 表格行选中事件
            selectRow(a) {
                var _self = this
            },

            // 改变页码
            pageChange(a) {
                var _self = this
                var url
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                var _self = this
                _self.pageSize = a
                _self.data = []
            },
            isAddChange() {
                var _self = this
                this.$emit('isAdd', '')
            },
        },
        mounted() {
            this.getTableData()
        }
    }
</script>