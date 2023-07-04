import {Component, OnInit} from '@angular/core';
import {CandleDayReal, CandleHour} from "../../model/model";
import {Error} from "../../error/error";
import {CandleDayRealService} from "../../services/day-real/candle-day-real.service";

@Component({
  selector: 'app-upload-day-real',
  templateUrl: './upload-day-real.component.html',
  styleUrls: ['./upload-day-real.component.css']
})
export class UploadDayRealComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: CandleDayReal[] = [];
  savedItems: CandleDayReal[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: CandleDayRealService) {
  }

  resetAll() {
    this.failedLoad = [];
    this.loadedItems = [];
    this.savedItems = [];
    this.errors = [];
    this.value = 0;
    this.bufferValue = 0;
  }

  ngOnInit(): void {
  }

  onUpload(target: any) {
    this.loading = true;
    this.resetAll();

    let input = target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let candleDayRealCsv = reader.result as string;
      let candleDayRealLines = (candleDayRealCsv as string).split("\n");
      this.load(candleDayRealLines);
      this.loading = false;
    }
  }

  private load(candleDayRealLines: string[]) {
    candleDayRealLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 6) {
        let candleDayReal = this.readCandleDayReal(object);
        if (candleDayReal)
          this.loadedItems.push(candleDayReal);
        //console.log(candleDayReal);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readCandleDayReal(object: string[]) {
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

  upload() {
    this.save();
  }
}
