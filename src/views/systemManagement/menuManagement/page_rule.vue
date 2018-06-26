<template>
    <div>
        <Modal
            v-model="show_page"
            title="页面控件权限"
            width="740"
        >
            <Row>
                <Button type="primary" style="margin:15px" @click="build_page_rule">操作录入</Button>
            </Row>
            <Row>
                 <Table
                    :columns="header"
                    highlight-row
                    @on-current-change="select_row"
                    :data="page_rule"
                ></Table>
            </Row>
            
            <div slot="footer"></div>           
        </Modal>
        <add-page-rule></add-page-rule>
    </div>
</template>

<script>
import Bus from '../../../components/bus'
import AddPageRule from './page_rule_add'

export default {
    components:{
        AddPageRule
    },
    data(){
        return{
            id:'',
            select_row_page:'',
            show_page:false,          
            page_rule:[
                {
                    index:1,
                }
            ],
            header:[
                {
                    title:'序号',
                    type:'index',
                    width:50
                },
                {
                    title:'页面控件名称',
                    key:'index',
                    width:80
                },
                {
                    title:'页面控件编号',
                    key:'index',
                    width:140
                },
                {
                    title:'类型',
                    key:'index',
                    width:80
                },
                {
                    title:'操作',
                    key:'index',
                    width:120,
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
                                            this.delete_page(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                    {
                        title:'#',
                        key:'createDate',
                        align:'center',
                        width:150,
                        render: (h, params) => {
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
                                            this.build_page_rule(params)
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }]
        }
    },
    methods:{
            select_row(e){
                var _self = this
                _self.select_row_page = e
                console.log(e)
            },
            delete_page(e){
                console.log(e)                                
            },
            init(){
                // 初始化并根据传入的id获取数据
                var _self = this
                Bus.$on('show_page_rule',(e)=>{
                    _self.show_page = true
                    _self.id = e.id
                    var url = ''
                    _self.$http.get()
                })
            },
            build_page_rule(e){
                var _self = this
                if(_self.select_row_page != ''){
                    Bus.$emit('edit_page_rule_modal',_self.select_row_page)
                }else{
                    Bus.$emit('add_page_rule_modal',true)
                    console.log('11111')
                }
            }
              
        },
        created(){
            this.init()
        }

}
</script>

