<template>
    <Card>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="information-circled" @click="showdetail">查看</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="reply">回复</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button> -->
            </ButtonGroup>
            <!-- <Col span="6" style="float:right">
                <Input v-model="search" placeholder="输入评价人搜索" @on-keydown.enter="getData">
                <Button slot="append" icon="ios-search" @click="getData"></Button>
                </Input>
            </Col> -->
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
        <Modal
            title="查看详情"
            v-model="openDetail"
            width="600"
            :transfer="false"
        >
            <Form :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="replycontent" label="回复内容：">
                            <Input type="textarea" v-model="current_row.replycontent" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="replyname" label="回复人：">
                            <Input type="text" v-model="current_row.replyname"  readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="replytime" label="回复时间：">
                            <Input type="text" v-model="current_row.replytime"  readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="close_detail">关闭</Button>
            </div>
        </Modal>
        <!-- <Modal
            title="回复"
            v-model="openReply"
            width="600"
        >
            <Form :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="realname" label="评价人：">
                            <Input type="text" v-model="current_row.realname"  readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="suggestion" label="反馈与意见：">
                            <Input type="textarea" v-model="current_row.suggestion" readonly>
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="replycontent" label="回复内容：">
                            <Input type="textarea" v-model="replycontent">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="submit_reply" :loading="button_loading">提交</Button>
                <Button type="ghost" @click="close_reply">关闭</Button>
            </div>
        </Modal> -->
    </Card>
</template>

<script>
export default {
    name:'complainReply_index',
    data(){
        return{
            button_loading:false,
            replycontent:"",
            openDetail:false,
            openReply:false,
            search:"",
            header:[
                {
                    title:"意见或建议",
                    key:'suggestion',
                    minWidth:300
                },
                {
                    title:"回复内容",
                    key:"replycontent",
                    minWidth:300
                },
                {
                    title:"回复时间",
                    key:'replytime',
                    minWidth: 150
                },
                {
                    title:"回复人",
                    key:'replyname',
                    minWidth:150
                },
                {
                    title:"评价人",
                    key:'feedbackname',
                    minWidth: 150
                }
            ],
            data:[],
            page:1,
            total:new Number(),
            current_row:""
        }
    },
    methods:{
        getData(){
            let _self = this
            let url = `api/system/replyList`
            let config = {
                params:{
                    page:_self.page,
                    pageSize:10,
                    sortField:"replytime"
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
            }
            
            this.$Get(url,config,success)
        },
        showdetail(){
            if(this.current_row == "" || this.current_row == null){
                this.$Message.warning('请选择一行进行查看！')
            }else{
                this.openDetail = true
            }
        },
        close_detail(){
            this.openDetail = false
            // this.current_row = ""
        },
        reply(){
            if(this.current_row == "" || this.current_row == null){
                this.$Message.warning('请选择一行进行查看！')
            }else{
                this.openReply = true
            }
        },
        submit_reply(){
            let _self = this
            _self.button_loading = true
            let url = `api/system/replySystemFeedback`
            let config = {
                feedback:_self.current_row.id,
                feedbackby:_self.current_row.createby,
                replycontent:_self.replycontent
            }
            
            function success(res){
                _self.button_loading = false
                _self.openReply = false
            }

            function fail(res){
                _self.button_loading = false
            }

            this.$Post(url,config,success,fail)
        },
        close_reply(){
            this.openReply = false
        },
        save_current_row(e){
            this.current_row = e
        },
        pageChange(e){
            this.page = e
            this.getData()
        }
    },
    created(){
        this.getData()
    }
}
</script>
