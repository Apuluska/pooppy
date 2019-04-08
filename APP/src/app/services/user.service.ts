import { Injectable } from '@angular/core';
import { Bin } from '../bin';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private urlBase = 'http://localhost:3000/';  // URL to web api

  getUserFavoriteBinsData(userId: string): Observable<Array<Bin>> {
    let endpointUrl = this.urlBase + 'user/' + userId + '/favorite_bins';
    console.log("a llamar al enpoint " + endpointUrl);
    return this.http.get<Bin[]>(endpointUrl);
  }

  deleteBin( userId: string, idBin:string) : Observable<string> {
    return this.http.put<Bin["_id"]>(`${this.urlBase}/favoritebins/update`, {userId, idBin}, this.httpOptions)
  }

}
