<template>
    <div>
        <div class="timer-shaft-wrap">
            <div class="timeline">
                <ul>
                    <li v-for="(item, index) in data" :key="index" :class="[item.type == 'left' ? 'left-content' : 'right-content']">
                        <i class="tl-circle"></i>
                        <div class="timeline-content ivu-card-bordered" >
                            <span>{{item.date}}</span>
                            <p>{{item.text}}</p>
                        </div>
                    </li>
                    <li v-if="pending" class="left-content">
                        <i class="tl-circle"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pending: {
            type: [String, Boolean],
            default: false
        },
        data: {
            type: [String, Array],
            default: () => {
                return [
                    {
                        id: 1,
                        type: "left",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-10"
                    },
                    {
                        id: 2,
                        type: "right",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-14"
                    },
                    {
                        id: 3,
                        type: "left",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-19"
                    },
                    {
                        id: 4,
                        type: "left",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-22"
                    },
                    {
                        id: 5,
                        type: "left",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-29"
                    },
                    {
                        id: 6,
                        type: "right",
                        text: "客户数据标识由正常变更为公海池",
                        date: "2018-07-30"
                    }
                ]
            }
        }
    },
    data(){
        return {
        }
    }
}
</script>


<style scoped>
.timeline{
    text-align: center;
    background-color: #fff;    
}
.timeline>ul{
    padding: 0;
    display: inline-block;
    width: 500px;
}
.timeline>ul>li{
    position: relative;
    width: 50%;
    min-height: 17px;
    list-style: none;
    clear: both;    
}
/* 偶数的li在右侧 */
.right-content{
    float: right;
}
.right-content::before{
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 1px;
    height: 100%;
    background-color: #e6e6e6;
}
.right-content i{
    left: -8.5px;
}
.right-content div.timeline-content{
    /* padding-left: 30px; */
    margin-left: 20px;
    padding: 10px;
    margin: 5px;
    margin-top:10px
}
/* 奇数的li在左侧 */
.left-content{
    float: left;
}
.left-content::after{
    display: block;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    width: 1px;
    height: 100%;
    background-color: #e6e6e6;
}
.left-content i{
    right: -8.5px;
}
.left-content div.timeline-content{
    /* padding-right: 30px; */
    margin-right: 20px;
    padding: 10px;
    margin: 5px;
    margin-top:10px
} 
.left-content span{
    text-align: right;
}
 
/* 共同样式 */
.timeline>ul>li div.timeline-content{
    text-align: left;    
    box-sizing: border-box;
}   
.timeline>ul>li img{
    display: block;
    padding: 10px 0;
    width: 100%;
    box-sizing: border-box;
}
.timeline>ul>li p{
    margin: 0;
    color: #555;
}
.timeline>ul>li span{
    margin-bottom: 13px;
    display: block;
    font-size: 15px;
    font-weight: 500;
}
.timeline>ul>li i{
    position: absolute;
    top: 1px;
    z-index: 10;
    width: 17px;
    height: 17px;
    line-height: 20px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #2d8cf0;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
}
</style>

