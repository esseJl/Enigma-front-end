import {DataService} from "../data.service";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandleHourService extends DataService {

  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/candle/hour', http);
  }
}
