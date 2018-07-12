<template>
    <div>
        <Card>
            <div slot="title">规则说明</div>
            <div>
                <Row>
                    1、如果启用了【超过N天“未成交”的客户，由系统定时划入公海】，即便在N天内跟进了，只要客户的客户状态不是“成交客户”，仍然会被划入公海。
                </Row>
                <Row>2、超级管理员负责的客户，不会自动划入客户公海。</Row>
                <Row>3、渠道客户的惩罚默认为由有效成交线索转成有效线索</Row>
                <Row>4、市场部客户的惩罚默认为转入公海池</Row>
                <Row>5、划入期限为0时，惩罚实时生效；划入时间为N时，惩罚不生效</Row>
                <Row>6、客户状态、客户等级。行为、跟进评分不能都选择“全部”或者“无”</Row>
            </div>
        </Card>
        <Card>
            <Table
                highlight-row
                size="small"
                :columns="columns"
                :data="data"
                @on-current-change="selectRow"
                :loading = "rule_loading"
                @on-row-dblclick="isEditChange"
            ></Table>
            <Page
                size="small"
                :total="pageTotal"
                :current.sync="currentPage"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            columns:[
                {
                    title:'部门',
                    key:'',
                    width: 120
                },
                {
                    title:'客户状态',
                    key:'',
                    width: 150
                },
                {
                    title:'客户重要性',
                    key:'',
                    width: 120
                },
                {
                    title:'行为',
                    key:'',
                    width: 120
                },
                {
                    title:'跟进评分',
                    key:'',
                    width: 120
                },
                {
                    title:'产品类型',
                    key:'',
                    width: 120
                },
                {
                    title:'期限',
                    key:'',
                    width: 120
                },
                {
                    title:'惩罚',
                    key:'',
                    width: 120
                },
                {
                    title:'提前通知时间',
                    key:'',
                    width: 150
                },
                {
                    title:'说明',
                    key:'',
                    width: 180,
                    render:(h,params) => {
                        if(1){
                            return h('div','内容')
                        }else{
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '说明',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.data[params.index].companyNames[0].name.slice(0,13) + '...'),
                                h('div', {
                                    slot: 'content'
                                },[
                                    h('span',params.row.address1)
                                ]
                                )
                            ]);
                        }
                    }
                },
                {
                    title:'执行状态',
                    key:'',
                    width: 120
                },
                {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            if(1){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, '[修改]'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, '[执行]'),
                                ]);
                            }else{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                
                                            }
                                        }
                                    }, '[修改]'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, '[停止]'),
                                ]);
                            }
                        }
                },
            ],
            data:[],
            rule_loading:false,
            pageTotal:new Number(),
            currentPage:1,
            page:1
        }
    }
}
</script>

