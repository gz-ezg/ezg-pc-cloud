<template>
    <div>
        <Modal
            title="新增异常工单"
            :value="true"
            width="800"
            @on-cancel="close()"
        >
            <!-- <Row :gutter="20">
                <Col span="24"> -->
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                        <FormItem label="公司名称：" prop="companyname">
                            <Input v-model="formValidate.companyname" placeholder="" @on-focus="companyStatus = true"></Input>
                        </FormItem>
                        <FormItem label="异常类型：" prop="unusualType">
                            <RadioGroup v-model="formValidate.unusualType">
                                <Radio v-for="(item,index) in unusualType" :label="item.typecode" :key=index>{{item.typename}}</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="产品内容：" prop="productContent">
                            <Input v-model="formValidate.productContent" placeholder="" :rows=5 type="textarea"></Input>
                        </FormItem>
                        <FormItem label="备注：" prop="applyMemo">
                            <Input v-model="formValidate.applyMemo" placeholder="" :rows=5 type="textarea"></Input>
                        </FormItem>
                    </Form>
                <!-- </Col>
            </Row> -->
            <div slot="footer">
                <Button type="primary" @click="create" :loading="loading">新增</Button>
                <Button type="ghost" @click="close()">关闭</Button>
            </div>
        </Modal>
        <company-list @company-change="company_change" @close="close_company" v-if="companyStatus"></company-list>
    </div>
</template>

<script>
import { unusualWorkOrderAdd } from './api.js'
import companyList from './companyList'
export default {
    components: {
        companyList
    },
    props: {
        unusualType: {
            type: [String, Array]
        }
    },
    data(){
        return {
            companyStatus: false,
            formValidate: {
            },
            ruleValidate: {
            },
            loading: false,
        }
    },
    methods: {
        create(){
            this.loading = true
            this.$refs["formValidate"].validate((valid) => {
                if (valid) {
                    this.submit()
                }else{
                    this.loading = false
                }
            })
        },
        async submit(){
            let { status, data } = await unusualWorkOrderAdd(this.formValidate)
            if(status){
                this.close(true)
            }
            this.loading = false
        },
        close(e){
            this.$emit("close", e)
        },
        company_change(e){
            this.companyStatus = false
            this.formValidate.companyId = e.id
            this.formValidate.companyname = e.companyname
        },
        close_company(){
            this.companyStatus = false
        }
    },
    created(){

    }
}
</script>
