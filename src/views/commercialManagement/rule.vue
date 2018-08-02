<template>
    <div>
        <Card>
            <Tabs value="name1">
                <TabPane label="规则" name="name1">
                        <div style="padding:10px;">
                            <Row><h2 style="margin-bottom:5px;">1、逾期工单时长设定</h2></Row>
                            <Row>超过标准服务时长<Input style="width:60px;margin-left:5px;margin-right:5px"></Input>个工作日为逾期工单</Row>
                        </div>
                    <div style="padding:10px;">
                        <Row><h2 style="margin-bottom:5px;">2、严重逾期工单时长设定</h2></Row>
                        <Row>超过标准服务时长<Input style="width:60px;margin-left:5px;margin-right:5px"></Input>个工作日为严重逾期工单</Row>
                    </div>
                </TabPane>
            </Tabs>
            <div style="padding:10px;">
                <Button type="primary">确定</Button>
                <Button type="ghost" style="margin-left:20px" >取消</Button>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    name:'commercialRulemanagement'
}
</script>

