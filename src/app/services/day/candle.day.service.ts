import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CandleDayService extends DataService {
  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/candle/day', http);
  }
}
