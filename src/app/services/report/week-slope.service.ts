import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeekSlopeService extends DataService {
  constructor(http: HttpClient) {
    super(environment.TRANSLATE_SERVICE_BASE_PATH + '/candle/week/slope', http);
  }
}
