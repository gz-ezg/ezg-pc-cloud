<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="contract" :model="contract" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="fileName" label="文件名称：">
                                                <Input type="text" v-model="contract.fileName" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="fileMemo" label="文件说明：">
                                                <Input type="text" v-model="contract.fileMemo" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="contractType" label="合同类型：">
                                                <Select type="text" transfer v-model="contract.contractType" placeholder="" size="small">
                                                    <Option v-for="(item,index) in contractType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <!-- <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="realname" label="创建人：">
                                                <Input type="text" v-model="contract.realname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="product" label="创建时间：">
                                                <DatePicker transfer type="daterange" placeholder="选择日期" style="width:100%" v-model="contract.date" size="small"></DatePicker>
                                            </FormItem>
                                        </Col>
                                    </Row> -->
                                    <FormItem>
                                        <Button type="primary" @click="search">搜索</Button>
                                        <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </p>
                    </Panel>
                </Collapse>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="upload">上传资料</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="edit">编辑</Button>
                    <!-- <Button type="primary" icon="ios-color-wand-outline" @click="deletefile">批量删除</Button> -->
                    <!-- <Button type="primary" icon="ios-color-wand-outline" @click="download">批量下载</Button>                     -->
                </ButtonGroup>
            </Row>

            <Row style="margin-top: 10px;">
                <Table
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="header"
                        :loading="loading"
                        
                        @on-current-change="save_rows"
                        :data="data"></Table>
                        <!-- @on-row-click="checkrow" -->
                <Page
                        size="small"
                        :total="pageTotal"
                        :current.sync="page"                     
                        show-total
                        show-elevator
                        @on-change="pageChange"
                        placement="top"
                        style="margin-top: 10px"></Page>
            </Row>
        <edit @update="getData"></edit>
        <upload @update="getData"></upload>
    </Card>
</template>

<script>
import Bus from '../../../components/bus'
import { DateFormat } from '../../../libs/utils'
import Edit from '../common/edit_file'
import Upload from '../common/upload'

export default {
    components: {
        Edit,
        Upload
    },
    data(){
        return{
            contractType:[],
            contractType_Map:new Map(),
            contract:{
                fileName:"",
                fileMemo:"",
                realname:"",
                contractType:"",
                date:[]
            },
            local_rows:[],
            search_model:"",
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            loading:false,
            header:[
                // {
                //     type: 'selection',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    type: 'index',
                    title: '序号',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '合同类型',
                    key: 'contractTypeName',
                    width: 120
                },
                {
                    title: '文件名称',
                    key: 'fileName',
                    width: 280
                },
                {
                    title: '文件说明',
                    key: 'fileMemo',
                    width: 120
                },
                {
                    title: '创建人',
                    key: 'realname',
                    width: 120
                },
                {
                    title: '创建时间',
                    key: 'createdate',
                    width: 120
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    fixed: 'right',
                    align: 'center',
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
                                        // console.log(params)
                                        let url = `api/system/resource/download?id=` + params.row.id
                                        window.open(url)
                                    }
                                }
                            }, '下载'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let _self = this                                        
                                        let url = `api/system/resource/contract/management/del`
                                        let config = {
                                            id: params.row.id
                                        }
                                        this.$http.post(url,config).then(function(res){
                                            _self.$backToLogin(res)
                                            if(res.data.msgCode == '40000'){
                                                _self.$Message.success(res.data.msg)
                                                if(_self.data.length == '1'){
                                                    _self.page = _self.page - 1
                                                }
                                                _self.getData()
                                            }else{
                                                _self.$Message.error(res.data.msg)
                                            }
                                        })
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data:[]
        }
    },
    methods:{
        search(){
            this.page = 1
            this.getData()
        },
        reset(){
            this.contract.fileName = "",
            this.contract.fileMemo = "",
            this.contract.realname = "",
            this.contract.contractType = "",
            this.contract.date = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        upload(){
            let _self = this
            Bus.$emit('upload_material_house',[_self.contractType,"contract"])
        },
        edit(){
            let _self = this
            if(this.local_rows != ""){
                Bus.$emit('Open_material_house_edit', [_self.local_rows, _self.contractType,'contract'])
            }else{
                this.$Message.warning('请选择一行进行编辑！')
            }
        },
        download(){
            let _self = this
            if(this.local_rows.length >= '1'){

                let temp = []
                for(let i = 0;i<_self.local_rows.length;i++){
                    temp.push(_self.local_rows[i].id)
                }
                
                let url = `api/system/resource/download/batch?ids=` + temp.join(",")
                // console.log(url)
                window.open(url)
            }else{
                this.$Message.warning('请选择至少一行进行下载！')
            }
        },
        save_rows(row){
            this.local_rows = []
            this.local_rows = row
            console.log(row)
        },
        checkrow(row){
            let _self = this
            // console.log(row)
            for(let i = 0;i < 10;i++){
                if(row.id == _self.data[i].id){
                    // console.log(row.id)
                    // console.log(_self.data[i].id)
                    // _self.data[i]._checked = true
                    let contractTypeName = _self.data[i].contractTypeName
                    let contractType = _self.data[i].contractType
                    let fileName = _self.data[i].fileName
                    let fileMemo = _self.data[i].fileMemo
                    let createdate = _self.data[i].createdate
                    let realname = _self.data[i].realname
                    let createBy = _self.data[i].createBy
                    let id = _self.data[i].id
                    let config = {
                        "contractTypeName":contractTypeName,
                        "contractType":contractType,
                        "fileName":fileName,
                        "fileMemo":fileMemo,
                        "createdate":createdate,
                        "realname":realname,
                        "createBy":createBy,
                        "id":id,
                        "_checked":true
                    }
                    _self.$set( _self.data, i, config )
                    // console.log(_self.data[i])
                }
            }
        },
        getData(){
            this.local_rows = []
            let _self = this
            let url = `api/system/resource/contract/management/list`
            let config = {
                params:{
                    page:_self.page,
                    pageSize: 10,
                    contractType: _self.contract.contractType,
                    fileName:  _self.contract.fileName,
                    fileMemo: _self.contract.fileMemo,
                    realname: _self.contract.realname,
                    bcreatedate:DateFormat(_self.contract.date[0]),
                    ecreatedate:DateFormat(_self.contract.date[1]),
                    sortField:"createdate"                  
                }
            }
            this.$http.get(url, config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == '40000'){
                    _self.data = res.data.data.rows
                    for(let i = 0;i<_self.data.length;i++){
                        if(_self.data[i].createdate == ""||_self.data[i].createdate == null){
                            _self.data[i].createdate = ""
                        }else{
                            _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                        }
                        // _self.$set( _self.data[i], _checked, true )                        
                        _self.data[i]._checked = false
                        _self.data[i].contractTypeName = _self.contractType_Map.get(_self.data[i].contractType)
                        // console.log(_self.data[i].contractTypeName)
                    }
                    _self.pageTotal = res.data.data.total
                }else{
                    _self.$Message.error(res.data.msg)
                }
            })
        },
        getDataCenter(){
            let _self = this
            let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
            let config = {
                params:{
                    groupCodes:"contractType"
                }
            }
            this.$http.get(url,config).then(function(res){
                _self.contractType = res.data.data.contractType
                _self.contractType_Map = _self.$array2map(_self.contractType)
                _self.getData()
            })
            
        }
    },
    created () {
        this.getDataCenter()
    }
}
</script>

