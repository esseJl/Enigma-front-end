import {Component, Inject, OnInit} from '@angular/core';
import {CandleDay, CandleHour, CandleWeek} from "../model/model";
import {CandleWeekService} from "../services/week/candle.week.service";
import {ChartComponent} from "../chart/chart.component";
import {saveAs} from 'file-saver';
import {formatDate} from "@angular/common";
import {HttpParams} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-candle-process',
  templateUrl: './candle-process.component.html',
  styleUrls: ['./candle-process.component.css']
})
export class CandleProcessComponent implements OnInit {

  candleWeekList: CandleWeek[] = [];
  loading: boolean = true;
  startId: number;
  endId: number;

  constructor(private service: CandleWeekService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) data) {
    this.startId = data.startId;
    this.endId = data.endId;
  }

  ngOnInit(): void {
    let httpParams = new HttpParams()
      .append('startId', this.startId)
      .append('endId', this.endId);
    this.service.process(httpParams).subscribe(response => {
      this.candleWeekList = response as CandleWeek[];
      this.loading = false;
    });
  }


  getCandleHourList() {
    let candleHourList: CandleHour[] = [];
    this.candleWeekList.forEach(candleWeek => {
      candleWeek.candleDayList.forEach(candleDay => {
        candleDay.candleHourList.forEach(candleHour => {
          candleHourList.push(candleHour);
        });
      });
    });
    return candleHourList;
  }

  getCandleDayList() {
    let candleDayList: CandleDay[] = [];
    this.candleWeekList.forEach(candleWeek => {
      candleWeek.candleDayList.forEach(value => candleDayList.push(value));
    });
    return candleDayList;
  }

  getCandleHourCsv() {
    let candleHourList = this.getCandleHourList();
    let strings = candleHourList.map(value => {
      return `${formatDate(value.date, 'yyyy-MM-dd', 'en-US')},${formatDate(value.date, 'HH:mm', 'en-US')},${value.realOpen},${value.preOpen},${value.preOpenDay},${value.preOpenWeek},${value.saturationOpenDay},${value.indexOpenSlopeDay},${value.saturationOpenWeek},${value.indexOpenSlopeWeek},${value.realHigh},${value.preHigh},${value.preHighDay},${value.preHighWeek},${value.saturationHighDay},${value.indexHighSlopeDay},${value.saturationHighWeek},${value.indexHighSlopeWeek},${value.realLow},${value.preLow},${value.preLowDay},${value.preLowWeek},${value.saturationLowDay},${value.indexLowSlopeDay},${value.saturationLowWeek},${value.indexLowSlopeWeek},${value.realClose},${value.preClose},${value.preCloseDay},${value.preCloseWeek},${value.saturationCloseDay},${value.indexCloseSlopeDay},${value.saturationCloseWeek},${value.indexCloseSlopeWeek}` + '\n';
    });
    let header = `date,time,realOpen,preOpen,preOpenDay,preOpenWeek,saturationOpenDay,indexOpenSlopeDay,saturationOpenWeek,indexOpenSlopeWeek,realHigh,preHigh,preHighDay,preHighWeek,saturationHighDay,indexHighSlopeDay,saturationHighWeek,indexHighSlopeWeek,realLow,preLow,preLowDay,preLowWeek,saturationLowDay,indexLowSlopeDay,saturationLowWeek,indexLowSlopeWeek,realClose,preClose,preCloseDay,preCloseWeek,saturationCloseDay,indexCloseSlopeDay,saturationCloseWeek,indexCloseSlopeWeek` + '\n';
    strings.splice(0, 0, header);
    let blob = new Blob(strings, {type: 'text/csv'})
    saveAs(blob, "candle-hour.csv");
  }

  getCandleDayCsv() {
    let candleDayList = this.getCandleDayList();
    let strings = candleDayList.map(value => {
      return `${formatDate(value.date, 'yyyy-MM-dd', 'en-US')},${value.realOpen},${value.preOpen},${value.preOpenWeek},${value.preOpenSlope},${value.indexOpenSlope},${value.indexOpenSlopeWeek},${value.saturationOpenWeek},${value.realHigh},${value.preHigh},${value.preHighWeek},${value.preHighSlope},${value.indexHighSlope},${value.indexHighSlopeWeek},${value.saturationHighWeek},${value.realLow},${value.preLow},${value.preLowWeek},${value.preLowSlope},${value.indexLowSlope},${value.indexLowSlopeWeek},${value.saturationLowWeek},${value.realClose},${value.preClose},${value.preCloseWeek},${value.preCloseSlope},${value.indexCloseSlope},${value.indexCloseSlopeWeek},${value.saturationCloseWeek}` + '\n';
    });
    let header = `date,realOpen,preOpen,preOpenWeek,preOpenSlope,indexOpenSlope,indexOpenSlopeWeek,saturationOpenWeek,realHigh,preHigh,preHighWeek,preHighSlope,indexHighSlope,indexHighSlopeWeek,saturationHighWeek,realLow,preLow,preLowWeek,preLowSlope,indexLowSlope,indexLowSlopeWeek,saturationLowWeek,realClose,preClose,preCloseWeek,preCloseSlope,indexCloseSlope,indexCloseSlopeWeek,saturationCloseWeek` + '\n';
    strings.splice(0, 0, header);
    let blob = new Blob(strings, {type: 'text/csv'})
    saveAs(blob, "candle-day.csv");
  }

  showChart() {
    //console.log(candleHourList.length);
    this.dialog.open(ChartComponent, {
      maxWidth: '100%', maxHeight: '100%'
      , height: '100%', width: '100%', data: this.getCandleHourList()
    });
  }

  getCandleWeekCsv() {
    let strings = this.candleWeekList.map(value => {
      return `${value.date},${value.preOpen},${value.preOpenSlope},${value.realOpen},${value.preHigh},${value.preHighSlope},${value.realHigh},${value.preLow},${value.preLowSlope},${value.realLow},${value.preClose},${value.preCloseSlope},${value.realClose},${value.indexOpenSlope},${value.indexHighSlope},${value.indexLowSlope},${value.indexCloseSlope}` + '\n';
    });
    let header = `date,preOpen,preOpenSlope,realOpen,preHigh,preHighSlope,realHigh,preLow,preLowSlope,realLow,preClose,preCloseSlope,realClose,indexOpenSlope,indexHighSlope,indexLowSlope,indexCloseSlope` + '\n';
    strings.splice(0, 0, header);
    let blob = new Blob(strings, {type: 'text/csv'})
    saveAs(blob, "candle-week.csv");
  }
}


