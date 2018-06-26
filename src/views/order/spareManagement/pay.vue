// <template>
//     <div>
//         <Modal
//             v-model="pay"
//             title="补交/审批"
//             :width="1300"
//             @on-ok="ok"
//             @on-cancel="cancel">
//             <Form ref="formValidate" :model="formValidate" :label-width="90">
//                 <Row :gutter="16">
//                     <Col span="8">
//                         <FormItem label="归属公司" prop="companyName">
//                             <Input size="small" v-model="formValidate.CompanyName" disabled/>
//                         </FormItem>
//                     </Col>
//                     <Col span="8">
//                         <FormItem label="归属客户" prop="name">
//                             <Input size="small" v-model="formValidate.name" disabled/>
//                         </FormItem>
//                     </Col>
//                     <Col span="8">
//                         <FormItem label="余款总额" prop="paynumber">
//                             <Input size="small" v-model="formValidate.paynumber" disabled/>
//                         </FormItem>
//                     </Col>
//                 </Row>
//                 <Row :gutter="16">
//                     <Col span="8">
//                         <FormItem label="已补金额" prop="payamount">
//                             <Input size="small" v-model="formValidate.payamount" disabled/>
//                         </FormItem>
//                     </Col>
//                     <Col span="8">
//                         <FormItem label="未补金额" prop="performanceMoney">
//                             <Input size="small" v-model="formValidate.performanceMoney" disabled/>
//                         </FormItem>
//                     </Col>
//                     <Col span="8">
//                         <FormItem label="待审批金额" prop="nodeducttotalmoney">
//                             <Input size="small" v-model="formValidate.nodeducttotalmoney" disabled/>
//                         </FormItem>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Collapse v-model="detail">
//                         <Panel name="1">
//                             补交明细
//                             <div slot="content">
//                                 <Row>
//                                     <ButtonGroup>
//                                         <Button type="primary" icon="plus" @click="confirm = true">确认收款</Button>
//                                         <Button type="primary" icon="edit" @click="bujiao = true">补交费用</Button>
//                                         <Button type="primary" icon="edit" @click="edit = true">修改</Button>                                        
//                                     </ButtonGroup>
//                                 </Row>
//                                 <Row style="margin-top: 10px;">
//                                     <Table border :columns="header" :data="after_money"></Table>
//                                 </Row>
//                             </div>
//                         </Panel>
//                     </Collapse>
//                 </Row>
//             </Form>
//         </Modal>
//         <Modal 
//             v-model="bujiao"
//             width="400"
//             title="添加记录"
//         >
//             <Form ref="bujiao_validate" :rules="bujiao_ruleValidate" :model="bujiao_validate" :label-width="90">
//                 <Row :gutter="16">
//                     <FormItem label="补交金额:" prop="pay_money" >
//                         <Input size="small" v-model="bujiao_validate.pay_money" style="width:200px" />
//                     </FormItem>
//                 </Row>
//                 <Row :gutter="16">
//                     <FormItem label="缴费渠道:" prop="pay_type">
//                         <Input size="small" v-model="bujiao_validate.pay_type" style="width:200px" />
//                     </FormItem>
//                 </Row>
//                 <Row :gutter="16">
//                     <FormItem label="补交金额:" prop="pay_date">
//                         <DatePicker type="date" placeholder="Select date" v-model="bujiao_validate.pay_date" style="width:200px"></DatePicker>
//                     </FormItem>
//                 </Row>
//             </Form>
//         </Modal>
//         <Modal 
//             v-model="edit"
//             title="修改"
//         >

//         </Modal>
//     </div>
// </template>

// <script>
// import Bus from './bus'

// export default {
//     data(){
//         return{
//             pay:false,
//             detail:'',
//             bujiao:false,
//             confirm:false,
//             edit:false,
//             // 补交明细
//             after_money:[],
//             id:'',
//             // 补交的模型
//             bujiao_validate:{
//                 pay_money:'',
//                 pay_type:'',
//                 pay_date:''
//             },
//             bujiao_ruleValidate:{},
//             // 上方表格的模型
//             formValidate:{
//                 CompanyName:'',
//                 name:'',
//                 paynumber:'',
//                 payamount:'',
//                 nodeducttotalmoney:'',
//                 performanceMoney:''
//             },
//             // 缴费明细的表头
//             header: [
//                     {
//                         title: '补交金额',
//                         key: 'age',
//                     },
//                     {
//                         title: '当前状态',
//                         key: 'age',
//                     },
//                     {
//                         title: '缴费渠道',
//                         key: 'age',
//                     },
//                     {
//                         title: '缴费时间',
//                         key: 'age',
//                     },
//                     {
//                         title: '财务确认时间',
//                         key: 'age',
//                     },
//                     {
//                         title: '确认收款人',
//                         key: 'age',
//                     },
//                 ]
//         }
//     },
//     methods:{
//         ok(){},
//         cancel(){},
//         init(){
//             var _that = this
//             Bus.$on('select',(e)=>{
//                 _that.pay = true
//                 _that.id = e
//                 this.get_pay()
//             })
//         },
//         get_pay(){
//             var _that = this
//             var url = 'http://localhost:8089/api/order/detail/37808'
//             this.$http.get(url).then(function(res){
//                 console.log(res.data.data)
//                 _that.formValidate.CompanyName = res.data.data.CompanyName
//                 _that.formValidate.name = res.data.data.name
//                 _that.formValidate.paynumber = res.data.data.paynumber
//                 _that.formValidate.payamount = res.data.data.payamount
//                 _that.formValidate.nodeducttotalmoney = res.data.data.nodeducttotalmoney
//                 _that.formValidate.performanceMoney = res.data.data.performanceMoney
//             })
//         }
//     },
//     created:function(){
//         this.init()
        
//     }
// }
// </script>

