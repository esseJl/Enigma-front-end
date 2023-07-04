import {Component, OnInit} from '@angular/core';
import {WeekSlopeService} from "../services/report/week-slope.service";
import {WeekSlopeIndexService} from "../services/report/week-slope-index.service";
import {DaySlopeIndexService} from "../services/report/day-slope-index.service";
import {DaySlopeService} from "../services/report/day-slope.service";
import {DaySatService} from "../services/report/day-sat.service";
import {CandleWeek, Page, Report, ReportHourSat, Slope} from "../model/model";
import {HourSatService} from "../services/report/hour-sat.service";
import {HourSlopeService} from "../services/report/hour-slope.service";
import {CandleWeekService} from "../services/week/candle.week.service";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weekSlope: Slope;
  weekSlopeIndex: Report;

  daySlope: Slope;
  daySlopeIndex: Report;
  daySat: Report;

  hourSlope: Slope;
  hourSat: ReportHourSat;
  loading: boolean;

  page: Page;
  candleWeekList: CandleWeek[];
  candleWeek: CandleWeek;

  constructor(private candleWeekService: CandleWeekService,
              private weekSlopeService: WeekSlopeService,
              private weekSlopeIndexService: WeekSlopeIndexService,
              private daySlopeService: DaySlopeService,
              private daySlopeIndexService: DaySlopeIndexService,
              private daySatService: DaySatService,
              private hourSatService: HourSatService,
              private hourSlopeService: HourSlopeService) {
  }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.loading = true;
    this.getCandles();
    this.getWeekSlope();
    this.getWeekSlopeIndex();
    this.getDaySlope();
    this.getDaySlopeIndex();
    this.getDaySat();
    this.getHourSat();
    this.getHourSlope();
    this.loadingWrapper();
  }

  loadingWrapper() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  getCandles() {
    this.candleWeekService.getAll(this.getHttpParams()).subscribe(response => {
      this.page = response as Page;
      this.candleWeekList = this.page.content as CandleWeek[];
      this.candleWeek = this.candleWeekList[0];
    });
  }

  getHttpParams(): HttpParams {
    return new HttpParams()
      .append('page', 0)
      .append('size', 1)
      .append('order', 'desc');
  }

  getWeekSlope() {
    this.weekSlopeService.getAll()
      .subscribe(value => this.weekSlope = value as Slope);
  }

  getWeekSlopeIndex() {
    this.weekSlopeIndexService.getAll()
      .subscribe(value => this.weekSlopeIndex = value as Report);
  }

  getDaySlope() {
    this.daySlopeService.getAll()
      .subscribe(value => this.daySlope = value as Slope);
  }

  getDaySlopeIndex() {
    this.daySlopeIndexService.getAll()
      .subscribe(value => this.daySlopeIndex = value as Report);
  }

  getDaySat() {
    this.daySatService.getAll()
      .subscribe(value => this.daySat = value as Report);
  }

  getHourSat() {
    this.hourSatService.getAll()
      .subscribe(value => this.hourSat = value as ReportHourSat);
  }

  getHourSlope() {
    this.hourSlopeService.getAll()
      .subscribe(value => this.hourSlope = value as Slope);
  }
}


