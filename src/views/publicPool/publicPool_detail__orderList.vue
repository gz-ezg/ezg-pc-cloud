<style>
    .ivu-table .demo-table-error-row td {
        background-color: #ff6600;
        color: #fff;
    }
</style>
<template>
    <div>
        <Table
                border
                :row-class-name="rowClassName"
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
    </div>
</template>

<script>

    export default {
        props: ['customerId2'],
        data() {
            return {
                data6: [],
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '流程状态',
                        key: 'processtype'
                    },
                    {
                        title: '欠款',
                        key: 'neednumber'
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber'
                    },
                    {
                        title: '已付款',
                        key: 'realnumber'
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydirText'
                    },
                ],
            }
        },
        methods: {
            getCompanyData() {
                var _self = this
                var url = '/api/customer/findCustomerOrderById/' + _self.customerId2

                function doSuccess(response) {
                    var _customerData = response.data.data
                    for (var i = 0; i < _customerData.length; i++) {
                        var _responseArray = {}
                        _responseArray.ordercode = _customerData[i].ordercode
                        _responseArray.companyname = _customerData[i].companyname
                        _responseArray.processtype = _customerData[i].processtype
                        _responseArray.neednumber = _customerData[i].neednumber
                        _responseArray.paynumber = _customerData[i].paynumber
                        _responseArray.realnumber = _customerData[i].realnumber
                        _responseArray.paydirText = _customerData[i].paydirText
                        _responseArray.createDate = _customerData[i].createDate
                        _responseArray.updatedate = _customerData[i].updatedate
                        _self.data6.push(_responseArray)
                    }
                }

                this.GetData(url, doSuccess)
            },
            rowClassName(row, index) {
                if (row.neednumber != 0) {
                    return 'demo-table-error-row';
                }
            }
        },
        mounted() {
            this.getCompanyData()
        }
    }
</script>