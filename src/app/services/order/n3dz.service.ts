import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class N3dzService extends DataService {

  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/orders/N3DZ', http);
  }
}
