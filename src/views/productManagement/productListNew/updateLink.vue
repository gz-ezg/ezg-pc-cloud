<template>
    <div>
        <Modal
            title="修改产品流程对应关系"
            :value="true"
            width="600"
            @on-cancel="close"
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="产品名称" prop="product">
                    <Input v-model="product.product" readonly></Input>
                </FormItem>
                <FormItem label="产品Id" prop="productid">
                    <Input v-model="formValidate.productid" readonly></Input>
                </FormItem>
                <FormItem label="skuid" prop="skuid">
                    <Input v-model="formValidate.skuid" readonly></Input>
                </FormItem>
                <FormItem label="processid" prop="processid">
                    <Input v-model="formValidate.processid" @on-focus="openProcessList=true"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="submitLoading">修改</Button>
                <Button @click="close" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="openProcessList"
            width="900"
            title="选择流程图"
        >
            <Row style="margin-top: 10px;">
                <Table
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
                    :loading="loading"
                    @on-row-dblclick="select"
                ></Table>
                <Page
                    size="small"
                    :total="total"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="page_change"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import * as productApi from './api.js'
import * as flowChartApi from '../flowChart/api.js'
export default {
    props:{
        skuId: {
            type: [String, Number]
        },
        product: {
            type: [Object, String]
        }
    },
    data(){
        return {
            total: 0,
            header: [
                {
                    title: 'id',
                    key: 'id',
                    width: 90
                },
                {
                    title: "shortname",
                    key: 'shortname',
                    minWidth: 120
                },
                {
                    title: 'processKey',
                    key: 'processKey',
                    minWidth: 150
                },
                {
                    title: 'processType',
                    key: 'processType',
                    minWidth: 120
                },
                {
                    title: 'processArea',
                    key: 'processArea',
                    minWidth: 120
                },
                {
                    title: 'memo',
                    key: 'memo',
                    minWidth: 200       
                }
            ],
            data: [],
            page: 1,
            submitLoading: false,
            formValidate: {
                productid: "",
                skuid: "",
                processid: ""
            },
            openProcessList: false
        }
    },
    methods: {
        async submit(){
            if(!this.formValidate.productid){
                this.$Message.warning("请补全processId！")
                return false
            }
            this.submitLoading = true
            let _self = this
            // let config = {

            // }
            let {status, data} = await productApi.postModifyProductSkuFlowDiagram(this.formValidate)
            if(status){
                this.close()
            }
            this.submitLoading = false
        },
        close(){
            this.$emit("update")
        },
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    page: this.page,
                    pageSize: 10
                }
            }
            try {
                let {rows, total} = await flowChartApi.getProductSkuFlowDiagramList(config)
                this.data = rows
                this.total = total
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        select(e){
            this.formValidate.processid = e.id
            this.openProcessList = false
        }
    },
    mounted(){
        if(!this.skuId){
            this.$Message.warning("无效的skuId")
            this.close()
            return false
        }

        this.formValidate.skuid = this.skuId
        this.formValidate.productid = this.product.id
        this.get_data()
    }
}
</script>
