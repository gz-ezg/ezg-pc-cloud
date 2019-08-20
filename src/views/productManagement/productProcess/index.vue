<template>
    <div>
        <Card>
            <search-model :data="searchData" @search="search"></search-model>
            <ButtonGroup style="margin-top:10px">
                <Button @click="openUpload=true" type="primary">上传流程图</Button>
            </ButtonGroup>
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                ></Table>
                <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="page_change"
                    @on-page-size-change="page_size_change"
                    style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
            v-model="openUpload"
            width="300"
            title="上传流程压缩文件"
        >
            <Upload
                ref="upload"
                name="files"
                action="api/dataCenter/activiti/uploadBpmnInputStream"
                :show-upload-list="false"
                :on-success="handleUpload"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import * as processApi from './api.js'
import searchModel from '../../woa-components/searchModel/index'
export default {
    name: 'productProcess_index',
    components: {
        searchModel
    },
    data(){
        return {
            searchData: [
                {
                    label: "key：",
                    key: "key",
                    type: "input"
                },
            ],
            openUpload: false,
            page: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            data: [],
            header: [
                {
                    title: "序号",
                    type: 'index',
                    width: 90
                },
                {
                    title: 'REV',
                    key: 'REV_',
                    width: 90
                },
                {
                    title: 'CATEGORY',
                    key: 'CATEGORY_',
                    minWidth: 180
                },
                {
                    title: "name",
                    key: "NAME_",
                    minWidth: 120
                },
                {
                    title: "key",
                    key: 'KEY_',
                    minWidth: 180
                },
                {
                    title: "version",
                    key: 'VERSION_',
                    width: 120
                },
                {
                    title: "deploymentId",
                    key: 'DEPLOYMENT_ID_',
                    minWidth: 150
                },
                {
                    title: "resourceName",
                    key: 'RESOURCE_NAME_',
                    minWidth: 180
                },
                {
                    title: "dgrmResourceName",
                    key: 'DGRM_RESOURCE_NAME_',
                    minWidth: 180
                }
            ],
            formInline:{}
        }
    },
    methods: {
        search(e){
            Object.assign(this.formInline, e)
            this.page = 1
            this.get_data()
        },
        async handleUpload(response, file, fileList) {
            if(response.msgCode == 40000){
                this.$Message.success(response.msg)
                this.openUpload = false
            }else{
                this.$Message.error(response.msg)
            }
        },
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: this.pageSize
                }
            }

            Object.assign(config.params, this.formInline)

            let { rows, total } = await processApi.getActivitiTaskProcessList(config)
            this.total = total
            this.data = rows
            this.loading = false
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        page_size_change(e){
            this.pageSize = e
            this.get_data()
        }
    },
    created(){
        this.get_data()
    }
}
</script>