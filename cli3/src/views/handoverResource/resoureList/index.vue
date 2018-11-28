<template>
    <div>
        <Tabs value="name1" v-if="loading">
            <TabPane label="正常" name="name1">
                <normal :customer_file_s="customer_file_s_map" :customer_f_s_a="customer_f_s_a_map" type="'normal','lock'"></normal>
            </TabPane>
            <TabPane label="注销" name="name2">
                <lock :customer_file_s="customer_file_s_map" :customer_f_s_a="customer_f_s_a_map" type="'logout'"></lock>
            </TabPane>
            <TabPane label="移交客户" name="name3">
                <customer :customer_file_s="customer_file_s_map" :customer_f_s_a="customer_f_s_a_map" type="'out_t_c'"></customer>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all :customer_file_s="customer_file_s_map" :customer_f_s_a="customer_f_s_a_map"></all>
            </TabPane>
        </Tabs>
        <Spin size="large" fix v-else></Spin>
        <file-log :customer_f_s_a="customer_f_s_a_map"></file-log>
        <update-file :customer_f_s_a="customer_f_s_a"></update-file>
    </div>
</template>

<script>
import fileLog from './file_log'
import updateFile from './update_file';

import all from "./components/all";
import customer from "./components/customer";
import lock from "./components/lock";
import normal from "./components/normal";

export default {
    name: 'resourelist_index',
    components:{
        fileLog,
        updateFile,
        all,
        customer,
        lock,
        normal
    },
    data(){
        return {
            loading: false,
            customer_file_s: [],
            customer_file_s_map: new Map(),
            customer_f_s_a: [],
            customer_f_s_a_map: new Map()
        }
    },
    methods: {
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject) => {
                let params = "customer_file_s,customer_f_s_a"
                function success(res){
                    resolve()
                    _self.customer_file_s = res.data.data.customer_file_s
                    _self.customer_file_s_map = _self.$array2map(_self.customer_file_s)
                    // console.log(_self.customer_file_s_map)
                    _self.customer_f_s_a = res.data.data.customer_f_s_a
                    _self.customer_f_s_a_map = _self.$array2map(_self.customer_f_s_a)
                }
                _self.$GetDataCenter(params, success)

            })
        },
    },
    created(){
        this.get_data_center().then(()=>{
            this.loading = true
        })
    }
}
</script>
