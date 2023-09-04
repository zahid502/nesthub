import {
  differenceInSeconds,
  differenceInYears,
  endOfMonth,
  format,
  isAfter,
  startOfMonth,
} from 'date-fns';

export class DateUtil {
  private static _instance: DateUtil;

  private _undefinedDate = 'N/A';
  private _apiDateFormat = "yyyy-MM-dd'T'HH:mm:ss";

  private _appDateFormat = 'MMM dd, yyyy';
  private _appTimeFormat = 'HH:mm:ss';
  private _timeFormat = 'HH:mm';
  private _appOnlyDateFormatFirebae = 'd-MMM-yyyy';
  private _appOnlyTimeFormatFirebae = 'hh:mm a';
  private _appDateTimeFormatFirebae = 'd-MMM-yyyy hh:mm a';
  private _appDateTimeFormat = 'yyyy-MM-dd HH:mm a';
  private _appDateTimeFormatMail = 'HH:mm a, yyyy-MM-dd';

  private _appTimeFormatDay = 'dd';
  private _scheduleApiDateFormat = 'yyyy-MM-dd';
  private _newApiDateFormat = 'MM/dd/yyyy';
  private _messageChangeFormat = 'dd-MM-yyyy';
  private _scheduleApiTimeFormat = 'hh:mm a  d-MMM-yyyy';

  private _month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  private constructor() {}
  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new DateUtil();
    }

    return this._instance;
  };

  public parseApiDate = (date?: string) => {
    if (!date) return -1;
    new Date(date).getMilliseconds();
  };

  public formatForApiDate = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._newApiDateFormat);
  };
  public formatAppDateToApiDate = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._apiDateFormat);
  };

  public formatMillisToAppDate = (millis?: number) => {
    if (!millis) return this._undefinedDate;
    return format(new Date(millis), this._appDateFormat);
  };

  public formatMillisToAppTime = (millis?: number) => {
    if (!millis) return this._undefinedDate;
    return format(new Date(millis), this._appTimeFormat);
  };

  public formatScheduleTime = (date?: string | Date | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._scheduleApiTimeFormat);
  };

  public formatApiDateToAppDate = (date?: string | Date) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateFormat);
  };

  public formatApiDateToAppTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appTimeFormat);
  };
  public formatApiDateToTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._timeFormat);
  };

  public formatApiDateToAppOnlyDateFirebase = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appOnlyDateFormatFirebae);
  };

  public formatApiDateToAppOnlyTimeFirebase = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appOnlyTimeFormatFirebae);
  };

  public formatApiDateToAppDateTimeFirebase = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormatFirebae);
  };

  public formatApiDateToAppDateTimeMail = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormatMail);
  };

  public formatApiDateToAppTimeDay = (date?: string) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appTimeFormatDay);
  };

  public formatApiDateToAppDateTime = (date?: string | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._appDateTimeFormat);
  };

  public formatDateForCalendar = (date?: Date | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._scheduleApiDateFormat);
  };

  public formatDateForMessageChange = (date?: Date | number) => {
    if (!date) return this._undefinedDate;
    return format(new Date(date), this._messageChangeFormat);
  };

  public startOfMonth = (date?: Date | number) => {
    if (!date) return this._undefinedDate;
    return format(startOfMonth(date), this._scheduleApiDateFormat);
  };

  public endOfMonth = (date?: Date | number) => {
    if (!date) return this._undefinedDate;
    return format(endOfMonth(date), this._scheduleApiDateFormat);
  };

  public getAge = (date?: string) => {
    if (!date) return -1;
    return differenceInYears(new Date(), new Date(date));
  };

  public getSecondDiff = (date: Date) => {
    if (!date) return -1;
    return differenceInSeconds(new Date(), date);
  };

  public isAfterDate = (date: Date | number) => {
    if (!date) return -1;
    return isAfter(new Date(), date);
  };

  public getIsAfterDate = (messageDate: Date) => {
    if (!messageDate) return -1;
    return isAfter(messageDate, new Date(2022, 9, 4));
  };
  public getChatDate = (messageDate: Date | any) => {
    if (!messageDate) return -1;
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let mothName = this._month[currentDate.getMonth()];
    let date = messageDate?.split('-');
    let day = currentDate.getDate();
    let dayDiff = day - date[0];

    if (dayDiff == 0 && mothName == date[1] && year == date[2]) {
      return 'Today';
    } else if (dayDiff == 1 && mothName == date[1] && year == date[2]) {
      return 'Yesterday';
    } else {
      return messageDate;
    }
  };
  public convertServerDateToLocal(dateInput: any) {
    // EST - UTC offset: 5 hours
    var offset = 4.0,
      /*
- calculate the difference between the server date and UTC
- the value returned by the getTime method is the number of milliseconds since 1 January 1970 00:00:00 UTC.
- the time-zone offset is the difference, in minutes, between UTC and local time
- 60000 milliseconds = 60 seconds = 1 minute
*/
      serverDate = new Date(dateInput),
      utc = serverDate.getTime() - serverDate.getTimezoneOffset() * 60000,
      /*
- apply the offset between UTC and EST (5 hours)
- 3600000 milliseconds = 3600 seconds = 60 minutes = 1 hour
*/
      clientDate = new Date(utc + 3600000 * offset);
    return clientDate.toLocaleString();
  }
}
