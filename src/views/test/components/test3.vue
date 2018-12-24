<template>
    <!-- 解除鼠标事件，暂时方案 -->
    <div style="width:800px;height:500px" @mousemove="!confirmSuccess && mouseMoveFn($event)" @mouseup="!confirmSuccess && moseUpFn($event)">
        <div class="drag" ref="dragDiv" style="width:300px;" >
            <div class="drag_bg"></div>
            <div class="drag_text">{{confirmWords}}</div>
            <div 
                ref="moveDiv" 
                @mousedown="mousedownFn($event)"
                :class="{'handler_ok_bg':confirmSuccess}" 
                class="handler handler_bg" 
                style="position: absolute;top: 0px;left: 0px;"></div>
        </div>
        <!-- iview-table slot -->
        <my-table :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" v-if="editIndex === index" />
                <span v-else>{{ row.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="age">
                <Input type="text" v-model="editAge" v-if="editIndex === index" />
                <span v-else>{{ row.age }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="birthday">
                <Input type="text" v-model="editBirthday" v-if="editIndex === index" />
                <span v-else>{{ getBirthday(row.birthday) }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="address">
                <Input type="text" v-model="editAddress" v-if="editIndex === index" />
                <span v-else>{{ row.address }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                    <Button @click="handleSave(index)">保存</Button>
                    <Button @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                    <Button @click="handleEdit(row, index)">操作</Button>
                </div>
            </template>
        </my-table>
    </div>
</template>

<script>
import myTable from 'iview/src/components/table/table'
    export default {
        components: {
            myTable
        },
        data(){
            return {
                beginClientX:0,
                mouseMoveState:false,
                maxwidth:'',
                confirmWords:'拖动滑块验证',
                confirmSuccess:false,
                columns: [
                {
                    title: '姓名',
                    slot: 'name'
                },
                {
                    title: '年龄',
                    slot: 'age'
                },
                {
                    title: '出生日期',
                    slot: 'birthday'
                },
                {
                    title: '地址',
                    slot: 'address'
                },
                {
                    title: '操作',
                    slot: 'action'
                }
                ],
                data: [
                {
                    name: '王小明',
                    age: 18,
                    birthday: '919526400000',
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    birthday: '696096000000',
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    birthday: '563472000000',
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    birthday: '687024000000',
                    address: '深圳市南山区深南大道'
                }
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editAge: '',  // 第二列输入框
                editBirthday: '',  // 第三列输入框
                editAddress: '',  // 第四列输入框
            }
        },
        methods: {
            mousedownFn:function (e) {
                if(!this.confirmSuccess){
                    e.preventDefault && e.preventDefault();   
                    this.mouseMoveState = true;
                    this.beginClientX = e.clientX;
                }
            },
            successFunction(){
                this.confirmSuccess = true
                this.confirmWords = '验证通过';
                document.getElementsByClassName('drag_text')[0].style.color = '#fff'
                document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
                document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
            },
            mouseMoveFn(e){
                if(this.mouseMoveState){
                    let width = e.clientX - this.beginClientX;
                    if(width>0 && width<=this.maxwidth){
                        document.getElementsByClassName('handler')[0].style.left = width + 'px';
                        document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
                    }else if(width>this.maxwidth){
                        this.successFunction();
                    }
                }
            },
            moseUpFn(e){
                this.mouseMoveState = false;
                var width = e.clientX - this.beginClientX;
                if(width<this.maxwidth){
                    document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
                    document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
                }
            },
            handleEdit (row, index) {
                this.editName = row.name;
                this.editAge = row.age;
                this.editAddress = row.address;
                this.editBirthday = row.birthday;
                this.editIndex = index;
            },
            handleSave (index) {
                this.data[index].name = this.editName;
                this.data[index].age = this.editAge;
                this.data[index].birthday = this.editBirthday;
                this.data[index].address = this.editAddress;
                this.editIndex = -1;
            },
            getBirthday (birthday) {
                const date = new Date(parseInt(birthday));
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}-${month}-${day}`;
            }
        },
        mounted(){
            this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
            this.$off("mousemove","mouseMoveFn")
            // document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
            // document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)
        }
    }
</script>

<style scoped>
    .drag{
        position: relative;
        background-color: #553232;
        width: 100%;
        height: 34px;
        line-height: 34px;
        text-align: center;
    }
    .handler{
        width: 40px;
        height: 32px;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
    }
    .handler_ok_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
    }
    .drag_bg{
        background-color: #7ac23c;
        height: 34px;
        width: 0px;
    }
    .drag_text{
        position: absolute;
        top: 0px;
        width: 100%;text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
    }
</style>