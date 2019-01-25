<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <search-model :data="searchData" @search="search"></search-model>
            </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="information-circled" @click="openCreate=true">新增</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                :loading="loading"
                highlight-row
                size="small"
                border
                @on-row-click="select_row"
                :columns="header"
                :data="data"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-sizer
                show-elevator
                :current.sync="page"
                @on-change="page_change"
                @on-page-size-change="page_size_change"
                style="margin-top: 10px"></Page>
        </Row>
        <create :applyPosition="applyPosition" :applyArea="applyArea" :sextype="sextype" v-if="openCreate" @close="close"></create>
        </Card>
        <update :applyPosition="applyPosition" :applyArea="applyArea" :sextype="sextype" v-if="openUpdate" @close="close" :detail="currentRow"></update>
    </div>
</template>

<script>
import { getResumeList, getDictionary, resumeDel } from './resume.js'
import create from './create'
import update from './update'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: "wechatTemplate_index",
    components:{
        searchModel,
        create,
        update
    },
    data(){
        return {
            currentRow: {},
            loading: true,
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            header: [
                {
                    title: "姓名",
                    key: "name",
                    minWidth: 100
                },
                {
                    title: "电话",
                    key: "tel",
                    minWidth: 150
                },
                {
                    title: "邮箱",
                    key: "email",
                    minWidth: 120
                },
                {
                    title: "性别",
                    key: "sexname",
                    minWidth: 80,
                    render: (h, params) => {
                        let sexname = ""
                        if(params.row.sex == 0){
                            sexname = "男"
                        }else{
                            sexname = "女"
                        }
                        return h('div', sexname)
                    }
                },
                {
                    title: "年龄",
                    key: "age",
                    minWidth: 90,
                },
                {
                    title: "城市",
                    key: "cityName",
                    minWidth: 80
                },
                {
                    title: "岗位",
                    key: "postName",
                    minWidth:120
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    minWidth:120,
                    render: (h, params) => {
                        let temp = params.row.createdate
                        if(temp){
                            temp = temp.slice(0,10)
                        }
                        return h('div',{},temp)
                    }
                },
                {
                    title: "备注",
                    key: "memo",
                    minWidth: 150
                },
                {
                    title:"下载",
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {
                                    margin: "auto"
                                },
                                on: {
                                    click: ()=>{
                                        // console.log(params.row)
                                        this.currentRow = params.row
                                        this.openUpdate = true
                                    }
                                }
                            },'编辑'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px'
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
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px'
                                }
                            }, [
                                h('Poptip', {
                                    props: {
                                        transfer: true,
                                        confirm: true,
                                        title: '您确定要删除此记录？',
                                    },
                                    on: {
                                        'on-ok': async ()=>{
                                            let config = {
                                                id: params.row.id,
                                            }
                                            let { status, data } = await resumeDel(config)
                                            if(status){
                                                this.get_data()
                                            }
                                        },
                                    }
                                }, '删除')
                            ])
                        ])
                    }
                }
            ],
            searchData: [
                {
                    label: "姓名：",
                    key: "name",
                    type: "input"
                },
                {
                    label: "年龄：",
                    key: "age",
                    type: "input"
                },
                {
                    label: "性别：",
                    key: "sex",
                    type: "select",
                    data: []
                },
                {
                    label: "电话：",
                    key: "tel",
                    type: "input",
                },
                {
                    label: "岗位：",
                    key: "post",
                    type: "select",
                    data: []
                },
                {
                    label: "城市：",
                    key: "city",
                    type: "select",
                    data: []
                },
                {
                    label: "创建时间",
                    key: "createdate",
                    type: "datePicker"
                }
            ],
            searchForm: {},
            applyPosition: [],
            applyPositionMap: new Map(),
            applyArea: [],
            applyAreaMap: new Map(),
            sextype: [],
            sextypeMap: new Map(),
            openCreate: false,
            openUpdate: false
        }
    },
    methods: {
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: this.pageSize
                }
            }

            Object.assign(config.params, this.searchForm)

            try {
                let { total, rows } = await getResumeList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    item.cityName = this.applyAreaMap.get(item.city)
                    item.postName = this.applyPositionMap.get(item.post)
                    return item
                })
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        search(item){
            delete item.createdate
            this.page = 1
            Object.assign(this.searchForm, item)
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_data()
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        async get_data_center(){
            let params = "applyPosition,applyArea,sextype"
            let { applyPosition,applyArea,sextype } = await getDictionary(params)
            this.applyPosition = applyPosition
            this.applyArea = applyArea
            this.sextype = sextype
            this.applyPositionMap = this.$array2map(applyPosition)
            this.applyAreaMap = this.$array2map(applyArea)
            this.sextypeMap = this.$array2map(sextype)
            this.searchData[2].data = sextype
            this.searchData[4].data = applyPosition
            this.searchData[5].data = applyArea
        },
        close(e){
            this.openUpdate = false
            this.openCreate = false
            if(e){
                this.get_data()
            }
        }
    },
    async created(){
        await this.get_data_center()
        await this.get_data()
    }
}
</script>
