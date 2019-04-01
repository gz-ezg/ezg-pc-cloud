 <template>
    <div>
        <Row>
            <Col :span="showwidth">
                <Card v-if="groupDataCenter">
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="search">
                                    <Form ref="searchModel" :model="searchModel" :label-width="100">
                                        <Row :gutter="16">
                                            <!-- <Col span="4">
                                                <FormItem prop="customer" label="客户：">
                                                    <Input size="small" type="text" v-model="searchModel.customer" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col> -->
                                            <Col span="8">
                                                <FormItem prop="companyname" label="公司：">
                                                    <Input size="small" type="text" v-model="searchModel.companyname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="phone" label="电话号码：">
                                                    <Input size="small" type="text" v-model="searchModel.phone" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="msgtname" label="模板名称：">
                                                    <Input size="small" type="text" v-model="searchModel.msgtname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <!-- <Col span="4">
                                                <FormItem prop="serviceMan" label="服务人员：">
                                                    <Input size="small" type="text" v-model="searchModel.serviceMan" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col> -->
                                            <!-- <Col span="4">
                                                <FormItem prop="state" label="返回状态：">
                                                    <Select transfer v-model="searchModel.state" placeholder="请选择">
                                                        <Option value="500">成功</Option>
                                                        <Option value="0">失败</Option> 
                                                    </Select>  
                                                </FormItem>
                                            </Col> -->
                                            
                                        </Row>    
                                        <Row :gutter="16">
                                            <!-- <Col span="4">
                                                <FormItem prop="msg_content" label="短信内容：">
                                                    <Input size="small" type="text" v-model="searchModel.msg_content" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col> -->
                                            <Col span="8">
                                                <FormItem prop="startdate" label="发送日期：">
                                                    <DatePicker format="yyyy-MM-dd" type="daterange" style="width: 100%" size="small" v-model="searchModel.date"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="realname" label="发送人：">
                                                    <Input size="small" type="text" v-model="searchModel.realname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem>
                                                <Button type="primary" @click="search">查询</Button>
                                                <Button type="ghost" style="margin-left:20px" @click="reset">清空</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel> 
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="search" @click="dataCheck">查看</Button> 
                            <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
							<Button type="primary" icon="search" @click="open_send_email" v-permission="['smsSendLogSendEmail.send']">发送短信</Button>
							<Button type="primary" icon="search" @click="open_send_excelEmail" v-permission="['smsExcelSendLogSendEmail.send']">excel发送短信</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row 
                                border
                                size="small"
                                :loading="loading"
                                :columns="fatherDataHeader"
                                @on-current-change="selectFatherRow"
                                :data="fatherData"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                :page-size = "pageSize"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync="page"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- 查看模态框 -->
        <Modal
            title="查看"
            width="600"
            v-model="open_father_data"
            @on-cancel="close_father_data">
            <Form :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="电话号码：">
                            <Input readonly size="small" type="text" v-model="currentRowData.phone" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="短信模板：">
                            <Input readonly size="small" type="text" v-model="currentRowData.msgtname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="结果">
                            <Input readonly size="small" type="textarea" :autosize="{maxRows: 8}" v-model="currentRowData.info" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="短信内容：">
                            <Input  size="small" type="textarea" :autosize="{maxRows: 8}"  v-model="currentRowData.msg_content" placeholder="" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="发送日期：">
                            <Input readonly size="small" type="text" v-model="currentRowData.send_date" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button size="small" type="ghost" style="margin-left:20px" @click="close">关闭</Button>
            </div>
        </Modal>
		
		<Modal
			title="发送短信"
			width="600"
			v-model="send_email_model"
			@on-cancel="close_send_email"
		>
			<Form ref="formEmail" :model="formEmail" :rules="ruleValidate">
				<FormItem prop="phone">
					<Input type="input" v-model="formEmail.phone"></Input>
				</FormItem>
				<FormItem prop="msg_content">
					<Input type="textarea" v-model="formEmail.msg_content"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
			    <Button type="primary" @click="send_email('formEmail')" :loading="send_email_loading">发送</Button>
			    <Button type="ghost" @click="close_send_email">取消</Button>
			</div>
		</Modal>
		
		<Modal
		    v-model="send_excel_email_model"
		    title="发送excel短信"
		    width="200"
		>   
		    <Row :gutter="20">
		        <Col span="24">
		            <center>
		              <Upload
		                ref="upload"
		                :before-upload="handleUpload"
		                action="/api/customer/importHighSeasPoolMessage"
		              >
		                <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:20px">选择文件</Button>
		                <Button type="info" icon="ios-cloud-download-outline" style="margin-top:20px;" @click="open">导入模板</Button>
		              </Upload>
		            </center>
		        </Col>
		    </Row>
		    <div slot="footer"></div>
		</Modal>
    </div>
</template>

<script>
import { DateFormat } from '../../libs/utils.js'

export default {
    name: "smsSendLog",
  data() {
    return {
      loading: false,
      showwidth: 24,
      groupDataCenter: true,
	  send_email_model:false,
	  send_excel_email_model:false,
	  formEmail:{
		phone:"",
		msg_content:""
	  },
	  ruleValidate:{
		  phone:[{required: true, message: '请填写手机号', trigger: 'blur'}],
		  msg_content:[{required: true, message: '请填写内容', trigger: 'blur'}]
	  },
	  send_email_loading:false,
      //  筛选相关
      search_model: "",
      searchModel: {
        customer: "",
        phone: "",
        fllowMan: "",
        phone: "",
        serviceMan: "",
        state: "",
        companyname: "",
        msgtname: "",
        startdate: "",
        enddate: "",
        realname: "",
        date: []
      },
      fatherDataHeader: [
        {
          title: "客户",
          minWidth: 120,
          key: "name"
        },
        {
          title: "电话号码",
          minWidth: 120,
          key: "phone"
        },
        {
          title: "模版名称",
          minWidth: 180,
          key: "msgtname",
        },
        {
          title: "结果",
          minWidth: 200,
          key: "info",
        },
        // {
        //   title: "返回状态",
        //   minWidth: 120,
        //   key: "return_code"
        // },
        {
          title: "公司",
          key: "companyname",
          minWidth: 180,
        },
        {
          title: "短信内容",
          key: "msg_content",
          width: 300,
          ellipsis: true
        },
        {
          title: "发送日期",
          key: "send_date",
          width: 150,
          ellipsis: true
        },
        {
          title: "短信发送人",
          key: "realname",
          minWidth: 120,
        }
      ],

      fatherData: [],
      current_father_row: [],
      pageTotal: new Number(),
      page: 1,
      pageSize: 10,
      //   模态框
      open_father_data: false,
      currentRowData: {
          phone: "",
          msgID: "",
          info: "",
          return_code: "",
          msg_content: "",
          send_date: "",
          msg_type: ""
      }
    };
  },
  methods: {
      downloadExcel(){
            let field = [
                {field:'name',title:'客户'},
                {field:'msgtname',title:'模版名称'},
                {field:'info',title:'结果'},
                {field:'companyname',title:'公司'},
                {field:'msg_content',title:'短信内容'},
                {field:'send_date',title:'发送日期'},               
                {field:'realname',title:'短信发送人'},               
            ]
            let _self = this
            let url = `api/system/log/querySMSRquestLog/list`
            let config = {
                page: '1',
                pageSize: '1000000',
                bcreatedate: DateFormat(_self.searchModel.date[0]),
                ecreatedate: DateFormat(_self.searchModel.date[1]),
                realname: _self.searchModel.realname,
                phone: _self.searchModel.phone,
                msgtname: _self.searchModel.msgtname,
                companyname: _self.searchModel.companyname,
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
    getData() {
      let _self = this;
      _self.loading = true
      let url = "api/system/log/querySMSRquestLog/list"
      let config= {
        params: {
            page: _self.page,
            pageSize: _self.pageSize,
            bcreatedate: DateFormat(_self.searchModel.date[0]),
            ecreatedate: DateFormat(_self.searchModel.date[1]),
            realname: _self.searchModel.realname,
            phone: _self.searchModel.phone,
            msgtname: _self.searchModel.msgtname,
            companyname: _self.searchModel.companyname,
        }
      };
      function doSuccess(res) {
        _self.fatherData = res.data.data.rows;
        _self.pageTotal = res.data.data.total;
        _self.loading = false

      }
      _self.$Get(url, config, doSuccess);
    },
    pageChange(e) {
      this.page = e;
      this.getData();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
    //  获取当前点击行
    selectFatherRow(e) {
      this.current_father_row = e;
    },
    reset() {
      this.$refs["searchModel"].resetFields();
      this.searchModel.date = []
      this.page = 1;
      this.pageSize = 10;
      this.getData();
    },
    search() {
      this.page = 1;
      this.getData();
    },

    // 模态框
    dataCheck() {
        let _self = this;
      if (_self.current_father_row == "" || _self.current_father_row == null) {
        _self.$Message.warning("请选择一行进行查看！");
      } else {
        _self.open_father_data = true;
        _self.currentRowData = _self.current_father_row;

      }
    },
    close_father_data() {
      this.open_father_data = false;
    },
    close() {
      this.open_father_data = false;
    },
	open_send_email(){
		let _self = this;
		if (_self.current_father_row == "" || _self.current_father_row == null) {
		  _self.$Message.warning("请选择一行进行查看！");
		} else {
		  _self.send_email_model = true;
		  _self.formEmail = _self.current_father_row;
		}
	},
	close_send_email(){
		this.send_email_model = false
	},
	send_email(name){
		let _self = this
		let url = 'api/system/message/sendMessage'
		let params = {
			phone:_self.formEmail.phone,
			content:_self.formEmail.msg_content
		}
		function success(res){
			_self.close_send_email()
		}
		
		const formData = new FormData();
		
		Object.keys(params).forEach((key) => {
			formData.append(key, params[key]);
		});
			// console.log(novel1)
		
		this.$refs[name].validate((valid)=>{
			if(valid){
				this.$Post(url,formData,success)
			}
		})
	},
	open_send_excelEmail(){
		this.send_excel_email_model = true
	},
	close_send_excelEmail(){
		this.send_excel_email_model = false
	},
	open(){
	    window.open("/api/assets/upload/commonImg/public_pool_template.xlsx")
	}
  },
  created() {
    let _self = this;
    _self.getData();
    _self.$bus.on("open_groups_data", e => {
      _self.groupDataCenter = true;
    });
  }
};
</script>
