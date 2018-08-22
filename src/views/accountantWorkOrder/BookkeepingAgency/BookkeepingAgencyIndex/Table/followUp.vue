<template>
    <div>
        <Modal
            v-model="follow_open"
            title="服务详情"
            width="100%"
        >
            <Row>
                <center><h2>{{row.companyname}}</h2></center>
            </Row>
            <Row style="margin-top:20px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            follow_open:false,
            header:[
                {
                    title:"公司名称",
                    key:"companyname",
                    width:250
                },
                {
                    title:"会计",
                    key:"realname",
                    width:120
                },
                {
                    title: '产品名称',
                    key: 'product',
                    width: 160
                },
                {
                    title:"账期",
                    key:'period',
                    width:120
                },
                {
                    title: '联系客户',
                    key: 'lianxikehu',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                            // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.lianxikehu.confirm_date == undefined){
                            return h('div','[ 未完成 ]');
                        }else{
                            return h('div', [
                                h('img',{
                                    domProps:{
                                        height: 120,
                                        src: '/api/assets/'+params.row.lianxikehu.image_url,
                                    },
                                    on:{
                                        click:() => {
                                                window.open('/api/assets/'+params.row.lianxikehu.image_url)
                                            }
                                    
                                    }
                                }),
                                h('div',params.row.lianxikehu.confirm_date.slice(0,10))
                            ])
                        }
                    }
                },
                    {
                        title: '报税',
                        key: 'baoshui',
                        width:120,
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
                        title: '扣款',
                        key: 'koukuan',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;                            
                            // console.log(isNaN(params.row.zlwc))
                            if(params.row.koukuan.confirm_date == undefined){
                                return h('div','[ 未完成 ]');
                            }else{
                                return h('div', [
                                    h('img',{
                                        domProps:{
                                            height: 120,
                                            src: '/api/assets/'+params.row.koukuan.image_url,
                                        },
                                        on:{
                                            click:() => {
                                                    window.open('/api/assets/'+params.row.koukuan.image_url)
                                                }
                                        
                                        }
                                    }),
                                    h('div',params.row.koukuan.confirm_date.slice(0,10))
                                ])
                            }
                        }
                    },
                    {
                        title: '社保',
                        key: 'shebao',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            
                            if(params.row.shebao.confirm_date == undefined){
                                return h('div','[ 未完成 ]');
                            }else{
                                return h('div', [
                                    h('img',{
                                        domProps:{
                                            height: 120,
                                            src: '/api/assets/'+params.row.shebao.image_url,
                                        },
                                        on:{
                                            click:() => {
                                                    window.open('/api/assets/'+params.row.shebao.image_url)
                                                }
                                        
                                        }
                                    }),
                                    h('div',params.row.shebao.confirm_date.slice(0,10))
                                ])
                            }
                        }
                    },
                    {
                        title: '公积金',
                        key: 'gongjijin',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            if(params.row.gongjijin.confirm_date == undefined){
                                return h('div','[ 未完成 ]');
                            }else{
                                return h('div', [
                                    h('img',{
                                        domProps:{
                                            height: 120,
                                            src: '/api/assets/'+params.row.gongjijin.image_url,
                                        },
                                        on:{
                                            click:() => {
                                                    window.open('/api/assets/'+params.row.gongjijin.image_url)
                                                }
                                        
                                        }
                                    }),
                                    h('div',params.row.gongjijin.confirm_date.slice(0,10))
                                ])
                            }
                        }
                    },
                    {
                        title: '做账',
                        key: 'zuozhang',
                        align: "center",
                        width:120,
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
                        title: '扫票',
                        key: 'saopiao',
                        align: "center",
                        width:120,
                        render: (h, params) => {
                            let reg=/^[-+]?\d*$/;
                            if(params.row.saopiao.confirm_date == undefined){
                                return h('div','[ 未完成 ]');
                            }else{
                                return h('div', [
                                    h('img',{
                                        domProps:{
                                            height: 120,
                                            src: '/api/assets/'+params.row.saopiao.image_url,
                                        },
                                        on:{
                                            click:() => {
                                                    window.open('/api/assets/'+params.row.saopiao.image_url)
                                                }
                                        
                                        }
                                    }),
                                    h('div',params.row.saopiao.slice(0,10))
                                ])
                            }
                        }
                    },
                {
                    title:"财务等级",
                    key:'accountgrade',
                    width:120
                },
                
            ],
            data:[],
            row:"",
            page: 1,
            pageTotal:new Number()
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.getData()
        },
        getData(){
            let _self = this
            _self.loading =  true
            let url = `api/order/cycle/month/service/list`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: 10,
                    sortField:"updatedate",
                    cycle_service_record_id: _self.row.cycle_service_record_id
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
    },
    created(){
        let _self = this
        _self.$bus.on('open_booking_follow',(e)=>{
            // console.log(e)
            _self.row = e
            // console.log(_self.row)
            _self.getData()
            _self.follow_open = true
        })
    }
}
</script>

