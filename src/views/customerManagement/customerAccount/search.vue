<template>
    <div>
        <Collapse v-model="search_model">
            <Panel name="1" >
                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                筛选
                <div slot="content" @keydown.enter="search">
                    <Form ref="form" :model="form" :label-width="120" style="margin-top: 15px">
                        <Row :gutter="16" type="flex">
                            <Col span="8" v-for="(item, index) in data" :key="index">
                                <FormItem :label="item.label" :prop="item.key" v-if="item.type=='input'">
                                    <Input v-model="form[item.key]" size="small" style="width:100%"></Input>
                                </FormItem>
                                <FormItem :label="item.label" :prop="item.key" v-else-if="item.type=='select'">
                                    <Select transfer v-model="form[item.key]" size="small" @on-change="search" >
                                        <Option v-for="(item2, index) in item.data" :value="item2.typecode" :key="index">{{ item2.typename }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem :label="item.label" :prop="item.key" v-else-if="item.type=='datePicker'">
                                    <DatePicker type="daterange"  transfer v-model="form[item.key]" placement="bottom-end" size="small" style="width:100%" @on-change="date_change($event, item.key)"></DatePicker>
                                </FormItem>
                                <FormItem  v-else>
                                </FormItem>
                            </Col>
                            <Col span="24">
                                <center>
                                    <Button type="primary" @click="search">搜索</Button>
                                    <Button type="ghost" @click="handle_reset" style="margin-left: 8px">重置</Button>
                                </center>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>

<script>
export default {
    name: "searchModel",
    props: {
        data:{
            type: [Array],
            default: ()=>{
                return [
                    {
                        label: "客户名称",
                        key: "name",
                        type: "input"
                    },
                    {
                        label: "客户类型",
                        key: "type",
                        type: "select",
                        data: [
                            {
                                typename: "123",
                                typecode: "1"
                            },
                            {
                                typename: "1234",
                                typecode: "2"
                            },
                            {
                                typename: "123456",
                                typecode: "3"
                            },
                            {
                                typename: "12344444",
                                typecode: "4"
                            }
                        ]
                    },
                    {
                        label: "创建时间",
                        key: "createdate",
                        type: "datePicker"
                    },
                    {
                        label: "创建时间",
                        key: "createdate",
                        type: "datePicker"
                    },
                    {
                        label: "创建时间",
                        key: "createdate",
                        type: "datePicker"
                    }
                ]
            }
        },
        // formData: {
        //     type: [String, Object],
        //     default: ()=>{
        //         return {
        //             name:"",
        //             type: ""
        //         }
        //     }
        // },
    },
    data(){
        return {
            form: {},
            search_model: false
        }
    },
    methods: {
        search(){
            this.$emit("search", this.form)
        },
        handle_reset(){
            this.$refs["form"].resetFields();
            this.$emit("search", this.form)
        },
        date_change(date, key){
            // console.log(date)
            // console.log(key)
            this.form[key] = date
        }
    },
    created(){
        let _self = this
        let data = {}
        for(let i = 0; i<this.data.length;i++){
            let temp = {}
            if(_self.data[i].key=="datePicker"){
                temp[_self.data[i].key] = []
            }else{
                temp[_self.data[i].key] = ""
            }
            Object.assign(data, temp)
        }
        // this.form = this.formData
        this.form = data
    }
}
</script>
