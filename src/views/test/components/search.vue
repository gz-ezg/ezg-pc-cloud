<template>
  <div>
    <Poptip
        style="float: right;margin-right:20px"
        placement="bottom-end"
        width="700"
        title="筛选" 
    >
        <Button type="text" size="large" icon="funnel">筛选</Button>
        <div slot="content">
            <Form ref="formInline" :model="formInline" :label-width="120">
                <Row>
                    <Col span="12">
                        <FormItem prop="company" label="公司名称：">
                            <Input type="text" v-model="formInline.CompanyName" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="corporation" label="法人：">
                            <Input type="text" v-model="formInline.legalrepresentative" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="importLevelText" label="重要等级：">
                            <Select transfer v-model="formInline.importlevel">
                                <Option value="highest">最高</Option>
                                <Option value="higher">较高</Option>
                                <Option value="normal">一般</Option>
                                <Option value="less">普通</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="attr" label="归属客户：">
                            <Input type="text" v-model="formInline.NAME" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="tel" label="客户电话：">
                            <Input type="text" v-model="formInline.TEL" placeholder="">
                            </Input>
                        </FormItem>                       
                    </Col>
                    <Col span="12">
                        <FormItem prop="tel" label="客户电话：">
                            <Input type="text" v-model="formInline.tel" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="area" label="区域：">
                            <Input type="text" v-model="formInline.area" placeholder="">
                            </Input>
                        </FormItem>                      
                    </Col>
                    <Col span="12">
                        <FormItem prop="user" label="年度纳税评级：">
                            <Input type="text" v-model="formInline.financelevel" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem prop="createTime" label="创建时间：">
                    <DatePicker type="daterange" style="width:215px" v-model="formInline.dateStart"></DatePicker>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem prop="creator" label="创建人：">
                            <Input type="text" v-model="formInline.CreateBy" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="update" label="跟进人：">
                            <Input type="text" v-model="formInline.followby" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="updateTime" label="更新时间：">
                            <DatePicker type="daterange" style="width:215px" v-model="formInline.UpdateStart"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button type="primary">搜索</Button>
                    <Button type="ghost" style="margin-left:20px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </Poptip>
  </div>
</template>

<script>
export default {
    data(){
        return{
            formInline: {
                    company: '',
                    corporation: '',
                    importLevelText: '',
                    att: '',
                    tel: '',
                    area: '',
                    user: '',
                    creator: '',
                    update: '',
                    dateStart: '',
                    dateEnd: '',
                    UpdateStart: '',
                    UpdateEnd: ''
                }
        }
    }
}
</script>

