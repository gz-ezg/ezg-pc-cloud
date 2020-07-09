 <template>
  <div>
    <Modal :mask-closable="false" v-model="show" title="新增" width="600" @on-cancel="onCancel">
      <Form
        style="padding-rigth:20px"
        ref="form"
        :model="forms"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="供应商" prop="supplierName">
          <Input v-model="forms.supplierName" />
        </FormItem>

        <FormItem label="联系人" prop="contactName">
          <Input v-model="forms.contactName" />
        </FormItem>

        <FormItem label="电话" prop="tel">
          <Input v-model="forms.tel" />
        </FormItem>
        <FormItem prop="settlementOpenBank" label="开户行">
          <Select v-model="forms.settlementOpenBank" style="width:200px">
            <Option
              v-for="(item,index) in openBankList"
              :key="index"
              :value="item.label"
            >{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开户行支行" prop="settlementOpenBankItem">
          <Input v-model="forms.settlementOpenBankItem" />
        </FormItem>
        <FormItem label="结算账号" prop="settlementAccount">
          <Input v-model="forms.settlementAccount" />
        </FormItem>

        <FormItem label="产品" prop="product">
          <Input v-model="forms.product" @on-focus="openCompany" readonly />
        </FormItem>

        <FormItem label="结算价" prop="settlementPrice">
          <Input type="number" v-model="forms.settlementPrice" />
        </FormItem>

        <FormItem label="销售价">
          <Input v-model="forms.salesPrice" />
        </FormItem>

        <FormItem label="状态" prop="status">
          <RadioGroup v-model="forms.status">
            <Radio label="Y">启用</Radio>
            <Radio label="N">禁用</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="说明">
          <Input
            v-model="forms.remark"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleConfirm" :loading="loading" style="margin-left:20px">确定</Button>
      </div>
    </Modal>
    <company-select @company-change="selectCompany"></company-select>
  </div>
</template>

<script>
import { listUser } from "@A/userApi";
import { marketingCreate } from "@A/logManagement";
import companySelect from "../components/companySelect";
import { supplierCreate } from "../api";
export default {
  components: { companySelect },
  props: ["productId", "product", "salePrice"],
  data() {
    return {
      show: true,
      loading: false,
      userList: "",
      openBankList: [],
      forms: { status: "Y", productId: "", product: "" },
      ruleValidate: {
        supplierName: [
          { required: true, message: "请填写供应商", trigger: "change" }
        ],
        product: [{ required: true, message: "请选择产品", trigger: "change" }],
        settlementPrice: [
          {
            required: true,
            message: "请填写结算价",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //  选择公司后回调
    selectCompany({ id, product }) {
      this.forms.productId = id;
      this.forms.product = product;
    },
    //  打开产品选择
    openCompany() {
      console.log("haha");
      this.$bus.emit("ORDER_OPEN_SELECT_COMPANY", true);
    },

    onCancel() {
      this.$emit("cancel");
    },
    async getOpenBankList() {
      const resp = await this.$queryCodes("open_bank");
      this.openBankList = resp[0];
    },
    handleConfirm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await supplierCreate(this.forms);
          this.$emit("ok");
        } else {
          this.$Message.error("请完善信息");
        }
      });
    }
  },
  created() {
    this.getOpenBankList();
  },
  mounted() {
    this.forms.productId = this.productId;
    this.forms.product = this.product;
    this.forms.salesPrice = this.salePrice;
  }
};
</script>
