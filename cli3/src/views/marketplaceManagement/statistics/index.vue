<template>
    <div style="min-width:700px">
        <Row :gutter="16">
            <Col span="24"><history-data></history-data></Col>
            <!-- <Col span="12"></Col> -->
        </Row>
        <Row :gutter="16">
            <Col span="24"><finish></finish></Col>
        </Row>
        <Row>
            <Col span="12">
                <Card>
                    <p slot="title">
                        <Icon type="android-map"></Icon>
                        客户来源分析
                    </p>
                    <classic></classic>
                </Card>
            </Col>
            <Col span="12">
                <Card>
                    <p slot="title">
                        <Icon type="android-map"></Icon>
                        渠道价值分析
                    </p>
                    <attitude></attitude>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import historyData from './components/historyData'
import finish from './components/finish'
import classic from './components/classic'
import attitude from './components/attitude'

export default {
    name: 'statistics_index',
    components:{
        historyData,
        finish,
        classic,
        attitude
    },
    data(){
        return{

        }
    }
}
</script>
