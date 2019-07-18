# 甘特图

##### demo 参见排程表

### slot
名称 | 说明
---|---
eventBox | 事件展示方式，需要与row属性配合，展示多少行使用多少row，返回当前单元格数据
hover-box | 悬浮框,返回当前单元格数据

### 数据形式
```
[
            {
                realname: '陈志超',
                innerData: [
                    {
                        start: '2019/1/21 8:23', => 必须
                        end: '2019/1/21 9:45', => 非必须
                        title: '五山税务所', 
                        bg: '#fff' => 背景颜色
                    },
                    {
                        start: '2019/1/21 12:23',
                        end: '2019/1/21 16:45',
                        title: '工商银行博展分行',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 20:00',
                        end: '2019/1/21 21:35',
                        title: '航天信息',
                        bg: '#fff'
                    }
                ]
            },
            {
                realname: '测财商',
                innerData: [
                    {
                        start: '2019/1/21 9:00',
                        end: '2019/1/21 10:00',
                        title: '农业银行',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 19:00',
                        end: '2019/1/22 20:35',
                        title: '客户',
                        bg: '#fff'
                    },
                    {
                        start: '2019/1/21 11:00',
                        end: '2019/1/21 14:00',
                        title: '天河科技园',
                        bg: '#fff'
                    }
                ]
            }
```


### 事件
事件名称 | 说明 | 返回值
--- | --- | ---
event-click | 事件点击 | event, jsEvent
icon-close | 关闭 | event
event-enter | 鼠标划入 | event
