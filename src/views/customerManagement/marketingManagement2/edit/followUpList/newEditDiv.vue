<template>
    <div>
        <div class="text-textarea"
             ref="msg"
             v-html="innerText"
             contenteditable="true"
             placeholder="请输入跟进记录......"
             @focus="lock=true"
             @blur="lock=false"
             @input="changeText">
        </div>
    </div>
</template>

<script>
    export default {
        name: "newEditDiv",
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
            'value': {
                handler(newValue, oldValue){
                    if (!this.lock) {
                        this.innerText = this.value
                    }
                    if (!newValue) {
                        this.$refs.msg.innerHTML = '';
                    }
                },
                deep:true
            }
        },
        methods:{
            changeText(e){
                this.value = this.$el.innerText;
                this.$emit('input',this.value);
                // this.keepLastIndex(e)
            },
            // keepLastIndex(obj) {
            //     if (window.getSelection) {//ie11 10 9 ff safari
            //         obj.focus(); //解决ff不获取焦点无法定位问题
            //         let range = window.getSelection();//创建range
            //         range.selectAllChildren(obj);//range 选择obj下所有子内容
            //         range.collapseToEnd();//光标移至最后
            //     }
            //     else if (document.selection) {//ie10 9 8 7 6 5
            //         let range = document.selection.createRange();//创建选择对象
            //         //var range = document.body.createTextRange();
            //         range.moveToElementText(obj);//range定位到obj
            //         range.collapse(false);//光标移至最后
            //         range.select();
            //     }
            // }

        },
        created() {
            this.$bus.off("RESET_INNERTEXT",true)
            this.$bus.on("RESET_INNERTEXT",(e)=>{
                this.value = null
                this.innerText = null
            })
        }
    }
</script>

<style>
    .text-textarea{
        width: 100%;
        min-height: 60px;
        line-height: 20px;
        margin-left: auto;
        margin-right: auto;
        padding: 3px;
        outline: 0;
        border: 1px solid #dddee1;
        border-bottom: none;
        font-size: 12px;
        word-wrap: break-word;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-user-modify: read-write-plaintext-only;
    }
    .text-textarea:empty::before{
        color: #ccc;
        content: attr(placeholder);
    }
</style>