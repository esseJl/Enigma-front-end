import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-candle-temp',
  templateUrl: './candle-temp.component.html',
  styleUrls: ['./candle-temp.component.css']
})
export class CandleTempComponent implements OnInit {

  @Input('value') value: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
