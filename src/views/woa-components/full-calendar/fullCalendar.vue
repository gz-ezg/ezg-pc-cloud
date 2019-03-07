<template>
  <div class="comp-full-calendar" @click="rightClick=false">
    <!-- 日程表头 -->
    <fc-header
      :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth"
    >
      <!-- 表头左侧 -->
      <div slot="header-left">
        <slot name="fc-header-left"></slot>
      </div>
      <!-- 表头右侧（后期也许扩展成月周日形式，待定） -->
      <div slot="header-right">
        <slot name="fc-header-right"></slot>
      </div>
    </fc-header>
    <!-- 日期及事件渲染 -->
    <div class="full-calendar-body">
      <div class="weeks">
        <strong
          class="week"
          v-for="dayIndex in 7"
          :key="dayIndex"
        >{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div class="dates" ref="dates">
        <div class="dates-bg">
          <div class="week-row" v-for="(week, index) in currentDates" :key="index">
            <div
              class="day-cell"
              v-for="(day, index2) in week"
              :class="{'today' : day.isToday,'not-cur-month' : !day.isCurMonth}"
              :key="index2"
            >
              <p class="day-number">{{ day.monthDay }}</p>
            </div>
          </div>
        </div>
        <div class="dates-events">
          <div class="events-week" v-for="(week, index) in currentDates" :key="index">
            <div
              class="events-day"
              v-for="(day, index2) in week"
              :key="index2"
              track-by="$index"
              :class="{'today' : day.isToday, 'not-cur-month' : !day.isCurMonth}"
              @click.stop="dayClick(day.date, $event)"
              @click.right.prevent="dayRightClick(day.date, $event)"
            >
              <p class="day-number">{{day.monthDay}}</p>
              <div class="event-box">
                <event-card
                  :event="event"
                  :date="day.date"
                  :firstDay="firstDay"
                  v-for="(event, index) in day.events"
                  v-show="event.cellIndex <= eventLimit"
                  @click="eventClick"
                  :key="index"
                  @mouseenter="eventEnter"
                  @mouseleave="eventLeave"
                >
                  <template slot-scope="p">
                    <slot name="fc-event-card" :event="p.event">{{p.event.title}}</slot>
                  </template>
                </event-card>
                <p
                  v-if="day.events.length > eventLimit"
                  class="more-link"
                  @click.stop="selectThisDay(day, $event)"
                >+ {{day.events[day.events.length -1].cellIndex - eventLimit}} 显示更多</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 显示更多 -->
        <div
          class="more-events"
          v-show="showMore"
          :style="{left: morePos.left + 'px', top: morePos.top + 'px'}"
        >
          <div class="more-header">
            <span class="title">{{ moreTitle(selectDay.date) }}</span>
            <span class="close" @click.stop="showMore = false">x</span>
          </div>
          <div class="more-body">
            <ul class="body-list">
              <li
                v-for="(event, index) in selectDay.events"
                v-show="event.isShow"
                class="body-item"
                @click="eventClick(event, $event)"
                :key="index"
              >{{event.title}}</li>
            </ul>
          </div>
        </div>
        <!-- 待定功能 -->
        <slot name="body-card"></slot>
        <!-- 事件悬浮层 -->
        <div
          v-if="hoverBox"
          class="hover-box"
          :style="{top: hoverStyle.top + 'px', left: hoverStyle.left + 'px'}"
        >
          <!-- <p>{{currentEvent}}</p> -->
          <slot name="hover-box" :event="currentEvent"></slot>
        </div>
        <!-- 点击日期右键 -->
        <div
          v-if="rightClick"
          class="right-box"
          :style="{top: hoverStyle.top + 'px', left: hoverStyle.left + 'px'}"
          @click="rightClick=false"
        >
          <slot name="right-click" :time="rightCurrentTime"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  相关demo详见test8
import dateFunc from './components/dateFunc';
import moment from 'moment';
import EventCard from './components/eventCard.vue';
import FcHeader from './components/header';

export default {
  props: {
    events: {
      type: Array,
      default: []
    },
    locale: {
      type: String,
      default: 'zh-cn'
    },
    firstDay: {
      type: Number | String,
      validator(val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6
      },
      default: 0
    }
  },
  components: {
    'event-card': EventCard,
    'fc-header': FcHeader
  },
  created() {
    this.emitChangeMonth(this.currentMonth);
  },
  data() {
    return {
      currentMonth: moment().startOf('month'),
      isLismit: true,
      eventLimit: 3,
      showMore: false,
      morePos: {
        top: 0,
        left: 0
      },
      selectDay: {},
      hoverBox: false,
      hoverStyle: {
        top: 0,
        left: 0
      },
      currentEvent: {},
      rightClick: false,
      rightCurrentTime: {}
    }
  },
  computed: {
    currentDates() {
      return this.getCalendar()
    }
  },
  methods: {
    emitChangeMonth(firstDayOfMonth) {
      this.rightClick = false;
      this.currentMonth = firstDayOfMonth;
      let start = dateFunc.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
      let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);

      this.$emit('changeMonth', start, end, firstDayOfMonth)
    },
    moreTitle(date) {
      if (!date) return '';
      return moment(date).format('ll');
    },
    //  生成日程表
    getCalendar() {
      let monthViewStartDate = dateFunc.getMonthViewStartDate(this.currentMonth, this.firstDay);
      let calendar = [];

      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = [];

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), 'day'),
            isCurMonth: monthViewStartDate.isSame(this.currentMonth, 'month'),
            weekDay: perDay,
            date: moment(monthViewStartDate),
            events: this.slotEvents(monthViewStartDate)
          });

          monthViewStartDate.add(1, 'day');
        }

        calendar.push(week);
      }
      return calendar
    },
    //  过滤当日事件
    slotEvents(date) {
      let cellIndexArr = [];
      let thisDayEvents = this.events.filter(day => {

        let st = moment(day.start.slice(0, 10));
        let ed = moment(day.end ? day.end : st);

        return date.isBetween(st, ed, null, '[]');
      });
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1;
        if (!b.cellIndex) return -1;
        return a.cellIndex - b.cellIndex
      });

      for (let i = 0; i < thisDayEvents.length; i++) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1);
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex == i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: 'holder',
          cellIndex: i + 1,
          start: date.format(),
          end: date.format(),
          isShow: false
        })
      }

      return thisDayEvents
    },
    //  显示更多
    selectThisDay(day, jsEvent) {
      this.selectDay = day;
      this.showMore = true;
      this.morePos = this.computePos(event.target);
      this.morePos.top -= 100;
      let events = day.events.filter(item => {
        return item.isShow == true
      });
      this.$emit('moreClick', day.date, events, jsEvent)
    },
    //  计算坐标
    computePos(target) {
      let eventRect = target.getBoundingClientRect();
      let pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      }
    },
    //  日期点击
    dayClick(day, jsEvent) {
      this.rightClick = false
      this.$emit('dayClick', day._d, jsEvent)
    },
    //  日期右键点击
    dayRightClick(day, jsEvent) {
      this.hoverStyle = {
        top: jsEvent.pageY,
        left: jsEvent.pageX
      }
      this.rightClick = true
      this.rightCurrentTime = day
      this.$emit('dayRightClick', day._d, jsEvent)
    },
    //  事件点击
    eventClick(event, jsEvent) {
      this.rightClick = false
      if (!event.isShow) return;
      jsEvent.stopPropagation();
      let pos = this.computePos(jsEvent.target);
      this.$emit('eventClick', event, jsEvent, pos);
    },
    //  事件划入
    eventEnter(event, jsEvent) {
      this.rightClick = false
      if (!event.isShow) return;
      jsEvent.stopPropagation();
      let pos = this.computePos(jsEvent.target);
      this.currentEvent = event;
      this.hoverStyle = pos;
      this.hoverBox = true;
    },
    //  事件离开
    eventLeave(event, jsEvent) {
      this.hoverBox = false;
    }
  },
  filters: {
    localeWeekDay(weekday, firstDay, locale) {
      firstDay = parseInt(firstDay);
      const localMoment = moment().locale(locale);
      return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
    }
  }
}

</script>
<style lang="scss">
.comp-full-calendar {
  // font-family: "elvetica neue", tahoma, "hiragino sans gb";
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  ul,
  p {
    margin: 0;
    padding: 0;
  }
}

.full-calendar-body {
  margin-top: 20px;
  .hover-box{
    width:400px;
    position:absolute;
    z-index:9999
  }
  .right-box{
    position:fixed;
    z-index:9000
  }
  .weeks {
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    .week {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e0e0e0;
    }
  }
  .dates {
    position: relative;
    .week-row {
      // width: 100%;
      // position:absolute;
      border-left: 1px solid #e0e0e0;
      display: flex;
      .day-cell {
        flex: 1;
        min-height: 110px;
        padding: 4px;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        .day-number {
          text-align: right;
        }
        &.today {
          background-color: #fcf8e3;
        }
        &.not-cur-month {
          .day-number {
            color: rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
    .dates-events {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      .events-week {
        display: flex;
        .events-day {
          cursor: pointer;
          flex: 1;
          min-height: 110px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number {
            text-align: right;
            padding: 4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, 0.24);
            }
          }
          .event-box {
            .event-item {
              cursor: pointer;
              font-size: 12px;
              background-color: #c7e6fd;
              margin-bottom: 2px;
              color: rgba(0, 0, 0, 0.87);
              padding: 0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start {
                margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end {
                margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity {
                opacity: 0;
              }
            }
            .more-link {
              cursor: pointer;
              // text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0, 0, 0, 0.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events {
      position: absolute;
      width: 150px;
      z-index: 2;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      .more-header {
        background-color: #eee;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .title {
          flex: 1;
        }
        .close {
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body {
        height: 146px;
        overflow: hidden;
        .body-list {
          height: 144px;
          padding: 5px;
          overflow: auto;
          background-color: #fff;
          .body-item {
            cursor: pointer;
            font-size: 12px;
            background-color: #c7e6fd;
            margin-bottom: 2px;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>