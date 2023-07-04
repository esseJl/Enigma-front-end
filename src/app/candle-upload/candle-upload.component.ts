import {Component, OnInit} from '@angular/core';
import {CandleDay, CandleHour} from "../model/model";
import {CandleHourService} from "../services/hour/candle.hour.service";
import {CandleDayService} from "../services/day/candle.day.service";

@Component({
  selector: 'app-candle-upload',
  templateUrl: './candle-upload.component.html',
  styleUrls: ['./candle-upload.component.css']
})
export class CandleUploadComponent implements OnInit {

  loading: boolean = false;
  candleHourList: CandleHour[] = [];
  candleDayList: CandleDay[] = [];
  result: any[] = [];

  constructor(private candleHourService: CandleHourService, private candleDayService: CandleDayService) {
  }

  ngOnInit(): void {
  }

  onUpload(target: any) {
    this.loading = true;

    let input = target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {

      let candleHourCsv = reader.result as string;
      let candleHourLines = (candleHourCsv as string).split("\n");


      candleHourLines.forEach(value => {
        let object = value.split(",");
        let length = object.length;

        if (length === 10) {

          //date
          let obj = object[0].split("/");
          let year = parseInt(obj[2]);
          let month = parseInt(obj[1]) - 1;
          let day = parseInt(obj[0]);
          //time
          let time = object[1].split(":");

          let hour = parseInt(time[0]);
          let min = parseInt(time[1]);
          //read date
          let d = new Date(year, month, day, hour, min);
          let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
          let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
          let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
          let H_m = new Intl.DateTimeFormat('en', {
            second: undefined,
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit'
          }).format(d);

          let date = `${ye}-${mo}-${da} ${H_m}`;

          let preOpen4h = parseFloat(object[2]);
          let realOpen4h = parseFloat(object[3]);
          let preHigh4h = parseFloat(object[4]);
          let realHigh4h = parseFloat(object[5]);
          let preLow4h = parseFloat(object[6]);
          let realLow4h = parseFloat(object[7]);
          let preClose4h = parseFloat(object[8]);
          let realClose4h = parseFloat(object[9]);

          //this.onPost();
          this.candleHourList.push({
            id: null,
            date: date,
            preOpen: preOpen4h,
            preOpenDay: preOpen4h,
            preOpenWeek: preOpen4h,
            realOpen: realOpen4h,
            preHigh: preHigh4h,
            preHighDay: preHigh4h,
            preHighWeek: preHigh4h,
            realHigh: realHigh4h,
            preLow: preLow4h,
            preLowDay: preLow4h,
            preLowWeek: preLow4h,
            realLow: realLow4h,
            preClose: preClose4h,
            preCloseDay: preClose4h,
            preCloseWeek: preClose4h,
            realClose: realClose4h,
            saturationCloseDay: null,
            saturationCloseWeek: null,
            saturationHighDay: null,
            saturationHighWeek: null,
            saturationOpenWeek: null,
            saturationLowDay: null,
            saturationLowWeek: null,
            saturationOpenDay: null,
            indexOpenSlopeDay: null,
            indexOpenSlopeWeek: null,
            indexHighSlopeDay: null,
            indexHighSlopeWeek: null,
            indexLowSlopeDay: null,
            indexLowSlopeWeek: null,
            indexCloseSlopeDay: null,
            indexCloseSlopeWeek: null,
            volume: null
          });
        }
        if (length === 9) {

          //date
          let obj = object[0].split(".");
          let year = parseInt(obj[0]);
          let month = parseInt(obj[1]) - 1;
          let day = parseInt(obj[2]);
          //read date
          let d = new Date(year, month, day);
          let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
          let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
          let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
          let date = `${ye}-${mo}-${da}`;

          let preOpen = parseFloat(object[1]);
          let preHigh = parseFloat(object[3]);
          let preLow = parseFloat(object[5]);
          let preClose = parseFloat(object[7]);

          this.candleDayList.push({
            id: null,
            date: date,
            preOpen: preOpen,
            preOpenWeek: preOpen,
            preOpenSlope: preOpen,
            realOpen: null,
            preHigh: preHigh,
            preHighWeek: preHigh,
            preHighSlope: preHigh,
            realHigh: null,
            preLow: preLow,
            preLowWeek: preLow,
            preLowSlope: preLow,
            realLow: null,
            preClose: preClose,
            preCloseWeek: preClose,
            preCloseSlope: preClose,
            realClose: null,
            candleHourList: [],
            indexCloseSlope: null,
            indexHighSlope: null,
            indexLowSlope: null,
            indexOpenSlope: null,
            saturationHighWeek: null,
            saturationLowWeek: null,
            saturationOpenWeek: null,
            saturationCloseWeek: null,
            realCloseComputed: null,
            realHighComputed: null,
            realLowComputed: null,
            realOpenComputed: null,
            volume: null
          });

        }

      });
      this.loading = false;

      this.candleHourList.forEach(value => {
        setTimeout(() => {
          this.onPost(value);
        }, 1000);
      });

      this.candleDayList.forEach(value => {
        setTimeout(() => {
          this.onPostCandleDay(value);
        }, 1000);
      });

    }

  }

  async onPost(value: CandleHour) {
    this.candleHourService.create(value).subscribe(res => this.result.push(res));
  }

  async onPostCandleDay(value: CandleDay) {
    this.candleDayService.create(value).subscribe(res => this.result.push(res));
  }
}
