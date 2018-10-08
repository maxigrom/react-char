import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // load on demand
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru');
dayjs.extend(relativeTime);

const DayJs = dayjs;

export default DayJs;
