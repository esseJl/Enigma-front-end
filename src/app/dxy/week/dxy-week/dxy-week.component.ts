import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DxyDay, DxyWeek} from "../../../model/model";
import {DeleteAlarmComponent} from "../../../delete-alarm/delete-alarm.component";
import {animate, sequence, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dxy-week',
  templateUrl: './dxy-week.component.html',
  styleUrls: ['./dxy-week.component.css'],
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
export class DxyWeekComponent implements OnInit {

  @Input('dxyWeekList') dxyWeekList: DxyWeek[] = [];
  @Input('actionColumn') actionColumn: boolean = false;
  @Input('candleDetail') candleDetail: boolean = false;

  @Output('editItem') editItem = new EventEmitter<DxyWeek>();
  @Output('deleteItem') deleteItem = new EventEmitter<DxyWeek>();
  @Output('sort') sort = new EventEmitter();

  columnsToDisplay = ['date', 'realOpen', 'preOpen', 'realOpenComputed', 'realHigh', 'preHigh', 'realHighComputed', 'realLow', 'preLow', 'realLowComputed', 'realClose', 'preClose', 'realCloseComputed', 'volume'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: DxyDay | null;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.actionColumn) this.columnsToDisplay.push('action');
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  }

  edit(dxyWeek: DxyWeek) {
    this.editItem.emit(dxyWeek);
  }

  delete(dxyWeek: DxyWeek) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(dxyWeek);
      }
    });
  }

  sortData($event: any) {
    this.sort.emit($event);
  }

}
