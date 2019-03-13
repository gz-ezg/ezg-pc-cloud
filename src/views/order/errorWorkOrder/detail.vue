<template>
    <div>
        <Modal
            title="查看异常工单"
            :value="true"
            width="800"
            @on-cancel="close()"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="公司名称：" prop="companyname">
                    <Input v-model="formValidate.companyname" placeholder="" readonly></Input>
                </FormItem>
                <FormItem label="异常类型：" prop="unusualType">
                    <RadioGroup v-model="formValidate.unusualType" disabled>
                        <Radio v-for="(item,index) in unusualType" :label="item.typecode" :key=index>{{item.typename}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="产品内容：" prop="productContent">
                    <Input v-model="formValidate.productContent" placeholder="" :rows=5 type="textarea" readonly></Input>
                </FormItem>
                <FormItem label="备注：" prop="applyMemo">
                    <Input v-model="formValidate.applyMemo" placeholder="" :rows=5 type="textarea" readonly></Input>
                </FormItem>
            </Form>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
import { unusualWorkOrderDetailById } from './api.js'
export default {
    props: {
        unusualType: {
            type: [String, Array]
        },
        detail: {
            type: [String, Object]
        }
    },
    data(){
        return {
            formValidate: {},
        }
    },
    methods: {
        close(e){
            this.$emit("close", e)
        },
        async get_detail(id){
            let config = {
                params: {
                    applyId: id
                }
            }

            let data = await unusualWorkOrderDetailById(config)

            console.log(data)
            this.formValidate = data
        }
    }, 
    created(){
        // if(!this.detail.applyId){
        //     this.$Message.error("无效的ID")
        //     this.close()
        //     return false
        // }
        this.formValidate.companyname = this.detail.companyname
        this.formValidate.companyId = this.detail.company_id
        this.formValidate.unusualType = this.detail.unusual_type
        this.formValidate.productContent = this.detail.product_content
        this.formValidate.applyMemo = this.detail.apply_memo
        this.formValidate.applyId = this.detail.applyId
        // this.get_detail(this.detail.applyId)
    }
}
</script>
