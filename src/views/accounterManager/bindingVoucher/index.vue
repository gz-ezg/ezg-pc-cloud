<template>
<div>
    <!-- 切换菜单 -->
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="route">
        <MenuItem name="1">
            2017
        </MenuItem>
        <MenuItem name="2">
            2018
        </MenuItem>
        <MenuItem name="3">
         2019
        </MenuItem>
    </Menu>
<!-- 切换菜单结束 -->
<!-- 办理状态 -->
<!-- 表单 -->
<Table :columns="columns1" :data="data1"  size="small"></Table>
<!-- 表单结束 -->
</div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                 columns1: [
                    {
                        title: '序号',
                        key: 'serialNumber'
                    },
                    {
                        title: '企业名称',
                        key: 'enterpriseName'
                    },
                    {
                        title: '操作',
                        key: 'Operation'
                    }
                ],
                 data1: [
                    {
                       serialNumber:'1',
                       enterpriseName:'',
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
       methods: {
            route(name){
            console.log(name)
        }
       },
    }
</script>
