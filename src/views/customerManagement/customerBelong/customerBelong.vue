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
                                   <FormItem>
                                <Button type="primary" @click.native="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                                </Col>
                            </Row>
                            
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
                v-show="isShow"
            >
            </Table>
            <!-- <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page> -->
        </Row>
        <create-resoure-type @update="get_data" :departAlias="departAlias"></create-resoure-type>
        <update-resoure-type @update="get_data" :departAlias="departAlias"></update-resoure-type>
    </Card>
</template>

<script>
import createResoureType from './create_name'
import updateResoureType from './update_name'
import {getCompanyDetailByCompanyName} from '@/api/customerBelong'

export default {
    name: 'customerBelong_index',
    components:{
        createResoureType,
        updateResoureType
    },
    data(){
        return{
            search_model:"1",
            loading: false,
            openDetail:false,
            isShow:false,
            selectRow:{

            },
            seacrhFormInline: {
                companyname: "",
                name: "",
                followby:"",
                ifPool:""
            },
            page: 1,
            pageSize: 5,
            total: 0,
            data: [],
            departAlias: [],
            // departAlias_map: new Map(),
            header: [
                {
                    title: "公司名称",
                    key: "CompanyName",
                    minWidth: 120
                },
                {
                    //  自定义，1
                    title: "客户名称",
                    key: "NAME",
                    minWidth: 120
                },
                {
                    title: "跟进人",
                    key: "followby",
                    minWidth: 200
                },
                {
                    title: "是否在公海池",
                    key: "ifPool",
                    minWidth: 150
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
                    sortField: 'id'
                    // departname: _self.seacrhFormInline.departname,
                    // file_type_name: _self.seacrhFormInline.file_type_name,
                    // keeperrealname: _self.seacrhFormInline.keeperrealname,
                    // file_status: _self.seacrhFormInline.file_status
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
        
           getCompanyDetailByCompanyName({
               followby:this.seacrhFormInline.followby,
               name:this.seacrhFormInline.name,
               companyName:this.seacrhFormInline.companyname,
               ifPool:this.seacrhFormInline.ifPool
           }).then(res=>{
               console.log(res)
               this.data = res
               if(this.data.length != 0){
                  this.isShow = true;
               }
               followby:this.data.followby
               NAME:this.data.NAME
               CompanyName:this.data.companyName
               ifPool:this.data.ifPool
           })
        },
        reset(){
        this.isShow = false;
          this.seacrhFormInline = []
           followby:''
            NAME:''
            CompanyName:''
            ifPool:''
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
