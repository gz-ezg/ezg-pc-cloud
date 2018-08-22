<template>
    <Card style="min-width:800px">
        <Row style="margin-bottom:10px;">
            <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        
                            <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="客户名称：" prop="name">
                                            <Input v-model="formValidate.name" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="电话：" prop="tel">
                                            <Input v-model="formValidate.tel" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidate.companyname" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16" style="height:56px">
                                    <Col span="8">
                                        <FormItem label="类型：" prop="type">
                                            <Select transfer v-model="formValidate.type" size="small" @on-change="Search" style="width:100%">
                                                <Option v-for="item in customerDynamicType" :value="item.typecode" :key="item.id">
                                                    {{ item.typename }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="跟进人：" prop="realname">
                                            <Input v-model="formValidate.realname" size="small" style="width:100%"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem style="margin-top:10px">
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                            重置
                                        </Button>
                                    </FormItem>
                                </center>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
                    highlight-row
                    size="small"
                    :columns="columns"
                    :data="data"
                    :loading = "loading"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    style="margin-top: 10px"></Page>
            </Row>
    </Card>
</template>

<script>
export default {
    name:'customerLog_index',
    data(){
        return{
            search_model:"",
            customerDynamicType:[],
            customerDynamicType_Map: new Map(),
            formValidate:{
                realname: "",
                type: "",
                name: "",
                tel: "",
                companyname: ""
            },
            loading: false,
            page: 1,
            pageSize: 10,
            columns: [
                {
                    title:"客户名称",
                    key:"name",
                    width: 120
                },
                {
                    title:"公司名称",
                    key:"companyname",
                    width: 180
                },
                {
                    title:"联系方式",
                    key:"tel",
                    width: 120
                },
                {
                    title:"类型",
                    key: "typename",
                    align: "center",
                    width: 200
                },
                {
                    title:"动态",
                    key:"content",
                    width:360,
                    render: (h, params) => {
                            // console.log(params)
                            if(params.row.content == ''||params.row.content == null){
                                return ''
                            }else if(params.row.content.length>25){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.content.slice(0,25)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:"200px",
                                            whiteSpace: "normal"
                                        }
                                    },[
                                        h('span',params.row.content)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.content)
                            }
                        }
                },
                {
                    title: "变更时间",
                    key:"createdate",
                    width: 150
                },
                {
                    title: "操作人",
                    key: "realname",
                    width: 150
                }
            ],
            data: [],
            pageTotal: new Number()
        }
    },
    methods:{
        Search(){
            this.get_data()
        },
        handleReset(){
            this.$refs['formValidate'].resetFields()
            this.get_data()
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.get_data()
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = `api/customer/dynamic/record/list`
            if(_self.formValidate.type == "all"){
                _self.formValidate.type = ""
            }
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    realname: _self.formValidate.realname,
                    type: _self.formValidate.type,
                    name: _self.formValidate.name,
                    tel: _self.formValidate.tel,
                    companyname: _self.formValidate.companyname,
                    sortField:"createdate"
                }
            }

            function success(res){
                _self.loading = false
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    if(_self.data[i].type){
                        _self.data[i].typename = _self.find_customer_dynamic_type(_self.data[i].type)
                    }
                }
            }

            this.$Get(url, config, success)
        },

        //  根据code转成name
        find_customer_dynamic_type(type){
            let _self = this
            let temp = type.split("-")
            for(let i = 0; i<_self.customerDynamicType.length;i++){
                if(_self.customerDynamicType[i].typecode == temp[0]){
                    if(temp.length>1){
                        for(let j = 0; j<_self.customerDynamicType[i].children.length; j++){
                            if(_self.customerDynamicType[i].children[j].typecode == temp[1]){
                                return _self.customerDynamicType[i].typename + ' - ' + _self.customerDynamicType[i].children[j].typename
                                break
                            }
                        }
                    }
                }
            }
        },
        get_data_center(){
            // let _self = this
            // let params = "customer_dynamic_type"

            // function success(res){
            //     _self.customerDynamicType = res.data.data.customer_dynamic_type
            //     _self.get_data()
            // }

            // this.$GetDataCenter(params, success)

            return new Promise((resolve,reject) => {
                let _self = this
                let params = "customer_dynamic_type"

                function success(res){
                    _self.customerDynamicType = res.data.data.customer_dynamic_type
                    // _self.get_data()
                    resolve()
                }

                this.$GetDataCenter(params, success)
                
            })
        }
    },
    created(){
        this.get_data_center().then(()=>this.get_data())
    }
}
</script>

