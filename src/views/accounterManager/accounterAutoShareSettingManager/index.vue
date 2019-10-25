<template>
    <Card>
        <Row style="padding: 0 50px">
            <Col span="4" style="min-height: 250px">
                <Row style="display: flex">
                    <Button type="error" style="flex: 1 1 166px;border-radius: 0">实习生</Button>
                </Row>
                <Row style="display: flex">
                    <ButtonGroup style="flex: 1 1 166px;display: flex">
                        <Button type="primary" style="flex: 1 1 83px;border-radius: 0">一星</Button>
                        <Button type="info" style="flex: 1 1 83px;border-radius: 0">二星</Button>
                    </ButtonGroup>
                </Row>
                <Row style="display: flex">
                    <ButtonGroup style="flex: 1 1 166px;display: flex">
                        <Button type="warning" style="flex: 1 1 83px;border-radius: 0">三星</Button>
                        <Button type="success" style="flex: 1 1 83px;border-radius: 0">四星</Button>
                    </ButtonGroup>
                </Row>
                <Row style="display: flex">
                    <Menu theme="dark" value="1" style="flex: 1 1 166px" @on-select="select">
                        <Menu-group v-for="(item,index) in menu" :key="index">
                            <Menu-item :name="item.title" >
                                <Icon type="document-text"></Icon>
                                {{item.title}}
                            </Menu-item>
                        </Menu-group>
                    </Menu>
                </Row>
            </Col>
            <Col span="10" style="min-height: 250px">
                <Tabs value="name1">
                    <TabPane label="产品名称" name="name1" >

                    </TabPane>
                    <TabPane label="总分" name="name2">

                    </TabPane>
                </Tabs>
            </Col>
            <Col span="10" style="min-height: 250px">
                <Table
                        @on-current-change="selectRow"
                        :loading="loading"
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="header"
                        :data="data"
                ></Table>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading:false,
                header:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '产品名称（分数）',
                        key: 'product',
                        minWidth: 120
                    },
                ],
                data:[{product:'小规模零申报企业（1）'},{product:'小规模纳税人（2）'},{product:'高薪小规模纳税人（3）'}],
                current_row:"",
                menu:[{title:"全部"},{title:"张三"},{title:"李四"},{title:"赵武"},{title:"流川枫"},{title:"ez"},{title:"vn"},{title:"湘北"}]
            }
        },
        methods:{
            selectRow(e){
                this.current_row = e
            },
            select(e){
                console.log(e)
            }
        }
    }
</script>

<style>
    .ivu-menu-item-group-title{
        display: none;
    }
</style>