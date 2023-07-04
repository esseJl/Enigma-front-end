import {Component, OnInit} from '@angular/core';
import {DxyDayReal} from "../../../model/model";
import {Error} from "../../../error/error";
import {N1D1OrderService} from "../../../services/order/n1-d1-order.service";
import {N4D1OrderService} from "../../../services/order/n4-d1-order.service";
import {N1d2OrderService} from "../../../services/order/n1d2-order.service";
import {N4d2OrderService} from "../../../services/order/n4d2-order.service";
import {N2dpService} from "../../../services/order/n2dp.service";
import {N2dzService} from "../../../services/order/n2dz.service";
import {N2dmService} from "../../../services/order/n2dm.service";
import {N3dmService} from "../../../services/order/n3dm.service";
import {N3dzService} from "../../../services/order/n3dz.service";
import {N3dpService} from "../../../services/order/n3dp.service";

@Component({
  selector: 'app-upload-order-n1d1',
  templateUrl: './upload-order-n1d1.component.html',
  styleUrls: ['./upload-order-n1d1.component.css']
})
export class UploadOrderN1d1Component implements OnInit {
  loading: boolean = false;
  failedLoad: string[] = [];
  loadedItems: DxyDayReal[] = [];
  savedItems: DxyDayReal[] = [];
  errors: Error[] = [];
  bufferValue: number = 0;
  value: number = 0;
  strategies: string[] = ['N1D1', 'N1D2', 'N4D1', 'N4D2', 'N2DP', 'N2DZ', 'N2DM', 'N3DP', 'N3DZ', 'N3DM'];
  strategy: string = this.strategies[0];

  constructor(private n1d1Service: N1D1OrderService, private n1d2Service: N1d2OrderService,
              private n4d1Service: N4D1OrderService, private n4d2Service: N4d2OrderService,
              private n2dpService: N2dpService,
              private n2dzService: N2dzService,
              private n2dmService: N2dmService,
              private n3dpService: N3dpService,
              private n3dzService: N3dzService,
              private n3dmService: N3dmService,
  ) {
  }

  ngOnInit(): void {
  }

  resetAll() {
    this.failedLoad = [];
    this.loadedItems = [];
    this.savedItems = [];
    this.errors = [];
    this.value = 0;
    this.bufferValue = 0;
  }

  onUpload(target: any) {
    this.loading = true;
    this.resetAll();

    let input = target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let n1d1OrderCsv = reader.result as string;
      let n1d1Lines = (n1d1OrderCsv as string).split("\n");
      this.load(n1d1Lines);
      this.loading = false;
    }
  }

  private load(n1d1OrderCsv: string[]) {
    n1d1OrderCsv.forEach(value => {
      let object = value.split(",");
      let length = object.length;
      if (length == 6) {
        let n1d1Order = this.order(object);
        if (n1d1Order)
          this.loadedItems.push(n1d1Order);
        //console.log(candleHour);
      } else {
        this.failedLoad.splice(0, 0, value);
      }
    });
  }

  private order(object: string[]) {
    try {
      let obj = object[0].split(".");

      let year = parseInt(obj[0]);
      let month = parseInt(obj[1]) - 1;
      let day = parseInt(obj[2]);

      let d = new Date(year, month, day);
      let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
      let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
      let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
      let date = `${ye}-${mo}-${da} 00:00`;
      let order = {} as DxyDayReal;

      order.id = null;
      order.date = date;
      order.emaOpen = parseFloat(object[1]) == 1;
      order.emaHigh = parseFloat(object[2]) == 1;
      order.emaLow = parseFloat(object[3]) == 1;
      order.emaClose = parseFloat(object[4]) == 1;
      order.profit = parseFloat(object[5]) * 10;

      console.log(order);

      return order;
    } catch (e) {
      this.failedLoad.splice(0, 0, e?.message);
      return null;
    }
  }

  save() {
    this.bufferValue = this.loadedItems.length;
    for (let i = 0; i < this.loadedItems.length; i++) {
      setTimeout(() => {
        let order = this.loadedItems[i];
        if (this.strategy == 'N1D1') this.n1d1(order);
        else if (this.strategy == 'N1D2') this.n1d2(order);
        else if (this.strategy == 'N4D1') this.n4d1(order);
        else if (this.strategy == 'N4D2') this.n4d2(order);
        else if (this.strategy == 'N2DP') this.n2dp(order);
        else if (this.strategy == 'N2DZ') this.n2dz(order);
        else if (this.strategy == 'N2DM') this.n2dm(order);
        else if (this.strategy == 'N3DP') this.n3dp(order);
        else if (this.strategy == 'N3DZ') this.n3dz(order);
        else if (this.strategy == 'N3DM') this.n3dm(order);

      }, i * 80);
    }
  }

  upload() {
    this.save();
  }

  n1d1(order) {
    this.n1d1Service.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n1d2(order) {
    this.n1d2Service.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n4d1(order) {
    this.n4d1Service.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n4d2(order) {
    this.n4d2Service.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n2dp(order) {
    this.n2dpService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n2dz(order) {
    this.n2dzService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n2dm(order) {
    this.n2dmService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n3dp(order) {
    this.n3dpService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n3dz(order) {
    this.n3dzService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }

  n3dm(order) {
    this.n3dmService.create(order)
      .subscribe(value => {
        this.savedItems.splice(0, 0, value as DxyDayReal);
        this.value++;
      }, error => {
        this.errors.splice(0, 0, error?.error);
        this.value++;
      });
  }
}
