<template>
    <div>
        <Modal
                v-model="detail"
                title="公司详情"
                width="850"
                @on-cancel="cancel"
        >
        <Spin fix size="large" v-if="spinShow"></Spin>
            <Tabs v-model="openTab">
                <TabPane label="客户跟进记录" name="name8">
                    <!-- <Row style="margin-top:10px;margin-bottom:10px;font-size:16px;margin-left:30px">
                        <span>公司名称：{{companyInfo.companyname}}</span>
                        <span style="margin-left:20px">归属客户：{{companyInfo.NAME}}</span>                        
                    </Row> -->
                    <Row>
                        <Form ref="addDetailContent" :model="addDetailContent" :label-width="120">
                            <Row :gutter="16">
                                <Col span="20">
                                    <FormItem prop="followUpType" label="公司名称：" style="margin-bottom:5px">
                                        {{companyInfo.companyname}}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="20">
                                    <FormItem prop="followUpType" label="归属客户：" style="margin-bottom:5px">
                                        {{companyInfo.NAME}}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" v-if="followupshow">
                                <Col span="20">
                                    <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                                        <!-- <Select transfer v-model="addDetailContent.followUpType" size="small" :disabled="followupshow"> -->
                                        <Select transfer v-model="addDetailContent.followUpType" size="small">
                                            <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="20">
                                    <FormItem prop="content" label="跟进内容：" style="margin-bottom:5px">
                                        <Input v-model="addDetailContent.content" type="textarea"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                    <Col span="20">
                                    <FormItem style="margin-bottom:5px" label="沟通证据：">
                                        <!-- class="upload_before" -->
                                        <Upload
                                                ref="upload"
                                                multiple
                                                :before-upload="handleUpload"
                                                action="/api/customer/addCustomerContentImg"
                                                >
                                            <Button type="ghost" icon="ios-cloud-upload-outline" :class="{input_warning:warning}">选择文件</Button>
                                        </Upload>
                                        <!-- <div v-show="warning" style="color:#ed3f14;height:20px;margin-bottom:5px;line-height:20px">请上传附件</div> -->
                                        <div v-for="(item,index) in show_file" :key=index>{{ item.name }}
                                            <Button type="text" @click="fileRemove(item)">移除</Button>
                                        </div>
                                        
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col :push="3"><Button type="primary" @click="upload" :loading="followUp_loading">新增跟进</Button></Col>
                            <!-- <Button type="primary" @click="add_workorder_followup" :loading="followUp_loading">新增</Button> -->
                            
                            <!-- <Button type="ghost" @click="cancel_workorder_followup">重置</Button>  -->
                        </Row>
                                               
                    </Row>
                    <!-- <Row>
                        <Button type="primary" @click="create_new_followup" style="margin-left:10px">新增跟进记录</Button>
                    </Row> -->
                    <Row>
                        <!-- <div style="margin-top: 20px;margin-left:10px;margin-right:10px;max-height:450px;overflow:hidden" class="wrapper" ref="wrapper">
                            <div class="content"> -->
                            <!-- <Scroll height="300" style="margin-top:15px"> -->
                            <Table
                                style="margin-top:15px"
                                height="300"
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="followUpHeader"
                                :data="followUpData">
                            </Table>
                                <!-- <Row>
                                    <center style="padding-bottom:30px;padding-top:30px">--没有更多记录！--</center>
                                </Row> -->
                            <!-- </Scroll> -->
                            <!-- </div>
                        </div> -->
                    </Row>
                </TabPane>
                <TabPane label="企业信息" name="name1">
                    <Form ref="companyInfo" :model="companyInfo" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="companyname" label="公司名称：" style="margin-bottom:5px">
                                    {{companyInfo.companyname}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="NAME" label="归属客户：" style="margin-bottom:5px">
                                    {{companyInfo.NAME}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="serviceaddress" label="服务地址：" style="margin-bottom:5px">
                                    {{companyInfo.serviceaddress}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="TEL" label="客户电话：" style="margin-bottom:5px">
                                    {{companyInfo.TEL}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="cluesource" label="企业来源：" style="margin-bottom:5px">
                                    {{companyInfo.cluesource}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="enterprisestatus" label="企业状态：" style="margin-bottom:5px">
                                    {{companyInfo.enterprisestatus}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="importlevel" label="重要等级：" style="margin-bottom:5px">
                                    {{companyInfo.importlevel}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="financelevel" label="年度纳税评级：" style="margin-bottom:5px">
                                    {{companyInfo.financelevel}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="transactiontype" label="企业交易状态：" style="margin-bottom:5px">
                                    {{companyInfo.transactiontype}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="机构代码：" style="margin-bottom:5px">
                                    {{companyInfo.bankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="信用机构代码：" style="margin-bottom:5px">
                                    {{companyInfo.bankcode}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="bankcode" label="开户许可证：" style="margin-bottom:5px">
                                    {{companyInfo.bankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="basicbank" label="基本户开户行：" style="margin-bottom:5px">
                                    {{companyInfo.basicbank}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="basicbankcode" label="基本户开户行账号：" style="margin-bottom:5px">
                                    {{companyInfo.basicbankcode}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="simplebank" label="一般开户行：" style="margin-bottom:5px">
                                    {{companyInfo.simplebank}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="type" label="企业纳税类型：" style="margin-bottom:5px">
                                    {{companyInfo.type}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="accountgrade" label="账务等级：" style="margin-bottom:5px">
                                    {{companyInfo.accountgrade}}
                                </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="cnumber" label="国税号码：" style="margin-bottom:5px">
                                    {{companyInfo.cnumber}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="pnumber" label="地税号码：" style="margin-bottom:5px">
                                    {{companyInfo.pnumber}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="cpassword" label="国税密码：" style="margin-bottom:5px">
                                    {{companyInfo.cpassword}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="ppassword" label="地税密码：" style="margin-bottom:5px">
                                    {{companyInfo.ppassword}}
                                </FormItem>
                            </Col>
                        </Row> -->
                        <Row>
                            <Col span="1" style="visibility:hidden">1</Col>
                            <FormItem prop="c" style="margin-bottom:5px">
                                <div slot="label">相关资料：</div>
                            </FormItem>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="主体信息" name="name2">
                    <Row>
                        <!-- <div style="margin-top: 10px;margin-left:10px;margin-right:10px;max-height:500px;overflow:hidden" class="wrapper1" ref="wrapper1">
                        <div class="content1"> -->
                        <Scroll height="500">
                            <!-- <div style="height:1000px"></div> -->
                    <Form ref="mainInfo" :model="mainInfo" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="companyName" label="公司名称：" style="margin-bottom:5px">
                                    {{mainInfo.companyName}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="capitalCtb" label="注册资本：" style="margin-bottom:5px">
                                    {{mainInfo.capitalCtb}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="regAddress" label="注册地址：" style="margin-bottom:5px">
                                    {{mainInfo.regAddress}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="mainProduct" label="主营项目类别：" style="margin-bottom:5px">
                                    {{mainInfo.mainProduct}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="busnissterm" label="营业期限：" style="margin-bottom:5px">
                                    {{mainInfo.busnissterm}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="mainType" label="主体类型：" style="margin-bottom:5px">
                                    {{mainInfo.mainType}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="legalPerson" label="法人：" style="margin-bottom:5px">
                                    {{mainInfo.legalPerson}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="registerNo" label="注册号：" style="margin-bottom:5px">
                                    {{mainInfo.registerNo}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="busnissstatus" label="营业状态：" style="margin-bottom:5px">
                                    {{mainInfo.busnissstatus}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="issueDate" label="核发日期：" style="margin-bottom:5px">
                                    {{mainInfo.issueDate}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="10">
                                <FormItem prop="creditNo" label="社会信用代码：" style="margin-bottom:5px">
                                    {{mainInfo.creditNo}}
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <FormItem prop="companyName" label="issueDate" style="margin-bottom:5px">
                                    {{mainInfo.issueDate}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="registerOffice" label="登记机关：" style="margin-bottom:5px">
                                    {{mainInfo.registerOffice}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="shoptype" label="经营范围：" style="margin-bottom:5px">
                                    {{mainInfo.shoptype}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="intellectualProperty" label="商事主体信息：" style="margin-bottom:5px">
                                    <div v-html="mainInfo.intellectualProperty"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="shareholder" label="组织机构：" style="margin-bottom:5px">
                                    <div v-html="mainInfo.shareholder"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="permissionShopType" label="许可经营范围：" style="margin-bottom:5px">
                                    {{mainInfo.permissionShopType}}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="staff" label="股东信息：" style="margin-bottom:5px">
                                    <div v-html="mainInfo.staff"></div>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="24">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                                <FormItem prop="abnormalList" label="异常信息：" style="margin-bottom:5px">
                                    <div v-html="mainInfo.abnormalList"></div>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    </Scroll>
                        <!-- </div>
                    </div> -->
                    </Row>
                </TabPane>
                <TabPane label="工单信息" name="name3">
                    <Row style="margin-top: 10px;margin-left:10px">
                        <Row>
                        <!-- <div style="margin-top: 10px;margin-left:10px;margin-right:10px;max-height:500px;overflow:hidden" class="wrapper2" ref="wrapper2">
                            <div class="content2"> -->
                            <!-- <Scroll height="500"> -->
                                <Table
                                    height="400"
                                    style="margin-top:15px"
                                        ref="selection"
                                        highlight-row
                                        size="small"
                                        :columns="workOrderHeader"
                                        :data="workOrder"></Table>
                            <!-- </div> -->
                        <!-- </div> -->
                        <!-- </Scroll> -->
                        </Row>
                    </Row>
                </TabPane>
                <!-- <TabPane label="企业动态" name="name4">
                    <Row style="margin-left:10px">
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;margin-left:10px">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="companyDynamicHeader"
                                :data="companyDynamic"></Table>
                    </Row>
                </TabPane> -->
                <TabPane label="相关联系人" name="name5">
                    <!-- <Row style="margin-left:10px">
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
                        </ButtonGroup>
                    </Row> -->
                    <Row style="margin-top: 10px;margin-left:10px">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="realationPersonHeader"
                                :data="realationPerson"></Table>
                    </Row>
                </TabPane>
                <!-- <TabPane label="公司变更明细" name="name6">
                    <Row style="margin-top: 10px;margin-left:10px">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="companyChangeDetailHeader"
                                :data="companyChangeDetail"></Table>
                    </Row>
                </TabPane> -->
                <TabPane label="税种管理" name="name7">
                    <Row>
                        <Button type="primary" style="margin-bottom:20px" @click="editTax" v-if="isEditTax">编辑</Button>
                        <Button type="primary" style="margin-bottom:20px" @click="submitTax" v-if="!isEditTax" :loading="submit_ing">提交</Button>                        
                    </Row>
                    <Form ref="taxManagement" :model="taxManagement" :label-width="120">
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="companytype" label="账务等级：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.companytype" placeholder="" disabled>
                                        <Option v-for="item in financialLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>                                   
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="nationaltax" label="国税税种：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.nationaltax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">已核</Option>
                                        <Option value="N">未核</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="Localtax" label="地税税种：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.Localtax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">已核</Option>
                                        <Option value="N">未核</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalnum" label="电子税务局账号：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.nationalnum"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="nationalpsw" label="电子税务局密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.nationalpsw"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalnum" label="国税号码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.nationalnum"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="Localnum" label="地税号码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.Localnum"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalpsw" label="国税密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.nationalpsw"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="Localpsw" label="地税密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.Localpsw"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row> -->
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="addedvaluetax" label="增值税：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.addedvaluetax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="supertax" label="附加税：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.supertax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="Incometax" label="所得税：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.Incometax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="boxtax" label="个税：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.boxtax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="12" style="visibility:hidden">1</Col>                            
                            </Col>
                            <Col span="11">
                                <FormItem prop="Stamptax" label="印花税：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.Stamptax" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="12" style="visibility:hidden">1</Col>                            
                            <!-- <Col span="11" style="visibility:hidden"> -->
                            <!-- </Col> -->
                            <Col span="11">
                                <FormItem prop="socialsecurity" label="社保：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.socialsecurity" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">未申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="Providentfund" label="公积金：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.Providentfund" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">需申报</Option>
                                        <Option value="N">不需申报</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="taxdisk" label="税控盘：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.taxdisk" placeholder="" :disabled="isEditTax">
                                        <Option value="Y">有</Option>
                                        <Option value="N">无</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="Providentfundnum" label="公积金账户名：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.Providentfundnum" placeholder="" disabled>
                             
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="Providentfundpsw" label="公积金密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.Providentfundpsw" placeholder="" disabled>
                                      
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="1" style="visibility:hidden">1</Col>                            
                            <Col span="11">
                                <FormItem prop="socialsecuritypsw" label="社保密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.socialsecuritypsw" placeholder="" disabled>
                                     
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
            </Tabs>
            <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="contentdetail"
                title="跟进详情"
                width="700"
                @on-cancel="cancelContent">
                <Form ref="detailContent" :model="detailContent" :label-width="120">
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="typename" label="跟进类型：" style="margin-bottom:5px">
                                {{detailContent.typename}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="service_content" label="跟进内容：" style="margin-bottom:5px">
                                <div v-html="detailContent.service_content"></div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="realname" label="跟进人：" style="margin-bottom:5px">
                                {{detailContent.realname}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="createdate" label="跟进时间：" style="margin-bottom:5px">
                                {{detailContent.createdate}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
        </Modal>
        <Modal
                v-model="addcontentdetail"
                title="新增跟进"
                width="700"
                @on-cancel="canceladdContent">
                                      
                </Row>
                <Form ref="addDetailContent" :model="addDetailContent" :label-width="120">
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="公司名称：" style="margin-bottom:5px">
                                {{companyInfo.companyname}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="归属客户：" style="margin-bottom:5px">
                                {{companyInfo.NAME}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" v-if="followupshow">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                                <!-- <Select transfer v-model="addDetailContent.followUpType" size="small" :disabled="followupshow"> -->
                                <Select transfer v-model="addDetailContent.followUpType" size="small">
                                    <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="content" label="跟进内容：" style="margin-bottom:5px">
                                <Input v-model="addDetailContent.content" type="textarea"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                            <FormItem style="margin-bottom:5px" label="沟通证据：">
                                <!-- class="upload_before" -->
                            
                                <Upload
                                        ref="upload"
                                        multiple
                                        :before-upload="handleUpload"
                                        action="/api/customer/addCustomerContentImg"
                                        >
                                    <Button type="ghost" icon="ios-cloud-upload-outline" :class="{input_warning:warning}">选择文件</Button>
                                </Upload>
                                <!-- <div v-show="warning" style="color:#ed3f14;height:20px;margin-bottom:5px;line-height:20px">请上传附件</div> -->
                                <div v-for="(item,index) in show_file" :key=index>{{ item.name }}
                                    <Button type="text" @click="fileRemove(item)">移除</Button>
                                </div>
                                
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
                <div slot="footer">
                    <!-- <Button type="primary" @click="add_workorder_followup" :loading="followUp_loading">新增</Button> -->
                    <Button type="primary" @click="upload" :loading="followUp_loading">新增</Button>
                    <Button type="ghost" @click="cancel_workorder_followup">重置</Button>                    
                </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../components/bus.js'
    // import Bscroll from 'better-scroll'
    // import { yasuo } from '../../../libs/img_beforeUpload.js'
    import { yasuo } from '../../../libs/img_beforeUpload'



    export default {
        props: ['companyId'],
        data(){
            return {
                followupshow:false,
                warning:false,
                //  上传图片相关
                attIds:"",
                show_file:[],
                file_array:[],
                followUp_loading:false,
                followTypeText:[],
                addDetailContent:{
                    followUpType:"",
                    content:"",
                    customerId:"",
                    companyId:""
                },
                //
                spinShow:false,
                addcontentdetail:false,
                contentdetail:false,
                detailContent:{
                    createdate:"",
                    realname:"",
                    service_content:"",
                    typename:"",
                },
                isEditTax:true,
                submit_ing:false,
                openTab:"",
                companyDynamic:[],
                realationPerson:[],
                companyChangeDetail:[],
                followUpData:[],
                detail:false,
                companyid: '',
                financialLevel:"",
                companyInfo:{
                    companyname: '',
                    NAME: '',
                    serviceaddress: '',
                    TEL: '',
                    cluesource: '',
                    enterprisestatus: '',
                    importlevel: '',
                    financelevel: '',
                    transactiontype: '',
                    bankcode: '',
                    basicbank: '',
                    basicbankcode: '',
                    simplebank: '',
                    type: '',
                    cnumber: '',
                    pnumber: '',
                    cpassword: '',
                    ppassword: ''
                },
                mainInfo:{
                    companyName: '',
                    capitalCtb: '',
                    regAddress: '',
                    mainProduct: '',
                    busnissterm: '',
                    mainType: '',
                    legalPerson: '',
                    registerNo: '',
                    busnissstatus: '',
                    issueDate:'',
                    creditNo:'',
                    registerOffice: '',
                    shoptype: '',
                    intellectualProperty: '',
                    shareholder: '',
                    permissionShopType: '',
                    staff: '',
                    abnormalList: '',
                },
                taxManagement:{
                    companyid:"",
                    companytype:'A',
                    nationaltax:'Y',
                    Localtax:'Y',
                    nationalnum:"",
                    nationalpsw:"",
                    Localnum:"",
                    Localpsw:"",
                    addedvaluetax:'Y',
                    Incometax:'Y',
                    supertax:'Y',
                    boxtax:'Y',
                    Stamptax:'Y',
                    socialsecurity:'Y',
                    Providentfund:'Y',
                    taxdisk:'Y',
                    socialsecuritypsw:"",
                    Providentfundnum:"",
                    Providentfundpsw:""
                },
                dynamic:[],
                workOrder:[],
                workOrderHeader: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 190
                    },
                    {
                        title: '所办服务',
                        key: 'product',
                        width: 140
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        width: 100
                    },
                    {
                        title: '联系方式',
                        key: 'servertel',
                        width: 120
                    },
                ],
                companyDynamicHeader: [
                    {
                        title: '变更内容',
                        key: 'gsmc',
                    },
                    {
                        title: '备注',
                        key: 'xfze',
                    },
                    {
                        title: '创建人',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ],
                realationPersonHeader: [
                    {
                        title: '联系人名称',
                        key: 'name',
                    },
                    {
                        title: '联系方式',
                        key: 'tel',
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        width: 120
                    }
                ],
                companyChangeDetailHeader: [
                    {
                        title: '旧公司名称',
                        key: 'gsmc',
                    },
                    {
                        title: '新公司名称',
                        key: 'xfze',
                    },
                    {
                        title: '操作人',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '变更时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ],
                followUpHeader:[
                    {
                        title:'跟进时间',
                        key:'createdate',
                        width:160
                    },
                    {
                        title:'跟进类型',
                        key: 'typename',
                        width:120
                    },
                    {
                        title:'跟进内容',
                        key:'service_content',
                        width: 300,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.service_content == ''||params.row.service_content == null){
                                return ''
                            }else if(params.row.service_content.length>20){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.service_content.slice(0,20)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:'250px',
                                        }
                                    },[
                                        h('span', params.row.service_content)
                                    ])
                                ])
                            }else{
                                return h('span', params.row.service_content)
                            }
                        }
                    },
                    {
                        title:'跟进人',
                        key:'realname',
                        width:100
                    },
                    {
                        title:'操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.openContent(params)
                                        }
                                    }
                                }, '[详情]')
                            ]
                        )                        
                    }
                }
            ],
        
        }
        },
        methods: {
            fpkj(){},
            ckbgrz(){},
            getData() {
                let _self = this
                _self.spinShow = true
                // let url = '/customer/company/detail?id=' + _self.companyid + '&detailTypes=basic,main,workOrder,taxManagement,customerRecord'
                let url = 'api/customer/company/detail'
                let config = {
                    params:{
                        id:_self.companyid,
                        detailTypes:"basic,main,workOrder,taxManagement,customerRecord,dynamic"
                    }
                }
                _self.detail = true
                function doSuccess(res) {
                    _self.companyInfo = res.data.data.basic.length != 0 ? res.data.data.basic[0] : {}
                    _self.mainInfo = res.data.data.main.length != 0 ? res.data.data.main[0] : {}
                    _self.workOrder = res.data.data.workOrder
                    _self.taxManagement = res.data.data.taxManagement.length != 0 ? res.data.data.taxManagement[0] : {}
                    _self.followUpData = res.data.data.customerRecord
                    _self.realationPerson = res.data.data.dynamic
                    _self.spinShow = false
                    // _self.scroll = new Bscroll(_self.$refs.wrapper, {
                    //     scrollbar:{
                    //         fade: false
                    //     },
                    //     mouseWheel:{
                    //         speed: 20,
                    //         invert: false,
                    //         easeTime: 300
                    //     }
                    // })
                    // _self.scroll = new Bscroll(_self.$refs.wrapper1, {
                    //     scrollbar:{
                    //         fade: false
                    //     },
                    //     mouseWheel:{
                    //         speed: 20,
                    //         invert: false,
                    //         easeTime: 300
                    //     }
                    // })
                //     _self.$nextTick(() => {
                //         // console.log('start')
                //         _self.scroll = new Bscroll(_self.$refs.wrapper, {
                //             scrollbar:{
                //                 fade: false
                //             },
                //             mouseWheel:{
                //                 speed: 20,
                //                 invert: false,
                //                 easeTime: 300
                //             }
                //         })
                //         // _self.scroll.refresh()
                //     })
                //     _self.$nextTick(() => {
                //         // console.log('start')
                //         _self.scroll = new Bscroll(_self.$refs.wrapper1, {
                //             scrollbar:{
                //                 fade: false
                //             },
                //             mouseWheel:{
                //                 speed: 20,
                //                 invert: false,
                //                 easeTime: 300
                //             }
                //         })
                //         // _self.scroll.refresh()
                // })
                //     _self.$nextTick(() => {
                //         // console.log('start')
                //         _self.scroll = new Bscroll(_self.$refs.wrapper2, {
                //             scrollbar:{
                //                 fade: false
                //             },
                //             mouseWheel:{
                //                 speed: 20,
                //                 invert: false,
                //                 easeTime: 300
                //             }
                //         })
                //         // _self.scroll.refresh()
                // })
                }
                this.$Get(url, config, doSuccess)
                // this.GetData(url, doSuccess)
            },

            cancel () {
                this.detail = false
                this.openTab = "name8"
            },
            editTax(){
                this.isEditTax = !this.isEditTax
            },
            submitTax(){
                let _self = this
                this.submit_ing = true
                let url = `api/customer/company/saveCompanyTaxManagement`
                let config = {
                    companyid:_self.companyid,
                    companytype:_self.taxManagement.companytype,
                    nationaltax:_self.taxManagement.nationaltax,
                    Localtax:_self.taxManagement.Localtax,
                    nationalnum:_self.taxManagement.nationalnum,
                    nationalpsw:_self.taxManagement.nationalpsw,
                    Localnum:_self.taxManagement.Localnum,
                    Localpsw:_self.taxManagement.Localpsw,
                    addedvaluetax:_self.taxManagement.addedvaluetax,
                    Incometax:_self.taxManagement.Incometax,
                    supertax:_self.taxManagement.supertax,
                    boxtax:_self.taxManagement.boxtax,
                    Stamptax:_self.taxManagement.Stamptax,
                    socialsecurity:_self.taxManagement.socialsecurity,
                    Providentfund:_self.taxManagement.Providentfund,
                    taxdisk:_self.taxManagement.taxdisk,
                    Providentfundpsw: _self.taxManagement.Providentfundpsw,
                    Providentfundnum: _self.taxManagement.Providentfundnum,
                    socialsecuritypsw: _self.taxManagement.socialsecuritypsw
                }
                function success(res){
                    _self.isEditTax = true  
                    _self.submit_ing = false                    
                }
                function fail(res){
                    _self.submit_ing = false                    
                }

                this.$Post(url,config,success,fail)

            },
            openContent(e){
                this.detailContent.createdate = e.row.createdate
                this.detailContent.realname = e.row.realname                
                this.detailContent.service_content = e.row.service_content
                this.detailContent.typename = e.row.typename
                this.contentdetail = true
            },
            cancelContent(){
                this.contentdetail = false
            },
            create_new_followup(){
                this.addcontentdetail = true
            },
            canceladdContent(){
                this.addDetailContent.followUpType = ""
                this.addDetailContent.content = ""
                this.addcontentdetail = false
            },
            add_workorder_followup(){
                let url =  `api/customer/addCustomerContentNote`
                let _self = this
                let config = {
                    content: _self.addDetailContent.content,
                    customerId: _self.companyInfo.customerid,
                    companyId:_self.companyInfo.id,
                    followUpType: _self.addDetailContent.followUpType,
                    attIds:_self.attIds
                }
                function success(res){
                    _self.getData()
                    _self.cancel_workorder_followup()
                    _self.addcontentdetail = false
                    _self.followUp_loading = false
                }
                function fail(res){
                    _self.followUp_loading = false
                }
                this.$Post(url, config, success, fail)
            },
            cancel_workorder_followup(){
                this.addDetailContent.content = ""
                this.addDetailContent.followUpType = ""
                this.show_file = ""
                this.file_array = ""
            },
            GetFollowUpType(){
                var _self = this
                _self.followTypeText = []
                let params = "follow_up_type,financialLevel"
                
                function success(res){
                    _self.financialLevel = res.data.data.financialLevel
                    for(let i = 0;i<res.data.data.follow_up_type.length;i++){
                        var temp={}
                        if(res.data.data.follow_up_type[i].typecode == 21||res.data.data.follow_up_type[i].typecode == 22){
                        }else{
                            temp.typecode=res.data.data.follow_up_type[i].typecode
                            temp.typename=res.data.data.follow_up_type[i].typename
                            temp.id=res.data.data.follow_up_type[i].id
                            _self.followTypeText.push(temp)
                        }
                    }
                }
                this.$GetDataCenter(params, success)
            },
            //  新增跟进记录
            handleUpload(file) {
                this.show_file.push(file)
                var _self = this
                yasuo(file,_self.file_array)
                return false;
            },

            fileRemove(e){
                this.file_array.splice(this.file_array.indexOf(e), 1);
                this.show_file.splice(this.show_file.indexOf(e), 1);
            },

            upload(){
                let _self = this
                _self.followUp_loading = true
                if(_self.file_array.length == 0){
                    _self.add_workorder_followup()
                }else{
                    let formdata = new FormData()
                    for(let i = 0;i<_self.file_array.length;i++){
                        // console.log(_self.file_array[i])
                        formdata.append('files',_self.file_array[i],"file_" + Date.parse(new Date()) + ".jpg")
                    }

                    let url = `/api/customer/addCustomerContentImg`

                    _self.$http.post(url,formdata).then(function(res){
                        // console.log(res.data.msgCode)
                        if(res.data.msgCode == "40000"){
                            let temp = []
                            for(let j = 0;j<res.data.data.length;j++){
                                temp.push(res.data.data[j].id)
                            }
                            _self.attIds = temp.toString()
                            _self.add_workorder_followup()
                        }else{
                            _self.followUp_loading = false
                            _self.$Message.error("新增错误！")
                        }
                    }).catch(function(err){
                            _self.followUp_loading = false
                            _self.$Message.error("网络异常！")

                    })
                }
            },
            getRole(){
                let _self = this
                let temp = localStorage.getItem("Main_Role")
                // if(temp == "kuaiji" || temp == "shangshi" || temp == "qihua" || temp == "shenji"){
                if(_self.$indexOfArray(temp, ["kuaiji","shangshi","qihua","shenji"])){
                    _self.followupshow = false
                    switch(temp){
                        case "kuaiji":
                            _self.addDetailContent.followUpType = "18"
                            break;
                        case "shangshi":
                            _self.addDetailContent.followUpType = "17"
                            break;
                        case "qihua":
                            _self.addDetailContent.followUpType = "19"
                            break;
                        case "shenji":
                            _self.addDetailContent.followUpType = "23"
                            break;
                    }
                }else{
                    _self.followupshow = true
                }
            }

        },
        created(){
            var _self = this
            this.getRole()
            this.GetFollowUpType()            
            Bus.$on('openCompanyDetail',(e)=>{
                // _self.GetFollowUpType()
                _self.openTab = "name8"
                _self.detail = true
                // console.log(e.row.company_id)
                _self.companyid = e
                _self.isEditTax = true
                _self.getRole()
                _self.getData()
            })
            this.$bus.on('openCompanyDetail',(e)=>{
                // _self.GetFollowUpType()
                _self.openTab = "name8"
                _self.detail = true
                // console.log(e.row.company_id)
                _self.companyid = e
                _self.isEditTax = true
                _self.getRole()
                _self.getData()
            })
            this.$bus.on('VueBusTest',(e)=>{
                _self.openTab = "name8"
                _self.detail = true
                _self.companyid = e
                _self.isEditTax = true
                _self.getData()
            })
        },
        beforeDestroy () {
            // this.$bus.off(['VueBusTest'])
        }
    }
</script>