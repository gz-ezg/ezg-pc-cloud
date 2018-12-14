<template>
    <div>
        <Modal
            title="编辑部门"
            width="500"
            v-model="openEditDepart"
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
                        <FormItem label="部门别名：" prop="aliasCode">
                            <Select v-model="formValidate.alias_code" size="small" style="width:100%">
                                <Option v-for="(item, index) in departAlias" :value="item.typecode" :key="index">{{item.typename}}</Option>
                            </Select>
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
                        <FormItem label="地址：" prop="address">
                            <Input size="small" v-model="formValidate.address"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="valid" :loading="loading">编辑</Button>
                <Button type="ghost" @click="close" style="margin-left: 8px">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        formValidate: {
            type: [Object, String],
            default: () =>{
                return {
                    ID: "",
                    departname: "",
                    description: "",
                    mobile: "",
                    address: "",
                    depart_order: "",
                    affiliation_area: "",
                    alias_code: ""
                }
            }
        },
        departAlias: {
            type: [String, Array]
        }
    },
    data(){
        return {
            openEditDepart: true,
            ruleValidate:{
                departname: [
                    { required: true, trigger: "change", message: "部门名称不能为空" }
                ],
                alias_code: [
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
                    this.update_depart()
                }else{
                    this.loading = false
                }
            })
        },
        update_depart(){
            let _self = this
            let url = `api/system/depart/update`
            
            _self.loading = true
            let config = {
                id: _self.formValidate.ID,
                departname: _self.formValidate.departname,
                aliasCode: _self.formValidate.alias_code,
                description: _self.formValidate.description,
                mobile: _self.formValidate.mobile,
                description: _self.formValidate.description,
                affiliationArea: _self.formValidate.affiliation_area
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
