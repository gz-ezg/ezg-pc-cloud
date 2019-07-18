<template>
  <div>
    <Tabs value="name1">
      <TabPane label="菜单" name="name1">
        <menuList></menuList>
      </TabPane>
      <TabPane label="按钮" name="name2">
        <buttonList></buttonList>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import buttonList from './tabPane/buttonList';
import menuList from './tabPane/menuList';

export default {
  components: {
    buttonList,
    menuList
  },
  data() {
    return {};
  }
};
</script>

