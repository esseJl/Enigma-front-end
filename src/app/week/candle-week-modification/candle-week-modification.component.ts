import {Component, Inject, OnInit} from '@angular/core';
import {CandleDay} from "../../model/model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CandleWeekService} from "../../services/week/candle.week.service";
import {CandleDayListComponent} from "../../day/candle-day-list/candle-day-list.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-week-modification',
  templateUrl: './candle-week-modification.component.html',
  styleUrls: ['./candle-week-modification.component.css']
})
export class CandleWeekModificationComponent implements OnInit {
  loading: boolean = false;
  selectedCandleDays: CandleDay[] = [];

  mood: string = 'Create New Candle Week';


  candleWeek: FormGroup;


  constructor(private candleWeekService: CandleWeekService,
              private dialogRef: MatDialogRef<CandleWeekModificationComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.mood = 'Update Candle Week';
      data.candleDayList.forEach(candleDay => this.selectedCandleDays.push(candleDay));
      this.candleWeek = new FormGroup({
        id: new FormControl(data.id as number),
        date: new FormControl(data.date, Validators.required),
        volume: new FormControl(data.volume, Validators.required),
        realOpen: new FormControl(data.realOpen, Validators.required),
        realHigh: new FormControl(data.realHigh, Validators.required),
        realLow: new FormControl(data.realLow, Validators.required),
        realClose: new FormControl(data.realClose, Validators.required),
        preOpen: new FormControl(data.preOpen, Validators.required),
        preHigh: new FormControl(data.preHigh, Validators.required),
        preLow: new FormControl(data.preLow, Validators.required),
        preClose: new FormControl(data.preClose, Validators.required),
        candleDayIds: new FormArray([])
      });
    } else {
      //this.candleWeekTmp={} as CandleWeek;
      this.candleWeek = new FormGroup({
        id: new FormControl(null),
        date: new FormControl('', Validators.required),
        volume: new FormControl('', Validators.required),
        realOpen: new FormControl('', Validators.required),
        realHigh: new FormControl('', Validators.required),
        realLow: new FormControl('', Validators.required),
        realClose: new FormControl('', Validators.required),
        preOpen: new FormControl('', Validators.required),
        preHigh: new FormControl('', Validators.required),
        preLow: new FormControl('', Validators.required),
        preClose: new FormControl('', Validators.required),
        candleDayIds: new FormArray([])
      });
    }
  }

  ngOnInit(): void {

  }


  addCandleDay() {
    this.dialog.open(CandleDayListComponent, {maxHeight: '70vh'})
      .afterClosed().subscribe(value => {
      if (!value) return;
      value.forEach(v => {
        let index = this.selectedCandleDays.findIndex(value => v.value.id === value.id);
        if (index < 0) this.selectedCandleDays.push(v.value);
      });
    });
  }

  removeCandleDay(candleDay: CandleDay) {
    let index = this.selectedCandleDays.findIndex(v => v.id === candleDay.id);
    if (index >= 0) this.selectedCandleDays.splice(index, 1);
  }


  OnSubmit() {
    console.log(this.candleWeek.value);
    this.modification();
  }

  modification() {
    this.loading = true;
    this.candleDayIds.clear();
    this.selectedCandleDays.forEach((c: CandleDay) => {
      this.candleDayIds.push(new FormControl(c.id as number));
    });

    if (this.candleWeek.get('id').value == null) {
      this.candleWeekService.create(this.candleWeek.value)
        .subscribe(value => {
          //console.log("created",value);
          this.loading = false;
          this.dialogRef.close(value);
        });
    } else {
      this.candleWeekService.update(this.candleWeek.value)
        .subscribe(value => {
          //console.log("created",value);
          this.loading = false;
          this.dialogRef.close(value);
        });
    }

  }

  get id() {
    return this.candleWeek.get('id');
  }

  get date() {
    return this.candleWeek.get('date');
  }

  get volume() {
    return this.candleWeek.get('volume');
  }

  get realOpen() {
    return this.candleWeek.get('realOpen');
  }

  get realHigh() {
    return this.candleWeek.get('realHigh');
  }

  get realLow() {
    return this.candleWeek.get('realLow');
  }

  get realClose() {
    return this.candleWeek.get('realClose');
  }

  get preOpen() {
    return this.candleWeek.get('preOpen');
  }

  get preHigh() {
    return this.candleWeek.get('preHigh');
  }

  get preLow() {
    return this.candleWeek.get('preHigh');
  }

  get preClose() {
    return this.candleWeek.get('preHigh');
  }

  get candleDayIds() {
    return (this.candleWeek.get('candleDayIds') as FormArray);
  }

  format(value) {
    console.log(value.format('YYYY-MM-DD'));
    this.date.setValue((value).format('YYYY-MM-DD'));
  }
}
