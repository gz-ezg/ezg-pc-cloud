<style lang="less">
    @import "../home.less";
    @import "../../../styles/common.less";
</style>

<template>
    <div style="min-width:900px">
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        客户统计
                    </p>
                    <div class="data-source-row">
                        <c-statistical></c-statistical>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        跟进中客户统计
                    </p>
                    <div class="data-source-row">
                        <fl-statistical></fl-statistical>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        客户成交数量
                    </p>
                    <div class="data-source-row">
                        <ctotall-statistical></ctotall-statistical>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        近半年收款统计
                    </p>
                    <div class="data-source-row">
                        <lyear-statistical></lyear-statistical>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        最新30天新增客户
                    </p>
                    <div class="data-source-row">
                        <lastcreate-table></lastcreate-table>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        近30天成交
                    </p>
                    <div class="data-source-row">
                        <lastfinish-table></lastfinish-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import cStatistical from './cStatistical.vue';
    import flStatistical from './flowingCustomer.vue';
    import ctotallStatistical from './customerfinsh.vue';
    import lyearStatistical from './lastfinish.vue';
    import lastfinishTable from './lastfinishTable.vue';
    import lastcreateTable from './lastcreateTable.vue';

    export default {
        name: 'cannelIndex_index',
        components: {
            cStatistical,
            flStatistical,
            lyearStatistical,
            ctotallStatistical,
            lastfinishTable,
            lastcreateTable
        }
    }
</script>