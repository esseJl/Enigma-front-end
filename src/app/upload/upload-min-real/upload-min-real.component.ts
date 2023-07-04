import {Component, OnInit} from '@angular/core';
import {UploadMinRealService} from "../../services/min-real/upload-min-real.service";
import {CandleHourReal, CandleWeekReal, DxyDayReal} from "../../model/model";
import {Error} from "../../error/error";

@Component({
  selector: 'app-upload-min-real',
  templateUrl: './upload-min-real.component.html',
  styleUrls: ['./upload-min-real.component.css']
})
export class UploadMinRealComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: CandleWeekReal[] = [];
  savedItems: CandleWeekReal[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: UploadMinRealService) {
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
      let candleMinRealCsv = reader.result as string;
      let candleMinRealLines = (candleMinRealCsv as string).split("\n");
      this.load(candleMinRealLines);
      this.loading = false;
    }
  }

  private load(candleMinRealLines: string[]) {
    candleMinRealLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 7) {
        let candleMinReal = this.readCandleMinReal(object);
        if (candleMinReal)
          this.loadedItems.push(candleMinReal);
        //console.log(candleMinReal);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readCandleMinReal(object: string[]) {
    //TODO important!
    try {
      let obj = object[0].split(".");
      let day = parseInt(obj[2]);
      let month = parseInt(obj[1]) - 1;
      let year = parseInt(obj[0]);
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

      let realOpen4h = parseFloat(object[2]);
      let realHigh4h = parseFloat(object[3]);
      let realLow4h = parseFloat(object[4]);
      let realClose4h = parseFloat(object[5]);
      let volume = parseFloat(object[6]);

      let candle = {} as CandleHourReal;
      candle.id = null;
      candle.date = date;
      candle.realOpen = realOpen4h;
      candle.realHigh = realHigh4h;
      candle.realLow = realLow4h;
      candle.realClose = realClose4h;
      candle.volume = volume;

      //console.log(candle)
      return candle;
    } catch (e) {
      //console.log(e?.message);
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
            this.savedItems.splice(0, 0, value as DxyDayReal);
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
