<template>
    <div>
        <Modal
                v-model="openCompanyDetail"
                title="公司详情"
                width="1100"
                @on-cancel="cancel"
                :transfer="false"
        >
        <Spin fix size="large" v-if="spinShow"></Spin>
            <Tabs v-model="openTab">
                <TabPane label="客户跟进记录" name="name8" v-if="!hideRecord">
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
                                <Col span="12">
                                    <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                                        <!-- <Select transfer v-model="addDetailContent.followUpType" size="small" :disabled="followupshow"> -->
                                        <Select transfer v-model="addDetailContent.followUpType" size="small">
                                            <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem prop="isClue">
                                        <Checkbox v-model="isClue">生成线索</Checkbox>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" v-if="openFinish">
                                <Col span="12">
                                    <FormItem label="完成状态" prop="finishFlag">
                                        <Select transfer v-model="addDetailContent.finishFlag" size="small">
                                            <Option value="Y" >完成</Option>
                                            <Option value="N" >未完成</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="20">
                                    <FormItem label="通知时间：" prop="date">
                                        <Col span="8">
                                            <DatePicker transfer type="date" placeholder="选择日期" v-model="addDetailContent.followupdate" size="small"></DatePicker>
                                        </Col>
                                        <Col span="2" style="text-align: center">-</Col>
                                        <Col span="8">
                                            <TimePicker transfer type="time" format="HH:mm" placeholder="选择时间" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]" v-model="addDetailContent.followuptime" size="small"></TimePicker>
                                        </Col>
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
                            <Row :gutter="16">
                                <Col span="24">
                                    <FormItem label="通知用户" prop="customerTags" style="margin-bottom:10px">
                                        <Select v-model="test" filterable multiple @on-change='t' >
                                            <Option v-for="item in user" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Col :push="3"><Button type="primary" @click="upload" :loading="followUp_loading">新增跟进</Button></Col>
                        </Row>
                    </Row>
                    <Row>
                            <Table
                                style="margin-top:15px"
                                height="300"
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="followUpHeader"
                                :data="followUpData">
                            </Table>
                    </Row>
                </TabPane>
                <TabPane label="企业信息" name="name1">
                    <Form ref="companyInfoo" :model="companyInfoo" :label-width="180" :rules="ruleValidate">
                        <Row :gutter="16" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="CompanyName" label="公司名称：" style="margin-bottom:5px">
                                    {{companyInfoo.CompanyName}}
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="industry_type" label="行业类别：" style="margin-bottom:5px">
                                    <Select  type="text" size="small" v-model="companyInfoo.industry_type" transfer>
                                        <Option v-for="(item,index) in industry_category" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="company_type" label="企业类别：" style="margin-bottom:5px">
                                    <Select  type="text" size="small" v-model="companyInfoo.company_type" transfer>
                                        <Option v-for="(item,index) in enterprise_type" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row >
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>-->
                            <!--<Col span="10">-->
                                <!--<FormItem prop="companyname" label="客户等级：" style="margin-bottom:5px">-->
                                    <!--{{companyInfo.customer_importlevel}}-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="24">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>-->
                            <!--<Col span="20">-->
                                <!--<FormItem prop="serviceaddress" label="服务地址：" style="margin-bottom:5px">-->
                                    <!--{{companyInfo.serviceaddress}}-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <Row :gutter="16" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="assets_tatol" label="资产总额：" style="margin-bottom:5px">
                                    <Input type="number" size="small" style="width: 120px;padding-right: 15px" v-model="companyInfoo.assets_tatol" :readonly="readonly"></Input>万元
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="annual_income" label="年收入或预计年收入：" style="margin-bottom:5px">
                                    <Input type="number" size="small" style="width: 120px;padding-right: 15px" v-model="companyInfoo.annual_income" :readonly="readonly"></Input>元
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="average_tax_burden" label="增值税、所得税平均税负：" style="margin-bottom:5px">
                                    <Input type="number" size="small" v-model="companyInfoo.average_tax_burden" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="industry_tax_policy" label="行业税收政策：" style="margin-bottom:5px">
                                    <Select  type="text" size="small" transfer v-model="companyInfoo.industry_tax_policy">
                                        <Option v-for="(item,index) in tax_policy" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="applicable_tax_rate" label="上年适用税率（应列则列）：" style="margin-bottom:5px">
                                    <Select  type="text" size="small" transfer v-model="companyInfoo.applicable_tax_rate">
                                        <Option v-for="(item,index) in tax_policy" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem style="margin-bottom:5px">
                                <div>经营描述：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="business_description" style="margin-bottom:5px">
                                <Input v-model="companyInfoo.business_description" type="textarea" :autosize="{minRows: 3,maxRows: 7}" :readonly="readonly" style="width: 600px" placeholder="对企业的主营业务、客户群体、获利能力进行描述，从票据、资金、实物（劳务）三流的来去向进行分析；画图现三流"></Input>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem  style="margin-bottom:5px">
                                <div>是否高薪及双软：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="hightech_doublesoft" style="margin-bottom:5px">
                                <Radio-group v-model="companyInfoo.hightech_doublesoft">
                                    <Radio label="not">
                                        <span>否</span>
                                    </Radio>
                                    <Radio label="gx" style="margin-left: 20px">
                                        <span>高薪</span>
                                    </Radio>
                                    <Radio label="sr" style="margin-left: 20px">
                                        <span>双软</span>
                                    </Radio>
                                    <Radio label="gx+sr" style="margin-left: 20px">
                                        <span>高薪+双软</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem style="margin-bottom:5px">
                                <div>相关事项备案：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="related_filing_matters"  style="margin-bottom:5px">
                                <Input :readonly="readonly" v-model="companyInfoo.related_filing_matters" type="textarea" :autosize="{minRows: 3,maxRows: 7}" style="width: 600px" placeholder="如是高新，是否享受所得税15%；是否已完成中小科技型企业备案；如是双软，是否已完成两免三减半的备案"></Input>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem style="margin-bottom:5px">
                                <div>客户服务标准：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="customer_service_standard"  style="margin-bottom:5px">
                                <Radio-group v-model="companyInfoo.customer_service_standard">
                                    <Radio label="ptdzbz">
                                        <span>普通代账标准</span>
                                    </Radio>
                                    <Radio label="gxdzbz" style="margin-left: 20px">
                                        <span>高薪代账标准</span>
                                    </Radio>
                                    <Radio label="jjdjfwb" style="margin-left: 20px">
                                        <span>加计抵减服务包</span>
                                    </Radio>
                                    <Radio label="kjdjjxz" style="margin-left: 20px">
                                        <span>会计到家精细账</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem  style="margin-bottom:5px">
                               <div>财务交接风险点提示及风险告知书：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="financial_handover"  style="margin-bottom:5px">
                                <Input :readonly="readonly" v-model="companyInfoo.financial_handover" type="textarea" :autosize="{minRows: 3,maxRows: 7}" style="width: 600px" placeholder="如是高新，是否享受所得税15%；是否已完成中小科技型企业备案；如是双软，是否已完成两免三减半的备案"></Input>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px" v-if="pageId">
                            <FormItem style="margin-bottom:5px">
                                <div>产品规模：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px" v-if="pageId">
                            <FormItem prop="ifMatch"  style="margin-bottom:5px">
                                <Radio-group v-model="ifMatch">
                                    <Radio label="Y">
                                        <span>相符</span>
                                    </Radio>
                                    <Radio label="N" style="margin-left: 20px">
                                        <span>不符</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px" v-if="pageId">
                            <FormItem label="开始税期" prop="servicestartdate">
                                <DatePicker
                                class="input-me"
                                type="month"
                                :options="dateOptions"
                                v-model="servicestartdate"
                                placeholder="选择月份"
                                style="width:120px"
                                size="small"
                                ></DatePicker>
                            </FormItem>
                       </Row>
                        <Row style="margin-bottom: 10px" v-if="pageId">
                            <FormItem  style="margin-bottom:5px">
                                <div>服务备注：</div>
                            </FormItem>
                        </Row>
              
                        <Row style="margin-bottom: 10px" v-if="pageId">
                            <FormItem  style="margin-bottom:5px">
                                <Input :readonly="readonly" v-model="serviceDemo" type="textarea" :autosize="{minRows: 3,maxRows: 7}" style="width: 600px" placeholder="请输入......"></Input>
                            </FormItem>
                        </Row>
                        <Row :gutter="12" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="income_channel_one" label="主要收入渠道1：" style="margin-bottom:5px">
                                    <Select  type="text" size="small" transfer v-model="companyInfoo.income_channel_one">
                                        <Option v-for="(item,index) in zysrqd" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="channel_risk_one" label="该渠道存在风险：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.channel_risk_one" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="income_channel_two" label="主要收入渠道2：" style="margin-bottom:5px" >
                                    <Select  type="text" size="small" transfer v-model="companyInfoo.income_channel_two">
                                        <Option v-for="(item,index) in zysrqd" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="channel_risk_two" label="该渠道存在风险：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.channel_risk_two" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="customer_scale_type" label="主要客户规模及类型：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.customer_scale_type" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="three_description_one" label="三流描述：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.three_description_one" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="12" style="margin-bottom: 10px">
                            <Col span="8">
                                <FormItem prop="supplier_scale_type" label="主要供应商规模及类型：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.supplier_scale_type" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="three_description_two" label="三流描述：" style="margin-bottom:5px">
                                    <Input size="small" v-model="companyInfoo.three_description_two" :readonly="readonly"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem  style="margin-bottom:5px">
                                <div>企业痛点及服务指引：</div>
                            </FormItem>
                        </Row>
                        <Row style="margin-bottom: 10px">
                            <FormItem prop="company_point_service"  style="margin-bottom:5px">
                                <Input :readonly="readonly" v-model="companyInfoo.company_point_service" type="textarea" :autosize="{minRows: 3,maxRows: 7}" style="width: 600px" placeholder="详细描述企业服务特征"></Input>
                            </FormItem>
                        </Row>
                        <Row style="margin-top: 30px;margin-left: 1000px">
                            <Button type="primary" @click="update_company_detail('companyInfoo')" v-if="pageId">提交</Button>
                        </Row>
                        <!-- <Row :gutter="16">
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
                        </Row> -->
                        <!-- <Row :gutter="16">
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
                        </Row> -->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>-->
                            <!--<Col span="10">-->
                                <!--<FormItem prop="type" label="企业纳税类型：" style="margin-bottom:5px">-->
                                    <!--{{companyInfo.type}}-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="10">-->
                                <!--<FormItem prop="accountgrade" label="账务等级：" style="margin-bottom:5px">-->
                                    <!--{{companyInfo.accountgrade}}-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
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
                        <!--<Row>-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>-->
                            <!--<FormItem prop="c" style="margin-bottom:5px">-->
                                <!--<div slot="label">相关资料：</div>-->
                            <!--</FormItem>-->
                        <!--</Row>-->
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
                    <Card>
                        <Row style="margin-top: 10px;margin-left:10px">
                        <Form ref="relation" :model="realationPersonTitle" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="公司名称：" style="margin-bottom:5px">
                                        {{realationPersonTitle.CompanyName}}
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="companyname" label="客户名称：" style="margin-bottom:5px">
                                        {{realationPersonTitle.NAME}}
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="companyname" label="电话：" style="margin-bottom:5px">
                                        {{realationPersonTitle.TEL}}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="固话：" style="margin-bottom:5px">
                                        {{realationPersonTitle.fixedPhone}}
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="companyname" label="QQ：" style="margin-bottom:5px">
                                        {{realationPersonTitle.qq}}
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="companyname" label="微信：" style="margin-bottom:5px">
                                        {{realationPersonTitle.weixin}}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="邮箱：" style="margin-bottom:5px">
                                        {{realationPersonTitle.email}}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    </Card>
                    <Card title="相关联系人">
                        <Row>
                            <ButtonGroup>
                                <Button type="primary" icon="ios-color-wand-outline" @click="add_relation">新增联系人</Button>
                            </ButtonGroup>
                        </Row>
                        <create @update="getData()" :customerId="companyInfo.customerid"></create>
                        <Row style="margin-top: 10px;margin-left:10px">
                            <Table
                                    ref="selection"
                                    highlight-row
                                    size="small"
                                    :columns="realationPersonHeader"
                                    :data="realationPerson"></Table>
                        </Row>
                    </Card>
                    <!-- <Row style="margin-left:10px">
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
                        </ButtonGroup>
                    </Row> -->

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
                <TabPane label="企业税局信息管理" name="name7">
                    <Row>
                        <Button type="primary" style="margin-bottom:20px" @click="editTax" v-if="isEditTax">编辑</Button>
                        <Button type="primary" style="margin-bottom:20px" @click="submitTax('taxManagement')" v-if="!isEditTax" :loading="submit_ing">提交</Button>                        
                    </Row>
                    <Form ref="taxManagement" :model="taxManagement" :rules="ruleTaxManagement" :label-width="120">
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="companytype" label="账务等级：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.companytype" placeholder="" disabled>-->
                                        <!--<Option v-for="item in financialLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>                                   -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!-- <Col span="11">
                                <FormItem prop="importlevel" label="企业等级：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.importlevel" placeholder="" disabled>
                                        <Option v-for="item in customerrating" :value="item.typecode" :key="item.id">{{item.typename}}</Option>                                   
                                    </Select>
                                </FormItem>
                            </Col> -->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="nationaltax" label="国税税种：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.nationaltax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">已核</Option>-->
                                        <!--<Option value="N">未核</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Localtax" label="地税税种：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.Localtax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">已核</Option>-->
                                        <!--<Option value="N">未核</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <Row :gutter="16" style="margin-bottom:16px">
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
                        <Row :gutter="16" style="margin-bottom:16px">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="accounttype" label="账号类型：" style="margin-bottom:5px">
                                    <Select transfer v-model="taxManagement.accounttype" placeholder="" :disabled="isEditTax">
                                        <Option  v-for="(item, index) in etax_account_type" :key="index" :value="item.typecode">{{item.typename}}</Option>                                        
                                    </Select>
                                </FormItem>
                            </Col>
                            <!--<Col span="11">-->
                                <!--<FormItem prop="validflag" label="有效性：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.validflag" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">有效</Option>-->
                                        <!--<Option value="N">无效</Option>-->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        </Row>
                        <Row :gutter="16" style="margin-bottom:16px">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalnum" label="税号：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.tax_number"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="nationalpsw" label="个税密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.tax_password"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16" style="margin-bottom:16px">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalnum" label="税控盘密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.taxdisk_password"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="11">
                                <FormItem prop="nationalpsw" label="CA密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.ca_password"  :disabled="isEditTax">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16" style="margin-bottom:16px">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="11">
                                <FormItem prop="nationalnum" label="红盾网密码：" style="margin-bottom:5px">
                                    <Input type="text" v-model="taxManagement.redshield_password"  :disabled="isEditTax">
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
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="addedvaluetax" label="增值税：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.addedvaluetax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="supertax" label="附加税：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.supertax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Incometax" label="所得税：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.Incometax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="boxtax" label="个税：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.boxtax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="12" style="visibility:hidden">1-->
                            <!--</Col>                            -->
                            <!---->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Stamptax" label="印花税：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.Stamptax" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="12" style="visibility:hidden">1</Col>                            -->
                            <!--&lt;!&ndash; <Col span="11" style="visibility:hidden"> &ndash;&gt;-->
                            <!--&lt;!&ndash; </Col> &ndash;&gt;-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="socialsecurity" label="社保：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.socialsecurity" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">未申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Providentfund" label="公积金：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.Providentfund" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">需申报</Option>-->
                                        <!--<Option value="N">不需申报</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="taxdisk" label="税控盘：" style="margin-bottom:5px">-->
                                    <!--<Select transfer v-model="taxManagement.taxdisk" placeholder="" :disabled="isEditTax">-->
                                        <!--<Option value="Y">有</Option>-->
                                        <!--<Option value="N">无</Option>                                        -->
                                    <!--</Select>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Providentfundnum" label="公积金账户名：" style="margin-bottom:5px">-->
                                    <!--<Input type="text" v-model="taxManagement.Providentfundnum" placeholder="" disabled>-->
                             <!---->
                                    <!--</Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="Providentfundpsw" label="公积金密码：" style="margin-bottom:5px">-->
                                    <!--<Input type="text" v-model="taxManagement.Providentfundpsw" placeholder="" disabled>-->
                                      <!---->
                                    <!--</Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                        <!--<Row :gutter="16">-->
                            <!--<Col span="1" style="visibility:hidden">1</Col>                            -->
                            <!--<Col span="11">-->
                                <!--<FormItem prop="socialsecuritypsw" label="社保密码：" style="margin-bottom:5px">-->
                                    <!--<Input type="text" v-model="taxManagement.socialsecuritypsw" placeholder="" disabled>-->
                                     <!---->
                                    <!--</Input>-->
                                <!--</FormItem>-->
                            <!--</Col>-->
                        <!--</Row>-->
                    </Form>
                    <Form ref="taxManagement" :model="tmData" :rules="tmData" :label-width="120">
                    <Row style="margin-top: 10px;">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="22">
                            <FormItem prop="nationalnum" label="当月申报税种：" style="margin-bottom:5px">
                                <Table
                                        :loading="loading1"
                                        ref="selection"
                                        highlight-row
                                        size="small"
                                        :columns="header"
                                        :data="tmData"
                                ></Table>
                                <Page
                                        size="small"
                                        :total="pageTotal1"
                                        show-total
                                        show-sizer
                                        show-elevator
                                        @on-change="pageChange1"
                                        @on-page-size-change="pageSizeChange1"
                                        :current.sync="page1"
                                        placement="top"
                                        style="margin-top: 10px"
                                ></Page>
                            </FormItem>
                        </Col>
                    </Row>
                    </Form>
                    <Form ref="taxManagement" :model="tmData" :rules="tmData" :label-width="120">
                        <Row style="margin-top: 10px;">
                            <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="22">
                                <FormItem prop="nationalnum" label="历史逾期情况：" style="margin-bottom:5px">
                                    <Table
                                            :loading="loading2"
                                            ref="selection"
                                            highlight-row
                                            size="small"
                                            :columns="header2"
                                            :data="tnData"
                                    ></Table>
                                    <Page
                                            size="small"
                                            :total="pageTotal2"
                                            show-total
                                            show-sizer
                                            show-elevator
                                            @on-change="pageChange2"
                                            @on-page-size-change="pageSizeChange2"
                                            :current.sync="page2"
                                            placement="top"
                                            style="margin-top: 10px"
                                    ></Page>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <!--<TabPane label="外勤详情" name="name9">-->
                    <!--<Row style="margin-top: 10px; display: flex; justify-content: space-between" :gutter="12">-->
                        <!--<Col span="6">-->
                            <!--<Card>-->
                                <!--<p slot="title" style="text-align: center">服务期内总外勤</p>-->
                                <!--<p style="text-align: center;font-weight: 700;font-size: 14px">A类：{{countData.aCount}}个</p>-->
                                <!--<p style="text-align: center;font-weight: 700;font-size: 14px">B类：{{countData.bCount}}个</p>-->
                            <!--</Card>-->
                        <!--</Col>-->
                        <!--<Col span="6">-->
                            <!--<Card>-->
                                <!--<p slot="title" style="text-align: center">剩余外勤</p>-->
                                <!--<p style="text-align: center;font-weight: 700;font-size: 14px">A类：{{countData.remainderA}}个</p>-->
                                <!--<p style="text-align: center;font-weight: 700;font-size: 14px">B类：{{countData.remainderB}}个</p>-->
                            <!--</Card>-->
                        <!--</Col>-->
                    <!--</Row>-->
                    <!--<Row style="margin-top: 10px;">-->
                        <!--<Table-->
                                <!--:loading="loading"-->
                                <!--highlight-row-->
                                <!--size="small"-->
                                <!--border-->
                                <!--:columns="header"-->
                                <!--:data="data"></Table>-->
                        <!--<Page-->
                                <!--size="small"-->
                                <!--:total="total"-->
                                <!--show-total-->
                                <!--show-sizer-->
                                <!--show-elevator-->
                                <!--:current.sync="page"-->
                                <!--@on-change="pageChange"-->
                                <!--@on-page-size-change="pageSizeChange"-->
                                <!--style="margin-top: 10px"></Page>-->
                    <!--</Row>-->
                <!--</TabPane>-->
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
    import { servicePeriod } from '@A/order.js'
    import Bus from '../../../components/bus.js'
    // import Bscroll from 'better-scroll'
    // import { yasuo } from '../../../libs/img_beforeUpload.js'
    import { yasuo } from '../../../libs/img_beforeUpload'
    import Create from './create'
    import { DateFormat, DateFormatYearMonth, nowDateFormatYearMonth } from '@/libs/utils.js';

    export default {
        props: {
            companyId: {
                type: [String, Number]
            },
            pageId: {
                type: [String, Number]
            },
            hideRecord:{
                type:[String,Boolean]
            },
            ifMatch: {
                type: [String, Number]
            },
            serviceDemo: {
                type: [String, Number]
            },
        },
        components:{
            Create
        },
        data(){
            return {
                dateOptions: {
                    disabledDate: null
                },
                servicestartdate:'',
                //通知用户相关
                test: [],
                userData: [],
                user: [],
                data:[],
                loading1:false,
                loading2:false,
                page1:1,
                page2:1,
                pageSize2:10,
                pageSize1:10,
                pageTotal2:"",
                pageTotal1:"",
                countData:[],
                tmData:[],
                tnData:[],
                total:0,
                page:1,
                pageSize:10,
                readonly:"",
                notify_ids:'',
                realationPersonTitle:"",
                industry_category:[],
                enterprise_type:[],
                tax_policy:[],
                sfgxjsr:[],
                kffwbz:[],
                zysrqd:[],
                loading:false,
                openFinish: true,
                etax_account_type: [],
                isClue: false,
                openCompanyDetail: true,
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
                    companyId:"",
                    finishFlag: "",
                    followupdate: "",
                    followuptime: ""
                },
                //
                spinShow: true,
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
                customerrating: [],
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
                    Providentfundpsw:"",
                    validflag: "",
                    accounttype: ""
                },
                ruleTaxManagement:{
                    nationalnum: [
                        { required: true, message: '必填项！', trigger: 'blur' }
                    ],
                    nationalpsw: [
                        { required: true, message: '必填项！', trigger: 'blur' }
                    ],
                    accounttype: [
                        { required: true, message: '必填项！', trigger: 'change' }
                    ],
                    validflag: [
                        { required: true, message: '必填项！', trigger: 'change' }
                    ]
                },
                companyInfoo:{
                    industry_type:"",
                    company_type:"",
                    assets_tatol:"",
                    annual_income:"",
                    average_tax_burden:"",
                    industry_tax_policy:"",
                    applicable_tax_rate:"",
                    business_description:"",
                    hightech_doublesoft:"",
                    related_filing_matters:"",
                    customer_service_standard:"",
                    financial_handover:"",
                    income_channel_one:"",
                    channel_risk_one:"",
                    income_channel_two:"",
                    channel_risk_two:"",
                    customer_scale_type:"",
                    three_description_one:"",
                    supplier_scale_type:"",
                    three_description_two:"",
                    company_point_service:"",
                },
                ruleValidate: {
                    industry_type: [
                        { required: true, message: '请选择行业类别', trigger: 'change' }
                    ],
                    company_type: [
                        { required: true, message: '请选择企业类别', trigger: 'change' }
                    ],
                    assets_tatol: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    annual_income: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    average_tax_burden: [
                        { required: true, message: '不能为空', trigger: 'blur' },
                    ],
                    industry_tax_policy: [
                        { required: true, message: '请选择行业税收政策', trigger: 'change' }
                    ],
                    applicable_tax_rate: [
                        { required: true, message: '请选择上年适用税率', trigger: 'change' }
                    ],
                    business_description: [
                        { required: true, message: '请输入经营描述', trigger: 'blur' }
                    ],
                    hightech_doublesoft: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    related_filing_matters: [
                        { required: true, message: '请输入相关事项备案', trigger: 'blur' }
                    ],
                    customer_service_standard: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    ifMatch:[
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    // servicestartdate:[
                    //     { required: true, message: '请选择税期', trigger: 'blur' }
                    // ],
                    financial_handover: [
                        { required: true, message: '请输入提示或告知书', trigger: 'blur' }
                    ],
                },
                dynamic:[],
                workOrder:[],
                workOrderHeader: [
                    {
                        title: '公司名称',
                        key: 'companyname',
                        minWidth: 190
                    },
                    {
                        title: '所办服务',
                        key: 'product',
                        minWidth: 140
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        minWidth: 120
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        minWidth: 120
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        minWidth: 100
                    },
                    {
                        title: '联系方式',
                        key: 'servertel',
                        minWidth: 120
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
                        minWidth: 120
                    },
                    {
                        title: '创建时间',
                        key: 'yjjsqj',
                        minWidth: 120
                    },
                ],
                realationPersonHeader: [
                    {
                        title: '姓名',
                        key: 'name',
                        minWidth: 120
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        minWidth: 120
                    },
                    {
                        title: 'qq',
                        key: 'qq',
                        minWidth: 120
                    },
                    {
                        title: '微信',
                        key: 'weChat',
                        minWidth: 120
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        minWidth: 120
                    },
                    {
                        title: '职位',
                        key: 'jobPlace',
                        minWidth: 120
                    },
                    {
                        title: '发送消息',
                        key: 'sendMsgFlag',
                        minWidth: 120
                    },
                    {
                        title: '备注',
                        key: 'memo',
                        minWidth: 120
                    },
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
                        minWidth: 120
                    },
                    {
                        title: '变更时间',
                        key: 'yjjsqj',
                        minWidth: 120
                    },
                ],
                followUpHeader:[
                    {
                        title:'跟进时间',
                        key:'createdate',
                        minWidth:160
                    },
                    {
                        title:'跟进类型',
                        key: 'typename',
                        minWidth:120
                    },
                    {
                        title:'跟进内容',
                        key:'service_content',
                        minWidth: 300,
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
                        minWidth:100
                    },
                    {
                        title:'完成状态',
                        key:'realname',
                        minWidth:100,
                        render: (h, params) => {
                            if(params.row.finish_flag == 'N'){
                                return h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=>{
                                            this.update_customer_flag(params.row, 'Y')
                                        }
                                    }
                                },"完成")
                            }else if(params.row.finish_flag == 'Y'){
                                return h('div',"完成")
                            }else{
                                return h('div')
                            }
                        }
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
                header:[
                    {
                        title:'税种',
                        key:'subject',
                        minWidth:160
                    },
                    {
                        title:'申报时间',
                        key:'bs_date',
                        minWidth:160
                    },
                    {
                        title:'申报结果',
                        key:'finish_status',
                        minWidth:160
                    },
                ],
                header2:[
                    {
                        title:'税种',
                        key:'subject',
                        minWidth:160
                    },
                    {
                        title:'申报时间',
                        key:'bs_date',
                        minWidth:160
                    },
                    {
                        title:'申报结果',
                        key:'finish_status',
                        minWidth:160
                    },
                ],
        }
        },
        methods: {
            checkMonth(data) {
                console.log('cehis',data,this.servicestartdate)
                if (this.servicestartdate){
                let a = this.servicestartdate.substr(0, 4)
                let b = this.servicestartdate.substr(4)
                let between = data.getFullYear() * 12 + data.getMonth() - a  * 12 - b * 1;
                    console.log('cehis',between)
                return 0 >= between;
                }
            },

            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            pageChange1(e){
                this.page1 = e
                this.get_data1()
            },
            pageSizeChange1(e){
                this.pageSize1 = e
                this.get_data1()
            },
            pageChange2(e){
                this.page2 = e
                this.get_data2()
            },
            pageSizeChange2(e){
                this.pageSize2 = e
                this.get_data2()
            },
            add_relation(){
                console.log("123")
                this.$bus.emit("CREATE_CUSTOMER_RELATION", true)
            },
            get_data1(){
                let _self = this
                _self.loading1 = true
                let url = 'api/customer/company/getThisMothTaxBycompanyId'
                let config = {
                    params:{
                        companyId:_self.companyId,
                        page:_self.page1,
                        pageSize:_self.pageSize1
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    if (res.data.data) {
                        _self.tmData= res.data.data.rows
                        _self.pageTotal1 = res.data.data.total
                        _self.loading1 = false
                    }
                }

                this.$Get(url, config ,success)
            },
            get_data2(){
                let _self = this
                _self.loading2 = true
                let url = 'api/customer/company/getHistoryTaxBycompanyId'
                let config = {
                    params:{
                        companyId:_self.companyId,
                        page:_self.page2,
                        pageSize:_self.pageSize2
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    if (res.data.data) {
                        _self.tnData= res.data.data.rows
                        _self.pageTotal2 = res.data.data.total
                        _self.loading2 = false
                    }
                }

                this.$Get(url, config ,success)
            },
            get_data(){
                let _self = this
                _self.loading = true
                let url = 'api/user/legwork/companyLegworkListByCompanyId'
                let config = {
                    params:{
                        companyId:_self.companyId,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    if (res.data.data) {
                        _self.data= res.data.data.rows
                        for (let i=0;i<_self.data.length;i++){
                            _self.data[i].diff = _self.data[i].diff +"小时"
                            _self.data[i].realpath = _self.data[i].realpath.split(",")
                        }
                        _self.total = res.data.data.total
                        _self.loading = false
                    }else {
                        _self.data= []
                        _self.total = 0
                        _self.loading = false
                    }
                }

                this.$Get(url, config ,success)
            },
            get_count_data(){
                let _self = this
                _self.loading = true
                let url = 'api/user/legwork/companyLegworkCountByCompanyId'
                let config = {
                    params:{
                        companyId:_self.companyId
                    }
                }

                function success(res){
                    console.log(res.data.data)
                    _self.countData= res.data.data

                    _self.loading = false
                }

                this.$Get(url, config ,success)
            },
            //通知客户相关
            t(e){
                console.log(e)
                this.notify_ids = ''
                for(let i =0;i<e.length;i++){
                    this.notify_ids += e[i] + ','
                }
                this.notify_ids = this.notify_ids.substring(0,this.notify_ids.length-1)
                console.log(this.notify_ids)
            },
            getUserData(){
                let _self = this
                let url = `api/user/list`
                let config = {
                    params: {
                        page: 1,
                        pageSize: 1000
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.userData = res.data.data.rows
                    for(let i=0;i<res.data.data.rows.length;i++){
                        _self.user.push({
                            'value': _self.userData[i].id,
                            'label': _self.userData[i].realname
                        })
                    }
                }
                this.$Get(url,config,success)
            },
            update_company_detail(name){
                if (!this.ifMatch) {
                    this.$Message.warning("请选择产品规模")
                    return
                }
                if (!this.servicestartdate) {
                    this.$Message.warning("请选择开始服务税期")
                    return
                } 
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _self = this
                        let url = `api/order/cycle/service/dljz/updateCompanyInfo`
                        let config = {
                            companyId: _self.companyId,
                            id:_self.companyInfoo.id,
                            servicestartdate:DateFormat(_self.servicestartdate),
                            recordId:_self.pageId,
                            ifMatch:_self.ifMatch,
                            serviceDemo:_self.serviceDemo,
                            companyType: _self.companyInfoo.company_type,
                            industryType: _self.companyInfoo.industry_type,
                            assetsTatol: _self.companyInfoo.assets_tatol,
                            annualIncome: _self.companyInfoo.annual_income,
                            averageTaxBurden: _self.companyInfoo.average_tax_burden,
                            industryTaxPolicy: _self.companyInfoo.industry_tax_policy,
                            applicableTaxRate: _self.companyInfoo.applicable_tax_rate,
                            businessDescription: _self.companyInfoo.business_description,
                            hightechDoublesoft: _self.companyInfoo.hightech_doublesoft,
                            relatedFilingMatters: _self.companyInfoo.related_filing_matters,
                            customerServiceStandard: _self.companyInfoo.customer_service_standard,
                            financialHandover: _self.companyInfoo.financial_handover,
                            incomeChannelOne: _self.companyInfoo.income_channel_one,
                            channelRiskOne: _self.companyInfoo.channel_risk_one,
                            incomeChannelTwo: _self.companyInfoo.income_channel_two,
                            channelRiskTwo: _self.companyInfoo.channel_risk_two,
                            customerScaleType: _self.companyInfoo.customer_scale_type,
                            threeDescriptionOne: _self.companyInfoo.three_description_one,
                            supplierScaleType: _self.companyInfoo.supplier_scale_type,
                            threeDescriptionTwo: _self.companyInfoo.three_description_two,
                            companyPointService: _self.companyInfoo.company_point_service
                        }

                        function success(res) {
                            _self.begin_service()
                        }

                        function fail(err) {

                        }
                        this.$Post(url, config, success, fail)
                    }else {
                        this.$Message.error('请填写必选项!');
                    }
                })
            },
            update_customer_flag(row, status){
                console.log(row)
                let _self = this
                let url = `api/customer/updateCustomerContentNoteKj`
                let config  = {
                    id: row.id,
                    finishFlag: status
                }

                function success(res){
                    _self.getData()
                }

                function fail(err){
                    _self.getData()
                }

                this.$Post(url, config, success, fail)
            },
            begin_service() {
                let _self = this
                let url = `api/order/cycle/service/record/update`
                let config = {
                    id: _self.pageId,
                    serviceStatus: 'inservice'
                }

                function success(res){
                    _self.$bus.emit("UPDATE_INDEX",true)
                    _self.getData()
                    _self.cancel()
                }

                function fail(err){

                }

                this.$Post(url, config, success, fail)
            },
            fpkj(){},
            ckbgrz(){},
            getData() {
                let _self = this
                _self.spinShow = true
                let url = 'api/customer/company/detail'
                let config = {
                    params:{
                        id:_self.companyId,
                        detailTypes:"basic,main,workOrder,taxManagement,customerRecord,dynamic,companyInfo"
                    }
                }
                _self.detail = true
                function success(res) {
                    _self.companyInfo = res.data.data.basic.length != 0 ? res.data.data.basic[0] : {}
                    _self.mainInfo = res.data.data.main.length != 0 ? res.data.data.main[0] : {}
                    _self.workOrder = res.data.data.workOrder
                    _self.taxManagement = res.data.data.taxManagement.length != 0 ? res.data.data.taxManagement[0] : {}
                    _self.followUpData = res.data.data.customerRecord
                    _self.realationPerson = res.data.data.dynamic
                    _self.realationPersonTitle = res.data.data.customer.length != 0 ? res.data.data.customer[0] : {}
                    _self.companyInfoo = res.data.data.companyInfo.length != 0 ? res.data.data.companyInfo[0] : {}
                    _self.spinShow = false
                }

                function fail(err){
                    _self.$Message.error("对不起，当前查询的公司有误！请确认后重试！窗口将在2秒后关闭！")
                    _self.cancel()
                }
                this.$Get(url, config, success, fail)
                // this.GetData(url, doSuccess)
            },

            cancel () {
                // this.detail = false
                this.openTab = "name8"
                this.$store.state.gobal.gobalCompanyPageId = ""
                this.$store.state.gobal.gobalCompanyIfMatch = ""
                this.$store.state.gobal.gobalCompanyServiceDemo = ""
                this.$store.commit("close_gobal_company_detail_modal")
            },
            editTax(){
                this.isEditTax = !this.isEditTax
            },
            changeTab(){
                console.log(this.pageId)
                console.log(this.hideRecord)
                if (this.pageId){
                    this.openTab = "name1"
                    this.ruleValidate = {
                        industry_type: [
                            { required: true, message: '请选择行业类别', trigger: 'change' }
                        ],
                            company_type: [
                            { required: true, message: '请选择企业类别', trigger: 'change' }
                        ],
                            assets_tatol: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                            annual_income: [
                            { required: true, message: '不能为空', trigger: 'blur' }
                        ],
                            average_tax_burden: [
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                            industry_tax_policy: [
                            { required: true, message: '请选择行业税收政策', trigger: 'change' }
                        ],
                            applicable_tax_rate: [
                            { required: true, message: '请选择上年适用税率', trigger: 'change' }
                        ],
                            business_description: [
                            { required: true, message: '请输入经营描述', trigger: 'blur' }
                        ],
                            hightech_doublesoft: [
                            { required: true, message: '请选择', trigger: 'change' }
                        ],
                            related_filing_matters: [
                            { required: true, message: '请输入相关事项备案', trigger: 'blur' }
                        ],
                            customer_service_standard: [
                            { required: true, message: '请选择', trigger: 'change' }
                        ],
                            financial_handover: [
                            { required: true, message: '请输入提示或告知书', trigger: 'blur' }
                        ],
                    }
                    this.readonly = false
                }else{
                    this.readonly = true
                    this.ruleValidate = ""
                }
            },
            submitTax(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _self = this
                        this.submit_ing = true
                        let url = `api/customer/company/saveCompanyTaxManagement`

                        // console.log(_self.taxManagement.nationalnum.replace(/\s+/g,""))
                        let config = {
                            companyid:_self.companyId,
                            companytype:_self.taxManagement.companytype,
                            nationaltax:_self.taxManagement.nationaltax,
                            Localtax:_self.taxManagement.Localtax,
                            nationalnum:_self.taxManagement.nationalnum.replace(/\s+/g,""),
                            nationalpsw:_self.taxManagement.nationalpsw.replace(/\s+/g,""),
                            taxNumber:_self.taxManagement.tax_number,
                            taxPassword:_self.taxManagement.tax_password,
                            taxdiskPassword:_self.taxManagement.taxdisk_password,
                            caPassword:_self.taxManagement.ca_password,
                            redshieldPassword:_self.taxManagement.redshield_password,
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
                            socialsecuritypsw: _self.taxManagement.socialsecuritypsw,
                            accounttype: _self.taxManagement.accounttype,
                            validflag: _self.taxManagement.validflag
                        }
                        function success(res){
                            _self.isEditTax = true  
                            _self.submit_ing = false                    
                        }
                        function fail(res){
                            _self.submit_ing = false                    
                        }

                        this.$Post(url,config,success,fail)
                    } else {
                        this.$Message.error('请填写必选项!');
                    }
                })

                

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
                this.getRole()
            },
            add_workorder_followup(){
                let url =  `api/customer/addCustomerContentNote`
                let _self = this
                let config = {
                    content: _self.addDetailContent.content,
                    customerId: _self.companyInfo.customerid,
                    companyId:_self.companyInfo.id,
                    followUpType: _self.addDetailContent.followUpType,
                    attIds:_self.attIds,
                    finishFlag: _self.addDetailContent.finishFlag,
                    notifyDate: (DateFormat(_self.addDetailContent.followupdate) + ' ' + _self.addDetailContent.followuptime),
                    notify_ids: _self.notify_ids
                }
                function success(res){
                    if(_self.isClue){
                        _self.create_clue()
                    }else{
                        _self.getData()
                        _self.cancel_workorder_followup()
                        _self.addcontentdetail = false
                        _self.followUp_loading = false
                    }
                }
                function fail(res){
                    _self.followUp_loading = false
                }
                this.$Post(url, config, success, fail)
            },
            create_clue(){
                let url =  `api/customer/addCustomerContentNote`
                let _self = this
                let config = {
                    content: _self.addDetailContent.content,
                    customerId: _self.companyInfo.customerid,
                    companyId:_self.companyInfo.id,
                    followUpType: "20",
                }
                function success(res){
                    _self.getData()
                    _self.cancel_workorder_followup()
                    _self.addcontentdetail = false
                    _self.followUp_loading = false
                    _self.isClue = false
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
                let params = "follow_up_type,financialLevel,customerrating,etax_account_type"
                
                function success(res){
                    _self.financialLevel = res.data.data.financialLevel
                    _self.customerrating = res.data.data.customerrating
                    _self.etax_account_type = res.data.data.etax_account_type
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
                            // _self.openFinish = true
                            _self.addDetailContent.finishFlag = "N"
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
            },
            get_data_center(){
                let params = "industry_category,enterprise_type,tax_policy,sfgxjsr,kffwbz,zysrqd"

                let _self = this

                function success(res){
                    _self.industry_category = res.data.data.industry_category
                    _self.enterprise_type = res.data.data.enterprise_type
                    _self.tax_policy = res.data.data.tax_policy
                    _self.sfgxjsr = res.data.data.sfgxjsr
                    _self.kffwbz = res.data.data.kffwbz
                    _self.zysrqd = res.data.data.zysrqd
                    _self.industry_category_map = _self.$array2map(_self.industry_category)
                    _self.enterprise_type_map = _self.$array2map(_self.enterprise_type)
                    _self.tax_policy_map = _self.$array2map(_self.tax_policy)
                    _self.sfgxjsr_map = _self.$array2map(_self.sfgxjsr)
                    _self.kffwbz_map = _self.$array2map(_self.kffwbz)
                    _self.zysrqd_map = _self.$array2map(_self.zysrqd)
                }
                this.$GetDataCenter(params, success)
            },

        },
        async created(){
            this.getUserData()
            this.changeTab()
           const resp = await servicePeriod({companyId:this.companyId,productId:this.$store.state.gobal.gobalProductId})
            this.servicestartdate = resp
            this.dateOptions.disabledDate =  function(data){
                 let a = resp.substr(0, 4)
                let b = resp.substr(4)
                let between = data.getFullYear() * 12 + data.getMonth() - a  * 12 - b * 1;
                console.log('cehis',between)
                return -2 >= between;
            }
        },
        mounted(){
            this.get_data_center()
            this.getRole()
            this.GetFollowUpType()   
            this.getData()
            this.get_data()
            this.get_data1()
            this.get_data2()
            this.get_count_data()
            //TODO
            // this.$store.gobalCompanyPageId
        },
        beforeDestroy () {
            // this.$bus.off(['VueBusTest'])
        }
    }
</script>