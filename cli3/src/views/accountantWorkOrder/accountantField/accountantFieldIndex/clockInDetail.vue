<template>
    <div>
        <Modal
                v-model="showclockindetail"
                title="查看"
                width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="公司：">
                            <Input size="small" type="text" v-model="row.companyname" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户：">
                            <Input size="small" type="text" v-model="row.name" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户电话：">
                            <Input size="small" type="text" v-model="row.tel" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务人：">
                            <Input size="small" type="text" v-model="row.serverrealname" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="打卡类型：">
                            <Input size="small" type="text" v-model="row.type" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务时长：">
                            <Input size="small" type="text" v-model="row.service_timestamp" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="打卡开始时间：">
                            <Input size="small" type="text" v-model="row.begin_time" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="打卡结束时间：">
                            <Input size="small" type="text" v-model="row.end_time" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="24">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="companyName" label="打卡地址：">
                            <Input size="small" type="text" v-model="row.begin_address[0].name" placeholder="" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="showclockindetail=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                showclockindetail:false,
                row: {
                    begin_address:[{name:""}]
                },
                task_message:{
                    companyName:''
                }
            }
        },
        created(){
            var _self = this
            Bus.$on('showclockindetail',(e)=>{
                _self.showclockindetail = true
                _self.row = e
            })
        }
    }
</script>
