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
  checkMail = true;

  constructor(private authService: AuthService, public router: Router) {
    this.newUser();
  }

newUser() {
  this.user.email = '';
  this.user.token = '';

}
onSubmitLogin() {
// TODO Llamar al servidor y ver si el email existe
// Si existe checkMAil = true, Si no existe checkMAil = false

  if (this.checkMail === false) {
    this.authService.createUser(this.user);
  } else {
    this.authService.login(this.user).subscribe((user: User) => {
      if (user.email == null) {
        this.checkMail = false;
      } else {
        this.router.navigate(['/home']);
      }
      }
    );
  }

/*    this.authService.login(this.user).subscribe( res => {
      this.router.navigate(['/home']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'));*/
  }
  goRegister() {
    this.checkMail = false;
  }
  logOut() {
    this.authService.login(this.user);
  }
  ngOnInit() {
  }
}
