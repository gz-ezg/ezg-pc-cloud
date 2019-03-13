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
                return []
                /**
                 * searchData: [
                        {
                            label: "订单号码：",
                            key: "ordercode",
                            type: "input"
                        },
                        {
                            label: "客户类型：",
                            key: "payDir",
                            type: "select",
                            data: []
                        },
                        {
                            label: "创建时间",
                            key: "createdate",
                            type: "datePicker"
                        }
                    ]
                    // 暂时只支持以上三种属性的筛选，其余筛选方式请自行搭建
                 */
            }
        },
    },
    data(){
        return {
            form: {},
            search_model: false
        }
    },
    methods: {
        search(){
            for(let x in this.form){
                if(Array.isArray(this.form[x])){
                    this.form["b" + x] = this.form[x][0]
                    this.form["e" + x] = this.form[x][1]
                }
            }
            this.$emit("search", this.form)
        },
        handle_reset(){
            this.$refs["form"].resetFields();
            for(let x in this.form){
                if(Array.isArray(this.form[x])){
                    this.form["b" + x] = this.form[x][0]
                    this.form["e" + x] = this.form[x][1]
                }
            }
            this.$emit("search", this.form)
        },
        date_change(date, key){
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
        this.form = data
    }
}
</script>
