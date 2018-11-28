<template>
  <div>
    <Card>
	  <Row>
		  <Col span="6">
		  	<div style="padding-bottom:30px;padding-top:15px">部门：</div>
		  	<Tree :data="departTree" show-checkbox @on-check-change="getCheckedNodes" ref="departTree"></Tree>
		  </Col>
		  <Col span="18">
		  	<!-- <Button style="margin: 10px 0;" type="primary" >保存</Button> -->
            <Table :columns="headers" :data="tableData" size="small"></Table>
			<Page
				size="small"
				:total="pageTotal"
				:current.sync="page"
				show-total
				show-elevator
                @on-change="page_change"
				style="margin-top: 10px"></Page>
		  </Col>
	  </Row>
      
    </Card>
  </div>
</template>

<script>
// import { getTableData } from '@/api/data'
export default {
  name: 'clueControl_index',
  data () {
    return {
	    check_depart_id:"",
	    departTree:[],
        tableLoading:false,
        page:1,
        pageTotal: 0,
        headers: [
            {
                title: "用户",
                key: "realname",
                minWidth: 150
            },
            {
                title: "线索领取上限",
                key: "realname",
                minWidth: 180,
                render: (h, parmas) => {
                    let _self = this
                    // console.log(parmas.row)
                        return h('div',[
                            h('Input',{
                                props:{
                                    value: this.tableData[parmas.index].customer_receipt_max_num,
                                    autosize: true,
                                    type: "text",
                                    size: "small"
                                },
                                "class": {
                                    clueNum: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        // console.log(event)
                                        // _self.tableData[parmas.index].customer_receipt_max_num = event.target.value
                                        _self.save_new_clue_num(parmas.row.id, event.target.value)
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        // _self.tableData[parmas.index].customer_receipt_max_num = event.target.value
                                        _self.save_new_clue_num(parmas.row.id, event.target.value)
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }    
                }
        ],
        tableData: []
    }
  },
  methods: {
	getAllDepartTree(){
    	let _self = this
        let url = `api/system/depart/tree/list`
        let config = {

        }

        function success(res){
            _self.departTree = res.data.data
            for(let i = 0; i<_self.departTree.length;i++){
                _self.departTree[i].title = _self.departTree[i].departname
                if(_self.departTree[i].children){
                    for(let j = 0;j<_self.departTree[i].children.length;j++){
                        _self.departTree[i].children[j].title = _self.departTree[i].children[j].departname
                        if(_self.departTree[i].children[j].children){
                            for(let k = 0;k<_self.departTree[i].children[j].children.length;k++){
                                _self.departTree[i].children[j].children[k].title = _self.departTree[i].children[j].children[k].departname
                                if(_self.departTree[i].children[j].children[k].children){
                                    for(let t = 0;t<_self.departTree[i].children[j].children[k].children.length;t++){
                                        _self.departTree[i].children[j].children[k].children[t].title = _self.departTree[i].children[j].children[k].children[t].departname
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        this.$Get(url,config, success)
    },
	getCheckedNodes(e){
		let _self = this
		if(e.length == 0){
			_self.check_depart_id = ""
		}else{
			_self.check_depart_id = e[0].ID
        }
        this.page = 1
        this.get_data()
		// this.getTableData()
        // console.log(e)
        // console.log("获取被勾选的节点---start")
        // console.log(this.$refs.departTree.getCheckedNodes())
        // console.log("获取被勾选的节点---end")

        // console.log("获取被选中的节点---start")
        // console.log(this.$refs.departTree.getSelectedNodes())
        // console.log("获取被选中的节点---end")
    },
    get_data(){
        let _self = this
        let url = `api/user/list`

        let config = {
            params: {
                page: _self.page,
                pageSize: 10,
                departid: _self.check_depart_id
            }
        }

        function success(res){
            _self.tableData = res.data.data.rows
            _self.pageTotal = res.data.data.total
        }

        this.$Get(url, config, success)
    },
    page_change(e){
        this.page = e
        this.get_data()
    },
    save_new_clue_num(id, num){
        let _self = this
        let url = `api/user/update/detail`
        let config = {
            id: id,
            customerReceiptMaxNum: num,
        }

        function success(res){
            _self.get_data()
        }

        function fail(err){
            _self.get_data()
        }

        this.$Post(url, config, success, fail)
    }
  },
  mounted () {
    this.getAllDepartTree()
    this.get_data()
    // this.getTableData()
  }
}
</script>

<style>
.clueNum .ivu-input{
    border: 0px solid #dddee1
}
</style>
