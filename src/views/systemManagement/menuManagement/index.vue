<!--
    可以使用在菜单管理之中
-->

<template>
    <div>
        <ButtonGroup style="margin-bottom:10px">
            <Button type="primary" @click="create_menu('', 0)">新增一级菜单</Button>
        </ButtonGroup>
        <Row>
            <Col :span="span">
                <Card>
                    <Table :columns="headers" :data="data" size="small"></Table>
                </Card>
            </Col>
            <Col :span="24-span" v-if="24-span">
                <side-bar :code="currentCode" @close-sidebar="span = 24"></side-bar>
            </Col>
        </Row>
        <create-menu></create-menu>
    </div>
</template>
<script>
    import createMenu from './createMenu.vue'
    import childTable from './childTable';
    import sideBar from './sidebar.vue'
    export default {
        name: "menuMangement_index",
        components: { 
            childTable,
            sideBar,
            createMenu
        },
        data () {
            return {
                currentCode: 0,
                span: 24,
                headers: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            if(params.row.children){
                                return h(childTable, {
                                    props: {
                                        row: params.row.children,
                                        depth: 1
                                    },
                                    style: {
                                        paddingLeft: "50px"
                                    },
                                    on: {
                                        "open-sidebar": (e)=>{
                                            this.span = "12"
                                            this.open_sidebar(e)
                                        }
                                    }
                                })
                            }else{
                                return h('center',{

                                },'暂无菜单')
                            }
                        }
                    },
                    {
                        title: '菜单名称',
                        key: 'text',
                        minWidth: 150
                    },
                    // {
                    //     title: '菜单编码',
                    //     key: 'attributes.interface_code',
                    //     minWidth: 180,
                    //     render: (h, params) => {
                    //         return h('div',{
                    //         }, params.row.attributes.interface_code)
                    //     }
                    // },
                    {
                        title: "操作",
                        key: "action",
                        width: 300,
                        render: (h, params) => {
                            let _self = this
                            return h('div',[
                                h('Button',{
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            //  编辑的逻辑
                                        }
                                    }
                                }, "编辑菜单"),
                                h('Button',{
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            //  新增子菜单
                                            _self.create_menu(params.row.id, 1)
                                        }
                                    }
                                }, "新增子菜单"),
                                h('Button',{
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.del_menu(params)
                                        }
                                    }
                                }, "删除菜单")
                            ])
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            get_menu(){
                let _self = this
                let url = `api/menu/getMenuTree`

                let config = {}

                function success(res){
                    _self.data = res.data.data
                    console.log(_self.data)
                }

                this.$Get(url, config, success)
            },
            create_menu( parentId, level ){
                let _self = this
                let url = `api/menu/createMenu`
                console.log( parentId, level)
                _self.$bus.emit("OPEN_CREATE_MENU",{
                    parentInterfaceId: parentId,
                    interfaceLevel: level
                })
            },
            del_menu(e){
                let _self = this
                // console.log(e)
                if(e.row.children){
                    _self.$Message.warning("该菜单下还有未删除的子菜单！")
                    return ;
                }

                let url = `api/menu/deleteMenu`

                let config = {
                    params: {
                        menuId: e.row.id
                    }
                }

                function success(res){
                    _self.$Message.success(res.data.msg)
                    _self.get_menu()
                }

                this.$Get(url, config, success)
            },
            open_sidebar(e){
                // console.log(e)
                this.currentCode = e.id
            }
        },
        created() {
            let _self = this
            this.get_menu()
            _self.$bus.off("UPDATE_MENU", true)
            _self.$bus.on("UPDATE_MENU", (e) => {
                _self.get_menu()
            })
        },
    }
</script>
