import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth-service.service';
import { User } from '../user';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private authService: AuthService) { }

  addUser(user: User): void {
    // Primer parametro -> nombre con el que queremos guardar en el storage el valor.
    // Segundo parametro -> el valor que queremos almacenar.
    this.storage.set('_id', user._id);
    this.storage.set('password', user.password);
    this.storage.set('email', user.email);
/*     this.authService.createUser(user); */
  }
  async getUsers() {
    const user: User = new User();
    await this.storage.get('_id').then(
      (id) => {
       user._id = id;
      }
    );
    await this.storage.get('password').then(
      (password) => {
        user.password = password;
      }
    );
    await this.storage.get('email').then(
      (email) => {
        user.email = email;
      }
    );
      return await user;
  }
  deleteUser(user: User): void {
   this.storage.remove('_id');
   this.storage.remove('password');
   this.storage.remove('email');
  }

}
