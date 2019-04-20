import { Injectable } from '@angular/core';
/* import { FirebaseAuth} from '@angular/fire';
 */
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private userUrl = 'http://localhost:3000/user/login';  // URL to web api

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, {user}, this.httpOptions);
  }
  /*  return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    }); */

  createUser(user: User ) {
    this.router.navigate(['/menu/home']);
    /* cuando esté hecho el backend, creará usuario.  */
  }

  logOut() {
    /* ESTA PARTE HAY QUE DESCOMENTARLA CUANDO CONECTEMOS CON LA BBDD
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }); */
    this.router.navigate(['/login']);
  }

}
