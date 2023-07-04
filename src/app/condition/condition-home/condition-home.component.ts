import {Component, OnInit} from '@angular/core';
import {ConditionService} from "../../services/condition/condition.service";
import {HttpParams} from "@angular/common/http";
import {Condition} from "../../model/model";
import {ConditionModificationComponent} from "../condition-modification/condition-modification.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-condition-home',
  templateUrl: './condition-home.component.html',
  styleUrls: ['./condition-home.component.css']
})
export class ConditionHomeComponent implements OnInit {
  loading: boolean = false;
  filterValue: string = '';
  conditionList: Condition[] = [];

  constructor(private service: ConditionService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  /*refresh(event) {
    console.log(event);
    this.getAll()
  }*/

  modification(condition: Condition | null) {
    this.dialog.open(ConditionModificationComponent, {
      width: '50vw',
      data: condition
    })
      .afterClosed().subscribe(result => {
      if (result) {
        //console.log(result);
        let index = this.conditionList.findIndex(value => value.id == result?.id);
        console.log(index);
      }
    });
  }

  getAll() {
    this.loading = true;
    this.service.getAll(new HttpParams().append('name', this.filterValue))
      .subscribe(value => {
        this.conditionList = value as Condition[];
        console.log(this.conditionList);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error)
      });
  }

  filter(value) {
    this.filterValue = value;
    console.log(this.filterValue);
    this.getAll();
  }
}
