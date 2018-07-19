<template>
  <div style="min-width:900px;padding:20px;background:white">
    <!-- <row><Button></Button></row>
    <row><Tableshow></Tableshow></row> -->
    <Card shadow>
        <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
        
    </Card>
        <Row>
            <admin-table></admin-table>
        </Row>
    <Spin fix v-if="spinShow">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载组件中...</div>
    </Spin>
    
    <Button @click="show">确定</Button>
    <Button @click="BusTest">Bus测试</Button>    
    <Button @click="openCompanyDetail">展示公司详情</Button>
    <Button @click="openCustomerDetail">展示客户详情</Button>
    <Button @click="openFollowUPdata">客户跟进记录</Button>
    <company-detail></company-detail>
    <customer-detail></customer-detail>
    <follow-up-data></follow-up-data>
    
    <!-- <div v-html="content"></div> -->
    <!-- <Button @click="downAccoutProductivity">导出会计绩效</Button>
    <Button @click="downMarketProductivityTotal">导出市场绩效统计</Button>
    <Button @click="downMarketProductivityDetail">导出市场绩效详情</Button> -->
  </div>
</template>

<script>
// import Button from './buttonGroups'
// import Tableshow from './table'
import tinymce from 'tinymce';
import companyDetail  from '../../woa-components/companyDetail/CompanyDetail'
import Bus from '../../../components/bus.js'
import customerDetail from '../../woa-components/customerDetail/channelCustomer'
import followUpData from '../../woa-components/followUpList/followUpIndex'
import adminTable from './tables'

export default {
    name: "company",
    components: {
        // Button,
        // Tableshow
        companyDetail,
        customerDetail,
        followUpData,
        adminTable
    },
    created: function(){

    },
    data(){
        return{
            spinShow: true,
            company_id:"",
            customeId:31681,
            companyname:"广州则为信息科技有限公司",
            content:""
        }
    },
    methods: {
        BusTest(){
            this.$bus.emit('VueBusTest',"34324")
        },
        openCompanyDetail(){
            // this.company_id = "34143"
            this.company_id = "34324"
            let _self = this
            Bus.$emit('openCompanyDetail',_self.company_id)
        },
        openCustomerDetail(){
            let _self = this
            Bus.$emit('Open_customer_detail',_self.customeId)
        },
        init () {
            this.$nextTick(() => {
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: '#tinymceEditer',
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'zh_CN.GB2312',
                    menubar: 'edit insert view format table tools',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                        editor.on('init', function (e) {
                            vm.spinShow = false;
                            if (localStorage.editorContent) {
                                //  设置文本
                                tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                            }
                        });
                        editor.on('keydown', function (e) {
                            //  获取文本
                            localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                        });
                    }
                });
                
            });
        },
        show(){
            // let temp = tinymce.get('tinymceEditer').getContent();
            // console.log(temp)
            let temp = `<!DOCTYPE html>
                        <html>
                        <head>
                        </head>
                        <body>
                        <p style="margin-top:16px;margin-bottom:16px;margin-left:0;text-indent:0;text-align:center;line-height:300%">
                                <strong><span style="line-height: 300%; font-size: 35px; font-family: 微软雅黑;"><img src="../ueditor1_4_3_3-utf8-jsp/utf8-jsp/jsp/upload/image/20180427/1524823137220094208.png" title="1524823137220094208.png" alt="QQ图片20180422141007.png" width="90%" /></span></strong>
                            </p>
                            <p style="margin-top:16px;margin-bottom:16px;margin-left:0;text-indent:0;text-align:center;line-height:300%">
                                <strong><span style="line-height: 300%; font-size: 35px; font-family: 微软雅黑;">${this.companyname}</span></strong>
                            </p>
                            <p style="margin-top:0;margin-bottom:0;margin-left:0;text-indent:0;text-align:center">
                                <strong><span style="font-size: 48px; font-family: 微软雅黑;">项目咨询方案</span></strong>
                            </p>
                            <p style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; text-indent: 0px; text-align: center;">
                            </p>
                            <p style="margin-top:0;margin-bottom:0;margin-left:0;text-indent:0;text-align:center">
                                <strong><span style="font-size: 14px; font-family: 微软雅黑;">扫码获取全部方案</span></strong>
                            </p>
                            </c:if>
                            <p style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; text-indent: 0px;">
                                <strong><span style="font-size: 14px; font-family: 微软雅黑;"><br/></span></strong>
                            </p>
                            <p style="margin-top:0;margin-bottom:0;margin-left:0;text-indent:0;text-align:center">
                                <strong><span style="font-family: 微软雅黑;font-size: 24px"><span style="font-family:微软雅黑">服务商：</span> <span style="font-family:微软雅黑">广州亿账柜信息科技有限公司</span></span></strong>
                            </p>
                            <p style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; text-indent: 0px;">
                                <strong><span style="font-size: 14px; font-family: 微软雅黑;"><br/></span></strong>
                            </p>
                            <p style="margin-top:0;margin-bottom:0;text-indent:0;text-align:center">
                            </p>
                            <p>
                                <span style=";font-family:微软雅黑;font-weight:bold;font-size:19px"><br/></span> 
                            </p>
                            <p style=";text-indent: 37px;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 19px; font-family: 微软雅黑;">本方案计划书参考了贵司网络公开信息以及沟通记录。特编写本次高企申报相关服务内容</span></strong><strong><span style="line-height: 150%; font-size: 19px; font-family: 微软雅黑;">。</span></strong>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <span style="font-family: 微软雅黑;font-weight: bold;font-size: 20px">一、</span><strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;">您已获得知识产权及荣誉</span></strong>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;"></span></strong>
                            </p>
                            <table>
                                <tbody>
                                    <tr class="firstRow">
                                        <td width="667" valign="middle" style="word-break: break-all; border-width: 1px; border-style: solid;" align="center">
                                            <strong>知识产权</strong>
                                        </td>
                                        <td width="256.66666666666674" valign="middle" style="word-break: break-all; border-width: 1px; border-style: solid;" align="center">
                                            <strong>公布时间</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="667" valign="top" style="border-width: 1px; border-style: solid;"></td>
                                        <td width="256.66666666666674" valign="top" style="border-width: 1px; border-style: solid;"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px"><br/></span></strong>
                            </p>
                            <table>
                                <tbody>
                                    <tr class="firstRow">
                                        <td width="667" valign="middle" style="border-width: 1px; border-style: solid; word-break: break-all;" align="center">
                                            <strong>申报内容</strong>
                                        </td>
                                        <td width="256.66666666666674" valign="middle" style="border-width: 1px; border-style: solid; word-break: break-all;" align="center">
                                            <strong>申报时间</strong>
                                        </td>
                                    </tr>
                                    </c:forEach>
                                    <tr>
                                        <td width="667" valign="top" style="border-width: 1px; border-style: solid;"> </td>
                                        <td width="256.66666666666674" valign="top" style="border-width: 1px; border-style: solid;"> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 20px;">&nbsp;&nbsp;<span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(255, 0, 0);">注<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">：</span>部分最近申报的数据<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">，因相关部门数据未及时跟新<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">，有可能未列上如上表中<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">。</span></span></span></span></span>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px">&nbsp;</span></strong><strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px">&nbsp;</span></strong>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;">二、可申报项目</span></strong>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;"></span></strong>
                            </p>
                            <table>
                                <tbody>
                                    <tr class="firstRow">
                                        <td width="600" valign="middle" style="word-break: break-all; border-width: 1px; border-style: solid;" align="center">
                                            <strong>项目名称</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                    </tr>
                                    </c:forEach>
                                    <tr>
                                        <td width="600" valign="top" style="border-width: 1px; border-style: solid;"> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;text-indent: 28px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 20px;">&nbsp;&nbsp;<span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(255, 0, 0);">注<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">：2018-05-02</span>预计申报项目补贴在60万~200万左右<span style="color: rgb(255, 0, 0); font-family: 微软雅黑; text-indent: 32px;">，</span>申报项目参考如上列表<span style="color: rgb(255, 0, 0); font-family: 微软雅黑; text-indent: 32px;">，</span>具体根据实际财务报表完全评估<span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;"><span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;"><span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px;">。</span></span></span></span></span>
                            </p>

                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;line-height: 150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px"><br/>三</span></strong><strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px">、申报意义</span></strong><strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px">&nbsp;</span></strong>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">1、<span style="font-family:微软雅黑">税收优惠。享受国家税收优惠政策，企业所得税税率由</span>25%降低为15%，相当于企业所得税打六折；</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">2、政策扶持。获得政府补助的一个基本门槛，更容易获得国家、省、市各级的科研经费支持和财政拨款，及各大银行贷款、土地政策落实的对象。高企政策补助金额，18年会按照研发费用比例，按层次分别补贴30、50、100万。（具体按照最新政策）</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">3、资本价值。企业在融资上市的重要调节，有利于吸引风险投资机构和金融机构的介入，推动企业进入产业化扩展。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">4、品牌价值。国家级的认证，品牌影响力仅次于中国驰名商标，中国名牌产品，国家免检产品，极大地提升企业品牌形象，无论广告宣传还是产品招投标工程，都将有非常大的帮助。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">5、规范管理。通过国家技术认定，能够有效提高企业科研研发管理水平，重视科技研发，提高企业核心竞争力，能为企业在市场竞争中提供有力的保障。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">&nbsp;</span>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;">四、项目款归集及财务处理办法</span></strong>
                            </p>
                            <p>
                                <span style=";font-family:微软雅黑;font-size:16px">1、</span><span style="font-size: 16px; font-family: 微软雅黑;">高培入库、高新技术企业及广州市小巨人</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>1）补助方式：奖励补贴款</span>
                            </p>
                            <p>
                                <span style=";font-family:微软雅黑;font-size:16px"><span style="font-family:微软雅黑">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;（</span>2）补助金额：</span><span style=";font-family:微软雅黑;font-size:16px;color: rgb(255, 0, 0);">高培入库补贴30万，出库补贴30万（高企通过等于出库），高企认定补贴30-100万，小巨人入库补贴20万。</span></span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>3）补助时间：次年年中</span> 
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>4）相关财务以及税务处理：</span>
                            </p>
                            <c:choose>

                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 176, 240);">--1.需扫码获得全部方案--</span>
                            </p>

                            </c:when>

                            <c:otherwise>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">收到政府补贴款时，用于补偿企业以后期间的相关成本费用或损失的，确认为递延收益，并在确认相关成本费用或损失的期间，计入当期损益或冲减相关成本；用于补偿企业已发生的相关成本费用或损失的，直接计入当期损益或冲减相关成本。</span>
                            </p>
                            </c:otherwise>
                            </c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">2、科技计划</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>1）补助方式：采取分次拨款方式。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>2）补助金额：<span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(255, 0, 0);">科技计划类别分为研发类、转化类、服务类（含孵化器平台等）、软课题类（含医疗卫生专项等）四大类，可细分为科技攻关、成果转化、产学研合作、小微企业技术创新、创新载体建设、软科学研究、市级以上科技计划项目配套专项、医疗卫生专项等八项。</span></span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>3）补助时间：次年年中或者当年年底</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>4）相关财务以及税务处理：</span>
                            </p>
                            <c:choose>

                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="line-height: 150%; font-size: 16px; font-family: 微软雅黑; text-indent: 32px; color: rgb(0, 176, 240);">--2.需扫码获得全部方案--</span>
                            </p>
                            </c:when>

                            <c:otherwise>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">收到政府补贴款时，用于补偿企业以后期间的相关成本费用或损失的，确认为递延收益，并在确认相关成本费用或损失的期间，计入当期损益或冲减相关成本；用于补偿企业已发生的相关成本费用或损失的，直接计入当期损益或冲减相关成本。</span>
                            </p>
                            </c:otherwise>
                            </c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family:微软雅黑;font-size:16px">3、</span><span style=";font-family:微软雅黑;line-height:150%;font-size:16px">加计扣除和加计扣除后补助</span>
                            </p>
                            <c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="line-height: 150%; font-size: 16px; color: rgb(0, 176, 240); font-family: 微软雅黑; text-indent: 32px;">--3.需扫码获得全部方案--</span>
                            </p>
                            </c:when>

                            <c:otherwise>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">相关补助和税收优惠：</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（1）加计扣除：</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">科技型中小企业开展研发活动中实际发生的研发费用，未形成无形资产计入当期损益的，在按规定据实扣除的基础上，在2017年1月1日至2019年12月31日期间，再按照实际发生额的75%在税前加计扣除；形成无形资产的，在上述期间按照无形资产成本的175%在税前摊销。（非科技型中小企业未形成无形资产照实际发生额的50%在税前加计扣除；形成无形资产的，在上述期间按照无形资产成本的150%在税前摊销。）</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（2）补助标准</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">对企业研发经费支出额度相应的补助标准如下</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（一）企业上一年研发经费支出额高于(含)100万元,不足500万元的,补助10万元</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（二）企业上一年研发经费支出额高于(含)500万元,不足1000万元的,补助40万元</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（三）企业上一年研发经费支出额高于(含)1000万元,不足5000万元的,补助125万元</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（四）企业上一年研发经费支出额高于(含)5000万元,不足1亿元的,补助320万元</span>
                            </p>
                            <!-- <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（2）市级补助</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">奖励补助：补助资金参考企业上一年度已经税务部门同意可税前加计扣除的研发费用的一定比例分配</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <img src="../ueditor1_4_3_3-utf8-jsp/utf8-jsp/jsp/upload/image/20180427/1524819629535089763.png" title="1524819629535089763.png" alt="1233121.png" width="90%" /><span style=";font-family:微软雅黑;line-height:150%;color:rgb(91,155,213);font-size:16px">&nbsp;</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（3）省级补助</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">奖励补助：补助资金参考企业上一年度已经税务部门同意可税前加计扣除的研发费用的一定比例分配</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <img src="../ueditor1_4_3_3-utf8-jsp/utf8-jsp/jsp/upload/image/20180427/1524819636838013867.png" title="1524819636838013867.png" alt="324231.png" width="90%" /><span style=";font-family:微软雅黑;color:rgb(91,155,213);font-size:14px">&nbsp;</span>
                            </p> -->
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">相关财务以及税务处理</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（1）加计扣除</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">预缴时据实扣除，汇缴时加计扣除</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">（2）补助处理方式</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">收到政府补贴款时，用于补偿企业以后期间的相关成本费用或损失的，确认为递延收益，并在确认相关成本费用或损失的期间，计入当期损益或冲减相关成本；用于补偿企业已发生的相关成本费用或损失的，直接计入当期损益或冲减相关成本。</span>
                            </p>
                            </c:otherwise>
                            </c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">4、广州市中国制造2025发展专项资金</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>1）补助方式：项目资金采用事中、事后补助或直接股权投资两种支持方式，同一项目只能选择一种方式。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>2）补助金额：<span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(255, 0, 0);">对符合补助条件的申报项目，补助额度不超过项目总投资的30%，最高不超过500万元；申报直接股权投资资金的项目，单个企业申请的直投资金投资额度最低500万元，最高3000万元，占被投企业的股份原则上不超过被投企业总体股本的30%，且不为第一大股东或实际控制人。</span></span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>3）补助时间：次年</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>4）相关财务以及税务处理</span>
                            </p>
                            <c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="line-height: 150%; font-size: 16px; color: rgb(0, 176, 240); font-family: 微软雅黑; text-indent: 32px;">--4.需扫码获得全部方案--</span>
                            </p>
                            </c:when>

                            <c:otherwise>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">事中事后补助：收到政府补贴款时，用于补偿企业以后期间的相关成本费用或损失的，确认为递延收益，并在确认相关成本费用或损失的期间，计入当期损益或冲减相关成本；用于补偿企业已发生的相关成本费用或损失的，直接计入当期损益或冲减相关成本。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">直接股权投资：股权投资部分计入实收资本，并缴纳相应的实收资本印花税。</span>
                            </p>
                            </c:otherwise>
                            </c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">5、广东省智能制造试点示范项目</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>1）补助方式：政府补贴奖励</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑;">（2）补助金额：<span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(255, 0, 0);">200W</span></span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>3）补助时间：次年</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">（</span>4）</span><span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">关财务以及税务处理：</span>
                            </p>
                            <c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="line-height: 150%; font-size: 16px; color: rgb(0, 176, 240); font-family: 微软雅黑; text-indent: 32px;">--5.需扫码获得全部方案--</span>
                            </p>
                            </c:when>

                            <c:otherwise>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style="font-family: 微软雅黑; line-height: 150%; font-size: 16px; color: rgb(0, 0, 0);">收到政府补贴款时，用于补偿企业以后期间的相关成本费用或损失的，确认为递延收益，并在确认相关成本费用或损失的期间，计入当期损益或冲减相关成本；用于补偿企业已发生的相关成本费用或损失的，直接计入当期损益或冲减相关成本。</span>
                            </p>
                            </c:otherwise>
                            </c:choose>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">&nbsp;</span>
                            </p>
                            <p style="margin-top: 0;margin-right: 0;margin-bottom: 0;line-height: 150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 20px"><span style="font-family:微软雅黑">五、</span>e账柜项目团队安排及分工</span></strong>
                            </p>
                            <p style="margin: 0 0 0 11px;line-height: 150%">
                                <strong><span style="line-height: 150%; font-size: 20px; font-family: 微软雅黑;">（一）工作方案</span></strong>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">(1）成立专项小组，负责项目的评估、实施和后期跟踪；</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">(2）展开项目诊断和技术咨询。</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">帮助企业诊断项目是否符合科技计划申报要求。根据项目申报要求和往年成功经验，针对每个项目，亿账柜拟聘请相关领域内专家对项目进行科学论证及评价，并提出一些申报建议和主题方向。</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">(3）项目实施。</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">e账柜咨询项目组将联合公司专家库相关领域的专家进行项目申报要求和流程操作的专业解读，进一步从技术创新程度、技术水平、知识产权状态、经济和社会效益等方面对项目进行科学诊断和可行性分析，同时结合拟申报项目的特点与项目申报要求，进行项目的申报策划，提出完善可行的项目实施方案，并按照完善的项目评估体系和质量保证体系，最终完成项目材料的编写和校审，完成项目申报材料的上报。组织专家论证会，协助企业组织专家对项目进行可行性论证，并出具论证意见。协助企业到有关主管部门申请项目推荐意见。</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">(4）项目后期跟踪。</span>
                            </p>
                            <p style=";text-indent: 32px;vertical-align: middle;line-height: 150%">
                                <span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px"><span style="font-family:微软雅黑">项目上报后，</span>e账柜将采取各种措施提供全面协调工作，争取项目获得预期成功。随时跟踪项目的最新动态，并及时反馈给申报企业。</span>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:37px;text-autospace:ideograph-numeric;text-align:justify;text-justify:inter-ideograph;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 19px"><span style="font-family:微软雅黑">六、</span>e账柜介绍</span></strong>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;text-indent:19px;text-autospace:ideograph-numeric;text-align:justify;text-justify:inter-ideograph;vertical-align:middle;line-height:150%">
                                <strong><span style="line-height: 150%; font-size: 19px; font-family: 微软雅黑;">（一）公司简介</span></strong>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">广州亿账柜信息科技有限公司（简称：</span>e账柜）是一个专注于为中小微企业提供全生命周期服务的互联网服务平台，是国内首家倡导与践行企业服务精细化运营理念的专业机构，业务涵盖企业经营期间泛财务领域的所有服务。e账柜创业团队成员来自国内大型财务软件公司、互联网公司、通讯企业、财税服务机构、科技服务部门，由多名资深行业专家牵头，经过多年的行业项目策划与实施经验沉淀，整合了科技、财务、科技金融、知识产权等各方资源而全新组建，并得到各方的大力支持</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">&nbsp;e账柜<span style="font-family:微软雅黑">科技秉承</span>“科技创新引领产业发展方向”的理念，以客户服务为中心，凝聚各方力量，搭建交流沟通平台，一方面解决企业短期内的迫切需要，另一方面从长远意义出发，完善企业内部科技发展体系，以科技发展规划为指导、产业路线图为方向、科研立项为契机、产学研及科技融资为辅助、成果转化为目的，规划企业科技项目整体方案。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">服务范围：</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">财税服务：<span style="font-family:微软雅黑">全首创的</span>“会计到家”、“内审行家”、“科财专家”三大“极致财税”核心产品服务。</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">科技服务：</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">高新技术企业申报、高新技术企业复审、知识产权贯标体系认证、软件企业及产品认证、加计扣除申报、高新技术产品申报、自主创新产品申报、中小企业创新基金申报</span> <span style="font-family:微软雅黑">、产学研合作项目申报、科技计划项目申报、企业技术中心认定、工程技术研究中心申报</span> <span style="font-family:微软雅黑">、战略性新兴产业专项申报、科技经纪服务</span> </span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px">知识产权服务：</span>
                            </p>
                            <p style=";text-indent: 32px;line-height: 150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">专利代理咨询</span> <span style="font-family:微软雅黑">、软件著作权代理、专利申请加急、商标注册代理、知识产权交易、知识产权规划、科技查新服务</span></span>
                            </p>
                            <h2 style="margin-top:0;margin-bottom:0;margin-left:0;text-indent:19px;line-height:150%">
                                <strong><span style="line-height: 150%; font-size: 19px; font-family: 微软雅黑;">（二）</span></strong><strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 19px">e账柜</span></strong><strong><span style="line-height: 150%; font-size: 19px; font-family: 微软雅黑;">优势</span></strong>
                            </h2>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1）科学、严谨、规范的服务流程和严格的质量保证体系 &nbsp;&nbsp;</span></strong>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:31px;text-autospace:ideograph-numeric;text-align:justify;text-justify:inter-ideograph;line-height:150%">
                                <span style=";font-family:微软雅黑;font-size:16px">建立了从项目介入、启动、方案设计到后期跟踪的整套规范化服务流程，具有完善的项目评估体系和质量保证体系。</span>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2）强大的专家资源库</span></strong>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:31px;text-autospace:ideograph-numeric;text-align:justify;text-justify:inter-ideograph;line-height:150%">
                                <span style=";font-family:微软雅黑;font-size:16px">由各行业的知名专家、教授以及政府和企业界知名人士组成，为项目提供专业意见和权威论证。</span>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3）完善的沟通网络</span></strong>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:31px;text-autospace:ideograph-numeric;text-align:justify;text-justify:inter-ideograph;line-height:150%">
                                <span style=";font-family:微软雅黑;font-size:16px">与各级政府相关部门、金融机构、高等院校、科研院所和相关协会建立了良好的合作关系，为项目的操作和实施提供了有力的支撑。</span>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4）丰富的从业经验</span></strong>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:29px;text-autospace:ideograph-numeric;line-height:150%">
                                <span style=";font-family:微软雅黑;line-height:150%;font-size:16px"><span style="font-family:微软雅黑">公司主要人员人曾在行内工作多年，拥有丰富的项目评估、策划与实施经验。公司的咨询团队都具有大专以上学历，专业覆盖面广，具有丰富的项目管理经验。</span> </span>
                            </p>
                            <p>
                                <br/>
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:29px;text-autospace:ideograph-numeric;text-align:right;line-height:150%">
                            </p>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:29px;text-autospace:ideograph-numeric;text-align:right;line-height:150%">
                            </p>
                            </c:if>
                            <p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-indent:29px;text-autospace:ideograph-numeric;text-align:right;line-height:150%">
                                <strong><span style="font-family: 微软雅黑;line-height: 150%;font-size: 16px">&nbsp;&nbsp;&nbsp;<span style="font-family:微软雅黑">地址：广州市天河区翰景路</span>1号金星大厦15楼</span></strong>
                            </p>
                            <p>
                                <br/>
                            </p>
                        </body>
                        </html>`
            tinymce.get('tinymceEditer').setContent(temp);
            this.content = temp
        },

        asyc_show(){
            return new Promise(function(resolve,reject){

            })
        },

        downAccoutProductivity(){
            let _self = this
            let field = [
                    {field:'name',title:'职工'},
                    {field:'product1',title:'0申报代理记账（9元/1分）'},
                    {field:'product2',title:'小规模代理记账(25元/2分)'},
                    {field:'product3',title:'一般纳税人代理记账(45元/5分)'},
                    {field:'product4',title:'小规模高新(35元/3分)'},
                    {field:'product5',title:'一般纳税人高新(85元/7.5分)'},
                    {field:'totalmoney',title:'总计'},
                    {field:'totalscore',title:'工作量总分'},
                    // {field:'serverrealname',title:'服务人员'},
                    // {field:'period',title:'服务周期'}
                    ]
                let url = `api/system/queryAccPerDetail/list`
                let config = {
                        sort:'updatedate',
                        service_type:'dljz',
                        page: '1',
                        pageSize: '1000000',
                        date:'201805',
                        // CompanyName: _self.SearchValidate.CompanyName,
                        // server_realname: _self.SearchValidate.server_realname,
                        // followby_realname: _self.SearchValidate.followby_realname,
                        // departname: _self.SearchValidate.departname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                console.log(toExcel)
                window.open(toExcel)
        },
        downMarketProductivityTotal(){
            let _self = this
            let field = [
                    {field:'realname',title:'职工'},
                    {field:'totalmoney',title:'订单总价'},
                    {field:'ticheng',title:'提成'},
                    ]
                let url = `api/system/queryAccPerDetail/list`
                let config = {
                        sort:'updatedate',
                        service_type:'dljz',
                        page: '1',
                        pageSize: '1000000',
                        starttime:'2018-06-01',
                        endtime:'2018-07-01',
                        // CompanyName: _self.SearchValidate.CompanyName,
                        // server_realname: _self.SearchValidate.server_realname,
                        // followby_realname: _self.SearchValidate.followby_realname,
                        // departname: _self.SearchValidate.departname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                console.log(toExcel)
                window.open(toExcel)
        },
        downMarketProductivityDetail(){
            let _self = this
            let field = [
                    {field:'realname',title:'市场人员'},
                    {field:'ordercode',title:'订单号'},
                    {field:'paytime',title:'付款时间'},
                    {field:'area',title:'地区'},
                    {field:'departname',title:'部门'},
                    {field:'paynumber',title:'paynumber'},
                    {field:'realnumber',title:'realnumber'},
                    {field:'name',title:'客户名称'},
                    {field:'companyname',title:'公司名称'},
                    {field:'totalnumber',title:'totalnumber'},
                    {field:'itempaynumber',title:'itempaynumber'},
                    {field:'product',title:'产品名称'},
                    {field:'skuname',title:'skuname'},
                    {field:'memo',title:'memo'},
                    {field:'cluesources',title:'cluesources'},

                    ]
                let url = `api/system/queryAccPerDetail/list`
                let config = {
                        sort:'updatedate',
                        service_type:'dljz',
                        page: '1',
                        pageSize: '1000000',
                        starttime:'2018-06-01',
                        endtime:'2018-07-01',
                        // CompanyName: _self.SearchValidate.CompanyName,
                        // server_realname: _self.SearchValidate.server_realname,
                        // followby_realname: _self.SearchValidate.followby_realname,
                        // departname: _self.SearchValidate.departname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                console.log(toExcel)
                window.open(toExcel)
        },
        openFollowUPdata(){
            this.$bus.emit('global_follow_up_list',['36979',"广州时汇日用品有限公司","胡睿","45561"])
        }
    },
    mounted () {
        this.init();
        
    },
    destroyed () {
        tinymce.get('tinymceEditer').destroy();
    }
}
</script>


<!--
selector:'textarea#elm1',          //<textarea>中为编辑区域

heme: "modern",                  //主题

language: "zh_cn",                //语言 ，可自行下载中文

plugins: [                             //插件，可自行根据现实内容删除

content_css: "css/content.css",      //引用的外部CSS样式，可删除

//定义工具栏的位置
theme_advanced_toolbar_location : "top",

//定义工具栏工具的对其方式
theme_advanced_toolbar_align : "left",

//定义输入框下方是否显示状态栏，默认不显示
theme_advanced_statusbar_location : "bottom",

//定义是否可以改变输入窗口大小
theme_advanced_resizing : true


插件对应列表如下：

//字体大小
font_size:['font_size','fontsizeselect'],

//加粗
bold:['bold_desc','Bold'],

//斜体
italic:['italic_desc','Italic'],

//下划线
underline:['underline_desc','Underline'],

//贯穿线
strikethrough:['striketrough_desc','Strikethrough'],

//左对齐
justifyleft:['justifyleft_desc','JustifyLeft'],

//居中对齐
justifycenter:['justifycenter_desc','JustifyCenter'],

//右对齐
justifyright:['justifyright_desc','JustifyRight'],

//两边对齐
justifyfull:['justifyfull_desc','JustifyFull'],

//项目符号列表
bullist:['bullist_desc','InsertUnorderedList'],

//编号列表
numlist:['numlist_desc','InsertOrderedList'],

//减少缩进
outdent:['outdent_desc','Outdent'],

//增加缩进
indent:['indent_desc','Indent'],

//剪切
cut:['cut_desc','Cut'],

//复制
copy:['copy_desc','Copy'],

//粘贴
paste:['paste_desc','Paste'],

//撤销
undo:['undo_desc','Undo'],

//重做
redo:['redo_desc','Redo'],

//增加链接
link:['link_desc','mceLink'],

//删除链接
unlink:['unlink_desc','unlink'],

//插入图片
image:['image_desc','mceImage'],

//清理代码
cleanup:['cleanup_desc','mceCleanup'],

//帮助
help:['help_desc','mceHelp'],

//代码视图
code:['code_desc','mceCodeEditor'],

//插入水平线
hr:['hr_desc','InsertHorizontalRule'],

//清除样式
removeformat:['removeformat_desc','RemoveFormat'],

//显示/隐藏对象
visualaid:['visualaid_desc','mceToggleVisualAid'],

//下标
sub:['sub_desc','sub.'],

//上标
sup:['sup_desc','super.'],

//插入特殊符号
charmap:['charmap_desc','mceCharMap'],

//字体颜色
forecolor:['forecolor_desc','ForeColor'],

//前景色
forecolorpicker:['forecolor_desc','mceForeColor'],

//背景色
backcolor:['backcolor_desc','HiliteColor'],

//背景色食色板
backcolorpicker:['backcolor_desc','mceBackColor'],

//插入编辑描点
anchor:['anchor_desc','mceInsertAnchor'],

//新建空白文档
newdocument:['newdocument_desc','mceNewDocument'],

//引用
blockquote:['blockquote_desc','mceBlockQuote'],

//查找替换
reply:['replace_desc','reply'],

-->