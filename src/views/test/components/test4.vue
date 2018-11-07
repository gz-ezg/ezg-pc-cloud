<!--
    可以使用在菜单管理之中
-->

<template>
    <div>
        <tree-table :data="data" :columns="header"></tree-table>
    </div>
</template>
<script>
import TreeTable from 'iview/src/components/table/table'
import treeToArray from './TreeTable/eval'

export default {
    components: { TreeTable },
    data(){
        return {
            header:[
                {
                    title: "1",
                    key: "event"
                },
                {
                    title: "2",
                    key: "timeLine"
                },
                {
                    title: "3",
                    key: "comment"
                },
                {
                    title: "4",
                    key: "id"
                }
            ],
            data: [
                {
                    id: 0,
                    event: '事件1',
                    timeLine: 50,
                    comment: '无',
                    level:0,
                    treeOpen: false,
                    parent:"",
                    children: [
                        {
                            id: 12,
                            event: '事件1',
                            timeLine: 100,
                            comment: '无',
                            level: 1,
                            parent: 0,
                            show: true,
                            treeOpen: false,
                            children: [
                                {
                                    id: 22,
                                    event: '事件1',
                                    timeLine: 100,
                                    comment: '无',
                                    level: 2,
                                    parent: 0,
                                    show: false,
                                    treeOpen: false,
                                    children: []
                                },
                                {
                                    id: 23,
                                    event: '事件1',
                                    timeLine: 100,
                                    comment: '无',
                                    level: 2,
                                    parent: 0,
                                    show: false,
                                    treeOpen: false,
                                    children: []
                                },
                            ]
                        },
                        {
                            id: 13,
                            event: '事件1',
                            timeLine: 100,
                            comment: '无',
                            level: 1,
                            parent: 0,
                            show: false,
                            treeOpen: false,
                            children: []
                        },
                    ]
                },
                {
                    id: 2,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    level: 1,
                    parent: 0
                },
                {
                    id: 3,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    level: 0,
                },
                {
                    id: 4,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    level: 1,
                },
                {
                    id: 5,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    level: 2,
                },
                {
                    id: 6,
                    event: '事件1',
                    timeLine: 100,
                    comment: '无',
                    level: 0,
                }
            ]
        }
    },
    computed: {
        // 格式化数据源
        // formatData: function() {
        // let tmp
        // if (!Array.isArray(this.data)) {
        //     tmp = [this.data]
        // } else {
        //     tmp = this.data
        // }
        // const func = this.evalFunc || treeToArray
        // const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        // return func.apply(null, args)
        // }
    },
    methods:{

    },
    created(){
        // console.log(this.formatData)
    }
}
</script>
