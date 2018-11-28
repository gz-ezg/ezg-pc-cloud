<template>
    <div>
        <Table :columns="header" :data="roleData" @on-current-change="save_current" highlight-row></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: left;">
            <Page :total="total_Role_Num" :current="1" :page-size="pageSize" @on-page-size-change="pageSizeChange" @on-change="changePage" show-sizer show-elevator></Page>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageSize:'',
            page:'',
            header:[
                {
                    title:'序号',
                    type:'index',
                    align:'center',
                    width:60
                },
                {
                    title:'角色编码',
                    key:'RoleID',
                    width:100
                },
                {
                    title:'角色名称',
                    key:'RoleName',
                    width:200
                },
                {
                    title:'操作',
                    key:'action',
                    width:200,
                    align:'center',
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'text',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.roleDelete(params)
                                    }
                                }
                            },'删除'),
                            h('Button',{
                                props:{
                                    type:'text',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.role(params)
                                    }
                                }
                            },'用户'),
                            h('Button',{
                                props:{
                                    type:'text',
                                    size:'small'
                                },
                                on:{
                                    click:()=>{
                                        this.setting(params)
                                    }
                                }
                            },'权限设置')
                        ])
                    }

                }
            ],
            roleData:[
                {
                    RoleID:'31313',
                    RoleName:'313131',
                    action:'12313'
                }
            ]
        }
    },
    methods:{
        //  删除
        roleDelete(){},
        //  用户
        role(){},
        //  权限设置
        setting(){},
        //  保存当前选中行，考虑向上，保存至主界面，这样可以通过props调用在相关界面
        save_current(e){
            console.log(e)
            var _that = this
            this.$emit('current_select',e)
        }
    }
}
</script>
