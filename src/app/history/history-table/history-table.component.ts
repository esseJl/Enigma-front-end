import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {ActivatedRoute} from "@angular/router";
import {HistoryService} from "../../services/history/history.service";
import {History} from "../../model/model";

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit {

  userId: number;
  histories: History[];
  columnsToDisplay: string[] = ['entryDate', 'expireDate', 'strategy', 'symbol', 'ticket', 'type'
    , 'volume', 'sl', 'tp', 'entryPrice', 'winRate1', 'winRate2', 'winRate3', 'profit', 'exitPrice', 'exitDate'
  ]
  strategy: string = '';
  symbol: string = '';

  constructor(private route: ActivatedRoute, private service: HistoryService) {
    this.userId = this.route.snapshot.params['userId'];

  }

  ngOnInit(): void {
    this.service.findHistory(this.userId, {})
      .subscribe(value => this.histories = value['content'] as History[]);
  }


}
