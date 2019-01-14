<template>
    <div>
        <Modal
            v-model="follow_open"
            title="服务详情"
            width="100%"
            @on-cancel="close"
        >
            <Row>
                <center><h2>{{company.companyname}}</h2></center>
            </Row>
            <Row style="margin-top:20px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
import * as accountApi from '../../api'

export default {
    props: {
        company: {
            type: [String, Object]
        }
    },
    data(){
        return {
            follow_open:true,
            header:[
                {
                    title:"公司名称",
                    key:"companyname",
                    minWidth:250
                },
                {
                    title:"会计",
                    key:"realname",
                    minWidth:120
                },
                {
                    title: '产品名称',
                    key: 'product',
                    minWidth: 160
                },
                {
                    title:"账期",
                    key:'period',
                    minWidth:120
                },
                {
                    title: '报税',
                    key: 'baoshui',
                    minWidth:120,
                    align: "center",
                    render: (h, params) => {
                        let reg =/^[-+]?\d*$/;
                        if(params.row.baoshui.confirm_date == undefined){
                            return h('div','[ 未完成 ]');
                        }else{
                            return h('div', [
                                h('img',{
                                    domProps:{
                                        height: 120,
                                        src: '/api/assets/'+params.row.baoshui.image_url,
                                        width: 120
                                    },
                                    attrs: {
                                        onerror: "this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null"
                                    },
                                    on:{
                                        click:() => {
                                            window.open('/api/assets/'+params.row.baoshui.image_url)
                                        }
                                        
                                    }
                                }),
                                h('div',params.row.baoshui.confirm_date.slice(0,10))
                            ])
                        }
                    }
                },
                {
                    title: '做账',
                    key: 'zuozhang',
                    align: "center",
                    minWidth:120,
                    render: (h, params) => {
                        let reg=/^[-+]?\d*$/;
                        if(params.row.zuozhang.confirm_date == undefined){
                            return h('div','[ 未完成 ]');
                        }else{
                            return h('div', [
                                h('img',{
                                    domProps:{
                                        height: 120,
                                        src: '/api/assets/'+params.row.zuozhang.image_url,
                                        width: 120
                                    },
                                    attrs:{
                                        onerror: "this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null"
                                    },
                                    on:{
                                        click:() => {
                                            window.open('/api/assets/'+params.row.zuozhang.image_url)
                                        }
                                    }
                                }),
                                h('div',params.row.zuozhang.confirm_date.slice(0,10))
                            ])
                        }
                    }
                },
                {
                    title: '警戒值',
                    key: 'accounter_security_line',
                    minWidth: 120
                },
                {
                    title:"财务等级",
                    key:'accountgrade',
                    minWidth:120
                },
                
            ],
            data:[],
            info:"",
            page: 1,
            pageTotal: 0
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.getData(this.company.cycle_service_record_id)
        },
        async getData(id){
            let _self = this
            _self.loading =  true
            let config = {
                params:{
                    page: _self.page,
                    pageSize: 10,
                    sortField:"updatedate",
                    cycle_service_record_id: id
                }
            }

            try {
                let { total, rows } = await accountApi.orderCycleMonthServiceList(config)
                _self.pageTotal = total
                _self.data = rows
            } catch (error) {
                console.log(error)
            }

            _self.loading = false
        },
        close(){
            this.$emit("close")
        }
    },
    created(){
        this.loading = true
    },
    mounted(){
        let _self = this
        this.getData(this.company.cycle_service_record_id)
    }
}
</script>

