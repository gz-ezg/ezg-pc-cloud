<style>
    /*@import '../../../libs/easyUI/demo.css';*/
    /* @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css'; */
</style>
<template>
    <div>
        <Card>
            <Row style="margin-bottom: 15px">
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="activate()">激活地区</Button>
                    <Button type="primary" icon="plus" @click="activate2()">冻结地区</Button>
                </ButtonGroup>
            </Row>
            <table id="tg" style="width:700px;height:500px;"></table>
        </Card>
    </div>
</template>

<script>
    // import treegrid from '../../../libs/easyUI/jquery.easyui.min'

    let editingId;
    export default {
        data() {
            return{
                z: '财务章'
            }
        },
        methods: {
            getTableData() {
                let _self = this
               /* $('#tg').treegrid({
                    url:'./treegrid_data2.json',
                    idField:'id',
                    method:'get',
                    treeField:'name',
                    checkbox:true,
                    columns:[[
                        {title:'地区全名',field:'name',width:180,editor:'text',},
                        {field:'地区编码',title:'地区编码',width:60,align:'right',editor:'text'},
                        {field:'地区名称',title:'地区名称',width:80,editor:'text'},
                        {field:'地区状态',title:'商城价格',width:80,editor:'text'},
                        {field:'排序id',title:'后台价格',width:80,editor:'text'},
                    ]]
                });*/

                $('#tg').treegrid({
                    loader:function(param,success,error){
                        let url = '/product/area/findTreeAreaPages/1/10/1'

                        function doSuccess(response) {
                            success(response.data.data)
                        }

                        _self.GetData(url, doSuccess)
                    },
                    idField : 'id',
                    method:'get',
                    treeField : 'areafullname',
                    singleSelect:true,
                    fitColumns:false,
                    animate:false,
                    autoRowHeight:false,
                    pagination:true,
                    onClickRow:function(row){

                        if ($(('#check_'+row.id))[0].checked){
                            $(('#check_'+row.id))[0].checked = false;
                        } else {
                            $(('#check_'+row.id))[0].checked = true;
                        }

                        _self.show(row.id);
                    },
                    onLoadSuccess:function(){
                        $("input[type='checkbox']").click(function(e){
                            let id = $(this).attr("id");
                            id = id.replace("check_",'');
                            _self.show(id);
                            e.stopPropagation();
                        });
                    },
                    toolbar :"#areaToolbar",
                    columns : [ [ {
                        field : 'id',
                        title : '产品类型id',
                        align : 'right',
                        width : 100,
                        hidden : true
                    },
                        {
                            field : 'areafullname',
                            title : '地区全名',
                            width : 250,
                            formatter: function (value, row, index) {
                                return "<input type='checkbox'  id='check_"+row.id+"' "+(row.checked?'checked':'')+"/>" + row.areafullname
                            }
                        },{
                            field : 'areacode',
                            title : '地区编码',
                            width : 150
                        },{
                            field : 'realname',
                            title : '地区名称',
                            width : 150
                        },{
                            field : 'status',
                            title : '地区状态',
                            width : 150,
                            formatter: function(value, row, index){
                                if (value == 1){
                                    return "已激活";
                                } else {
                                    return "未激活";
                                }
                            }

                        },{
                            field:'dispid',
                            title:'排序id',
                            width:100
                        } ] ]
                });

                let pager = $('#tg').treegrid('getPager');
                $(pager).pagination({
                    pageSize: 10,
                    pageList: [10,20,30],
                    onSelectPage:function(pageNumber, pageSize){
                        let url = '/product/area/findTreeAreaPages/'+ pageNumber +'/'+ pageSize +'/1'

                        function doSuccess(response) {
                            $('#tg').treegrid('loadData',response.data.data);
                        }

                        _self.GetData(url, doSuccess)
                    }
                })
            },

            show(checkid){

                let s = '#check_'+checkid;

                /*选子节点 */
                let nodes = $("#tg").treegrid("getChildren",checkid);
                for(let i=0;i<nodes.length;i++){
                    $(('#check_'+nodes[i].id))[0].checked = $(s)[0].checked;
                }
                let checkRow = $("#tg").treegrid("find",checkid);
                let parentId = checkRow.parentid;

                if($(s)[0].checked){
                    while(parentId){
                        $(('#check_'+parentId))[0].checked  = $(s)[0].checked;
                        if($("#tg").treegrid("find",parentId)){
                            parentId =  $("#tg").treegrid("find",parentId).parentid;
                        }
                    }
                }
            },

            activate() {
                let _self = this
                let url = '/product/area/updateAreaStatus'
                let idList = []
                let _data = {}
                let _obj = {}
                $("input:checked").each(function(){
                    let id = $(this).attr("id");

                    if(id.indexOf('check_type')== -1 && id.indexOf("check_")>-1)
                        idList.push(id.replace("check_",''))
                })
                _data.ids = idList.toString()
                _data.status = 1

                function doSuccess(response) {
                    _self.getTableData()
                }

                this.PostData(url, _data, doSuccess)
            },

            activate2() {
                let _self = this
                let url = '/product/area/updateAreaStatus'
                let idList = []
                let _data = {}
                let _obj = {}
                $("input:checked").each(function(){
                    let id = $(this).attr("id");

                    if(id.indexOf('check_type')== -1 && id.indexOf("check_")>-1)
                        idList.push(id.replace("check_",''))
                })
                _data.ids = idList.toString()
                _data.status = 2

                function doSuccess(response) {
                    _self.getTableData()
                }

                this.PostData(url, _data, doSuccess)
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>