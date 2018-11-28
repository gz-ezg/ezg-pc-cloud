<style lang="less">
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
<template>
        <Modal 
            v-model="openClueModal"
            width="1000"
            title="线索"
        >
            <Tabs value="name1"> 
                <TabPane label="未领取" name="name1">
                    <Card>
                        <Row style="margin-bottom:10px">
                        </Row>
                        <Row style="margin-top: 10px;">
                            <Table
                                    highlight-row
                                    size="small"
                                    :columns="tableColumnsN"
                                    :data="tableDataN"
                            ></Table>
                            <Page
                                    size="small"
                                    :total="pageTotalN"
                                    show-total
                                    show-elevator
                                    :current.sync = "pageN"
                                    @on-change="pageChangeN"
                                    style="margin-top: 10px"></Page>
                        </Row>
                    </Card>
                </TabPane>
                <TabPane label="已领取" name="name2">
                    <Card>
                        <Row style="margin-bottom:10px">
                        </Row>
                        <Row style="margin-top: 10px;">
                            <Table
                                    highlight-row
                                    size="small"
                                    :columns="tableColumnsY"
                                    :data="tableDataY"
                            ></Table>
                            <Page
                                    size="small"
                                    :total="pageTotalY"
                                    :current.sync = "pageY"
                                    show-total
                                    show-elevator
                                    @on-change="pageChangeY"
                                    style="margin-top: 10px"></Page>
                        </Row>
                    </Card>
                </TabPane>
            </Tabs>
            <div slot="footer"></div>
        </Modal>
</template>

<script>
import { DateFormat } from '../../../../libs//utils'

    export default {
        name:'cluesLibrary_index',
        data() {
            return {
                openClueModal: false,
                tableColumnsN: [
                    {
                        title: '客户名称',
                        key: 'customer_name',
                        minWidth: 130,
                    },
                    {
                        title: '客户电话',
                        key: 'customer_tel',
                        minWidth: 130,
                    },
                    {
                        title: '线索详情',
                        key: 'clue_memo',
                        minWidth: 300,
                        render:(h, params) =>{
                            return h("div",{
                                domProps:{
                                    innerHTML: params.row.clue_memo
                                }
                            })
                        }
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        minWidth: 160,
                    },
                    // {
                    //     title: '线索级别',
                    //     key: 'clue_level',
                    //     minWidth: 120
                    // },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'action',
                        fixed: 'right',
                        minWidth: 90,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        permission: "['cluesLibraryM.y.cheek']"
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.lingq(params)
                                        }
                                    }
                                }, '领取')
                            ]);
                        }
                    }
                ],
                tableColumnsY: [
                    {
                        title: '客户名称',
                        key: 'customer_name',
                        minWidth: 130,
                    },
                    {
                        title: '客户电话',
                        key: 'customer_tel',
                        minWidth: 130,
                    },
                    {
                        title: '线索详情',
                        key: 'clue_memo',
                        minWidth: 300,
                        render:(h, params) =>{
                            return h("div",{
                                domProps:{
                                    innerHTML: params.row.clue_memo
                                }
                            })
                        }
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        minWidth: 160,
                    },
                    
                    {
                        title: '领取人',
                        key: 'rrealname',
                        minWidth: 100,
                    },
                ],
                tableDataN: [],
                pageTotalN: 0,
                tableDataY: [],
                pageTotalY: 0,
                pageN: 1,
                pageY: 1,
                cluetype: [],
                clue_level: [],
                clue_level_map:new Map(),
                cluetype_map: new Map(),
                customerId: "",
            }
        },
        methods: {
            get_data_center() {
                let params = "cluetype,clue_level"

                function finish(res){
                    var temp = res.data.data;
                    _self.cluetype = temp.cluetype
                    _self.clue_level = temp.clue_level
                    _self.clue_level_map = _self.$array2map(_self.clue_level)
                    _self.cluetype_map = _self.$array2map(_self.cluetype)
                }

                this.$GetDataCenter(params, finish)
            },
            // 表格数据请求 - N
            getTableDataN() {
                let _self = this
                let url = 'api/clue/list'
                var keys =[]
                    var config = {
                        params:{
                            receipt:'N',
                            sortField:'clue_level',
                            order:'asc',
                            page: _self.pageN,
                            pageSize: 10,
                            customerId: _self.customerId
                        }
                    }

                function success(res) {
                    _self.pageTotalN = res.data.data.total
                    _self.tableDataN = res.data.data.rows

                    for(let i = 0;i<_self.tableDataN.length; i++){
                        _self.tableDataN[i].clue_level = _self.clue_level_map.get(_self.tableDataN[i].clue_level)
                    }
                }

                this.$Get(url, config, success)
            },

            getTableDataY(){
                let _self = this
                let url = 'api/clue/list'
                var keys =[]
                    var config = {
                        params:{
                            receipt:'Y',
                            sortField:'clue_level',
                            order:'asc',
                            page: _self.pageY,
                            pageSize: 10,
                            customerId: _self.customerId
                        }
                    }

                function success(res) {
                    _self.pageTotalY = res.data.data.total
                    _self.tableDataY = res.data.data.rows

                    for(let i = 0;i<_self.tableDataY.length; i++){
                        _self.tableDataY[i].clue_level = _self.clue_level_map.get(_self.tableDataY[i].clue_level)
                    }
                }

                this.$Get(url, config, success)
            },

            // 改变页码
            pageChangeN(e) {
                let _self = this
                _self.pageN = e
                _self.getTableDataN()
            },

            pageChangeY(e) {
                let _self = this
                _self.pageY = e
                _self.getTableDataY()
            },
            lingq(a) {
                let _self = this
                let url = 'api/clue/receiptClue'
                let config = {
                    id: a.row.id
                }

                function success(res){
                    _self.getTableDataN()
                    _self.getTableDataY()
                }

                function fail(err){

                }

                this.$Post(url, config, success, fail)
            }
        },
        created(){
            let _self = this
            _self.$bus.off('SHOW_OPEN_CUSTOMER_CLUE_LOG',true)
            _self.$bus.on('SHOW_OPEN_CUSTOMER_CLUE_LOG',(e)=>{
                _self.customerId = e.ID
                _self.getTableDataN()
                _self.getTableDataY()
                _self.openClueModal = true
            })
        }
    }
</script>