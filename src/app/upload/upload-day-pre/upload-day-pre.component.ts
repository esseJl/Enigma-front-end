import {Component, OnInit} from '@angular/core';
import {CandleDayPre, CandleHour} from "../../model/model";
import {Error} from "../../error/error";
import {CandleDayPredictService} from "../../services/day-pre/candle-day-predict.service";


@Component({
  selector: 'app-upload-day-pre',
  templateUrl: './upload-day-pre.component.html',
  styleUrls: ['./upload-day-pre.component.css']
})
export class UploadDayPreComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: CandleDayPre[] = [];
  savedItems: CandleDayPre[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: CandleDayPredictService) {
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
      let candleDayPreCsv = reader.result as string;
      let candleDayPreLines = (candleDayPreCsv as string).split("\n");
      this.load(candleDayPreLines);
      this.loading = false;
    }
  }

  upload() {
    this.save();
  }

  private load(candleDayPreLines: string[]) {
    candleDayPreLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 5) {
        let candleDayPre = this.readCandleDayPre(object);
        if (candleDayPre)
          this.loadedItems.push(candleDayPre);
        //console.log(candleHour);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readCandleDayPre(object: string[]): CandleDayPre | null {
    try {
      let obj = object[0].split(".");
      let year = parseInt(obj[0]);
      let month = parseInt(obj[1]) - 1;
      let day = parseInt(obj[2]);
      let d = new Date(year, month, day);
      let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
      let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
      let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
      let date = `${ye}-${mo}-${da}`;
      let candle = {} as CandleDayPre;
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
      }, i * 80);
    }
  }
}
