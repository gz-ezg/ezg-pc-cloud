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
            <span class="expand-value">{{ row.ordecode }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">开始时间: </span>
            <span class="expand-value">{{ row.servicestart }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">服务部门: </span>
            <span class="expand-value">{{ row.departname }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">服务会计: </span>
            <span class="expand-value">{{ row.serviceName }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">会计主管: </span>
            <span class="expand-value">{{ row.accserviceName }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">剩余时长: </span>
            <span class="expand-value">{{ row.workOrderRestTime }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">创建时间: </span>
            <span class="expand-value">{{ row.createDate }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">更新时间: </span>
            <span class="expand-value">{{ row.updatedate }}</span>
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