<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <!--
        菜单控制 active-name:当前打开的菜单
        open-names:展开的 Submenu 的 name 集合
        accordion:手风琴效果
    -->
    <!-- <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu" > -->
    <Menu ref="sideMenu" :active-name="$route.name" :theme="menuTheme" width="auto" @on-select="changeMenu" accordion>

        <template v-for="item in menuList">
            <!--
                修复当只有一个子菜单时，页面不显示父级标题的问题
                同时修改的位置还有store中的app.js
            -->
            <!-- <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
            </MenuItem> -->

            <!-- <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name"> -->
            <Submenu :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize" style="width:17.5px"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    },
    mounted() {
        // console.log(this.menuList)
    },

};
</script>
