<template>
    <div>
        
            <Row>
                <ButtonGroup style="margin:10px 0 15px 0">
                    <Button type="primary" icon="ios-crop" @click="add_menu">菜单录入</Button>
                    <Button type="primary" icon="ios-crop" @click="edit_menu">菜单编辑</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Col span="12">
                    <TreeGrid
                    @tr-click="show"
                    :items='data'
                    :columns='header'
                    @on-row-click='rowClick'
                    ></TreeGrid>
                </Col>
                <Col span="12">
                    <DataRule></DataRule>
                    <PageRule></PageRule>
                </Col>
            </Row>
            

        <Menu></Menu>
        
    </div>
</template>

<script>
import TreeGrid from './treeGrid'
import DataRule from './data_rule'
import PageRule from './page_rule'
import Menu from './menu_add'
import Bus from '../../../components/bus'

export default {
    components:{
        TreeGrid,
        DataRule,
        PageRule,
        Menu
    },
    data(){
        return{
            click_row:[],
            header:[
                {
                    title:'菜单名称',
                    key:'text',
                    width:'120'
                },
                {
                    title:'序号',
                    key:'id',
                    width:'60'
                },
                // {
                //     title:'图标',
                //     key:'name',
                //     width:'80'                    
                // },
                // {
                //     title:'菜单类型',
                //     key:'name',
                //     width:'150'
                // },
                // {
                //     title:'菜单地址',
                //     key:'interfaceUrl',
                //     width:'400'
                // },
                // {
                //     title:'菜单顺序',
                //     key:'interfaceOrder',
                //     width:'150'
                // },
                // {
                //     title:'菜单图标样式',
                //     key:'name',
                //     width:'200'
                // },
                {
                    title:'操作',
                    type:'action',
                    width:'400',
                    actions: [
                        {
                        type: 'button',
                        text: '删除'
                        },
                        {
                        type: 'button',
                        text: '页面控件权限'
                        },
                        {
                        type: 'button',
                        text: '数据规则'
                        }
                    ]
                }
            ],
            data:[]
        }
    },
    methods: {
        show(e){
            // console.log(e)
            this.click_row = e
            console.log(this.click_row)
        },
        init(){
            var _self = this
            var url = 'api/menu/getMenuTree'
            _self.data = []
            this.$http(url).then(function(res){
                console.log(res.data.data)
                _self.data = res.data.data
            })
        },

        add_menu(){
            var _self = this
            Bus.$emit('add_menu',_self.click_row)
        },

        edit_menu(){
            var _self = this
            if(_self.click_row==''){
                _self.$Message.warning('请选择一行进行编辑')
            }else{
                Bus.$emit('edit_menu',_self.click_row)//传入需要编辑的那一栏                
            }
        },
        rowClick (data, index, event, text) {
            if (text === '删除') {
                this.del(data)
            }
            if (text === '页面控件权限') {
                this.page_rule(data)
            }
            if (text === '数据规则') {               
                this.data_rule(data)
            }
        },
        del(e){
          console.log(e)
                var url = 'api/menu/updateMenu'
                const config = {
                    id:e.id,
                    deleteflag:'1'
                }
                this.$http.post(url,config).then(function(res){
                    console.log(res)
                })
                this.init()
        },
        page_rule(e){
            Bus.$emit('show_page_rule',e)
        },
        data_rule(e){
            Bus.$emit('data_page_rule',e)
        }
    },
    created(){
        this.init()
    }
}
</script>
