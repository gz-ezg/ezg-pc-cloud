<template>
    <div>
        <Table
                border
                :columns="columns7"
                :data="data6"
                @on-row-dblclick="rowDblClick"
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
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        key: 'tel'
                    },
                    {
                        title: 'QQ',
                        key: 'qq'
                    },
                    {
                        title: '微信',
                        key: 'wechat'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '职位',
                        key: 'jobplace'
                    },
                    {
                        title: '发送信息',
                        key: 'sendmsgflag'
                    },
                    {
                        title: '备注',
                        key: 'memo'
                    },
                ],
            }
        },
        methods: {

            /*************************初始化客户关系人********************************/
            getCustomerRelation() {
                var _self = this
                var url = '/customer/findCustomerRelationById/' + _self.customerId2
                _self.data6 = []

                function doSuccess(response) {
                    var _customerRelation = response.data.data
                    for (var i = 0; i < _customerRelation.length; i++) {
                        var responseObj = {}
                        responseObj.email = _customerRelation[i].email
                        responseObj.id = _customerRelation[i].id
                        responseObj.jobplace = _customerRelation[i].jobplace
                        responseObj.memo = _customerRelation[i].memo
                        responseObj.name = _customerRelation[i].name
                        responseObj.qq = _customerRelation[i].qq
                        if (_customerRelation[i].sendmsgflag == 1) {
                            responseObj.sendmsgflag = '是'
                        } else {
                            responseObj.sendmsgflag = '否'
                        }
                        responseObj.tel = _customerRelation[i].tel
                        responseObj.wechat = _customerRelation[i].wechat
                        _self.data6.push(responseObj)
                    }
                }

                this.GetData(url, doSuccess)
            },
            cancel(name) {
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            this.getCustomerRelation()
        }
    }
</script>