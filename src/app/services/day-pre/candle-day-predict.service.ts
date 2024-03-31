import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class CandleDayPredictService extends DataService {

  constructor(http: HttpClient) {
    super(environment.TRANSLATE_SERVICE_BASE_PATH + '/candle/day/predict', http);
  }
}
