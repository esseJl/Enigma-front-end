import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandleHour} from "../../model/model";
import {DeleteAlarmComponent} from "../../delete-alarm/delete-alarm.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-candle-hour',
  templateUrl: './candle-hour.component.html',
  styleUrls: ['./candle-hour.component.css']
})
export class CandleHourComponent implements OnInit {
  displayedColumns: string[] =
    ['date', 'realOpen', 'preOpen', 'realHigh', 'preHigh', 'realLow', 'preLow', 'realClose', 'preClose', 'volume'];

  @Input('actionColumn') actionColumn: boolean = false;
  @Input('candleDetail') candleDetail: boolean = false;

  @Input('candleHourSource') candleHourSource: CandleHour[] = [];

  @Output('editItem') editItem = new EventEmitter<CandleHour>();
  @Output('deleteItem') deleteItem = new EventEmitter<CandleHour>();
  @Output('sort') sort = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.actionColumn) this.displayedColumns.push('action');
    if (this.candleDetail) this.displayedColumns = ['date', 'realOpen', 'preOpen', 'preOpenDay', 'preOpenWeek', 'saturationOpenDay', 'saturationOpenWeek', 'realHigh', 'preHigh', 'preHighDay', 'preHighWeek', 'saturationHighDay', 'saturationHighWeek', 'realLow', 'preLow', 'preLowDay', 'preLowWeek', 'saturationLowDay', 'saturationLowWeek', 'realClose', 'preClose', 'preCloseDay', 'preCloseWeek', 'saturationCloseDay', 'saturationCloseWeek', 'volume'];
  }

  edit(candleHour: CandleHour) {
    this.editItem.emit(candleHour);
  }

  delete(candleHour: CandleHour) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(candleHour);
      }
    });
  }

  sortData($event: any) {
    this.sort.emit($event);
  }


}

