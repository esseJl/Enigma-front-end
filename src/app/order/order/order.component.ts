import {Component, OnInit} from '@angular/core';
import {Order, Report, SearchOrder} from "../../model/model";
import {formatDate} from "@angular/common";
import {SearchService} from "../../services/order/search.service";
import {saveAs} from 'file-saver';
import {OrderModificationComponent} from "../order-modification/order-modification.component";
import {OrderService} from "../../services/order/order.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  loading: boolean = false;
  orders: Order[] = [];
  searchOrder: SearchOrder = {} as SearchOrder;
  strategies: string[] = ['N1D1', 'O1D1', 'N1D2', 'O1D2',
    'N2DZ', 'O2DZ', 'N2DM', 'O2DM',
    'N3DP', 'O3DP', 'N3DZ', 'O3DZ',
    'N3DM', 'O3DM', 'N4D1', 'O4D1', 'N4D2', 'O4D2',
  ];
  activeStrategy: string = this.strategies[0];
  report: Report;
  fromDate: string = null;
  toDate: string = null;
  downloadCsvLoading: boolean = false;

  constructor(private searchService: SearchService, private orderService: OrderService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onChange({} as SearchOrder);
  }

  onChange(searchOrder: SearchOrder) {
    this.searchOrder = searchOrder;
    this.searchOrder.strategy = this.activeStrategy
    this.fromDate = this.fromDate != null ? formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US') : null;
    this.toDate = this.toDate != null ? formatDate(this.toDate, 'yyyy-MM-dd', 'en-US') : null;
    this.searchOrder.fromDate = this.fromDate;
    this.searchOrder.toDate = this.toDate;
    this.update();
  }

  update() {
    this.loading = true;
    this.search();
  }

  strategyOnChange(value) {
    this.activeStrategy = value;
    this.searchOrder.strategy = this.activeStrategy;
    this.update();
  }


  search() {
    this.searchService.search(this.searchOrder)
      .subscribe(value => {
        this.report = value as Report;
        this.orders = this.report.content;
        this.loading = false;
      });
  }

  dateOnChange() {
    this.onChange(this.searchOrder);
  }

  clearFromDate() {
    this.fromDate = null;
    this.dateOnChange();
  }

  clearToDate() {
    this.toDate = null;
    this.dateOnChange();
  }

  getCsv() {
    let strings = this.orders.map(order => {
      return `${order.date},${order.candleDay.realOpen},${order.candleDay.preOpen},${order.candleDay.realHigh},${order.candleDay.preHigh},${order.candleDay.realLow},${order.candleDay.preLow},${order.candleDay.realClose},${order.candleDay.preClose},${order.emaOpen ? 1 : 0},${order.emaHigh ? 1 : 0},${order.emaLow ? 1 : 0},${order.emaClose ? 1 : 0},${order.satWeeklyOpen},${order.satWeeklyHigh},${order.satWeeklyLow},${order.indexDailyOpen},${order.indexDailyHigh},${order.indexDailyLow},${order.indexDailyClose},${order.indexWeeklyOpen},${order.indexWeeklyHigh},${order.indexWeeklyLow},${order.indexWeeklyClose},${order.profit},${order.distance},${order.error}` + '\n';
    });
    let header = `date,realOpen,preOpen,realHigh,preHigh,realLow,preLow,realClose,preClose,emaOpen,emaHigh,emaLow,emaClose,satWeeklyOpen,satWeeklyHigh,satWeeklyLow,indexDailyOpen,indexDailyHigh,indexDailyLow,indexDailyClose,indexWeeklyOpen,indexWeeklyHigh,indexWeeklyLow,indexWeeklyClose,profit,distance,error` + '\n';
    strings.splice(0, 0, header);
    let blob = new Blob(strings, {type: 'text/csv'});
    let fileName = this.activeStrategy + ".csv";
    saveAs(blob, fileName);
  }

  modification(order: Order | null) {
    console.log("update-> ", order);
    this.dialog.open(OrderModificationComponent, {
      width: '90vw',
      data: order
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.update();
        /*let index = this.orders.findIndex(value => value.id == result.id);
        //console.log(index);
        if (index) {
          this.orders[index] = result;
        }
        this.orders.splice(index, 1, result);
        console.log(this.orders[index]);*/
      }
    });
  }

  delete(order: Order) {
    this.orderService.delete(order.id)
      .subscribe(value => {
        this.update();
      });
  }

  downloadCsv() {
    this.downloadCsvLoading = true;
    this.searchService.searchAndExportToCsv(this.searchOrder)
      .subscribe(value => {
        console.log(value);
        this.downloadCsvLoading = false;
      }, error => {
        console.log(error);
        this.downloadCsvLoading = false;
      });

  }
}
