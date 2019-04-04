import { Injectable } from '@angular/core';
/* import { FirebaseAuth} from '@angular/fire';
 */
import { promise } from 'protractor';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(email: string, password: string) {
    this.router.navigate(['/menu/home']);

   /*  ESTA PARTE HAY QUE DESCOMENTARLA CUANDO CONECTEMOS CON LA BBDD
   return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    }); */
  }
  createUser(email: string, password: string ) {
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
