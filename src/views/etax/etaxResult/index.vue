<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row>
                                    <Col span="6">
                                        <FormItem label="企业名称：" prop="qybdname">
                                            <Input v-model="formValidateSearch.qybdname" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="征收项目：" prop="subject">
                                            <Input v-model="formValidateSearch.subject" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="征收品目：" prop="item">
                                            <Input v-model="formValidateSearch.item" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="申报月份：" prop="bsmonth">
                                            <DatePicker transfer type="month" placement="bottom-end" v-model="formValidateSearch.bsmonth" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <FormItem label="税款所属期起：" prop="taxstart">
                                            <DatePicker transfer type="date" placement="bottom-end" v-model="formValidateSearch.taxstart" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="税款所属期止：" prop="taxend">
                                            <DatePicker transfer type="date" placement="bottom-end" v-model="formValidateSearch.taxend" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="申报期限：" prop="period">
                                            <DatePicker transfer type="date" placement="bottom-end" v-model="formValidateSearch.period" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="申报日期：" prop="bsdate">
                                            <DatePicker transfer type="date" placement="bottom-end" v-model="formValidateSearch.bsdate" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <FormItem style="margin-top: 10px">
                                            <Button size="small" type="primary" @click="Search">搜索</Button>
                                            <Button size="small" type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                    :loading="loading"
                    highlight-row
                    size="small"
                    border
                    :columns="header"
                    :data="data"></Table>
                <Page
                    size="small"
                    :total="total"
                    show-total
                    show-elevator
                    :current.sync="page"
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
import { DateFormatYearMonth,DateFormat } from '../../../libs/utils'

export default {
    name: "taxResult",
    data(){
        return {
            data: [],
            header: [
                {
                    title: "序号",
                    type: "index",
                    minWidth: 90
                },
                {
                    title: "企业名称",
                    key: "qybdname",
                    minWidth: 250,
                    render: (h, params) => {
                        // console.log(params.row.qybdname.split("（")[0])
                        return h('div', params.row.qybdname.split("（")[0])
                    }
                },
                {
                    title: "服务会计",
                    key: "kj_name",
                    minWidth: 120
                },
                {
                    title: "征收项目",
                    key: "subject",
                    minWidth: 180
                },
                {
                    title: "征收品目",
                    key: "item",
                    minWidth: 150
                },
                {
                    title: "申报月份",
                    key: "bs_month",
                    minWidth: 120
                },
                {
                    title: "所属税期起",
                    key: "tax_start",
                    minWidth: 120
                },
                {
                    title: "所属税期止",
                    key: "tax_end",
                    minWidth: 120
                },
                {
                    title: "申报期限",
                    key: "period",
                    minWidth: 120
                },
                {
                    title: "申报日期",
                    key: "bs_date",
                    minWidth: 120
                }
            ],
            page: 1,
            pageSize: 10,
            loading: false,
            formValidateSearch: {
                qybdname: "",
                subject: "",
                item: "",
                bsmonth: "",
                taxstart: "",
                taxend: "",
                period: "",
                bsdate: ""
            },
            total: 0,
            search_model: 1
        }
    },
    methods: {
        pageChange(e){
            this.page = e
            this.get_data()
        },
        Search(){
            this.page = 1
            this.get_data()
        },
        handleReset(){
            this.page = 1
            this.$refs["formValidateSearch"].resetFields()
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = `api/customer/company/gdetax/etaxSBQKList`

            _self.loading = true

            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    qybdname: _self.formValidateSearch.qybdname,
                    subject: _self.formValidateSearch.subject,
                    item: _self.formValidateSearch.item,
                    bsmonth: DateFormatYearMonth(_self.formValidateSearch.bsmonth),
                    taxstart: DateFormat(_self.formValidateSearch.taxstart),
                    taxend: DateFormat(_self.formValidateSearch.taxend),
                    period: DateFormat(_self.formValidateSearch.period),
                    bsdate: DateFormat(_self.formValidateSearch.bsdate),
                    sortField: 'id',
                    order: "desc"
                }
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false   
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_data()
    }
}
</script>

<style>
    .ivu-col-span-6 {
        height: 28px;
    }
</style>