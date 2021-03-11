<template>
    <Modal
        title="客户日志"
        v-model="isOpenPoolLog"
        width="90%"
    >
        <Row><center><h2>客户名称：{{customerName}}</h2></center></Row>
          <Row style="margin-top: 10px;">
            <Table
                    highlight-row
                    size="small"
                    :columns="columns"
                    :data="data"
                    :loading = "loading"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    data(){
        return{
            isOpenPoolLog: false,
            loading: false,
            page: 1,
            pageSize: 10,
            columns: [
                {
                    title:"源公海",
                    key:"srcPool",
                    minWidth: 100
                },
                {
                    title:"公海类型",
                    key: "srcSubPool",
                    minWidth: 100
                },
                {
                    title:"转移后公海",
                    key:"desPool",
                    minWidth: 100
                },
                {
                    title:"公海类型",
                    key: "desSubPool",
                    minWidth: 100
                },
                {
                    title: "落入类型",
                    key:"fallType",
                    minWidth: 150
                },
                {
                    title: "变更时间",
                    key:"createDate",
                    minWidth: 150
                },
                {
                    title: "操作人",
                    key: "userName",
                    minWidth: 150
                }
            ],
            data: [],
            pageTotal: 0,
            poolId: "",
            customerName:"",
            fall_type_map: new Map(),
            pool_type_map: new Map(),
            pool_sub_type_map: new Map(),
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.get_data()
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = `api/customer/public/pool/recordList`
            let config = {
                params:{
                    page: _self.page,
                    pageSize: _self.pageSize,
                    poolId: _self.poolId
                }
            }

            function success(res){
                _self.isOpenPoolLog = true;
                _self.loading = false;
                _self.data = res.data.data.rows;
                _self.pageTotal = res.data.data.total;

                console.log( _self.pool_type_map);

                for (let i = 0; i < _self.data.length; i++) {
                    
                    
                    
                   _self.data[i].srcPool = _self.pool_type_map.get(
                      _self.data[i].srcPool.toString()
                    );

                    _self.data[i].srcSubPool = _self.pool_sub_type_map.get(
                      _self.data[i].srcSubPool.toString()
                    );

                    _self.data[i].desPool = _self.pool_type_map.get(
                      _self.data[i].desPool.toString()
                    );

                    _self.data[i].desSubPool = _self.pool_sub_type_map.get(
                      _self.data[i].desSubPool.toString()
                    );

                    _self.data[i].fallType = _self.fall_type_map.get(
                      _self.data[i].fallType.toString()
                    );
                }
                
            }

            this.$Get(url, config, success)
        },
        get_data_center() {
            let _self = this
            return new Promise((resolve, reject) => {
                let _self = this
                
                let params = "fallType,poolType,poolSubType";
                function success(res) {
                _self.fallType = res.data.data.fallType;
                _self.poolType = res.data.data.poolType;
                _self.poolSubType = res.data.data.poolSubType;

                _self.fall_type_map = _self.$array2map(_self.fallType);
                _self.pool_type_map = _self.$array2map(_self.poolType);
                _self.pool_sub_type_map = _self.$array2map(_self.poolSubType);
                resolve()
                }
                this.$GetDataCenter(params, success)
            })
    },
    },
    created(){
        let _self = this
        this.$bus.off("Open_Pool_Record",true)
        this.$bus.on("Open_Pool_Record",(e)=>{
            console.log('Ye open pool record im in...');
            _self.poolId = e.ID ;
            _self.customerName = e.NAME;
            _self.get_data_center().then(()=>{
                _self.get_data()
            })
        })
    }
}
</script>

