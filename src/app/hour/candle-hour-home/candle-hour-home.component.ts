import {Component, OnInit, ViewChild} from '@angular/core';
import {CandleHourService} from "../../services/hour/candle.hour.service";
import {CandleHour, Page} from "../../model/model";
import {HttpParams, HttpResponse} from "@angular/common/http";
import {CandleHourModificationComponent} from "../candle-hour-modification/candle-hour-modification.component";
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-candle-hour-home',
  templateUrl: './candle-hour-home.component.html',
  styleUrls: ['./candle-hour-home.component.css']
})
export class CandleHourHomeComponent implements OnInit {

  page: Page;
  candleHourList: CandleHour[] = []
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 10;

  @ViewChild(MatTable) table: MatTable<CandleHour>;

  constructor(private service: CandleHourService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh(this.getHttpParams());
  }

  refresh(httpParams?: HttpParams) {
    this.loading = true;
    this.candleHourList = [];
    this.service.getAll(httpParams).subscribe(response => {
      this.page = response as Page;
      this.candleHourList = this.page.content as CandleHour[];
      this.loading = false;
      this.pageIndex = this.page.currentPage;
      this.pageSize = this.page.size;
      this.sortOrder = httpParams.get('order');
    });

  }

  deleteCandle(candleHour: CandleHour) {
    //console.log("delete", $event);
    this.loading = true;
    this.service.delete(candleHour.id).subscribe((res: HttpResponse<CandleHour>) => {
      console.log(res);
      this.refresh(this.getHttpParams());
    }, error => {
      console.log(error);
    });
  }


  changePage(event: any) {
    //console.log(event);
    this.loading = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.refresh(this.getHttpParams());
  }

  sort($event: any) {
    //console.log($event);
    this.sortOrder = $event.direction;
    this.loading = true;
    this.refresh(this.getHttpParams());
  }

  modification(candleHour: CandleHour | null) {
    this.dialog.open(CandleHourModificationComponent, {
      width: '90vw',
      data: candleHour
    })
      .afterClosed().subscribe(result => {
      if (result) {
        //console.log(result);
        this.refresh(this.getHttpParams());
      }
    });
  }

  getHttpParams() {
    return new HttpParams()
      .append('page', this.pageIndex)
      .append('pageSize', this.pageSize)
      .append('order', this.sortOrder);
  }
}
