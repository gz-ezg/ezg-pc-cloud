<template>
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
        <Row>
            <Button type="primary" @click="downloadExcel">导出excel</Button>
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
                show-elevator
                :current.sync="page"
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
        <!-- <create-file @update="get_data"></create-file> -->
        <!-- <create-request></create-request> -->
    </Card>
</template>

<script>
import common from './common.js'

export default {
    mixins: [common],
    created(){
        this.get_data()
    }
}
</script>
