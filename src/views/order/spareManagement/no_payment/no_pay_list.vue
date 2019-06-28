<template>
  <div>
    <Card>
      <Row style="margin-bottom:10px">
        <Collapse v-model="search_model">
          <Panel name="1">
            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
            筛选
            <Search slot="content"></Search>
          </Panel>
        </Collapse>
      </Row>
      <Row>
        <div>
          <ButtonGroup style="float:left">
            <Button v-permission="['spareM.approval']" type="primary" icon="ios-crop" @click="pay">补交/审批</Button>
            <Button v-permission="['spareM.exportN']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel"
              >导出Excel</Button
            >
            <Button v-permission="['spareM.approval']" type="primary" icon="ios-color-filter-outline" @click="GetLocalData"
              >刷新</Button
            >
          </ButtonGroup>
        </div>
      </Row>
      <Row style="margin-top: 10px;">
        <!-- :row-class-name="rowClassName" -->
        <Table
          border
          :columns="header"
          :data="local_data"
          highlight-row
          @on-current-change="save_select_current"
          :loading="np_loading"
          size="small"
        >
        </Table>
        <Page
          :total="total_NUM"
          :current.sync="page"
          show-elevator
          style="margin-top:10px"
          @on-change="PageChange"
          @on-page-size-change="PageSizeChange"
          show-sizer
          size="small"
        ></Page>
      </Row>
    </Card>
    <Payment :isshow="isshow"></Payment>
  </div>
</template>

<script>
import Search from '../search.vue';
import Bus from '../bus';
import Payment from './payment';

export default {
  data() {
    return {
      search_model: '',
      np_loading: false,
      isshow: false,
      searchgroups: {
        companyName: '',
        ordercode: '',
        createbyname: '',
        approval: ''
      },
      total_NUM: new Number(),
      page: 1,
      pageSize: 10,
      local_data: [],
      select_row: '',
      header: [
        {
          title: '订单编号',
          key: 'ordercode',
          minWidth: 150
        },
        {
          title: '产品名称',
          key: 'product',
          minWidth: 150,
          render: (h, params) => {
            // console.log(params)
            if (params.row.product == '' || params.row.product == null) {
              return '';
            } else if (params.row.product.length > 8) {
              return h(
                'Poptip',
                {
                  props: {
                    trigger: 'hover',
                    placement: 'bottom'
                  }
                },
                [
                  h('span', params.row.product.slice(0, 8) + '...'),
                  h(
                    'div',
                    {
                      slot: 'content'
                    },
                    [h('span', params.row.product)]
                  )
                ]
              );
            } else {
              return h('span', params.row.product);
            }
          }
        },
        {
          title: '公司名称',
          // key: 'showcompanyname',
          minWidth: 200,
          render: (h, params) => {
            // console.log(params)
            if (params.row.companyName == '' || params.row.companyName == null) {
              return '';
            } else if (params.row.companyName.length > 10) {
              return h(
                'Poptip',
                {
                  props: {
                    trigger: 'hover',
                    placement: 'bottom'
                  }
                },
                [
                  h('span', params.row.companyName.slice(0, 10) + '...'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
                    }
                  }),
                  h(
                    'div',
                    {
                      slot: 'content'
                    },
                    [h('span', params.row.companyName)]
                  )
                ]
              );
            } else {
              return h('span', params.row.companyName);
            }
          }
        },
        {
          title: '余款总额',
          key: 'totalamount',
          minWidth: 120
        },
        {
          title: '已补余款',
          key: 'paynumber',
          minWidth: 100
        },
        {
          title: '剩余余款',
          key: 'unpaidamount',
          minWidth: 100
        },
        {
          title: '待审批金额',
          key: 'approvalpendingamount',
          minWidth: 100
        },
        {
          title: '跟进人',
          key: 'followbyname',
          minWidth: 100
        },
        {
          title: '审批状态',
          key: 'action',
          width: 100,
          render: (h, params) => {
            const flag = params.row.approvalpendingamount;
            const index = params.index;
            // console.log(params)
            if (index != this.pageSize) {
              const color = flag > 0 ? 'black' : 'white';
              const text = flag > 0 ? '待审批' : '';
              return h(
                'div',
                {
                  props: {
                    color: color
                  }
                },
                text
              );
            }
          }
        }
        // {
        //     title: '操作',
        //     key: 'action',
        //     fixed: 'right',
        //     width: 120,
        //     render: (h, params) => {
        //         return h('div', [
        //             h('Button', {
        //                 props: {
        //                     type: 'text',
        //                     size: 'small'
        //                 }
        //             }, '[催费]'),
        //         ]);
        //     }
        // }
      ]
    };
  },
  methods: {
    downloadExcel() {
      let field = [
        { field: 'ordercode', title: '订单号码' },
        { field: 'product', title: '产品名称' },
        { field: 'companyName', title: '公司名称' },
        { field: 'totalamount', title: '余款总额' },
        { field: 'paynumber', title: '已补余款' },
        { field: 'unpaidamount', title: '剩余余款' },
        { field: 'approvalpendingamount', title: '待审批金额' },
        { field: 'followbyname', title: '跟进人' }
      ];
      let _that = this;
      let url = `api/order/balance/list`;
      let config = {
        page: '1',
        pageSize: '1000000',
        isend: 'N',
        companyName: _that.searchgroups.companyName,
        ordercode: _that.searchgroups.ordercode,
        createbyname: _that.searchgroups.createbyname,
        approval: _that.searchgroups.approval,
        export: 'Y',
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    GetLocalData() {
      var _that = this;
      _that.np_loading = true;

      var url = 'api/order/balance/list';

      var keys = []; //定义一个数组用来接受key
      var config = {
        params: {
          isend: 'N',
          page: _that.page,
          pageSize: _that.pageSize,
          // sortField:'updatedate',
          companyName: _that.searchgroups.companyName,
          ordercode: _that.searchgroups.ordercode,
          createbyname: _that.searchgroups.createbyname,
          approval: _that.searchgroups.approval,
          product: _that.searchgroups.product,
          sumField: 'unpaidamount,approvalpendingamount,totalamount',
          sortField: 'updatedate'
        }
      };
      for (var key in _that.searchgroups) {
        if (_that.searchgroups[key] == '' || _that.searchgroups[key] == null) {
          delete config.params[key];
        }
      }
      _that.local_data = [];
      this.$http.get(url, config).then(function(res) {
        _that.$backToLogin(res);

        // console.log(res)
        _that.local_data = res.data.data.rows;
        _that.total_NUM = res.data.data.total;
        _that.np_loading = false;
        // console.log(_that.local_data[0])
        // for(let i = 0;i<_that.local_data.length;i++){
        //     if(_that.local_data[i].companyName.length>10){
        //         console.log('1111')
        //         _that.local_data[i].showcompanyname = _that.local_data[i].companyName.slice(0,10)+'...'
        //     }else{
        //         // console.log('2222')
        //         _that.local_data[i].showcompanyname = _that.local_data[i].companyName
        //     }
        // }
        var unpaidamount = res.data.data.sum.unpaidamount;
        var approvalpendingamount = res.data.data.sum.approvalpendingamount;
        var totalamount = res.data.data.sum.totalamount;
        _that.local_data.push({
          companyName: '合计',
          unpaidamount: unpaidamount,
          approvalpendingamount: approvalpendingamount,
          totalamount: totalamount
        });
      });
    },
    PageChange(e) {
      var _that = this;
      _that.page = e;
      _that.GetLocalData();
    },
    PageSizeChange(e) {
      var _that = this;
      _that.pageSize = e;
      _that.GetLocalData();
    },
    // 表格相关函数end
    rowClassName(e) {
      if (e.companyName != '合计' && e.approvalpendingamount != 0 && this.select_row.id != e.id) {
        return 'demo-table-info-row';
      }
    },
    pay() {
      var _that = this;
      if (_that.select_row != '') {
        _that.$bus.emit('open_payment', _that.select_row);
        // Bus.$emit('open_payment', _that.select_row)
      } else {
        _that.$Message.warning('请选择一行');
      }
    },
    save_select_current(e) {
      var _that = this;
      _that.select_row = e;
    },
    search(e) {
      this.searchgroups.companyName = e.companyName;
      this.searchgroups.ordercode = e.ordercode;
      this.searchgroups.createbyname = e.createbyname;
      this.searchgroups.approval = e.approval;
      this.searchgroups.product = e.product;
      this.GetLocalData();
    },
    reset() {
      this.searchgroups.companyName = '';
      this.searchgroups.ordercode = '';
      this.searchgroups.createbyname = '';
      this.searchgroups.approval = '';
      this.page = 1;
      this.GetLocalData();
    },
    exportToExecl() {
      var url;
      if (_that.search_companyname != '' && _that.search_ordercode != '') {
        url = `api/order/balance/list?page=1&pageSize=${_that.pageSize}&isend=N&companyname=${
          _that.search_companyname
        }&ordercode=${_that.search_ordercode}&sumField=unpaidamount,approvalpendingamount`;
      } else if (_that.search_companyname == '' && _that.search_ordercode != '') {
        url = `api/order/balance/list?page=1&pageSize=${_that.pageSize}&isend=N&ordercode=${
          _that.search_ordercode
        }&sumField=unpaidamount,approvalpendingamount`;
      } else if (_that.search_companyname != '' && _that.search_ordercode == '') {
        url = `api/order/balance/list?page=1&pageSize=${_that.pageSize}&isend=N&companyname=${
          _that.search_companyname
        }&sumField=unpaidamount,approvalpendingamount`;
      } else {
        url = `api/order/balance/list?page=${_that.page}&pageSize=${
          _that.pageSize
        }&isend=N&sumField=unpaidamount,approvalpendingamount`;
      }
      url = url + 'exportField=[{"field": "companyName","title": "公司名称"}]';
      window.open(
        'localhost%3a8089%2fapi%2forder%2fbalance%2flist%3fpage%3d1%26pageSize%3d9999%26isend%3dN%26sumField%3dunpaidamount%2capprovalpendingamount%26exportField%3d%5b%7b%22field%22%3a+%22companyName%22%2c%22title%22%3a+%22%e5%85%ac%e5%8f%b8%e5%90%8d%e7%a7%b0%22%7d%5d'
      );
    }
  },
  created: function() {
    this.GetLocalData();
    this.$bus.on('search', e => {
      // Bus.$on('search',(e)=>{
      this.search(e);
    });
    this.$bus.on('reset', e => {
      // Bus.$on('reset',(e)=>{
      this.reset();
    });
    this.$bus.on('refresh', e => {
      // Bus.$on('refresh',(e)=>{

      this.GetLocalData();
    });
  },
  components: {
    Search,
    Payment
  }
};
</script>

<style>
.ivu-table .demo-table-info-row td {
  background-color: #ff6600;
  color: black;
}
</style>

