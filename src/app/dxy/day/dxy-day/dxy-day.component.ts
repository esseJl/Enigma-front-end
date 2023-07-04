import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DxyDay} from "../../../model/model";
import {DeleteAlarmComponent} from "../../../delete-alarm/delete-alarm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dxy-day',
  templateUrl: './dxy-day.component.html',
  styleUrls: ['./dxy-day.component.css']
})
export class DxyDayComponent implements OnInit {

  displayedColumns: string[] =
    ['date', 'realOpen', 'preOpen', 'realHigh', 'preHigh', 'realLow', 'preLow', 'realClose', 'preClose', 'volume'];

  @Input('actionColumn') actionColumn: boolean = false;

  @Input('dxyDayDataSource') dxyDaySource: DxyDay[] = [];

  @Output('editItem') editItem = new EventEmitter<DxyDay>();
  @Output('deleteItem') deleteItem = new EventEmitter<DxyDay>();
  @Output('sort') sort = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.actionColumn) this.displayedColumns.push('action');
  }

  edit(dxyDay: DxyDay) {
    this.editItem.emit(dxyDay);
  }

  delete(dxyDay: DxyDay) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem.emit(dxyDay);
      }
    });
  }

  sortData($event: any) {
    this.sort.emit($event);
  }
}
