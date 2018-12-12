<template>
    <div>
        <Tabs v-model="tabIndex">
            <TabPane label="部门" name="1">
                <user-tab :bcreatedate="bcreatedate" :ecreatedate="ecreatedate"></user-tab>
            </TabPane>
            <TabPane label="个人" name="2">
                <depart-tab :bcreatedate="bcreatedate" :ecreatedate="ecreatedate"></depart-tab>
            </TabPane>
            <DatePicker type="daterange"  placeholder="选择日期" style="width: 200px" size="small" transfer @on-change="change" slot="extra"></DatePicker>
        </Tabs>
    </div>
</template>

<script>
import departTab from "./departTab";
import userTab from "./userTab";

export default {
    components: {
        departTab,
        userTab
    },
    data(){
        return {
            tabIndex: "1",
            bcreatedate: '',
            ecreatedate: ''
        }
    },
    methods:{
        change(date,type){
            this.bcreatedate = date[0]
            this.ecreatedate = date[1]
        }
    }
}
</script>
