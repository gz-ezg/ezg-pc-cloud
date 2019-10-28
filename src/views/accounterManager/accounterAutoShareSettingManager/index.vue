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
                        <Menu theme="dark" value="1" style="flex: 1 1 166px;" @on-select="select">
                            <Menu-group v-for="(item,index) in menu" :key="index">
                                <Menu-item :name="item.ID" >
                                    <Icon type="document-text"></Icon>
                                    {{item.realname}}
                                </Menu-item>
                            </Menu-group>
                        </Menu>
                    </div>
                </Row>
            </Col>
            <Col span="8" style="max-height: 450px">
                <Tabs value="name1">
                    <TabPane label="产品名称" name="name1">
                        <Table
                                :loading="loading1"
                                highlight-row
                                :show-header="false"
                                :row-class-name="rowClassName"
                                @on-row-click="select_product"
                                :columns="productColumns"
                                :data="productData">
                        </Table>
                    </TabPane>
                    <TabPane label="总分" name="name2" style="display: flex;justify-content: center">
                        <Form>
                            <FormItem label="还剩余分值"></FormItem>
                            <FormItem label="本月已分配分值"></FormItem>
                            <FormItem label="本月最大可分配分值"></FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span="11" style="max-height: 450px;margin-left: 2px">
                <Table
                        @on-select-all="selectALL"
                        @on-selection-change = "selectChange"
                        :loading="loading"
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="header"
                        :data="data"
                ></Table>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading:false,
                header:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产品名称（分数）',
                        key: 'productName',
                        minWidth: 120
                    },
                ],
                data:[],
                current_row:"",
                menu:[],
                productColumns:[
                    {
                    title: '产品名称',
                    key: 'product',
                    align:'center'
                },],
                productData:[],
                selectRow:[],
                company_post:[]
            }
        },
        methods:{
            selectALL(e){
                this.selectRow = e
            },
            selectChange(e){
                this.selectRow = e
            },
            select_product(e){
                let str  = e.items
                let arr = str.split(",")
                let arr1 = []
                for(let i in arr){
                    let obj = {}
                    let arr2 = arr[i].split("-")
                    obj.id = arr2[0]
                    obj.productName = arr2[1]+'('+arr2[2]+')'
                    obj.score = arr2[2]
                    arr1.push(obj)
                }
                this.data = arr1
            },
            select(e){
                this.get_product_list(e)
            },
            get_account_list(id){
                let _self = this
                let url = 'api/product/account/getAccountByPostId'
                let config = {
                    params:{
                        postId:id,
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    _self.menu = res.data.data
                    let id = _self.menu[0].ID
                    _self.get_product_list(id)
                }

                this.$Get(url, config ,success)
            },
            get_product_list(id){
                let _self = this
                let url = 'api/product/account/productList'
                let config = {
                    params:{
                        userId:id,
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    // _self.menu = res.data.data
                    _self.productData = res.data.data.productList
                    let str  = res.data.data.productList[0].items
                    let id = res.data.data.userProductList[0].account_product_id
                    console.log(str)
                    let arr = str.split(",")
                    let arr1 = []

                    console.log(arr)
                    for(let i in arr){
                        let obj = {}
                        let arr2 = arr[i].split("-")
                        console.log(arr2)
                        obj.id = arr2[0]
                        obj.productName = arr2[1]+'('+arr2[2]+')'
                        obj.score = arr2[2]
                        arr1.push(obj)
                    }
                    console.log(arr1)
                    _self.data = arr1
                    for (let i in _self.data){
                        if (_self.data[i].id==id) {
                            _self.selectRow.push(_self.data[i])
                        }
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
</style>