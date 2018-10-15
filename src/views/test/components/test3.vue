<template>
    <div>
        <div>带select,datePicker功能的table</div>
        <Table
            style="margin-top:10px"
            ref="selection"
            highlight-row
            size="small"
            :columns="header2"
            :data="data2"></Table>
        <!-- <Button @click="value1 = true" type="primary">Open</Button>
        <Drawer title="Basic Drawer" :closable="false" v-model="value1">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer> -->
        <!-- <vue-scroller 
            :on-refresh="refresh"
            :on-infinite="infinite"> -->
            <!-- content goes here -->
        <!-- </vue-scroller> -->
    </div>
</template>

<script>
// import Drawer from 'iview/src/components/drawer'
// import VueScroller from 'vue-scroller/src/components/Scroller.vue'


export default {
    name: "test-3",
    components:{
        // VueScroller
        // Drawer
    },
    data(){
        return {
            value1: false,
            typeArray: [
                {
                    typecode:12,
                    typename: "sina"
                },
                {
                    typecode:13,
                    typename: "weibo"
                },
                {
                    typecode:14,
                    typename: "baidu"
                },
                {
                    typecode:15,
                    typename: "google"
                }
            ],
            data2: [
                {
                    typecode: 12,
                    date: "2018-10-01"
                },
                {
                    typecode: 13,
                    date: "2018-10-02"
                },
                {
                    typecode: 14,
                    date: "2018-10-03"
                },
                {
                    typecode: 15,
                    date: "2018-10-04"
                }
            ],
            header2: [
                {
                    title: "任务状态",
                    minWidth: 200,
                    width: 300,
                    render: (h, parmas) => {
                        let _self = this
                        // console.log(parmas)
                        return h('div',[
                            h('Select',{
                                props:{
                                    value: this.data2[parmas.index].typecode,
                                    transfer: false
                                },
                                on: {
                                    "on-change": function(event){
                                        _self.data2[parmas.index].typecode = event
                                        //  这句好像起不了什么作用
                                        // Object.assign(parmas,{value: event})
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            },  _self.typeArray.map(item => [
                                h('Option',{
                                    props:{
                                        value: item.typecode,
                                        label: item.typename,
                                    }
                                })
                            ]))
                        ])
                    }
                },
                {
                    title: "时间",
                    minWidth: 200,
                    width: 300,
                    render: (h, parmas) => {
                        let _self = this
                        // console.log(parmas)
                        return h('div',[
                            h('DatePicker',{
                                props:{
                                    value: this.data2[parmas.index].date,
                                    type: "date",
                                    transfer: false
                                },
                                on: {
                                    "on-change": function(event){
                                        console.log(event)
                                        _self.data2[parmas.index].date = event
                                        // Object.assign(parmas,{value: event})
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                }
            ],
        }
    },
    methods:{
        refresh(){},
        infinite(){}
    },
    created() {
        let _self = this
    },
}
</script>
