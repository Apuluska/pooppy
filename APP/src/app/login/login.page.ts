import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router) {
}

onSubmitLogin() {
  this.authService.login(this.email, this.password);
   /*  ESTO SE DESCOMENTA CUANDO SE CONECTE CON LA BBDD
   this.authService.login(this.email, this.password).then( res => {
      this.router.navigate(['/home']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario')); */
  }
  logOut() {
    this.authService.login(this.email, this.password);
  }
  ngOnInit() {
  }

}
