<template>
    <div>
        <Card
            title="文件签收表"
            style="width:650px;margin:auto"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Row :gutter="20">
                    <Col span="10">
                        <FormItem label="客户" prop="name">
                            <Input v-model="formValidate.name" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="业务" prop="workId">
                            <Input v-model="formValidate.workId"></Input>
                        </FormItem>
                    </Col>
                </Row> 
            </Form>
            <div style="width:610px">
                <Collapse v-model="openPage" id="fileTable">
                    <Panel name="1">
                        工商
                        <p slot="content" style="display:flex">
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(0,10)"
                                style="width:304px"
                            >
                            </Table>
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(10,20)"
                                style="width:304px"
                            >
                            </Table>
                        </p>
                    </Panel>
                    <Panel name="2">
                        个人信息
                        <p slot="content">
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header"
                                :data="data.slice(10,20)"
                                style="width:304px"
                            >
                            </Table>
                        </p>
                    </Panel>
                    <Panel name="3">
                        税务
                        <p slot="content">2</p>
                    </Panel>
                    <Panel name="4">
                        银行
                        <p slot="content">4</p>
                    </Panel>
                    <Panel name="5">
                        其他
                        <p slot="content">3</p>
                    </Panel>
                </Collapse>
                <Button @click="submit" type="primary" style="width:100%;margin-top:5px;">提交</Button>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formValidate: {
                name: "",
                workId: ""
            },
            fileList: [],
            openPage: [1,2,3,4,5],
            total: 0,
            data: [],
            header: [
                {
                    title: "资料名称",
                    key: "file_type_name",
                    minWidth: 150
                },
                // {
                //     title: "",
                //     type: "selection",
                //     width: 90,
                // },
                {
                    //  自定义，1
                    title: "数量",
                    key: "plural_name",
                    width: 120,
                    render: (h, params) =>{
                        return h('InputNumber', {
                            props: {
                                min: 0,
                                value: params.row.num,
                                max: params.row.plural == 'N'?1:9999
                            },
                            on: {
                                "on-change": (e)=>{
                                    this.change_num(params.row.id, e)
                                }
                            }
                        })
                    }
                },
            ]
        }
    },
    methods: {
        get_data(){
            let _self = this
            let url = "api/customer/file/type/list"

            let config = {
                params:{
                    page: 1,
                    pageSize: 30,
                    sortField: 'id'
                } 
            }

            function success(res){
                _self.total = res.data.data.total
                _self.data = res.data.data.rows
                _self.data.map((item)=>{
                    item.num = 0
                })
            }

            this.$Get(url, config, success)
        },
        change_num(id, num){
            this.data.find((item)=>{
                if(item.id == id){
                    item.num = num
                }
            })
        },
        submit(){
            this.fileList = []
            this.data.map((item)=>{
                if(item.num != 0){
                    this.fileList.push(item)
                }
            })
        }
    },
    created(){
        this.get_data()
    }
}
</script>

<style>
#fileTable .ivu-table-small td{
    height: 32px;
}
#fileTable .ivu-input-number-input-wrap{
    height: 28px;
}
#fileTable .ivu-input-number-input{
    height: 28px;
    line-height: 28px;
}
#fileTable .ivu-input-number{
    height: 28px;
    line-height: 28px;
    border: none;
}
#fileTable .ivu-input-number-handler{
    height: 14px;
}
#fileTable .ivu-collapse-content{
    padding: 0px;
}
#fileTable .ivu-collapse-content>.ivu-collapse-content-box{
    padding: 0px;
}
</style>
