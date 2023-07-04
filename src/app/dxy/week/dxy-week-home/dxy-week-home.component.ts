import {Component, OnInit} from '@angular/core';
import {DxyWeek, Page} from "../../../model/model";
import {HttpParams} from "@angular/common/http";
import {DxyWeekService} from "../../../services/dxy/dxy-week/dxy-week.service";

@Component({
  selector: 'app-dxy-week-home',
  templateUrl: './dxy-week-home.component.html',
  styleUrls: ['./dxy-week-home.component.css']
})
export class DxyWeekHomeComponent implements OnInit {

  page: Page;
  dxyWeekList: DxyWeek[] = [];
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 4;

  constructor(private service: DxyWeekService) {
  }

  ngOnInit(): void {
    this.refresh(this.getHttpParams());
  }

  refresh(httpParams?: HttpParams) {
    this.loading = true;
    console.log(httpParams);
    this.service.getAll(httpParams).subscribe(response => {
      this.page = response as Page;
      this.dxyWeekList = this.page.content as DxyWeek[];
      this.loading = false;
      this.pageIndex = this.page.currentPage;
      this.pageSize = this.page.size;
      this.sortOrder = httpParams.get('order');
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

  modification(param) {

  }
}
