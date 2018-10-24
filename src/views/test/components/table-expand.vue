<style >
    td.ivu-table-expanded-cell{
        padding: 0!important;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Table :columns="columns10" :data="row" :show-header="false" no-data-text="没有子菜单"></Table>
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
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ]
            }
        }
    };
</script>