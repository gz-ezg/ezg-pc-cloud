<style>
    /* @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css'; */
</style>
<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-crop" @click="add_menu">菜单录入</Button>
                    <Button type="primary" icon="ios-crop" @click="edit_menu">菜单编辑</Button>
                </ButtonGroup>
            </Row>
            <Menu></Menu>
                        <!-- <div id="system_function_functionList" class="easyui-layout" fit="true">
                            <table  style="width:100%;height:400px" id="functionList"></table>
                            
                            <div class="easyui-panel" style="padding:0px;border:0px" fit="true" border="false" id="operationDetailpanel">
                                <div data-options="region:'east'" style="width:180px"></div>
                            </div>-->
            <Row>
                <div id="system_function_functionList" class="easyui-layout" style="width:100%;height:550px;margin-top:20px">    
                    <div data-options="region:'center',title:'center title'" style="padding:5px;background:#eee;">
                        <table  style="width:100%;height:500px" id="functionList"></table>
                    </div>
                    <div data-options="region:'east',title:'East',split:true,collapsed:true" style="width:50%;">
                        
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    // import Utils from './util'
    // import datagrid from '../../../libs/easyUI/jquery.easyui.min'
    // import treegrid from '../../../libs/easyUI/jquery.easyui.min'
    // import Vue from 'vue'
    import Menu from './menu_add.vue'
    import Bus from '../../../components/bus'
    import DateRule from './data_rule.vue'

    var li_east = 0

    export default {
        components:{
            Menu,
            DateRule
        },
        data() {
            return{
                span_size:12
            }
        },
        methods: {
            getTreeTable() {
                let _self = this
                function doSuccess(re) {

                }
                this.GetData('/menu/getMenuList',doSuccess)
                $('#functionList').treegrid({
                    idField: 'id',
                    method: 'get',
                    treeField: 'text',
                    onBeforeLoad: function (row, param) {
                        if (!row) {
                            delete param.id;
                        }
                    },
                    url: './testData.json',
                    pageSize: 10,
                    pagination: false,
                    pageList: [10, 20, 30],
                    sortOrder: 'asc',
                    rownumbers: true,
                    fitColumns: true,
                    singleSelect: true,
                    columns: [[{field: 'id', title: '编号', exportExcel: true, hidden: true}, {
                        field: 'text',
                        title: '菜单名称',
                        width: 40,
                        exportExcel: true
                    }, {
                        field: 'functionType',
                        title: '菜单类型',
                        width: 20,
                        exportExcel: true,
                        formatter: function (value, rec, index) {
                            if (value == undefined) return '';
                            var valArray = value.split(',');
                            if (valArray.length > 1) {
                                var checkboxValue = '';
                                for (var k = 0; k < valArray.length; k++) {
                                    if (valArray[k] == '0') {
                                        checkboxValue = checkboxValue + '菜单类型' + ',';
                                    }
                                    if (valArray[k] == '1') {
                                        checkboxValue = checkboxValue + '访问类型' + ',';
                                    }
                                }
                                return checkboxValue.substring(0, checkboxValue.length - 1);
                            } else {
                                if (value == '0') {
                                    return '菜单类型';
                                }
                                if (value == '1') {
                                    return '访问类型';
                                } else {
                                    return value;
                                }
                            }
                        }
                    }, {field: 'src', title: '菜单地址', width: 80, exportExcel: true}, {
                        field: 'order',
                        title: '菜单顺序',
                        width: 12,
                        exportExcel: true
                    }, {field: 'iconStyle', title: '菜单图标样式', width: 25, exportExcel: true}, {
                        field: 'opt',
                        title: '操作',
                        width: 100,
                        exportExcel: true,
                        formatter: function (value, rec, index) {
                            if (!rec.id) {
                                return '';
                            }
                            var href = '';
                            href += "<a href='#'   class='ace_button'  onclick=delObj('functionController.do?del&id=" + rec.id + "','functionList') >  <i class=' fa fa-trash-o'></i> ";
                            href += "删除</a>&nbsp;";
                            href += "<a href='#'   class='ace_button'  onclick=operationDetail('" + rec.id + "','" + index + "')>  <i class=' fa fa-cog'></i>";
                            href += "页面控件权限</a>&nbsp;";
                            href += "<a href='#'   class='ace_button'  onclick=operationData('" + rec.id + "','" + index + "') >  <i class=' fa fa-database'></i>";
                            href += "数据规则</a>&nbsp;";
                            return href;
                        }
                    }]],
                    onLoadSuccess: function (data) {
                        $("#functionList").treegrid("clearSelections");
                        $(this).datagrid("fixRownumber");
                        if (!true) {
                            if (data.total && data.rows.length == 0) {
                                var grid = $('#functionList');
                                var curr = grid.datagrid('getPager').data("pagination").options.pageNumber;
                                grid.datagrid({pageNumber: (curr - 1)});
                            }
                        }
                    },
                /*
                    onClickRow: function (rowData) {
                        rowid = rowData.id;
                        gridname = 'functionList';
                    }*/
                });
                try {
                    _self.restoreheader();
                } catch (ex) {
                }
            },

            restoreheader() {
                var cols = storage.get('functionListhiddenColumns');
                if (!cols) return;
                for (var i = 0; i < cols.length; i++) {
                    try {
                        if (cols.visible != false) $('#functionList').datagrid((cols[i].hidden == true ? 'hideColumn' : 'showColumn'), cols[i].field);
                    } catch (e) {
                    }
                }
            },

            operationDetail(functionId) {
                console.log('1111111111')
                if (li_east == 0) {
                    $('#system_function_functionList').layout('expand', 'east');
                }
                $('#operationDetailpanel').panel("refresh", "functionController.do?operation&functionId=" + functionId);
            },

            operationData(functionId){

            },
            
            add_menu(){
                Bus.$emit('add_menu',true)
            },

            edit_menu(){
                console.log('1111')
                Bus.$emit('edit_menu',true)//传入需要编辑的那一栏
            }
        },
        mounted() {
            this.getTreeTable()
        }
    }
</script>