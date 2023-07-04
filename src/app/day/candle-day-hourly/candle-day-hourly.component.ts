import {Component, OnInit} from '@angular/core';
import {DayHourlyService} from "../../services/day-hourly/day-hourly.service";
import {CandleDay, Page} from "../../model/model";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-candle-day-hourly',
  templateUrl: './candle-day-hourly.component.html',
  styleUrls: ['./candle-day-hourly.component.css']
})
export class CandleDayHourlyComponent implements OnInit {

  candleDayList: CandleDay[] = [];
  page: Page;
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(private service: DayHourlyService) {
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
