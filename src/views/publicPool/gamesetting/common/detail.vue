<template>
    <Modal
            v-model="openDetail"
            :title="title"
            width="450"
            :mask-closable="false"
    >
        <Row>
            <Form ref="detail" :model="detail" :label-width="100" :rules="detailRule">
                <Row>
                    <Col>
                        <FormItem label="活动内容：" prop="content">
                            <Input v-model="detail.content" size="small"  :readonly="readonly"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="活动时间：" prop="activity_time">
                            <DatePicker v-model="detail.activity_time" type="datetime" :readonly="readonly"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="数量：" prop="amount">
                            <Input v-model="detail.amount" size="small" type="number" :readonly="readonly"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="范围：" prop="count">
                            <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{ item.departname }}</Tag>
                            <Button icon="plus" type="dashed" size="small" @click="handleAdd">添加标签</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="save('detail')" :loading="loading" v-if="showSave">提交</Button>
            <Button type="primary" @click="edit('detail')" :loading="loading" v-if="showEdit">修改</Button>
            <Button @click="openDetail = false">关闭</Button>
        </div>
        <depart-list :departList="departList"></depart-list>
    </Modal>
</template>

<script>
    import departList from './departList'
    import {FULLDateFormat} from "../../../../libs/utils";
    import {deepCopy} from "../../../../libs/utils";

    export default {
        name: "detail",
        components:{departList},
        data(){
            return{
                count: [],
                title:"",
                loading:false,
                openDetail:false,
                readonly:false,
                showSave:false,
                showEdit:false,
                departList:[],
                detail:{
                    content:"",
                    activity_time:"",
                    amount:"",
                },
            }
        },
        methods:{
            handleAdd () {
                this.$bus.emit("OPEN_DEPART_LIST",this.count)
            },
            handleClose2 (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
            },
            save(){
                let _self = this
                if (!_self.detail.content || !_self.detail.activity_time || !_self.detail.amount || _self.count.length==0){
                    _self.$Message.warning("请将上述信息填写完整")
                } else{
                    _self.loading = true;
                    let url = `api/customer/highseasActivity/create`;
                    let config = {
                        content:_self.detail.content,
                        activityTime: FULLDateFormat(_self.detail.activity_time),
                        amount:_self.detail.amount,
                        orgIds:_self.count.map(item=>{
                            let a= []
                            a.push(item.ID)
                            return a
                        }).join(",")
                    }
                    function success(res){
                        _self.$bus.emit("UPDATE_INDEX",true)
                        _self.clear()
                        _self.openDetail = false
                        _self.loading = false
                    }

                    function fail(err){

                    }
                    this.$Post(url, config, success, fail)
                }
            },
            clear(){
                this.detail={
                    content:"",
                        activity_time:"",
                        amount:"",
                }
                this.count = []
            },
            get_depart_data(){
                let _self = this;
                let url = `api/system/depart/list`;
                let config = {
                    params: {
                        alias_code:"MARKET",
                        terminal_flag:1
                    }
                }

                function success(res){
                    _self.departList = res.data.data
                    _self.loading = false
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
        },
        created() {
            this.get_depart_data()
            this.$bus.off("ADD_SETTING_INFO",true)
            this.$bus.on("ADD_SETTING_INFO",e=>{
                this.openDetail = true
                this.showSave = true
                this.showEdit = false
                this.title = "新增"
                this.readonly = false
            })
            this.$bus.off("SHOW_SETTING_INFO",true)
            this.$bus.on("SHOW_SETTING_INFO",e=>{
                this.showSave = false
                this.showEdit = false
                this.openDetail = true
                this.title = "查看"
                this.detail = deepCopy(e)
                let a = this.detail.orgIds.split(",")
                let b = this.departList.reduce((newArr,v)=>{
                    console.log(newArr)
                    a.map(item=>{
                        if (item==v.ID) {
                            newArr.push(v)
                            return newArr
                        }
                    })
                    return newArr
                },[])
                console.log(b)
                this.count = b
                this.readonly = true
            })
            this.$bus.off("EDIT_SETTING_INFO",true)
            this.$bus.on("EDIT_SETTING_INFO",e=>{
                this.openDetail = true
                this.showSave = false
                this.showEdit = true
                this.title = "修改"
                this.detail = deepCopy(e)
                this.readonly = false
            })
            this.$bus.off("GIVE_LIST",true)
            this.$bus.on("GIVE_LIST",e=>{
                this.count = e
            })
        }
    }
</script>

<style>

</style>