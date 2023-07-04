import {Component, OnInit} from '@angular/core';
import {Error} from "../../error/error";
import {DxyDayRealService} from "../../services/dxy/dxy-day-real.service";
import {DxyDayReal} from "../../model/model";

@Component({
  selector: 'app-upload-dxy-day-real',
  templateUrl: './upload-dxy-day-real.component.html',
  styleUrls: ['./upload-dxy-day-real.component.css']
})
export class UploadDxyDayRealComponent implements OnInit {

  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: DxyDayReal[] = [];
  savedItems: DxyDayReal[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;

  constructor(private service: DxyDayRealService) {
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
      let dxyDayRealCsv = reader.result as string;
      let dxyDayRealLines = (dxyDayRealCsv as string).split("\n");
      this.load(dxyDayRealLines);
      this.loading = false;
    }
  }

  private load(dxyDayRealLines: string[]) {
    dxyDayRealLines.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 6) {
        let dxyDayReal = this.readDxyDayReal(object);
        if (dxyDayReal)
          this.loadedItems.push(dxyDayReal);
        //console.log(dxyDayReal);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private readDxyDayReal(object: string[]) {
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


      let dxy = {} as DxyDayReal;
      dxy.id = null;
      dxy.date = date;
      dxy.realOpen = parseFloat(object[1]);
      dxy.realHigh = parseFloat(object[2]);
      dxy.realLow = parseFloat(object[3]);
      dxy.realClose = parseFloat(object[4]);
      dxy.volume = parseFloat(object[5]);


      return dxy;
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
