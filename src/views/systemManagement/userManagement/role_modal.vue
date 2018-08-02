<template>
    <div>
        <Modal
            title="选择用户角色"
            v-model="open_role_modal"
            width="534"
        >
                <Table
                    border
                    height="600"
                    :columns="roleHeader"
                    :data="roleData"
                    highlight-row
                    :loading="table_loading"
                    size="small"
                    @on-selection-change="selection_change"
                >
                </Table>
            <div slot="footer">
                <Button type="primary" @click="changeRole">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            open_role_modal:false,
            table_loading:false,
            roleHeader:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title:'ID',
                    width: 120,
                    align: 'center',
                    key: "ID"
                },
                {
                    title:'角色',
                    width: 150,
                    align: 'center',
                    key: "rolename"
                },
                {
                    title:'角色编码',
                    width: 150,
                    align: 'center',
                    key: "rolecode"
                }
            ],
            roleData:[],
            current_select:[],
            oldRoleIDs:[]
        }
    },
    methods:{
        //  选中变更
        selection_change(e){
            this.current_select = e
            // console.log(this.current_select)
        },
        //  变更角色
        changeRole(){
            let _self = this
            // console.log(_self.current_select)
            this.$bus.emit("CREATE_USER_ROLE_DATA",_self.current_select)
            _self.open_role_modal = false
        },

        //  获取角色data
        getRoleData(){
            let _self = this
            _self.table_loading = true
            let url = `api/user/role/list`
            let config = {
                params: {
                    page: 1,
                    pageSize: 1000,
                }
            }

            function success(res){
                //  编辑的时候需要自行push,查看原始数据是否勾选
                _self.roleData = []
                let temp = res.data.data.rows
                for(let i = 0; i<temp.length;i++){
                    let role_temp = {}
                    role_temp.ID = temp[i].ID
                    role_temp.rolecode = temp[i].rolecode
                    role_temp.rolename = temp[i].rolename

                    let flag = 0
                    for(let j = 0; j<_self.oldRoleIDs.length;j++){
                        // console.log(_self.oldRoleIDs[j])
                        if(_self.oldRoleIDs[j] == role_temp.ID){
                            flag = 1
                            break
                        }
                    }

                    if(flag){
                        role_temp._checked = true
                    }else{
                        role_temp._checked = false
                    }
                    _self.roleData.push(role_temp)
                }
                _self.table_loading = false
            }
            
            this.$Get(url, config, success)
        }
    },
    created(){
        // this.getRoleData()
        let _self = this
        this.$bus.on('OPEN_ROLE_TABLE',(e)=>{
            if(e){
                _self.oldRoleIDs = e.split(",")
                // console.log(_self.oldRoleIDs)
            }
            _self.open_role_modal = true
            _self.getRoleData()
        })
        
    }
}
</script>

