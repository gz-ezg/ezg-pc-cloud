<template>
  <div @click="changeIndex">
    <Card>
      <Row style="margin-bottom:20px">
        <Collapse v-model="search_model">
          <Panel name="1">
            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
            筛选
            <div slot="content" @keydown.enter="Search">
              <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                <Row :gutter="8" style="height:56px">
                  <Col span="8">
                    <FormItem label="地区：" prop="CompanyName">
                      <Select v-model="SearchValidate.area" size="small" type="text" transfer>
                        <Option v-for="(item, index) in gzbusinessarea" :key="index" :value="item.typecode">{{
                          item.typename
                        }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="地址：" prop="server_realname">
                      <Input v-model="SearchValidate.place" size="small"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="地址类型：" prop="followby_realname">
                      <Select v-model="SearchValidate.kpType" size="small" type="text" transfer>
                        <Option v-for="(item, index) in kp_type" :key="index" :value="item.typecode">{{ item.typename }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="8" style="height:56px">
                  <!--<Col span="8">-->
                  <!--<FormItem label="地址属性：" prop="note_kj_flag">-->
                  <!--<Select v-model="SearchValidate.addrProperty" size="small" type="text" transfer>-->
                  <!--<Option v-for="(item,index) in addr_property" :key="index" :value="item.typecode">{{item.typename}}</Option>-->
                  <!--</Select>-->
                  <!--</FormItem>-->
                  <!--</Col>-->
                  <Col span="8">
                    <FormItem label="可开：" prop="etaxStatus">
                      <Select v-model="SearchValidate.canInvoice" size="small" type="text" transfer>
                        <Option v-for="(item, index) in sf_yn" :key="index" :value="item.typecode">{{ item.typename }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="可查：" prop="etaxStatus">
                      <Select v-model="SearchValidate.canCheck" size="small" type="text" transfer>
                        <Option v-for="(item, index) in sf_yn" :key="index" :value="item.typecode">{{ item.typename }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="工商情况：" prop="note_kj_flag">
                      <Select v-model="SearchValidate.taxStatus" size="small" type="text" transfer>
                        <Option v-for="(item, index) in business_tax_status" :key="index" :value="item.typecode">{{
                          item.typename
                        }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row :gutter="8" style="height:56px">
                  <Col span="8">
                    <FormItem label="税务情况：" prop="etaxStatus">
                      <Select v-model="SearchValidate.businessStatus" size="small" type="text" transfer>
                        <Option v-for="(item, index) in business_tax_status" :key="index" :value="item.typecode">{{
                          item.typename
                        }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <center>
                  <FormItem>
                    <Button type="primary" @click="Search">搜索</Button>
                    <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                  </FormItem>
                </center>
              </Form>
            </div>
          </Panel>
        </Collapse>
      </Row>
      <Row>
        <ButtonGroup>
          <Button v-permission="['addManager_index.add']" type="primary" icon="ios-color-wand-outline" @click="add">新增</Button>
          <Button type="primary" icon="information-circled" @click="show">查看</Button>
          <Button v-permission="['addManager_index.edit']" type="primary" icon="ios-color-wand-outline" @click="edit"
            >修改</Button
          >
          <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
          <!--<Button type="primary" icon="ios-color-wand-outline" @click="import_excel">导入Excel</Button>-->
        </ButtonGroup>
      </Row>
      <Row style="margin-top: 10px;">
        <Table border :loading="loading" ref="selection" size="small" :columns="header" :data="data1"></Table>
        <Page
          size="small"
          :total="pageTotal"
          show-total
          show-sizer
          show-elevator
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :current.sync="page"
          placement="top"
          style="margin-top: 10px"
        ></Page>
      </Row>
      <info
        :gzbusinessarea="gzbusinessarea"
        :addr_property="addr_property"
        :kp_type="kp_type"
        :business_tax_status="business_tax_status"
        :sf_yn="sf_yn"
      ></info>
    </Card>
  </div>
</template>

<script>
import Info from './common/detail';
export default {
  name: 'index',
  components: {
    Info
  },
  data() {
    return {
      search_model: '',
      loading: false,
      pageTotal: 0,
      page: 1,
      currentIndex1: '',
      pageSize: 10,
      current_row: '',
      currentIndex: -1,
      gzbusinessarea: [],
      addr_property: [],
      kp_type: [],
      business_tax_status: [],
      sf_yn: [],
      gzbusinessarea_map: new Map(),
      addr_property_map: new Map(),
      kp_type_map: new Map(),
      business_tax_status_map: new Map(),
      sf_yn_map: new Map(),
      SearchValidate: {
        area: '',
        place: '',
        kpType: '',
        addrProperty: '',
        canInvoice: '',
        canCheck: '',
        taxStatus: '',
        businessStatus: ''
      },
      data: [],
      data1: [],
      header: [
        {
          title: '地区',
          key: 'AREA',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            let _self = this;
            return h('div', {}, _self.gzbusinessarea_map.get(params.row.AREA));
          }
        },
        {
          title: '具体位置',
          key: 'list',
          align: 'center',
          width: 180,
          render: (h, params) => {
            return h(
              'div',
              {
                class: {
                  subCol: true
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.place) {
                      let a = item.place;
                      if (item.place) {
                        if (a.length > 11) {
                          return h(
                            'li',
                            {
                              class: {
                                a: item.id == this.currentIndex1 ? true : false
                              },
                              on: {
                                click: e => {
                                  this.changeClass(item);
                                  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                                },
                                dblclick: e => {
                                  this.show();
                                  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                                }
                              }
                            },
                            a.slice(0, 11) + '...'
                          );
                        } else {
                          return h(
                            'li',
                            {
                              class: {
                                a: item.id == this.currentIndex1 ? true : false
                              },
                              on: {
                                click: e => {
                                  this.changeClass(item);
                                  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                                },
                                dblclick: e => {
                                  this.show();
                                  window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                                }
                              }
                            },
                            a
                          );
                        }
                      }
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        // {
        //     title: '地址类型',
        //     key: 'list',
        //     align:'center',
        //     minWidth: 120,
        //     render: (h, params) => {
        //         return h('div', {
        //             attrs: {
        //                 class:'subCol'
        //             },
        //         }, [
        //             h('ul', this.data1[params.index].list.map(item => {
        //                 return h('li', {
        //                     'class':{
        //                         a:item.id==this.currentIndex1?true:false
        //                     },
        //                     on:{
        //                         click: (e)=>{
        //                             this.changeClass(item)
        //                             window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                         },
        //                         dblclick:(e) =>{
        //                             this.show()
        //                             window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                         }
        //                     }
        //                 }, this.addr_property_map.get(item.addr_property))
        //             }))
        //         ]);
        //     }
        // },
        {
          title: '地址类型',
          key: 'list',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.invoice_type) {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        this.kp_type_map.get(item.invoice_type)
                      );
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '价格',
          key: 'list',
          align: 'center',
          minWidth: 90,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.price) {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        item.price
                      );
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '可开',
          key: 'list',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.can_invoice) {
                      if (item.can_invoice == 'Y') {
                        return h(
                          'li',
                          {
                            class: {
                              a: item.id == this.currentIndex1 ? true : false
                            },
                            style: {
                              fontWeight: 'bold',
                              color: '#26A65B'
                            },
                            on: {
                              click: e => {
                                this.changeClass(item);
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              },
                              dblclick: e => {
                                this.show();
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              }
                            }
                          },
                          '√'
                        );
                      }
                      if (item.can_invoice == 'N') {
                        return h(
                          'li',
                          {
                            class: {
                              a: item.id == this.currentIndex1 ? true : false
                            },
                            style: {
                              fontWeight: 'bold',
                              color: 'red'
                            },
                            on: {
                              click: e => {
                                this.changeClass(item);
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              },
                              dblclick: e => {
                                this.show();
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              }
                            }
                          },
                          '×'
                        );
                      }
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '可查',
          key: 'list',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.can_check) {
                      if (item.can_check == 'Y') {
                        return h(
                          'li',
                          {
                            class: {
                              a: item.id == this.currentIndex1 ? true : false
                            },
                            style: {
                              fontWeight: 'bold',
                              color: '#26A65B'
                            },
                            on: {
                              click: e => {
                                this.changeClass(item);
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              },
                              dblclick: e => {
                                this.show();
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              }
                            }
                          },
                          '√'
                        );
                      }
                      if (item.can_check == 'N') {
                        return h(
                          'li',
                          {
                            class: {
                              a: item.id == this.currentIndex1 ? true : false
                            },
                            style: {
                              fontWeight: 'bold',
                              color: 'red'
                            },
                            on: {
                              click: e => {
                                this.changeClass(item);
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              },
                              dblclick: e => {
                                this.show();
                                window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                              }
                            }
                          },
                          '×'
                        );
                      }
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '新注册',
          key: 'list',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.if_new_register) {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        this.sf_yn_map.get(item.if_new_register)
                      );
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '工商情况',
          key: 'list',
          align: 'center',
          minWidth: 90,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.tax_status) {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        this.business_tax_status_map.get(item.tax_status)
                      );
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        },
        {
          title: '税务情况',
          key: 'list',
          align: 'center',
          minWidth: 90,
          render: (h, params) => {
            return h(
              'div',
              {
                attrs: {
                  class: 'subCol'
                }
              },
              [
                h(
                  'ul',
                  this.data1[params.index].list.map(item => {
                    if (item.business_status) {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        this.business_tax_status_map.get(item.business_status)
                      );
                    } else {
                      return h(
                        'li',
                        {
                          class: {
                            a: item.id == this.currentIndex1 ? true : false
                          },
                          on: {
                            click: e => {
                              this.changeClass(item);
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            },
                            dblclick: e => {
                              this.show();
                              window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
                            }
                          }
                        },
                        [h('span', {}, '--')]
                      );
                    }
                  })
                )
              ]
            );
          }
        }
        // {
        //     title: '备注',
        //     key: 'list',
        //     align:'center',
        //     minWidth: 250,
        //     // render: (h, params) => {
        //     //     if (params.row.memo == "" || params.row.memo == null) {
        //     //         return "";
        //     //     } else {
        //     //         // console.log(params.row.companynames)
        //     //         let temp = params.row.memo
        //     //         if (temp.length > 10) {
        //     //             if (params.index != this.currentIndex){
        //     //                 return h("div",{
        //     //                 },[
        //     //                     h("span",{
        //     //                         style:{
        //     //                             display: 'inline-block',
        //     //                         }
        //     //                     },temp.slice(0,10) + "..."),
        //     //                     h("Button", {
        //     //                         props:{
        //     //                             type:'text',
        //     //                             display: 'inline-block',
        //     //                         },
        //     //                         style: {
        //     //                             color:'rgb(45,140,240)',
        //     //                         },
        //     //                         on:{
        //     //                             click: () => {
        //     //                                 this.change(params.row,params.index)
        //     //                             }
        //     //                         }
        //     //                     },"点击展开")
        //     //                 ]);
        //     //             } else {
        //     //                 return h("div",{
        //     //                 },[
        //     //                     h("span",temp)
        //     //                 ]);
        //     //             }
        //     //
        //     //         } else {
        //     //             return h("div",{
        //     //                 },[
        //     //                     h("span", temp)
        //     //                 ]
        //     //             );
        //     //         }
        //     //     }
        //     // }
        //     render: (h, params) => {
        //             return h('div', {
        //                 attrs: {
        //                     class:'subCol'
        //                 },
        //             }, [
        //                 h('ul', this.data1[params.index].list.map((item,index) => {
        //                     let a = item.memo
        //                     if (item.memo){
        //                         if (a.length > 18){
        //                             if (item.id != this.currentIndex){
        //                                 return h("li",{
        //                                     'class':{
        //                                         a:item.id==this.currentIndex1?true:false
        //                                     },
        //                                     on:{
        //                                         click: (e)=>{
        //                                             this.changeClass(item)
        //                                             window.event? window.event.cancelBubble = true : e.stopPropagation();
        //                                         },
        //                                         dblclick:(e) =>{
        //                                             this.show()
        //                                             window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                         }
        //                                     }
        //                                 },[
        //                                     h("span",{
        //                                         style:{
        //                                             display: 'inline-block',
        //                                         }
        //                                     },item.memo.slice(0,18) + "..."),
        //                                     // h("Button", {
        //                                     //     props:{
        //                                     //         type:'text',
        //                                     //         display: 'inline-block',
        //                                     //     },
        //                                     //     style: {
        //                                     //         color:'rgb(45,140,240)',
        //                                     //         padding:'0',
        //                                     //         lineHeight: '0'
        //                                     //     },
        //                                     //     on:{
        //                                     //         click: (e) => {
        //                                     //             this.change(item)
        //                                     //             window.event? window.event.cancelBubble = true : e.stopPropagation();
        //                                     //         }
        //                                     //     }
        //                                     // },"点击展开")
        //                                 ]);
        //                             }else {
        //                                 return h("li",{
        //                                     'class':{
        //                                         a:item.id==this.currentIndex1?true:false
        //                                     },
        //                                     on:{
        //                                         click: (e)=>{
        //                                             this.changeClass(item)
        //                                             window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                         },
        //                                         dblclick:(e) =>{
        //                                             this.show()
        //                                             window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                         }
        //                                     }
        //                                 },[
        //                                     h("span",{
        //                                     },item.memo)
        //                                 ]);
        //                             }
        //                         } else {
        //                             return h("li",{
        //                                 'class':{
        //                                     a:item.id==this.currentIndex1?true:false
        //                                 },
        //                                 on:{
        //                                     click: (e)=>{
        //                                         this.changeClass(item)
        //                                         window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                     },
        //                                     dblclick:(e) =>{
        //                                         this.show()
        //                                         window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                     }
        //                                 }
        //                                 },[
        //                                     h("span", {
        //                                     },item.memo)
        //                                 ]
        //                             );
        //                         }
        //                     } else {
        //                         return h("li",{
        //                             'class':{
        //                                 a:item.id==this.currentIndex1?true:false
        //                             },
        //                             on:{
        //                                 click: (e)=>{
        //                                     this.changeClass(item)
        //                                     window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                 },
        //                                 dblclick:(e) =>{
        //                                     this.show()
        //                                     window.event? window.event.cancelBubble = true : e.stopPropagation()
        //                                 }
        //                             }
        //                             },[
        //                                 h("span", "--")
        //                             ]
        //                         );
        //                     }
        //
        //                 }))
        //             ]);
        //
        //     }
        // },
      ]
    };
  },
  methods: {
    selectRow(e) {
      console.log(e);
      this.current_row = e;
    },
    pageChange(a) {
      let _self = this;
      _self.page = a;
      _self.get_data();
    },
    pageSizeChange(a) {
      let _self = this;
      _self.pageSize = a;
      _self.get_data();
    },
    Search() {
      this.page = 1;
      this.get_data();
    },
    handleReset() {
      this.SearchValidate = {
        area: '',
        place: '',
        kpType: '',
        addrProperty: '',
        canInvoice: '',
        canCheck: '',
        taxStatus: '',
        businessStatus: ''
      };
      this.get_data();
    },
    change(i) {
      this.currentIndex = i.id;
    },
    changeClass(i) {
      this.current_row = i;
      this.currentIndex1 = i.id;
    },
    changeIndex() {
      this.currentIndex = -1;
    },
    add() {
      this.$bus.emit('ADD_MANAGER_INFO', this.current_row);
    },
    show() {
      if (this.current_row) {
        console.log(this.current_row);
        this.$bus.emit('SHOW_MANAGER_INFO', this.current_row);
      } else {
        this.$Message.warning('请选择一行进行操作');
      }
    },
    edit() {
      if (this.current_row) {
        this.$bus.emit('EDIT_MANAGER_INFO', this.current_row);
      } else {
        this.$Message.warning('请选择一行进行操作');
      }
    },
    downloadExcel() {
      let field = [
        { field: 'area', title: '地区', format: 'gzbusinessarea' },
        { field: 'place', title: '地址' },
        { field: 'price', title: '价格' },
        { field: 'invoice_type', title: '开票类型', format: 'kp_type' },
        { field: 'addr_property', title: '地址属性', format: 'addr_property' },
        { field: 'can_invoice', title: '可开', format: 'sf_yn' },
        { field: 'can_check', title: '可查', format: 'sf_yn' },
        { field: 'tax_status', title: '工商情况', format: 'business_tax_status' },
        { field: 'business_status', title: '税务情况', format: 'business_tax_status' },
        { field: 'memo', title: '备注' }
      ];
      let _self = this;
      let url = `api/system/addrPrice/list`;
      let config = {
        page: '1',
        pageSize: '1000000',
        export: 'Y',
        exportField: encodeURI(JSON.stringify(field)),
        area: _self.SearchValidate.area,
        place: _self.SearchValidate.place,
        invoice_type: _self.SearchValidate.kpType,
        addr_property: _self.SearchValidate.addrProperty,
        can_invoice: _self.SearchValidate.canInvoice,
        can_check: _self.SearchValidate.canCheck,
        tax_status: _self.SearchValidate.taxStatus,
        business_status: _self.SearchValidate.businessStatus
      };
      let toExcel = this.$MergeURL(url, config);
      // console.log(toExcel)
      window.open(toExcel);
    },
    get_data() {
      let _self = this;
      _self.data1 = [];
      _self.loading = true;
      this.current_row = '';
      this.currentIndex1 = -1;
      this.currentIndex = -1;
      let url = `api/system/addrPrice/list`;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          area: _self.SearchValidate.area,
          place: _self.SearchValidate.place,
          invoice_type: _self.SearchValidate.kpType,
          addr_property: _self.SearchValidate.addrProperty,
          can_invoice: _self.SearchValidate.canInvoice,
          can_check: _self.SearchValidate.canCheck,
          tax_status: _self.SearchValidate.taxStatus,
          business_status: _self.SearchValidate.businessStatus
        }
      };

      function success(res) {
        let totalList = res.data.data.rows;
        let temp = [];
        totalList.forEach(v1 => {
          let flag = false;
          temp.forEach((v2, i) => {
            if (v2.AREA == v1.area) {
              flag = true;
              temp[i].list.push(v1);
            }
          });
          if (!flag) {
            temp = [...temp, { AREA: v1.area, list: [v1] }];
          }
        });

        console.log('ceshihaha', temp);
        _self.data = res.data.data.rows;
        let a = [],
          b = [],
          c = [],
          d = [],
          e = [],
          f = [],
          g = [],
          h = [],
          i1 = [],
          j = [],
          k = [],
          l = [],
          m = [],
          n = [],
          o = [],
          p = [];
        let obj = {},
          obj1 = {},
          obj2 = {},
          obj3 = {},
          obj4 = {},
          obj5 = {},
          obj6 = {},
          obj7 = {},
          obj8 = {},
          obj9 = {},
          obj10 = {},
          obj11 = {},
          obj12 = {},
          obj13 = {},
          obj14 = {},
          obj15 = {};
        for (let i = 0; i < _self.data.length; i++) {
          if (_self.data[i].area == 'nanhai') {
            a.push(_self.data[i]);
          }
          if (_self.data[i].area == 'sanshui') {
            b.push(_self.data[i]);
          }
          if (_self.data[i].area == 'gaoming') {
            c.push(_self.data[i]);
          }
          if (_self.data[i].area == 'shunde') {
            d.push(_self.data[i]);
          }
          if (_self.data[i].area == 'chancheng') {
            e.push(_self.data[i]);
          }
          if (_self.data[i].area == 'tianhe') {
            f.push(_self.data[i]);
          }
          if (_self.data[i].area == 'yuexiu') {
            g.push(_self.data[i]);
          }
          if (_self.data[i].area == 'liwan') {
            h.push(_self.data[i]);
          }
          if (_self.data[i].area == 'zengcheng') {
            i1.push(_self.data[i]);
          }
          if (_self.data[i].area == 'panyu') {
            j.push(_self.data[i]);
          }
          if (_self.data[i].area == 'huadou') {
            k.push(_self.data[i]);
          }
          if (_self.data[i].area == 'conghua') {
            l.push(_self.data[i]);
          }
          if (_self.data[i].area == 'huangpu') {
            m.push(_self.data[i]);
          }
          if (_self.data[i].area == 'baiyun') {
            n.push(_self.data[i]);
          }
          if (_self.data[i].area == 'haizhu') {
            o.push(_self.data[i]);
          }
          if (_self.data[i].area == 'nansha') {
            p.push(_self.data[i]);
          }
        }
        if (a.length) {
          obj.AREA = 'nanhai';
          obj.list = a;
          _self.data1.push(obj);
        }
        if (b.length) {
          obj1.AREA = 'sanshui';
          obj1.list = b;
          _self.data1.push(obj1);
        }
        if (c.length) {
          obj2.AREA = 'gaoming';
          obj2.list = c;
          _self.data1.push(obj2);
        }
        if (d.length) {
          obj3.AREA = 'shunde';
          obj3.list = d;
          _self.data1.push(obj3);
        }
        if (e.length) {
          obj4.AREA = 'chancheng';
          obj4.list = e;
          _self.data1.push(obj4);
        }
        if (f.length) {
          obj5.AREA = 'tianhe';
          obj5.list = f;
          _self.data1.push(obj5);
        }
        if (g.length) {
          obj6.AREA = 'yuexiu';
          obj6.list = g;
          _self.data1.push(obj6);
        }
        if (h.length) {
          obj7.AREA = 'liwan';
          obj7.list = h;
          _self.data1.push(obj7);
        }
        if (i1.length) {
          obj8.AREA = 'zengcheng';
          obj8.list = i1;
          _self.data1.push(obj8);
        }
        if (j.length) {
          obj9.AREA = 'panyu';
          obj9.list = j;
          _self.data1.push(obj9);
        }
        if (k.length) {
          obj10.AREA = 'huadou';
          obj10.list = k;
          _self.data1.push(obj10);
        }
        if (l.length) {
          obj11.AREA = 'conghua';
          obj11.list = l;
          _self.data1.push(obj11);
        }
        if (m.length) {
          obj12.AREA = 'huangpu';
          obj12.list = m;
          _self.data1.push(obj12);
        }
        if (n.length) {
          obj13.AREA = 'baiyun';
          obj13.list = n;
          _self.data1.push(obj13);
        }
        if (o.length) {
          obj14.AREA = 'haizhu';
          obj14.list = o;
          _self.data1.push(obj14);
        }
        if (p.length) {
          obj15.AREA = 'nansha';
          obj15.list = p;
          _self.data1.push(obj15);
        }
        _self.pageTotal = res.data.data.total;
        _self.loading = false;
      }

      function fail(err) {}

      this.$Get(url, config, success, fail);
    },
    get_data_center() {
      let params = 'gzbusinessarea,gzbusinessplace,addr_property,kp_type,business_tax_status,sf_yn';
      let _self = this;
      function success(res) {
        _self.gzbusinessarea = res.data.data.gzbusinessarea;
        _self.addr_property = res.data.data.addr_property;
        _self.kp_type = res.data.data.kp_type;
        _self.business_tax_status = res.data.data.business_tax_status;
        _self.sf_yn = res.data.data.sf_yn;
        _self.gzbusinessarea_map = _self.$array2map(_self.gzbusinessarea);
        _self.addr_property_map = _self.$array2map(_self.addr_property);
        _self.kp_type_map = _self.$array2map(_self.kp_type);
        _self.business_tax_status_map = _self.$array2map(_self.business_tax_status);
        _self.sf_yn_map = _self.$array2map(_self.sf_yn);
      }
      this.$GetDataCenter(params, success);
    }
  },
  created() {
    this.get_data_center();
    this.get_data();
    this.$bus.off('UPDATE_MANAGER_INFO', true);
    this.$bus.on('UPDATE_MANAGER_INFO', e => {
      this.get_data();
    });
  }
};
</script>

<style>
.subCol > ul > li {
  margin: 0 -18px;
  list-style: none;
  text-align: center;
  padding: 9px;
  display: block;
  border-bottom: 1px solid #e9eaec;
  overflow-x: hidden;
}
.subCol > ul > li:last-child {
  border-bottom: none;
}
.a {
  background-color: rgb(235, 247, 25);
}
</style>