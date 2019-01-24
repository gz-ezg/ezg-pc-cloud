<template>
    <div>
        <Modal
            title="编辑消息模板"
            :value="true"
            width="500"
            @on-cancel="close"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="模板名称" prop="msgtname">
                    <Input v-model="formValidate.msgtname" placeholder="输入模板名称"></Input>
                </FormItem>
                <FormItem label="模板编码" prop="msgtcode">
                    <Input v-model="formValidate.msgtcode" placeholder="输入模板编码"></Input>
                </FormItem>
                <FormItem label="模板类型" prop="templatetype">
                    <Select v-model="formValidate.templatetype" placeholder="选择模板类型">
                        <Option v-for="item in msgttype" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="使用状态" prop="issend">
                    <Select v-model="formValidate.issend" placeholder="选择使用状态">
                        <Option value="Y">启用</Option>
                        <Option value="N">暂停使用</Option>
                    </Select>
                </FormItem>
                <FormItem label="模板内容" prop="msgtdetail">
                    <Input v-model="formValidate.msgtdetail" placeholder="输入模板内容" type="textarea"></Input>
                </FormItem>
                <FormItem label="触发事件" prop="triggers">
                    <Input v-model="formValidate.triggers" placeholder="输入触发事件" type="textarea"></Input>
                </FormItem>
                <FormItem label="wechatcompanyappid" prop="wechatcompanyappid">
                    <Input v-model="formValidate.wechatcompanyappid" placeholder="输入wechatcompanyappid"></Input>
                </FormItem>
                <FormItem label="msgruleid" prop="msgruleid">
                    <Input v-model="formValidate.msgruleid" placeholder="输入msgruleid"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="update" :loading="loading">编辑</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { postUpdateMsgTemplate } from '../api/wechatTemplate'
export default {
    props: {
        msgttype: {
            type: [String, Array]
        },
        msg: {
            type: [String, Object]
        }
    },
    data(){
        return {
            formValidate: {
                
            },
            ruleValidate: [],
            loading: false
        }
    },
    methods: {
        update(){
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    this.submit()
                }
            })
        },
        async submit(){
            let {status, data} = await postUpdateMsgTemplate(this.formValidate)
            if(status){
                this.close(true)
            }
        },
        close(e){
            this.$emit("close", e)
        }
    },
    created(){
        this.formValidate = this.msg
    }
}
</script>
