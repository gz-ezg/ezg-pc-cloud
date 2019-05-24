<template>
    <Modal
            v-model="openShowDetail"
            title="查看详情"
            width="880"

    >
        <div>
            <Card style="min-width:850px">
                <!--<Row style="margin-bottom:10px">
                    <search-model :data="searchData" @search="search"></search-model>
                </Row>
    -->
                <Row style="margin-top: 10px;">
                    <Table
                            :loading="loading"
                            highlight-row
                            size="small"
                            border
                            @on-row-click="select_row"
                            :columns="header"
                            :data="data"></Table>

                </Row>

            </Card>

        </div>
    </Modal>

</template>

<script>


    export default {
        props:["legworkId","legwork_finish_statusMap","taskKindMap"],
        components:{

        },
        data(){
            return {
                currentRow: {},
                loading: true,
                total: 0,
                data:[],
                openShowDetail:false,
                payDirMap:{},
                header: [
                    {
                        title: "任务名称",
                        key: 'task_name',
                        width: 120
                    },
                    {
                        title: "任务类型",
                        key: 'task_kind',
                        minWidth: 140
                    },{
                        title: "完成状态",
                        key: 'finish_status',
                        minWidth: 140
                    },
                    {
                        title: "公司名称",
                        key: "CompanyName",
                        minWidth: 140
                    },
                    {
                        title: "客户名称",
                        key: 'NAME',
                        minWidth: 120
                    },
                    {
                        title: "客户电话",
                        key: 'TEL',
                        minWidth: 120
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/user/legwork/detail'
                var config = {
                    params:{
                        legworkId:_self.legworkId
                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data
                    _self.loading = false

                    for(let i = 0; i < _self.data.length; i++){

                        _self.data[i].task_kind =  _self.taskKindMap.get(_self.data[i].task_kind);
                        _self.data[i].finish_status= _self.legwork_finish_statusMap.get(_self.data[i].finish_status);
                        console.log(_self.data[i]);
                    }
                })

            },
            search(){

            }
        },
        created(){
            let _self = this
            this.$bus.off("openShowDetail",false)
            this.$bus.on("openShowDetail",(e)=>{

             this.openShowDetail = true
          //  this.$GetDataCenter("payDirs",callback);
            _self.get_data();
           /* function  callback(e) {
                _self.payDirMap = _self.$array2map(e.data.data.payDirs)

            }*/
        })

        }
    }
</script>
