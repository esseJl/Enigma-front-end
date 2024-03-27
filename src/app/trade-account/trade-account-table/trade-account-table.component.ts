import {Component, OnInit} from '@angular/core';
import {CandleDay, TradeAccount} from "../../model/model";
import {AccountService} from "../../services/account/account.service";
import {MatDialog} from "@angular/material/dialog";
import {TradeAccountModificationComponent} from "../trade-account-modification/trade-account-modification.component";
import {DeleteAlarmComponent} from "../../delete-alarm/delete-alarm.component";

@Component({
  selector: 'app-trade-account-table',
  templateUrl: './trade-account-table.component.html',
  styleUrls: ['./trade-account-table.component.css']
})
export class TradeAccountTableComponent implements OnInit {
  displayedColumns: String [] = ['server', 'username', 'password', 'active', 'action'];
  accounts: TradeAccount[] = [];
  private loading: boolean = false;

  constructor(private service: AccountService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  modification(account: TradeAccount | null) {
    this.dialog.open(TradeAccountModificationComponent, {
      width: '90vw',
      data: account
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  delete(account: TradeAccount) {
    this.dialog.open(DeleteAlarmComponent)
      .afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(account.id)
          .subscribe(value => {
            this.refresh();
          })
      }
    });
  }

  refresh() {
    this.loading = true;
    this.service.getAll()
      .subscribe(value => {
        console.log(value);
        this.accounts = value as TradeAccount[];
        this.loading = false;
      });
  }
}
