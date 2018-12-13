<template>
    <div>
        <Modal
            title="新增部门"
            width="500"
            v-model="openCreateDepart"
            @on-cancel="close"
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120" label-position="right">
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="部门名称：" prop="departname">
                            <Input size="small" v-model="formValidate.departname"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="部门编码：" prop="aliasCode">
                            <Input size="small" v-model="formValidate.aliasCode"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="上级部门：">
                            <Input size="small" v-model="parentdepartName" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="部门描述：" prop="description">
                            <Input size="small" v-model="formValidate.description" type="textarea"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="联系方式：" prop="mobile">
                            <Input size="small" v-model="formValidate.mobile"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="传真：" prop="fax">
                            <Input size="small" v-model="formValidate.fax"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="地址：" prop="address">
                            <Input size="small" v-model="formValidate.address"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="valid" :loading="loading">新增</Button>
                <Button type="ghost" @click="close" style="margin-left: 8px">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        parentdepartid: {
            type: [Number, String],
            default: ""
        },
        parentdepartName: {
            type: [String],
            default: ""
        }
    },
    data(){
        return {
            openCreateDepart: true,
            formValidate: {
                departname: "",
                aliasCode: "",
                description: "",
                mobile: "",
                fax: "",
                address: "",
                departOrder: "",
                fromArea: "",
                affiliationArea: "",
            },
            ruleValidate:{
                departname: [
                    { required: true, trigger: "change", message: "部门名称不能为空" }
                ],
                aliasCode: [
                    { required: true, message: "部门编码不能为空", trigger: "change" }
                ]
            },
            loading: false
        }
    },
    methods: {
        valid(){
            let _self = this
            this.$refs["formValidate"].validate((valid) => {
                if(valid){
                    this.create_depart()
                }else{
                    this.loading = false
                }
            })
        },
        create_depart(){
            let _self = this
            let url = `api/system/depart/create`
            
            _self.loading = true
            let config = {
                parentdepartid: _self.parentdepartid,
                departname: _self.formValidate.departname,
                aliasCode: _self.formValidate.aliasCode,
                description: _self.formValidate.description,
                mobile: _self.formValidate.mobile,
                fax: _self.formValidate.description,
                description: _self.formValidate.address,
                departOrder: _self.formValidate.departOrder,
                fromArea: _self.formValidate.fromArea,
                affiliationArea: _self.formValidate.affiliationArea
            }

            function success(res){
                _self.loading = false
                _self.close(true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        close(e){
            this.$emit("close",e)
        }
    }
}
</script>
