import {Component, OnInit} from '@angular/core';
import {DxyDayService} from "../../services/dxy-day/dxy-day.service";

@Component({
  selector: 'app-dxy-day-real',
  templateUrl: './dxy-day-real.component.html',
  styleUrls: ['./dxy-day-real.component.css']
})
export class DxyDayRealComponent implements OnInit {

  constructor(private service: DxyDayService) {
  }

  ngOnInit(): void {
  }


}
