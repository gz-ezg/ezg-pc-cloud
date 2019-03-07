#  日程表
### slots
名称 | 内容
---|---
fc-header-left | 标题左侧
fc-header-right | 标题右侧
fc-event-card | 内容容器，默认只显示一行，显示title，可做自定义，自行修改
hover-box | 悬浮框，可用于展示更多内容，返回当前悬浮所在事件对象
right-click | 右键点击菜单，返回当前点击日期对象

### 参数
events
形如：
```
    [
        {
            title: 'Sunny 725-727', //必须
            start: '2019-02-01', //必须
            end: '2019-02-01', // 非必须
            cssClass: 'family', //css类型，可用于渲染，参见test8
            属性名：属性值 可自行添加
        },
        {
            title: 'Lunfel 726-727',
            start: '2019-02-26',
            end: '2019-02-26',
            cssClass: ['home', 'work']
        },
        {
            title: 'Lunfel 2/27-2/28',
            start: '2019-02-27',
            end: '2019-02-27'
        },
    ]
```
### 事件
事件名称 | 说明 | 返回值
--- | --- | ---
moreClick | 点击更多 | date, events, jsEvent
dayClick | 点击日期 | date, jsEvent
dayRightClick | 右键点击日期 | date, jsEvent
eventClick | 事件点击 | event, jsEvent, pos

备注：event返回当前事件本体，与传入一致，jsEvent返回原生事件，date返回当前日期，pos返回位置信息

