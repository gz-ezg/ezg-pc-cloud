<template>
    <div>
        <Modal
            title="选择用户角色"
            v-model="open_role_modal"
            width="530"
        >
            <div style="height:400px;overflow-y:scroll">
                <Table
                    :columns="roleHeader"
                    :data="roleData"
                    highlight-row
                    :loading="table_loading"
                    size="small"
                >
                </Table>
            </div>
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
                    title:'角色编码',
                    width: 150,
                    align: 'center',
                    key: "rolecode"
                },
                {
                    title:'角色',
                    width: 150,
                    align: 'center',
                    key: "rolename"
                }
            ],
            roleData:[
                
            ]
        }
    },
    methods:{
        //  变更角色
        changeRole(){

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
                let temp = res.data.data.rows
                for(let i = 0; i<temp.length;i++){
                    let role_temp = {}
                    // if(1){}else{}
                    role_temp._checked = false
                    role_temp.ID = temp[i].ID
                    role_temp.rolecode = temp[i].rolecode
                    role_temp.rolename = temp[i].rolename
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
            console.log(e)
            _self.open_role_modal = true
            _self.getRoleData()
        })
        
    }
}
</script>

