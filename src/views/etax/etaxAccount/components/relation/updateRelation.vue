<template>
    <div>
        <Modal
            title="修改关联关系"
            width="500"
            v-model="openUpdateRelation"
            @on-cancel="close"
        >
            <Form ref="relationData" :rules="ruleValidate" :model="relationData" :label-width="150" label-position="right">
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="税务系统企业名称：" prop="qyname">
                            <Input size="small" v-model="relationData.qyname" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="系统对应企业名称：" prop="companyid">
                            <Select v-model="relationData.companyid" placeholder="输入公司名称搜索"
                                filterable
                                remote
                                :remote-method="get_company_list"
                                :loading="companyLoading"
                                style="width:200px"
                                size="small"
                            >
                                <Option v-for="item in companyList" :value="item.id" :key="item.id">{{item.companyname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="会计名称：" prop="kj">
                            <Input size="small" v-model="relationData.kj"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="valid" :loading="loading">修改</Button>
                <!-- <Button type="ghost" @click="close" style="margin-left: 8px">关闭</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        relationData: {
            type: [Object, String],
            default: {
                companyid: "",
                id: "",
                qyname: "",
                companyname: "",
                kj: ""
            }
        }
    },
    data(){
        return {
            companyList: [],
            companyLoading: false,
            openUpdateRelation: true,
            ruleValidate:{
            },
            loading: false
        }
    },
    methods: {
        valid(){
            let _self = this
            this.$refs["relationData"].validate((valid) => {
                if(valid){
                    this.create_account()
                }else{
                    this.loading = false
                }
            })
        },
        create_account(){
            let _self = this
            let url = `api/customer/company/gdetax/updateEtaxQyAndCompany`
            
            _self.loading = true
            let config = {
                id: _self.relationData.id,
                companyId: _self.relationData.companyid,
                kj: _self.relationData.kj
            }

            function success(res){
                _self.loading = false
                _self.close()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        close(){
            this.$emit("close")
        },
        get_company_list(query){
            let _self = this
            let url = 'api/customer/company/list?page=1&pageSize=10&companyname=' + query

            let config = {}

            function success(res){
                _self.companyList = res.data.data.rows
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_company_list(this.relationData.companyname)
    }
}
</script>
