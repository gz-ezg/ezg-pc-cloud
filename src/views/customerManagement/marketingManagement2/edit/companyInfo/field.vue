<template>
    <Modal
            :title="companyDetail"
            v-model="openAddMission"
            width="1200"
            :mask-closable="false"
    >
        <Row style="margin-top: 10px; display: flex; justify-content: space-between" :gutter="12">
            <Col span="6">
                <Card>
                    <p slot="title" style="text-align: center">服务期内总外勤</p>
                    <p style="text-align: center;font-weight: 700;font-size: 14px">A类：{{countData.aCount}}个</p>
                    <p style="text-align: center;font-weight: 700;font-size: 14px">B类：{{countData.bCount}}个</p>
                </Card>
            </Col>
            <Col span="6">
                <Card>
                    <p slot="title" style="text-align: center">剩余外勤</p>
                    <p style="text-align: center;font-weight: 700;font-size: 14px">A类：{{countData.remainderA}}个</p>
                    <p style="text-align: center;font-weight: 700;font-size: 14px">B类：{{countData.remainderB}}个</p>
                </Card>
            </Col>
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
                    show-sizer
                    show-elevator
                    :current.sync="page"
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    style="margin-top: 10px"></Page>
        </Row>
    </Modal>
</template>

<script>
    export default {
        name: "Field",
        data(){
            return{
                openAddMission:false,
                loading:false,
                id:'',
                data:[],
                countData:[],
                total:0,
                page:1,
                pageSize:10,
                companyDetail:"xxx公司"+"外勤明细",
                imgList:[],
                header:[
                    {
                        title: '打卡会计',
                        key: 'realname',
                        minWidth: 140,
                    },
                    {
                        title: '开始打卡时间',
                        key: 'begin_time',
                        minWidth: 160,
                    },
                    {
                        title: '结束打卡时间',
                        key: 'end_time',
                        minWidth: 160,
                    },
                    {
                        title: '外勤时长',
                        key: 'diff',
                        minWidth: 140,
                    },
                    {
                        title: '打卡地址',
                        key: 'end_address',
                        minWidth: 260,
                    },
                    {
                        title: '外勤类型',
                        key: 'type',
                        minWidth: 140,
                    },
                    {
                        title: '总结',
                        key: 'result_summary',
                        minWidth: 160,
                    },
                    {
                        title: '外勤图片',
                        key: 'realpath',
                        minWidth: 160,
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            get_data(){
                let _self = this
                _self.loading = true
                let url = 'api/user/legwork/companyLegworkListByCompanyId'
                let config = {
                    params:{
                        companyId:33014,
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
            get_count_data(e){
                    let _self = this
                    _self.loading = true
                    let url = 'api/user/legwork/companyLegworkCountByCompanyId'
                    let config = {
                        params:{
                            companyId:e.id
                        }
                    }

                    function success(res){
                        console.log(res.data.data)
                        _self.countData= res.data.data

                        _self.loading = false
                    }

                    this.$Get(url, config ,success)
                },
            },
        created() {
            this.$bus.off("OPEN_FIELD_DETAIL", true)
            this.$bus.on("OPEN_FIELD_DETAIL", (e)=>{
                this.openAddMission = true
                this.id = e.id
                this.get_count_data(e)
                this.get_data()
                console.log(e)
            })
        }
    }
</script>

<style>

</style>