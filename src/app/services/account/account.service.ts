import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends DataService {
  constructor(http: HttpClient) {
    super(environment.tradeHistoryUrl + '/trade-account', http);
  }
}
