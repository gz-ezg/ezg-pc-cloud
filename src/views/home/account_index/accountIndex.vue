<template>
    <div style="min-width:1000px">
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        工作进度分析
                    </p>
                    <div class="data-source-row">
                        <!-- <classic></classic> -->
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        工作量分析
                    </p>
                    <div class="data-source-row">
                        <!-- <attitude></attitude> -->
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        业务分析图
                    </p>
                    <div class="data-source-row">
                        <!-- <classic></classic> -->
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        新增/下线客户统计
                    </p>
                    <div class="data-source-row">
                        <!-- <attitude></attitude> -->
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
