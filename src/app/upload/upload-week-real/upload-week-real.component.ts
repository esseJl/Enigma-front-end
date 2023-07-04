import {Component, OnInit} from '@angular/core';
import {CandleHour, CandleWeekReal} from "../../model/model";
import {Error} from "../../error/error";
import {CandleWeekRealService} from "../../services/week-real/candle-week-real.service";

@Component({
  selector: 'app-upload-week-real',
  templateUrl: './upload-week-real.component.html',
  styleUrls: ['./upload-week-real.component.css']
})
export class UploadWeekRealComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: CandleWeekReal[] = [];
  forwardedOnMonday: CandleWeekReal[] = [];
  savedItems: CandleWeekReal[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: CandleWeekRealService) {
  }

  ngOnInit(): void {
  }

  resetAll() {
    this.failedLoad = [];
    this.loadedItems = [];
    this.savedItems = [];
    this.errors = [];
    this.value = 0;
    this.bufferValue = 0;
  }

  onUpload(target: any) {
    this.loading = true;
    this.resetAll();

    let input = target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let candleWeekRealCsv = reader.result as string;
      let candleWeekRealLines = (candleWeekRealCsv as string).split("\n");
      this.load(candleWeekRealLines);
      this.forwardOnMonday();
      this.loading = false;
    }
  }

  private load(candleWeekRealLines: string[]) {
    candleWeekRealLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 6) {
        let candleHour = this.readCandleWeekReal(object);
        if (candleHour)
          this.loadedItems.push(candleHour);
        //console.log(candleHour);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readCandleWeekReal(object: string[]) {
    try {
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

      let candle = {} as CandleHour;
      candle.id = null;
      candle.date = date;
      candle.realOpen = parseFloat(object[1]);
      candle.realHigh = parseFloat(object[2]);
      candle.realLow = parseFloat(object[3]);
      candle.realClose = parseFloat(object[4]);
      candle.volume = parseFloat(object[5]);
      //console.log(candle)
      return candle;
    } catch (e) {
      //console.log(e?.message);
      this.failedLoad.splice(0, 0, e?.message);
      return null;
    }
  }

  private forwardOnMonday() {
    this.loadedItems.forEach(value => {
      let today = new Date(value.date);
      let tomorrow = new Date(value.date);
      tomorrow.setDate(today.getDate() + 1);

      let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(tomorrow);
      let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(tomorrow);
      let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(tomorrow);

      let monday = `${ye}-${mo}-${da}`;

      this.forwardedOnMonday.push({
        id: null,
        date: monday,
        realOpen: value.realOpen,
        realHigh: value.realHigh,
        realLow: value.realLow,
        realClose: value.realClose,
        volume: value.volume,
      });
    });
  }

  save() {
    this.bufferValue = this.forwardedOnMonday.length;
    for (let i = 0; i < this.forwardedOnMonday.length; i++) {
      setTimeout(() => {
        //console.log(this.loadedItems[i]);
        this.service.create(this.forwardedOnMonday[i])
          .subscribe(value => {
            this.savedItems.splice(0, 0, value as CandleHour);
            this.value++;
          }, error => {
            this.errors.splice(0, 0, error?.error);
            this.value++;
          });
      }, i * 80);
    }
  }

  upload() {
    this.save();
  }
}
