<template>
    <div>
        <Modal
            v-model="updateRelation"
            title="修改联系人"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name" >
                    <Input v-model="formValidate.name" size="small" ></Input>
                </FormItem>
                <FormItem label="电话" prop="tel" >
                    <Input v-model="formValidate.tel" size="small" ></Input>
                </FormItem>
                <FormItem label="QQ" prop="qq" >
                    <Input v-model="formValidate.qq" size="small" ></Input>
                </FormItem>
                <FormItem label="微信" prop="wechat" >
                    <Input v-model="formValidate.wechat" size="small" ></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email" >
                    <Input v-model="formValidate.email" size="small" ></Input>
                </FormItem>
                <FormItem label="职位" prop="jobplace" >
                    <Select v-model="formValidate.jobplace" size="small">
                        <Option value="老板">老板</Option>
                        <Option value="高层">高层</Option>
                        <Option value="中层">中层</Option>
                        <Option value="基层">基层</Option>
                    </Select>
                </FormItem>
                <FormItem label="发送信息" prop="sendmsgflag" >
                    <Select transfer v-model="formValidate.sendmsgflag" size="small">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="memo" >
                    <Input v-model="formValidate.memo" type="textarea" size="small" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="loading">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import relationCommon from './common'

export default {
    mixins: [relationCommon],
    data(){
        return {
            updateRelation: false
        }
    },
    methods: {
        submit(){
            this.check_data(this.create)
        },
        create(){
            let _self = this
            _self.$ButtonCollect("marketingManagement_index_client_add");
            let url = `api/customer/updateCustomerRelation`

            let config = {
                name: _self.formValidate.name,
                tel: _self.formValidate.tel,
                qq: _self.formValidate.qq,
                wechat: _self.formValidate.wechat,
                email: _self.formValidate.email,
                jobplace: _self.formValidate.jobplace,
                sendmsgflag: _self.formValidate.sendmsgflag,
                memo: _self.formValidate.memo,
                id: _self.formValidate.id
            }

            function success(res){
                _self.loading = false
                _self.updateRelation = false
                _self.$emit("update", true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        this.$bus.on("UPDATE_CUSTOMER_RELATION", (e)=>{
            this.formValidate = e
            this.updateRelation = true
        })
    }
}
</script>

