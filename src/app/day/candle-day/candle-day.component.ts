import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandleDay, CandleHour} from "../../model/model";
import {animate, sequence, state, style, transition, trigger} from "@angular/animations";
import {DeleteAlarmComponent} from "../../delete-alarm/delete-alarm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-day',
  templateUrl: './candle-day.component.html',
  styleUrls: ['./candle-day.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('rowsAnimation', [
      transition('void => *', [
        style({height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none'}),
        sequence([
          animate(".35s ease", style({height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'})),
          animate(".35s ease", style({height: '*', opacity: 1, transform: 'translateX(0)'}))
        ])
      ])
    ])
  ]
})
export class CandleDayComponent implements OnInit {

  @Input('candleDayList') candleDayList: CandleDay[] = [];

  @Input('actionColumn') actionColumn: boolean = false;
  @Input('candleDetail') candleDetail: boolean = false;

  @Output('editItem') editItem = new EventEmitter<CandleDay>();
  @Output('deleteItem') deleteItem = new EventEmitter<CandleDay>();
  @Output('sort') sort = new EventEmitter();

  columnsToDisplay = ['date', 'realOpen', 'preOpen', 'realOpenComputed', 'realHigh', 'preHigh', 'realHighComputed', 'realLow', 'preLow', 'realLowComputed', 'realClose', 'preClose', 'realCloseComputed', 'volume'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand']
  expandedElement: CandleHour | null;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.candleDetail) this.columnsToDisplay = ['date', 'realOpen', 'preOpen', 'preOpenWeek', 'preOpenSlope', 'indexOpenSlope', 'saturationOpenWeek', 'realOpenComputed', 'realHigh', 'preHigh', 'preHighWeek', 'preHighSlope', 'indexHighSlope', 'saturationHighWeek', 'realHighComputed', 'realLow', 'preLow', 'preLowWeek', 'preLowSlope', 'indexLowSlope', 'saturationLowWeek', 'realLowComputed', 'realClose', 'preClose', 'preCloseWeek', 'preCloseSlope', 'indexCloseSlope', 'saturationCloseWeek', 'realCloseComputed', 'volume'];
    if (this.actionColumn) this.columnsToDisplay.push('action');
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  }

  edit(candleDay: CandleDay) {
    this.editItem.emit(candleDay);
  }

  delete(candleDay: CandleDay) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(candleDay);
      }
    });
  }

  sortData($event: any) {
    this.sort.emit($event);
  }
}
