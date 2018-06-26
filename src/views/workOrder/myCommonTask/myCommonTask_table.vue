<template>
    <div>
        <Tabs value="name1">
            <TabPane label="服务中" name="name1">
                <serving></serving>
                <!-- <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">查询详情</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">流转</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">产品异常</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量已读</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量未读</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="data"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card> -->
            </TabPane>
            <TabPane label="未开始" name="name2">
                <notbegin></notbegin>
            </TabPane>
            <TabPane label="已开始" name="name3">
                <finished></finished>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all></all>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'

    export default {
        components:{
            Serving,
            All,
            Finished,
            Notbegin
        },
    }
</script>