import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition} from "../../model/model";

@Component({
  selector: 'app-condition-table',
  templateUrl: './condition-table.component.html',
  styleUrls: ['./condition-table.component.css']
})
export class ConditionTableComponent implements OnInit {
  @Input('dataSource') dataSource: Condition[] = [];
  displayedColumns: ['name'];

  @Output('filter') filterEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.filterEvent.emit(value);
  }
}
