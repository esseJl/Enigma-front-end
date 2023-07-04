import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class N4d2OrderService extends DataService {

  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/orders/N4D2', http);
  }
}
