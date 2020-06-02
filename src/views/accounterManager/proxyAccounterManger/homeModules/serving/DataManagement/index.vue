<template>
    <Modal
            title="资料管理"
            v-model="openDetailMission"
            width="1000"
            :mask-closable="false"
    >
        <Card>
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1">
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <!-- <div slot="content">
                            111111
                        </div> -->
                        <!-- <Search slot="content"></Search> -->
                        <div  slot="content" @keydown.enter="search">
                            <Form ref="seacrhFormInline" :model="seacrhFormInline" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem prop="companyname" label="公司名称：">
                                            <Input type="text" size="small" v-model="seacrhFormInline.companyname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="tel" label="文件名称：">
                                            <Input type="text" size="small" v-model="seacrhFormInline.file_type_name" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem prop="companyname" label="保管人：">
                                            <Input type="text" size="small" v-model="seacrhFormInline.keeperrealname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem prop="companyname" label="保管部门：">
                                            <Input type="text" size="small" v-model="seacrhFormInline.departname" placeholder="">
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
                >
                </Table>
                <Page
                        placement="top"
                        size="small"
                        :total="total"
                        show-total
                        :current.sync="page"
                        show-elevator
                        @on-change="pageChange"
                        style="margin-top: 10px"></Page>
            </Row>
            <Modal
                    title="注销资料"
                    v-model="openLogout"
                    width="500"
            >
                <Row :gutter="20" style="margin-bottom:10px"><h3><center>{{selectRow.companyname}}</center></h3></Row>
                <Row :gutter="20" style="margin-bottom:10px"><h3><center>{{selectRow.customer_file_name}}</center></h3></Row>
                <Row :gutter="20" style="margin-bottom:10px">
                    <Input type="textarea" :rows="4" placeholder="请填写注销原因！" v-model="logoutReason"></Input>
                </Row>

                <div slot="footer">
                    <Button type="warning" @click="confirm_logout" long :loading="logoutLoading" :disabled="disabled">注销</Button>
                </div>
            </Modal>
            <file-log :customer_f_s_a="customer_file_s_map"></file-log>
            <update :customer_f_s_a="customer_file_s"></update>
        </Card>
    </Modal>
</template>

<script>
    import common from './common.js'
    import FileLog from './file_log'
    import Update from './update_file'
    export default {
        name: "index",
        mixins: [common],
        components:{
            FileLog,
            Update
        },
        data(){
            return{
                openDetailMission:false
            }
        },
        created(){
            this.$bus.on("OPEN_DATA_MANAGEMENT",(e)=>{
                this.companyId = e.company_id
                this.get_data_center().then(
                    () => {
                        if(localStorage.getItem('id')==10059){
                            this.header.push(this.adminHeader)
                        }
                        this.get_data()
                    }
                )
                this.openDetailMission = true
            })
            this.$bus.on("update",e=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>