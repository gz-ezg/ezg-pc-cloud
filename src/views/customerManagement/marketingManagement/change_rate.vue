<!--
    提成设置
    暂未启用
    需要字段
-->
<template>
    <Modal
        title="提成设置"
        width="200"
        v-model="show_change_rate"
    >
        <Row :gutter="10">
            <Col span="10"><span>客户名称：</span></Col>
            <Col span="14"><span>{{NAME}}</span></Col>
        </Row>
        <Row :gutter="10">
            <Col span="10"><span>提成设置：</span></Col>
            <Col span="14">
                <Select v-model="typecode">
                    <Option v-for="item in typeGropus" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                </Select>
            </Col>
        </Row>
        <div slot="footer">
            <Button type="primary" size="small" @click="submit" :loading="sumbit_loading">设置</Button>
        </div>
    </Modal>    
</template>

<script>
export default {
    data(){
        return{
            sumbit_loading:false,
            show_change_rate:false,
            typecode:"",
            typeGropus:[
                {
                    id:123,
                    typecode:123,
                    typename:123
                },
                {
                    id:123,
                    typecode:123,
                    typename:123
                }
            ],
            NAME:"",
            ID:""
        }
    },
    method:{
        submit()
    },
    created(){
        let _self = this
        this.$bus.on('customer_change_rate',(e)=>{
            //  接收的参数，客户名称，客户id，提成类型
            _self.NAME = e.NAME
            _self.ID = e.ID
            _self.typecode = e.typecode
        })
    }
}
</script>

