<template>
    <div>
        <Modal
                v-model="openDetail"
                :title="title"
                :mask-closable="false"
                width="100"
        >
            <Row>
                <Form ref="detail" :model="detail" :label-width="100" :rules="detailRule">
                    <Row>
                        <Col span="4">
                            <FormItem label="姓名：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="电子邮件：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="入职时间：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="是否劳动合同：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="适用底薪：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="联系方式：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="婚姻状况：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="工行账号：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="开户行地址：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="入职年月数：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="是否试用：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="试用绩效：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="员工状态：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="最高学历：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="所在省份：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="部门：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="合同期限：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="转正时间：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="转正底薪：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="身份证号：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="专业：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="职位：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="性别：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="试用绩效：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="是否员工手册：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="转正绩效：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="备注：" prop="CompanyName">
                                <Input size="small" v-model="detail.CompanyName" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="上传图片">
                                <center>
                                    <Upload
                                            Upload
                                            multiple
                                            type="drag"
                                            ref="upload"
                                            :before-upload="handleUpload"
                                            action="/api/customer/addCustomerContentImg"
                                    >
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                                    </Upload>
                                    <div v-for="(item,index) in srcList" :key="index">
                                        <img :src="item" class="common">
                                        <!--{{ item.name }}-->
                                        <Button type="text" @click="fileRemove(item)">移除</Button>
                                    </div>
                                </center>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="save">保存</Button>
                <Button @click="openDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "detail",
        data(){
            return{
                detail:{},
                file:[],
                openDetail:false,
                detailRule:[],
                title:"",
                srcList:[]
            }
        },
        methods:{
            save(){

            },
            handleUpload(file) {
                let self = this
                self.file.push(file);
                console.log(self.file)
                self.srcList = []
                for (let i=0;i<self.file.length;i++){
                    let files = self.file[i]
                    if (!event || !window.FileReader) return
                    let reader = new FileReader();
                    reader.readAsDataURL(files)
                    reader.onloadend = function () {
                        console.log(this.result)
                        self.srcList.push(this.result);
                    }
                }

                return false;
            },
            fileRemove(e) {
                this.file.splice(this.file.indexOf(e), 1);
                this.srcList.splice(this.srcList.indexOf(e), 1);
            },

        },
        created() {
            this.$bus.off("ADD_EMPLOY_INFO",true)
            this.$bus.on("ADD_EMPLOY_INFO",e=>{
                this.openDetail = true
                this.title = "新增员工"
            })
            this.$bus.off("SHOW_EMPLOY_INFO",true)
            this.$bus.on("SHOW_EMPLOY_INFO",e=>{
                this.openDetail = true
                this.title = "查看"
            })
            this.$bus.off("EDIT_EMPLOY_INFO",true)
            this.$bus.on("EDIT_EMPLOY_INFO",e=>{
                this.openDetail = true
                this.title = "修改信息"
            })
        }
    }
</script>

<style>
.common{
    width: 148px;
    height: 148px;
    border: 1px solid #d8d8d9;
}
</style>