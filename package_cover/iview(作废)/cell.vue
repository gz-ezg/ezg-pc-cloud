<template>
    <div :class="classes" ref="cell">
        <template v-if="renderType === 'index'"><span>{{naturalIndex + 1}}</span></template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked" @click.native.stop="handleClick" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
        </template>
        <template v-if="renderType === 'html'"><span v-html="row[column.key]"></span></template>
        <!-- 属性表关键 -->
        <template v-if="renderType === 'normal'">
            <span v-if="column._columnKey == 1" style="display:inline-block;width:18px" v-for="space in row.level" :key="space"></span>
            <Icon type="ios-plus-empty" style="padding-right:5px" v-if="column._columnKey == 1 && row.children && !row.treeOpen" @click="toggleChildren(row,true)"></Icon>
            <Icon type="ios-minus-empty" style="padding-right:5px" v-if="column._columnKey == 1 && row.children && row.treeOpen" @click="toggleChildren(row,false)"></Icon>
            <span><span style="display:inline-block;width:16px" v-if="column._columnKey == 1 && !row.children"></span>{{row[column.key]}}</span>
        </template>
        <template v-if="renderType === 'expand' && !row._disableExpand">
            <div :class="expandCls" @click="toggleExpand">
                <Icon type="ios-arrow-right"></Icon>
            </div>
        </template>
        <Cell
            v-if="renderType === 'render'"
            :row="row"
            :column="column"
            :index="index"
            :render="column.render"></Cell>
    </div>
</template>
<script>
    import Cell from './expand';
    import Icon from '../icon';
    import Checkbox from '../checkbox/checkbox.vue';

    export default {
        name: 'TableCell',
        components: { Icon, Checkbox, Cell },
        props: {
            prefixCls: String,
            row: Object,
            column: Object,
            naturalIndex: Number,    // index of rebuildData
            index: Number,           // _index of data
            checked: Boolean,
            disabled: Boolean,
            expanded: Boolean,
            fixed: {
                type: [Boolean, String],
                default: false
            }
        },
        data () {
            return {
                renderType: '',
                uid: -1,
                context: this.$parent.$parent.$parent.currentContext
            };
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                        [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false,
                        [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand'
                    }
                ];
            },
            expandCls () {
                return [
                    `${this.prefixCls}-cell-expand`,
                    {
                        [`${this.prefixCls}-cell-expand-expanded`]: this.expanded
                    }
                ];
            }
        },
        methods: {
            toggleSelect () {
                this.$parent.$parent.$parent.toggleSelect(this.index);
            },
            toggleExpand () {
                this.$parent.$parent.$parent.toggleExpand(this.index);
            },
            handleClick () {
                // 放置 Checkbox 冒泡
            },
            //  属性表状态转换
            toggleChildren(e,status){
                this.row.treeOpen = !this.row.treeOpen
                for(let i = 0; i<e.children.length;i++){
                    this.toggleChildren(e.children[i], status)
                    console.log(e.children[i].id)
                }
            }
        },
        created () {
            if (this.column.type === 'index') {
                this.renderType = 'index';
            } else if (this.column.type === 'selection') {
                this.renderType = 'selection';
            } else if (this.column.type === 'html') {
                this.renderType = 'html';
            } else if (this.column.type === 'expand') {
                this.renderType = 'expand';
            } else if (this.column.render) {
                this.renderType = 'render';
            } else {
                this.renderType = 'normal';
            }
            // console.log(this.row)
        }
    };
</script>
