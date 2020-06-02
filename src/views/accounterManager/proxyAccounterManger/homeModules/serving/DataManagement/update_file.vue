<template>
    <div>
        <Modal
            v-model="openUpdateFiles"
            :transfer="false"
            width="400"
            title="修改资料详情"
        >
            <Tag type="border" color="blue" style="margin-bottom:10px">温馨提示：只开放修改文件名称，存放区域及地点</Tag>
            <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                <Row :gutter="16">
                        <FormItem prop="companyname" label="公司名称：">
                            <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="" readonly>
                            </Input>
                        </FormItem>
                                    <FormItem prop="customer_file_name" label="文件名称：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.customer_file_name" placeholder="">
                                        </Input>
                                    </FormItem>
                                    <FormItem prop="storage" label="区域：">
                                        <Select type="text" size="small" v-model="seacrhFormInline.storage" placeholder="">
                                            <Option v-for="(item, index) in customer_f_s_a" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                    <FormItem prop="storage_code" label="地点：">
                                        <Input type="text" size="small" v-model="seacrhFormInline.storage_code" placeholder="">
                                        </Input>
                                    </FormItem>
                            </Row>
                        </Form>
                    <div slot="footer">
                        <Button type="primary" @click="update" :loading="loading">修改</Button>
                    </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
        customer_f_s_a: {
            type: [String, Array],
            default: []
        }
    },
    data(){
        return {
            openUpdateFiles: false,
            seacrhFormInline: {
                id: "",
                companyname: "",
                customer_file_name: "",
                storage: "",
                storage_code: ""
            },
            loading: false
        }
    },
    created(){
        this.$bus.off("OPEN_UPDATE_FILE", true)
        this.$bus.on("OPEN_UPDATE_FILE", (e)=>{
            this.seacrhFormInline = e
            this.openUpdateFiles = true
        })
    },
    methods:{
        update(){
            let url = `api/customer/file/updateCustomerFile`
            let _self = this
            _self.loading = true
            let config = {
                id: _self.seacrhFormInline.id,
                customerFileName: _self.seacrhFormInline.customer_file_name,
                storage: _self.seacrhFormInline.storage,
                storageCode: _self.seacrhFormInline.storage_code
            }

            function success(res){
                _self.openUpdateFiles = false
                _self.$bus.emit("update",true)
                _self.seacrhFormInline.id = ""
                _self.seacrhFormInline.companyname = ""
                _self.seacrhFormInline.customer_file_name = ""
                _self.seacrhFormInline.storage = ""
                _self.seacrhFormInline.storage_code = ""
                _self.loading = false
            }
            
            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    }
}
</script>

