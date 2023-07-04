import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DaySatService extends DataService {
  constructor(http: HttpClient) {
    super(environment.translateServiceUrl + '/candle/day/sat', http);
  }
}
