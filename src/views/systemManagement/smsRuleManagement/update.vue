<template>
    <div>
        <Modal
            title="更新短信规则"
            :value="true"
            width="800"
            @on-cancel="close"
        >
            <Row :gutter="20">
                <Col span="12">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                        <FormItem label="规则名称：" prop="msgrulename">
                            <Input v-model="formValidate.msgrulename" placeholder="输入规则名称"></Input>
                        </FormItem>
                        <FormItem label="规则编码：" prop="msgrulecode">
                            <Input v-model="formValidate.msgrulecode" placeholder="输入规则编码"></Input>
                        </FormItem>
                        <FormItem label="规则说明：" prop="msgruledetail">
                            <Input v-model="formValidate.msgruledetail" placeholder="输入规则说明" type="textarea"></Input>
                        </FormItem>
                        <FormItem label="规则备注：" prop="msgmemo">
                            <Input v-model="formValidate.msgmemo" placeholder="输入规则备注" type="textarea"></Input>
                        </FormItem>
                    </Form>
                    <center><h2>接收人</h2></center>
                    <Table 
                        size="small"
                        :columns="linkUserHeader" 
                        :data="linkUserData"
                    >
                    </Table>
                </Col>
                <Col span="12">
                    <Row :gutter="10"><center><h3>双击下方一行添加关联人</h3></center></Row>
                    <Row :gutter="10">
                        <Input v-model="searchName" style="width:200px;margin-bottom:5px" size="small" @on-enter="get_user">
                            <!-- <Select v-model="select3" slot="prepend" style="width: 80px">
                                <Option value="day">Day</Option>
                                <Option value="month">Month</Option>
                            </Select> -->
                            <Button slot="append" icon="ios-search" @click="get_user"></Button>
                        </Input>
                        <Table
                            :loading="tableLoading"
                            size="small"
                            :columns="userHeader" 
                            :data="userList"
                            @on-row-dblclick="choose_user"></Table>
                    </Row>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="create" :loading="loading">更新</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div>
        </Modal>
        <depart-tree v-if="openDepartTree" :index="index" @change-depart="change_depart" @close="openDepartTree=false"></depart-tree>
    </div>
</template>

<script>
import { postUpdateMsgRule, getMsgRuleById } from '../api/msgRule'
import { getUserList } from '../api/user'
import departTree from './departTree'
export default {
    components: {
        departTree
    },
    props: {
        id: {
            type: [String, Number]
        }
    },
    data(){
        return {
            index: "",
            openDepartTree: false,
            tableLoading: true,
            formValidate: {
                
            },
            ruleValidate: [],
            loading: false,
            searchLoading: false,
            userList: [],
            searchName: "",
            userHeader: [
                {
                    title: "姓名",
                    key: "realname",
                    minWidth: 90
                },
                {
                    title: "部门",
                    key: "departname",
                    minWidth: 120
                }
            ],
            linkUserHeader: [
                {
                    title: "删除",
                    key: 'action',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.linkUserData.splice(params.index, 1)
                                }
                            }
                        }, 'x')
                    }
                },
                {
                    title: "姓名",
                    key: "realname",
                    minWidth: 90
                },
                {
                    title: "通知部门",
                    key: "departname",
                    minWidth: 120,
                    render: (h, params)=>{
                        return h('div',[
                            h('span', params.row.departNameList.join(",")),
                            h('Button', {
                                props: {
                                    size: "small",
                                    type: 'info'
                                },
                                on:{
                                    click: ()=>{
                                        this.index = params.index
                                        this.openDepartTree = true
                                    }
                                }
                            }, "增加")
                        ])
                    }
                },
                {
                    title: "备注",
                    key: "memo",
                    minWidth: 100,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.linkUserData[parmas.index].memo,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.linkUserData[parmas.index].memo = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.linkUserData[parmas.index].memo = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                }
            ],
            linkUserData: []
        }
    },
    methods: {
        create(){
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    this.submit()
                }
            })
        },
        async submit(){
            let list = this.linkUserData.map((item)=>{
                return {
                    linkuser: item.id,
                    departids: item.departIdList.join(","),
                    link_memo: item.memo
                }
            })
            let config = {
                list: JSON.stringify(list)
            }
            Object.assign(config, this.formValidate)
            let {status, data} = await postUpdateMsgRule(config)
            if(status){
                this.close(true)
            }
        },
        async get_user(){
            this.tableLoading = true
            let config = {
                params: {
                    page: 1,
                    pageSize: 5,
                    realname: this.searchName
                }
            }
            let { total, rows } = await getUserList(config)
            this.userList = rows.map((item)=>{
                item.memo = ""
                item.departNameList = []
                item.departIdList = []
                return item
            })
            this.tableLoading = false
        },
        change(e){
            console.log(e)
        },
        close(e){
            this.$emit("close", e)
        },
        choose_user(e){
            for(let i = 0; i < this.linkUserData.length; i++){
                if(e.id == this.linkUserData[i].id){
                    this.$Message.error("该用户已添加！")
                    return false
                }
            }
            this.linkUserData.push(e)
        },
        async get_detail(id){
            if(!id){
                this.$Message.error("无效的ID")
                this.close()
                return false
            }
            let config = {
                params: {
                    id: id
                }
            }
            let data = await getMsgRuleById(config)
            this.formValidate.msgrulename = data[0].msgrulename
            this.formValidate.msgruledetail = data[0].msgruledetail
            this.formValidate.msgrulecode = data[0].msgrulecode
            this.formValidate.memo = data[0].memo
            this.formValidate.id = data[0].id
            this.linkUserData = data.map((item)=>{
                let temp = item.departnames.split("_&_")
                let nameList = []
                let idList = []
                for(let i = 0;i<temp.length;i++){
                    nameList.push(temp[i].split("``")[1])
                    idList.push(temp[i].split("``")[0])
                }
                return {
                    id: item.linkuser,
                    departNameList: nameList,
                    memo: item.memo,
                    realname: item.linkusername,
                    departIdList: idList
                }
            })
        },
        change_depart(e){
            let {index, depart} = e
            this.linkUserData[index].departNameList.push(depart.departname)
            this.linkUserData[index].departIdList.push(depart.departId)
            this.openDepartTree = false
            // console.log(index, depart)
        }
    },
    created(){
        this.get_detail(this.id)
        this.get_user()
    }
}
</script>
