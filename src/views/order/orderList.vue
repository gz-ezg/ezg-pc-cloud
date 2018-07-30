<style>
    /*@import '../../../libs/easyUI/demo.css';*/
    @import '../../libs/easyUI/easyui.css';
    @import '../../libs/easyUI/icon.css';
    @import './css/productDetail.min.css';
    .ivu-table .demo-table-error-row td {
        background-color: #ff6600;
        color:#000;
    }
    .datagrid-row {
        height: 42px;
    }
    .datagrid-cell {
        line-height: 34px;
    }
</style>
<style lang="less">
    @import '../my-components/area-linkage/area-linkage.less';
    @import '../../styles/common.less';
</style>
<template>
    <div>
        
        <!-- @on-ok="ok4('formValidate')" -->
        <Modal
                v-model="orderAdd"
                title="录入"
                width="80%"
                :loading="loading"
                :mask-closable="false"                
                @on-ok="beforeAddOrder=true"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidate.CompanyName" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="NAME">
                        <Input size="small" v-model="formValidate.NAME" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"  prop="date">
                        <DatePicker format="yyyy-MM-dd" type="date" style="width:100%" v-model="formValidate.date"  @on-change="getStartTime" size="small"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="zongjia">
                        <Input size="small" v-model="formValidate.zongjia" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="orderPayNumber">
                        <Input size="small" v-model="formValidate.orderPayNumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="payDir">
                        <Select transfer v-model="formValidate.payDir" size="small">
                            <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                            <!-- <Option value="gszfb">公司支付宝</Option>
                            <Option value="gh">工行</Option>
                            <Option value="zh">招行</Option>
                            <Option value="wx">微信公众号</Option>
                            <Option value="gw">官网</Option>
                            <Option value="other">其他</Option>
                            <Option value="cash">现金</Option>
                            <Option value="jhang">建行</Option>
                            <Option value="nsh">农商行</Option>
                            <Option value="tb">淘宝</Option>
                            <Option value="zgrzh">转个人账户</Option>
                            <Option value="dgzfb">东莞支付宝</Option>
                            <Option value="szgh">深圳工行</Option> -->
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="提成总额" prop="ticheng">
                        <Input size="small" v-model="formValidate.ticheng" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="performanceMoney">
                        <Input size="small" v-model="formValidate.performanceMoney" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidate.customername"/>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row :gutter="16">
                    <!-- <Col span="8">
                    <FormItem label="服务开始税期" prop="serviceBeginDate">
                        <DatePicker type="month" width="190" v-model="formValidate.serviceBeginDate" @on-change="getStartTime2"></DatePicker>
                    </FormItem>
                    </Col> -->
                    <Col span="8">
                    <FormItem label="国地税报道" prop="GDSreport">
                        <Select transfer v-model="formValidate.GDSreport" :disabled="iscycle" size="small">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="formValidate.isornotkp" size="small" style="width:100%">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem label="选择产品" >
                        <Button type="primary" icon="plus" @click="orderAddProducts()">新增</Button>
                        <Button type="primary" icon="plus" @click="removeRows()">删除</Button>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList"></table>
            </Form>
        </Modal>
        <Modal
            v-model="beforeAddOrder"
            title="新增订单提示"
            width="500"
            :mask-closable="false"           
        >
            <center>
                <h3>优惠是否有审批？</h3>
                <h3>合同是否已给行政？</h3>
                <h3>收款渠道和时间是否核对？</h3>
                <h3>加急产品需要选行政哦！</h3>
            </center>
            <div slot="footer">
                <Button type="primary" @click="ok4('formValidate')" :loading="add_order_button_loading">提交订单</Button>
            </div>
        </Modal>
        <Modal
                v-model="deleteOrder"
                title="请填写作废原因"
                :mask-closable="false"                
                @on-cancel="cancel">
            <Input type="textarea" :rows="4" placeholder="Enter something..."></Input>
        </Modal>
        <Modal
                v-model="detailCustomer"
                title="查看"
                :mask-closable="false"                
                width="80%"
                @on-ok="cancel('formValidateDetail')"
                @on-cancel="cancel('formValidateDetail')">
            <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidateDetail.CompanyName" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="NAME">
                        <Input size="small" v-model="formValidateDetail.NAME" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"  prop="date">
                        <Input size="small" v-model="formValidateDetail.date" disabled/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="zongjia">
                        <Input size="small" v-model="formValidateDetail.zongjia" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="orderPayNumber">
                        <Input size="small" v-model="formValidateDetail.orderPayNumber" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="payDir">
                        <Select transfer v-model="formValidateDetail.payDir" disabled size="small" style="width:100%">
                            <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                            <!-- <Option value="gszfb">公司支付宝</Option>
                            <Option value="gh">工行</Option>
                            <Option value="zh">招行</Option>
                            <Option value="wx">微信公众号</Option>
                            <Option value="gw">官网</Option>
                            <Option value="other">其他</Option>
                            <Option value="cash">现金</Option>
                            <Option value="jhang">建行</Option>
                            <Option value="nsh">农商行</Option>
                            <Option value="tb">淘宝</Option>
                            <Option value="zht">中衡通</Option>
                            <Option value="jt">锦涛</Option>
                            <Option value="wjw">魏建伟</Option>
                            <Option value="zgrzh">转个人账户</Option>
                            <Option value="dgzfb">东莞支付宝</Option>
                            <Option value="szgh">深圳工行</Option> -->
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="提成总额" prop="ticheng">
                        <Input size="small" v-model="formValidateDetail.ticheng" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="performanceMoney">
                        <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidateDetail.customername" disabled/>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row :gutter="16">
                    <!-- <Col span="8">
                    <FormItem label="服务开始税期" prop="serviceBeginDate">
                        <Input size="small" v-model="formValidateDetail.serviceBeginDate" disabled/>
                    </FormItem>
                    </Col> -->
                    <Col span="8">
                    <FormItem label="国地税报道" prop="GDSreport">
                        <Select transfer v-model="formValidateDetail.GDSreport" disabled size="small" style="width:100%">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="formValidateDetail.isornotkp" size="small" style="width:100%" disabled>
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList3"></table>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="eaditOrder"
                title="编辑"
                :mask-closable="false"                
                width="80%"
                :loading="loading2"
                @on-ok="editPostFrom('formValidateEadit')"
                @on-cancel="cancel('formValidateEadit')">
            <Form ref="formValidateEadit" :rules="ruleValidateEadit"  :model="formValidateEadit" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidateEadit.CompanyName" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="NAME">
                        <Input size="small" v-model="formValidateEadit.NAME" @on-focus="getCompany" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"   prop="date">
                        <DatePicker size="small" format="yyyy-MM-dd" type="date" style="width: 100%" v-model="formValidateEadit.date" @on-change="getStartTime3"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="zongjia">
                        <Input size="small" v-model="formValidateEadit.zongjia" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="orderPayNumber">
                        <Input size="small" v-model="formValidateEadit.orderPayNumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="payDir">
                        <Select transfer v-model="formValidateEadit.payDir" style="width:100%" size="small">
                            <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                            
                            <!-- <Option value="gszfb">公司支付宝</Option>
                            <Option value="gh">工行</Option>
                            <Option value="zh">招行</Option>
                            <Option value="wx">微信公众号</Option>
                            <Option value="gw">官网</Option>
                            <Option value="other">其他</Option>
                            <Option value="cash">现金</Option>
                            <Option value="jhang">建行</Option>
                            <Option value="nsh">农商行</Option>
                            <Option value="tb">淘宝</Option>
                            <Option value="zgrzh">转个人账户</Option>
                            <Option value="dgzfb">东莞支付宝</Option>
                            <Option value="szgh">深圳工行</Option> -->
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="提成总额" prop="ticheng">
                        <Input size="small" v-model="formValidateEadit.ticheng" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="performanceMoney">
                        <Input size="small" v-model="formValidateEadit.performanceMoney" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidateEadit.customername"/>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row :gutter="16">
                    <!-- <Col span="8">
                    <FormItem label="服务开始税期" prop="serviceBeginDate">
                        <DatePicker type="month" style="width: 200px"  @on-change="getStartTime4" v-model="formValidateEadit.serviceBeginDate"></DatePicker>
                    </FormItem>
                    </Col> -->
                    <Col span="8">
                    <FormItem label="国地税报道" prop="GDSreport">
                        <Select transfer v-model="formValidateEadit.GDSreport" :disabled="iscycle">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="formValidateEadit.isornotkp" size="small" style="width:100%">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem label="选择产品">
                        <Button type="primary" icon="plus" @click="orderAddProducts()">新增</Button>
                        <Button type="primary" icon="plus" @click="removeRows()">删除</Button>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList2"></table>
            </Form>
        </Modal>
        <Modal
                v-model="xiugai"
                title="修改"
                :mask-closable="false"                
                width="80%"
                :loading="loading3"
                @on-ok="xiugaiPostFrom('formValidatexiugai')"
                @on-cancel="cancel('formValidatexiugai')">
            <Form ref="formValidatexiugai" :rules="ruleValidatexg" :model="formValidatexiugai" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidatexiugai.CompanyName" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="NAME">
                        <Input size="small" v-model="formValidatexiugai.NAME" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"   prop="date">
                        <DatePicker format="yyyy-MM-dd" type="date" style="width:100%" size="small"  @on-change="getStartTime5" v-model="formValidatexiugai.date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="zongjia">
                        <Input size="small" v-model="formValidatexiugai.zongjia" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="orderPayNumber">
                        <Input size="small" v-model="formValidatexiugai.orderPayNumber" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="payDir">
                        <Select transfer v-model="formValidatexiugai.payDir" style="width:100%" size="small">
                            <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="提成总额" prop="ticheng">
                        <Input size="small" v-model="formValidatexiugai.ticheng" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="业绩" prop="performanceMoney">
                        <Input size="small" v-model="formValidatexiugai.performanceMoney" disabled/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="附加流水账" prop="customername">
                        <Input size="small" v-model="formValidatexiugai.customername" disabled/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="服务开始税期" prop="serviceBeginDate">
                        <DatePicker type="month"  @on-change="getStartTime6" v-model="formValidatexiugai.serviceBeginDate" style="width:100%" size="small"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="国地税报道" prop="GDSreport">
                        <Select transfer v-model="formValidatexiugai.GDSreport" disabled style="width:100%" size="small">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="formValidate.isornotkp" size="small" style="width:100%" disabled>
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem>
                        <Button type="primary" icon="plus" @click="zuofei()">作废订单项</Button>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList4"></table>
            </Form>
        </Modal>
        <Modal
                v-model="flowChart2"
                title="查看流程图"
                width="80%">
            <center>
                <img :src='flowChartImg'/>
            </center>
        </Modal>
        <Modal
                v-model="checkMemo"
                title="查看审批备注"
                width="70%">
            <Table border :columns="checkMemocolumns" :data="checkMemodata" size="small"></Table>
           <!-- <Page
                    size="small"
                    :total="pageTotalN"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChangeN"
                    @on-page-size-change="pageSizeChangeN"
                    style="margin-top: 10px"></Page>-->
        </Modal>
        <Card style="min-width:800px">
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search">
                                    <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="订单号码：" prop="ordercode">
                                                <Input v-model="formValidateSearch.ordercode" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="公司名称：" prop="companyname">
                                                <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="客户名称：" prop="customername">
                                                <Input v-model="formValidateSearch.customername" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="客户电话：" prop="customertel">
                                                <Input v-model="formValidateSearch.customertel" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="缴费渠道：" prop="customername">
                                                <Select transfer v-model="formValidateSearch.payDir" size="small">
                                                    <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                                    
                                                    <!-- <Option value="gszfb">公司支付宝</Option>
                                                    <Option value="gh">工行</Option>
                                                    <Option value="zh">招行</Option>
                                                    <Option value="wx">微信公众号</Option>
                                                    <Option value="gw">官网</Option>
                                                    <Option value="other">其他</Option>
                                                    <Option value="cash">现金</Option>
                                                    <Option value="jhang">建行</Option>
                                                    <Option value="nsh">农商行</Option>
                                                    <Option value="tb">淘宝</Option>
                                                    <Option value="zgrzh">转个人账户</Option>
                                                    <Option value="dgzfb">东莞支付宝</Option>
                                                    <Option value="szgh">深圳工行</Option> -->
                                                </Select>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="创建时间：" prop="date">
                                                <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:100%" size="small"></DatePicker>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="创建人：" prop="crealname">
                                                <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="跟进人：" prop="frealname">
                                                <Input v-model="formValidateSearch.frealname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <center>
                                            <FormItem>
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
            <Row>
                <ButtonGroup>
                    <Button v-permission="['orderL.add']" type="primary" icon="plus" @click="orderAdd = true">录入</Button>
                    <Button v-permission="['orderL.edit']" type="primary" icon="edit" @click="orderEdit()">编辑</Button>
                    <Button v-permission="['orderL.detail']" type="primary" icon="ios-crop" @click="detailCustomers()">查看</Button>
                    <Button v-permission="['orderL.flowChart']" type="primary" icon="ios-crop" @click="flowChart()">查看流程图</Button>
                    <Button v-permission="['orderL.resubmit']" type="primary" icon="ios-crop" @click="reApplyProcess()">重新提交</Button>
                    <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="xiugaiOpen()">修改</Button>
                    <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="getTableData">刷新</Button>
                    <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="refresh">重新生成工单</Button>
                    <!--  ↓ ↓ 该功能暂定，代码勿删  -->
                    <!--<Button type="primary" icon="ios-color-filter-outline" @click="qihuaOpen()">企划(修改)</Button>-->
                    <!--<Button v-permission="['orderL.invalid']" type="primary" icon="ios-color-filter-outline" @click="deleteOrder = true">订单作废</Button>-->
                    <Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
                <!-- <Poptip
                        style="float: right"
                        placement="bottom-end"
                        width="600">
                    <Button type="text" icon="funnel">筛选</Button>
                    
                </Poptip> -->
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading4"
                        highlight-row
                        size="small"
			            :row-class-name="rowClassName"
                        @on-row-click="selectRow"
                        @on-row-dblclick="detailCustomers"

                        :columns="columns2"
                        :data="data3"></Table>
                                                <!-- @on-sort-change="sort" -->
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync ="page"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="selectCompany"
                title="选择公司"
                width="80%">
            <Row :gutter="16">
                <Col span="8">
                <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-keydown="keyDown">
                <Button slot="append" icon="ios-search" @click="searchCompanyData"></Button>
                </Input>
                </Col>
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="columns44"
                    :data="data4"
                    @on-row-dblclick="rowSelect"></Table>
            <Page
                    size="small"
                    :total="pageTotal3"
                    :current.sync="currentPage"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange3"
                    @on-page-size-change="pageSizeChange3"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="fuwux"
                title="服务项"
                width="50%"
                @on-ok="fwxtj">
            <Tree :data="data2" show-checkbox multiple ref="tree"></Tree>
        </Modal>
        <Modal
                v-model="orderAddProduct"
                title="产品名称"
                :width="1300">
            <Row style="margin-bottom:10px">
                <Col span="4">
                        <Input v-model="searchProduct" placeholder="输入产品搜索" @on-keydown.enter="searchProductData">
                            <Button slot="append" icon="ios-search" @click="searchProductData"></Button>
                        </Input>
                </Col>
                
            </Row>
            <Row>
                <Col span="12">
                <Card>
                    <Col span="16">
                        <p slot="title">产品列表</p>
                    </Col>
                    
                    <Table
                            highlight-row
                            @on-row-click="selectRow2"
                            :columns="productColumns"
                            :data="productData">
                    </Table>
                    <Page
                            size="small"
                            :total="pageTotal2"
                            :current.sync="currentProduct"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange2"
                            @on-page-size-change="pageSizeChange2"
                            style="margin-top: 10px"></Page>
                </Card>
                </Col>
                <Col span="11" offset="1">
                <Card dis-hover v-if="isProductDetail">
                    <p slot="title">产品详情</p>
                    <div class="productDetail-title">
                        <p id="product_name"></p>
                        <p class="productDetail-title-price">
                            <span>￥<strong id="product_price">加载中</strong></span>
                        </p>
                        <div class="productDetail-title-content">
                        </div>
                    </div>
                    <div class="productDetail-option" id="productDetail-option-id" @click="areaChange()">
                        <div class="_propertys_class_" v-for="(item, index) in basePropertys" :key=index>
                            <p :id="item.propertyId">{{ item.name }}</p>
                            <div class="productDetail-option-buttonList" :name="index==0?'firstProperty':''">
                                <button
                                        type="button"
                                        v-for="(item2, index2) in item.children"
                                        :key = index2
                                        :class="index2==0?'active':''"
                                        :id="item2.pvId"
                                        @click="chooseThisProperty(item2.pvId)">
                                    {{ item2.propertyValue }}
                                </button>
                            </div>
                        </div>
                        <p id="areaId">地区</p>
                        <Row :gutter="16">
                            <Col span="10">
                            <al-cascader v-model="res1" data-type="code" level="2" @on-change="areaChange()"/>
                            </Col>
                        </Row>
                        <Button type="error" icon="bag" size="large" style="margin-top: 20px" @click="addProduct">立即购买</Button>
                    </div>
                </Card>
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Modal
            v-model="selectDate"
            title="选择服务开始税期"
            :closable="false"
            :mask-closable="false">
            <DatePicker type="month" width="190" @on-change="getStartTime2"></DatePicker>
            <div slot="footer"><Button type="primary" @click="Dateok">确定</Button></div>
        </Modal>
        <!-- <Modal
            v-model="approveDetail"
            title="审批规则"
            :closable="false"
            :mask-closable="false">
            
            <div slot="footer"><Button type="primary" @click="Dateok">确定</Button></div>
        </Modal> -->
    </div>
</template>

<script>
    import datagrid from '../../libs/easyUI/jquery.easyui.min'
    import combobox from '../../libs/easyUI/jquery.easyui.min'
    import Vue from 'vue';
    import iviewArea from 'iview-area';
    import {DateFormat} from '../../libs/utils.js'

    Vue.use(iviewArea);

    $.extend($.fn.datagrid.methods, {
        editCell: function(jq,param){
            return jq.each(function(){
                var opts = $(this).datagrid('options');
                var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
                for(var i=0; i<fields.length; i++){
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor1 = col.editor;
                    if (fields[i] != param.field){
                        col.editor = null;
                    }
                }
                $(this).datagrid('beginEdit', param.index);
                for(var i=0; i<fields.length; i++){
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor = col.editor1;
                }
            });
        }
    });

    let editIndex = undefined;

    export default {
        data() {
            return {
                old_price:0,
                cluesources:"",
                cluesources_map:new Map(),
                add_order_button_loading:false,
                beforeAddOrder:false,
                approveDetail:"",
                payDirType:"",
                search_model:"",
                searchProduct:'',
                PsearchformInline:{
                    product:''
                },
                fieldIndex: '',
                StartTime1: '',
                StartTime2: '',
                StartTime3: '',
                StartTime4: '',
                StartTime5: '',
                StartTime6: '',
                loading: true,
                loading2: true,
                loading3: true,
                loading4: true,
                selectDate: false,
                checkMemo: false,
                ishandleSubmit: false,
                orderAdd: false,
                deleteOrder: false,
                detailCustomer: false,
                orderAddProduct: false,
                isProductDetail: false,
                xiugai: false,
                eaditOrder: false,
                fuwux: false,
                iscycle: true,
                isfuwu: false,
                isEdit: false,
                isCheck: false,
                isxiugai: false,
                kjdj: false,
                selectCompany: false,
                flowChart2: false,
                shenpi: false,
                flowChartImg: '',
                searchCompany: '',
                itemGrid: '',
                customerId: '',
                currentProcess: '',
                productId: '',
                pageTotal: 0,
                pageTotal2: 0,
                pageTotal3: 0,
                page:1,
                pageSize: 10,
                currentPage: 1,
                currentPage2: 1,
                currentProduct: 1,
                data3: [],
                data2: [],
                payDirData: [],
                basePropertys: [],
                orderItemList: [],
                orderItemList2: [],
                orderItemList3: [],
                orderItemList4: [],
                checkMemodata: [],
                res1: ['440000', '440100', '440103'],
                productSKU: [],
                lastFirstPropertyValue: '',
                currentSKUId: '',
                price: '',
                SKU: '',
                lastObj: {},
                banlishenpi: {
                    desc: '',
                    agree: ''
                },
                cxtijiao: {
                    agree: ''
                },
                formValidateSearch: {
                    date:['',''],
                    ordercode: '',
                    companyname: '',
                    customername: '',
                    customertel: '',
                    payDir: '',
                    crealname: '',
                    frealname: '',
                },
                formValidate: {
                    isornotkp:'N',
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: ''
                },
                formValidateEadit: {
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: '',
                    isornotkp:''
                },
                formValidatexiugai: {
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: ''
                },
                formValidateDetail: {
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: '',
                    isornotkp:''
                },
                ruleValidate: {
                    CompanyName: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    NAME: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    payDir: [
                        { required: true, message: '请选择缴费渠道', trigger: 'change' }
                    ],
                    orderPayNumber: [
                        { required: true, message: '请填写已付款金额',}
                    ],
                    date: [
                        { required: true, message: '请选择缴费时间',}
                    ],
                },
                ruleValidateEadit: {
                    CompanyName: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    NAME: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    payDir: [
                        { required: true, message: '请选择缴费渠道', trigger: 'change' }
                    ],
                    orderPayNumber: [
                        { required: true, message: '请填写已付款金额'}
                    ],
                    date: [
                        { required: true, message: '请选择缴费时间',}
                    ],
                },
                ruleValidatexg: {
                    CompanyName: [
                        { required: true, message: '请选择公司', trigger: 'change' }
                    ],
                    NAME: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    payDir: [
                        { required: true, message: '请选择缴费渠道', trigger: 'change' }
                    ],
                    orderPayNumber: [
                        { required: true, message: '请填写已付款金额',}
                    ],
                    date: [
                        { required: true, message: '请选择缴费时间',}
                    ],
                },
                columns44: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        width:300
                    },
                    {
                        title: '归属客户',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    },
                    {
                        title: '钱包余额',
                        key: 'balance'
                    },
                    {
                        title: '是否国地税报道',
                        key: 'gdsreport'
                    },
                ],
                checkMemocolumns: [
                    {
                        title: '审批备注',
                        key: 'message',
                    },
                    {
                        title: '审批时间',
                        key: 'time'
                    },
                    {
                        title: '创建人',
                        key: 'userId'
                    },
                ],
                columns2: [
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        width: 140,
                        // sortable: true                                                
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        render: (h, params) => {
                            if (params.row.companyname == '' || params.row.companyname == null) {
                                return ''
                            } else {
                                return h('Poptip', {
                                    props: {
                                        trigger: 'hover',
                                        title: '公司名称',
                                        placement: 'bottom'
                                    }
                                }, [
                                    h('span', this.data3[params.index].companyname[0].name + ''),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b'
                                        }
                                    }),
                                    h('div', {
                                        slot: 'content'
                                    }, [
                                        h('ul', this.data3[params.index].companyname.map(item => [
                                            h('li', {
                                                style: {
                                                    padding: '4px'
                                                }
                                            }, '公司名：' + item.name),
                                        ]))
                                    ])
                                ])
                            }
                        },
                        ellipsis: true,
                        width: 300,
                        // sortable: true                                                
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 120,
                        // sortable: true                                                
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'productname',
                        width: 180,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.productname == ''||params.row.productname == null){
                                return ''
                            }else if(params.row.productname.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.productname.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.productname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.productname)
                            }
                        }
                    },
                    {
                        title: '流程状态',
                        key: 'ProcessType',
                        width: 120,
                        // sortable: true                                                
                    },
                    {
                        title: '缴费渠道',
                        key: 'base_paydir',
                        width: 120,
                        // sortable: true                                                
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        width: 120,
                        // sortable: true                                                
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 100,
                        // sortable: true                                                
                    },
                    {
                        title: '创建时间',
                        key: 'base_createdate',
                        width: 120,
                        // sortable: true                                                
                    },
                    {
                        title: '缴费日期',
                        key:'payTime',
                        width: 120
                    },
                    // {
                    //     title: '订单状态',
                    //     key: 'zip',
                    //     width: 120,
                    //     // sortable: true                                                
                    // },
                    {
                        title: '余款',
                        key: 'neednumber',
                        width: 100,
                        // sortable: true                                                
                    },
                    {
                        title: '客户来源',
                        key: 'customersource',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'crealname',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'frealname',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 80,
                        render: (h, params) => {
                            if(params.index != this.pageSize){
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        permission: "['orderL.record']"
                                    },
                                    on: {
                                        click: () => {
                                            this.cksp(params)
                                        }
                                    }
                                }, '审批记录')
                            ]);
                            }
                        }
                    }
                ],
                productColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产品名称',
                        key: 'product'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '产品编码',
                        key: 'productCode'
                    },
                ],
                productData: [],
                data4: [],
                isSearch: false,
                order:'desc',
                sortField:'id'

            }
        },
        methods: {
            
            downloadExcel(){
                let field = [
                    {field:'ordercode',title:'订单号码'},
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'客户名称'},
                    // {field:'tel',title:'客户电话'},
                    {field:'ProcessType',title:'流程状态'},
                    {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                    {field:'paynumber',title:'订单价格'},
                    {field:'realnumber',title:'已付款'},                    
                    {field:'payamount',title:'余款'},                    
                    {field:'base_createdate',title:'创建时间'},
                    {field:'crealname',title:'创建人'},
                    {field:'frealname',title:'跟进人'},                    
                    ]
                let _self = this
                let url = `api/order/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        ordercode: _self.formValidateSearch.ordercode,
                        companyname:_self.formValidateSearch.companyname,
                        customername:_self.formValidateSearch.customername,
                        customertel:    _self.formValidateSearch.customertel,
                        crealname:    _self.formValidateSearch.crealname,
                        frealname:    _self.formValidateSearch.frealname,
                        payDir:    _self.formValidateSearch.payDir,
                        bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                        ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                console.log(toExcel)
                window.open(toExcel)
            },
            handleReset(){
                var _self = this
                _self.formValidateSearch.ordercode = ''
                _self.formValidateSearch.companyname = ''
                _self.formValidateSearch.customername = ''
                _self.formValidateSearch.customertel = ''
                _self.formValidateSearch.crealname = ''
                _self.formValidateSearch.frealname = ''
                _self.formValidateSearch.payDir = ''
                _self.formValidateSearch.date = ''
                localStorage.setItem("companyname","")
                _self.page = 1
                _self.getTableData()
            },
            Search() {
                var _self = this;
                if (_self.ishandleSubmit == false) {
                _self.page = 1;
                }
                if(_self.formValidateSearch.companyname == ""){
                    localStorage.setItem("companyname","")
                }
                _self.ishandleSubmit = true;
                _self.getTableData();
            },
            sort(e){
                // console.log(e)
                this.sortField = e.key
                if(e.order=='normal'){
                    this.order = 'desc'
                    this.sortField = 'id'
                }else{
                    this.order = e.order
                }
                this.getTableData()
            },
            // 获取订单列表数据
            getTableData() {
                this.loading4 = true
                let _self = this
                let url = 'api/order/list'
                // if(localStorage.getItem("companyname") != ""){

                //     let role = JSON.parse(localStorage.getItem("Role"))
                //         for(let i = 0;i<role.length;i++){
                //             if(role[i].rolecode == "cwsp"){
                //                 _self.search_model = "1"
                //                 _self.formValidateSearch.companyname = localStorage.getItem("companyname")
                //             }
                //         }
                // }else{
                //     localStorage.setItem("companyname",_self.formValidateSearch.companyname)
                // }
                var keys =[]
                    var config = {
                        params:{
                            sortField:_self.sortField,
                            order:_self.order,
                            page:_self.page,
                            pageSize:_self.pageSize,
                            ordercode:_self.formValidateSearch.ordercode,
                            companyname:_self.formValidateSearch.companyname,
                            customername:_self.formValidateSearch.customername,
                            customertel:_self.formValidateSearch.customertel,
                            crealname:_self.formValidateSearch.crealname,
                            frealname:_self.formValidateSearch.frealname,
                            payDir:_self.formValidateSearch.payDir,
                            sumField:'paynumber,realnumber,neednumber',
                            bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                            ecreatedate:DateFormat(_self.formValidateSearch.date[1])
                        }
                    }
                //     for (var key in _self.formValidateSearch) {
                //     if (_self.formValidateSearch[key] == "" || _self.formValidateSearch[key] == null) {
                //         delete config.params[key];
                //     }
                //     if(_self.formValidateSearch.date == "" || _self.formValidateSearch.date == null ){
                //         delete config.params.bcreatedate
                //         delete config.params.ecreatedate
                //     }
                // }
            
                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal = _data.total
                    _self.currentPage2 = 1
                    _self.loading4 = false
                    _self.data3 = []

                    let _paydir
                    for (let i = 0; i < _data.rows.length; i++) {
                        // console.log(_data.rows[i])
                        for (let j = 0; j < _self.payDirData.length; j++) {
                            if (_self.payDirData[j].typecode == _data.rows[i].base_paydir) {
                                _paydir = _self.payDirData[j].typename
                            }
                        }
                        let _company = [{
                            name: _data.rows[i].companyname
                        }]
                        _self.data3.push({
                            base_paydir: _paydir,
                            productname: _data.rows[i].productname,
                            CurrentProcess: _data.rows[i].CurrentProcess,
                            ProcessType: _data.rows[i].ProcessType,
                            companyname: _company,
                            createby: _data.rows[i].createby,
                            frealname: _data.rows[i].frealname,
                            crealname: _data.rows[i].crealname,
                            base_createdate: (_data.rows[i].base_createdate).substr(0,10),
                            followby: _data.rows[i].followby,
                            name: _data.rows[i].name,
                            neednumber: _data.rows[i].neednumber,
                            paynumber: _data.rows[i].paynumber,
                            realnumber: _data.rows[i].realnumber,
                            tel: _data.rows[i].tel,
                            baseorderid: _data.rows[i].baseorderid,
                            id: _data.rows[i].id,
                            ordercode: _data.rows[i].ordercode,
                            payTime: _data.rows[i].payTime,
                            customersource:_self.cluesources_map.get(_data.rows[i].customersource),
                            cellClassName: {
                                companyname: 'demo-table-info-cell-name'
                            }
                        })
                    }

                    _self.data3.push({
                        base_paydir: '合计',
                        paynumber: _data.sum.paynumber,
                        realnumber: _data.sum.realnumber,
                        neednumber: _data.sum.neednumber,
                    })
                }

                _self.$http.get(url, config).then(function(res){
                    _self.$backToLogin(res)                    
                    doSuccess(res)
                })
                // setTimeout(() => {
                //     _self.GetData(url, doSuccess)
                // }, 2000)
            },
            rowClassName(row, index) {
                let _self = this
                if (row.ProcessType == "调整订单" && row.id != _self.customerId) {
                    return 'demo-table-error-row';
                }
            },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getTableData()
            },

            // 订单列表改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getTableData()
            },

            // 行选中事件（存储选中行的订单id）
            selectRow(a) {
                let _self = this
                _self.customerId = a.id
                _self.currentProcess = a.CurrentProcess
            },

            // 点击【查看】按钮
            detailCustomers() {
                let _self = this

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要查看的订单');
                } else {
                    let url = '/order/detail/' + _self.customerId
                    _self.detailCustomer = true
                    _self.isCheck = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _date = ''
                        if (_data.serviceStartDate != '' && _data.serviceStartDate != null) {
                            _date = _data.serviceStartDate.slice(0,7)
                        } else {
                            _date = ''
                        }
                        _self.orderItemList3 = _data.items
                        _self.formValidateDetail.CompanyName = _data.CompanyName,
                            _self.formValidateDetail.companyid = _data.companyid,
                            _self.formValidateDetail.NAME = _data.name,
                            _self.formValidateDetail.date = _data.payTime,
                            _self.StartTime5= _data.payTime,
                            _self.formValidateDetail.zongjia = _data.paynumber,
                            _self.formValidateDetail.orderPayNumber = _data.realnumber,
                            _self.formValidateDetail.payDir = _data.paydir,
                            _self.formValidateDetail.serviceBeginDate = _date
                            _self.StartTime6 = _date
                            _self.formValidateDetail.GDSreport = _data.gdsreport,
                            _self.formValidateDetail.performanceMoney = _data.performanceMoney,
                            _self.formValidateDetail.ticheng = _data.performanceMoney,
                            _self.formValidateDetail.isornotkp = _data.isornotkp

                        $('#orderItemList3').datagrid({
                            idField: 'id',
                            title: '',
                            data: _self.orderItemList3,
                            height: 300,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80,
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100}, 
                                        
                                {field:'servicestartdate',title:'服务开始税期',width:90,
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                },
                                {field: 'memo', title: '备注 ', width: 300,}
                            ]],
                        })

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }
                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 点击 选择产品-【新增】 加载产品列表

            searchProductData(){
                this.orderAddProducts()
            },

            // productreset(){
            //     this.PsearchformInline.product = ''
            //     this.orderAddProducts()
            // },
            
            orderAddProducts() {
                let _self = this
                if(_self.searchProduct==''){
                    var url = '/product/list?page=1&pageSize=10'
                }else{
                    var url = '/product/list?page=1&pageSize=10&product='+_self.searchProduct
                }
                
                _self.orderAddProduct = true

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal2 = _data.total
                    _self.currentProduct = 1
                    _self.productData = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        if(_data.rows[i].id == "14"){
                            _self.pageTotal2 = _self.pageTotal2 - 1
                        }else{
                            _self.productData.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productCode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                                baseproductId: _data.rows[i].baseproductId,
                                createDate: _data.rows[i].createDate,
                                createOperid: _data.rows[i].createOperid,
                                createby: _data.rows[i].createby,
                                defaultdepartalias: _data.rows[i].defaultdepartalias,
                                departalias: _data.rows[i].departalias,
                                iscycle: _data.rows[i].iscycle,
                                linkProductids: _data.rows[i].linkProductids,
                                ordernumber: _data.rows[i].ordernumber,
                                pId: _data.rows[i].pId,
                                pSortId: _data.rows[i].pSortId,
                                productLevel: _data.rows[i].productLevel,
                                productTypeID: _data.rows[i].productTypeID,
                                producttags: _data.rows[i].producttags,
                                rootorgcode: _data.rows[i].rootorgcode,
                            })
                        }
                        
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 产品列表页码改变
            pageChange2(a) {
                let _self = this
                let url = '/api/product/list?page=' + a + '&pageSize=' + _self.pageSize
                this.$http.get(url)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal2 = _data.total
                        _self.productData = []

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.productData.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productCode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                                baseproductId: _data.rows[i].baseproductId,
                                createDate: _data.rows[i].createDate,
                                createOperid: _data.rows[i].createOperid,
                                createby: _data.rows[i].createby,
                                defaultdepartalias: _data.rows[i].defaultdepartalias,
                                departalias: _data.rows[i].departalias,
                                iscycle: _data.rows[i].iscycle,
                                linkProductids: _data.rows[i].linkProductids,
                                ordernumber: _data.rows[i].ordernumber,
                                pId: _data.rows[i].pId,
                                pSortId: _data.rows[i].pSortId,
                                productLevel: _data.rows[i].productLevel,
                                productTypeID: _data.rows[i].productTypeID,
                                producttags: _data.rows[i].producttags,
                                rootorgcode: _data.rows[i].rootorgcode,
                            })
                        }
                    })
            },

            // 产品列表 每页条数改变
            pageSizeChange2(a) {
                let _self = this
                _self.pageSize = a
                this.$http.get('/api/product/list?page=1&pageSize=' + a)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal2 = _data.total
                        _self.productData = []

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.productData.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productCode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                                baseproductId: _data.rows[i].baseproductId,
                                createDate: _data.rows[i].createDate,
                                createOperid: _data.rows[i].createOperid,
                                createby: _data.rows[i].createby,
                                defaultdepartalias: _data.rows[i].defaultdepartalias,
                                departalias: _data.rows[i].departalias,
                                iscycle: _data.rows[i].iscycle,
                                linkProductids: _data.rows[i].linkProductids,
                                ordernumber: _data.rows[i].ordernumber,
                                pId: _data.rows[i].pId,
                                pSortId: _data.rows[i].pSortId,
                                productLevel: _data.rows[i].productLevel,
                                productTypeID: _data.rows[i].productTypeID,
                                producttags: _data.rows[i].producttags,
                                rootorgcode: _data.rows[i].rootorgcode,
                            })
                        }
                    })
            },

            // 产品列表行选中事件（获取产品详情）
            selectRow2(a) {
                let _self = this
                let url = '/product/queryPropertyByProductId?productId=' + a.id
                _self.productId = a.id
                _self.isProductDetail = true

                function doSuccess(response) {
                    _self.basePropertys = response.data.data
                    document.getElementById('product_name').textContent = _self.basePropertys[0].product
                    _self.doProductSKU()
                }

                this.GetData(url, doSuccess)
            },

            // 获取SKU
            doProductSKU() {
                let _self = this
                let url = '/product/getSKUListByProductId?productId=' + _self.productId

                function doSuccess(response) {
                    _self.productSKU = response.data.data
                    _self.resetProperty(_self.productSKU[0].linkPropertys, _self.productSKU[0].linkPropertyIds)
                    _self.setPrice(_self.productSKU[0].id);
                }

                this.GetData(url, doSuccess)
            },

            // 重置属性
            resetProperty(linkPropertyValueIds, linkPropertyIds) {
                let _self = this
                let propertyValueIds = linkPropertyValueIds.split(",")
                let propertyIds = linkPropertyIds.split(",")

                $('._propertys_class_').hide()

                for (let i = 0; i < propertyIds.length; i++) {
                    $('#' + propertyIds[i]).parent().show()

                    if ($('#' + propertyIds[i]).parent().attr("name") == 'firstProperty') {
                        _self.lastFirstPropertyValue = propertyValueIds[i]
                    }
                    _self.chooseThisProperty(propertyValueIds[i])
                }
                _self.lastObj = _self.getPropertyIdArray()		//设置缓存对象
            },

            // 点击属性
            chooseThisProperty(id) {
                $(document.getElementById(id)).parent().find("button").removeClass("active")
                $(document.getElementById(id)).addClass("active")
            },

            // 缓存属性数据
            getPropertyIdArray() {
                let _self = this
                let obj = {}
                let areaId = _self.res1[2]
                let linkPropertyValueIds = []
                let linkPropertyIds = []
                $("._propertys_class_").each(function (i, obj) {
                    if ($(obj).css("display") != "none") {
                        let div = $(obj).find("div")
                        linkPropertyIds.push(div[0].id)
                        let button = $(obj).find("button[class='active']")
                        linkPropertyValueIds.push(button[0].id)
                    }
                });
                obj.linkPropertyValueIds = linkPropertyValueIds
                obj.linkPropertyIds = linkPropertyIds
                obj.areaId = areaId
                return obj
            },

            // 设置产品价格
            setPrice(skuId, areaId) {
                let _self = this
                if (!skuId) {
                    let linkPropertyArray = _self.lastObj.linkPropertyValueIds
                    let _sku_p_value, _sku_p, i, j, flag
                    if (_self.productSKU) {
                        for (i = 0, j = _self.productSKU.length; i < j; i++) {
                            _sku_p_value = _self.productSKU[i].linkPropertys   //属性值
                            //长度一致
                            if (linkPropertyArray.join(",").length == _sku_p_value.length) {
                                flag = _self.checkStrInArray(_sku_p_value, linkPropertyArray);
                                //内容都包含
                                if (flag) {
                                    skuId = _self.productSKU[i].id;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!skuId) {
                    _self.currentSKUId = null;
                    _self.price = 0;
                    $("#product_price").html("未知")
                } else {
                    _self.SKU = skuId
                    _self.currentSKUId = skuId

                    let url = '/product/getPriceByAreaAndSKU?skuId=' + skuId + '&areaId=' + _self.res1[2]

                    function doSuccess(response) {
                        if (response.data.data && response.data.data != []) {
                            let baseprice = response.data.data[0].baseprice
                            let oaprice = response.data.data[0].oaprice
                            _self.price = oaprice
                            $("#product_price").html(oaprice)
                        } else {
                            $("#product_price").html("未知")
                        }
                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 产品属性点击事件
            areaChange() {
                let _self = this
                let obj = _self.getPropertyIdArray()
                // console.log(_self.res1)
                if (obj.areaId != _self.lastObj.areaId) {
                    _self.lastObj = obj
                    if(_self.res1[1] == "441900"){
                        _self.res1[2] = "441906"
                    }
                    _self.setPrice(_self.SKU, _self.res1[2])
                    //属性值改变
                } else if (obj.linkPropertyValueIds.join(',') != _self.lastObj.linkPropertyValueIds.join(',')) {
                    _self.lastObj = obj
                    let button = $("div[name='firstProperty']").find("button[class='active']")
                    if (button[0].id != _self.lastFirstPropertyValue) {
                        _self.lastFirstPropertyValue = button[0].id
                        // 重置属性
                        let _sku_p_value, _sku_p, i, j
                        if (_self.productSKU) {
                            for (i = 0, j = _self.productSKU.length; i < j; i++) {
                                _sku_p_value = _self.productSKU[i].linkPropertys    //属性值
                                _sku_p = _self.productSKU[i].linkPropertyIds      //属性ID
                                if (_sku_p_value.indexOf(_self.lastFirstPropertyValue) >= 0) {
                                    _self.resetProperty(_sku_p_value, _sku_p)    //重置属性
                                    break
                                }
                            }
                        }
                    }
                    _self.setPrice()
                } else {}
            },

            // 检查数据
            checkStrInArray(_sku_p_value, linkPropertyArray) {
                let m, n
                if (linkPropertyArray.length > 0) {
                    for (m = 0, n = linkPropertyArray.length; m < n; m++) {
                        //不包含
                        if (_sku_p_value.indexOf(linkPropertyArray[m]) < 0) {
                            return false
                        }
                    }
                    return true
                }
                return false
            },

            additem() {
                let _self = this
                if (_self.isEdit != true) {
                    _self.formValidate.zongjia = 0
                    _self.formValidate.orderPayNumber = 0
                    _self.formValidate.performanceMoney = 0
                    _self.formValidate.ticheng = 0

                    for (let i = 0; i < _self.orderItemList.length; i++) {
                        if (_self.orderItemList[i].plusdeduct == 'N') {
                            _self.formValidate.ticheng += Number(_self.orderItemList[i].paynumber)
                        }
                        _self.formValidate.zongjia += Number(_self.orderItemList[i].paynumber)
                        _self.formValidate.orderPayNumber += Number(_self.orderItemList[i].paynumber)
                        _self.formValidate.performanceMoney += Number(_self.orderItemList[i].paynumber)
                    }

                    $('#orderItemList').datagrid({
                            idField: 'id',
                            title: '',
                            data: _self.orderItemList, 
                            height: 300,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80, editor: 'numberbox'},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80,
                                    editor: {type: 'numberbox',  options: {precision: 2}}
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100, editor: {type: 'numberbox'}}, 
                                        
                                {field:'servicestartdate',title:'服务开始税期',width:90,editor: {type: 'textbox',required: true},
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    editor: 'text',
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                    editor: {type: 'numberbox', options: {precision: 2}}
                                },
                                {field: 'memo', title: '备注 ', width: 300, editor: 'textarea'}
                            ]],
                            onClickCell: function (index, field) {
                                if (_self.endEditing()){
                                    $('#orderItemList').datagrid('selectRow', index)
                                        .datagrid('editCell', {index:index,field:field});
                                    editIndex = index;
                                }
                                _self.itemOnClick(index, field)
                            },
                            onBeforeEdit: function (index, row) {
                                row.editing = true;
                                _self.updateActions(index);
                            },
                            onAfterEdit: function (index, row) {
                                row.editing = false;
                                _self.updateActions(index);
                            },
                        })
                } else {
                    _self.formValidateEadit.zongjia = 0
                    _self.formValidateEadit.orderPayNumber = 0
                    _self.formValidateEadit.performanceMoney = 0
                    _self.formValidateEadit.ticheng = 0
                    for (let i = 0; i < _self.orderItemList2.length; i++) {
                        if (_self.orderItemList2[i].plusdeduct == 'N') {
                            _self.formValidateEadit.ticheng += Number(_self.orderItemList2[i].paynumber)
                        }
                        _self.formValidateEadit.zongjia += Number(_self.orderItemList2[i].paynumber)
                        _self.formValidateEadit.orderPayNumber += Number(_self.orderItemList2[i].paynumber)
                        _self.formValidateEadit.performanceMoney += Number(_self.orderItemList2[i].paynumber)
                    }

                    $('#orderItemList2').datagrid({
                            idField: 'id',
                            title: '',
                            height: 300,
                            data: _self.orderItemList2,
                            height: 300,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80, editor: 'numberbox'},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80,
                                    editor: {type: 'numberbox',  options: {precision: 2}}
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100, editor: {type: 'numberbox'}}, 
                                        
                                {field:'servicestartdate',title:'服务开始税期',width:90,editor: {type: 'textbox'},
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    editor: 'text',
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                    editor: {type: 'numberbox', options: {precision: 2}}
                                },
                                {field: 'memo', title: '备注 ', width: 300, editor: 'textarea'}
                            ]],
                            onClickCell: function (index, field) {
                                if (_self.endEditing()){
                                    $('#orderItemList2').datagrid('selectRow', index)
                                        .datagrid('editCell', {index:index,field:field});
                                    editIndex = index;
                                }
                                _self.itemOnClick(index, field)
                            },
                            onBeforeEdit: function (index, row) {
                                row.editing = true;
                                _self.updateActions(index);
                            },
                            onAfterEdit: function (index, row) {
                                row.editing = false;
                                _self.updateActions(index);
                            },
                        })
                }
            },

            // 【立即购买】按钮点击事件
            addProduct() {
                let _self = this
                let url = '/order/queryItemDetail?productSkuIds=' + _self.SKU + '&areaId=' + _self.res1[2]

                function doSuccess(response) {
                    let _department = JSON.parse(response.data.data[0].servicedeparts)
                    if (response.data.data[0].iscycle != 'N' && response.data.data[0].product != '会计到家') {
                        let _error = ''
                        let url2 = ''
                        if (_self.isEdit != true) {
                                _error = (_self.formValidate.CompanyName == '')
                                url2 = '/order/cycle/service/record/budget/period?productId=' + _self.productId + '&companyId=' + _self.formValidate.cpid
                            } else {
                                _error = (_self.formValidateEadit.CompanyName == '')
                                url2 = '/order/cycle/service/record/budget/period?productId=' + _self.productId + '&companyId=' + _self.formValidateEadit.companyid
                            }
                        if (_error) {
                            _self.$Message.warning('请先选择公司')
                        } else {

                            function doSuccess2(res) {
                                response.data.data[0].servicestartdate = res.data.data
                                
                                if (_self.isEdit != true) {
                                    // 判断是否添加备注内容
                                    if(response.data.data[0].skuid == "1007"){
                                        response.data.data[0].memo = "一年4次外勤、可做减少收入"
                                    }
                                    _self.orderItemList.push(response.data.data[0])
                                } else {
                                    _self.orderItemList2.push(response.data.data[0])
                                }

                                _self.$Message.success('添加成功')
                                _self.iscycle = false
                                _self.additem()
                            }

                            _self.GetData(url2, doSuccess2)
                        }
                    } else if (response.data.data[0].product == '会计到家') {
                        let _error = ''
                        let url2 = ''
                        if (_self.isEdit != true) {
                                _error = (_self.formValidate.CompanyName == '')
                                url2 = '/order/cycle/service/record/budget/period?productId=' + _self.productId + '&companyId=' + _self.formValidate.cpid
                            } else {
                                _error = (_self.formValidateEadit.CompanyName == '')
                                url2 = '/order/cycle/service/record/budget/period?productId=' + _self.productId + '&companyId=' + _self.formValidateEadit.companyid
                            }
                        if (_error) {
                            _self.$Message.warning('请先选择公司')
                        } else {

                            function doSuccess2(res) {
                                response.data.data[0].servicestartdate = res.data.data
                                
                                if (_self.isEdit != true) {
                                    _self.orderItemList.push(response.data.data[0])
                                } else {
                                    _self.orderItemList2.push(response.data.data[0])
                                }

                                _self.$Message.success('添加成功')
                                _self.isfuwu = true
                                _self.kjdj = true
                                _self.additem()
                            }

                            _self.GetData(url2, doSuccess2)
                        }
                    } else {
                        if (_self.isEdit != true) {
                                _self.orderItemList.push(response.data.data[0])
                            } else {
                                _self.orderItemList2.push(response.data.data[0])
                            }
                        _self.$Message.success('添加成功')
                        _self.additem()
                    }
                }if (_self.isEdit != true) {
                        _self.formValidate.zongjia = 0
                        _self.formValidate.orderPayNumber = 0
                        _self.formValidate.performanceMoney = 0
                        _self.formValidate.ticheng = 0

                        for (let i = 0; i < _self.orderItemList.length; i++) {
                            if (_self.orderItemList[i].plusdeduct == 'N') {
                                _self.formValidate.ticheng += Number(_self.orderItemList[i].paynumber)
                            }
                            _self.formValidate.zongjia += Number(_self.orderItemList[i].paynumber)
                            _self.formValidate.orderPayNumber += Number(_self.orderItemList[i].paynumber)
                            _self.formValidate.performanceMoney += Number(_self.orderItemList[i].paynumber)
                        }
                    } else {
                        _self.formValidateEadit.zongjia = 0
                        _self.formValidateEadit.orderPayNumber = 0
                        _self.formValidateEadit.performanceMoney = 0
                        _self.formValidateEadit.ticheng = 0
                        for (let i = 0; i < _self.orderItemList2.length; i++) {
                            if (_self.orderItemList2[i].plusdeduct == 'N') {
                                _self.formValidateEadit.ticheng += Number(_self.orderItemList2[i].paynumber)
                            }
                            _self.formValidateEadit.zongjia += Number(_self.orderItemList2[i].paynumber)
                            _self.formValidateEadit.orderPayNumber += Number(_self.orderItemList2[i].paynumber)
                            _self.formValidateEadit.performanceMoney += Number(_self.orderItemList2[i].paynumber)
                        }
                    }
                

                function otherConditions() {
                    this.$Message.error('添加失败');
                }

                this.GetData(url, doSuccess, otherConditions)
            },

            // easyUI行编辑事件结束
            endEditing() {
                if (editIndex == undefined) {
                    return true
                }
                if (this.isEdit == true) {
                    if ($('#orderItemList2').datagrid('validateRow', editIndex)) {
                        $('#orderItemList2').datagrid('endEdit', editIndex);
                        editIndex = undefined;
                        return true;
                    } else {
                        return false;
                    }
                } else if (this.isxiugai == true) {
                    if ($('#orderItemList4').datagrid('validateRow', editIndex)) {
                        $('#orderItemList4').datagrid('endEdit', editIndex);
                        editIndex = undefined;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if ($('#orderItemList').datagrid('validateRow', editIndex)) {
                        $('#orderItemList').datagrid('endEdit', editIndex);
                        editIndex = undefined;
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            postFW() {
                let _self = this
                let url = '/order/create'
                let _data = {}
                _self.add_order_button_loading = true
                for (let i = 0; i < _self.orderItemList.length; i++) {
                    delete _self.orderItemList[i].servicedeparts;
                }

                _data.companyId = _self.formValidate.cpid,
                _data.payDir = _self.formValidate.payDir,
                _data.orderPayNumber = _self.formValidate.orderPayNumber,
                _data.GDSreport = _self.formValidate.GDSreport,
                _data.orderitems = JSON.stringify(_self.orderItemList),
                _data.payTime = _self.StartTime1,
                _data.isornotkp = _self.formValidate.isornotkp

                _self.$http({
                    method: 'post',
                    url: '/api' + url,
                    data: _data,
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.orderAdd = false
                            _self.loading4 = true
                            _self.getTableData()
                            _self.$Message.success('新增成功!')
                            _self.orderItemList = []
                            _self.cancel('formValidate')
                            _self.currentPage2 = 1
                            _self.beforeAddOrder = false
                            _self.beforeAddOrder = false
                            _self.add_order_button_loading = false

                        } else if (response.data.msgCode == '50003') {
                            _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                            setTimeout(() => {
                                _self.$router.push({
                                    name: 'login'
                                });
                            }, 2000);
                        } else if (response.data.msgCode == '60000') {
                            _self.$Message.error('抱歉，您没有权限');
                        } else {
                            _self.$nextTick(() => {
                                _self.loading = true;
                                _self.beforeAddOrder = false
                                _self.add_order_button_loading = false
                            });
                            _self.$Message.error('新增失败!');
                        }
                    })
            },

            // 录入订单提交
            ok4(name) {
                let eaRows = $('#orderItemList').datagrid('getRows')
                for(let j = 0;j<eaRows.length;j++){
                    $('#orderItemList').datagrid('endEdit',j)
                }
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        console.log(valid)
                        if (valid) {
                            if (_self.iscycle == false || _self.isfuwu == true){
                                for (let i = 0; i < _self.orderItemList.length; i++) {
                                    if (((_self.orderItemList[i].product.indexOf('代理记账') != -1) || (_self.orderItemList[i].product.indexOf('会计到家') != -1)) && _self.orderItemList[i].servicestartdate == '') {
                                        _self.$nextTick(() => {
                                            _self.loading = true;
                                        });
                                        _self.$Message.error('您有周期性产品未选择服务开始税期')
                                        _self.beforeAddOrder = false
                                        
                                    }
                                }
                            }

                            if (_self.iscycle == false && _self.formValidate.GDSreport == '') {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('请选择是否国地税报道');
                                        _self.beforeAddOrder = false
                                
                            } 
                            // else if (_self.iscycle == false && _self.formValidate.serviceBeginDate == '') {
                            //     _self.$nextTick(() => {
                            //         _self.loading = true;
                            //     });
                            //     _self.$Message.error('请选择服务开始税期');
                            // } 
                            // else if (_self.isfuwu == true && _self.formValidate.serviceBeginDate == '') {
                            //     _self.$nextTick(() => {
                            //         _self.loading = true;
                            //     });
                            //     _self.$Message.error('请选择服务开始税期');
                            // }
                             else if (_self.orderItemList.length == 0) {
                                _self.$nextTick(() => {
                                    _self.loading = true;
                                });
                                _self.$Message.error('请选择产品');
                                        _self.beforeAddOrder = false
                                
                            } else {
                                if (_self.isfuwu == true) {
                                    console.log(999)
                                    let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + _self.formValidate.cpid
                                    function doSuccess(response) {
                                        if (response.data.data.selectItems == null || response.data.data.selectItems == '') {
                                            _self.$nextTick(() => {
                                                _self.loading = true;
                                            });
                                            _self.$Message.error('请勾选服务项');
                                        _self.beforeAddOrder = false                                            
                                        } else {
                                            _self.postFW()
                                        }
                                    }
                                    _self.GetData(url, doSuccess)
                                } else {
                                    let url = '/order/create'
                                    let _data = {}
                                    _self.add_order_button_loading = true

                                    for (let i = 0; i < _self.orderItemList.length; i++) {
                                        delete _self.orderItemList[i].servicedeparts;
                                    }

                                    _data.companyId = _self.formValidate.cpid
                                    _data.payDir = _self.formValidate.payDir
                                    _data.orderPayNumber = _self.formValidate.orderPayNumber
                                    _data.GDSreport = _self.formValidate.GDSreport
                                    _data.orderitems = JSON.stringify(_self.orderItemList)
                                    _data.payTime = _self.StartTime1
                                    _data.isornotkp = _self.formValidate.isornotkp
                                    function doSuccess(response) {
                                        _self.orderAdd = false
                                        _self.loading4 = true
                                        _self.getTableData()
                                        _self.$Message.success('新增成功!')
                                        _self.orderItemList = []
                                        _self.cancel('formValidate')
                                        _self.currentPage2 = 1
                                        _self.add_order_button_loading = false
                                        _self.beforeAddOrder = false
                                        
                                    }
                                    function otherConditions() {
                                        _self.$nextTick(() => {
                                            _self.loading = true;
                                        });
                                        _self.$Message.error('新增失败!');
                                        _self.add_order_button_loading = false
                                        _self.beforeAddOrder = false                                                                              
                                    }
                                    _self.PostData(url, _data, doSuccess, otherConditions)
                                }
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 1000)
            },

            // 编辑订单后提交数据
            editPostFrom(name) {
                let _self = this
                let eaRows = $('#orderItemList2').datagrid('getRows')
                for(let j = 0;j<eaRows.length;j++){
                    $('#orderItemList2').datagrid('endEdit',j)
                }
                setTimeout(() => {
                    this.loading2 = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let _iscycle = false
                            let _jizhang = false
                            for (let i = 0; i < _self.orderItemList2.length; i++) {
                                if (_self.orderItemList2[i].product == '会计到家') {
                                    _iscycle = true
                                    break
                                }
                            }
                            for (let i = 0; i < _self.orderItemList2.length; i++) {
                                if (_self.orderItemList2[i].product == '小规模代理记账' || _self.orderItemList2[i].product == '0申报代理记账' || _self.orderItemList2[i].product == '一般纳税人代理记账') {
                                    _jizhang = true
                                    break
                                }
                            }

                            if (_jizhang == true || _self._iscycle == true) {
                                for (let i = 0; i < _self.orderItemList2.length; i++) {
                                    if (((_self.orderItemList2[i].product.indexOf('代理记账') != -1) || (_self.orderItemList2[i].product.indexOf('会计到家') != -1)) && (_self.orderItemList2[i].servicestartdate == '' || _self.orderItemList2[i].servicestartdate == undefined)) {
                                        _self.$nextTick(() => {
                                            _self.loading = true;
                                        });
                                        _self.$Message.error('您有周期性产品未选择服务开始税期')
                                    }
                                }
                            }

                            if (_jizhang == true && _self.formValidateEadit.GDSreport == null) {
                                _self.$nextTick(() => {
                                    _self.loading2 = true;
                                });
                                _self.$Message.error('请选择是否国地税报道');
                            } 
                            // else if (_jizhang == true && (_self.formValidateEadit.serviceBeginDate == '' || _self.formValidateEadit.serviceBeginDate == null)) {
                            //     _self.$nextTick(() => {
                            //         _self.loading2 = true;
                            //     });
                            //     _self.$Message.error('请选择服务开始时间');
                            // } 
                            // else if (_iscycle == true && _self.formValidateEadit.serviceBeginDate == '') {
                            //     _self.$nextTick(() => {
                            //         _self.loading2 = true;
                            //     });
                            //     _self.$Message.error('请选择服务开始时间');
                            // }
                             else if (_self.orderItemList2.length == 0) {
                                _self.$nextTick(() => {
                                    _self.loading2 = true;
                                });
                                _self.$Message.error('请选择产品');
                            } else {
                                if (_iscycle == true) {
                                    let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + _self.formValidateEadit.companyid
                                    function doSuccess(response) {
                                        if (response.data.data.selectItems == null || response.data.data.selectItems == null) {
                                            _self.$nextTick(() => {
                                                _self.loading2 = true;
                                            });
                                            _self.$Message.error('请勾选服务项');
                                        } else {
                                            let url = '/order/update'
                                            let _data = {}

                                            for (let i = 0; i < _self.orderItemList2.length; i++) {
                                                delete _self.orderItemList2[i].servicedeparts;
                                            }

                                                _data.companyId = _self.formValidateEadit.companyid,
                                                _data.payDir = _self.formValidateEadit.payDir,
                                                _data.id = _self.formValidateEadit.id,
                                                _data.orderPayNumber = _self.formValidateEadit.orderPayNumber,
                                                _data.serviceStartDate = _self.StartTime4,
                                                _data.GDSreport = _self.formValidateEadit.GDSreport,
                                                _data.payTime = _self.StartTime3,
                                                _data.orderitems = JSON.stringify(_self.orderItemList2)
                                                _data.isornotkp = _self.formValidateEadit.isornotkp

                                            function doSuccess(response) {
                                                _self.eaditOrder = false
                                                _self.loading4 = true
                                                _self.getTableData()
                                                _self.$Message.success('编辑成功!')
                                                _self.orderItemList2 = []
                                                _self.currentPage2 = 1
                                                _self.cancel('formValidateEadit')
                                            }
                                            function otherConditions() {
                                                _self.$nextTick(() => {
                                                    _self.loading2 = true;
                                                });
                                                _self.$Message.error('编辑失败!');
                                            }
                                            _self.PostData(url, _data, doSuccess, otherConditions)
                                        }
                                    }
                                    _self.GetData(url, doSuccess)
                                } else {
                                    let url = '/order/update'
                                    let _data = {}

                                    for (let i = 0; i < _self.orderItemList2.length; i++) {
                                        delete _self.orderItemList2[i].servicedeparts;
                                    }

                                    _data.companyId = _self.formValidateEadit.companyid,
                                        _data.payDir = _self.formValidateEadit.payDir,
                                        _data.id = _self.formValidateEadit.id,
                                        _data.orderPayNumber = _self.formValidateEadit.orderPayNumber,
                                        _data.serviceStartDate = _self.StartTime4,
                                        _data.GDSreport = _self.formValidateEadit.GDSreport,
                                        _data.payTime = _self.StartTime3,
                                        _data.orderitems = JSON.stringify(_self.orderItemList2)
                                        _data.isornotkp = _self.formValidateEadit.isornotkp

                                    function doSuccess(response) {
                                        _self.eaditOrder = false
                                        _self.loading4 = true
                                        _self.getTableData()
                                        _self.$Message.success('编辑成功!')
                                        _self.orderItemList2 = []
                                        _self.currentPage2 = 1
                                        _self.cancel('formValidateEadit')
                                    }
                                    function otherConditions() {
                                        _self.$nextTick(() => {
                                            _self.loading2 = true;
                                        });
                                        _self.$Message.error('编辑失败!');
                                    }
                                    _self.PostData(url, _data, doSuccess, otherConditions)
                                }
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading2 = true;
                            });
                        }
                    })
                }, 1000)
            },

            // 修改之后提交数据
            xiugaiPostFrom(name) {
                let _self = this
                let eaRows = $('#orderItemList4').datagrid('getRows')
                for(let j = 0;j<eaRows.length;j++){
                    $('#orderItemList4').datagrid('endEdit',j)
                }
                setTimeout(() => {
                    this.loading3 = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let _iscycle = false
                            let _jizhang = false
                            for (let i = 0; i < _self.orderItemList4.length; i++) {
                                if (_self.orderItemList4[i].product == '会计到家') {
                                    _iscycle = true
                                    break
                                }
                            }
                            for (let i = 0; i < _self.orderItemList4.length; i++) {
                                if (_self.orderItemList4[i].product == '小规模代理记账' || _self.orderItemList4[i].product == '0申报代理记账' || _self.orderItemList4[i].product == '一般纳税人代理记账') {
                                    _jizhang = true
                                    break
                                }
                            }

                            if (_jizhang == true && (_self.formValidatexiugai.serviceBeginDate == '' || _self.formValidatexiugai.serviceBeginDate == null)) {
                                _self.$nextTick(() => {
                                    _self.loading3 = true;
                                });
                                _self.$Message.error('请选择服务开始时间');
                            } else if (_iscycle == true && _self.formValidatexiugai.serviceBeginDate == '') {
                                _self.$nextTick(() => {
                                    _self.loading3 = true;
                                });
                                _self.$Message.error('请选择服务开始时间');
                            } else {
                                if (_iscycle == true) {
                                    let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + _self.formValidatexiugai.companyid
                                    function doSuccess(response) {
                                        if (response.data.data.selectItems == null || response.data.data.selectItems == '') {
                                            _self.$nextTick(() => {
                                                _self.loading3 = true;
                                            });
                                            _self.$Message.error('请勾选服务项');
                                        } else {
                                            // let url = '/order/financeUpdate'
                                            let url = `/order/finishedUpdate`
                                            let _data = {}

                                            for (let i = 0; i < _self.orderItemList4.length; i++) {
                                                delete _self.orderItemList4[i].servicedeparts;
                                            }
                                        console.log(_self.StartTime5)

                                                // _data.companyId = _self.formValidatexiugai.companyid,
                                                _data.paydir = _self.formValidatexiugai.payDir,
                                                _data.id = _self.formValidatexiugai.id,
                                                // _data.orderPayNumber = _self.formValidatexiugai.orderPayNumber,
                                                // _data.servicestartdate = _self.StartTime6,
                                                // _data.GDSreport = _self.formValidatexiugai.GDSreport,
                                                _data.paytime = _self.StartTime5,
                                                // _data.paytime = "2018-06-30"
                                                _data.items = JSON.stringify(_self.orderItemList4)

                                            function doSuccess(response) {
                                                _self.xiugai = false
                                                _self.loading4 = true
                                                _self.getTableData()
                                                _self.$Message.success('修改成功!')
                                                _self.orderItemList4 = []
                                                _self.currentPage2 = 1
                                                _self.cancel('formValidatexiugai')
                                            }
                                            function otherConditions() {
                                                _self.$nextTick(() => {
                                                    _self.loading3 = true;
                                                });
                                                _self.$Message.error('修改失败!');
                                            }
                                            _self.PostData(url, _data, doSuccess, otherConditions)
                                        }
                                    }
                                    _self.GetData(url, doSuccess)
                                } else {
                                    // let url = '/order/financeUpdate'
                                    let url = `/order/finishedUpdate`

                                    let _data = {}

                                    for (let i = 0; i < _self.orderItemList4.length; i++) {
                                        delete _self.orderItemList4[i].servicedeparts;
                                    }
                                    // _data.companyId = _self.formValidatexiugai.companyid,
                                        _data.paydir = _self.formValidatexiugai.payDir,
                                        _data.id = _self.formValidatexiugai.id,
                                        // _data.orderPayNumber = _self.formValidatexiugai.orderPayNumber,
                                        // _data.servicestartdate = _self.StartTime6,
                                        // _data.GDSreport = _self.formValidatexiugai.GDSreport,
                                        _data.paytime = _self.StartTime5,
                                        // _data.paytime = "2018-06-30"

                                        _data.items = JSON.stringify(_self.orderItemList4)

                                    function doSuccess(response) {
                                        _self.xiugai = false
                                        _self.loading4 = true
                                        _self.getTableData()
                                        _self.$Message.success('修改成功!')
                                        _self.orderItemList4 = []
                                        _self.currentPage2 = 1
                                        _self.cancel('formValidatexiugai')
                                    }
                                    function otherConditions() {
                                        _self.$nextTick(() => {
                                            _self.loading3 = true;
                                        });
                                        _self.$Message.error('修改失败!');
                                    }
                                    _self.PostData(url, _data, doSuccess, otherConditions)
                                }
                            }
                        }  else {
                            this.$nextTick(() => {
                                this.loading3 = true;
                            });
                        }
                    })
                }, 1000)
            },

            // easyUI行编辑之后保存
            updateActions(index) {
                if (this.isEdit == true) {
                    $('#orderItemList2').datagrid('updateRow', {
                        index: index,
                        row: {}
                    });
                } else if (this.isxiugai == true) {
                    $('#orderItemList4').datagrid('updateRow', {
                        index: index,
                        row: {}
                    });
                } else {
                    $('#orderItemList').datagrid('updateRow', {
                        index: index,
                        row: {}
                    });
                }
            },

            // 模态框取消按钮点击事件
            cancel(name) {
                this.iscycle = true
                this.isfuwu = false
                this.isCheck = false
                this.isxiugai = false
                this.isEdit = false
                this.kjdj = false
                this.loading = true
                this.loading2 = true
                this.loading3 = true
                this.orderItemList = []
                this.orderItemList2 = []
                this.orderItemList4 = []
                this.StartTime1 = ''
                this.StartTime2 = ''
                this.StartTime3 = ''
                this.StartTime4 = ''
                this.StartTime5 = ''
                this.StartTime6 = ''
               /* this.formValidate.date = ''
                this.formValidate.serviceBeginDate = ''
                this.formValidateEadit.serviceBeginDate = ''
                this.formValidateEadit.date = ''
                this.formValidatexiugai.date = ''
                this.formValidatexiugai.serviceBeginDate = ''*/
                $('#orderItemList').datagrid('loadData', {total: 0, rows: []})
                this.$refs[name].resetFields();
            },

            // 获取公司列表
            getCompany() {
                let _self = this
                let url = ''
                _self.currentPage = 1

                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=1&pageSize=10'
                } else {
                    url = '/customer/company/list?page=1&pageSize=10&companyname=' + _self.searchCompany
                }

                _self.selectCompany = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        let _gds = ''
                        if(_res.rows[i].gdsreport == 'wbd') {
                            _gds = '未报道'
                        } else if(_res.rows[i].gdsreport == 'ybd') {
                            _gds = '已报道'
                        } else if(_res.rows[i].gdsreport == 'bybd') {
                            _gds = '不用报道'
                        } else {
                            _gds = ''
                        }
                        _self.data4.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                            gdsreport: _gds,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 公司列表 页码改变
            pageChange3(a) {
                let _self = this
                let url = ''
                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=' + a + '&pageSize=' + _self.pageSize
                } else {
                    url = '/customer/company/list?page=' + a + '&pageSize=' + _self.pageSize + '&companyname=' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        let _gds = ''
                        if(_res.rows[i].gdsreport == 'wbd') {
                            _gds = '未报道'
                        } else if(_res.rows[i].gdsreport == 'ybd') {
                            _gds = '已报道'
                        } else if(_res.rows[i].gdsreport == 'bybd') {
                            _gds = '不用报道'
                        } else {
                            _gds = ''
                        }
                        _self.data4.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                            gdsreport: _gds,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 公司列表 改变每页显示的数据条数
            pageSizeChange3(a) {
                let _self = this
                let url = ''
                _self.pageSize = a

                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=1&pageSize=' + _self.pageSize
                } else {
                    url = '/customer/company/list?page=1&pageSize=' + _self.pageSize + '&companyname=' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        let _gds = ''
                        if(_res.rows[i].gdsreport == 'wbd') {
                            _gds = '未报道'
                        } else if(_res.rows[i].gdsreport == 'ybd') {
                            _gds = '已报道'
                        } else if(_res.rows[i].gdsreport == 'bybd') {
                            _gds = '不用报道'
                        } else {
                            _gds = ''
                        }
                        _self.data4.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                            gdsreport: _gds,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 公司列表  搜索事件
            searchCompanyData() {
                let _self = this

                if (_self.searchCompany != '') {
                    _self.isSearch = true
                    _self.getCompany()
                } else {
                    _self.isSearch = false
                    _self.getCompany()
                }
            },

            // 监听回车事件
            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchCompanyData()
                }
            },

            // 公司列表  行选中事件
            rowSelect(a) {
                let _self = this

                _self.selectCompany = false

                if (_self.isEdit == true) {
                    _self.formValidateEadit.companyid = a.cpid
                    _self.formValidateEadit.NAME = a.NAME
                    _self.formValidateEadit.CompanyName = a.CompanyName

                    if(a.gdsreport == '未报道') {
                        _self.formValidateEadit.GDSreport = 'wbd'
                    } else if(a.gdsreport == '已报道') {
                        _self.formValidateEadit.GDSreport = 'ybd'
                    } else if(a.gdsreport == '不用报道') {
                        _self.formValidateEadit.GDSreport = 'bybd'
                    } else {
                        _self.formValidateEadit.GDSreport = ''
                    }
                } else {
                    _self.formValidate.cpid = a.cpid
                    _self.formValidate.NAME = a.NAME
                    _self.formValidate.CompanyName = a.CompanyName

                    if(a.gdsreport == '未报道') {
                        _self.formValidate.GDSreport = 'wbd'
                    } else if(a.gdsreport == '已报道') {
                        _self.formValidate.GDSreport = 'ybd'
                    } else if(a.gdsreport == '不用报道') {
                        _self.formValidate.GDSreport = 'bybd'
                    } else {
                        _self.formValidate.GDSreport = ''
                    }
                }
            },

            // 【重新提交】按钮 点击事件
            reApplyProcess() {
                let _self = this

                if (_self.currentProcess == 'Returned') {
                    _self.$Modal.confirm({
                        title: '重新提交审批',
                        content: '<p>是否重新提交审批</p>',
                        onOk: () => {
                            let url = '/activiti/reApplyProcessByOrderId?orderId=' + _self.customerId + '&auditFlag=1'

                            function doSuccess() {
                                _self.typeGroupId()
                                _self.getTableData()
                                _self.$Message.success('重新提交成功');
                            }

                            this.GetData(url, doSuccess)
                        },
                    });
                } else if (_self.currentProcess == '') {
                    _self.$Message.warning('请选择要重新提交的订单');
                } else {
                    _self.$Message.warning('该订单状态不允许重新提交');
                }
            },

            // easyUI 删除按钮被点击
            removeRows() {
                let _self = this
                let _form
                if (_self.isEdit == true) {
                    let dd = $("#orderItemList2").datagrid("getSelected");
                    _form = 'orderItemList2'

                    if (dd == null) {
                        _self.$Message.warning('请选择要移除的数据');
                    }

                    let index = $("#orderItemList2").datagrid("getRowIndex", dd);
                    $("#orderItemList2").datagrid("deleteRow", index);

                    if(index>0){
                        editIndex = index -1;

                        _self.itemOnClick(editIndex);

                    }else{
                        editIndex = null;
                    }
                    _self.savePrice(editIndex);


                    for (let i = 0; i < _self.orderItemList2.length; i++) {
                        if (_self.orderItemList2[i].product != '小规模代理记账' && _self.orderItemList2[i].product != '0申报代理记账' && _self.orderItemList2[i].product != '一般纳税人代理记账') {
                            _self.iscycle = true
                            break
                        }
                    }
                    for (let i = 0; i < _self.orderItemList2.length; i++) {
                        if (_self.orderItemList2[i].product != '会计到家') {
                            _self.isfuwu = false
                            _self.kjdj = false
                            break
                        }
                    }
                } else {
                    let dd = $("#orderItemList").datagrid("getSelected");
                    _form = 'orderItemList'

                    if (dd == null) {
                        _self.$Message.warning('请选择要移除的数据');
                    }

                    let index = $("#orderItemList").datagrid("getRowIndex", dd);
                    $("#orderItemList").datagrid("deleteRow", index);

                    _self.savePrice(editIndex);

                    if(index>0){
                        editIndex = index -1;

                        _self.itemOnClick(editIndex);

                    }else{
                        editIndex = null;
                    }
                    _self.savePrice(editIndex);
                    for (let i = 0; i < _self.orderItemList.length; i++) {
                        if (_self.orderItemList[i].product != '小规模代理记账' && _self.orderItemList[i].product != '0申报代理记账' && _self.orderItemList[i].product != '一般纳税人代理记账') {
                            _self.iscycle = true
                            break
                        }
                    }
                    for (let i = 0; i < _self.orderItemList.length; i++) {
                        if (_self.orderItemList[i].product != '会计到家') {
                            _self.isfuwu = false
                            _self.kjdj = false
                            break
                        }
                    }
                }
            },

            // easyUI 返回归属部门数据
            departnamef(value, row, index) {
                // console.log(value)
                // console.log(row)
                // console.log(index)
                if (row.departid) {
                    return value;
                } else {
                    var servicedeparts = eval(row.servicedeparts) == null ? []
                        : eval(row.servicedeparts);
                    // console.log(servicedeparts)
                    for (var i = 0; i < servicedeparts.length; i++) {

                        if (servicedeparts[i]["departId"]
                            && servicedeparts[i]["departId"] == value) {
                            return servicedeparts[i]["departName"];
                        }

                    }
                }
            },

            departnamef2(value, row, index) {

                if (row.departid) {
                    return value;
                } else {
                    var servicedeparts = eval(row.servicedeparts) == null ? []
                        : eval(row.servicedeparts);

                    for (var i = 0; i < servicedeparts.length; i++) {

                        if (servicedeparts[i]["departId"]
                            && servicedeparts[i]["departId"] == value) {
                            return servicedeparts[i]["departName"];
                        }

                    }
                }
            },

            // 【查看会计到家服务项】按钮 点击事件
            kuaiji() {
                let _self = this
                let _isTrue = true
                let _id = ''

                if (_self.isEdit == true) {
                    _id = _self.formValidateEadit.companyid
                    _isTrue = (_self.formValidateEadit.CompanyName == '')
                } else if (_self.isxiugai == true) {
                    _id = _self.formValidatexiugai.companyid
                    _isTrue = (_self.formValidatexiugai.CompanyName == '')
                } else if (_self.isCheck == true) {
                    _id = _self.formValidateDetail.companyid
                    _isTrue = (_self.formValidateDetail.CompanyName == '')
                } else if (_self.isEdit != true) {
                    _id = _self.formValidate.cpid
                    _isTrue = (_self.formValidate.CompanyName == '')
                }

                if (_isTrue) {
                    _self.$Message.warning('请先选择归属公司');
                } else {
                    let url = '/system/serviceContract/template/queryTreegridByCode?templateCode=kjdafwxy&objectId=' + _id
                    _self.fuwux = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _selectItems = []
                        _self.data2 = []

                        if (response.data.data.selectItems != null) {
                            _selectItems = response.data.data.selectItems.split(',')
                        }

                        for (let i = 0; i < _data.treeData.length; i++) {
                            let _children = []
                            for (let j = 0; j < _data.treeData[i].children.length; j++) {
                                if (_self.isCheck == true) {
                                    _children.push({
                                        disableCheckbox: true,
                                        id: _data.treeData[i].children[j].id,
                                        expand: true,
                                        checked: false,
                                        title: _data.treeData[i].children[j].typeName
                                    })
                                } else {
                                    _children.push({
                                        id: _data.treeData[i].children[j].id,
                                        expand: true,
                                        checked: false,
                                        title: _data.treeData[i].children[j].typeName
                                    })
                                }
                            }

                            if (response.data.data.selectItems != null) {
                                for (let a = 0; a < _children.length; a++) {
                                    for (let b = 0; b < _selectItems.length; b++) {
                                        if (_selectItems[b] == _children[a].id) {
                                            _children[a].checked = true
                                        }
                                    }
                                }
                            }

                            if (_self.isCheck == true) {
                                _self.data2.push({
                                    disableCheckbox: true,
                                    title: _data.treeData[i].typeName,
                                    expand: true,
                                    children: _children
                                })
                            } else {
                                _self.data2.push({
                                    title: _data.treeData[i].typeName,
                                    expand: true,
                                    children: _children
                                })
                            }
                        }

                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 【查看会计到家服务项】 提交选中数据
            fwxtj() {
                let _self = this

                if (_self.isCheck == true) {

                } else {
                    let _checkedNodes = _self.$refs.tree.getCheckedNodes()
                    let _data = []
                    let _postData = {}

                    for (let i = 0; i < _checkedNodes.length; i++) {
                        if (_checkedNodes[i].children != undefined) {
                        } else {
                            if (_checkedNodes[i].checked == true) {
                                _data.push(_checkedNodes[i].id)
                            }
                        }
                    }

                    let url = '/system/serviceContract/template/item/target/save'
                    _postData.templateCode = 'kjdafwxy'
                    _postData.itemIds = _data.join(',')

                    if (_self.isEdit == true) {
                        _postData.objectId = _self.formValidateEadit.companyid
                    } else if (_self.isxiugai == true) {
                        _postData.objectId = _self.formValidatexiugai.companyid
                    } else {
                        _postData.objectId = _self.formValidate.cpid
                    }

                    function doSuccess() {
                        _self.$Message.success('提交成功');
                    }

                    this.PostData(url, _postData, doSuccess)
                }
            },

            // 【编辑】按钮 点击事件
            orderEdit() {
                let _self = this
                let url = '/order/detail/' + _self.customerId

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要编辑的订单');
                } else if (_self.currentProcess != 'Ready' && _self.currentProcess != 'Returned' && _self.currentProcess != 'ReturnedToReady') {
                    _self.$Message.warning('该订单状态不允许编辑');
                }
                else {
                    _self.eaditOrder = true
                    _self.isEdit = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _date = ''
                        if (_data.serviceStartDate != '' && _data.serviceStartDate != null) {
                            _date = _data.serviceStartDate.slice(0,7)
                        } else {
                            _date = ''
                        }
                        _self.formValidateEadit.CompanyName = _data.CompanyName
                        _self.formValidateEadit.id = _data.id
                        _self.formValidateEadit.companyid = _data.companyid
                        _self.formValidateEadit.GDSreport = _data.gdsreport
                        _self.formValidateEadit.NAME = _data.name
                        _self.formValidateEadit.nodeducttotalmoney = _data.nodeducttotalmoney
                        _self.formValidateEadit.date = _data.payTime
                        _self.formValidateEadit.isornotkp = _data.isornotkp
                        _self.StartTime3 = _data.payTime
                        _self.formValidateEadit.payDir = _data.paydir,
                        _self.formValidateEadit.orderPayNumber = _data.realnumber
                        _self.formValidateEadit.zongjia = _data.paynumber
                        _self.formValidateEadit.serviceBeginDate = _date
                        _self.StartTime4 = _date
                        _self.formValidateEadit.tel = _data.tel
                        _self.formValidateEadit.ticheng = _data.performanceMoney
                        _self.formValidateEadit.performanceMoney = _data.performanceMoney
                        _self.orderItemList2 = _data.items

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '小规模代理记账' || _data.items[i].product == '0申报代理记账' || _data.items[i].product == '一般纳税人代理记账') {
                                _self.iscycle = false
                                break
                            }
                        }

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].iscycle == 'Y') {
                                _self.formValidateEadit.iscycle = 'Y'
                            } else {
                                _self.formValidateEadit.iscycle = 'N'
                            }
                        }

                        $('#orderItemList2').datagrid({
                            idField: 'id',
                            title: '',
                            height: 300,
                            data: _self.orderItemList2,
                            height: 300,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80, editor: 'numberbox'},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80,
                                    editor: {type: 'numberbox',  options: {precision: 2}}
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100, editor: {type: 'numberbox'}}, 
                                        
                                {field:'servicestartdate',title:'服务开始税期',width:90,editor: {type: 'textbox'},
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    editor: 'text',
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                    editor: {type: 'numberbox', options: {precision: 2}}
                                },
                                {field: 'memo', title: '备注 ', width: 300, editor: 'textarea'}
                            ]],
                            onClickCell: function (index, field) {
                                if (_self.endEditing()){
                                    $('#orderItemList2').datagrid('selectRow', index)
                                        .datagrid('editCell', {index:index,field:field});
                                    editIndex = index;
                                }
                                _self.itemOnClick(index, field)
                            },
                            onBeforeEdit: function (index, row) {
                                row.editing = true;
                                _self.updateActions(index);
                            },
                            onAfterEdit: function (index, row) {
                                row.editing = false;
                                _self.updateActions(index);
                            },
                        })
                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 【修改】按钮 点击事件
            xiugaiOpen() {
                let _self = this
                let url = '/order/detail/' + _self.customerId

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要修改的订单');
                } else if (_self.currentProcess != 'Finished') {
                    _self.$Message.warning('该订单状态不允许修改');
                } else {
                    _self.xiugai = true
                    _self.isxiugai = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _date = ''
                        if (_data.serviceStartDate != '' && _data.serviceStartDate != null) {
                            _date = _data.serviceStartDate.slice(0,7)
                        } else {
                            _date = ''
                        }
                        _self.formValidatexiugai.payDir = _data.paydir,
                        _self.formValidatexiugai.CompanyName = _data.CompanyName
                        _self.formValidatexiugai.id = _data.id
                        _self.formValidatexiugai.companyid = _data.companyid
                        _self.formValidatexiugai.GDSreport = _data.gdsreport
                        _self.formValidatexiugai.NAME = _data.name
                        _self.formValidatexiugai.nodeducttotalmoney = _data.nodeducttotalmoney
                        _self.formValidatexiugai.date = _data.payTime
                        _self.StartTime5 = _data.payTime
                        _self.formValidatexiugai.orderPayNumber = _data.realnumber
                        _self.formValidatexiugai.zongjia = _data.paynumber
                        _self.formValidatexiugai.performanceMoney = _data.performanceMoney
                        _self.formValidatexiugai.serviceBeginDate = _date
                        _self.formValidatexiugai.ticheng = _data.performanceMoney
                        _self.formValidatexiugai.tel = _data.tel
                        _self.formValidatexiugai.isornotkp = _data.isornotkp
                        _self.orderItemList4 = _data.items
                        // console.log(_self.getStartTime5)
                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }

                        $('#orderItemList4').datagrid({
                            idField: 'id',
                            title: '',
                            height: 300,
                            data: _self.orderItemList4,
                            height: 300,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            /** 
                             * 财务修改，待定
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                             * 
                            */
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80,},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80                                    
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100}, 
                                        
                                {field:'servicestartdate',title:'服务开始税期',width:90,
                                    // formatter: function(val, row, a) {
                                    //     return row.servicestartdate
                                    // }
                                }, 
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    editor: 'text',
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                    editor: {type: 'numberbox',  options: {precision: 2}}
                                },
                                {field: 'memo', title: '备注 ', width: 300, editor: 'textarea'}
                            ]],
                            onClickCell: function (index, field) {
                                if (_self.endEditing()){
                                    $('#orderItemList4').datagrid('selectRow', index)
                                        .datagrid('editCell', {index:index,field:field});
                                    editIndex = index;
                                }
                                _self.itemOnClick(index, field)
                            },
                            onBeforeEdit: function (index, row) {
                                row.editing = true;
                                _self.updateActions(index);
                            },
                            onAfterEdit: function (index, row) {
                                row.editing = false;
                                _self.updateActions(index);
                            },
                        })
                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 【企划（修改）】按钮点击事件
            qihuaOpen() {
                let _self = this
                let url = '/order/detail/' + _self.customerId

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要修改的订单');
                } else if (_self.currentProcess != 'Finished') {
                    _self.$Message.warning('该订单状态不允许修改');
                } else {
                    _self.xiugai = true
                    _self.isxiugai = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _date = ''
                        if (_data.serviceStartDate != '' && _data.serviceStartDate != null) {
                            _date = _data.serviceStartDate.slice(0,7)
                        } else {
                            _date = ''
                        }
                        _self.formValidatexiugai.CompanyName = _data.CompanyName
                        _self.formValidatexiugai.id = _data.id
                        _self.formValidatexiugai.companyid = _data.companyid
                        _self.formValidatexiugai.GDSreport = _data.gdsreport
                        _self.formValidatexiugai.NAME = _data.name
                        _self.formValidatexiugai.nodeducttotalmoney = _data.nodeducttotalmoney
                        _self.formValidatexiugai.date = _data.payTime
                        _self.formValidatexiugai.orderPayNumber = _data.realnumber
                        _self.formValidatexiugai.zongjia = _data.paynumber
                        _self.formValidatexiugai.serviceBeginDate = _date
                        _self.formValidatexiugai.tel = _data.tel
                        _self.formValidatexiugai.ticheng = _data.performanceMoney
                        _self.formValidatexiugai.performanceMoney = _data.performanceMoney
                        _self.formValidatexiugai.isornotkp = _data.isornotkp
                        _self.orderItemList4 = _data.items

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }

                        $('#orderItemList4').datagrid({
                            idField: 'id',
                            title: '',
                            height: 300,
                            data: _self.orderItemList4,
                            rownumbers: true,
                            singleSelect: true,
                            frozenColumns: [[]],
                            columns: [[
                                {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                {field: 'product', title: '产品名', width: 150},
                                {field: 'propertys', title: '产品属性', width: 250},
                                {field: 'oaprice', title: '产品价格', width: 100},
                                {field: 'productnumber', title: '产品数量', width: 80,  editor: 'numberbox'},
                                {
                                    field: 'paynumber',
                                    title: '销售价格',
                                    width: 80,
                                    editor: {type: 'numberbox',  options: {precision: 2}}
                                },
                                {field: 'givethenumber', title: '赠送数量', width: 100, editor: {type: 'numberbox'}},
                                 {
                                    field: 'departname',
                                    title: '服务部门',
                                    width: 140,
                                    editor: 'text',
                                    formatter: function (value, rec, index) {
                                        return _self.departnamef(value, rec, index);
                                    }
                                }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                    field: 'servicedeparts',
                                    title: '服务部门id',
                                    hidden: true
                                }, {
                                    field: 'unitprice',
                                    title: '单价/月',
                                    width: 70,
                                    editor: {type: 'numberbox', options: {precision: 2}}
                                },
                                {field: 'memo', title: '备注 ', width: 300, editor: 'textarea'}
                            ]],
                            onClickCell: function (index, field) {
                                if (_self.endEditing()){
                                    $('#orderItemList4').datagrid('selectRow', index)
                                        .datagrid('editCell', {index:index,field:field});
                                    editIndex = index;
                                }
                                _self.itemOnClick(index, field)
                            },
                            onBeforeEdit: function (index, row) {
                                row.editing = true;
                                _self.updateActions(index);
                            },
                            onAfterEdit: function (index, row) {
                                row.editing = false;
                                _self.updateActions(index);
                            },
                        })
                    }

                    this.GetData(url, doSuccess)
                }
            },

            // 【作废订单项】按钮 点击事件
            zuofei() {
                let _self = this
                let dd = $("#orderItemList4").datagrid("getSelected");

                if (dd == null) {
                    _self.$Message.warning('请选择要作废的订单项');
                }
            },

            // 搜索事件
            handleSubmit(name) {
                let _self = this
                let url = '/order/list?page=1&pageSize=10'

                function doSuccess() {

                }

                this.GetData(url, doSuccess)
            },

            isEmptyObject(obj) {
                for (var key in obj) {
                    return true;
                }
                return false;
            },

            itemOnClick(index,field) {
                // console.log(index)
                // console.log(field)
                let _self = this

                let itemGrid
                let _form
                // console.log()

                //  根据最终价格添加备注内容，有部分bug
                if(_self.isEdit == false && _self.isxiugai == false){
                    if(_self.orderItemList[index].unitprice != _self.old_price && _self.orderItemList[index].skuid == "1007"){
                        if(_self.orderItemList[index].unitprice>=2000){
                            _self.orderItemList[index].memo = "一年4次外勤、可做减少收入"
                            _self.old_price = _self.orderItemList[index].unitprice
                        }else{
                            _self.orderItemList[index].memo = ""
                            _self.old_price = _self.orderItemList[index].unitprice
                        }
                        // let eaRows = $('#orderItemList').datagrid('getRows')
                        //     for(let j = 0;j<eaRows.length;j++){
                        //         $('#orderItemList').datagrid('endEdit',j)
                        //     }
                    }else{
                        _self.old_price = _self.orderItemList[index].unitprice
                    }
                }

                if (_self.isEdit == true) {
                    itemGrid = $("#orderItemList2")
                    _form = 'orderItemList2'
                } else if (_self.isxiugai == true) {
                    itemGrid = $("#orderItemList4")
                    _form = 'orderItemList4'
                } else {
                    itemGrid = $("#orderItemList")
                    _form = 'orderItemList'
                }
                console.log(itemGrid)
                

                if (field == 'servicestartdate') {
                    _self.selectDate = true
                    _self.fieldIndex = index
                }

                itemGrid.datagrid('selectRow', index).datagrid("endEdit",index)
                itemGrid.datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});

                var editors = itemGrid.datagrid("getEditors", index);
                var targetObjs = {};
                var row = itemGrid.datagrid("getSelected");

                for (var i = 0; i < editors.length; i++) {
                    if ("paynumber" == editors[i].field) {

                        targetObjs.paynumber = editors[i].target;

                    }

                    if ("productnumber" == editors[i].field) {


                        targetObjs.productnumber = editors[i].target;


                    }

                    if ("memo" == editors[i].field) {


                        targetObjs.memo = editors[i].target;


                    }

                    if ("plusdeduct" == editors[i].field) {//是否计提成

                        targetObjs.plusdeduct = editors[i].target;

                    }

                    if ("departname" == editors[i].field) {

                        targetObjs.departname = editors[i].target;

                    }

                    if ("givethenumber" == editors[i].field) {

                        targetObjs.givethenumber = editors[i].target;

                    }

                }

                if (targetObjs.paynumber != undefined) {
                    targetObjs.paynumber.next().children().bind("change", function() {
                        itemGrid.datagrid('updateRow',{
                            index: index,
                            row: {
                                paynumber: $(this).val(),
                            }
                        });

                        _self.savePrice(field)
                    });
                }

                if(targetObjs.givethenumber != undefined){
                    targetObjs.givethenumber.next().children().bind("change",function(){
                        itemGrid.datagrid('updateRow',{
                            index: index,
                            row: {
                                givethenumber: $(this).val(),
                            }
                        });

                        _self.savePrice(field);
                    });
                }


                if(targetObjs.memo != undefined){
                    targetObjs.memo.bind("change",function(){
                        itemGrid.datagrid('updateRow',{
                            index: index,
                            row: {
                                memo: $(this).val(),
                            }
                        });

                        _self.savePrice(field);
                    });
                }
                var pl = [];
                pl[0]={type: "Y", text: "是"};
                pl[1]={type: "N", text: "否"}
                if( targetObjs.plusdeduct != undefined){
                    targetObjs.plusdeduct.combobox({
                        data: pl,
                        valueField: 'type',
                        textField: 'text',
                        onSelect: function(param){


                            targetObjs.plusdeduct.combobox("destroy");
                            itemGrid.datagrid('updateRow', {
                                index: index,
                                row: {
                                    plusdeduct: param.type

                                }
                            });
                            _self.savePrice(field);

                        }
                    });
                }

                if (targetObjs.productnumber != undefined) {
                    targetObjs.productnumber.next().children().bind("change", function () {

                        //更改销售价格
                        var productnumber = $(this).val();
                        var rows = itemGrid.datagrid("getRows");

                        itemGrid.datagrid('updateRow',{
                            index: index,
                            row: {
                                paynumber: productnumber * row.oaprice,
                                productnumber: productnumber,
                            }
                        });

                        itemGrid.datagrid('selectRow', index).datagrid("beginEdit", index);
                        _self.savePrice(field)
                    });
                }

                    if(field == "departname"){
                        var d = eval(row.servicedeparts) == null ? [] : eval(row.servicedeparts);
                        console.log("11111111")
                            targetObjs.departname.combobox({
                            data: d,
                            valueField: 'type',
                            textField: 'text',
                            onSelect: function (re) {
                                targetObjs.departname.combobox("destroy");
                                itemGrid.datagrid('updateRow', {
                                    index: index,
                                    row: {
                                        departname: re.text,    
                                        departid: re.type
                                    }
                                });
                                _self.savePrice(field);
                            }
                        })
                    }
            },

            savePrice(field) {
                let _self = this
                let itemGrid
                let _form

                if (_self.isEdit == true) {
                    itemGrid = $("#orderItemList2")
                    _form = 'formValidateEadit'
                } else if (_self.isxiugai == true) {
                    itemGrid = $("#orderItemList4")
                    _form = 'formValidatexiugai'
                } else {
                    itemGrid = $("#orderItemList")
                    _form = 'formValidate'
                }
                // alert(121212)
                var rows = itemGrid.datagrid("getRows");
                var paynumber = 0;
                var nodeducttotalmoney = 0;
                var performanceMoney = 0;
                for (var i = 0; i < rows.length; i++) {
                    var rowpay = rows[i].paynumber;

                    if (rows[i].plusdeduct == "N") {//表示不计提成
                        nodeducttotalmoney = +nodeducttotalmoney + (+rowpay);

                    } else {
                        performanceMoney = +performanceMoney + (+rowpay);

                    }

                    paynumber = +paynumber + (+rowpay);
                }

                var nowpaynumber = _self[_form].zongjia;
                var nowrealnumber = _self[_form].orderPayNumber;

                _self[_form].zongjia = paynumber
                if (_self.isEdit == true || _self.isxiugai == true) {

                } else {
                    _self[_form].ticheng = nodeducttotalmoney
                    if (nowpaynumber == nowrealnumber) {

                        _self[_form].orderPayNumber = paynumber

                    }
                }

                var m = _self[_form].orderPayNumber + nodeducttotalmoney;

                if (m < 0) {
                    m = 0;
                }
                if (m > (paynumber - nodeducttotalmoney)) {
                    m = +paynumber - nodeducttotalmoney;
                }

                if (_self.isEdit == true || _self.isxiugai == true) {

                } else {
                    _self[_form].performanceMoney = _self[_form].ticheng
                }

                if (editIndex != null) {
                    _self.itemOnClick(editIndex,field);
                }
            },

            // 查看审批备注
            cksp(re) {
                let _self = this

                // let url = '/activiti/getProcessInstanceComments?bussinessKey=' + re.row.id
                let url = '/order/approveRecord?orderId=' + re.row.id
                _self.checkMemo = true

                function doSuccess(re) {
                    _self.checkMemodata = []
                    // console.log(re.data.data)
                           for (let i = 0; i < re.data.data.length; i++) {
                                _self.checkMemodata.push({
                                    message: re.data.data[i].record,
                                    time: re.data.data[i].createDate,
                                    userId: re.data.data[i].auditName,
                                })
                            }
                }

                this.GetData(url, doSuccess)
            },

            typeGroupId() {
                let _self = this
                // let url = '/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDirs'

                // function doSuccess(re) {
                //     _self.payDirData = re.data.data.payDirs
                // }

                // this.GetData(url, doSuccess)

                let params = "payDirs"

                function finsih(res){
                    _self.payDirData = res.data.data.payDirs
                }

                this.$GetDataCenter(params, finsih)
            },

            getStartTime(re) {
                this.StartTime1 = re
            },
            getStartTime2(re) {
                let pattern = '-'
                this.StartTime2 = re.replace(new RegExp(pattern), "")
            },
            getStartTime3(re) {
                this.StartTime3 = re
            },
            getStartTime4(re) {
                this.StartTime4 = re
            },
            getStartTime5(re) {
                this.StartTime5 = re
            },
            getStartTime6(re) {
                this.StartTime6 = re
            },

            // 流程图查询
            flowChart() {
                let _self = this

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    _self.flowChart2 = true
                    _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + _self.customerId
                }
            },
            refresh(){
                let _self = this
                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    let url = `api/order/orderApprovalFinish`
                    let config = {
                        params:{
                            orderId: _self.customerId
                        }
                    }

                    function success(res){
                        console.log(res)
                    }

                    // function fail(err){
                    //     console.log(err)
                    // }

                    _self.$Get(url, config, success)
                }
            },

            Dateok() {
                let _self = this
                let itemGrid = ''
                let _form = ''

                if (_self.isEdit == true) {
                    itemGrid = $("#orderItemList2")
                    _form = 'orderItemList2'
                } else if (_self.isxiugai == true) {
                    itemGrid = $("#orderItemList4")
                    _form = 'orderItemList4'
                } else {
                    itemGrid = $("#orderItemList")
                    _form = 'orderItemList'
                }

                itemGrid.datagrid('updateRow',{
                            index: _self.fieldIndex,
                            row: {
                                servicestartdate: _self.StartTime2,
                            }
                        });

                itemGrid.datagrid("endEdit", _self.fieldIndex)

                _self.selectDate = false
            },
            getPayDirs(){
                let _self = this
                function finsih(res){
                    // console.log(res)
                    _self.payDirType = res.data.data.payDirs
                    // console.log(_self.payDirType)
                }
                this.$GetDataCenter("payDirs",finsih)
            },
            getCluesources(){
                let _self = this
                let config = 'cluesources'
                function finish(res){
                    // console.log(res.data.data.cluesources)
                    _self.cluesources = res.data.data.cluesources
                    _self.cluesources_map = _self.$array2map(_self.cluesources)
                    // console.log(_self.cluesources_map)
                }
                this.$GetDataCenter(config, finish)
            },
            orderItemList_change(){
                console.log(this.orderItemList)
            }
        },
        mounted() {
            this.typeGroupId()
            this.getCluesources()
            this.getPayDirs()
            this.getTableData()
        },
        created(){
            let _self = this   
        },
        watch:{
        //     orderItemList:{
        //         handler(newValue, oldValue) {
        //             console.log(newValue)
        //             console.log(newValue[0].unitprice)

        //             if(newValue[0].unitprice >= 2000.00 ){
        //                 console.log('#')
        //                 // newValue[0].memo == "一年4次外勤、可做减少收入"
        //                 Vue.set(newValue[0],"memo","一年4次外勤、可做减少收入")
        //             }else{
        //                 Vue.set(newValue[0],"memo","")
        //             }
        //     　　　},
        //     　　　deep: true
        //     }
        }
    }
</script>