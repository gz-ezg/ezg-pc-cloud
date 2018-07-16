<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="company" :model="company" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="fileName" label="文件名称：">
                                                <Input type="text" v-model="company.fileName" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="resourceMemo" label="文件说明：">
                                                <Input type="text" v-model="company.resourceMemo" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="resourceType" label="文件类型：">
                                                <Select type="text" transfer v-model="company.resourceType" placeholder="" size="small">
                                                    <Option v-for="(item,index) in resourceType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <!-- <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="realname" label="创建人：">
                                                <Input type="text" v-model="company.realname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="product" label="创建时间：">
                                                <DatePicker transfer type="daterange" placeholder="选择日期" style="width:100%" v-model="company.date" size="small"></DatePicker>
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
            resourceType:[],
            resourceType_Map:new Map(),
            company:{
                fileName:"",
                resourceMemo:"",
                realname:"",
                companyType:"",
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
                    title: '文件类型',
                    key: 'resourceTypeName',
                    width: 120
                },
                {
                    title: '文件名称',
                    key: 'fileName',
                    width: 280
                },
                {
                    title: '文件说明',
                    key: 'resourceMemo',
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
                    width: 180,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        let temp = params.row.fileName.split(".")
                        // console.log(temp[temp.length - 1])
                        // console.log(this.$indexOfArray(temp[temp.length - 1], ['xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'pdf']))
                        if(this.$indexOfArray(temp[temp.length - 1], ['xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'pdf'])){
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
                                            let routeData = this.$router.resolve({
                                                name:'previewFile',
                                                params:{
                                                    id: params.row.id
                                                }
                                            })
                                            window.open(routeData.href, '_blank');
                                        }
                                    }
                                }, '预览'),
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
                                            console.log(params)
                                            let url = `api/system/resource/download?id=` + params.row.id
                                            window.open(url)
                                        }
                                    }
                                }, '下载'),
                            ]);
                        }else{
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
                                            this.$Message.error('该文件暂不支持预览！')
                                        }
                                    }
                                }, '预览'),
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
                                            console.log(params)
                                            let url = `api/system/resource/download?id=` + params.row.id
                                            window.open(url)
                                        }
                                    }
                                }, '下载'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             let _self = this                                        
                                //             let url = `api/system/resource/company/resource/del`
                                //             let config = {
                                //                 id: params.row.id
                                //             }
                                //             this.$http.post(url,config).then(function(res){
                                //                 _self.$backToLogin(res)
                                //                 if(res.data.msgCode == '40000'){
                                //                     _self.$Message.success(res.data.msg)
                                //                     if(_self.data.length == '1'){
                                //                         _self.page = _self.page - 1
                                //                     }
                                //                     _self.getData()
                                //                 }else{
                                //                     _self.$Message.error(res.data.msg)
                                //                 }
                                //             })
                                //         }
                                //     }
                                // }, '删除')
                            ]);
                        }
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
            this.company.fileName = "",
            this.company.resourceMemo = "",
            this.company.realname = "",
            this.company.resourceType = "",
            this.company.date = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        upload(){
            let _self = this
            Bus.$emit('upload_material_house',[_self.resourceType,"company"])
        },
        edit(){
            let _self = this
            if(this.local_rows != ""){
                Bus.$emit('Open_material_house_edit', [_self.local_rows, _self.resourceType,'company'])
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
            // console.log(this.local_rows)
        },
        getData(){
            this.local_rows = []
            let _self = this
            let url = `api/system/resource/company/resource/list`
            let config = {
                params:{
                    page:_self.page,
                    pageSize: 10,
                    resourceType: _self.company.resourceType,
                    fileName:  _self.company.fileName,
                    resourceMemo: _self.company.resourceMemo,
                    realname: _self.company.realname,
                    bcreatedate:DateFormat(_self.company.date[0]),
                    ecreatedate:DateFormat(_self.company.date[1]),
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
                        _self.data[i].resourceTypeName = _self.resourceType_Map.get(_self.data[i].resourceType)
                        // console.log(_self.data[i].companyTypeName)
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
                    groupCodes:"resourceType"
                }
            }
            this.$http.get(url,config).then(function(res){
                _self.resourceType = res.data.data.resourceType
                _self.resourceType_Map = _self.$array2map(_self.resourceType)
                _self.getData()
            })
            
        }
    },
    created () {
        this.getDataCenter()
    }
}
</script>

