import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


export class DataService {

  constructor(private url: string, private http: HttpClient) {
  }

  getAll(params ?: HttpParams) {
    return this.http.get(this.url, {params: params})
  }

  process(params ?: HttpParams) {
    return this.http.get(this.url + '/process', {params: params})
  }

  create(resource: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return this.http.post(this.url, JSON.stringify(resource), {headers: headers});
  }

  /*search(resource: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
    return this.http.post(this.url + "/search", JSON.stringify(resource), {headers: headers});
  }*/

  update(resource: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.put(this.url, JSON.stringify(resource), {headers: headers});
  }

  delete(id: any) {
    return this.http.delete(this.url + "/" + id);
  }

  option() {
    return this.http.options(this.url);
  }

}
