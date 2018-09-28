<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="applicant_realname" label="申请人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.applicant_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="receiver_realname" label="接收人：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.receiver_realname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :loading="loading"
                :columns="header"
                :data="data"
                @on-row-dblclick="open_detail"
                @on-current-change="select_row"
            >
            </Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
export default {
    data(){
        return {
            search_model: "",
            seacrhFormInline:{
                applicant_realname: "",
                receiver_realname: ""
            },
            loading: false,
            header: [],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        open_detail(e){

        },
        select_row(e){

        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        get_data(){

        },
        search(){
            this.get_data()
        },
        reset(){
            this.get_data()
        }
    },
    created() {
        let _self = this
        this.get_data()
    },
}
</script>

