<template>
    <Modal
            v-model="openDetail"
            :title="title"
            width="450"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Row>
            <Form ref="detail" :model="detail" :label-width="100" :rules="detailRule">
                <Row>
                    <Col>
                        <FormItem label="活动内容：" prop="area">
                            <Input  size="small"  :readonly="readonly"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="活动时间：" prop="area">
                            <DatePicker type="datetime" :readonly="readonly"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="数量：" prop="price">
                            <Input  size="small" type="number" :readonly="readonly"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="范围：" prop="price">
                            <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
                            <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
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
    </Modal>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                count: [0, 1, 2],
                title:"",
                loading:false,
                openDetail:false,
                readonly:false,
                showSave:false,
                showEdit:false,
            }
        },
        methods:{
            handleAdd () {
                if (this.count.length) {
                    this.count.push(this.count[this.count.length - 1] + 1);
                } else {
                    this.count.push(0);
                }
            },
            handleClose2 (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
            }
        },
        created() {
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
                this.readonly = true
            })
            this.$bus.off("EDIT_SETTING_INFO",true)
            this.$bus.on("EDIT_SETTING_INFO",e=>{
                this.openDetail = true
                this.showSave = false
                this.showEdit = true
                this.title = "修改"
                this.readonly = false
            })
        }
    }
</script>

<style>

</style>