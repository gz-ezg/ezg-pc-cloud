<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                    <!-- <Search slot="content"></Search> -->
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="name" label="客户名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.name" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="tel" label="联系方式：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.tel" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="create_resoure">新增</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
        <create-resoure-type @update="get_data" :departAlias="departAlias"></create-resoure-type>
        <update-resoure-type @update="get_data" :departAlias="departAlias"></update-resoure-type>
    </Card>
</template>

<script>
import createResoureType from './create_name'
import updateResoureType from './update_name'

export default {
    name: 'resourelist_index',
    components:{
        createResoureType,
        updateResoureType
    },
    data(){
        return{
            search_model:"",
            loading: false,
            openDetail:false,
            selectRow:{

            },
            seacrhFormInline: {
                companyname: "",
                name: "",
                tel: ""
            },
            page: 1,
            pageSize: 10,
            total: 0,
            data: [],
            departAlias: [],
            departAlias_map: new Map(),
            header: [
                {
                    title: "资料名称",
                    key: "file_type_name",
                    minWidth: 120
                },
                {
                    //  自定义，1
                    title: "数量",
                    key: "plural_name",
                    minWidth: 120
                },
                {
                    title: "部门",
                    key: "use_departs_name",
                    minWidth: 200
                },
                {
                    title: "客户展示",
                    key: "show_customer_name",
                    minWidth: 150
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 250,
                    render: (h, parmas) =>{
                            return h('div',[ 
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.update_type(parmas.row)
                                        }
                                    }
                                },'[ 编辑 ]'),
                                h('Button',{
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(parmas.row)
                                            this.delete_type(parmas.row.id)
                                        }
                                    }
                                },'[ 删除 ]'),
                            ])
                        }
                    }
            ]
        }
    },
    methods:{
        update_type(e){
            let _self = this
            this.$bus.emit("OPEN_UPDATE_RESOURE_TYPE", e)
        },
        delete_type(e){
            let _self = this
            let url = "api/customer/file/type/del"

            let config = {
                id: e
            }

            function success(res){
                _self.get_data()
            }

            function fail(err){
                
            }

            this.$Post(url, config, success, fail)
        },
        open_flow(e){

        },
        //  新增项目
        create_resoure(){
            this.$bus.emit("OPEN_CREATE_RESOURE_TYPE", true)
        },
        get_data(){
            let _self = this
            let url = "api/customer/file/type/list"

            _self.loading = true

            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    companyname: _self.seacrhFormInline.companyname,
                    customername: _self.seacrhFormInline.customername,
                    tel: _self.seacrhFormInline.tel
                } 
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                for(let i = 0; i<_self.data.length; i++){
                    if(_self.data[i].plural == "Y"){
                        _self.data[i].plural_name = "多项"
                    }else{
                        _self.data[i].plural_name = "唯一"
                    }
                    if(_self.data[i].show_customer == "Y"){
                        _self.data[i].show_customer_name = "可见"
                    }else{
                        _self.data[i].show_customer_name = "不可见"
                    }
                    if(_self.data[i].use_departs){
                        let temp = _self.data[i].use_departs.split(",")
                        _self.data[i].use_departs = temp
                        let tempname = []
                        for(let j = 0; j<temp.length;j++){
                            tempname.push(_self.departAlias_map.get(temp[j]))
                        }
                        _self.data[i].use_departs_name = tempname.join(",")
                    }
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject) => {
                let parmas = "departAlias"
                function success(res){
                    _self.departAlias = res.data.data.departAlias
                    _self.departAlias_map = _self.$array2map(_self.departAlias)
                    resolve()
                }
                _self.$GetDataCenter(parmas, success)

            })
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        search(){

        },
        reset(){

        }
    },
    created(){
        let _self = this
        // this.get_data()
        this.get_data_center().then(
            () => {
                _self.get_data()
            }
        )
    }
}
</script>
