 <template>
  <Row style="margin-bottom:10px">
    <Collapse v-model="search_model">
      <Panel name="1">
        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
        筛选
        <div slot="content" @keydown.enter="search">
          <Form ref="searchModel" :model="searchModel" :label-width="100" style="margin-top: -10px">
            <Row>
              <template v-for="(item, index) in this.config">
                <Col v-if="item.type == 'date'" :key="index" span="6">
                  <FormItem :key="index" :label="item.label">
                    <DatePicker
                      format="yyyy-MM-dd"
                      type="daterange"
                      style="width: 100%"
                      size="small"
                      @on-change="onDateChange($event, item.key)"
                      v-model="searchModel[item.key]"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col v-if="item.type == 'select'" :key="index" span="6">
                  <FormItem :key="index" :label="item.label">
                    <Select size="small" :key="index" v-model="searchModel[item.key]">
                      <Option v-for="item in item.option" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </Col>

                <Col v-if="item.type == 'input'" :key="index" span="6">
                  <FormItem :key="index" :label="item.label">
                    <Input size="small" type="text" v-model="searchModel[item.key]" />
                  </FormItem>
                </Col>
              </template>
              <Col span="6">
                <FormItem>
                  <Button size="small" type="primary" @click="search">查询</Button>
                  <Button size="small" type="ghost" style="margin-left:10px" @click="reset">清空</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </Row>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
      search_model:1,
      searchModel: {}
    };
  },
  methods: {
    search() {
      let { searchModel, config = [] } = this;
      let tempConfig = JSON.parse(JSON.stringify(searchModel));
      config
        .filter(v => v.type == 'date')
        .forEach(v => {
          tempConfig[`b${v.key}`] = searchModel[v.key][0];
          tempConfig[`e${v.key}`] = searchModel[v.key][1];
          delete tempConfig[v.key];
        });

      this.$emit('search', tempConfig);
    },
    reset() {
      this.searchModel = {};
      this.$emit('reset');
    },
    // 对时间类型进行处理
    onDateChange(date, key) {
      this.searchModel[key] = date;
    }
  },
  created() {}
};
</script>

<style>
  .ivu-col-span-6 {
    height: 28px;
  }
</style>