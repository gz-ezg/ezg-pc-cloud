<template>
    <div>
        <Modal
            :value="true"
            title="选择公司"
            width="80%"
            @on-cancel="close"
        >
            <Row :gutter="16">
                <Col span="8">
                    <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-enter="get_data">
                        <Button slot="append" icon="ios-search" @click="get_data"></Button>
                    </Input>
                </Col>
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    :loading="loading"
                    size="small"
                    ref="selection"
                    :columns="header"
                    :data="data"
                    @on-row-dblclick="row_select"></Table>
            <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="page_change"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { getCompanyList } from './api'
export default {
    name: "selectName",
    data(){
        return {
            searchCompany: "",
            header: [
                {
                    title: '公司名称',
                    key: 'companyname',
                    minWidth:300
                },
                {
                    title: '归属客户',
                    key: 'customerName',
                    minWidth:150
                },
                {
                    title: '客户电话',
                    key: 'customerTel',
                    minWidth:150
                }
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
        }
    },
    methods: {
        async get_data(){
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: 10,
                    companyname: this.searchCompany
                }
            }

            try {
                let { total, rows} = await getCompanyList(config)
                this.data = rows
                this.total = total
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        row_select(e){
            this.$emit("company-change", e)
        },
        close(){
            this.$emit("close")
        }
    },
    created() {
        this.get_data()
    },
}
</script>
