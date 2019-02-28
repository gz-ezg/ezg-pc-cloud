import moment from 'moment';

let dateFunc = {
  getMonthViewStartDate (date, firstDay) {
    firstDay = parseInt(firstDay);
    let start = moment(date);
    let startOfMonth = moment(start.startOf('month'));

    start.subtract(startOfMonth.day(), 'days');

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days');
    }

    start.add(firstDay, 'days');

    return start;
  },
  getMonthViewEndDate (date, firstDay) {
    return this.getMonthViewStartDate(date, firstDay).add(6, 'w').subtract(1, 'days');
  }
};

export default dateFunc;
