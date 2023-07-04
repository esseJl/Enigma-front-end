import {Component, OnInit} from '@angular/core';
import {CandleDay} from "../../model/model";
import {CandleDayService} from "../../services/day/candle.day.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-candle-day-list',
  templateUrl: './candle-day-list.component.html',
  styleUrls: ['./candle-day-list.component.css']
})
export class CandleDayListComponent implements OnInit {
  candleDayList: CandleDay[] = [];
  loading: boolean = true;

  constructor(private candleDayService: CandleDayService) {
    this.refresh();
  }

  ngOnInit(): void {

  }

  refresh() {
    let params = new HttpParams().append('empty', true);
    this.candleDayService.getAll(params)
      .subscribe(value => {
        this.candleDayList = value as CandleDay[];
        this.loading = false;
      });
  }

}
