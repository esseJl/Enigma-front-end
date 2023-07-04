import {Component, Inject, OnInit} from '@angular/core';
import {CandleDayModificationComponent} from "../../day/candle-day-modification/candle-day-modification.component";
import {CandleHour} from "../../model/model";
import {formatDate} from "@angular/common";
import {Error} from "../../error/error";
import {CandleHourService} from "../../services/hour/candle.hour.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-hour-modification',
  templateUrl: './candle-hour-modification.component.html',
  styleUrls: ['./candle-hour-modification.component.css']
})
export class CandleHourModificationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CandleDayModificationComponent>,
              private service: CandleHourService,
              @Inject(MAT_DIALOG_DATA) data) {

    if (data) {
      this.mood = 'Update Candle hour';
      this.candleHourTemp = {} as CandleHour;
      this.candleHourTemp.id = data.id;
      this.candleHourTemp.date = data.date;
      this.candleHourTemp.realOpen = data.realOpen;
      this.candleHourTemp.preOpen = data.preOpen;
      this.candleHourTemp.realHigh = data.realHigh;
      this.candleHourTemp.preHigh = data.preHigh;
      this.candleHourTemp.realLow = data.realLow;
      this.candleHourTemp.preLow = data.preLow;
      this.candleHourTemp.realClose = data.realClose;
      this.candleHourTemp.preClose = data.preClose;
      this.candleHourTemp.volume = data.volume;
    } else {
      this.candleHourTemp = {} as CandleHour;
      this.candleHourTemp.id = null;
    }
  }


  mood: string = 'Config New Candle hour';
  loading: boolean = false;
  stepHours = 4;
  candleHourTemp: CandleHour;
  error: Error;

  ngOnInit(): void {
  }


  submit(form) {
    let value = form.value;
    this.loading = true;
    value.date = formatDate(value.date, 'yyyy-MM-dd HH:mm', 'en-US');
    //console.log(value);
    if (value.id == null) {
      this.service.create(value).subscribe(res => {
        //console.log(res);
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        //console.log(error);
        this.error = error.error as Error;

        this.error.subErrors.forEach(v => {
          let key = v.field;
          let val = v.message;
          form.controls[key].setErrors({err: val});
        });

        this.loading = false;
      });
    } else {
      this.service.update(value).subscribe(res => {
        //console.log(res);
        this.loading = false;
        this.dialogRef.close(true);
      }, error => {
        //console.log(error);
        this.error = error.error as Error;

        this.error.subErrors.forEach(v => {
          let key = v.field;
          let val = v.message;
          form.controls[key].setErrors({err: val});
        });

        this.loading = false;
      });
    }
  }
}
