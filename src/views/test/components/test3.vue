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
         <Button @click="show" type="primary">show</Button>
        <!--<Drawer title="Basic Drawer" :closable="false" v-model="value1">
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
                    date: "2018-10-01",
                    text: 100,
                    num: 1,
                    total: 100
                },
                {
                    typecode: 13,
                    date: "2018-10-02",
                    text: 50,
                    num: 2,
                    total: 100
                },
                {
                    typecode: 14,
                    date: "2018-10-03",
                    text: 20,
                    num: 5,
                    total: 100
                },
                {
                    typecode: 15,
                    date: "2018-10-04",
                    text: 10,
                    num: 10,
                    total: 100
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
                                    transfer: false,
                                    size: "small"
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
                                    transfer: false,
                                    size: "small"
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
                },
                {
                    title: "输入框测试",
                    minWidth: 200,
                    width: 300,
                    render: (h, parmas) => {
                        let _self = this
                        // console.log(parmas)
                        // return h('div',[
                        //     h('Input',{
                        //         // domProps: {
                        //         //     value: this.data2[parmas.index].text,
                        //         // },
                        //         props:{
                        //             value: this.data2[parmas.index].text,
                        //             type: "textarea",
                        //             autosize: true
                        //         },
                        //         on: {
                        //             "input": function(event){
                        //                 console.log(event)
                        //                 _self.data2[parmas.index].text = event.target.value
                        //                 // _self.$emit('input', event.target.value)
                        //                 // Object.assign(parmas,{value: event})
                        //             }
                        //         },
                        //         style: {
                        //             width: "100%"
                        //         }
                        //     })
                        // ])
                        return h('div',[
                            h('Input',{
                                domProps: {
                                    // value: this.data2[parmas.index].text,
                                    // type: "textarea",
                                    // autosize: true
                                },
                                props:{
                                    value: this.data2[parmas.index].text,
                                    autosize: true,
                                    type: "textarea",
                                    size: "small"
                                },
                                on: {
                                    "on-blur": function(event){
                                        console.log(event)
                                        _self.data2[parmas.index].text = event.target.value
                                        // _self.data2[parmas.index].text = event.target.value
                                        // Object.assign(_self.data2[parmas.index], {text: event.target.value})
                                        // Object.assign({text: event}, _self.data2[parmas.index])
                                    },
                                    "on-enter":function(event){
                                        console.log(event)
                                        _self.data2[parmas.index].text = event.target.value
                                    //     // _self.data2[parmas.index].text = event.target.value
                                    //     // Object.assign(_self.data2[parmas.index], {text: event.target.value})
                                    //     // Object.assign({text: event}, _self.data2[parmas.index])
                                    },
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "数量",
                    minWidth: 200,
                    width: 300,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.data2[parmas.index].num,
                                    autosize: true,
                                    type: "text",
                                    size: "small"
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        console.log(event)
                                        _self.data2[parmas.index].num = event.target.value
                                        _self.data2[parmas.index].total = _self.data2[parmas.index].num * _self.data2[parmas.index].text
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        console.log("enter-start")
                                        console.log(event)
                                        console.log("enter-end")
                                        _self.data2[parmas.index].num = event.target.value
                                        _self.data2[parmas.index].total = _self.data2[parmas.index].num * _self.data2[parmas.index].text
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "总价",
                    minWidth: 200,
                    width: 300,
                    key: "total"
                },
            ],
        }
    },
    methods:{
        refresh(){},
        infinite(){},
        show(){
            console.log(this.data2)
        }
    },
    created() {
        let _self = this
    }
}
</script>
