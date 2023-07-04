import {Component, Inject, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {CandleDayService} from "../../services/day/candle.day.service";
import {CandleDay} from "../../model/model";
import {Error} from "../../error/error";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-day-modification',
  templateUrl: './candle-day-modification.component.html',
  styleUrls: ['./candle-day-modification.component.css']
})
export class CandleDayModificationComponent implements OnInit {


  mood: string = 'Create New Candle Day';
  loading: boolean = false;

  candleDayTemp: CandleDay;
  error: Error;

  constructor(private dialogRef: MatDialogRef<CandleDayModificationComponent>,
              private service: CandleDayService,
              @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.mood = 'Update Candle Day'
      this.candleDayTemp = {} as CandleDay;
      this.candleDayTemp.id = data.id;
      this.candleDayTemp.date = data.date;
      this.candleDayTemp.realOpen = data.realOpen;
      this.candleDayTemp.realHigh = data.realHigh;
      this.candleDayTemp.realLow = data.realLow;
      this.candleDayTemp.realClose = data.realClose;
      this.candleDayTemp.preOpen = data.preOpen;
      this.candleDayTemp.preHigh = data.preHigh;
      this.candleDayTemp.preLow = data.preLow;
      this.candleDayTemp.preClose = data.preClose;
      this.candleDayTemp.volume = data.volume;
    } else {
      this.candleDayTemp = {} as CandleDay;
      this.candleDayTemp.id = null;
    }
    //console.log(this.candleDay);
  }


  ngOnInit(): void {

  }


  submit(form) {
    let value = form.value;
    this.loading = true;
    value.date = formatDate(value.date, 'yyyy-MM-dd', 'en-US');
    console.log(value);

    if (value.id == null)
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
    else
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

