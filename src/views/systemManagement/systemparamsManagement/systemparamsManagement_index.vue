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
            width="800"
        >
            <Form ref="addParams" :model="addParams" :label-width="150">
                <FormItem label="参数名称：" prop="paramname">
                    <Input v-model="addParams.paramname" style="width:500px"></Input>
                </FormItem>
                <FormItem label="参数KEY：" prop="paramkey">
                    <Input v-model="addParams.paramkey" style="width:500px"></Input>
                </FormItem>
                <FormItem label="参数值：" prop="paramvalue" >
                    <Input v-model="addParams.paramvalue" style="width:500px"></Input>                        
                </FormItem>
            </Form>
        <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="submitAdd">提交</Button>
        </div>
        </Modal>
        <Modal
            v-model="isEdit"
            title="编辑"
            width="800"
            
        >
            <Form ref="editParams" :model="editParams" :label-width="150">
                <FormItem label="参数名称：" prop="paramname">
                    <Input v-model="editParams.paramname" style="width:500px"></Input>
                </FormItem>
                <FormItem label="参数KEY：" prop="paramkey">
                    <Input v-model="editParams.paramkey" style="width:500px"></Input>
                </FormItem>
                <FormItem label="参数值：" prop="paramvalue" >
                    <Input v-model="editParams.paramvalue" style="width:500px"></Input>                        
                </FormItem>
            </Form>
        <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
            <Button type="primary" @click="submitEdit">提交</Button>
        </div>
        </Modal>
        <Modal
            v-model="isShow"
            title="查看"
            width="800"
            
        >
            <Form ref="editParams" :model="editParams" :label-width="150">
                <FormItem label="参数名称：" prop="paramname">
                    <Input v-model="editParams.paramname" style="width:500px" disabled></Input>
                </FormItem>
                <FormItem label="参数KEY：" prop="paramkey">
                    <Input v-model="editParams.paramkey" style="width:500px" disabled></Input>
                </FormItem>
                <FormItem label="参数值：" prop="paramvalue" >
                    <Input v-model="editParams.paramvalue" style="width:500px" disabled></Input>                        
                </FormItem>
            </Form>
        <div slot="footer">
            <Button type="ghost" @click="cancel">取消</Button>
        </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'systemparamsManagement_index',
    data(){
        return{
            addParams:{
                paramname:"",
                paramkey:"",
                paramvalue:""
            },
            editParams:{
                id:"",
                paramname:"",
                paramkey:"",
                paramvalue:""
            },
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
                        title: '参数名称',
                        key: 'paramname',
                        witdh: 200
                    },
                    {
                        title: '参数KEY',
                        key: 'paramkey',
                        witdh: 200                        
                    },
                    {
                        title: '参数值',
                        key: 'paramvalue',
                        witdh: 200                        
                    },
                    // {
                    //     title: '操作',
                    //     key: 'action'
                    // }
            ],
            data:[],
            current_row:'',
            loading:false,
            page:1,
            pageTotal:new Number()
        }
    },
    methods:{
        cancel(){
            this.isAdd=false
            this.isShow=false
            this.isEdit=false
            this.addParams.paramname = ''
            this.addParams.paramkey = ''
            this.addParams.paramvalue = ''
            this.editParams.paramname = ''
            this.editParams.paramkey = ''
            this.editParams.paramvalue = ''
            // this.current_row = ""   
        },
        save_current_row(e){
            this.current_row = e
        },
        edit(){
            let _self = this
            if(_self.current_row != ""){
                _self.isEdit = true
                _self.editParams = _self.current_row
            }else{
                _self.$Message.warning('请选择一行进行编辑！')
            }
        },
        show(){
            let _self = this
            if(_self.current_row != ""){
                _self.isShow = true
                _self.editParams = _self.current_row                
            }else{
                _self.$Message.warning('请选择一行进行查看！')
            }
        },
        getData(){
            let _self = this
            let url = `api/system/systemParamList`
            let config = {
                params:{
                    page:_self.page,
                    pageSize:10
                }
            }
            this.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)            
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                // for(let i = 0;i<_self.data.length;i++){
                // if(_self.data[i].createdate!=""){
                //     _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                // }
            })   
        },
        submitAdd(){
            let _self = this
            let url = `api/system/createSystemParam`
            let config = {
                paramname: _self.addParams.paramname,
                paramkey: _self.addParams.paramkey,
                paramvalue: _self.editParams.paramvalue
            }
            this.$http.post(url,config).then(function(res){
                _self.$backToLogin(res)
                console.log(res.data.msg)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.isAdd = false
                    _self.getData()
                    _self.addParams = {}
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        submitEdit(){
            let _self = this
            let url = `api/system/updateSystemParam`
            let config = {
                id: _self.editParams.id,
                paramname: _self.editParams.paramname,
                paramkey: _self.editParams.paramkey,
                paramvalue: _self.editParams.paramvalue
            }
            this.$http.post(url,config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == "40000"){
                    _self.$Message.success(res.data.msg)
                    _self.isEdit = false
                    _self.getData()
                }else{
                    _self.$Message.error(res.data.msg)
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
