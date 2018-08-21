<template>
    <div>
        <Card>
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1">
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            <div slot="content" @keydown.enter="search">
                                <Form ref="searchModel" :model="searchModel" :label-width="100">
                                    <Row :gutter="16">
                                        <Col span="6">
                                            <FormItem prop="logtype" label="操作人员：">
                                                <Input transfer v-model="searchModel.realname" placeholder="" size="small">
                                                </Input>  
                                            </FormItem>
                                        </Col>
                                        <!-- <Col span="6">
                                            <FormItem prop="startdate" label="操作时间：">
                                                <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.startdate"></DatePicker>
                                                <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.enddate"></DatePicker>
                                            </FormItem>
                                        </Col> -->
                                    </Row>
                                    <FormItem>
                                        <Button type="primary" @click="search">查询</Button>
                                        <Button type="ghost" style="margin-left:20px" @click="reset">清空</Button>
                                    </FormItem>
                                    </Form>
                                </div>
                            </Panel> 
                        </Collapse>
                    </Row>
            <Row style="margin-top:10px">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                >
                </Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    name:'MQ_index',
    data(){
        return{
            searchModel:{

            },
            header:[
                {
                    title: "操作人员",
                    key: 'realname',
                    width: 180
                },
                {
                    title: "操作菜单",
                    key: 'interface_name',
                    width: 120
                },
                {
                    title: '菜单code',
                    key: 'menu_id',
                    width: 120
                },
                {
                    title: "操作时间",
                    key: 'create_date',
                    width: 200,
                }
            ],
            data:[],
            pageTotal:new Number(),
            page: 1,
            pageSize: 10,
            loading:false,
        }
    },
    methods:{
        search(){
            this.getData()
        },
        getData(){
            let _self = this
            _self.loading = true
            let url = `api/system/showClickOnInfo`

            let config = {
                params:{
                    type: 'menu',
                    page: _self.page,
                    pageSize: 10,
                    realname: _self.searchModel.realname
                }
            }

            function success(res){
                // console.log(res)
                _self.data = res.data.data.mapInfo.rows
                _self.pageTotal = res.data.data.mapInfo.total
                _self.loading = false
            }

            function fail(res){
                // console.log(res)
                _self.loading = false
            }

            this.$Get(url, config, success, fail)
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        reset(){
            this.searchModel.realname = ""
            this.getData()
        }
    },
    created(){
        this.getData()
    }
}
</script>
