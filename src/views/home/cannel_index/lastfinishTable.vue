<template>
    <div>
        <Row :gutter="16">
            <Table
                size="small"
                :columns="header"
                :data="data"
                :total="total"
                @on-row-dblclick="show_detail"            
            ></Table>
            <Page
                style="margin-top:10px"
                :total="total"
                show-total
                show-elevator
                size="small"
                @on-change="pagechange"
            >
            </Page>
        </Row>
        <Modal
            title="交易详情"
            v-model="isshow"
            width="600">
        <Form ref="formValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="公司名称：" prop="companyname" >
                        <Input size="small" v-model="formValidate.companyname" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户名称：" prop="tel">
                        <Input size="small" v-model="formValidate.tel" readonly />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="电话：" prop="tel">
                        <Input size="small" v-model="formValidate.tel" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="订单价格：" prop="neednumber">
                        <Input size="small" v-model="formValidate.neednumber" readonly />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="创建时间：" prop="base_createdate">
                        <Input size="small" v-model="formValidate.base_createdate" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="创建人：" prop="crealname">
                            <Input size="small" v-model="formValidate.crealname" readonly />
                        </FormItem>
                    </Col>
                    </Col>
                </Row>
            </Form>
            <Table
                :columns="detail"
                :data="deal_detail"
                size="small"
            >
            </Table>
            <div slot="footer"></div>
        </Modal>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            formValidate:{
                name:''
            },
            deal_detail:[],
            detail:[
                {
                    title:'产品名',
                    key:'index',
                    width:140
                },
                {
                    title:'产品属性',
                    key:'index',
                    width:140                   
                },
                {
                    title:'产品数量',
                    key:'index',
                    width:140                  
                },
                {
                    title:'销售价格',
                    key:'index',
                    width:140                   
                }
            ],
            isshow:false,
            header:[
                // {
                //     type:'index',
                //     width:60
                // },
                {
                    title:'公司名称',
                    key:'companyname',
                    width:250
                },
                {
                    title:'客户名称',
                    //此字段没有给出
                    key:'name',
                    width:120
                },
                {
                    title:'客户电话',
                    key:'tel',
                    width:120
                },
                {
                    title:'订单价格',
                    key:'neednumber',
                    width:120
                },
                {
                    title:'创建时间',
                    key:'base_createdate',
                    width:120
                },
                {
                    title:'创建人',
                    key:'crealname',
                    width:120
                }
            ],
            data:[],
            page:1,
            pageSize:10,
            total:10
        }
    },
    methods:{
        pagechange(e){
            this.page = e
            this.init()
        },
        init(){
                let _self = this
                let url = '/channel/type/queryUserChannel'

                function doSuccess(re) {
                    let url2 = '/order/list?channelTypeId='+re.data.data[0].id+'&page=' + _self.page + '&pageSize=' + _self.pageSize +'&sortField=createdate'
                    
                    function doSuccess2(re) {
                        let _data = re.data.data
                        // console.log(_data)
                        _self.total = _data.total
                        _self.data = _data.rows
                        var total_prize = 0
                         for(let i = 0;i<_self.data.length;i++){
                            _self.data[i].base_createdate = _self.data[i].base_createdate.slice(0,10)
                            total_prize = total_prize + parseFloat(_self.data[i].neednumber)
                        }
                        var temp = {}
                        temp.companyname = "合计："
                        temp.name = total_prize + '元'
                        _self.data.push(temp)
                        // for (let i = 0; i < _data.length; i++) {
                        //     let _color = ''
                        //     _self.customerT = _self.customerT + parseInt(_data[i].value)

                        //     _self.customerDealSum.push({
                        //         value: _data[i].value,
                        //         name: _data[i].name,
                        //     })
                        // }
                        // _self.getEcharts()
                    }

                    _self.GetData(url2, doSuccess2)
                }

                this.GetData(url, doSuccess)
            },
        show_detail(e){
            console.log(e)
            this.isshow = true
            this.formValidate = e
            // var url = 'api//order/queryListByCustomer?customerId=' + e.id + '&page=1&pageSize=100'
        }
    },
    created(){
        this.init()
    }
}
</script>
