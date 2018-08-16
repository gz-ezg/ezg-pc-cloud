<template>
    <div>
        <Card title="上传考勤机考勤表">
            <Row style="margin-bottom:10px;">
                <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem prop="companyId" >
                    <div slot="label" >考勤月份：</div>
                    <DatePicker type="month" placeholder="请选择月份" style="width: 150px" v-model="yearmonth"></DatePicker>
                </FormItem>
                <FormItem style="margin-bottom:20px">
                    <div slot="label">考勤表：</div>
                    <Upload
                            ref="upload"
                            :before-upload="handleUpload"
                            action=""
                            >
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                    </Upload>
                    <div v-for="(item,index) in file" :key=index>{{ item.name }}
                        <Button type="text" @click="fileRemove(item)">移除</Button>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="upload" :loading="submit_loading">上传</Button>
                    <!-- <Button type="ghost" @click="cancel" style="margin-left: 8px">取消</Button> -->
                </FormItem>
            </Form>
            </Row>
        </Card>
        <Card title="下载考勤统计表">
            <Row style="margin-bottom:10px;">
                <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem prop="companyId" >
                    <div slot="label" >考勤月份：</div>
                    <DatePicker type="month" placeholder="请选择月份" style="width: 150px" v-model="yearmonth"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="download">下载</Button>
                    <!-- <Button type="ghost" @click="cancel" style="margin-left: 8px">取消</Button> -->
                </FormItem>
            </Form>
            </Row>
        </Card>
    </div>
</template>

<script>
import {DateFormatYearMonth} from '../../../libs/utils.js'

export default {
    name: "clockin_index",
    data(){
        return{
            file: [],
            yearmonth: new Date(),
            submit_loading: false,
            formValidate:{}
        }
    },
    methods:{
        handleUpload(file) {
            // console.log(file)
            this.file.push(file)
            return false;
        },
        fileRemove(e) {
            this.file.splice(this.file.indexOf(e), 1);
        },
        upload() {
            var _self = this
            _self.submit_loading = true
            var formdata = new FormData()
            var url = 'api/legwork/importLegworkMsg'

            for (var i = 0; i < this.file.length; i++) {
                formdata.append('file', this.file[i])
            }
            formdata.append('yearmonth', DateFormatYearMonth(this.yearmonth))
            // console.log(formdata.get("yearmonth"))

            function success(res){
                _self.submit_loading = false
                console.log(res)
            }

            function fail(err){
                _self.submit_loading = false
                console.log(err)
            }
            
            this.$Post(url, formdata, success, fail)

        },
        download(){
            
        }
    }
}
</script>

