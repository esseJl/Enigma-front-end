import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends DataService {
  constructor(http: HttpClient) {
    super(environment.tradeHistoryUrl + '/history', http);
  }


}

