// @flow
import DayJs from '../Wrappers/DayJs';

class DateHelper {
  static toStringFromNow(date: number): string {
    return DayJs(date).fromNow();
  }
}

export default DateHelper;
