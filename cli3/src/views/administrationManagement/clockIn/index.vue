<template>
    <div>
        <Row>
            <Col span="12">
                <Card title="上传考勤表">
                    <Row style="margin-bottom:10px;height:200px">
                        <Form ref="formValidate" :model="formValidate" :label-width="120">
                            <FormItem prop="companyId" >
                                <div slot="label" >考勤月份：</div>
                                <DatePicker type="month" placeholder="请选择月份" style="width: 150px" v-model="yearmonth" size="small"></DatePicker>
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
                                <Button type="primary" @click="submit" :loading="submit_loading">上传</Button>
                                <!-- <Button type="ghost" @click="cancel" style="margin-left: 8px">取消</Button> -->
                            </FormItem>
                        </Form>
                    </Row>
            </Card>
        </Col>
            <Col span="12">
                <Card title="下载考勤统计表">
                    <Row style="margin-bottom:10px;height:200px">
                        <Form ref="formValidate" :model="formValidate" :label-width="120">
                            <FormItem prop="companyId" >
                                <div slot="label" >考勤月份：</div>
                                <DatePicker type="month" placeholder="请选择月份" style="width: 150px" v-model="yearmonth" size="small"></DatePicker>
                            </FormItem>
                            <FormItem>
                                <div slot="label" >姓名：</div>
                                <Input type="text" v-model="userAliasName" size="small" style="width:150px"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="get_data" style="margin-right: 8px">查询</Button>
                                <Button type="ghost" @click="download">下载</Button>
                            </FormItem>
                        </Form>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row>
            <Card title="考勤统计">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :loading="loading"
                    :data="data"></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"                     
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    placement="top"
                    style="margin-top: 10px"></Page>
            </Card>
        </Row>
    </div>
</template>

<script>
import { DateFormatYearMonth } from '../../../libs/utils.js'

export default {
    name: "clockin_index",
    data(){
        return{
            //  考勤展示相关
            loading:false,
            header:[
                {
                    title:"姓名",
                    key: "user_alias_name",
                    width: 120
                },
                {
                    title:"年月",
                    key: "yearmonth",
                    width: 120
                },
                {
                    title:"1号",
                    key:"01",
                    width: 80
                },
                {
                    title:"2号",
                    key:"02",
                    width: 80
                },
                {
                    title:"3号",
                    key:"03",
                    width: 80
                },
                {
                    title:"4号",
                    key:"04",
                    width: 80
                },
                {
                    title:"5号",
                    key:"05",
                    width: 80
                },
                {
                    title:"6号",
                    key:"06",
                    width: 80
                },
                {
                    title:"7号",
                    key:"07",
                    width: 80
                },

                {
                    title:"8号",
                    key:"08",
                    width: 80
                },
                {
                    title:"9号",
                    key:"09",
                    width: 80
                },
                {
                    title:"10号",
                    key:"10",
                    width: 80
                },
                {
                    title:"11号",
                    key:"11",
                    width: 80
                },

                {
                    title:"12号",
                    key:"12",
                    width: 80
                },
                {
                    title:"13号",
                    key:"13",
                    width: 80
                },
                {
                    title:"14号",
                    key:"14",
                    width: 80
                },

                {
                    title:"15号",
                    key:"15",
                    width: 80
                },
                {
                    title:"16号",
                    key:"16",
                    width: 80
                },
                {
                    title:"17号",
                    key:"17",
                    width: 80
                },
                {
                    title:"18号",
                    key:"18",
                    width: 80
                },
                {
                    title:"19号",
                    key:"19",
                    width: 80
                },
                {
                    title:"20号",
                    key:"20",
                    width: 80
                },
                {
                    title:"21号",
                    key:"21",
                    width: 80
                },
                {
                    title:"22号",
                    key:"22",
                    width: 80
                },
                {
                    title:"23号",
                    key:"23",
                    width: 80
                },
                {
                    title:"24号",
                    key:"24",
                    width: 80
                },
                {
                    title:"25号",
                    key:"25",
                    width: 80
                },
                {
                    title:"26号",
                    key:"26",
                    width: 80
                },
                {
                    title:"27号",
                    key:"27",
                    width: 80
                },
                {
                    title:"28号",
                    key:"28",
                    width: 80
                },
                {
                    title:"29号",
                    key:"29",
                    width: 80
                },
                {
                    title:"30号",
                    key:"30",
                    width: 80
                },
                {
                    title:"31号",
                    key:"31",
                    width: 80
                },

            ],
            data:[],
            page:1,
            pageSize:10,
            pageTotal: new Number(),
            //  考勤上传相关
            file: [],
            // yearmonth: new Date(),
            yearmonth: "",
            submit_loading: false,
            formValidate:{},
            userAliasName:""
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
        submit() {
            let _self = this
            if(!_self.yearmonth){
                _self.$Message.error("请输入考勤日期！")
            }else{
                _self.upload()
            }
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
                _self.file = []
                // console.log(res)
            }

            function fail(err){
                _self.submit_loading = false
                // console.log(err)
            }
            
            this.$Post(url, formdata, success, fail)

        },
        download(){
            let field = [
                    {field:'userId',title:'工号',},
                    {field:'user_alias_name',title:'姓名'},
                    {field:'yearmonth',title:'考勤月份'},
                    {field:'01',title:'1'},
                    {field:'02',title:'2'},
                    {field:'03',title:'3'},
                    {field:'04',title:'4'},
                    {field:'05',title:'5'},
                    {field:'06',title:'6'},
                    {field:'07',title:'7'},                                                                   
                    {field:'08',title:'8'},                                                                     
                    {field:'09',title:'9'},
                    {field:'10',title:'10'},
                    {field:'11',title:'11'},
                    {field:'12',title:'12'},
                    {field:'13',title:'13'},
                    {field:'14',title:'14'},
                    {field:'15',title:'15'},
                    {field:'16',title:'16'},
                    {field:'17',title:'17'},                                                                   
                    {field:'18',title:'18'},                                                                     
                    {field:'19',title:'19'},
                    {field:'20',title:'20'},
                    {field:'21',title:'21'},
                    {field:'22',title:'22'},
                    {field:'23',title:'23'},
                    {field:'24',title:'24'},
                    {field:'25',title:'25'},
                    {field:'26',title:'26'},
                    {field:'27',title:'27'},                                                                   
                    {field:'28',title:'28'},                                                                     
                    {field:'29',title:'29'},
                    {field:'30',title:'30'},
                    {field:'31',title:'31'},
                ]
                let _self = this
                let url = "api/legwork/exportLegworkMsg"
                let config = {
                        page: '1',
                        pageSize: '1000',
                        yearmonth: DateFormatYearMonth(_self.yearmonth),
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                // console.log(toExcel)
                window.open(toExcel)
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = "api/legwork/exportLegworkMsg"
            let config = {
                params:{
                    page: _self.page,
                    pageSize: 10,
                    yearmonth: DateFormatYearMonth(_self.yearmonth),
                    userAliasName: _self.userAliasName
                }  
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        }
    }
}
</script>

