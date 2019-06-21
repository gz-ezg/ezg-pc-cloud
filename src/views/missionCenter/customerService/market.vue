<template>
    <div>
        <Form ref="newMission" :model="data" :label-width="100" style="margin-left:50px;margin-right:50px">
            <div v-if="data.length!==0" v-for="item in data">
                <Row :gutter="12">
                    <Col span="8">
                        <FormItem label="公司名称">
                            <Input  v-model="item.CompanyName" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="回访任务">
                            <Input  v-model="item.task_name" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="评分">
                            <Input  v-model="item.serviceranks" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div v-if="data.length==0">
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem style="text-align: center">
                            {{noData}}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "market",
        props:{
            data:{
                type: [Array, Object, String]
            }
        },
        data(){
            return{
                noData:"暂无数据......"
            }
        },
        methods:{

        },
        created() {
        }
    }
</script>

<style>

</style>