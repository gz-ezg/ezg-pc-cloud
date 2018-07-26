<template>
    <div>
        <Table
            size="small"
            :columns="header"
            :data="data"
            :total="total"
            @on-row-dblclick="show_detail"
        ></Table>
        <Page
            :total="total"
            show-elevator
            size="small"
            @page-change="pagechange"
        >
        </Page>        
        <Modal
            title="交易详情"
            v-model="isshow"
            width="600">
        <Form ref="formValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="客户名称：" prop="NAME" >
                        <Input size="small" v-model="formValidate.NAME" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话：" prop="TEL">
                        <Input size="small" v-model="formValidate.TEL" readonly />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="固话：" prop="fixedPhone">
                        <Input size="small" v-model="formValidate.fixedPhone" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ：" prop="qq">
                        <Input size="small" v-model="formValidate.qq" readonly />
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="微信：" prop="weixin">
                        <Input size="small" v-model="formValidate.weixin" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱：" prop="email">
                            <Input size="small" v-model="formValidate.email" readonly />
                        </FormItem>
                    </Col>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="区域：" prop="AREA">
                        <Input size="small" v-model="formValidate.AREA" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户状态：" prop="customerType">
                            <Input size="small" v-model="formValidate.customerType" readonly />
                        </FormItem>
                    </Col>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="12">
                    <FormItem label="客户等级：" prop="importlevel">
                        <Input size="small" v-model="formValidate.importlevel" readonly />
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="标签：" prop="labels">
                            <Input size="small" v-model="formValidate.labels" readonly type="textarea" />
                        </FormItem>
                    </Col>
                    </Col>
                </Row>
                <Row :gutter="16" style="margin-bottom:5px">
                    <Col span="24">
                    <FormItem label="备注：" prop="backup">
                        <Input size="small" v-model="formValidate.backup" readonly type="textarea" rows="7" />
                    </FormItem>
                    </Col>
                    
                </Row>
            </Form>
            <div slot="footer"></div>
            
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            formValidate:{
            },
            isshow:false,
            header:[
                {
                    type:'index',
                    width:70
                },
                {
                    title:'客户名称',
                    key:'NAME',
                    width:100
                },
                {
                    title:'联系方式',
                    key:'TEL',
                    width:150
                },
                {
                    title:'客户状态',
                    key:'customerType',
                    width:100
                },
                {
                    title:'地区',
                    key:'AREA',
                    width:80
                },
                {
                    title:'销售',
                    key:'followbyname',
                    width:100
                },
                {
                    title:'创建人',
                    key:'createbyname',
                    width:100
                },
                {
                    title:'创建时间',
                    key:'CREATEDATE',
                    width:100
                }
            ],
            data:[],
            page:1,
            pageSize:10,
            total:'',
            area:[],
            cluesource:[],
            customerType:[],
            impLevel:[],
            sf_yn:[],
            area:[],
            customerTypeArr:[],
            labelTotal:[]
        }
    },
    methods:{
        init(){
                let _self = this
                let url = '/channel/type/queryUserChannel'

                function doSuccess(re) {
                    let url2 = '/customer/list?channelTypeId='+re.data.data[0].id+'&page=' + _self.page + '&pageSize=' + _self.pageSize +'&sortField=createdate'
                    
                    function doSuccess2(re) {
                        let _data = re.data.data
                        // console.log(_data)
                        _self.total = _data.total
                        _self.data = _data.rows
                        for(let i = 0;i<_self.data.length;i++){
                            _self.data[i].CREATEDATE = _self.data[i].CREATEDATE.slice(0,10)
                            _self.data[i].AREA =  _self.findAreaText(_self.data[i].AREA)
                            _self.data[i].importlevel =  _self.findImpLevel(_self.data[i].importlevel)
                            _self.data[i].customerType= _self.findCustomerType(_self.data[i].customerType)
                            // console.log(_self.data[i].labels)
                            if(_self.data[i].labels != ""){
                                var temp = []
                            temp = _self.data[i].labels.split(',')
                            _self.data[i].labels = ''
                            var labelTemp = []
                            for(let j = 0;j<temp.length;j++){
                                // console.log('111111111111111')
                                for(let k = 0;k<_self.labelTotal.length;k++){
                                // console.log('11111222222')                                    
                                    if(_self.labelTotal[k].id == temp[j]){
                                // console.log('11111113333')                                        
                                        labelTemp.push(_self.labelTotal[k].labelname)
                                    }
                                }   
                            }
                            _self.data[i].labels = labelTemp
                            }
                            
                        }
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

        pagechange(e){
            this.page = e
            this.init()
        },
        show_detail(e){
            // console.log(e)
            this.isshow = true
            this.formValidate = e
        },
        getDataCenter(){
            var _self = this;
            let params = "customerTypes,cluesources,customerrating,area,sf_yn"
            function finish(res){
                    var temp = res.data.data;
                    _self.area = temp.area;
                    _self.cluesource = temp.cluesources;
                // console.log(temp.customerType)
                    _self.customerType = temp.customerTypes;
                    _self.impLevel = temp.customerrating;
                    _self.sf_yn = temp.sf_yn;
                    _self.area.reverse()
                    // 二级联动改一级
                    _self.customerTypeArr = []
                    for(let i = 0;i<_self.customerType.length;i++){
                    var temp = {}
                    if(_self.customerType[i].children != null){
                        for(let j = 0;j<_self.customerType[i].children.length; j++ ){
                        temp = {}
                        temp.id = _self.customerType[i].children[j].id
                        temp.typecode = _self.customerType[i].children[j].typecode
                        temp.typename = _self.customerType[i].children[j].typename
                        temp.pid = _self.customerType[i].children[j].pid
                        temp.ptypename = _self.customerType[i].typename
                        temp.ptypecode = _self.customerType[i].typecode
                        _self.customerTypeArr.push(temp)
                        }
                    }else{    
                        temp = {}
                        temp.id = _self.customerType[i].id
                        temp.typecode = _self.customerType[i].typecode
                        temp.ptypename = _self.customerType[i].typename
                        temp.typename = ''
                        temp.pid = 0
                        _self.customerTypeArr.push(temp)
                    }
                    //  修改成规定的模型
                    _self.customerType[i].value = _self.customerType[i].id
                    _self.customerType[i].label = _self.customerType[i].typename
                    if(_self.customerType[i].children != null){
                        
                        for(let j = 0;j<_self.customerType[i].children.length; j++ ){

                        _self.customerType[i].children[j].value= _self.customerType[i].children[j].id
                        _self.customerType[i].children[j].label = _self.customerType[i].children[j].typename

                        }
                    }
                }
           }

           this.$GetDataCenter(params,finish)
                // var url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=customerTypes,cluesources,customerrating,area,sf_yn`;
                // this.$http.get(url).then(function(res) {
                //     // console.log(res.data.data)
                //     var temp = res.data.data;
                //     _self.area = temp.area;
                //     _self.cluesource = temp.cluesources;
                //     // console.log(temp.customerType)
                //     _self.customerType = temp.customerTypes;
                //     _self.impLevel = temp.customerrating;
                //     _self.sf_yn = temp.sf_yn;
                //     _self.area.reverse()
                //     // 二级联动改一级
                //     _self.customerTypeArr = []
                //     for(let i = 0;i<_self.customerType.length;i++){
                //     var temp = {}
                //     if(_self.customerType[i].children != null){
                //         for(let j = 0;j<_self.customerType[i].children.length; j++ ){
                //         temp = {}
                //         temp.id = _self.customerType[i].children[j].id
                //         temp.typecode = _self.customerType[i].children[j].typecode
                //         temp.typename = _self.customerType[i].children[j].typename
                //         temp.pid = _self.customerType[i].children[j].pid
                //         temp.ptypename = _self.customerType[i].typename
                //         temp.ptypecode = _self.customerType[i].typecode
                //         _self.customerTypeArr.push(temp)
                //         }
                //     }else{    
                //         temp = {}
                //         temp.id = _self.customerType[i].id
                //         temp.typecode = _self.customerType[i].typecode
                //         temp.ptypename = _self.customerType[i].typename
                //         temp.typename = ''
                //         temp.pid = 0
                //         _self.customerTypeArr.push(temp)
                //     }
                //     //  修改成规定的模型
                //     _self.customerType[i].value = _self.customerType[i].id
                //     _self.customerType[i].label = _self.customerType[i].typename
                //     if(_self.customerType[i].children != null){
                        
                //         for(let j = 0;j<_self.customerType[i].children.length; j++ ){

                //         _self.customerType[i].children[j].value= _self.customerType[i].children[j].id
                //         _self.customerType[i].children[j].label = _self.customerType[i].children[j].typename

                //         }
                //     }
                //     }    
                // })
            },
            getAllLabel(){
                var _self = this
                this.$http.get('/api/system/label/list?page=1&pageSize=1000').then(function(LabelsAllRes){
                    for (let i = 0; i < LabelsAllRes.data.data.rows.length; i++) {
                            let areaObj = {}
                            areaObj.id = LabelsAllRes.data.data.rows[i].id
                            areaObj.labelname = LabelsAllRes.data.data.rows[i].labelName
                            areaObj.labelcode = LabelsAllRes.data.data.rows[i].labelCode
                            areaObj.labelmemo = LabelsAllRes.data.data.rows[i].labelMemo
                            areaObj.channelflag = (LabelsAllRes.data.data.rows[i].channelFlag == '0' ? '否' : '是')
                            areaObj._checked = ''
                            _self.labelTotal.push(areaObj)
                        }
                })
            },
            findImpLevel(temp) {
                var _self = this;
                for (let i = 0; i < _self.impLevel.length; i++) {
                    if (_self.impLevel[i].typecode == temp && temp != "") {
                    return _self.impLevel[i].typename;
                    }
                }
            },
            findCustomerType(temp) {
                var _self = this;
                for (let i = 0; i < _self.customerTypeArr.length; i++) {
                    if (_self.customerTypeArr[i].id == temp && temp != "") {
                    return _self.customerTypeArr[i].ptypename
                    }
                }
            },
            findAreaText(temp) {
                var _self = this;
                for (let i = 0; i < _self.area.length; i++) {
                    if (_self.area[i].typecode == temp && temp != "") {
                    return _self.area[i].typename;
                    }
                }
            },
    },
    created(){
        var _self = this
        this.getDataCenter()
        this.getAllLabel()
        setTimeout(_self.init(), 1000)
    }
}
</script>
