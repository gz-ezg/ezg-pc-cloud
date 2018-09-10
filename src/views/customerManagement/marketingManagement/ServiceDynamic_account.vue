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
            <span class="expand-value">{{ row.account_begin_time }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">服务部门: </span>
            <span class="expand-value">{{ row.departname }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">服务会计: </span>
            <span class="expand-value">{{ row.server_realname }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">会计主管: </span>
            <span class="expand-value">{{ row.accmanager_realname }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">累计外勤数量: </span>
            <span class="expand-value">{{ row.legwork_valid_num }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">创建时间: </span>
            <span class="expand-value">{{ row.createdate }}</span>
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
        },
        // computer:{
        //     service_time(){
        //         return row.service_time/3600
        //     }
        // },
        created () {
            // console.log(row)
        }
    };
</script>