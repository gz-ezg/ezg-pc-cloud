<template>
    <div>
        <Modal
            title="创建请求"
            width="90%"
            v-model="openRequest"
            :mask-closable="false"

        >
            <Row :gutter="20">
                <Col span="12">
                    <Select 
                        v-model="receiverId" 
                        placeholder="接收人" 
                        filterable
                        remote
                        :remote-method="get_user"
                        :loading="userLoading"
                    >
                        <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
                            <span>{{item.realname}}</span>
                            <span style="float:right;color:#ccc">{{item.departname}}</span>
                        </Option>
                    </Select>
                </Col>
                <Col span="12">
                    <Input v-model="applicationMemo" type="textarea" placeholder="备注" :rows="1"/>
                </Col>
            </Row>
            <!-- <Row :gutter="20" style="margin-top:10px">
                
            </Row> -->
            <Row :gutter="20" style="margin-top:10px">
                <tables
                    ref="tables" 
                    editable 
                    v-model="fileList" 
                    :columns="columns"
                >

                </tables>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="submit_request" :loadind="submit_loading">提交申请</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import tables from '../../woa-components/tables/tables'

export default {
    components:{
        tables
    },
    data(){
        return{
            submit_loading: false,
            openRequest: false,
            userLoading: false,
            userList: [],
            receiverId: "",
            applicationMemo: "",
            fileList:[],
            columns:[
                {
                    title: "资料名称",
                    key: "file_type_name",
                    minWidth: 150
                },
                {
                    title: "归属公司",
                    key: "companyname",
                    minWidth: 200
                },
                {
                    title: "存放数量",
                    key: "file_num",
                    minWidth: 120
                },
                {
                    title: "请求数量",
                    key: "num",
                    minWidth: 120,
                    editable: true
                }
            ]
        }
    },
    methods:{
        get_user(query){
            let _self = this
            let url = `api/user/list`
            _self.userLoading = true

            let config = {
                params: {
                    page: 1,
                    pageSize: 5,
                    realname: query
                }
            }

            function success(res){
                _self.userLoading = false
                _self.userList = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        submit_request(){
            let _self = this
            if(!this.receiverId){
                _self.$Message.warning("请选择接收人！")
            }else{
                let url = "api/customer/file/connect/request/create"
                _self.submit_loading = true
                let temp = {}
                for(let i = 0; i < _self.fileList.length; i++){
                    _self.fileList[i].num = parseInt(_self.fileList[i].num)
                    temp[_self.fileList[i].id] = _self.fileList[i].num
                }
                console.log(temp)

                let config = {
                    receiverId: _self.receiverId,
                    applicationMemo: _self.applicationMemo,
                    customerFileJson: JSON.stringify(temp)
                }

                function success(res){
                    _self.submit_loading = false
                    _self.openRequest = false
                }

                function fail(err){
                    _self.submit_loading = false
                }

                this.$Post(url, config, success, fail)
            }
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_CREATE_REQUEST_FILE", (e)=>{
            _self.userList = []
            _self.receiverId = ""
            // console.log(e)
            _self.fileList = e
            _self.openRequest = true
        })
    },
}
</script>

