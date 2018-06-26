<template>
    <Card>
        <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <p slot="content">
                            <div  slot="content" @keydown.enter="search">
                                <Form ref="video" :model="video" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="videoName" label="视频名称：">
                                                <Input type="text" v-model="video.videoName" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="videoMemo" label="视频说明：">
                                                <Input type="text" v-model="video.videoMemo" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="videoType" label="视频类别：">
                                                <Select type="text" transfer v-model="video.videoType" placeholder="" size="small">
                                                    <Option v-for="(item,index) in resourceType" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        
                                    </Row>
                                    <!-- <Row :gutter="16">
                                        <Col span="8">
                                            <FormItem prop="realname" label="创建人：">
                                                <Input type="text" v-model="video.realname" placeholder="" size="small">
                                                </Input>
                                            </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem prop="product" label="创建时间：">
                                                <DatePicker transfer type="daterange" placeholder="选择日期" style="width:100%" v-model="video.date" size="small"></DatePicker>
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
                    <Button type="primary" icon="ios-color-wand-outline" @click="upload">录入</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="edit">编辑</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="show">查看</Button>
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
                        current.sync="page"                     
                        show-total
                        show-elevator
                        @on-change="pageChange"
                        placement="top"
                        style="margin-top: 10px"></Page>
            </Row>
        <EditVideo @update="getData" :videoType="resourceType"></EditVideo>
    </Card>
</template>

<script>
import Bus from '../../../components/bus'
import { DateFormat } from '../../../libs/utils'
import EditVideo from './edit_video'

export default {
    components: {
        EditVideo
    },
    data(){
        return{
            resourceType:[],
            resourceType_Map:new Map(),
            video:{
                videoName:"",
                videoMemo:"",
                realname:"",
                videoType:"",
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
                    title: '视频类别',
                    key: 'resourceTypeName',
                    width: 120
                },
                {
                    title: '视频名称',
                    key: 'videoName',
                    width: 280
                },
                {
                    title: '视频说明',
                    key: 'videoMemo',
                    width: 120
                },
                {
                    title: '视频地址',
                    key: 'videoUrl',
                    width: 200,
                    render:(h, params) => {
                            // console.log(params)
                            if(params.row.videoUrl == ''||params.row.videoUrl == null){
                                return ''
                            }else if(params.row.videoUrl.length>24){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.videoUrl.slice(0,24)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.videoUrl)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.videoUrl)
                            }
                        }
                },
                {
                    title: '创建人',
                    key: 'realname',
                    width: 120
                },
                {
                    title: '创建时间',
                    key: 'createDate',
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
                                        console.log(params)
                                        // let url = `api/system/resource/download?id=` + params.row.id
                                        window.open(params.row.videoUrl)
                                    }
                                }
                            }, '点击观看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let _self = this                                        
                                        let url = `api/system/resource/video/manager/del`
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
            this.video.videoName = "",
            this.video.videoMemo = "",
            this.video.realname = "",
            this.video.videoType = "",
            this.video.date = []
            this.getData()
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        upload(){
            let _self = this
            Bus.$emit('edit_video_material_house',["",'录入'])
        },
        edit(){
            let _self = this
            if(this.local_rows != ""){
                Bus.$emit('edit_video_material_house', [_self.local_rows, '编辑'])
            }else{
                this.$Message.warning('请选择一行进行编辑！')
            }
        },
        show(){
            let _self = this
            if(this.local_rows != ""){
                Bus.$emit('edit_video_material_house', [_self.local_rows, '查看'])
            }else{
                this.$Message.warning('请选择一行进行查看！')
            }
        },
        // download(){
        //     let _self = this
        //     if(this.local_rows.length >= '1'){

        //         let temp = []
        //         for(let i = 0;i<_self.local_rows.length;i++){
        //             temp.push(_self.local_rows[i].id)
        //         }
                
        //         let url = `api/system/resource/download/batch?ids=` + temp.join(",")
        //         // console.log(url)
        //         window.open(url)
        //     }else{
        //         this.$Message.warning('请选择至少一行进行下载！')
        //     }
        // },
        save_rows(row){
            // console.log(row)
            this.local_rows = []
            this.local_rows = row
            console.log(this.local_rows)
        },
        getData(){
            this.local_rows = []
            let _self = this
            let url = `api/system/resource/video/manager/list`
            let config = {
                params:{
                    page:_self.page,
                    pageSize: 10,
                    videoType: _self.video.videoType,
                    videoName:  _self.video.videoName,
                    videoMemo: _self.video.videoMemo,
                    realname: _self.video.realname,
                    bcreatedate:DateFormat(_self.video.date[0]),
                    ecreatedate:DateFormat(_self.video.date[1])                    
                }
            }
            this.$http.get(url, config).then(function(res){
                _self.$backToLogin(res)
                if(res.data.msgCode == '40000'){
                    _self.data = res.data.data.rows
                    for(let i = 0;i<_self.data.length;i++){
                        if(_self.data[i].createDate == ""||_self.data[i].createDate == null){
                            _self.data[i].createDate = ""
                        }else{
                            _self.data[i].createDate = _self.data[i].createDate.slice(0,10)
                        }
                        _self.data[i].resourceTypeName = _self.resourceType_Map.get(_self.data[i].videoType)
                        // console.log(_self.data[i].videoTypeName)
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
                    groupCodes:"videoType"
                }
            }
            this.$http.get(url,config).then(function(res){
                _self.$backToLogin(res)                
                _self.resourceType = res.data.data.videoType
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

