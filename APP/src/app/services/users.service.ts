import { Injectable } from '@angular/core';

import { User } from '../user';
import { Bin } from '../bin';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userUrl = 'http://localhost:3000/user';  // URL to web api

  addFavoriteBin (id_user: User["_id"], id_bin: Bin["_id"]): Observable<string> {
    return this.http.post<User["_id"]>(`${this.userUrl}/favoritebins/add`, {id_user, id_bin}, this.httpOptions)
  }

  deleteFavoriteBin (id_user: User["_id"], id_bin: Bin["_id"]): Observable<string> {
    return this.http.put<User["_id"]>(`${this.userUrl}/favoritebins/update`, {id_user, id_bin}, this.httpOptions)
  }

  getUserFavoriteBinList(id_user: User["_id"]): Observable<Array<User>> {
    return this.http.get<User[]>(this.userUrl + '/' + id_user + '/favoritebins')
  }

}