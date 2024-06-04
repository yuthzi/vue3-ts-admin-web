/**
 * Date对象的补充函数
 */

/**
 * 时间清零，只保留日期
 * @param d
 * @returns
 */
export function toMidnight(d: Date) {
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}

export function daysAgo(d: Date, days: number, midnight = false): Date {
  days = days ? days - 0 : 0
  d.setDate(d.getDate() - days)
  if (midnight) {
    toMidnight(d)
  }

  return d
}

export function monthBegin(d: Date, offset = 0): Date {
  offset = offset ? offset - 0 : 0
  const days = d.getDate() - 1 - offset
  return daysAgo(d, days, true)
}

export function quarterBegin(d: Date): Date {
  const month = d.getMonth() - (d.getMonth() % 3)
  return toMidnight(new Date(d.getFullYear(), month, 1))
}

export function yearBegin(d: Date): Date {
  return toMidnight(new Date(d.getFullYear(), 0, 1))
}

export function strftime(d: Date) {}

export const localLabels = {
  monthes: {
    english: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    en: [
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
    ],
    zh: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },
  weekdays: {
    english: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    zh: ['日', '一', '二', '三', '四', '五', '六'],
  },
  meridians: {
    english: ['a.m.', 'p.m.'],
    en: ['AM', 'PM'],
    zh: ['上午', '下午'],
  },
  dayagos: {
    english: ['Today', 'Yesterday', 'Tomorrow', ' days ago', ' days late'],
    en: ['Today', 'Yesterday', 'Tomorrow', ' days ago', ' days late'],
    zh: ['今天', '昨天', '明天', '天前', '天后'],
  },
}
