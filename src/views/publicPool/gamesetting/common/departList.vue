<template>
    <Modal
            v-model="openDepartList"
            title="选择部门"
            width="450"
            :mask-closable="false"
            :transfer="false"
    >
        <Row>
            <Form ref="detail" :model="departList" :label-width="100">
                <Row>
                    <Col>
                        <FormItem label="部门：" prop="department">
                            <CheckboxGroup v-model="idList">
                                <Checkbox v-for="(item,index) in departList" :key="index" :label="item" style="margin-left: 20px">
                                    <span>{{item.departname}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="give">确定</Button>
            <Button @click="openDepartList = false">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "departList",
        props:['departList'],
        data(){
            return{
                openDepartList:false,
                idList:[],
            }
        },
        methods:{
            give(){
                console.log(this.idList)
                this.$bus.emit("GIVE_LIST",this.idList)
                this.openDepartList = false
            }
        },
        created() {
            this.$bus.off("OPEN_DEPART_LIST",true)
            this.$bus.on("OPEN_DEPART_LIST",e=>{
                this.openDepartList = true
                this.idList = e
            })
        }
    }
</script>

<style>

</style>