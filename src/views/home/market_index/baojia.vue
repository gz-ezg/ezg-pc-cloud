<template>
  <div>
    <Row style="margin-bottom:10px">
      <center>
        <h2>亿账柜报价工具</h2>
      </center>
    </Row>
    <Row>
      <Form ref="searchData" :model="searchData" :label-width="140">
        <Row :gutter="10">
          <Col span="22">
            <FormItem prop="area" label="地区：">
              <Select transfer v-model="searchData.area" style="width:100%" size="small">
                <Option value="gz">广州</Option>
                <Option value="sz">深圳</Option>
                <Option value="dg">东莞</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem prop="product" label="报价类型：">
              <Select
                transfer
                v-model="searchData.product"
                @on-change="show"
                size="small"
                style="width:100%"
              >
                <Option value="jzbg">鉴证报告</Option>
                <Option value="zcpg">资产评估</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22" v-if="isshow">
            <FormItem prop="type" label="报告类型：">
              <Select
                transfer
                v-model="searchData.type"
                size="small"
                @on-change="search"
                style="width:100%"
              >
                <Option value="yz">验资</Option>
                <Option value="zxsj">专项审计</Option>
                <Option value="zxqs">注销清税</Option>
                <Option value="ndsjbg">年度审计报告</Option>
                <Option value="sdshsqj">所得税汇算清缴</Option>
                <Option value="engineering">高新费用+收入(工业型)</Option>
                <Option value="service">高新费用+收入(服务型)</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="22" >
                            <FormItem prop="type" label="公司类型：">
                                <Select transfer v-model="searchData.type" @on-change="search" size="small" style="width:100%">
                                    <Option value="yxgs">有限公司</Option>
                                    <Option value="hhgs">合伙公司</Option>
                                    <Option value="fgs">分公司</Option>
                                    <Option value="grdz">个人独资</Option>
                                    <Option value="xggs">香港公司</Option>
                                    <Option value="wzgs">外资公司</Option>
                                    <Option value="bvi">BVI公司</Option>
                                    <Option value="vat">VAT公司</Option>
                                    <Option value="eori">EORI公司</Option>
                                </Select>
                            </FormItem>
          </Col>-->
          <Col span="22">
            <FormItem prop="income" label="企业收入（单位:万）：">
              <Input
                size="small"
                v-model="searchData.income"
                style="width:100%"
                @on-enter="search"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="10">
          <h3 style="margin-left:60px">参考报价:</h3>
          <center v-if="total!=-1">
            <div>标准报价： {{total.toFixed(0)}}元</div>
            <div v-if="Discount9">9折报价： {{Discount9.toFixed(0)}} 元</div>
            <div v-if="Discount8">8折报价： {{Discount8.toFixed(0)}} 元</div>
            <div v-if="Discount7">7折报价： {{Discount7.toFixed(0)}} 元</div>
            <div v-if="Discount6">6折报价： {{Discount6.toFixed(0)}} 元</div>
            <div v-if="Discount5_5">5.5折报价： {{Discount5_5.toFixed(0)}} 元</div>
            <div v-if="Discount5">5折报价： {{Discount5.toFixed(0)}} 元</div>
            <div v-if="Discount4_5">4.5折报价： {{Discount4_5.toFixed(0)}} 元</div>
            <div v-if="Discount4">4折报价： {{Discount4.toFixed(0)}} 元</div>
            <div v-if="Discount3_5">3.5折报价： {{Discount3_5.toFixed(0)}} 元</div>
            <div v-if="Discount3">3折报价： {{Discount3.toFixed(0)}} 元</div>
          </center>
          <center v-else>
            <div>找大掌柜报价</div>
          </center>
        </Row>
        <center style="margin-top:20px">
          <Button type="primary" @click="search">报价</Button>
          <Button type="success" style="margin-left:20px" @click="reset">重置</Button>
        </center>
      </Form>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
      searchData: {
        area: "",
        product: "",
        type: "",
        income: ""
      },
      total: new Number(),
      Discount3_5: "",
      Discount4_5: "",
      Discount5_5: "",
      Discount3: "",
      Discount4: "",
      Discount5: "",
      Discount6: "",
      Discount7: "",
      Discount8: "",
      Discount9: ""
    };
  },
  methods: {
    show(e) {
      if (e == "jzbg") {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
    reset() {
      this.searchData.area = "";
      this.searchData.product = "";
      this.searchData.type = "";
      this.searchData.income = "";
      this.total = 0;
      this.Discount3 = 0;
      this.Discount4 = 0;
      this.Discount5 = 0;
      this.Discount6 = 0;
      this.Discount7 = 0;
      this.Discount8 = 0;
      this.Discount9 = 0;
      this.Discount3_5 = 0;
      this.Discount4_5 = 0;
      this.Discount5_5 = 0;
    },
    // 验资
    yz_count() {
      let _self = this;
      var C5 = _self.searchData.income * 10000;
      _self.total =
        C5 < 500000
          ? 1200
          : C5 < 1000000
          ? 1200 + ((C5 - 500000) * 0.15) / 100
          : C5 < 5000000
          ? 1950 + ((C5 - 1000000) * 0.04) / 100
          : C5 < 10000000
          ? 3550 + ((C5 - 5000000) * 0.03) / 100
          : C5 < 50000000
          ? 5050 + ((C5 - 10000000) * 0.02) / 100
          : C5 < 100000000
          ? 13050 + ((C5 - 50000000) * 0.015) / 100
          : C5 < 500000000
          ? 20550 + ((C5 - 100000000) * 0.01) / 100
          : C5 < 1000000000
          ? 60550 + ((C5 - 500000000) * 0.008) / 100
          : 100550 + ((C5 - 1000000000) * 0.006) / 100;
      //   _self.Discount6 = Math.max(1000, this.total * 0.6);
      //   _self.Discount5 = C5 < 500 * 10000 ? 0 : this.total * 0.5;
      //   _self.Discount4 = C5 < 5000 * 10000 ? 0 : this.total * 0.4;
      // _self.Discount5 =
      //   C5 < 500 * 10000
      //     ? this.total * 0.5 < 1000
      //       ? 1000
      //       : this.total * 0.5
      //     : 0;
      // _self.Discount4_5 =
      //   C5 > 500 * 10000 && C5 < 5000 * 10000 ? this.total * 0.45 : 0;
      // _self.Discount3_5 = C5 < 5000 * 10000 ? 0 : this.total * 0.35;
      _self.Discount5_5 = C5 >= 0 ? this.total * 0.55 : 0;
      _self.Discount5_5 = _self.Discount5_5 < 1000 ? 1000 : _self.Discount5_5;
      _self.Discount4_5 = C5 > 500 * 10000 ? this.total * 0.45 : 0;
      _self.Discount3_5 = C5 > 5000 * 10000 ? this.total * 0.35 : 0;
    },
    // 高新费用+收入报告（工业型）
    engineeringCount() {
      this.total =
        this.searchData.income > 15000 && this.searchData.income <= 50000
          ? 33000
          : 22000;
      let income = this.searchData.income;
      if (income > 50000) {
        this.total = -1;
      } else {
        this.Discount7 = income <= 1000 ? this.total * 0.7 : 0;
        this.Discount8 = income <= 5000 ? this.total * 0.8 : 0;
        this.Discount9 = income <= 15000 ? this.total * 0.9 : 0;
      }
    },
    // 高新费用+收入（服务型）
    serviceCount() {
      this.total =
        this.searchData.income > 15000 && this.searchData.income <= 50000
          ? 22500
          : 15000;
      let income = this.searchData.income;
      if (income > 50000) {
        this.total = -1;
      } else {
        this.Discount7 = income <= 1000 ? this.total * 0.7 : 0;
        this.Discount8 = income <= 5000 ? this.total * 0.8 : 0;
        this.Discount9 = income <= 15000 ? this.total * 0.9 : 0;
      }
    },
    ZX_count() {
      this.SJ_count();
      this.total *= 1.5;
      this.Discount6 *= 1.5;
      this.Discount5 *= 1.5;
      this.Discount4 *= 1.5;
    },
    // 年度审计
    SJ_count() {
      let _self = this;
      var C4 = _self.searchData.income * 10000 + 200;
      this.total =
        C4 < 500000
          ? 2000
          : C4 < 1000000
          ? 2000 + ((C4 - 500000) * 0.2) / 100
          : C4 < 5000000
          ? 3000 + ((C4 - 1000000) * 0.09) / 100
          : C4 < 10000000
          ? 6600 + ((C4 - 5000000) * 0.07) / 100
          : C4 < 50000000
          ? 10100 + ((C4 - 10000000) * 0.05) / 100
          : C4 < 100000000
          ? 30100 + ((C4 - 50000000) * 0.03) / 100
          : C4 < 500000000
          ? 45100 + ((C4 - 100000000) * 0.015) / 100
          : C4 < 1000000000
          ? 105100 + ((C4 - 500000000) * 0.01) / 100
          : 155100 + ((C4 - 1000000000) * 0.008) / 1000;
      //   this.Discount6 = Math.max(2000, this.total * 0.6);
      //   this.Discount5 = C4 < 500 * 10000 ? 0 : this.total * 0.5;
      //   this.Discount4 = C4 < 1000 * 10000 ? 0 : this.total * 0.4;
      _self.Discount5 = C5 >= 0 ? this.total * 0.5 : 0;
      _self.Discount5 = _self.Discount5 < 1500 ? 1500 : _self.Discount5;
      _self.Discount4_5 = C5 > 500 * 10000 ? this.total * 0.45 : 0;
      _self.Discount3_5 = C5 > 1000 * 10000 ? this.total * 0.35 : 0;
    },
    // 所得税
    ZXQJ_count() {
      let _self = this;
      var C3 = _self.searchData.income * 10000;
      this.total =
        C3 < 1000000
          ? Math.max(1500, (C3 * 0.3) / 100)
          : C3 < 5000000
          ? 3000 + ((C3 - 1000000) * 0.1) / 100
          : C3 < 10000000
          ? 7000 + ((C3 - 5000000) * 0.05) / 100
          : C3 < 50000000
          ? 9500 + ((C3 - 10000000) * 0.03) / 100
          : C3 < 100000000
          ? 21500 + ((C3 - 50000000) * 0.02) / 100
          : C3 < 500000000
          ? 31500 + ((C3 - 100000000) * 0.01) / 100
          : C3 < 1000000000
          ? 71500 + ((C3 - 500000000) * 0.005) / 100
          : 96500 + ((C3 - 1000000000) * 0.002) / 100;

      //   this.Discount6 = Math.max(1200, this.total * 0.6);
      //   this.Discount5 = C3 < 500 * 10000 ? 0 : this.total * 0.5;
      //   this.Discount4 = C3 < 1000 * 10000 ? 0 : this.total * 0.4;
      _self.Discount5 = C5 >= 0 ? this.total * 0.5 : 0;
      _self.Discount5 = _self.Discount5 < 1200 ? 1200 : _self.Discount5;
      _self.Discount4_5 = C5 > 500 * 10000 ? this.total * 0.45 : 0;
      _self.Discount3_5 = C5 > 1000 * 10000 ? this.total * 0.35 : 0;
    },
    ZXQS_count() {
      let _self = this;
      var C6 = _self.searchData.income * 10000;

      this.total = C6 == 0 ? 1200 : C6 < 1000 * 10000 ? 1200 : 2000;
      this.Discount6 = 0;
      this.Discount5 = 0;
      this.Discount4 = 0;
    },
    search() {
      let _self = this;
      this.Discount3 = 0;
      this.Discount4 = 0;
      this.Discount5 = 0;
      this.Discount6 = 0;
      this.Discount7 = 0;
      this.Discount8 = 0;
      this.Discount9 = 0;
      this.Discount3_5 = 0;
      this.Discount4_5 = 0;
      this.Discount5_5 = 0;
      if (_self.searchData.product == "jzbg") {
        switch (_self.searchData.type) {
          case "yz":
            _self.yz_count();
            break;
          case "zxsj":
            _self.ZX_count();
            break;
          case "zxqs":
            _self.ZXQS_count();
            break;
          case "ndsjbg":
            _self.SJ_count();
            break;
          case "sdshsqj":
            _self.ZXQJ_count();
            break;
          case "engineering":
            _self.engineeringCount();
            break;
          case "service":
            _self.serviceCount();
            break;
          default:
            _self.total = 0;
        }
      } else if (_self.searchData.product == "zcpg") {
        if (_self.searchData.income * 10000 < 20000) {
          this.total = 2000;
        } else if (_self.searchData.income <= 1000000) {
          this.total = _self.searchData.income * 10000 * 0.1;
        } else if (_self.searchData.income <= 10000000) {
          this.total = _self.searchData.income * 10000 * 0.045 + 0.55 * 10000;
        } else if (_self.searchData.income <= 50000000) {
          this.total = _self.searchData.income * 10000 * 0.015 + 3.55 * 10000;
        } else if (_self.searchData.income <= 100000000) {
          this.total = _self.searchData.income * 10000 * 0.01 + 6.05 * 10000;
        } else if (_self.searchData.income <= 1000000000) {
          this.total = _self.searchData.income * 10000 * 0.002 + 14.5 * 10000;
        } else {
          this.total = _self.searchData.income * 10000 * 0.0015 + 19.05 * 10000;
        }

        if (_self.searchData.income * 10000 <= 2 * 10000) {
          this.Discount5 = 0;
          this.Discount4 = 0;
          this.Discount3 = 0;
        } else if (_self.searchData.income * 10000 <= 1000 * 10000) {
          this.Discount5 = _self.total * 0.5;
          // console.log(this.Discount5)
          this.Discount4 = 0;
          this.Discount3 = 0;
        } else if (_self.searchData.income * 10000 < 5000 * 10000) {
          this.Discount4 = _self.total * 0.4;
          this.Discount5 = 0;
          this.Discount3 = 0;
        } else if (_self.searchData.income * 10000 >= 5000 * 10000) {
          this.Discount3 = _self.total * 0.3;
          this.Discount5 = 0;
          this.Discount4 = 0;
        } else {
          this.Discount5 = 0;
          this.Discount4 = 0;
          this.Discount3 = 0;
        }
      } else {
        _self.total = 0;
      }
    }
  }
};
</script>
