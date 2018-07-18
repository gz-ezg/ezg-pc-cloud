<template>
    <div>
        <Modal
            title="修改密码"
            width=400
            v-model="open_update_password"
        >
            <Form :label-width="100">
                <Row>
                    <Col span="1" style="visibility:hidden"></Col>                            
                    <Col span="20">
                        <FormItem label="用户名称：">
                            <Input v-model="user_name"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="1" style="visibility:hidden"></Col>                            
                    <Col span="10">
                        <FormItem label="用户密码：">
                            <Input v-model="user_password"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <div slot="footer">
                <Button type="ghost" @click="update_password">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            open_update_password: false,
            user_id: "",
            user_name: "",
            user_password: "",
            button_loading: false,
        }
    },
    methods:{
        // 修改用户密码
        update_password(){
            let _self = this
            _self.button_loading = true
            let url = `api/user/updatePasswordByUserId`

            let config = {
                id: _self.user_id,
                password: _self.password
            }

            function success(res){
                _self.button_loading = false
                _self.open_update_password = false
            }
            
            function fail(err){
                _self.button_loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        _self.$bus.on("UPDATE_USER_PASSWORD",(e)=>{
            console.log(e)
        })
    }
}
</script>

