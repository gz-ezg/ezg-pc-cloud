<template>
    <div>
        <Modal
            title="锁定/解锁用户"
            v-model="lock_user"
            width="300"
        >
            <Row :gutter="20"><h3><center>当前选择用户:<h2 style="margin-top:10px;color:red">{{username}}</h2></center></h3></Row>
            <div slot="footer">
                <!-- 用户状态选择哪个 -->
                <Button type="warning" @click="unlockUser" long v-if="status =='正常' " :loading="loading">锁定用户</Button>
                <Button type="primary" @click="lockUser" long v-if="status != '正常'" :loading="loading">解锁用户</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loading:false,
            lock_user: false,
            username:"",
            userID:"",
            status:""
        }
    },
    methods:{
        lockUser(){
            let _self = this
            _self.loading = true
            let url = `api/user/lockOrUnlockUser`
            let config = {
                id: _self.userID,
                lockvalue: 1
            }

            function success(res){
                _self.loading = false
                _self.lock_user = false
                _self.$bus.emit('UPDATE_USER_TABLE', true)
            }

            function fail(err){
                _self.loading = false
                // _self.$bus.emit('UPDATE_USER_TABLE', true)
            }

            this.$Post(url, config, success, fail)
        },
        unlockUser(){
            let _self = this
            _self.loading = true
            let url = `api/user/lockOrUnlockUser`
            let config = {
                id: _self.userID,
                lockvalue: 0
            }

            function success(res){
                _self.loading = false
                _self.lock_user = false
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
        this.$bus.on('LOCK_USER', (e) => {
            _self.lock_user = true
            _self.username = e.realname
            _self.userID = e.id
            _self.status = e.status
            console.log(e.status)

        })
    }
}
</script>
