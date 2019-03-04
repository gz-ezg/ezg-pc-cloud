<template>
    <div>
        <Form :model="formItem" :label-width="120">
            <FormItem label="产品名称">
                <Input v-model="formItem.product" size="small" style="width:100%" readonly></Input>
            </FormItem>
            <FormItem label="赠送数量">
                <Input v-model="formItem.givethenumber" size="small" style="width:100%" @on-blur='change_givenumber'></Input>
            </FormItem>
            <!-- <FormItem label="单价/月">
                <Input v-model="formItem.unitprice" size="small" style="width:100%"></Input>
            </FormItem> -->
            <FormItem label="服务开始税期">
                <DatePicker 
                    :disabled="formItem.iscycle==='N'" 
                    style="width:100%" 
                    type="month" 
                    :value="formItem.servicestartdate" 
                    transfer 
                    size="small"
                    @on-change="change_month"
                    ></DatePicker>
            </FormItem>
            <FormItem label="服务部门">
                <Select :value="formItem.departid" style="width:100%" label-in-value @on-change="change_depart">
                    <Option  v-for="(item, index) in servicedeparts" :value="item.type" :key="index" transfer>{{item.text}}</Option>
                </Select>
            </FormItem>
            <FormItem label="备注">
                <Input style="width:100%" v-model="formItem.memo" size="small" type='textarea'></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="change" :disabled="index===''">修改属性</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: [Object, String]
        }
    },
    data() {
        return {
            formItem: {},
            index: '',
            servicedeparts: []
        }
    },
    methods: {
        change() {
            this.$emit('change', {
                index: this.index,
                item: this.formItem
            })
        },
        item_change(){
            this.formItem = this.item.row ? this.item.row : {}
            this.formItem.departid = this.formItem.departid.toString()
            this.servicedeparts = JSON.parse(this.formItem.servicedeparts)
            let reg = new RegExp("</br>", "g")
            this.formItem.memo = this.formItem.memo.replace(reg ,"\n")
            this.index = this.item.index
        },
        change_month(month){
            this.formItem.servicestartdate = month.split("-").join("")
        },
        change_depart(depart){
            this.formItem.departid = depart.value
            this.formItem.departname = depart.label
        },
        change_givenumber(){
            // 赠送数量修改
            if(this.formItem.iscycle =='Y'){
                let month = parseInt(this.formItem.givethenumber) + parseInt(this.formItem.productnumber)
                this.formItem.unitprice = parseInt(this.formItem.paynumber/month)
            }
            if([1051,1052,1053,1054].includes(parseInt(this.formItem.skuid))){
                let month = parseInt(this.formItem.givethenumber) + parseInt(this.formItem.productnumber)
                this.formItem.unitprice = parseInt(this.formItem.oaprice/month)
            }
            this.change()
        }
    },
    watch: {
        item: {
            handler() {
                this.item_change();
            },
            deep: true
        }
    },
    created() {
        console.log(this.item)
    }
}
</script>
