<style >
    td.ivu-table-expanded-cell{
        padding: 0!important;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Table :columns="columns10" :data="row" :show-header="false" no-data-text="没有子菜单" size="small"></Table>
        </Row>
    </div>
</template>
<script>
    export default {
        name: "treeTableRow",
        props: {
            row: Array,
            depth: Number
        },
        data(){
            return {
                columns10: [
                    // {
                    //     type: 'expand',
                    //     width: 100 - 30 * this.depth,
                    //     render: (h, params) => {
                    //         return h( "tree-table-row", {
                    //             style:{
                    //                 paddingLeft: (this.depth + 1) * 30 + 'px' 
                    //             },
                    //             props: {
                    //                 row: params.row.children,
                    //                 depth: this.depth + 1
                    //             },
                    //         })
                    //     }
                    // },
                    // {
                        // title: '',
                        // width: 100 - 30 * this.depth,
                        // render: (h, params) => {
                        //     return h( "tree-table-row", {
                        //         style:{
                        //             paddingLeft: (this.depth + 1) * 30 + 'px' 
                        //         },
                        //         props: {
                        //             row: params.row.children,
                        //             depth: this.depth + 1
                        //         },
                        //     })
                        // }
                    // },
                    {
                        title: '菜单名称',
                        key: 'text',
                        minWidth: 150
                    },
                    {
                        title: '菜单编码',
                        key: 'attributes.interface_code',
                        minWidth: 180,
                        render: (h, params) => {
                            // console.log(params.row)
                            return h('div',{
                            }, params.row.attributes.interface_code)
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 300,
                        render: (h, params) => {
                            return h('div',[
                                h('Button',{
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: "10px"
                                    }
                                }, "编辑菜单"),
                                h('Button',{
                                    props: {
                                        type: 'info',
                                        size: 'small',
                                        disabled: false
                                    },
                                    style: {
                                        marginRight: "10px"
                                    }
                                }, "新增子菜单"),
                                h('Button',{
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                }, "删除菜单")
                            ])
                        }
                    }
                ]
            }
        }
    };
</script>