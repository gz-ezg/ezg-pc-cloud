<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <!-- <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="applicant_realname" label="申请人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.applicant_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="receiver_realname" label="接收人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.receiver_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div> -->
                </Panel>
            </Collapse>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
export default {
    name: "marketPerformance_index",
    data(){
        return{
            total: 0,
            data: [],
            header: [
                {
                    title: "订单编号",
                    key: "ordercode",
                    minWidth: 150
                },
                {
                    title: "公司名称",
                    key: "CompanyName",
                    minWidth: 150
                },
                {
                    title: "缴费时间",
                    key: "ach_time",
                    minWidth: 150
                },
                {
                    title: "缴费金额",
                    key: "ach_money",
                    minWidth: 150
                },
                {
                    title: "客户来源",
                    key: "company_source",
                    minWidth: 150
                }
                
            ],
            seacrhFormInline:{

            },
            loading: false,
            page: 1
        }
    },
    methods:{
        search(){

        },
        reset(){

        },
        get_data(){
            let _self = this
            _self.loading = true
            let config = {
                params: {
                    departname: "",
                    username: "",
                    payTime: "",
                    createTime: "",
                    companySource: "",
                    transactionType: "",
                    page: _self.page,
                    pageSize: 10
                }
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    },
    created() {
        let _self = this
        this.get_data()
    },
}
</script>
