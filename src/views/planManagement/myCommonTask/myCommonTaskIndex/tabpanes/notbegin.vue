<template>
    <Card>
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div  slot="content" @keydown.enter="search">
                        <Form ref="formInline" :model="formInline" :label-width="100">
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem prop="companyname" label="公司名称：">
                                        <Input size="small"  type="text" v-model="formInline.companyname" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem prop="servicename" label="服务人员名称：">
                                        <Input size="small"  type="text" v-model="formInline.servicename" placeholder="">
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup style="float:left">
                <Button type="primary" icon="ios-color-wand-outline" @click="next_step">流转</Button>
                <Button type="primary" icon="information-circled" @click="show_detail">查询详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="company">查看公司</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="download_excel">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="finish_workerOrder" >一键完结</Button>
				<Button type="primary" icon="ios-color-wand-outline" @click="stopWorkOrder">暂停/解锁</Button>
				<Button type="primary" icon="ios-color-wand-outline" @click="openStopWorkOrderList">查看暂停/解锁日志</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                :loading="loading"
                ref="selection"
                highlight-row
                size="small"
                :columns="header"
                :data="data"
                @on-current-change="save_current_row"
                @on-row-dblclick="show_detail"
                @on-sort-change="sort"  
                ></Table>
            <Page
                placement="top"
                size="small"
                :total="total"
                show-total
                show-sizer
                show-elevator
                @on-change="page_change"
                @on-page-size-change="page_size_change"
                :current.sync="page"
                style="margin-top: 10px"></Page>
        </Row>
    </Card>
</template>

<script>
import mixin from './mixin.js'

export default {
    mixins: [mixin],
    data() {
            return {
                workStatusId: 20,
                workOrderStatus:[],
                workOrderStatus_map:new Map(),
				current_row:'',
                header: [
                    {
                        title: '归属公司',
                        key: 'companyname',
                        minWidth: 220,
                        sortable: true,                                                
                        render:(h, params) => {
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>12){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,12)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                    },
                    {
                        title: '服务部门',
                        key: 'departname',
                        minWidth: 120,                                           
                    },
                    {
                        title: '产品全称',
                        key: 'product',
                        minWidth: 200,
                        sortable: true,                                                
                        render:(h, params) => {
                            if(params.row.product == ''||params.row.product == null){
                                return ''
                            }else if(params.row.product.length>10){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.product.slice(0,10)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.product)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.product)
                            }
                        }
                    },
                    {
                        title: '产品数量',
                        key: 'productnumber',
                        minWidth: 120,
                    },
                    {
                        title: '目前进度',
                        key: 'CurrentProcess',
                        minWidth: 120,                      
                    },
                    {
                        title: '下个进度',
                        key: 'nextprocess',
                        minWidth: 120,                     
                        
                    },
                    {
                        title: '服务开始时间',
                        key: 'ServiceStart',
                        minWidth: 140,
                        sortable: true,                        
                        
                    },
                    {
                        title: '创建时间',
                        key: 'CreateDate',
                        minWidth: 120,
                        sortable: true,                        
                        
                    },
                    {
                        title: '实际完成时间',
                        key: 'UpdateDate',
                        minWidth: 140,
                        sortable: true,                        
                        
                    },
                    {
                        title: '服务人员',
                        key: 'servername',
                        minWidth: 120,
                        sortable: true,                        
                        
                    },
                    {
                        title: '跟进人',
                        key: 'followname',
                        minWidth: 120,
                        sortable: true,                        
                        
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click:() => {
                                            this.open_flow_chart(params)
                                        }
                                    }
                                }, '[流程图]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            var _self = this
                                            //  暂停
                                            let url = `api/order/serviceResume`
                                            let config = ""
                                            if(params.row.resumeFlag == null || params.row.resumeFlag == 3){
                                                config = {
                                                    params: {
                                                        workOrderId: params.row.id,
                                                        resumeFlag: 3
                                                    }                                                
                                                }
                                            }else if(params.row.resumeFlag == 2){
                                                let url = `api/order/serviceResume`
                                                config = {
                                                    params: {
                                                        workOrderId: params.row.id,
                                                        resumeFlag: 2
                                                    }
                                                }
                                            }else{}
                                            function success(res){
                                                _self.$Message.success(res.data.msg)
                                                _self.$bus.emit("FLOW_NEXT")
                                            }

                                            if(config){
                                                this.$Get(url, config, success)
                                            }
                                        }
                                    }
                                }, '[暂停/解锁]'),
                            ]);
                        }
                    }
                ]
            }
        },
    methods:{
		 //  保存当前选中行
		save_current_row(e){
		    this.current_row = e
		},
		stopWorkOrder(){
			if(this.current_row != ''){
			    // Bus.$emit('myCommonTask',this.current_row)
			    this.$store.commit("open_gobal_stop_work_order", this.current_row.id)
				this.$store.commit("get_gobal_work_order_status", this.current_row.workOrderStatus)
			}else{
			    this.$Message.warning('请选择一行查看暂停/解锁！')
			}
		},
		openStopWorkOrderList(){
			if(this.current_row != ''){
			    // Bus.$emit('myCommonTask',this.current_row)
			    this.$store.commit("open_gobal_stop_work_order_list", this.current_row.id)
				this.$store.commit("get_gobal_work_order_status", this.current_row.workOrderStatus)
			}else{
			    this.$Message.warning('请选择一行查看暂停/解锁日志！')
			}
		}
    },
    created(){
        var _self = this
        this.get_data()
        if(localStorage.getItem('id')==10059){
            _self.isAdmin = true
        }else{
            _self.isAdmin = false
        }
		
    }

}
</script>
