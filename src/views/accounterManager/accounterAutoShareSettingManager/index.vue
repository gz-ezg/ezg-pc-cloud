<template>
    <Card>
        <Row style="padding: 0 50px ">
            <Col span="4" style="max-height: 450px">
                <Row style="display: flex" v-for="(item,index) in company_post" :key="index">
                    <Button type="error" style="flex: 1 1 166px;border-radius: 0" v-if="item.id=='11310'" @click="get_account_list(item.id)">{{item.typename}}</Button>
                </Row>
                <Row>
                    <div  style="display: flex">
                        <Button type="primary" v-for="(item,index) in company_post" :key="index" style="flex: 1 1 84px;border-radius: 0" v-if="item.id=='11311'" @click="get_account_list(item.id)">{{item.typename}}</Button>
                        <Button type="info" v-for="(item,index) in company_post" :key="index" style="flex: 1 1 84px;border-radius: 0" v-if="item.id=='11312'" @click="get_account_list(item.id)">{{item.typename}}</Button>
                    </div>
                </Row>
                <Row>
                    <div  style="display: flex">
                        <Button type="warning" v-for="(item,index) in company_post" :key="index" style="flex: 1 1 89px;border-radius: 0" v-if="item.id=='11313'" @click="get_account_list(item.id)">{{item.typename}}</Button>
                        <Button type="success" v-for="(item,index) in company_post" :key="index" style="flex: 1 1 84px;border-radius: 0" v-if="item.id=='11314'" @click="get_account_list(item.id)">{{item.typename}}</Button>
                    </div>
                </Row>
                <Row style="display: flex">
                    <div style="max-height: 355px;overflow-y: scroll;overflow-x: hidden">
                        <Menu ref="user" theme="dark" :active-name="name" style="flex: 1 1 166px;" @on-select="select">
                            <Menu-group>
                                <Menu-item v-for="(item,index) in menu" :key="index" :name="item.ID" >
                                    <Icon type="document-text"></Icon>
                                    {{item.realname}}
                                </Menu-item>
                            </Menu-group>
                        </Menu>
                    </div>
                </Row>
            </Col>
            <Col span="8" style="max-height: 450px">
                <Tabs value="name1" @on-click="change_tab">
                    <TabPane label="产品名称" name="name1">
                        <Table
                                :loading="loading1"
                                highlight-row
                                :show-header="false"
                                @on-row-click="select_product"
                                :columns="productColumns"
                                :data="productData">
                        </Table>
                    </TabPane>
                    <TabPane label="总分" name="name2" >
                        <Form style="margin-left: 80px">
                            <FormItem label="还剩余分值">{{formData.score-formData.use_score}}</FormItem>
                            <FormItem label="本月已分配分值">{{formData.use_score}}</FormItem>
                            <FormItem label="本月最大可分配分值">
                                <Input @on-blur="saveScore" size="small" v-model="formData.score" style="width: 50px"></Input>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span="11" style="max-height: 450px;margin-left: 2px" v-show="!showNum">
            <Table
                    @on-select-all="selectALL"
                    @on-selection-change = "selectChange"
                    ref="selection"
                    :row-class-name="RowClassName"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            </Col>
            <Col span="11" style="max-height: 450px;margin-left: 2px" v-show="showNum">
                <Table
                        :loading="loading"
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="header1"
                        :data="data1"
                ></Table>
            </Col>
        </Row>
        <Row style="display: flex;justify-content: flex-end">
            <Button type="primary" v-if="!showNum" :loading="buttonLoading" @click="save">保存</Button>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading:false,
                buttonLoading:false,
                showNum:false,
                header:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产品名称（分数）',
                        key: 'productName',
                        minWidth: 120,
                    },
                ],
                header1:[
                    {
                        title: '产品名称（数量）',
                        key: 'product_name',
                        minWidth: 120,
                        render:(h,params)=>{
                            return h('div',{},params.row.product_name+'（'+params.row.amount+'）')
                        }
                    },
                ],
                data:[],
                data1:[],
                product:"",
                name:"",
                current_row:"",
                postId:"",
                userId:"",
                menu:[],
                formData:{},
                productColumns:[
                    {
                    title: '产品名称',
                    key: 'product',
                    align:'center'
                },],
                productData:[],
                userProductData:[],
                selectRow:[],
                company_post:[]
            }
        },
        methods:{
            selectALL(e){
                this.selectRow = e
                console.log(e)
            },
            selectChange(e){
                this.selectRow = e
                console.log(e)
            },
            RowClassName(row){
                if (row.product==this.product) {
                    return ""
                } else {
                    return "demo-table-hide-row"
                }
            },
            change_tab(e){
                if (e=='name1'){
                    this.showNum = false
                } else {
                    this.showNum = true
                }
            },
            select_product(e){
                console.log(e)
                this.product = e.product
                // let ids = this.userProductData.map((v)=>{return v.account_product_id})
                // for (let i in this.data){
                //     if (ids.includes(parseInt(this.data[i].id))) {
                //         this.data[i]._checked = true
                //         this.selectRow.push(this.data[i])
                //     }
                // }
                console.log( this.selectRow)
            },
            select(e){
                if (!e){
                    this.userId = ""
                } else {
                    this.userId = parseInt(e)
                }
                this.name = e
                this.$nextTick(()=> {
                    this.$refs.user.updateActiveName()
                })
                this.get_product_list(e)
                this.get_score_data(e)
            },
            save(){
                let _self = this
                _self.buttonLoading = true
                console.log(_self.postId)
                let url = 'api/product/account/updateAccountProduct'
                if (!_self.userId){
                    let config = {
                        postId:_self.postId,
                        productIds:_self.selectRow.map((v)=>{return v.id}).join(",")

                    }

                    function success(res){
                        _self.buttonLoading = false
                        _self.get_product_list(_self.userId)
                    }

                    function fail(res){
                        _self.buttonLoading = false
                    }

                    this.$Post(url, config ,success,fail)
                }
                if (_self.userId){
                    let config = {
                        userId:_self.userId,
                        productIds:_self.selectRow.map((v)=>{return v.id}).join(",")

                    }

                    function success(res){
                        _self.buttonLoading = false
                        _self.get_product_list(_self.userId)
                    }

                    function fail(res){
                        _self.buttonLoading = false
                    }

                    this.$Post(url, config ,success,fail)
                }

            },
            saveScore(){
                let _self = this
                let url = 'api/product/account/updateAccountScore'
                if (!_self.userId){
                    let config = {
                        postId:_self.postId,
                        score:_self.formData.score

                    }

                    function success(res){
                        _self.buttonLoading = false
                        _self.get_score_data(_self.userId)
                    }

                    function fail(res){
                        _self.buttonLoading = false
                    }

                    this.$Post(url, config ,success,fail)
                }
                if (_self.userId){
                    let config = {
                        userId:_self.userId,
                        score:_self.formData.score

                    }

                    function success(res){
                        _self.buttonLoading = false
                        _self.get_score_data(_self.userId)
                    }

                    function fail(res){
                        _self.buttonLoading = false
                    }

                    this.$Post(url, config ,success,fail)
                }

            },
            get_account_list(id){
                let _self = this
                _self.postId = id
                let url = 'api/product/account/getAccountByPostId'
                let config = {
                    params:{
                        postId:id,
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    _self.menu = res.data.data
                    let obj = {ID:"",realname:"全部"}
                    _self.menu.unshift(obj)
                    let id = _self.menu[0].ID
                    _self.name = ""
                    _self.$nextTick(()=> {
                        _self.$refs.user.updateActiveName()
                    })
                    _self.get_product_list(id)
                    _self.get_score_data(id)
                }

                this.$Get(url, config ,success)
            },
            get_product_list(id){
                let _self = this
                _self.userId  = id
                let url = 'api/product/account/productList'
                let config = {
                    params:{
                        userId:id,
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    // _self.menu = res.data.data
                    _self.selectRow = []
                    _self.data = []
                    if (res.data.data.productList.length){
                        _self.productData = res.data.data.productList
                        _self.product = res.data.data.productList[0].product
                        for (let i in res.data.data.productList){
                            let str  = res.data.data.productList[i].items
                            let product = res.data.data.productList[i].product
                            console.log(str)
                            let arr = str.split(",")
                            let arr1 = []

                            console.log(arr)
                            for(let i in arr){
                                let obj = {}
                                let arr2 = arr[i].split("-")
                                console.log(arr2)
                                obj.id = parseFloat(arr2[0])
                                obj.productName = arr2[1]+'('+arr2[2]+')'
                                obj.score = parseFloat(arr2[2])
                                obj.product = product
                                arr1.push(obj)
                            }
                            console.log(arr1)
                            _self.data = _self.data.concat(arr1)
                            console.log(_self.data)
                        }
                    }
                    if (res.data.data.userProductList.length) {
                        _self.userProductData = res.data.data.userProductList
                        let ids = res.data.data.userProductList.map((v)=>{return v.account_product_id})
                        for (let i in _self.data){
                            if (ids.includes(parseInt(_self.data[i].id))) {
                                _self.data[i]._checked = true
                                _self.selectRow.push(_self.data[i])
                            }
                        }
                        console.log( _self.selectRow)
                    }
                }

                this.$Get(url, config ,success)
            },
            get_score_data(id){
                let _self = this
                let url = 'api/product/account/getUserScoreByUserId'
                let config = {
                    params:{
                        userId:id,
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    _self.data1 = res.data.data.pList
                    _self.formData = res.data.data.score
                    if (!_self.formData || !_self.formData.score){
                        _self.formData.score = 0
                    }
                    if (!_self.formData || !_self.formData.use_score){
                        _self.formData.use_score = 0
                    }
                }

                this.$Get(url, config ,success)
            },
            get_data_center(){
                let _self = this
                let params = "company_post"

                function success(res){
                    let {company_post} = res.data.data
                    _self.company_post = company_post[0].children
                    console.log(_self.company_post )
                    // _self.accountChangeItemType = _self.$array2map(account_change_item_type)
                    // console.log(account_change_type, account_change_item_type)
                }

                this.$GetDataCenter(params,success)
            }
        },
        mounted(){
            this.name = ""
            this.$nextTick(()=> {
                this.$refs.user.updateActiveName()
            })
        },
        created() {
            this.get_data_center()
            this.get_account_list(11310)
        }
    }
</script>

<style>
    .ivu-menu-item-group-title{
        display: none;
    }
    .ivu-table .demo-table-show-row td{

    }
    .ivu-table .demo-table-hide-row td{
        display: none;
    }
</style>