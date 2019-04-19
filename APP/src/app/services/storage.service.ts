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
    this.storage.set(user.token, user);
    this.authService.createUser(user);
  }
  getUsers(user: User): void {
    this.storage.get(user.token);
  }
  deleteUser(user: User): void {
   this.storage.remove(user.token);
  }

}
