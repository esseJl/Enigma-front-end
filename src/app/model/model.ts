export interface Page {
  content: any[],
  totalPages: number,
  currentPage: number,
  totalElements: number,
  size: number
}

export interface Week {
  id: number,
  date: Date
}


export interface CandleHour {
  id: number | null | undefined,
  date: string,
  volume: number,
  realOpen: number,
  preOpen: number,
  preOpenDay: number,
  preOpenWeek: number,
  realHigh: number,
  preHigh: number,
  preHighDay: number,
  preHighWeek: number,
  realLow: number,
  preLow: number,
  preLowDay: number,
  preLowWeek: number,
  realClose: number,
  preClose: number,
  preCloseDay: number,
  preCloseWeek: number,
  saturationLowWeek: number,
  saturationHighDay: number,
  saturationCloseWeek: number,
  saturationCloseDay: number,
  saturationLowDay: number,
  saturationHighWeek: number,
  saturationOpenDay: number,
  saturationOpenWeek: number,
  indexOpenSlopeDay: number,
  indexOpenSlopeWeek: number,
  indexHighSlopeDay: number,
  indexHighSlopeWeek: number,
  indexLowSlopeDay: number,
  indexLowSlopeWeek: number,
  indexCloseSlopeDay: number,
  indexCloseSlopeWeek: number,
}

export interface CandleHourPredict {
  id: number | null | undefined,
  date: string,
  preOpen: number,
  preHigh: number,
  preLow: number,
  preClose: number
}

export interface CandleHourReal {
  id: number | null | undefined,
  date: string,
  realOpen: number,
  realHigh: number,
  realLow: number,
  realClose: number,
  volume: number
}

export interface CandleDayPre {
  id: number | null | undefined,
  date: string,
  preOpen: number,
  preHigh: number,
  preLow: number,
  preClose: number
}

export interface CandleDayReal {
  id: number | null | undefined,
  date: string,
  realOpen: number,
  realHigh: number,
  realLow: number,
  realClose: number,
  volume: number,
}

export interface CandleWeekPre {
  id: number | null | undefined,
  date: string,
  preOpen: number,
  preHigh: number,
  preLow: number,
  preClose: number
}

export interface CandleWeekReal {
  id: number | null | undefined,
  date: string,
  realOpen: number,
  realHigh: number,
  realLow: number,
  realClose: number,
  volume: number,
}

export interface CandleDay {
  id: number | null | undefined,
  date: string,
  volume: number,
  preOpen: number,
  preOpenWeek: number,
  preOpenSlope: number,
  realOpen: number,
  realOpenComputed: number,
  preHigh: number,
  preHighWeek: number,
  preHighSlope: number,
  realHigh: number,
  realHighComputed: number,
  preLow: number,
  preLowWeek: number,
  preLowSlope: number,
  realLow: number,
  realLowComputed: number,
  preClose: number,
  preCloseWeek: number,
  preCloseSlope: number,
  realClose: number,
  realCloseComputed: number,
  indexOpenSlope: number,
  indexOpenSlopeWeek: number,
  indexHighSlope: number,
  indexHighSlopeWeek: number,
  indexLowSlope: number,
  indexLowSlopeWeek: number,
  indexCloseSlope: number,
  indexCloseSlopeWeek: number,
  saturationOpenWeek: number,
  saturationHighWeek: number,
  saturationLowWeek: number,
  saturationCloseWeek: number,
  candleHourList: CandleHour[]
}

export interface CandleWeek {
  id: number | null | undefined,
  date: string,
  volume: number,
  preOpen: number,
  preOpenSlope: number,
  realOpen: number,
  realOpenComputed: number,
  preHigh: number,
  preHighSlope: number,
  realHigh: number,
  realHighComputed: number,
  preLow: number,
  preLowSlope: number,
  realLow: number,
  realLowComputed: number,
  preClose: number,
  preCloseSlope: number,
  realClose: number,
  realCloseComputed: number,
  indexOpenSlope: number,
  indexHighSlope: number,
  indexLowSlope: number,
  indexCloseSlope: number,
  candleDayList: CandleDay[]
}

export interface DxyDayReal {
  id: number | null | undefined,
  date: string,
  volume: number,
  realOpen: number,
  realHigh: number,
  realLow: number,
  realClose: number
}

export interface Report {
  "totalProfits": number,
  "totalProfitItems": number,
  "totalLosses": number,
  "totalLossItems": number,
  "winRate": number,
  "balance": number,
  "totalItems": number,
  "content": any[],
  "totalFailed": number,
}


export interface DxyDayReal {
  "id": number,
  "date": string,
  "emaOpen": boolean,
  "emaHigh": boolean,
  "emaLow": boolean,
  "emaClose": boolean,
  "satWeeklyOpen": number,
  "satWeeklyHigh": number,
  "satWeeklyLow": number,
  "indexDailyOpen": number,
  "indexDailyHigh": number,
  "indexDailyLow": number,
  "indexDailyClose": number,
  "indexWeeklyOpen": number,
  "indexWeeklyHigh": number,
  "indexWeeklyLow": number,
  "indexWeeklyClose": number,
  "profit": number,
  "distance": number,
  "ema": number,
  "condition": number,
  "error": number,
}

export interface Order {
  id: number | null,
  date: string,
  candleDay: CandleDay,
  emaOpen: boolean,
  emaHigh: boolean,
  emaLow: boolean,
  emaClose: boolean,
  conditions: number,
  satWeeklyOpen: number,
  satWeeklyHigh: number,
  satWeeklyLow: number,
  indexDailyOpen: number,
  indexDailyHigh: number,
  indexDailyLow: number,
  indexDailyClose: number,
  indexWeeklyOpen: number,
  indexWeeklyHigh: number,
  indexWeeklyLow: number,
  indexWeeklyClose: number,
  profit: number,
  distance: number,
  error: number,
}

export interface SearchOrder {
  strategy: string,
  fromDate: string,
  toDate: string,
  orderDate: string,
  conditions: number[],
  satWeeklyOpen: number[],
  satWeeklyHigh: number[],
  satWeeklyLow: number[],
  indexDailyOpen: number[],
  indexDailyHigh: number[],
  indexDailyLow: number[],
  indexDailyClose: number[],
  indexWeeklyOpen: number[],
  indexWeeklyHigh: number[],
  indexWeeklyLow: number[],
  indexWeeklyClose: number[],
  profit: string,
}

export interface DxyDay {
  id: number | null | undefined,
  date: string,
  volume: number,
  preOpen: number,
  realOpen: number,
  preHigh: number,
  realHigh: number,
  preLow: number,
  realLow: number,
  preClose: number,
  realClose: number
}

export interface DxyWeek {
  id: number | null | undefined,
  date: string,
  volume: number,
  preOpen: number,
  realOpen: number,
  preHigh: number,
  realHigh: number,
  preLow: number,
  realLow: number,
  preClose: number,
  realClose: number,
  dxyDayList: DxyDay[]
}


export interface Report {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
}

export interface ReportHourSat {
  week: HourSat,
  day: HourSat
}

export interface HourSat {
  dateTime: string,
  open: number,
  high: number,
  low: number,
  close: number,
}

export interface Slope {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  initialCandle: {
    open: number,
    high: number,
    low: number,
    close: number
  }
}

export interface Condition {
  id: number | null,
  name: string,
  description: string
}
