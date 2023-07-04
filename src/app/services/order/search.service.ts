import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = environment.translateServiceUrl + '/orders/search';

  constructor(private http: HttpClient) {
  }

  search(resource: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return this.http.post(this.url, JSON.stringify(resource), {headers: headers});
  }

  searchAndExportToCsv(resource: any) {
    return this.http
      .post(this.url + "/csv", JSON.stringify(resource), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain',
          responseType: 'text'
        }
      })

    /*  .pipe(
        catchError((error) => {
          console.log(error);
          return of(false);
        }),
        tap(console.log),
        map(x => JSON.stringify(x))
      );
    */
    /*.pipe(
        map((resource: HttpResponse<string>) => {
          console.log(resource.body);
          return resource.body;
        })
      );*/
  }
}
