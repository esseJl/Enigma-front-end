import {Component, OnInit} from '@angular/core';
import {CandleWeekService} from "../../services/week/candle.week.service";
import {CandleWeek, Page} from "../../model/model";
import {CandleWeekModificationComponent} from "../candle-week-modification/candle-week-modification.component";
import {HttpParams} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-week-home',
  templateUrl: './candle-week-home.component.html',
  styleUrls: ['./candle-week-home.component.css']
})
export class CandleWeekHomeComponent implements OnInit {

  page: Page;
  candleWeekList: CandleWeek[] = [];
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 4;

  constructor(private service: CandleWeekService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh(this.getHttpParams());
  }

  refresh(httpParams?: HttpParams) {
    this.loading = true;
    //console.log(httpParams);
    this.service.getAll(httpParams).subscribe(response => {
      this.page = response as Page;
      this.candleWeekList = this.page.content as CandleWeek[];
      this.loading = false;
      this.pageIndex = this.page.currentPage;
      this.pageSize = this.page.size;
      this.sortOrder = httpParams.get('order');
    });

  }

  deleteCandleWeek(candleWeek: CandleWeek) {
    this.service.delete(candleWeek.id).subscribe(value => {
      //console.log(value);
      this.refresh(this.getHttpParams());
    });
  }


  modification(candleWeek: CandleWeek | null) {
    this.dialog.open(CandleWeekModificationComponent, {
      width: '90vw',
      data: candleWeek
    }).afterClosed().subscribe(result => {
      if (result) {
        //console.log(result);
        this.refresh(this.getHttpParams());
      }
    });
  }

  changePage(event: any) {
    this.loading = true;
    this.pageIndex = event.pageIndex;
    this.refresh(this.getHttpParams());
  }

  sort(sort) {
    this.sortOrder = sort.direction;
    this.loading = true;
    this.refresh(this.getHttpParams());
  }

  getHttpParams() {
    return new HttpParams()
      .append('page', this.pageIndex)
      .append('size', this.pageSize)
      .append('order', this.sortOrder);
  }
}
