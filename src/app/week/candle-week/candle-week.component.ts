import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, sequence, state, style, transition, trigger} from "@angular/animations";
import {CandleDay, CandleWeek} from "../../model/model";
import {DeleteAlarmComponent} from "../../delete-alarm/delete-alarm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-week',
  templateUrl: './candle-week.component.html',
  styleUrls: ['./candle-week.component.css'],
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
export class CandleWeekComponent implements OnInit {

  @Input('candleWeekList') candleWeekList: CandleWeek[] = [];
  @Input('actionColumn') actionColumn: boolean = false;
  @Input('candleDetail') candleDetail: boolean = false;

  @Output('editItem') editItem = new EventEmitter<CandleWeek>();
  @Output('deleteItem') deleteItem = new EventEmitter<CandleWeek>();
  @Output('sort') sort = new EventEmitter();

  columnsToDisplay = ['date', 'realOpen', 'preOpen', 'realOpenComputed', 'realHigh', 'preHigh', 'realHighComputed', 'realLow', 'preLow', 'realLowComputed', 'realClose', 'preClose', 'realCloseComputed', 'volume'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: CandleDay | null;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.candleDetail) this.columnsToDisplay = ['date', 'realOpen', 'preOpen', 'preOpenSlope', 'indexOpenSlope', 'realOpenComputed', 'realHigh', 'preHigh', 'preHighSlope', 'indexHighSlope', 'realHighComputed', 'realLow', 'preLow', 'preLowSlope', 'indexLowSlope', 'realLowComputed', 'realClose', 'preClose', 'preCloseSlope', 'indexCloseSlope', 'realCloseComputed', 'volume'];
    if (this.actionColumn) this.columnsToDisplay.push('action');
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  }

  edit(candleWeek: CandleWeek) {
    this.editItem.emit(candleWeek);
  }

  delete(candleWeek: CandleWeek) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(candleWeek);
      }
    });
  }

  sortData($event: any) {
    this.sort.emit($event);
  }
}
