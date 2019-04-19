import { Injectable } from '@angular/core';
import { Bin } from '../bin';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BinsService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private binUrl = 'http://localhost:3000/bins';  // URL to web api

  getBinData(): Observable<Array<Bin>> {
    return this.http.get<Bin[]>(this.binUrl);
  }

  getOneBinInfo(binId: string): Observable<Array<Bin>> {
    // return this.http.get<Bin[]>(`${this.binUrl}/?id=${binId}`)
    return this.http.get<Bin[]>(this.binUrl + '/' + binId);
  }

  updateBinBags(binId: string, hasBags: boolean): Observable<Bin> {
    // return this.http.get<Bin[]>(`${this.binUrl}/?id=${binId}`)
    return this.http.put<Bin>(this.binUrl + '/bags', { 'id': binId, 'info': hasBags.toString() });
  }
  getBinDataByUser(binId): Observable<Array<Bin>> {
    return this.http.post<Bin[]>('http://localhost:3000/binUser', binId, this.httpOptions);
  }

}
