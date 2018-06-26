<template>
    <Card>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="information-circled" @click="showdetail">查看</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="reply">回复</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button> -->
            </ButtonGroup>
            <Col span="6" style="float:right">
                <Input v-model="search" placeholder="输入评价人搜索" @on-keydown.enter="getData">
                <Button slot="append" icon="ios-search" @click="getData"></Button>
                </Input>
            </Col>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                ref="selection"
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                @on-current-change="save_current_row"
                @on-row-dblclick="showdetail"
                ></Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-sizer
                show-elevator
                @on-change="pageChange"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
export default {
    data(){
        return{
            search:"",
            header:[],
            data:[],
            page:1,
            total:new Number()
        }
    },
    methods:{
        getData(){

        },
        showdetail(){

        },
        reply(){

        },
        save_current_row(){

        },
        pageChange(){
            
        }
    }
}
</script>
