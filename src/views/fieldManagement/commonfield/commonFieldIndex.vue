<template>
    <div>
        <Tabs value="name1">
            <TabPane label="普通外勤" name="name1">
                <common-field></common-field>
            </TabPane>
            <!-- <TabPane label="会计到家外勤" name="name2">
                <account-field></account-field>
            </TabPane> -->
        </Tabs>
        <!-- <Modal
            title="查看详情"
            v-model="open_detail"
            width="700"
        >
            <Row :gutter="20" style="margin-top:10px;margin-left:10px;margin-right:10px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data">
                </Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"                    
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal> -->
    </div>
</template>

<script>
import Bus from '../../../components/bus.js'
import accountField from '../../accountantWorkOrder/accountantField/accountantField'
import commonField from './commonFiedManagement'

export default {
    name:'commonfieldmanagement_index',
    components:{
        accountField,
        commonField
    },
    data(){
        return{
            // id:"",
            // open_detail:false,
            // loading:false,
            // header:[
            //     {
            //         title: '公司名称',
            //         width:250,
            //         key:'companyname'
            //     },
            //     {
            //         title: '客户名称',
            //         width:120,
            //         key:'name'
            //     },
            //     {
            //         title: '电话',
            //         width:150,
            //         key:'tel'
            //     },
            //     {
            //         title: '外勤数',
            //         width:100,
            //         key:'num'
            //     }
            // ],
            // data:[],
            // pageTotal: new Number(),
            // page:1,
            // pageSize:10
        }
    },
    methods: {
        pageChange(e){
            this.page = e
            this.getData()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.getData()
        },
        getData(){
            let _self = this
            this.loading = true
            let url = `api/legwork/checkCompanyMsg`
            let config = {
                params:{
                    warningId:_self.id,
                    page: _self.page,
                    pageSize: _self.pageSize
                } 
            }
            
            function success(res){
                _self.open_detail = true
                _self.loading = false                
                // console.log(res.data)
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
            }
            function fail(err){
                _self.loading = false
            }
            this.$Get(url, config, success, fail)
        }
    },
    created () {
        let _self = this
        Bus.$on('Open_field_Working',(e)=>{
            _self.page = 1
            _self.pageSize = 10
            _self.id = e
            _self.getData()
            // _self.getData(e)
        })
        
    }
}
</script>
