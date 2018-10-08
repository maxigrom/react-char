import DayJs from './DayJs';

class DateHelper {
  static toStringFromNow(date) {
    return DayJs(date).fromNow();
  }
}

export default DateHelper;
