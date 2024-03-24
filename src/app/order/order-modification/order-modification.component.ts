import {Component, Inject, OnInit} from '@angular/core';
import {Error} from "../../error/error";
import {Order} from "../../model/model";
import {formatDate} from "@angular/common";
import {OrderService} from "../../services/order/order.service";
import {N1D1OrderService} from "../../services/order/n1-d1-order.service";
import {N1d2OrderService} from "../../services/order/n1d2-order.service";
import {N4d2OrderService} from "../../services/order/n4d2-order.service";
import {Observable} from "rxjs";
import {N2dpService} from "../../services/order/n2dp.service";
import {N2dzService} from "../../services/order/n2dz.service";
import {N2dmService} from "../../services/order/n2dm.service";
import {N3dzService} from "../../services/order/n3dz.service";
import {N3dpService} from "../../services/order/n3dp.service";
import {N3dmService} from "../../services/order/n3dm.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-order-modification',
  templateUrl: './order-modification.component.html',
  styleUrls: ['./order-modification.component.css']
})
export class OrderModificationComponent implements OnInit {

  mood: string = 'New Order';
  new: boolean = false;
  loading: boolean = false;
  orderTemp: Order;
  error: Error;

  strategies: string[] = ['N1D1', 'N1D2', 'N4D1', 'N4D2', 'N2DP', 'N2DZ', 'N2DM', 'N3DP', 'N3DZ', 'N3DM'];
  strategy: string = this.strategies[0];

  constructor(private orderService: OrderService,
              private n1d1Service: N1D1OrderService,
              private n1d2Service: N1d2OrderService,
              private n4d1Service: N4d2OrderService,
              private n4d2Service: N4d2OrderService,
              private n2dpService: N2dpService,
              private n2dzService: N2dzService,
              private n2dmService: N2dmService,
              private n3dpService: N3dpService,
              private n3dzService: N3dzService,
              private n3dmService: N3dmService,
              private dialogRef: MatDialogRef<OrderModificationComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.mood = 'Update Order';
      this.orderTemp = {} as Order;
      this.orderTemp.id = data.id;
      this.orderTemp.date = data.date;
      this.orderTemp.emaOpen = data.emaOpen;
      this.orderTemp.emaHigh = data.emaHigh;
      this.orderTemp.emaLow = data.emaLow;
      this.orderTemp.emaClose = data.emaClose;
      this.orderTemp.profit = data.profit;
    } else {
      this.new = true;
      this.orderTemp = {} as Order;
      this.orderTemp.id = null;
    }
  }

  ngOnInit(): void {
  }

  submit(form) {
    let value = form.value;
    this.loading = true;
    value.date = formatDate(value.date, 'yyyy-MM-dd HH:mm', 'en-US');
    //console.log(value);
    if (value.id == null) {
      this.createNewOrder(value)
        .subscribe(res => {
          //console.log(res);
          this.loading = false;
          this.dialogRef.close(res);
        }, error => {
          //console.log(error);
          this.error = error.error as Error;

          this.error.subErrors.forEach(v => {
            let key = v.field;
            let val = v.message;
            form.controls[key].setErrors({err: val});
          });

          this.loading = false;
        });
      ;
    } else {
      this.orderService.update(value)
        .subscribe(res => {
          //console.log(res);
          this.loading = false;
          this.dialogRef.close(res);
        }, error => {
          //console.log(error);
          this.error = error.error as Error;

          this.error.subErrors.forEach(v => {
            let key = v.field;
            let val = v.message;
            form.controls[key].setErrors({err: val});
          });

          this.loading = false;
        });
    }
  }

  createNewOrder(order): Observable<any> {
    switch (this.strategy) {
      case this.strategies[0]:
        return this.n1d1Service.create(order);
      case this.strategies[1]:
        return this.n1d2Service.create(order);
      case this.strategies[2]:
        return this.n4d1Service.create(order);
      case this.strategies[3]:
        return this.n4d2Service.create(order);
      case this.strategies[4]:
        return this.n2dpService.create(order);
      case this.strategies[5]:
        return this.n2dzService.create(order);
      case this.strategies[6]:
        return this.n2dmService.create(order);
      case this.strategies[7]:
        return this.n3dpService.create(order);
      case this.strategies[8]:
        return this.n3dzService.create(order);
      case this.strategies[9]:
        return this.n3dmService.create(order);

      default:
        return new Observable<any>();
    }

  }
}
