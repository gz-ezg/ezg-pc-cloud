<template>
    <div>
        <Button type="primary" shape="circle" icon="plus" @click="open_create">新增</Button>
        <Table
            size="small"
            :loading="loading"
            border
            :columns="header"
            :data="data"
            style="margin-top: 15px"
        ></Table>
        <update-relation @update="get_data(customer)"></update-relation>
        <create-relation @update="get_data(customer)" :customerId="customer.ID"></create-relation>
    </div>
</template>

<script>
import createRelation from './create'
import updateRelation from './update'

export default {
    props: {
        customer:{
            type: [Array, Object, String]
        }
    },
    components:{
        createRelation,
        updateRelation
    },
    data(){
        return {
            header: [
                {
                    type: 'index',
                    minWidth: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name',
                    minWidth:100
                },
                {
                    title: '电话',
                    key: 'tel',
                    minWidth:150
                },
                {
                    title: 'QQ',
                    key: 'qq',
                    minWidth:150
                },
                {
                    title: '微信',
                    key: 'wechat',
                    minWidth:150
                },
                {
                    title: '邮箱',
                    key: 'email',
                    minWidth:150
                },
                {
                    title: '职位',
                    key: 'jobplace',
                    minWidth:100
                },
                {
                    title: '发送信息',
                    key: 'isSend',
                    minWidth:100
                },
                {
                    title: '备注',
                    key: 'memo',
                    minWidth:100
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$bus.emit("UPDATE_CUSTOMER_RELATION", params.row)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, [
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: '您确定要删除此关系人吗！',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.remove(params)
                                        },
                                        'on-cancel': function () {
                                        }
                                    }
                                }, '删除')
                            ])
                        ]);
                    }
                }
            ],
            data: [],
            loading: false
        }
    },
    methods: {
        get_data(e){
            let _self = this
            let url = `api/customer/findCustomerRelationById/` + e.ID
            _self.loading = true
            let config = {}

            function success(res){
                _self.data = res.data.data
                for(let i = 0; i<_self.data.length; i++){
                    if(_self.data[i].sendmsgflag == 1){
                        _self.data[i].isSend = "是"
                    }else{
                        _self.data[i].isSend = "否"
                    }
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        remove(e){
            let _self = this
            _self.$ButtonCollect("marketingManagement_index_client_delect")

            let url = `api/customer/delCustomerRelation/` + e.row.id

            let config = {}

            function success(res){
                this.$Message.success("删除成功！")
                _self.get_data(this.customer)
            }

            function fail(err){
                this.$Message.error("删除失败！")
            }

            this.$Get(url, config, success, fail)
        },
        open_create(){
            this.$bus.emit("CREATE_CUSTOMER_RELATION", true)
        }
    },
    created(){
        this.get_data(this.customer)
    }
}
</script>
