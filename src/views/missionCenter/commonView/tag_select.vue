<template>
    <div>
        <Modal
            v-model="openTag"
            width="400"
            title="选择标签"
            id="top"
        >
            <Table
                border
                ref="selection"
                :columns="header"
                :data="data"
                @on-select-cancel="select_cancel"
                @on-select="select_change"
                ></Table>
            <Page
                size="small"
                :total="total"
                :current.sync="page"
                show-total
                show-elevator
                @on-change="page_change"
                style="margin-top: 10px"></Page>
            <div slot="footer">
                <Button type="primary" @click="openTag=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openTag: false,
            header: [
                {
                    type: "selection",
                    width: 60,
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
            pageSize: 10,
            selectTagArray: []
        }
    },
    methods: {
        select_cancel(all,row){
            this.selectTagArray.splice(this.selectTagArray.indexOf(row.id),1)
        },
        select_change(all,row){
            this.selectTagArray.push(row.id)
        },
        page_change(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            let url = `api/system/label/list`

            let config = {
                params: {
                    page: _self.page,
                    pageSize: 10,
                }
            }

            function success(res){
                _self.data = []
                for(let i = 0; i<res.data.data.rows.length;i++){
                    if(_self.selectTagArray.includes(res.data.data.rows[i].id)){
                        res.data.data.rows[i]._checked = true
                    }
                    _self.data.push(res.data.data.rows[i])
                }
                _self.total = res.data.data.total
            }
            this.$Get(url, config, success)
        }
    },
    created(){
        let _self = this
        this.$bus.on("OPEN_TAG", (e)=> {
            _self.page = 1
            _self.selectTagArray = []
            //  必须为一个id数组
            // if(!e){
            //     e = []
            // }
            _self.selectTagArray = e
            console.log(_self.selectTagArray)
            _self.get_data()
            _self.openTag = true
        })
    }
}
</script>

<style>
#top .ivu-modal-mask{
    z-index: 9999
}
#top .ivu-modal-wrap{
    z-index: 9999
}
</style>


