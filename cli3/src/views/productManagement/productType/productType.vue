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
                    <Button type="primary" icon="plus" @click="addProductfunction();addProduct = true">添加</Button>
                    <Button type="primary" icon="plus" @click="EditProductfunction()">编辑</Button>
                    <Button type="primary" icon="plus" @click="deleteProducfunction()">删除</Button>
                </ButtonGroup>
            </Row>
            <table id="tg" style="width:700px;height:auto;"></table>
        </Card>
        <Modal
                v-model="addProduct"
                title="添加"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidateAdd" :model="formValidateAdd" :label-width="120">
                <FormItem label="产品类型名称" prop="typename">
                    <Input v-model="formValidateAdd.typename"></Input>
                </FormItem>
                <FormItem label="产品类型等级">
                    <Select transfer v-model="typelevel" style="width:200px" @on-change="typelevelChange">
                        <Option value="1">一级产品</Option>
                        <Option value="2">下级产品</Option>
                    </Select>
                </FormItem>
                <FormItem label="顺序" prop="sortid">
                    <InputNumber :max="10" :min="1" v-model="formValidateAdd.sortid"></InputNumber>
                </FormItem>
                <FormItem label="父类型" prop="pid" v-if="isTypelevel">
                    <input class="fuleixing" style="width:200px;height: 25px"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="EditProduct"
                title="编辑"
                @on-ok="handleSubmit2('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem label="产品类型名称" prop="typename">
                    <Input v-model="formValidate.typename" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="产品类型等级">
                    <Select transfer v-model="typeLevel" style="width:200px">
                        <Option value="1">一级产品</Option>
                        <Option value="2">下级产品</Option>
                    </Select>
                </FormItem>
                <FormItem label="顺序" prop="productName">
                    <InputNumber :max="10" :min="1" v-model="formValidate.sortId"></InputNumber>
                </FormItem>
                <FormItem label="父类型" prop="productName" v-show="isTypelevel2">
                    <input class="fuleixing2" style="width:200px;height: 25px"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="deleteProduct" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除客户</span>
            </p>
            <div style="text-align:center">
                <p>客户信息删除无法恢复</p>
                <p>确定删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="delete2">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // import treegrid from '../../../libs/easyUI/jquery.easyui.min'
    // import combotree from '../../../libs/easyUI/jquery.easyui.min'

    let editingId;
    export default {
        data() {
            return {
                z: '财务章',
                productID: '',
                addProduct: false,
                EditProduct: false,
                deleteProduct: false,
                isTypelevel: false,
                isTypelevel2: false,
                formValidate: {
                    sortId: ''
                },
                formValidateAdd: {
                    sortid: 1
                },
                typelevel: '',
                typeLevel: '',
            }
        },
        methods: {
            getTableData() {
                let _self = this
                let url = '/product/type/tree'

                function doSuccess(response) {
                    $('#tg').treegrid({
                        data: response.data.data,
                        idField: 'id',
                        method: 'get',
                        treeField : 'typeName',
                        queryParams : {},
                        rownumbers: true,
                        columns: [[
                            {title: '类型名称', field: 'typeName'},
                            {title: '类型顺序', field: 'sortId'},
                        ]]
                    });
                }

                this.GetData(url, doSuccess)
            },

            edit() {
                let _self = this

                if (_self.editingId != undefined) {
                    $('#tg').treegrid('select', _self.editingId);
                    return;
                }
                let row = $('#tg').treegrid('getSelected');
                if (row) {
                    _self.editingId = row.id
                    $('#tg').treegrid('beginEdit', _self.editingId);
                }
            },

            save() {
                let _self = this

                if (_self.editingId != undefined) {
                    var t = $('#tg');
                    t.treegrid('endEdit', _self.editingId);
                    _self.editingId = undefined;
                    var persons = 0;
                    var rows = t.treegrid('getChildren');
                    for (var i = 0; i < rows.length; i++) {
                        var p = parseInt(rows[i].persons);
                        if (!isNaN(p)) {
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

                if (_self.editingId != undefined) {
                    $('#tg').treegrid('cancelEdit', _self.editingId);
                    _self.editingId = undefined;
                }
            },

            addProductfunction() {
                let _self = this

/*  
                if ($('#tg').treegrid('getSelected') == null) {
                    _self.isTypelevel = false
                }
                else if ($('#tg').treegrid('getSelected').typeLevel != 1) {
                    _self.isTypelevel = true
                }
                else {
                    _self.isTypelevel = false
                }
*/

                let url = '/product/type/tree'

                function doSuccess(response) {
                    $('.fuleixing').combotree({
                        data: response.data.data,
                        options: function (value) {
                        }
                    });
                }

                this.GetData(url, doSuccess)
            },

            deleteProducfunction() {
                let _self = this

                if ($('#tg').treegrid('getSelected') == null) {
                    this.$Message.error('请选择要删除的订单项');
                } else {
                    _self.productID = $('#tg').treegrid('getSelected').id
                    _self.deleteProduct = true
                }
            },

            delete2() {
                let _self = this
                let url = '/product/type/del'

                function doSuccess(response) {
                    _self.deleteProduct = false
                    _self.getTableData()
                }

                this.PostData(url, {id: _self.productID}, doSuccess)
            },

            handleSubmit() {
                let _self = this
                let url = '/product/type/create'

                if (_self.isTypelevel == true) {
                    _self.formValidateAdd.pid = $('.fuleixing').combotree('tree').tree('getSelected').id
                }

                function doSuccess(response) {

                }

                this.PostData(url, _self.formValidateAdd, doSuccess)
            },

            typelevelChange(a) {
                let _self = this
                if (a == 1) {
                    this.isTypelevel = false
                } else {
                    this.isTypelevel = true
                }

                let url = '/product/type/tree'

                function doSuccess(response) {
                    $('.fuleixing').combotree({
                        data: response.data.data,
                        options: function (value) {
                        }
                    });
                }

                this.GetData(url, doSuccess)
            },

            EditProductfunction() {
                let _self = this

                if ($('#tg').treegrid('getSelected') == null) {
                    this.$Message.error('请选择要编辑的订单项');
                } else {
                    let _id = ''
                    _self.productID = $('#tg').treegrid('getSelected').id
                    _self.EditProduct = true
                    _self.formValidate.typename = $('#tg').treegrid('getSelected').typeName
                    _self.formValidate.id = $('#tg').treegrid('getSelected').id
                    _self.formValidate.sortId = $('#tg').treegrid('getSelected').sortId
                    _self.typeLevel = $('#tg').treegrid('getSelected').typeLevel.toString()
                    _id = $('#tg').treegrid('getSelected').pId

                    if ($('#tg').treegrid('getSelected').typeLevel == 2) {
                        _self.isTypelevel2 = true
                    } else {
                        _self.isTypelevel2 = false
                    }

                    let url = '/product/type/tree'

                    function doSuccess(response) {
                        $('.fuleixing2').combotree({
                            data: response.data.data,
                            options: function (value) {
                            },
                            onLoadSuccess:function(node,data){
                                $(".fuleixing2").combotree('setValue', _id)
                            }
                        });
                    }

                    this.GetData(url, doSuccess)
                }
            },

            handleSubmit2() {
                let _self = this
                let url = '/product/type/update'

                if (_self.isTypelevel2 == true) {
                    _self.formValidate.pid = $('.fuleixing2').combotree('tree').tree('getSelected').id
                }

                function doSuccess(response) {
                    _self.getTableData()
                }

                this.PostData(url, _self.formValidate, doSuccess)
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>