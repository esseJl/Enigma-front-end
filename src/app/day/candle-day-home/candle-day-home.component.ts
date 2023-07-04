import {Component, OnInit} from '@angular/core';
import {CandleDayService} from "../../services/day/candle.day.service";
import {CandleDay, CandleHour, Page} from "../../model/model";
import {HttpParams, HttpResponse} from "@angular/common/http";
import {CandleDayModificationComponent} from "../candle-day-modification/candle-day-modification.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-day-home',
  templateUrl: './candle-day-home.component.html',
  styleUrls: ['./candle-day-home.component.css']
})
export class CandleDayHomeComponent implements OnInit {

  candleDayList: CandleDay[] = [];
  page: Page;
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private service: CandleDayService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh(this.getHttpParams());
  }

  refresh(httpParams?: HttpParams) {
    this.loading = true;
    this.service.getAll(httpParams).subscribe(response => {
      this.page = response as Page;
      this.candleDayList = this.page.content as CandleDay[];
      this.loading = false;
      this.pageIndex = this.page.currentPage;
      this.pageSize = this.page.size;
      this.sortOrder = httpParams.get('order');
    });
  }

  modification(candleDay: CandleDay | null) {
    this.dialog.open(CandleDayModificationComponent, {
      width: '90vw',
      data: candleDay
    })
      .afterClosed().subscribe(result => {
      if (result === true) {
        //console.log(result);
        this.refresh(this.getHttpParams());
      }
    });
  }

  deleteCandleDay(candleDay: CandleDay) {
    this.loading = true;
    this.service.delete(candleDay.id).subscribe((res: HttpResponse<CandleHour>) => {
      console.log(res);
      this.refresh(this.getHttpParams());
    }, error => {
      console.log(error);
    });
  }

  sort($event: any) {
    //console.log($event);
    this.sortOrder = $event.direction;
    this.loading = true;
    this.refresh(this.getHttpParams());
  }

  changePage(event: any) {
    this.loading = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.refresh(this.getHttpParams());
  }

  getHttpParams() {
    return new HttpParams()
      .append('page', this.pageIndex)
      .append('pageSize', this.pageSize)
      .append('order', this.sortOrder);
  }
}
