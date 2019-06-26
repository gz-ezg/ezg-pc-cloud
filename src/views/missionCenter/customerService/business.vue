<template>
    <div>
        <Form ref="newMission" :model="data" :label-width="100" style="margin-left:50px;margin-right:50px">
            <div v-if="data.length!==0" v-for="item in data">
                <Row :gutter="12">
                    <Col span="8">
                        <FormItem label="公司名称">
                            <div :title=item.CompanyName  class="s1">{{item.CompanyName}}</div>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="回访任务">
                            <div :title=item.task_name  class="s1">{{item.task_name}}</div>
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
        name: "business",
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

        }
    }
</script>

<style>
    .s1{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>