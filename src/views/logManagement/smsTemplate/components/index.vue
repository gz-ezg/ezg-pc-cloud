 <template>
  <Row style="margin-bottom:10px">
    <Collapse>
      <Panel name="1">
        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
        筛选
        <div slot="content" @keydown.enter="search">
          <Form ref="searchModel" :model="searchModel" :label-width="100">
            <Row :gutter="16">
              <template v-for="(item, index) in this.searchConf">
                <Col v-if="item.type == 'input'" :key="index" span="8">
                  <FormItem :key="index" :label="item.label">
                    <Input size="small" type="text" v-model="searchModel[item.key]" placeholder="" />
                  </FormItem>
                </Col>
                <Col v-if="item.type == 'time'" :key="index" span="8">
                  <FormItem :key="index" :label="item.label">
                    <DatePicker
                      format="yyyy-MM-dd"
                      type="daterange"
                      style="width: 100%"
                      size="small"
                      v-model="searchModel.date"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col v-if="item.type == 'select'" :key="index" span="8">
                  <FormItem :key="index" :label="item.label">
                    <Select :key="index" v-model="searchModel[item.key]">
                      <Option v-for="item in item.option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </template>
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
</template>

<script>
export default {
  props: ['searchConf', 'parent'],
  data() {
    return {
      searchModel: {}
    };
  },
  methods: {
    search() {
      let searchFrom = {};
      for (let key in this.searchModel) {
        searchFrom[key] = this.searchModel[key];
      }
      this.$emit('ok', searchFrom);
    },
    reset() {
      this.searchModel = {};
      this.parent.getListConfig = {
        page: 1,
        pageSize: 10
      };
      this.parent.getTableData();
    }
  },
  created() {
    console.log(this.searchConf);
  }
};
</script>
