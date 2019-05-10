<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup style="float:left">
                    <Button type="primary" icon="information-circled" @click="create_template">新增模板</Button>
                </ButtonGroup>
            </Row>
            <Table 
                highlight-row 
                :data="data" 
                :columns="header"
                style="margin-top:10px"
                @on-row-dblclick="show_template"
            >
            </Table>
            <Page 
                placement="top"
                :total="total"
                :loading = "loading"
                :current="page" 
                @on-change="pageChange" 
                show-elevator
                size="small"
                style="margin-top:10px"
            >
            </Page>
        </Card>
        <create-template @update="get_data"></create-template>
        <update-template @update="get_data"></update-template>
        <show-template></show-template>
    </div>
</template>

<script>
import createTemplate from './create'
import updateTemplate from './update'
import showTemplate from './show'

export default {
    name: 'clueLibraryTemplate_index',
    components:{
        createTemplate,
        updateTemplate,
        showTemplate
    },
    data(){
        return{
            loading: false,
            pageSize: 10,
            page: 1,
            total: 0,
            data: [],
            header: [
                {
                    title: "模板名称",
                    key: "name",
                    width: 200
                },
                {
                    title: "模板详情",
                    key: "detail",
                    width: 300
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    width: 200
                },
                {
                    title: "更新时间",
                    key: "updatedate",
                    width: 200
                },
                {
                    title:"操作",
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit_tempalte(params)
                                    }
                                }
                            }, '[ 编辑 ]'),
                            h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        // disabled: new Boolean(1)
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Message.warning("此功能暂未上线！")
                                        }
                                    }
                                }, '[ 删除 ]')
                        ])
                    }
                }
            ]
        }
    },
    methods:{
        get_data(){
            let _self = this
            _self.loading = true
            let url = `api/clue/template/list`

            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: "updatedate",
                    order: "desc"
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        create_template(){
            this.$bus.emit("OPEN_CREATE_CLUE_TEMPLATE",true)
        },
        edit_tempalte(e){
            this.$bus.emit("OPEN_EDIT_CLUE_TEMPLATE", e.row)
        },
        show_template(e){
            this.$bus.emit("OPEN_SHOW_CLUE_TEMPLATE", e)
        }
    },
    created() {
        this.get_data()
    },
}
</script>
