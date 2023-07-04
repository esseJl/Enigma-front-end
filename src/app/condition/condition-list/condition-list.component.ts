import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Condition} from "../../model/model";

@Component({
  selector: 'app-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.css']
})
export class ConditionListComponent implements OnInit {

  @Input('Condition') conditions: Condition[] = [];
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
