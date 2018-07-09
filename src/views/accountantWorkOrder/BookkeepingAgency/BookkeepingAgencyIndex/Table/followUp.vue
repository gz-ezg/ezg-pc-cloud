<template>
    <div>
        <Modal
            v-model="follow_open"
            title="客户跟进"
            width="100%"
        >
            <Row>
                <!-- <center>{{current_row.companyname}}</center> -->
            </Row>
            <Row style="margin-top:20px">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"></Table>
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
                    title: '联系客户',
                    key: 'lianxikehu',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.lianxikehu.confirm_date == undefined){
                            return h('div', '未完成');
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
                    },
                    
                },
                { 
                    title: '报税',
                    key: 'baoshui',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.baoshui.confirm_date == undefined){
                            return h('div', '未完成');
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
                    },
                    
                },
                { 
                    title: '扣款',
                    key: 'koukuan',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.koukuan.confirm_date == undefined){
                            return h('div', '未完成');
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
                    },
                    
                },
                { 
                    title: '社保',
                    key: 'shebao',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.lianxikehu.confirm_date == undefined){
                            return h('div', '未完成');
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
                    },
                    
                },
                { 
                    title: '公积金',
                    key: 'shebao',
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        // console.log(params.row.lianxikehu.confirm_date)
                        let reg=/^[-+]?\d*$/; 
                        if(params.row.lianxikehu.confirm_date == undefined){
                            return h('div', '未完成');
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
                    },
                    
                },
                {
                    title:"财务等级",
                    key:'accountgrade',
                    width:120
                },
                {
                    title:"账期",
                    key:'',
                    width:120
                }
            ],
            data:[]
        }
    },
    created(){
        let _self = this
        _self.$bus.on('open_booking_follow',(e)=>{
            console.log(e)
            _self.data = []
            _self.data.push(e)
            _self.follow_open = true
        })
    }
}
</script>

