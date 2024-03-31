import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CandleWeekService extends DataService {
  constructor(http: HttpClient) {
    super(environment.TRANSLATE_SERVICE_BASE_PATH + '/candle/week', http);
  }
}
