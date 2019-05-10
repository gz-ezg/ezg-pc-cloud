<template>
    <div>
        <div class="text-textareaa"
             v-html="innerText"
             contenteditable="true"
             placeholder="请输入要添加的快捷短语......"
             @focus="lock=true"
             @blur="lock=false"
             @input="changeText">
        </div>
    </div>
</template>

<script>
    export default {
        name: "editDiv",
        props:{
            value:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                innerText:this.value,
                lock:false
            }
        },
        watch:{
            'value'(){
                if (!this.lock){
                    this.innerText = this.value
                }
            }
        },
        methods:{
            changeText(){
                this.innerText = this.$el.innerText;
                this.$emit('input',this.innerText);
            }
        }
    }
</script>

<style>
    .text-textareaa{
        width: 100%;
        min-height: 130px;
        line-height: 20px;
        margin-left: auto;
        margin-right: auto;
        padding: 3px;
        outline: 0;
        border: 1px solid #dddee1;
        font-size: 12px;
        word-wrap: break-word;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-user-modify: read-write-plaintext-only;
    }
    .text-textareaa:empty::before{
        color: #ccc;
        content: attr(placeholder);
    }
</style>