<template>
    <div>
        <Modal
            title="删除用户"
            v-model="delete_user"
            width="300"
        >
            <Row :gutter="20">
                <center>
                    <Icon type="alert" style="color:red;font-size:80px"></Icon>
                </center>
            </Row>
            <Row :gutter="20"><h3><center>当前选择用户:<h2 style="margin-top:10px;color:red">{{username}}</h2></center></h3></Row>
            <div slot="footer">
                <!-- 用户状态选择哪个 -->
                <Button type="warning" @click="deleteUser" long :loading="loading">删除用户</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            delete_user: false,
            username:"",
            userID:"",
            userstatus:""
        }
    },
    methods:{
        deleteUser(){
            let _self = this
            _self.loading = true
            let url = `api/user/deleteUserByUsreId`
            config = {
                id: _self.userID,
                flag: 1
            }

            function success(res){
                _self.loading = false
                _self.delete_user = false
                _self.$bus.emit('UPDATE_USER_TABLE', true)
            }

            function fail(err){
                _self.loading = false
                // _self.$bus.emit('UPDATE_USER_TABLE', true)
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        this.$bus.on('DELETE_USER', (e) => {
            _self.delete_user = true
            _self.username = e.realname
            _self.userID = e.id
            _self.userstatus = e.status
        })
    }
}
</script>
