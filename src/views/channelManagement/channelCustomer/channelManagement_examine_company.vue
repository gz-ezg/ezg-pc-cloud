<template>
    <div>
        <Table
                border
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
    </div>
</template>

<script>

    export default {
        props: ['customerid', 'customertypeText', 'tel', 'customersource'],
        data() {
            return {
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 300,
                    },
                    {
                        title: '跟进销售',
                        key: 'followby',
                        width: 100,
                    },
                    {
                        title: '交易状态',
                        key: 'enterprisestatusText',
                        width: 100,
                    },
                    {
                        title: '法人',
                        key: 'legalrepresentative',
                        width: 100,
                    },
                    {
                        title: '重要等级',
                        key: 'importlevelText',
                        width: 100,
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 100,
                    },
                    {
                        title: '企业来源',
                        key: 'cluesourceText',
                        width: 100,
                    },
                ],
                data6: [],
            }
        },
        methods: {

            /*************************初始化企业列表********************************/
            getCompanyData() {
                var _self = this
                _self.data6 = []
                var url = '/api/customer/findCompanysByCustomerId/' + _self.customerid[0]
                this.$http.get(url)
                    .then(function (response) {
                    _self.$backToLogin(response)
                        
                        for (var i = 0; i < response.data.data.length; i++) {
                            var a = {}
                            a.RegNumber = response.data.data[i].RegNumber
                            a.CNumber = response.data.data[i].CNumber
                            a.CPassword = response.data.data[i].CPassword
                            a.PNumber = response.data.data[i].PNumber
                            a.PPassword = response.data.data[i].PPassword
                            a.OrgCode = response.data.data[i].OrgCode
                            a.CreditCode = response.data.data[i].CreditCode
                            a.BankCode = response.data.data[i].BankCode
                            a.BasicBank = response.data.data[i].BasicBank
                            a.BasicBankCode = response.data.data[i].BasicBankCode
                            a.SimpleBank = response.data.data[i].SimpleBank
                            a.MainProduct = response.data.data[i].MainProduct
                            a.CompanyType = response.data.data[i].CompanyType
                            a.RegAddress = response.data.data[i].RegAddress
                            a.financelevel = response.data.data[i].financelevel
                            a.companyname = response.data.data[i].companyname
                            a.followby = response.data.data[i].followby
                            a.enterprisestatusText = response.data.data[i].enterprisestatusText
                            a.enterprisestatus = response.data.data[i].enterprisestatus
                            a.legalrepresentative = response.data.data[i].legalrepresentative
                            a.importlevelText = response.data.data[i].importlevelText
                            a.importlevel = response.data.data[i].importlevel
                            a.createby = response.data.data[i].createby
                            a.cluesourceText = response.data.data[i].cluesourceText
                            a.cluesource = response.data.data[i].cluesource
                            a.id = response.data.data[i].id
                            _self.data6.push(a)
                        }
                    })
            },
        },
        mounted() {
            this.getCompanyData()
        }
    }
</script>