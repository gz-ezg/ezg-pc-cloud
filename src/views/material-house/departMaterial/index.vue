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
                                            <FormItem prop="fileMemo" label="文件说明：">
                                                <Input type="text" v-model="company.fileMemo" placeholder="" size="small">
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
                                            <FormItem prop="createdate" label="创建时间：">
                                                <DatePicker transfer type="daterange" placeholder="选择日期" style="width:100%" v-model="company.createdate" size="small"></DatePicker>
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
    name: "DepartmentInformation_index",
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
                fileMemo:"",
                realname:"",
                resourceType:"",
                createdate:[]
            },
            local_rows:[],
            search_model:"",
            page:1,
            pageSize:10,
            pageTotal:new Number(),
            loading:false,
            header:[
                {
                    type: 'index',
                    title: '序号',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '文件名称',
                    key: 'filename',
                    width: 280
                },
                {
                    title: '文件类型',
                    key: 'resourceTypeName',
                    width: 120
                },
                {
                    title: '文件说明',
                    key: 'sourcememo',
                    width: 120
                },
                {
                    title: '视频文件',
                    key: 'isvideo',
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
                        let temp = params.row.filename.split(".")
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
                                            if(params.row.isvideo == "N"){
                                                let url = `api/system/resource/download?id=` + params.row.id
                                                window.open(url)
                                            }else{
                                                window.open(params.row.sourceurl)
                                            }
                                            
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
                                            if(params.row.isvideo == "N"){
                                                let url = `api/system/resource/download?id=` + params.row.id
                                                window.open(url)
                                            }else{
                                                window.open(params.row.sourceurl)
                                            }
                                            
                                        }
                                    }
                                }, '下载')
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
            this.company.fileMemo = "",
            this.company.realname = "",
            this.company.resourceType = "",
            this.company.createdate = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        upload(){
            let _self = this
            _self.$bus.emit('upload_material_company',[_self.resourceType,"company"])
        },
        edit(){
            let _self = this
            if(this.local_rows != ""){
                Bus.$emit('Open_material_house_edit', [_self.local_rows, _self.resourceType,'company'])
            }else{
                this.$Message.warning('请选择一行进行编辑！')
            }
        },
        save_rows(row){
            this.local_rows = []
            this.local_rows = row
        },
        getData(){
            this.local_rows = []
            let _self = this
            _self.loading = true
            let url = `api/system/resource/showResourceInfo`
            let config = {
                params:{
                    page:_self.page,
                    pageSize: 10,
                    resourceType: _self.company.resourceType,
                    fileName:  _self.company.fileName,
                    resourceMemo: _self.company.fileMemo,
                    realname: _self.company.realname,
                    bcreatedate:DateFormat(_self.company.createdate[0]),
                    ecreatedate:DateFormat(_self.company.createdate[1]),
                    sortField:"createdate",
                    order: "desc",
                    classify: "depart"              
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                for(let i = 0;i<_self.data.length;i++){
                    if(_self.data[i].createdate == ""||_self.data[i].createdate == null){
                        _self.data[i].createdate = ""
                    }else{
                        _self.data[i].createdate = _self.data[i].createdate.slice(0,10)
                    }
                    if(_self.data[i].sourcetype){
                        _self.data[i].resourceTypeName = _self.resourceType_Map.get(_self.data[i].sourcetype)
                    }
                }
                _self.pageTotal = res.data.data.total
                _self.loading = false
            }
            // 
            this.$Get(url, config, success)
        },
        getDataCenter(){
            let _self = this
            return new Promise(function(resolve, reject){

                let params = "departResourceType"

                function finish(res){
                    _self.resourceType = res.data.data.departResourceType
                    // console.log(_self.resourceType)

                    _self.resourceType_Map = _self.$array2map(_self.resourceType)
                    resolve()
                }

                _self.$GetDataCenter(params, finish)
            })
        }
    },
    created () {
        let _self = this
        this.getDataCenter().then(function(){
            _self.getData()
        }).catch(function(err){
            console.log(err)
        })
    }
}
</script>

