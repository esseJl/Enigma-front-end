import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HistoryService} from "../../services/history/history.service";
import {History} from "../../model/model";
import {ColDef} from "ag-grid-community";

@Component({
  selector: 'app-history-ag',
  templateUrl: './history-ag.component.html',
  styleUrls: ['./history-ag.component.css']
})
export class HistoryAgComponent implements OnInit {

  userId: number;
  histories: History[];
  colDefs: ColDef[] = [
    {field: "entryDate", filter: true},
    {field: "expireDate", filter: true},
    {field: "strategy", filter: true},
    {field: "symbol", filter: true},
    {field: "ticket", filter: true},
    {field: "type", filter: true},
    {field: "volume", filter: true},
    {field: "sl", filter: true},
    {field: "tp", filter: true},
    {field: "entryPrice", filter: true},
    {field: "winRate1", filter: true},
    {field: "winRate2", filter: true},
    {field: "winRate3", filter: true},
    {field: "profit", filter: true},
    {field: "exitPrice", filter: true},
    {field: "exitDate", filter: true},
  ];

  constructor(private route: ActivatedRoute, private service: HistoryService) {
    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.service.findHistory(this.userId, {})
      .subscribe(value => this.histories = value['content'] as History[]);
  }

}
