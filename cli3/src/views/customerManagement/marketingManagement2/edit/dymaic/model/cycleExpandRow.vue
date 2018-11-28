<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">订单号: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.ordercode }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">开始时间: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.account_begin_time|DateFormat }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">服务部门: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.departname }}</span></Col>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">服务会计: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.server_realname }}</span></Col>
            </Col>
            <!-- <Col span="8">
            <span class="expand-key">会计主管: </span>
            <span class="expand-value">{{ row.accmanager_realname }}</span>
            </Col> -->
            <Col span="8">
                <Col span="10"><span class="expand-key">累计外勤数量: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.dljz_legwork + row.kjdj_legwork }}</span></Col>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <Col span="10"><span class="expand-key">创建时间: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.createdate|DateFormat }}</span></Col>
            </Col>
            <Col span="8">
                <Col span="10"><span class="expand-key">更新时间: </span></Col>
                <Col span="10"><span class="expand-value">{{ row.updatedate|DateFormat }}</span></Col>
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