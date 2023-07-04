import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeekSlopeIndexService extends DataService {
  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/candle/week/slope/index', http);
  }
}
