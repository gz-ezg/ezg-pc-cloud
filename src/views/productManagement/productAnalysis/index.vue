<template>
    <div style="min-width:700px">
        <Row :gutter="16">
            <Col span="24"><history-data></history-data></Col>
            <!-- <Col span="12"></Col> -->
        </Row>
        <Row :gutter="16">
            <Col span="24"><finish></finish></Col>
        </Row>
        <Row :gutter="16">
            <Col span="24"><end></end></Col>
        </Row>
        <Row :gutter="16">
            <Col span="24"><irate></irate></Col>
        </Row>
        <Row :gutter="16">
            <Col span="24"><place-analysis></place-analysis></Col>
        </Row>
    </div>
</template>

<script>
    import historyData from './components/historyData'
    import finish from './components/finish'
    import end from './components/end'
    import irate from './components/irate'
    import placeAnalysis from './components/placeAnalysis'
    export default {
        name: "productAnalysis",
        components:{
            historyData,
            finish,
            end,
            irate,
            placeAnalysis
        }
    }
</script>

<style>

</style>