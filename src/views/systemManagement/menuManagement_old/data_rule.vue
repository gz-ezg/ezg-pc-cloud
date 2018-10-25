<template>
    <div>
        <Modal
            v-model="show_data"
            title="数据规则"
            width="740">
            <div>
                <Row>
                    <Button type="primary"  style="margin:15px" @click="add_data_rule">操作录入</Button>
                </Row>
                <Table
                    :columns="header"
                    :data="data_rule"
                    highlight-row
                    @on-current-change="select_row"
                ></Table>
            </div>
            <div slot="footer"></div>
        </Modal>
        <AddDataRule></AddDataRule>
    </div>
</template>

<script>
import Bus from '../../../components/bus'
import AddDataRule from './data_rule_add'

export default {
    components:{
        AddDataRule
    },
    data(){
        return{
            id:'',
            select_row_data:'',
            show_data:false,
            data_rule:[
                {
                    index:1,
                }
            ],
            header:[
                {
                    title:'序号',
                    type:'index',
                    width:60
                },
                {
                    title:'规则名称',
                    key:'index',
                    width:100
                },
                {
                    title:'规则字段',
                    key:'index',
                    width:140
                },
                {
                    title:'规则条件',
                    key:'index',
                    width:100
                },
                {
                    title:'规则值',
                    key:'index',
                    width:80
                },
                {
                    title:'操作',
                    key:'index',
                    width:200,
                    render:(h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete_data(params)
                                        }
                                    }
                                }, '删除'),
                            
                            h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit_data_rule()
                                        }
                                    }
                                }, '编辑')
                            ])
                        }
                    }]
                }},
        methods:{
            select_row(e){
                var _self = this
                _self.select_row_data = e
                console.log(e)

            },
            add_data_rule(){
                var _self = this
                Bus.$emit('add_data_rule_modal',_self.select_row_data)
                console.log("11111111111")
            },
            edit_data_rule(){
                var _self = this
                if(_self.select_row_data !=''){
                    Bus.$emit('edit_data_rule_modal',_self.select_row_data)
                }else{
                    this.$Message.error('请选择一行进行编辑')
                }
            },
            delete_data(e){
                
            },               
            init(){
                // 初始化并根据传入的id获取数据
                var _self = this
                Bus.$on('data_page_rule',(e)=>{
                    _self.show_data = true
                    _self.id = e.id
                    var url = 'api/menu/getDataRuleList?menuId=' + _self.id
                    _self.$http.get(url).then(function(res){
                        console.log(res.data.data)
                        // _self.data_rule = res.data.data
                    })
                })
            // },
            // build_data_rule(){
            //     var _self = this
            //     if(_self.select_row_data!=''){
            //         Bus.$emit('edit_data_rule_modal',_self.select_row_data)
            //     }else{
                    
            //     }
            // }
        }
        },
        created(){
            this.init()
        }

}
</script>

