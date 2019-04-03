import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  user: User = new User();
  verNombre = false;

  constructor(private authService: AuthService, public router: Router) {
    this.newUser();
  }

newUser() {
  this.user.email = '';
  this.user.password = '';

}
onSubmitLogin() {
  if (this.verNombre === true) {
    this.authService.createUser(this.user.email, this.user.password);
  } else {
    this.authService.login(this.user.email, this.user.password);
  }
   /*  ESTO SE DESCOMENTA CUANDO SE CONECTE CON LA BBDD
   this.authService.login(this.user.email, this.user.password).then( res => {
      this.router.navigate(['/home']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario')); */
  }
  goRegister() {
    this.verNombre = true;
  }
  logOut() {
    this.authService.login(this.user.email, this.user.password);
  }
  ngOnInit() {
  }

}
