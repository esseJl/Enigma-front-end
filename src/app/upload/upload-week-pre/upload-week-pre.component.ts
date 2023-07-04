import {Component, OnInit} from '@angular/core';
import {CandleDayPre, CandleHour, CandleWeekPre} from "../../model/model";
import {Error} from "../../error/error";
import {CandleWeekPredictService} from "../../services/week-pre/candle-week-predict.service";

@Component({
  selector: 'app-upload-week-pre',
  templateUrl: './upload-week-pre.component.html',
  styleUrls: ['./upload-week-pre.component.css']
})
export class UploadWeekPreComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: CandleWeekPre[] = [];
  savedItems: CandleWeekPre[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: CandleWeekPredictService) {
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
      let candleWeekPreCsv = reader.result as string;
      let candleWeekPreLines = (candleWeekPreCsv as string).split("\n");
      this.load(candleWeekPreLines);
      this.loading = false;
    }
  }

  private load(candleWeekPreLines: string[]) {
    candleWeekPreLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 5) {
        let candleDayPre = this.readCandleWeekPre(object);
        if (candleDayPre)
          this.loadedItems.push(candleDayPre);
        //console.log(candleHour);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readCandleWeekPre(object: string[]) {
    try {
      let obj = object[0].split("/");
      let day = parseInt(obj[0]);
      let month = parseInt(obj[1]) - 1;
      let year = parseInt(obj[2]);
      let d = new Date(year, month, day);
      let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
      let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
      let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
      let date = `${ye}-${mo}-${da}`;
      let candle = {} as CandleWeekPre;
      candle.id = null;
      candle.date = date;
      candle.preOpen = parseFloat(object[1]);
      candle.preHigh = parseFloat(object[2]);
      candle.preLow = parseFloat(object[3]);
      candle.preClose = parseFloat(object[4]);

      return candle;
    } catch (e) {
      this.failedLoad.splice(0, 0, e?.message);
      return null;
    }
  }

  save() {
    this.bufferValue = this.loadedItems.length;
    for (let i = 0; i < this.loadedItems.length; i++) {
      setTimeout(() => {
        //console.log(this.loadedItems[i]);
        this.service.create(this.loadedItems[i])
          .subscribe(value => {
            this.savedItems.splice(0, 0, value as CandleHour);
            this.value++;
          }, error => {
            this.errors.splice(0, 0, error?.error);
            this.value++;
          });
      }, i * 1000);
    }
  }

  upload() {
    this.save();
  }
}
