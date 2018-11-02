<template>
    <div>
        <Modal
            v-model="openYag"
            title="添加标签"
        >
            <Table
                border
                ref="selection"
                :columns="header"
                :data="data"
                @on-select-cancel="select_cancel"
                @on-selection-change="select_change"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-elevator
                @on-change="page_change"
                style="margin-top: 10px"></Page>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openYag: false,
            header: [
                {
                    type: "selection",
                    minWidth: 60,
                    align: "center"
                },
                {
                    title: "标签",
                    key: "labelName"
                }
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10
        }
    },
    methods: {
        select_cancel(){

        },
        select_change(){

        },
        page_change(){

        },
        get_data(){

        }
    }
}
</script>

