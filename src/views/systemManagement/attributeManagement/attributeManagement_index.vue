<!--    系统参数    -->
<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="isAdd=true">录入</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="edit">编辑</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="show">查看</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <Table
                    highlight-row
                    :columns="header" 
                    :data="data"
                    @on-current-change="save_current_row"
                    size="small"
                    style="margin-top: 10px"
                    :loading="loading"
                >
                </Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
            v-model="isAdd"
            title="录入"
        >
        <div slot="footer">
            <Button type="ghost" @click="isAdd=false">取消</Button>
            <Button type="primary" @click="submit">提交</Button>
        </div>
        </Modal>
        <Modal
            v-model="isEdit"
            title="编辑"
        >
        <div slot="footer">
            <Button type="ghost" @click="isEdit=false">取消</Button>
            <Button type="primary" @click="submit">提交</Button>
        </div>
        </Modal>
        <Modal
            v-model="isShow"
            title="查看"
        >
        <div slot="footer">
            <Button type="ghost" @click="isShow=false">取消</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'attributeManagement',
    data(){
        return{
            isAdd:false,
            isEdit:false,
            isShow:false,
            header:[
                    {
                        type: 'index',
                        width: 60,
                        title:'序号',
                        align: 'center'
                    },
                    {
                        title: '属性组名称',
                        key: 'attributeGroupName'
                    },
                    {
                        title: '属性组编码',
                        key: 'attributeGroupCode'
                    },
                    {
                        title: '创建时间',
                        key: 'createdate'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
            ],
            data:[],
            current_row:'',
            loading:false,
            page:1,
            pageTotal:""
        }
    },
    methods:{
        save_current_row(e){
            this.current_row = e
        },
        edit(){
            let _self = this
            if(_self.current_row != ""){
                _self.isEdit = true
            }else{
                _self.$Message.warning('请选择一行进行编辑！')
            }
        },
        show(){
            let _self = this
            if(_self.current_row != ""){
                _self.isEdit = true
            }else{
                _self.$Message.warning('请选择一行进行查看！')
            }
        },
        getData(){
            let _self = this
            let url = `api/datacenter/system/attribute/group/${_self.page}/10/list`
            this.$http.get(url).then(function(res){
                _self.$backToLogin(res)
                
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0;i<_self.data.length;i++){
                if(_self.data[i].createdate!=""){
                    _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                }
            }
            })   
        },
        pageChange(e){
            this.page = e
            this.getData()
        }

    },
    created(){
        this.getData()
    }

}
</script>
