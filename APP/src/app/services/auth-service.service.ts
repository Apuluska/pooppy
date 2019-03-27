import { Injectable } from '@angular/core';
/* import { FirebaseAuth} from '@angular/fire';
 */
import { promise } from 'protractor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(email: string, password: string) {
    this.router.navigate(['/home']);

   /*  ESTA PARTE HAY QUE DESCOMENTARLA CUANDO CONECTEMOS CON LA BBDD
   return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    }); */
  }


  logOut() {
    /* ESTA PARTE HAY QUE DESCOMENTARLA CUANDO CONECTEMOS CON LA BBDD
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }); */
    this.router.navigate(['/login']);
  }

}
