import {Component, OnInit} from '@angular/core';
import {DxyDayReal} from "../../model/model";
import {Error} from "../../error/error";
import {DxyDayRealService} from "../../services/dxy/dxy-day-real.service";
import {DxyWeekRealService} from "../../services/dxy/dxy-week-real.service";

@Component({
  selector: 'app-upload-dxy',
  templateUrl: './upload-dxy.component.html',
  styleUrls: ['./upload-dxy.component.css']
})
export class UploadDxyComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: any[] = [];
  savedItems: any[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;
  timeFrames: string[] = ['daily', 'weekly'];
  timeFrame: string = this.timeFrames[0];
  forwardedOnMonday: any[] = [];

  constructor(private dxyDayService: DxyDayRealService, private dxyWeekService: DxyWeekRealService) {
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
      let dxyRealCsv = reader.result as string;
      let dxyRealLines = (dxyRealCsv as string).split("\n");
      this.load(dxyRealLines);
      this.forwardOnMonday();
      this.loading = false;
    }
  }

  private load(dxyRealCsv: string[]) {
    dxyRealCsv.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 6) {
        let dxy = this.dxyReal(object);
        if (dxy)
          this.loadedItems.push(dxy);
        //console.log(candleHour);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private dxyReal(object: string[]) {
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
      let dxy = {} as DxyDayReal;

      dxy.id = null;
      dxy.date = date;
      dxy.realOpen = parseFloat(object[1]);
      dxy.realHigh = parseFloat(object[2]);
      dxy.realLow = parseFloat(object[3]);
      dxy.realClose = parseFloat(object[4]);
      dxy.volume = parseFloat(object[5]);

      console.log(dxy);

      return dxy;
    } catch (e) {
      this.failedLoad.splice(0, 0, e?.message);
      return null;
    }
  }

  saveWeek() {
    this.bufferValue = this.forwardedOnMonday.length;
    for (let i = 0; i < this.forwardedOnMonday.length; i++) {
      setTimeout(() => {
        let dxy = this.forwardedOnMonday[i];
        this.weekly(dxy);
      }, i * 80);
    }
  }

  saveDay() {
    this.bufferValue = this.loadedItems.length;
    for (let i = 0; i < this.loadedItems.length; i++) {
      setTimeout(() => {
        let dxy = this.loadedItems[i];
        this.daily(dxy);
      }, i * 80);
    }
  }

  uploadDay() {
    this.saveDay();
  }

  uploadWeek() {
    this.saveWeek()
  }

  daily(dxy) {
    this.dxyDayService.create(dxy)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  weekly(dxy) {
    this.dxyWeekService.create(dxy)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
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


}
