<style scoped>
    .expand-row {
        margin-bottom: 110px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">订单号: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.ordercode }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">开始时间: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.ServiceStart|DateFormat }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">服务部门: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.departname }}</span></Col>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">服务人: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.servername }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">状态: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.workOrderStatus }}</span></Col>
            </Col>
            <!-- <Col span="8">
            <span class="expand-key">剩余结点: </span>
            <span class="expand-value">{{ row.restPoint }}</span>
            </Col> -->
        </Row>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">创建时间: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.CreateDate|DateFormat }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">更新时间: </span></Col>
                <Col span="14"><span class="expand-value">{{ row.UpdateDate|DateFormat }}</span></Col>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        filters:{
            DateFormat(val){
                if(val){
                    return val.slice(0,10)
                }
            }
        }
    };
</script>