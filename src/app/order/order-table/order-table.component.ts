import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, SearchOrder} from "../../model/model";
import {animate, sequence, state, style, transition, trigger} from "@angular/animations";
import {DeleteAlarmComponent} from "../../delete-alarm/delete-alarm.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
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
export class OrderTableComponent implements OnInit {

  columnsToDisplay: string[] = [
    "date", "emaOpen", "emaHigh", "emaLow", "emaClose", "ema", "condition",
    "satWeeklyOpen", "satWeeklyHigh", "satWeeklyLow",
    "indexDailyOpen", "indexDailyHigh", "indexDailyLow", "indexDailyClose",
    "indexWeeklyOpen", "indexWeeklyHigh", "indexWeeklyLow", "indexWeeklyClose",
    "profit", "distance", "error", "action"
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;
  //inputs
  @Input('orders') orders: Order[] = [];
  // output
  @Output('onChange') onChange = new EventEmitter();
  @Output('onUpdate') onUpdate = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();
  @Output('onDetail') onDetail = new EventEmitter();
  // search field range

  saturationList = [2, 1, 0, -1];
  conditionList = [0, 1, 2, 3, 4];
  indexList = [4, 3, 2, 1, 0, -1, -2, -3, -4];
  profitList = ['tp', 'tp-st', 'tp-zero', 'st', 'st-zero', 'zero'];

  orderDate: string = null;

  profit: string;

  emaOpen: boolean;
  emaHigh: boolean;
  emaLow: boolean;
  emaClose: boolean;

  satWeeklyOpen: number[];
  satWeeklyHigh: number[];
  satWeeklyLow: number[];

  indexDailyOpen: number[];
  indexDailyHigh: number[];
  indexDailyLow: number[];
  indexDailyClose: number[];

  indexWeeklyOpen: number[];
  indexWeeklyHigh: number[];
  indexWeeklyLow: number[];
  indexWeeklyClose: number[];
  conditions: number[];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  change() {
    let searchOrder: SearchOrder = {} as SearchOrder;

    //orderDate
    this.orderDate == undefined ? searchOrder.orderDate = null : searchOrder.orderDate = this.orderDate;
    // profit
    this.profit == undefined ? searchOrder.profit = null : searchOrder.profit = this.profit;
    //condition
    this.conditions == undefined ? searchOrder.conditions = null : searchOrder.conditions = this.conditions;
    // saturation
    this.satWeeklyOpen == undefined ? searchOrder.satWeeklyOpen = null : searchOrder.satWeeklyOpen = this.satWeeklyOpen;
    this.satWeeklyHigh == undefined ? searchOrder.satWeeklyHigh = null : searchOrder.satWeeklyHigh = this.satWeeklyHigh;
    this.satWeeklyLow == undefined ? searchOrder.satWeeklyLow = null : searchOrder.satWeeklyLow = this.satWeeklyLow;

    // indexDaily
    this.indexDailyOpen == undefined ? searchOrder.indexDailyOpen = null : searchOrder.indexDailyOpen = this.indexDailyOpen;
    this.indexDailyHigh == undefined ? searchOrder.indexDailyHigh = null : searchOrder.indexDailyHigh = this.indexDailyHigh;
    this.indexDailyLow == undefined ? searchOrder.indexDailyLow = null : searchOrder.indexDailyLow = this.indexDailyLow;
    this.indexDailyClose == undefined ? searchOrder.indexDailyClose = null : searchOrder.indexDailyClose = this.indexDailyClose;

    //indexWeekly
    this.indexWeeklyOpen == undefined ? searchOrder.indexWeeklyOpen = null : searchOrder.indexWeeklyOpen = this.indexWeeklyOpen;
    this.indexWeeklyHigh == undefined ? searchOrder.indexWeeklyHigh = null : searchOrder.indexWeeklyHigh = this.indexWeeklyHigh;
    this.indexWeeklyLow == undefined ? searchOrder.indexWeeklyLow = null : searchOrder.indexWeeklyLow = this.indexWeeklyLow;
    this.indexWeeklyClose == undefined ? searchOrder.indexWeeklyClose = null : searchOrder.indexWeeklyClose = this.indexWeeklyClose;

    this.onChange.emit(searchOrder);
    //console.log(searchOrder);
  }


  sortData($event: any) {
    this.orderDate = $event.direction;
    this.change();
  }

  edit(order) {
    this.onUpdate.emit(order);
  }

  delete(order) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.onDelete.emit(order);
      }
    });
  }

  showDetails(order) {
    this.onDetail.emit(order);
  }
}


