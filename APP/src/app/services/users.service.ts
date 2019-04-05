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

  addFavorite (id_user: User["id"], id_bin: Bin["id"]): Observable<string> {
    return this.http.post<User["id"]>(`${this.userUrl}/favoritebins/add`, {id_user, id_bin}, this.httpOptions)
  }
}