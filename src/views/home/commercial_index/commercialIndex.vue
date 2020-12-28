<template>
<div style="min-width:1100px">
    <Row>
        <Col span="24" style="background-color:#FFFFFF;padding:10px">
        <div>
            <!-- <Col span="24" style="padding:20px">
            <center>
                <h2>报表条件筛选</h2>
            </center>
            </Col> -->
            <Col span="24" style="padding-bottom:20px">
            <center>
                产品：
                <Input @on-focus="handleShowModel" :value="selectValue.join()||'请选择'" size="small" style="width:200px;margin-right:20px">
                </Input>
                <DatePicker size="small" type="month" placeholder="选择月份" style="width: 200px" v-model="dataRange" @on-change="date_change" placement="bottom" />
            </center>
            </Col>
        </div>
        </Col>
    </Row>
    <Row :gutter="10" class="margin-top-10">
        <iframe style="width:100%;min-height:240px" :src="srcUrl"></iframe>
    </Row>
     <Row :gutter="10" class="margin-top-10">
        <iframe style="width:100%;min-height:600px" :src="srcWqUrl"></iframe>        
    </Row>
    <Row :gutter="10" class="margin-top-10" style="height:600px">
        <Col span="24" :style="{marginBottom: '10px'}">
        <Card style="height:600px">
            <div class="data-source-row">
                <person-sum-table :date="dateTemp" :type="type"></person-sum-table>
            </div>
        </Card>
        </Col>
    </Row>
    <Row :gutter="10" class="margin-top-10" style="height:600px">
        <Col span="24" :style="{marginBottom: '10px'}">
        <Card style="height:600px">
            <div class="data-source-row">
                <detail-analysis></detail-analysis>
            </div>
        </Card>
        </Col>
    </Row>
    <Modal title="工单提醒" width="400" v-model="workorderTip" :closable="false" :mask-closable="false">
        <Row :gutter="16">
            <Table ref="selection" highlight-row size="small" :columns="header" :data="dataAnalyz">
            </Table>
        </Row>
        <Row :gutter="16" style="margin-top:20px">
            <center>
                <Button type="error" @click="workorderTip=false">我知道了！</Button>
                <Button type="primary" @click="to_workorder_list" style="margin-left:20px">查看详情</Button>
            </center>
        </Row>
        <div slot="footer"></div>
    </Modal>

    <Modal title="产品选择" width="60%" v-model="selectModel">
        <Row :gutter="16">
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>
            <CheckboxGroup @on-change="checkAllGroupChange" v-model="selectValue">
                <Checkbox style="min-width:200px" :key="index" v-for="(item,index) in selectList" :label="item.product"></Checkbox>
            </CheckboxGroup>
        </Row>
        <Row :gutter="16" style="margin-top:20px">
            <center>
                <Button type="error" @click="handleComfirm">确定</Button>
            </center>
        </Row>
        <div slot="footer"></div>
    </Modal>

</div>
</template>

<script>
import fieldAnaylist from './field_anaylist'
import workorderAnaylist from './workorder_anaylist'
import personSumTable from './personSumTable'
import detailAnalysis from './detailAnalysis'

export default {
    components: {
        fieldAnaylist,
        workorderAnaylist,
        personSumTable,
        detailAnalysis,
    },
    data() {
        return {
            checkAll: true,
            indeterminate: false,
            isAdmin: false,
            isBusinessAdmin: false,
            userid:0,
            srcUrl: 'http://ureport.zgcfo.com/ureport/preview?_u=file:businessWorkTotalValue.ureport.xml&serviceMonth=',
            srcWqUrl: 'http://ureport.zgcfo.com/ureport/preview?_u=file:businessWQTotalPerformace.ureport.xml&serviceMonth=',
            count: '',
            selectMonth: '',
            selectValue: [],
            selectList: [],
            selectModel: false,
            teamCount: '',
            index: '',
            operatorId: '',
            validTimes: '',
            avagPersonValid: '',
            avagTeamValid: '',
            details: '',
            type: '',
            dataRange: '',
            dateTemp: [],
            dataAnalyz: [],
            workorderTip: false,
            header: [{
                    title: '工单状态',
                    key: 'name',
                },
                {
                    title: '数量',
                    key: 'value',
                },
            ],
        }
    },
    methods: {
        getSelectList() {
            let url = 'api/product/businessProductIdAndProduct?defaultdepartalias=BUSSINESS'
            let _self = this

            this.$http.get(url).then(function (res) {
                if (res.data.msgCode == '40000') {
                    _self.selectList = res.data.data.rows
                    _self.selectValue = res.data.data.rows.map((v) => v.product)
                }
            })
        },
        handleComfirm() {
            this.srcUrl =
                'http://ureport.zgcfo.com/ureport/preview?_u=file:businessWorkTotalValue.ureport.xml&serviceMonth=' +
                this.selectMonth +
                '&product=' +
                this.selectList
                .filter((v) => this.selectValue.includes(v.product))
                .map((v) => v.id)
                .join(',')

           this.srcWqUrl=
                'http://ureport.zgcfo.com/ureport/preview?_u=file:businessWQTotalPerformace.ureport.xml&serviceMonth=' +
                this.selectMonth +
                '&userid=' +
                this.userid

            this.selectModel = false
        },
        date_change(e) {
            this.selectMonth = e
            this.handleComfirm()
        },
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false
            } else {
                this.checkAll = !this.checkAll
            }
            this.indeterminate = false

            if (this.checkAll) {
                this.selectValue = this.selectList.map((v) => v.product)
            } else {
                this.selectValue = []
            }
        },
        checkAllGroupChange(data) {
            if (data.length === this.selectList.length) {
                this.indeterminate = false
                this.checkAll = true
            } else if (data.length > 0) {
                this.indeterminate = true
                this.checkAll = false
            } else {
                this.indeterminate = false
                this.checkAll = false
            }
        },
        handleShowModel() {
            this.selectModel = true
        },
        open_every_analyz() {
            let url = 'api/order/bussiness/index/work/order/analysis/dataReport'
            let _self = this

            this.$http
                .get(url)
                .then(function (res) {
                    if (res.data.msgCode == '40000') {
                        _self.workorderTip = true
                        _self.dataAnalyz = res.data.data
                        console.log(_self.dataAnalyz)
                    }
                })
                .catch(function (err) {
                    _self.workorderTip = false
                    console.err(err)
                })
        },
        to_workorder_list() {
            this.$router.push({
                name: 'commercialTaskManagement',
            })
        },
    },
    created() {
        this.userid = localStorage.getItem("id")
        this.isAdmin = (this.userid == 10059 )
        this.isBusinessAdmin = localStorage.getItem("Role").indexOf('ssbgd') > -1
        if (this.isBusinessAdmin || this.isAdmin) {
            this.userid = 0
        }

        let date = new Date()
        let now =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1 < 10 ?
                '0' + (date.getMonth() + 1) :
                date.getMonth() + 1)

        this.dataRange = now
        this.selectMonth = now
        this.srcUrl = this.srcUrl + now
        this.srcWqUrl = this.srcWqUrl + now + '&userid=' + this.userid
        // this.open_every_analyz()
        this.getSelectList()
    },
}
</script>

<style lang="less">
@import '../home.less';
@import '../../../styles/common.less';
</style>
