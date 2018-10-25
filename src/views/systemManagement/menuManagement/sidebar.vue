<template>
    <div>
        <Card>
            <span slot="extra" @click="close_sidebar">
                <Icon type="close"></Icon>
            </span>
            <ButtonGroup style="margin-bottom:10px">
                <Button type="primary" @click="create_button">菜单</Button>
            </ButtonGroup>
            <Table
                :columns="headers" 
                :data="data" 
                size="small"
            ></Table>
        </Card>
    </div>
</template>

<script>
export default {
    name: "menu_sidebar",
    props: {
        code: {

        }
    },
    data(){
        return {
            data: [],
            headers: [
                {
                    title: "按钮名称",
                    key: "operationname",
                    minWidth: 150
                },
                {
                    title: "按钮编码",
                    key: "operationcode",
                    minWidth: 200
                },
                {
                    title: "操作",
                    key: "action",
                    minWidth: 160,
                    render: (h, params) => {
                        return h("div",[
                            h("Button",{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.update_button(params.row)
                                    }
                                }
                            },"编辑"),
                            h("Button",{
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    // click: () => {
                                    //     this.del_button(params)
                                    // }
                                }
                            },"删除")
                        ])
                    }
                }
            ]
        }
    },
    methods: {
        get_button(e){
            let _self = this
            let url = `api/menu/getButtonList`

            let config = {
                params: {
                    menuId: e
                }
            }
            
            function success(res){
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        },
        //  创建按钮
        create_button(){
            let _self = this
        },
        //  修改按钮
        update_button(){
            let _self = this
        },
        //  关闭
        close_sidebar(){
            this.$emit("close-sidebar",true)
        }
    },
    created() {
        this.get_button(this.code)
    },
}
</script>

