<template>

        <Modal
                v-model="openDeclareResult"
                title="企业流水状态"
                width="600"
                footer-hide

        >
           <Form v-if="!this.datas.length" ref="formItem"   :label-width="100" style="width:500px;margin:auto">
                <Row :gutter="12">
                    <FormItem prop="finish_status" label="企业收款期数">
                        <Row :gutter="12">
                            <Col span="18">
                                <Input type="text" @on-change="changeDatas"></Input>
                            </Col>
                            <Col span="4">
                                <Button type="primary" :loading="loading" @click="handleDeclareResult">保存</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Table
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="otherHeader"
                    :data="otherdatas"
                    ></Table>
                </Row>
            </Form>

           <Form v-if="this.datas.length" ref="formItem"   :label-width="100" style="width:500px;margin:auto">
                <Row>
                    <Table
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="datas"
                    @on-current-change="save_current_row"
                    @on-row-dblclick="show_detail"
                    @on-sort-change="sort"
                    ></Table>
                </Row>
            </Form>
        </Modal>

</template>
<script>
    export default {
        data(){

            return{
                loading: false,
                //  新增数据
                openDeclareResult:false,
                otherdatas: [],
                datas:[{
                    tem: '1',
                    date: '2',
                    money: 0
                }],
                header: [{
                    title: "期限",
                    key: "receipt_period",
                    minWidth: 100,
                    },
                    {
                    title: "时间",
                    key: "updatedate",
                    minWidth: 200,
                    },
                    {
                    title: "金额",
                    key: "amount",
                    minWidth: 100,
                    render:(h, params) => {
                        if(params.row.amount==0) {
                            return h('input',{
                                style: {
                                    width: '100px'
                                },
                                on: {
                                    change: (e) => {
                                        console.log(e)
                                    }
                                }
                            },h('strong', params.row.tem))
                        }
                        console.log('params',params)
                        return h('div', params.row.amount,);
                      }
                    },
                ],
                otherHeader: [{
                    title: "期限",
                    key: "receipt_period",
                    minWidth: 100,
                    },
                    {
                    title: "时间",
                    key: "updatedate",
                    minWidth: 200,
                    render:(h, params) => {
                        return h('input',{
                            style: {
                                width:'100px'
                            },
                        })
                    }
                    },
                    {
                    title: "金额",
                    key: "amount",
                    minWidth: 100,
                    render:(h, params) => {
                        if(params.row.amount==0) {
                            return h('input',{
                                style: {
                                    fontColor: 'blue',
                                    width: '100px'
                                },
                                on: {
                                    change: (e) => {
                                        console.log(e)
                                    }
                                }
                            },h('strong', params.row.tem))
                        }
                        console.log('params',params)
                        return h('div', params.row.amount,);
                      }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 80,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '保存')
                            ]);
                        }
                    }
                ]
            }
        },
        methods:{
            handleDeclareResult() {
                let url = 'api/order/work/order/plan/declare/result'
                let data = {}
                if(this.formItem.finish_status == 'Y') {
                    data = {
                        workOrderId: this.currentRow.work_order_id,
                        finish_status:'Y',
                        predictReceipt:this.formItem.predictReceipt
                    }
                } else {
                    data = {
                        workOrderId: this.currentRow.work_order_id,
                        finish_status: 'N',
                        memo: this.formItem.memo
                    }
                }
              

                function doSuccess(res) {
                    console.log(res);
                    this.formItem= Object.assign({},this.formItem,{predictReceipt: 0})
                }

                function fail(err){
                }

                this.$Post(url, data, doSuccess,fail)
            },
            handleCheck(e) {
                let url = 'api/order/work/order/plan/receipt/detail/list'
                let data = {
                    params: {
                        workOrderId: e
                    }
       
                }
                let doSuccess = (res) => {
                    this.datas = res.data.data
                }

                function fail(err){
                }

                this.$Get(url, data, doSuccess,fail)
            },
            changeDatas(e) {
                let value = Number(e.target.value)
                if(value>0) {
                    this.otherdatas = []
                    for(let i=0;i<value;i++) {
                        this.otherdatas.push({
                            receipt_period: i+1,
                            updatedate: '',
                            amount: 0,
                        })
                    }
                   
                }
                console.log(e)
            }
        },
        created(){
            this.$bus.on("open_company_Collection_flow",(e)=>{
                this.openDeclareResult = true
                this.currentRow = e;
                this.handleCheck(e.work_order_id)
            })
        }
    }
</script>
