<template>
    <div>
        <Card>
            <search-model :data="searchData" @search="search"></search-model>
            <ButtonGroup style="margin-top:10px">
                <Button @click="openFlowChart=true" type="primary">新增流程图定义</Button>
            </ButtonGroup>
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                ></Table>
                <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="page_change"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <create-flow-chart v-if="openFlowChart" @close="close"></create-flow-chart>
    </div>
</template>

<script>
import createFlowChart from './createFlowChart'
import * as flowChartApi from './api.js'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: 'flowChart_index',
    components: {
        searchModel,
        createFlowChart
    },
    data(){
        return {
            openFlowChart: false,
            loading: false,
            page: 1,
            pageSize: 10,
            total: 0,
            header: [
                {
                    title: "shortname",
                    key: 'shortname',
                    minWidth: 120
                },
                {
                    title: 'processKey',
                    key: 'processKey',
                    minWidth: 150
                },
                {
                    title: 'processType',
                    key: 'processType',
                    minWidth: 120
                },
                {
                    title: 'processArea',
                    key: 'processArea',
                    minWidth: 120
                },
                {
                    title: 'memo',
                    key: 'memo',
                    minWidth: 200       
                }
            ],
            data: [],
            searchData: [
                {
                    label: '说明',
                    key: 'memo',
                    type: 'input'
                },
                {
                    label: '流程编码',
                    key: 'processKey',
                    type: 'input'
                }
            ],
            formInline: {}
        }
    },
    methods:{
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: this.pageSize
                }
            }

            Object.assign(config.params, this.formInline)
            try {
                let {rows, total} = await flowChartApi.getProductSkuFlowDiagramList(config)
                this.data = rows
                this.total = total
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        search(e){
            Object.assign(this.formInline, e)
            this.page = 1
            this.get_data()
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        close(){
            this.get_data()
            this.openFlowChart = false
        }
    },
    async created(){
        this.get_data()
    }
}
</script>
