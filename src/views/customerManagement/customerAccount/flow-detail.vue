<style>

</style>

<template>
    <div>
        <div >
            <Row class="expand-row">
                <Col span="8">
                    <span class="expand-key">Job: </span>
                    <span class="expand-value">{{ row.id }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Interest: </span>
                    <span class="expand-value">{{ row.id }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Birthday: </span>
                    <span class="expand-value">{{ row.id }}</span>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <span class="expand-key">Favorite book: </span>
                    <span class="expand-value">《{{ row.id }}》</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Favorite movie: </span>
                    <span class="expand-value">{{ row.id }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">Favorite music: </span>
                    <span class="expand-value">{{ row.id }}</span>
                </Col>
            </Row>
        </div>    
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        }
    };
</script>