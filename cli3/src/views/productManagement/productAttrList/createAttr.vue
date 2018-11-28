<!--
    创建一级属性值
-->
<template>
    <div>
        <Modal
            title="创建属性"
            width="500"
            v-model="openProductAttr"
            @on-cancel="close"
        >
            <Form ref="formInline" :model="formInline" :label-width="80">
                <Row>
                    <Col span="24">
                        <FormItem prop="name" label="属性名：">
                            <Input type="text" v-model="formInline.name">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem prop="typeId" label="产品类型:">
                        <Input type="typeId" v-model="formInline.typeId">
                        </Input>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create_attr">创建</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openProductAttr: true,
            formInline: {
                name: "",
                typeId: ""
            }
        }
    },
    methods: {
        close(){
            this.$emit("close", true)
        },
        create_attr(){

        }
    }
}
</script>
