 <template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="show"
      :title="type=='show'?'查看':'编辑'"
      width="500"
      @on-cancel="onCancel"
    >
      <Form
        style="padding-rigth:20px"
        ref="form"
        :model="forms"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="供应商" prop="supplierName">
          <Input :readonly="type=='show'" v-model="forms.supplierName" />
        </FormItem>

        <FormItem label="联系人" prop="contactName">
          <Input :readonly="type=='show'" v-model="forms.contactName" />
        </FormItem>

        <FormItem label="电话" prop="tel">
          <Input :readonly="type=='show'" v-model="forms.tel" />
        </FormItem>

        <FormItem label="结算账号" prop="settlementAccount">
          <Input :readonly="type=='show'" v-model="forms.settlementAccount" />
        </FormItem>

        <FormItem label="产品" prop="product">
          <Input v-model="forms.product" @on-focus="openCompany" readonly />
        </FormItem>

        <FormItem label="结算价" prop="settlementPrice">
          <Input :readonly="type=='show'" type="number" v-model="forms.settlementPrice" />
        </FormItem>

        <FormItem label="销售价" prop="salesPrice">
          <Input :readonly="type=='show'" type="number" v-model="forms.salesPrice" />
        </FormItem>

        <FormItem label="状态" prop="status">
          <RadioGroup v-model="forms.status">
            <Radio label="Y">启用</Radio>
            <Radio label="N">搁置</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="说明">
          <Input
            v-model="forms.remark"
            :readonly="type=='show'"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          v-if="type!=='show'"
          type="primary"
          @click="handleConfirm"
          :loading="loading"
          style="margin-left:20px"
        >确定</Button>
      </div>
      <!-- 产品选择 -->
    </Modal>
    <company-select @company-change="selectCompany"></company-select>
  </div>
</template>

<script>
import { listUser } from "@A/userApi";
import { marketingCreate } from "@A/logManagement";
import companySelect from "../components/companySelect";
import { supplierUpdate } from "../api";
export default {
  components: { companySelect },
  props: { initForm: Object, type: String },
  data() {
    return {
      show: true,
      loading: false,
      userList: "",
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
        ],
        salesPrice: [
          {
            required: true,
            message: "请填写销售价",
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
      if (this.type !== "show") {
        this.$bus.emit("ORDER_OPEN_SELECT_COMPANY", true);
      } else {
        return;
      }
    },

    onCancel() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await supplierUpdate(this.forms);
          this.$emit("ok");
        } else {
          this.$Message.error("请完善信息");
        }
      });
    }
  },
  created() {
    this.forms.id = this.initForm.id;
    this.forms.productId = this.initForm.product_id;
    this.forms.product = this.initForm.product;
    this.forms.remark = this.initForm.remark;
    this.forms.supplierName = this.initForm.supplier_name;
    this.forms.contactName = this.initForm.contact_name;
    this.forms.tel = this.initForm.tel;
    this.forms.settlementAccount = this.initForm.settlement_account;
    this.forms.status = this.initForm.status;
    this.forms.salesPrice = this.initForm.sales_price;
    this.forms.settlementPrice = this.initForm.settlement_price;
  }
};
</script>
