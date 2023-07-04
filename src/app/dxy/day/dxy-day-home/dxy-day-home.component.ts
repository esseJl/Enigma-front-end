import {Component, OnInit} from '@angular/core';
import {DxyDay, Page} from "../../../model/model";
import {DxyDayService} from "../../../services/dxy/dxy-day/dxy-day.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-dxy-day-home',
  templateUrl: './dxy-day-home.component.html',
  styleUrls: ['./dxy-day-home.component.css']
})
export class DxyDayHomeComponent implements OnInit {

  dxyDayList: DxyDay[] = [];
  page: Page;
  loading: boolean = true;
  sortOrder: string = 'desc';
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private service: DxyDayService) {
  }

  ngOnInit(): void {
    this.refresh(this.getHttpParams());
  }

  refresh(httpParams?: HttpParams) {
    this.loading = true;
    this.service.getAll(httpParams).subscribe(response => {
      this.page = response as Page;
      this.dxyDayList = this.page.content as DxyDay[];
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
