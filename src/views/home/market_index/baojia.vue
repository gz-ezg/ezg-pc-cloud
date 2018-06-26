<template>
    <div>
        <Row style="margin-bottom:10px"><center><h2>亿帐柜报价工具</h2></center></Row>
        <Row>
                <Form ref="searchData" :model="searchData" :label-width="120">
                    <Row :gutter="10">
                        <Col span="22">
                            <FormItem prop="area" label="地区：">
                                <Select transfer v-model="searchData.area" style="width:100%" size="small">
                                    <Option value="gz">广州</Option>
                                    <Option value="sz">深圳</Option>
                                    <Option value="dg">东莞</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="22">
                            <FormItem prop="product" label="报价类型：">
                                <Select transfer v-model="searchData.product" @on-change="show" size="small" style="width:100%">
                                    <Option value="jzbg">鉴证报告</Option>
                                    <Option value="zcpg">资产评估</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="22" v-if="isshow">
                            <FormItem prop="type" label="公司类型：">
                                <Select transfer v-model="searchData.type" @on-change="search" size="small" style="width:100%">
                                    <Option value="yxgs">有限公司</Option>
                                    <Option value="hhgs">合伙公司</Option>
                                    <Option value="fgs">分公司</Option>
                                    <Option value="grdz">个人独资</Option>
                                    <Option value="xggs">香港公司</Option>
                                    <Option value="wzgs">外资公司</Option>
                                    <Option value="bvi">BVI公司</Option>
                                    <Option value="vat">VAT公司</Option>
                                    <Option value="eori">EORI公司</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="18" v-if="!isshow">
                            <FormItem prop="income" label="企业收入（单位:万）：">
                                <Input size="small" v-model="searchData.income" style="width:100%" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter=10>
                        <h3 style="margin-left:40px">参考报价:</h3>
                        <center>  
                            <div>标准报价： {{total}}元  </div>
                            <div v-if="Discount3">3折报价： {{Discount3}} 元</div>
                            <div v-if="Discount4">4折报价： {{Discount4}} 元</div>
                            <div v-if="Discount5">5折报价： {{Discount5}} 元</div>       
                        </center>                     
                    </Row>
                    <FormItem>
                            <Button type="primary" @click="search">报价</Button>
                            <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                    </FormItem>
                </Form>
        </Row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isshow:true,
            searchData:{
                area:'',
                product:'',
                type:'',
                income:""
            },
            total:"0",
            Discount3:"",
            Discount4:"",
            Discount5:""
        }
    },
    methods: {
        show(e){
            if(e == "jzbg"){
                this.isshow = true
            }else{
                this.isshow = false
            }
        },
        reset(){
            this.searchData.area = ""
            this.searchData.product = ""
            this.searchData.type = "" 
            this.searchData.income = ""
            this.total = 0
            this.Discount3 = 0
            this.Discount4 = 0    
            this.Discount5 = 0                    
        },
        search(){
            let _self = this
            if(this.searchData.area == "gz"){
                if(_self.searchData.product == "jzbg"){
                    switch(_self.searchData.type){
                        case "yxgs":
                            _self.total = "698"
                            break;
                        case "hhgs":
                            _self.total =  "698"
                            break;
                        case "fgs":
                            _self.total = "698"
                            break;
                        case "grdz":
                            _self.total = "698"
                            break;
                        case "xggs":
                            _self.total = "5000"
                            break;
                        case "wzgs":
                            _self.total = "暂无"
                            break;
                        case "bvi":
                            _self.total = "3800"
                            break;
                        case "vat":
                            _self.total = "3800"
                            break;
                        case "eori":
                            _self.total = "4300"
                            break;
                        default:
                            _self.total = "暂无"
                    }
                }else if(_self.searchData.product == "zcpg"){
                    if(_self.searchData.income*10000 < 20000){
                        this.total = 2000;   
                    }else if(_self.searchData.income <= 1000000){
                        this.total = _self.searchData.income*10000 * 0.1 ;
                    }else if(_self.searchData.income <= 10000000){
                        this.total = _self.searchData.income*10000 * 0.045+0.55*10000;
                    }else if(_self.searchData.income <= 50000000){
                        this.total = _self.searchData.income*10000 * 0.015+3.55*10000;
                    }else if(_self.searchData.income <= 100000000){
                        this.total = _self.searchData.income*10000 * 0.01+6.05*10000;
                    }else if(_self.searchData.income <= 1000000000){
                        this.total = _self.searchData.income*10000* 0.002+14.5*10000;
                    }else{
                        this.total = _self.searchData.income*10000* 0.0015+19.05*10000;
                    }
                    
                    if(_self.searchData.income * 10000 <= 2 * 10000){
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income * 10000 <= 1000 * 10000){
                        this.Discount5 =  _self.total * 0.5 ;
                        // console.log(this.Discount5)
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 < 5000 * 10000){
                        this.Discount4 =  _self.total * 0.4 ;
                        this.Discount5 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 >= 5000 * 10000){
                        this.Discount3 =  _self.total * 0.3 ;
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                    }else {
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }
                }else{
                    _self.total = "暂无"
                }
            }else if(this.searchData.area == "sz"){
                if(_self.searchData.product == "jzbg"){
                    switch(_self.searchData.type){
                        case "yxgs":
                            _self.total = "698"
                            break;
                        case "hhgs":
                            _self.total =  "698"
                            break;
                        case "fgs":
                            _self.total = "698"
                            break;
                        case "grdz":
                            _self.total = "698"
                            break;
                        case "xggs":
                            _self.total = "5000"
                            break;
                        case "wzgs":
                            _self.total = "暂无"
                            break;
                        case "bvi":
                            _self.total = "3800"
                            break;
                        case "vat":
                            _self.total = "3800"
                            break;
                        case "eori":
                            _self.total = "4300"
                            break;
                        default:
                            _self.total = "暂无"
                    }
                }else if(_self.searchData.product == "zcpg"){
                     if(_self.searchData.income*10000 < 20000){
                        this.total = 2000;   
                    }else if(_self.searchData.income <= 1000000){
                        this.total = _self.searchData.income*10000 * 0.1 ;
                    }else if(_self.searchData.income <= 10000000){
                        this.total = _self.searchData.income*10000 * 0.045+0.55*10000;
                    }else if(_self.searchData.income <= 50000000){
                        this.total = _self.searchData.income*10000 * 0.015+3.55*10000;
                    }else if(_self.searchData.income <= 100000000){
                        this.total = _self.searchData.income*10000 * 0.01+6.05*10000;
                    }else if(_self.searchData.income <= 1000000000){
                        this.total = _self.searchData.income*10000* 0.002+14.5*10000;
                    }else{
                        this.total = _self.searchData.income*10000* 0.0015+19.05*10000;
                    }
                    
                    if(_self.searchData.income * 10000 <= 2 * 10000){
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income * 10000 <= 1000 * 10000){
                        this.Discount5 =  _self.total * 0.5 ;
                        // console.log(this.Discount5)
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 < 5000 * 10000){
                        this.Discount4 =  _self.total * 0.4 ;
                        this.Discount5 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 >= 5000 * 10000){
                        this.Discount3 =  _self.total * 0.3 ;
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                    }else {
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }
                }else{
                    _self.total = "暂无"
                }
            }else if(this.searchData.area == "dg"){
                if(_self.searchData.product == "jzbg"){
                    switch(_self.searchData.type){
                        case "yxgs":
                            _self.total = "698"
                            break;
                        case "hhgs":
                            _self.total =  "698"
                            break;
                        case "fgs":
                            _self.total = "698"
                            break;
                        case "grdz":
                            _self.total = "698"
                            break;
                        case "xggs":
                            _self.total = "5000"
                            break;
                        case "wzgs":
                            _self.total = "暂无"
                            break;
                        case "bvi":
                            _self.total = "3800"
                            break;
                        case "vat":
                            _self.total = "3800"
                            break;
                        case "eori":
                            _self.total = "4300"
                            break;
                        default:
                            _self.total = "暂无"
                    }
                }else if(_self.searchData.product == "zcpg"){
                     if(_self.searchData.income*10000 < 20000){
                        this.total = 2000;   
                    }else if(_self.searchData.income <= 1000000){
                        this.total = _self.searchData.income*10000 * 0.1 ;
                    }else if(_self.searchData.income <= 10000000){
                        this.total = _self.searchData.income*10000 * 0.045+0.55*10000;
                    }else if(_self.searchData.income <= 50000000){
                        this.total = _self.searchData.income*10000 * 0.015+3.55*10000;
                    }else if(_self.searchData.income <= 100000000){
                        this.total = _self.searchData.income*10000 * 0.01+6.05*10000;
                    }else if(_self.searchData.income <= 1000000000){
                        this.total = _self.searchData.income*10000* 0.002+14.5*10000;
                    }else{
                        this.total = _self.searchData.income*10000* 0.0015+19.05*10000;
                    }
                    
                    if(_self.searchData.income * 10000 <= 2 * 10000){
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income * 10000 <= 1000 * 10000){
                        this.Discount5 =  _self.total * 0.5 ;
                        // console.log(this.Discount5)
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 < 5000 * 10000){
                        this.Discount4 =  _self.total * 0.4 ;
                        this.Discount5 = 0;
                        this.Discount3 = 0;
                    }else if(_self.searchData.income*10000 >= 5000 * 10000){
                        this.Discount3 =  _self.total * 0.3 ;
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                    }else {
                        this.Discount5 = 0;
                        this.Discount4 = 0;
                        this.Discount3 = 0;
                    }
                }else{
                    _self.total = "暂无"
                }
            }else{
                _self.total = "暂无"
            }
            console.log(this.total)
        }
    }
}
</script>
