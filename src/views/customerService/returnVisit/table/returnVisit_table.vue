<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未处理" name="name1">
                <Untreated :hfwtlxMap="hfwtlx_map" :departAliasMap="return_visit_depart_map" :hfztMap="hfzt_map" :departAlias="return_visit_depart" @edit="open_edit" @show="open_show"></Untreated>
            </TabPane>
            <TabPane label="已处理" name="name2">
                <processed :hfwtlxMap="hfwtlx_map" :departAliasMap="return_visit_depart_map" :departAlias="return_visit_depart" :hfztMap="hfzt_map" @edit="open_edit" @show="open_show"></processed>
            </TabPane>
        </Tabs>
        <edit @close="openEdit=false" :data="data" v-if="openEdit" :hfwtlx="hfwtlx" :hfzt="hfzt" :hfwtlxMap="hfwtlx_map" :departAliasMap="return_visit_depart_map" :departAlias="return_visit_depart" :hfztMap="hfzt_map"></edit>
        <show v-if="openShow" @close="openShow=false" :data="data" :hfwtlx="hfwtlx" :hfzt="hfzt" :hfwtlxMap="hfwtlx_map" :departAliasMap="return_visit_depart_map" :departAlias="return_visit_depart" :hfztMap="hfzt_map"></show>        
    </div>
</template>

<script>
    import Untreated from './untreated.vue'
    import Processed from './processed.vue'
    import edit from './edit.vue'
    import show from './show.vue'

    export default {
        name:'returnWorkOrder_index',
        components:{
            Untreated,
            Processed,
            edit,
            show
        },
        data(){
            return{
                data: "",
                openEdit: false,
                openShow: false,
                hfwtlx:[],
                hfzt:[],
                return_visit_depart:[],
                hfwtlx_map:new Map(),
                hfzt_map:new Map(),
                return_visit_depart_map:new Map()
            }
        },
        methods:{
            getDataCenter(){
                let _self = this

                let params = "hfwtlx,hfzt,return_visit_depart"	

                function finish(res){
                    _self.hfwtlx = res.data.data.hfwtlx
                    _self.hfzt = res.data.data.hfzt
                    _self.return_visit_depart = res.data.data.return_visit_depart
                    _self.hfwtlx_map = _self.$array2map(_self.hfwtlx)
                    _self.hfzt_map = _self.$array2map(_self.hfzt)
                    _self.return_visit_depart_map = _self.$array2map(_self.return_visit_depart)
                }
                this.$GetDataCenter(params, finish)
            },
            open_edit(e){
                this.data = e
                this.openEdit = true
            },
            open_show(e){
                this.data = e
                this.openShow = true
            }
        },
        created(){
            this.getDataCenter()
        }
    }
</script>

