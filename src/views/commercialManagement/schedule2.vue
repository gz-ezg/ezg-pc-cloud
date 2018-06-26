<template>
    <div>
        <Card>
            <Row style="margin-top:10px">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                >
                
                </Table>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formline:{
                select:'2222'
            },
            select_data:[
                {
                    id:'1111',
                    value:'摩拜'
                },
                {
                    id:'2222',
                    value:'打的'
                },
                {
                    id:'3333',
                    value:'滴滴'
                }
            ],
            data:[
                {
                    time:'12:30',
                    area:'2222'
                },
                {
                    time:'12:30',
                    area:'1111'
                },
                {
                    time:'12:30',
                    area:'3333'
                }
            ],
            header:[
                {
                    title:'时间',
                    key:'time',
                    width:120
                },
                {
                    title:'区域',
                    key:'area',
                    width: 120,
                    render:(h, params) => {
                        var _self = this
                        // console.log(params)
                        return h('Select',{
                            domProps:{
                                VModel:'this.formline.select'
                            },
                            props:{
                                value: params.row.area,
                            },
                            on:{
                                'on-change':(value)=>{
                                    //  一个伪双向数据绑定
                                    params.row.area = value;
                                    this.data[params.index].area = value
                                }  
                            }
                        },
                        this.select_data.map(function(item){  
                            return h('Option', {  
                                props: {value: item.id}  
                            }, item.value);  
                        })  
                    );
                }
            },
            {
                    title:'地点',
                    key:'area',
                    width: 120,
                    render:(h, params) => {
                        var _self = this
                        // console.log(params)
                        return h('Select',{
                            domProps:{
                                VModel:'this.formline.select'
                            },
                            props:{
                                value: params.row.area,
                            },
                            on:{
                                'on-change':(value)=>{
                                    //  一个伪双向数据绑定
                                    params.row.area = value;
                                    this.data[params.index].area = value
                                }  
                            }
                        },
                        this.select_data.map(function(item){  
                            return h('Option', {  
                                props: {value: item.id}  
                            }, item.value);  
                        })  
                    );
                }
            },
            {
                    title:'事件',
                    key:'area',
                    width: 120,
                    render:(h, params) => {
                        var _self = this
                        // console.log(params)
                        return h('Select',{
                            domProps:{
                                VModel:'this.formline.select'
                            },
                            props:{
                                value: params.row.area,
                            },
                            on:{
                                'on-change':(value)=>{
                                    //  一个伪双向数据绑定
                                    params.row.area = value;
                                    this.data[params.index].area = value
                                }  
                            }
                        },
                        this.select_data.map(function(item){  
                            return h('Option', {  
                                props: {value: item.id}  
                            }, item.value);  
                        })  
                    );
                }
            }
            ]
        }
    }
}
</script>

