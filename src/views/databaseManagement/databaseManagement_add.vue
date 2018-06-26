<style>
    @import './superTables.css';
</style>
<style lang="scss">
    .edit-table {
        border: 1px solid gray;
        border-collapse: collapse;
        th {
            border: 1px solid gray;
        }
        tbody {

            tr {
                td {
                    border: 1px solid gray;
                    input {
                        border: none;
                    }
                }
            }
        }
    }
</style>
<style scoped>
    /* .ivu-form-item {
        margin-bottom: 2px
    } */
</style>
<template>
    <div>
        <Modal
                v-bind:value="modal5"
                title="录入"
                ok-text="保存"
                :styles="{top: '0'}"
                :width="1300"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="方法名称" prop="methodName">
                        <Input size="small" v-model="formValidate.methodName"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="模块" prop="module">
                        <Input size="small" v-model="formValidate.module"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="子模块" prop="subModule">
                        <Input size="small" v-model="formValidate.subModule"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="名称" prop="sqlName">
                        <Input size="small" v-model="formValidate.sqlName"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="数据库模板" prop="sqlCatalog">
                        <Select transfer v-model="formValidate.sqlCatalog">
                            <Option value="oaJdbcTemplate">oaJdbcTemplate</Option>
                            <Option value="baseJdbcTemplate">baseJdbcTemplate</Option>
                            <Option value="crmJdbcTemplate">crmJdbcTemplate</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="sql类型" prop="sqlType">
                        <Select transfer v-model="formValidate.sqlType">
                            <Option value="SQL">SQL</Option>
                            <Option value="Script">Script</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="区间编码集" prop="sqlZoneCodes">
                        <Input size="small" v-model="formValidate.sqlZoneCodes"/>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="参数个数" prop="paramCount">
                    <InputNumber size="small" :max="10" :min="1" v-model="formValidate.paramCount"></InputNumber>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="24">
                        <Collapse>
                            <Panel name="1">
                                规则
                                <p slot="content">
                                <table class="edit-table">
                                    <thead>
                                    <th>#</th>
                                    <th>区域编码</th>
                                    <th>规则列名</th>
                                    <th>值类型</th>
                                    <th>值</th>
                                    <th>条件</th>
                                    <th>系统参数</th>
                                    <th>操作</th>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in tableData">
                                        <td>
                                            {{ item.ruleIndex }}
                                        </td>
                                        <td>
                                            <Input v-model="item.sqlZoneCode"
                                                   @on-change="addCell(item.ruleIndex)"></Input>
                                        </td>
                                        <td>
                                            <Input v-model="item.ruleColum"
                                                   @on-change="addCell(item.ruleIndex)"></Input>
                                        </td>
                                        <td>
                                            <Select transfer v-model="item.ruleValueType" @on-change="addCell(item.ruleIndex)">
                                                <Option value="int">int</Option>
                                                <Option value="string">string</Option>
                                                <Option value="function">function</Option>
                                                <Option value="custom">custom</Option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Input v-model="item.ruleValue"
                                                   @on-change="addCell(item.ruleIndex)"></Input>
                                        </td>
                                        <td>
                                            <Select transfer v-model="item.ruleCondition" @on-change="addCell(item.ruleIndex)">
                                                <Option value="=">=</Option>
                                                <Option value="in">in</Option>
                                                <Option value="like">like</Option>
                                                <Option value=">">></Option>
                                                <Option value=">=">>=</Option>
                                                <Option value="<"><</Option>
                                                <Option value="<="><=</Option>
                                                <Option value="!=">!=</Option>
                                                <Option value="not in">not in</Option>
                                                <Option value="is null">is null</Option>
                                                <Option value="is not null">is not null</Option>
                                            </Select>
                                        </td>
                                        <td>
                                            <Select transfer v-model="item.sysFlag" @on-change="addCell(item.ruleIndex)">
                                                <Option value="0">否</Option>
                                                <Option value="1">是</Option>
                                            </Select>
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Button type="ghost" icon="android-arrow-up" @click="upRow(item)"></Button>
                                                <Button type="ghost" icon="android-arrow-down" @click="downRow(item)"></Button>
                                                <Button type="ghost" icon="trash-b" @click="deleteRow(item)"></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </p>
                            </Panel>
                        </Collapse>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="SQL" prop="sqlContent">
                    <Input size="small" type="textarea" :rows="4" v-model="formValidate.sqlContent"/>
                </FormItem>
                <FormItem label="备注" prop="memo">
                    <Input size="small" type="textarea" v-model="formValidate.memo"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import DragableTable from '../tables/components/dragableTable.vue';

    export default {
        props: ['modal5'],
        components: {
            DragableTable
        },
        data() {
            return {
                loading: true,
                modal1: false,
                modal2: false,
                modal3: false,
                maxIndex: 1,
                columns1: [
                    {
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '区域编码',
                        key: 'sqlZoneCode'
                    },
                    {
                        title: '规则名称',
                        key: 'ruleName'
                    },
                    {
                        title: '规则列名',
                        key: 'ruleColum'
                    },
                    {
                        title: '值类型',
                        key: 'ruleValueType'
                    },
                    {
                        title: '值',
                        key: 'ruleValue'
                    },
                    {
                        title: '条件',
                        key: 'ruleCondition'
                    },
                    {
                        title: '默认值',
                        key: 'ruleDefaultValue'
                    },
                    {
                        title: '系统参数',
                        key: 'sysFlag'
                    },
                    {
                        title: '备注',
                        key: 'memo'
                    },
                ],
                tableData: [{
                    ruleIndex: 1,
                    sqlZoneCode: '',
                    ruleColum: '',
                    ruleValueType: 'string',
                    ruleValue: '',
                    ruleCondition: '=',
                    sysFlag: '0',
                }],
                tableData2: [],
                formValidate: {
                    methodName: '',
                    module: '',
                    subModule: '',
                    sqlContent: '',
                    sqlName: '',
                    sqlCatalog: 'oaJdbcTemplate',
                    sqlType: 'SQL',
                    sqlZoneCodes: '',
                    paramCount: '',
                    memo: '',
                    sqlRules: []
                },
            }
        },
        methods: {

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    let url = '/system/saveSQLTemplete'
                    _self.formValidate.sqlRules = _self.tableData2

                    function doSuccess(response) {
                        /*_self.$Message.success('更新成功!')
                        _self.getData()
                        _self.$emit('hideAddPanel', 'false');*/
                    }

                    this.PostData(url, _self.formValidate, doSuccess)
                }, 2000);
            },

            /*************************取消录入，重置表单********************************/
            cancel() {
                let _self = this
                this.$emit('hideAddPanel', 'false');
            },

            handleAdd() {
                let _self = this

                _self.modal1 = true
            },

            ok2() {
                let _self = this
                let dataLength = _self.tableData.length

                _self.tableData.splice(dataLength - 1, 1)

                for (let i = 0; i < _self.tableData.length; i++) {
                    _self.tableData2.push(_self.tableData[i])
                }

                _self.cancel2()
            },

            cancel2() {
                let _self = this

                _self.tableData = [{
                    ruleIndex: _self.tableData2.length + 1,
                    sqlZoneCode: '',
                    ruleColum: '',
                    ruleValueType: 'string',
                    ruleValue: '',
                    ruleCondition: '=',
                    sysFlag: '0',
                }]
                _self.maxIndex = 1
            },

            addCell(e) {
                let _self = this
                let _isMax

                _self._isMax = _self.maxIndex > e ? false : true
                _self.maxIndex = _self.maxIndex > e ? _self.maxIndex : e + 1

                if (_self._isMax) {
                    _self.tableData.push({
                        ruleIndex: e + 1,
                        sqlZoneCode: '',
                        ruleColum: '',
                        ruleValueType: 'string',
                        ruleValue: '',
                        ruleCondition: '=',
                        sysFlag: '0',
                    })
                }
            },
            upRow(e) {
                let _self = this
                let _rowData = {}
                let _tableData = []
                _tableData = _self.tableData
                if (e.ruleIndex > 1) {
                    _rowData = e
                    _tableData[e.ruleIndex - 1] = _tableData[e.ruleIndex - 2]
                    _tableData[e.ruleIndex - 1].ruleIndex = e.ruleIndex
                    _tableData[e.ruleIndex - 2] = _rowData
                    _tableData[e.ruleIndex - 2].ruleIndex = e.ruleIndex - 1

                    _self.tableData = []
                    _self.tableData = _tableData
                }
            },
            downRow(e) {
                let _self = this
                let _rowData = {}
                let _tableData = []

                _tableData = _self.tableData

                if (e.ruleIndex < _self.tableData.length - 1) {
                    _rowData = e
                    _tableData[e.ruleIndex - 1] = _tableData[e.ruleIndex]
                    _tableData[e.ruleIndex - 1].ruleIndex = e.ruleIndex
                    _tableData[e.ruleIndex] = _rowData
                    _tableData[e.ruleIndex].ruleIndex = e.ruleIndex + 1

                    _self.tableData = []
                    _self.tableData = _tableData
                }
            },
            deleteRow(e) {
                let _self = this
                let _tableData = []

                if (e.ruleIndex < _self.tableData.length - 1) {
                    _tableData = _self.tableData

                    _tableData.splice(e.ruleIndex - 1, 1)

                    _self.tableData = []
                    _self.maxIndex = _tableData.length

                    for (let i = 0; i <_tableData.length; i++) {
                        _tableData[i].ruleIndex = i + 1
                        _self.tableData.push(_tableData[i])
                    }

                }
            }
        },
        mounted() {
        }
    }
</script>