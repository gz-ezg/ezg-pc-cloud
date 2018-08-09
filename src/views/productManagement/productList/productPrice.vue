<style>
    /*@import '../../../libs/easyUI/demo.css';*/
    /* @import '../../../libs/easyUI/easyui.css'; */
    /* @import '../../../libs/easyUI/icon.css'; */
</style>
<template>
    <div>
        <Card>
            <Form>
                <FormItem :label="contentText">
                    <RadioGroup v-model="z" style="margin-bottom: 15px">
                        <Radio v-for="item in radioGroup" :label="item.pvId" :key="item.pvId">{{ item.propertyValue }}</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <table id="tg" style="width:700px;height:500px;"></table>
        </Card>
<!--        <div style="margin:20px 0;">
            <Button @click.native="edit()">Edit</Button>
            <Button @click.native="save()">save</Button>
            <Button @click.native="cancel()">cancel</Button>
        </div>-->
    </div>
</template>

<script>
    import treegrid from '../../../libs/easyUI/jquery.easyui.min'

    let editingId;
    export default {
        data() {
            return{
                z: '',
                contentText: '',
                radioGroup: [],
                propertys: []
            }
        },
        methods: {
            getTableData() {
                let _self = this
                let url = '/product/queryPropertyByProductId?productId=' + sessionStorage.getItem('productId')

                function doSuccess(response) {
                    _self.contentText = response.data.data[0].name
                    _self.radioGroup = response.data.data[0].children
                    _self.z = response.data.data[0].children[0].pvId

                    for (let i = 0; i < response.data.data[0].children.length; i++) {
                        _self.propertys.push(response.data.data[0].children[i].pvId)
                    }

                    _self.getGridData()
                }

                this.GetData(url, doSuccess)

            },

            getGridData() {
                let _self = this

                $('#tg').treegrid({
                    loader:function(param,success,error){
                        let url = '/product/skuList?productId=' + sessionStorage.getItem('productId') + '&propertys=' + _self.propertys.toString()

                        function doSuccess(response) {
                            success(response.data.data)
                        }

                        _self.GetData(url, doSuccess)
                    },
                    idField:'id',
                    method:'get',
                    treeField:'areafullname',
                    singleSelect:true,
                    fitColumns:false,
                    animate:false,
                    autoRowHeight:false,
                    checkbox:true,
                    columns:[[
                        {field:'areafullname',title:'地区全名',width:220,editor:'text',},
                        {field:'areacode',title:'地区编码',width:150,align:'right',editor:'text'},
                        {field:'realname',title:'地区名称',width:80,editor:'text'},
                        {field:'baseprice',title:'商城价格',width:80,editor:'text'},
                        {field:'oaprice',title:'后台价格',width:80,editor:'text'},
                        {field:'status',title:'状态',width:100,
                            editor:{"type":"combobox",
                                options : {
                                    data : [ {
                                        'value' : '1',
                                        'name' : '已上架'
                                    }, {
                                        'value' : '2',
                                        'name' :'未上架'
                                    } ], /* unitJSON是JSON格式的对象数组 */
                                    valueField : "value",/* value是unitJSON对象的属性名 */
                                    textField : "name"/* name是unitJSON对象的属性名 */
                                }
                            },
                            formatter:function(value,row,index){
                                if(value == 1){
                                    return "已上架";
                                }else{
                                    return "未上架";
                                }
                            }
                        },
                    ]]
                });
            },

            edit() {
                let _self = this

                if (_self.editingId != undefined){
                    $('#tg').treegrid('select', _self.editingId);
                    return;
                }
                let row = $('#tg').treegrid('getSelected');
                if (row){
                    _self.editingId = row.id
                    $('#tg').treegrid('beginEdit', _self.editingId);
                }
            },

            save() {
                let _self = this

                if (_self.editingId != undefined){
                    var t = $('#tg');
                    t.treegrid('endEdit', _self.editingId);
                    _self.editingId = undefined;
                    var persons = 0;
                    var rows = t.treegrid('getChildren');
                    for(var i=0; i<rows.length; i++){
                        var p = parseInt(rows[i].persons);
                        if (!isNaN(p)){
                            persons += p;
                        }
                    }
                    var frow = t.treegrid('getFooterRows')[0];
                    frow.persons = persons;
                    t.treegrid('reloadFooter');
                }
            },

            cancel() {
                let _self = this

                if (_self.editingId != undefined){
                    $('#tg').treegrid('cancelEdit', _self.editingId);
                    _self.editingId = undefined;
                }
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>