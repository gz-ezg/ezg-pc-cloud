<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="8">
            <span class="expand-key">订单号: </span>
            <span class="expand-value">{{ row.ordercode }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">开始时间: </span>
            <span class="expand-value">{{ row.ServiceStart }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">服务部门: </span>
            <span class="expand-value">{{ row.departname }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">服务人: </span>
            <span class="expand-value">{{ row.servername }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">状态: </span>
            <span class="expand-value">{{ row.workOrderStatus }}</span>
            </Col>
            <!-- <Col span="8">
            <span class="expand-key">剩余结点: </span>
            <span class="expand-value">{{ row.restPoint }}</span>
            </Col> -->
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">创建时间: </span>
            <span class="expand-value">{{ row.CreateDate }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">更新时间: </span>
            <span class="expand-value">{{ row.UpdateDate }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>